# grex

## API

<table>
<thead><tr><th>Queries</th><th>Mutations</th></tr></thead>
<tbody>
<tr><td>

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

</td><td>

```gql
```

</td></tr>
<tr><td>

## todos

- [X] refactor into separate files
- [X] attach postgres db
- [ ] move to an ORM instead of raw SQL
- [ ] error handling (db connection)
- [ ] monadic null checks

- [ ] github actions
- [ ] check with CSRF on exposing the graphiql environment
- [ ] dockerize

- [ ] move gql typedefs to `.gql` files
- [ ] add deno project settings incl. fmt and lint
