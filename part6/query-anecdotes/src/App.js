import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  createAnecdote,
  getAnecdotes,
  updateAnecdote,
} from "./services/anecdote";
import { useContext } from "react";
import AnecdoteContext from "./AnecdoteContext";

const App = () => {
  const queryClient = useQueryClient();

  const [notification, dispatchNotification] = useContext(AnecdoteContext);

  const handleVote = (anecdote) => {
    voteMutation.mutate(anecdote);
    dispatchNotification({ type: "VOTE", payload: anecdote });
    setTimeout(() => {
      dispatchNotification({ type: "RESET" });
    }, 5000);
  };

  const addAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], [...anecdotes, newAnecdote]);
    },
    onError: (error) => {
      console.log(error.response.data.error);
      dispatchNotification({
        type: "ERROR",
        payload: error.response.data.error,
      });
    },
  });

  const voteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      );
    },
  });

  const anecdotes = useQuery(["anecdotes"], getAnecdotes);

  if (anecdotes.isLoading) {
    return <div>LOADING ANECDOTES...</div>;
  }

  if (anecdotes.isError) {
    return <div>Anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      {notification !== null && <Notification />}

      <AnecdoteForm addAnecdoteMutation={addAnecdoteMutation} />

      {anecdotes.data.map((anecdote) => (
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

export default App;
