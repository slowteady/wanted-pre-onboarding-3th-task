const CONSONANT_REGEX = /^[ㄱ-ㅎ]+$/;
const VOWEL_REGEX = /^[ㅏ-ㅣ]+$/;
const NUMBER_REGEX = /^[0-9]+$/;

export const checkInputValid = (keyword: string) => {
  if (keyword.length === 0 || keyword.trim() === '') {
    return;
  }
  const isValidConsonant = !CONSONANT_REGEX.test(keyword);
  const isValidVowel = !VOWEL_REGEX.test(keyword);
  const isValidNumber = !NUMBER_REGEX.test(keyword);

  const isValid = isValidConsonant && isValidVowel && isValidNumber;
  return isValid;
};
