/** Format number like string as currency using space as digit group separators */
const formatNumbersAsCurrency = (number: string) => {
  return number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
};
export default formatNumbersAsCurrency;
