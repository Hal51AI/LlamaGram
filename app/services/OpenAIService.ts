// OpenAIService.ts

import axios from 'axios';

// Function to fetch AI response
export const fetchOpenAIResponse = async (messages: { role: string; content: string }[]) => {
  try {
    const result = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: messages,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
      }
    );

   // console.log(result.data.choices);

    return result.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    throw error;
  }
};
