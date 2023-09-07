export const strCheck = {
  isEmpty: (str: string) => {
    return str === undefined || str.trim() === '';
  },
  isNotEmpty: (str: string) => {
    return !strCheck.isEmpty(str);
  }
};
