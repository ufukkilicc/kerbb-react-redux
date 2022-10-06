export const DateHelper = (date) => {
  let identifier = "";
  let result = 0;
  const now = new Date();
  const oldDate = new Date(date);
  oldDate.setHours(oldDate.getHours() - 3);
  var seconds = (now.getTime() - oldDate.getTime()) / 1000;
  result = seconds;
  identifier = "az önce";
  if (result >= 60) {
    result /= 60;
    identifier = " dakika önce";
    if (result >= 60) {
      result /= 60;
      identifier = " saat önce";
      if (result >= 24) {
        result /= 24;
        identifier = " gün önce";
        if (result >= 30) {
          result /= 24;
          identifier = " ay önce";
          if (result >= 12) {
            result /= 12;
            identifier = " yıl önce";
          }
        }
      }
    }
  } else {
    return identifier;
  }
  result = parseInt(result);
  return `${result}${identifier}`;
};
