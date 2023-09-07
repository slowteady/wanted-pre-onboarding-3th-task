export const strCheck = {
  isEmpty: (str: string | null) => {
    return str === null || str === 'null' || str === undefined || str.trim() === '';
  },
  isNotEmpty: (str: string | null) => {
    return !strCheck.isEmpty(str);
  }
};
