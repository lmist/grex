// needed to serve things, "constructs our http server"
import { Server } from "https://deno.land/std@0.166.0/http/server.ts";
// required middleware which will use "schema"
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";


/* This reads:
 *
 * there is a query for a field named track.
 * the field is of type string.
 *
 * */
const typeDefs = gql`
  type Query {
    track: String
  }
`;

/*
 * Once a type is defined, typedef'd,
 * we need means of handling the functionality (resolving) of that typedef.
 * enter resolvers, these could be as simple as this:
*/
const resolvers = {
  Query: {
    track: () => `clair de lune`,
  },
};

const schema  = makeExecutableSchema( { resolvers, typeDefs} );

/*
 * In GraphQL,
 * 
 * we define types (queries or mutations) and then resolvers for those types
 * these together constitute something called a GraphQL schema
 * typdef = query | mutation // typedef is query or a mutation
 * resolver = f(*) => typedef // resolver is a function of arbitrary args that returns a typedef
 * schema = typedef + resolver // schema is composed of typedefs and resolvers
 */


/*
 * The server wrapper will take:
 *  - handler:
 *  basically handles the incoming request from the browser
 *  an async function which has access to a request var
 *  everytime it's hit.
 *  Given the correct endpoint is hit, `/graphql` in this case,
 *  the GraphQLHTTP middleware will be ran.
 *  The middleware in turn takes our schema as a required arg.
 *  It is optional to use the graphiql interface, otherwise,
 *  another http client will suffice, i.e, curl, postman, or python requests.
*/ 
const server = new Server({
  handler: async (req) => {
    const { pathname } = new URL(req.url)
    return pathname === "/graphql"
    ? await GraphQLHTTP<Request>({
      schema,
      /* Is this free from CSRF? */
      graphiql: true,
    })(req) /* What's this? */
    : new Response("Not Found", { status: 404 });
  },
  port: 7777,
});

/* Main wrapper */
server.listenAndServe();
