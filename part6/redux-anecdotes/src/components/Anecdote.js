import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";

const Anecdote = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(incrementVote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdote;
