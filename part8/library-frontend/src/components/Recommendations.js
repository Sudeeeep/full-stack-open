import { gql, useQuery } from "@apollo/client";
import { ALL_BOOKS } from "./Books";

export const USER = gql`
  query {
    me {
      username
      favoriteGenre
      id
    }
  }
`;

const Recommendations = (props) => {
  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error);
    },
  });

  const currentUser = useQuery(USER, {
    onError: (error) => {
      console.log(error);
    },
  });
  console.log(books.data);
  console.log(currentUser.data);
  if (!props.show) {
    return null;
  }
  return (
    <>
      <h2>Recommendations</h2>
      <p>Books in your favorite genre</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {console.log(books.data.allBooks)}
          {books.data.allBooks
            .filter((book) =>
              book.genres.includes(currentUser.data.me.favoriteGenre)
            )
            .map((book) => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommendations;
