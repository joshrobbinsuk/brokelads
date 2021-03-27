export const trimData = (arr) => {
  const newArr = arr.map((fixture) => {
    const {
      fixture_id,
      event_date,
      event_timestamp,
      venue,
      homeTeam,
      awayTeam,
      goalsHomeTeam,
      goalsAwayTeam,
      status,
    } = fixture;

    return {
      fixture_id,
      event_date,
      event_timestamp,
      venue,
      homeTeam,
      awayTeam,
      goalsHomeTeam,
      goalsAwayTeam,
      status,
    };
  });

  return newArr;
};

export default trimData;
