/** Capitalize first letter of string, leave other letters unchanged */
const capitalizeFirstLetter = (str: string): string =>
  str && str[0].toUpperCase() + str.slice(1);

export default capitalizeFirstLetter;
