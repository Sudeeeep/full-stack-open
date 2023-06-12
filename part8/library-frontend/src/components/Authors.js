import { gql, useQuery } from "@apollo/client";
import BirthYear from "./BirthYear";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log(error);
    },
  });

  if (!props.show) {
    return null;
  }

  if (authors.loading) {
    return <h1>LOADING...</h1>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYear authors={authors.data.allAuthors} />
    </div>
  );
};

export default Authors;
