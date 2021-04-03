const toMoneyString = (balance) => {
  if (balance === 0) {
    return "You're broke";
  }
  const moneyString = balance.toLocaleString(
    "en-US", // leave undefined to use the visitor's browser
    // locale or a string like 'en-US' to override it.
    { minimumFractionDigits: 2 },
  );

  return `£${moneyString}`;
};

export default toMoneyString;
