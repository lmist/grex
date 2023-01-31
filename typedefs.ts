import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

// explained it in two ways here, can we use the best of both?

/*
 * let Track be a type defined as having four fields.
 *
 * let our Queries be one to get:
 * - all tracks -- allTracks: [Track], i.e., a list of
 * - a single track by its name -- oneTrack(name: string): Track, i.e., one
 *
 * let our Mutations be one to:
 * - add a track addTrack(name: String, artist: String, album: String, year: Int): Track
 */

/*
 * we have two queries here
 * - `allTracks`
 * - `oneTrack`
 * 
 * `allTracks` returns a list of tracks (that's why it's wrapped in squares)
 * `oneTrack` returns *one* `Track`
 *
 * a Track is the object returned from our Qureries,
 *
 * it contains:
 *
 * String name, artist, album and Int (integer) year
 */

export const typeDefs = gql`
  type Track {
    name: String
    artist: String
    album: String
    year: Int
  }

  type Query {
    allTracks: [Track]
    oneTrack (name: String): Track
  }

  type Mutation {
    addTrack(name: String, artist: String, album: String, year: Int): Track
  }
`;


