export const currencyFormat = (num: number): number => {
  return parseFloat(num.toFixed(2));
  // .replace(/\./g, ",")
  // .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
// export const currencyFormat = (num: number): string => {
//   return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
// };

// const NumberFormatter = (value, decimal) => {
//   return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString(
//     "es-ES",
//     {
//       useGrouping: true,
//     }
//   );
// };
