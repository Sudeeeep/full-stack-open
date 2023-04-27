import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdote;
