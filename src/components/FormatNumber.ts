export const formatNumber = (num: number) => {
  const absNum = Math.abs(num);
  if (absNum >= 1e12) {
    return (num / 1e12).toFixed(2) + " trillion";
  } else if (absNum >= 1e9) {
    return (num / 1e9).toFixed(2) + " billion";
  } else if (absNum >= 1e6) {
    return (num / 1e6).toFixed(2) + " million";
  } else {
    return num.toFixed().toString();
  }
}