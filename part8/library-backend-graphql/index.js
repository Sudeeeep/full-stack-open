const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
let { authors, books } = require("./data");
const { v4: uuid } = require("uuid");

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

  type Mutation {
    addBook(title: String!, author: String!, published: Int, genres: [String!]) : Book 
    editAuthor(name: String! , setBornTo: Int!) : Author
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

  Mutation: {
    addBook: (root, args) => {
      const author = authors.find((author) => author.name === args.author);

      if (!author) {
        authors.push({ id: uuid(), name: args.author });
      }
      books.push(args);
      const [book] = books.filter((book) => book.title === args.title);
      return book;
    },

    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (author) {
        author.born = args.setBornTo;
      }
      return author;
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
