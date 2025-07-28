/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Capitalizes all words in a sentence.
 */
export function capitalizeWords(sentence: string): string {
  if (!sentence) return '';
  return sentence
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
}
