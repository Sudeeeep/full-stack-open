const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
let { authors, books } = require("./data");
const { v4: uuid } = require("uuid");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("./models/User");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connection successful"))
  .catch((err) => console.log(err.message));

const typeDefs = `
  type Book{
  title: String!
  author: Author!
  published: Int
  genres: [String!]
  }

  type Author {
    id: ID!
    name: String!
    bookCount: Int!
    born: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(title: String!, author: String!, published: Int, genres: [String!]) : Book 
    editAuthor(name: String! , setBornTo: Int!) : Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.count({}),
    authorCount: () => Author.count({}),
    allBooks: async (root, args) => {
      console.log(args.genre);
      if (args.author) {
        const authorId = await getAuthorId(args.author);
        console.log(authorId);
        return await Book.find({ author: authorId }).populate("author");
      }
      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } }).populate("author");
      }
      const book = await Book.find({}).populate("author");
      return book;
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, { currentUser }) => currentUser,
  },

  Author: {
    bookCount: async (root) => {
      return await Book.count({ author: root });
    },
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      let [bookAuthor] = await Author.find({ name: args.author });
      if (!bookAuthor || bookAuthor === []) {
        bookAuthor = new Author({ name: args.author });
        try {
          await bookAuthor.save();
        } catch (err) {
          throw new GraphQLError("Saving author failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              err,
            },
          });
        }
      }
      const book = new Book({ ...args, author: bookAuthor });
      try {
        return book.save();
      } catch (err) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            err,
          },
        });
      }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      console.log(author);

      author.born = args.setBornTo;
      return author.save();
    },

    createUser: async (root, args) => {
      const user = new User(args);

      return user.save().catch((error) => {
        throw new GraphQLError("creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userPayload = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userPayload, process.env.SECRET) };
    },
  },
};

const getAuthorId = async (name) => {
  const author = await Author.findOne({ name });
  return author === null ? null : author.id;
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req.headers.authorization;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
