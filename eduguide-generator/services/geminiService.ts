import { GoogleGenAI, Type } from "@google/genai";
import type { FormState, GeneratedResult, Reference } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateContentFromSyllabus(formState: FormState): Promise<GeneratedResult> {
  const { title, targetAudience, durationScope, topics } = formState;

  const topicsList = topics.filter(t => t.trim() !== '').map(t => `- ${t}`).join('\n');

  const prompt = `
You are an expert academic writer and educator. Your task is to generate a comprehensive, well-structured educational guide based on the following details.

**Course Title:** "${title}"
${targetAudience ? `**Target Audience:** "${targetAudience}"` : ''}
${durationScope ? `**Duration/Scope:** "${durationScope}"` : ''}

**Core Topics/Modules to Cover:**
${topicsList}

Please generate the guide content. Use your vast knowledge for accurate and up-to-date information.
IMPORTANT: The 'content' for each section in the JSON output should be in rich Markdown format. Also, please generate a list of 3-5 web links for further reading and add them to a 'references' property in the JSON object, following the specified schema.
`;

 const responseSchema = {
    type: Type.OBJECT,
    properties: {
      title: { 
        type: Type.STRING,
        description: "The course title provided by the user."
      },
      overview: { 
        type: Type.STRING, 
        description: "A brief, engaging summary of the course. This should be a single paragraph." 
      },
      learningObjectives: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 3-5 key skills or knowledge points the student will acquire."
      },
      sections: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "The title of this content section." },
            content: { type: Type.STRING, description: "Detailed content for the section in Markdown format. Include explanations, examples, and lists where appropriate." }
          },
          required: ["title", "content"]
        },
        description: "The main content of the guide, broken down into logical sections based on the provided topics."
      },
      references: {
        type: Type.ARRAY,
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "The title of the linked web page." },
                uri: { type: Type.STRING, description: "The full URL of the web page." }
            },
            required: ["title", "uri"]
        },
        description: "A list of 3-5 relevant web links for further reading."
      }
    },
    required: ["title", "overview", "learningObjectives", "sections", "references"]
  };


  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });

    const jsonText = response.text.trim();
    const parsedContent = JSON.parse(jsonText);
    
    // Ensure references is always an array, even if the model omits it.
    if (!parsedContent.references) {
        parsedContent.references = [];
    }

    return parsedContent as GeneratedResult;
  } catch (error) {
    console.error("Error generating content:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("The AI returned an invalid format. Please try refining your topics or generating again.");
    }
    throw new Error("Failed to generate content from Gemini API. Please check your API key and network connection.");
  }
}