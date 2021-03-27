import dotenv from "dotenv";
dotenv.config();

const { LEAGUE_CHOICE } = process.env;

const leagueOptions = {
  PREM: 2790,
  LEAGUE_1: 2803,
  LEAGUE_2: 2796,
};

export default leagueOptions[LEAGUE_CHOICE];
