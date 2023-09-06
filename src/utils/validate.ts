export const strCheck = {
  isEmpty: (str: string) => {
    return str.trim() === '' || str === null || str === undefined;
  },
  isNotEmpty: (str: string) => {
    return !strCheck.isEmpty(str);
  }
};
