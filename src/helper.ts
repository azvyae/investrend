function getThousandsSeparator() {
  const numberWithDecimalSeparator = 1.1;
  const decimalSeparator = numberWithDecimalSeparator
    .toLocaleString()
    .substring(1, 2);
  if (decimalSeparator === ".") {
    return ",";
  }
  return ".";
}

export { getThousandsSeparator };
