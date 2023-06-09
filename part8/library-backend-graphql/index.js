const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { authors, books } = require("./data");

const typeDefs = `
  type Book{
  title: String!
  author: String!
  published: Int
  genres: [String!]
  }

  type Author {
    id: ID!
    name: String!
    bookCount: Int!
    born: Int
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: () => authors,
  },

  Author: {
    bookCount: (root) => {
      return books.filter((book) => book.author === root.name).length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
