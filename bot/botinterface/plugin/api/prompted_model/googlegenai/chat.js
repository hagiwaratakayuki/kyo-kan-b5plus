/**
 * @typedef {import("@google/genai")} GoogleGenAi
 * @type {GoogleGenAi}
 */
let google;

/**
 * @param {string} apiKey
 * @param {import("@google/genai").GoogleGenAIOptions} options 
 */
async function load(apiKey, options = {}) {
    if (typeof google == 'undefined') {
        google = await import("@google/genai")
    }
    const _options = Object.assign({}, { apiKey }, options)
    return google.GoogleGenAI(_options)


}

const ai = new GoogleGenAI({ "GOOGLE_API_KEY" });

async function main() {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents:
            "List a few popular cookie recipes, and include the amounts of ingredients.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        recipeName: {
                            type: Type.STRING,
                        },
                        ingredients: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.STRING,
                            },
                        },
                    },
                    propertyOrdering: ["recipeName", "ingredients"],
                },
            },
        },
    });

    console.log(response.text);
}

export const test = 'hoge'
