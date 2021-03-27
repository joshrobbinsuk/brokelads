const betToString = (bet) => {
  if (bet === "home") {
    return "Home win";
  } else if (bet === "away") {
    return "Away win";
  } else {
    return "Draw";
  }
};

export default betToString;
