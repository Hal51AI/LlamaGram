import Groq from 'groq-sdk';

// Initialize Groq client
const client = new Groq({
  apiKey: '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', // Make sure to set the GROQ_API_KEY in your environment variables
});

// Function to fetch AI response
export const fetchGroqAIResponse = async (messages: { role: string; content: string }[]) => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: messages,
      model: 'llama-3.1-70b-versatile', // Specify the model you want to use
    });

    // Return the AI response content
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching Groq AI response:', error);
    throw error;
  }
};