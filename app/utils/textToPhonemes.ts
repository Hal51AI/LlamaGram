// Example usage
//import * as cmudict from 'cmu-pronouncing-dictionary';
import { getTextPhonetic } from 'text-sound-similarity';


// export const textToPhonemes = (text: string): string[] => {
//   const words = text.toLowerCase().split(' ');
//   return words.flatMap(word => cmudict.dictionary[word]|| []);
// };



export const textToPhonemes = (text: string): string[] => {
  // Convert text to phonetic representation
  const phoneticRepresentation = getTextPhonetic(text);
  // Split the phonetic string into individual phonemes
  return phoneticRepresentation.split('');
};