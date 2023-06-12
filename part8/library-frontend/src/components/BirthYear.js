import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS } from "./Authors";

const SET_BORN = gql`
  mutation setBirthYear($name: String!, $born: Int!) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`;

const BirthYear = ({ authors }) => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error);
    },
  });

  const handleBorn = () => {
    editAuthor({ variables: { name, born: Number(born) } });
  };

  return (
    <>
      <h2>Set BirthYear</h2>
      <form onSubmit={handleBorn}>
        <div>
          Name:
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {authors.map((author) => (
              <option value={author.name} key={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          Born:
          <input
            type="text"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button>Update author</button>
      </form>
    </>
  );
};
export default BirthYear;
