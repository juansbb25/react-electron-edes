export const currencyFormat = (num: number): string => {
  return num.toFixed(2);
};

// export const currencyFormat = (num: number): string => {
//   return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// };
