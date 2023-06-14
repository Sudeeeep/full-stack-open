import { gql, useQuery } from "@apollo/client";
import Genre from "./Genre";
import { useState } from "react";

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
        bookCount
      }
      published
      genres
    }
  }
`;

const Books = (props) => {
  const [genre, setGenre] = useState(null);

  const books = useQuery(ALL_BOOKS, {
    onError: (error) => {
      console.log(error);
    },
  });

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {!genre &&
            books.data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          {genre &&
            books.data.allBooks
              .filter((book) => book.genres.includes(genre))
              .map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
      <Genre setGenre={setGenre} />
    </div>
  );
};

export default Books;
