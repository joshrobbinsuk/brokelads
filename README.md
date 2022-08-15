# Brokelads

Betting site (pretend money) built with the MERN stack (MongoDB, Express, React and Node).

## Local setup

`npm run dev` in the root folder and `npm start` in the client folder to run locally.

You will need to create a MongoDB database either locally or in the cloud.

You will need the following config vars: \
`DB=`[your MongoDB database connection] \
`NODE_ENV=development` \
`LEAGUE_CHOICE=`[one from `PREM` | `LEAGUE_1` | `LEAGUE_2`] \
`RAPID_API_KEY=`[info here https://docs.rapidapi.com/docs/keys]

Rapid API starts charging users after 100 requests a day. At present, external API calls are scheduled to never reach this limit. Be careful not to change this. Rapid API calls are not related to the app's traffic.
