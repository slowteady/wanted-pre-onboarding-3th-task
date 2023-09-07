export const strCheck = {
  isEmpty: (str: string) => {
    return str === undefined || str.trim() === '';
  },
  isNotEmpty: (str: string) => {
    return !strCheck.isEmpty(str);
  }
};
export const checkInputValid = (keyword: string) => {
  const ConsonantRegex = /^[ㄱ-ㅎ]+$/;
  const VowelRegex = /^[ㅏ-ㅣ]+$/;
  const isInputConsonant = !ConsonantRegex.test(keyword);
  const isInputVowel = !VowelRegex.test(keyword);
  const isValid = isInputConsonant && isInputVowel && strCheck.isNotEmpty(keyword);

  return isValid;
};
