export const toDateHelper = (date) => {
  const oldDate = new Date(date);
  oldDate.setHours(oldDate.getHours() - 3);
  const month = oldDate.getMonth();
  const DATE = oldDate.getDate();
  const year = oldDate.getFullYear();
  let MONTH = "";

  if (month === 0) {
    MONTH = "Ock";
  } else if (month === 1) {
    MONTH = "Şbt";
  } else if (month === 2) {
    MONTH = "Mar";
  } else if (month === 3) {
    MONTH = "Nis";
  } else if (month === 4) {
    MONTH = "May";
  } else if (month === 5) {
    MONTH = "Haz";
  } else if (month === 6) {
    MONTH = "Tem";
  } else if (month === 7) {
    MONTH = "Ağu";
  } else if (month === 8) {
    MONTH = "Eyl";
  } else if (month === 9) {
    MONTH = "Eki";
  } else if (month === 10) {
    MONTH = "Kas";
  } else if (month === 11) {
    MONTH = "Ara";
  }

  return `${DATE} ${MONTH}, ${year}`;
};
