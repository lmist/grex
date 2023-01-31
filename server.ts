import { Server } from "https://deno.land/std@0.166.0/http/server.ts";
import { GraphQLHTTP } from "https://deno.land/x/gql@1.1.2/mod.ts";
import { makeExecutableSchema } from "https://deno.land/x/graphql_tools@0.0.2/mod.ts";
import { gql } from "https://deno.land/x/graphql_tag@0.0.1/mod.ts";

import { resolvers } from "./resolvers.ts";
import { typeDefs } from "./typedefs.ts";

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
const schema = makeExecutableSchema ({resolvers, typeDefs});

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
