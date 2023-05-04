import { useContext } from "react";
import AnecdoteContext from "../AnecdoteContext";

const AnecdoteForm = ({ addAnecdoteMutation }) => {
  const [notification, dispatchNotification] = useContext(AnecdoteContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    addAnecdoteMutation.mutate({ content, votes: 0 });
    dispatchNotification({ type: "CREATE", payload: content });
    setTimeout(() => {
      dispatchNotification({ type: "RESET" });
    }, 5000);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
