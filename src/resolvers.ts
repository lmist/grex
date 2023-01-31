import { config } from "https://deno.land/x/dotenv/mod.ts";
// const env = config({ safe: true }) /* As per https://deno.land/x/dotenv@v3.2.0 */
// console.log(env)

// This can autoload configs
import "https://deno.land/x/dotenv@v3.2.0/load.ts";

import * as postgres from "https://deno.land/x/postgres@v0.14.2/mod.ts";

// open question: is it okay to call pgConnect in every resolver,
// or should db be passed in as an arg

/* TODO: get rid of this */
const getConnectionStr = () => {
  // read database creds from sys env.
  const dbHost = Deno.env.get("DB_HOST");
  const dbPort = Deno.env.get("DB_PORT");

  const dbName = Deno.env.get("DB_NAME");

  const dbUsr = Deno.env.get("DB_USR");
  const dbPasswd = Deno.env.get("DB_PASSWD");

  return `postgres://${dbUsr}:${dbPasswd}@${dbHost}:${dbPort}/${dbName}`;
}

const pgConnect = async () => {
  const dbURL = getConnectionStr();

  // Lazy three connection database pool
  const pool = new postgres.Pool(dbURL, 3, true);

  // Initiate connection to database
  const connection = await pool.connect();

  return connection;
}

/* Resolver for the allTracks query. */
const allTracks = async () => {
  const databaseClient = await pgConnect();
  const result = await databaseClient.queryObject`
    SELECT name, artist, album, year 
    FROM track
  `;

  return result.rows;
}

const oneTrack = async (args: any) => {
  /* TODO: replace null check with monad. */
  if (!args.name) {
    throw new Error("Invalid arguments.");
  }

  const databaseClient = await pgConnect();
  const result = await databaseClient.queryObject`
    SELECT name, artist, album, year 
    FROM track 
    WHERE name = ${args.name}
  `; /* How safe is this under the hood? */
};

const addTrack = async (args: any) => {
  /* TODO: same as above */
  const {name, artist, album, year} = args;

  const databaseClient = await pgConnect();
  const result = await databaseClient.queryObject`
    INSERT INTO track
    (name, artist, album, year)
    VALUES (${name}, ${artist}, ${album}, ${year})
    RETURNING name, artist, album, year
  `;

  return result.rows[0]
};

/* Why doesn't default work? */
export const resolvers = {
  Query: {
    allTracks: () => allTracks(),
    oneTrack: (_: any, args: any) => oneTrack(args),
  },
  Mutation: {
    addTrack: (_: any, args: any) => addTrack(args),
  }
};
