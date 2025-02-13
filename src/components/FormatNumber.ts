export const formatNumber = (num: number, fixedValue: number) => {
  const absNum = Math.abs(num);

  if (absNum >= 1e63) {
    return (num / 1e63).toFixed(2) + " vigintillion";
  } else if (absNum >= 1e60) {
    return (num / 1e60).toFixed(2) + " novemdecillion";
  } else if (absNum >= 1e57) {
    return (num / 1e57).toFixed(2) + " octodecillion";
  } else if (absNum >= 1e54) {
    return (num / 1e54).toFixed(2) + " septendecillion";
  } else if (absNum >= 1e51) {
    return (num / 1e51).toFixed(2) + " sexdecillion";
  } else if (absNum >= 1e48) {
    return (num / 1e48).toFixed(2) + " quindecillion";
  } else if (absNum >= 1e45) {
    return (num / 1e45).toFixed(2) + " quattuordecillion";
  } else if (absNum >= 1e42) {
    return (num / 1e42).toFixed(2) + " tredecillion";
  } else if (absNum >= 1e39) {
    return (num / 1e39).toFixed(2) + " duodecillion";
  } else if (absNum >= 1e36) {
    return (num / 1e36).toFixed(2) + " undecillion";
  } else if (absNum >= 1e33) {
    return (num / 1e33).toFixed(2) + " decillion";
  } else if (absNum >= 1e30) {
    return (num / 1e30).toFixed(2) + " nonillion";
  } else if (absNum >= 1e27) {
    return (num / 1e27).toFixed(2) + " octillion";
  } else if (absNum >= 1e24) {
    return (num / 1e24).toFixed(2) + " septillion";
  } else if (absNum >= 1e21) {
    return (num / 1e21).toFixed(2) + " sextillion";
  } else if (absNum >= 1e18) {
    return (num / 1e18).toFixed(2) + " quintillion";
  } else if (absNum >= 1e15) {
    return (num / 1e15).toFixed(2) + " quadrillion";
  } else if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2) + " trillion";
  } else if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + " billion";
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + " million";
  } else if (absNum >= 1e3) {
    return num.toFixed(0).toString();
  } else {
    return num.toFixed(fixedValue).toString();
  }
};
