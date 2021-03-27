import dotenv from "dotenv";
dotenv.config();

const { RAPID_API_KEY } = process.env;

const apiHeaders = {
  headers: {
    "x-rapidapi-key": RAPID_API_KEY,
    "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    Accept: "application/json",
    "Content-Type": "application/json",
    useQueryString: true,
  },
};

export default apiHeaders;
