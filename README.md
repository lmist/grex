# grex

## API

<table>
<thead><tr><th>Queries</th><th>Mutations</th></tr></thead>
<tbody>
<tr><td>

```gql
query {
  allTracks {
    name
      artist
      album
    year
  }
}
```

</td><td>

```gql
mutation {
  addTrack(
    name: "Clair De Lune",
    artist: "Claude Debussy",
    album: "Impressionist Mixtape Vol. 1",
    year: 3023
  ) {
    name,
    artist,
    album,
    year,
  }
}
```
</td></tr>
<!-- <tr><td> -->
</tbody></table>

## todos

- [X] refactor into separate files
- [X] attach postgres db
- [ ] move to an ORM instead of raw SQL
- [ ] error handling (db connection)
- [ ] monadic null checks
- [ ] some logging would be nice

- [ ] CA Certificate for TLS connection to DB

- [ ] github actions
- [ ] check with CSRF on exposing the graphiql environment
- [ ] dockerize

- [ ] move gql typedefs to `.gql` files
- [ ] add deno project settings incl. fmt and lint
