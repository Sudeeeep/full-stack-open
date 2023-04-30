import { useSelector, useDispatch } from "react-redux";
import { updateVotesInDb } from "../reducers/anecdoteReducer";
import { handleNotification } from "../reducers/notificationReducer";

const Anecdote = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(updateVotesInDb(anecdote));
    dispatch(handleNotification(`You voted for '${anecdote.content}'`, 5000));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Anecdote;
