import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecdoteServices from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const handleNewAnecdote = async (e) => {
    e.preventDefault();
    const newAnecdote = e.target.newAnecdote.value;
    e.target.newAnecdote.value = "";
    const newAnecdoteToAdd = await anecdoteServices.create(newAnecdote);
    dispatch(createAnecdote(newAnecdoteToAdd));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input name="newAnecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
