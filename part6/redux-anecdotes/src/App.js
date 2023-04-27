import { useDispatch, useSelector } from "react-redux";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import anecdoteServices from "./services/anecdotes";
import { getAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteServices
      .getAll()
      .then((anecdotes) => dispatch(getAnecdotes(anecdotes)));
  }, [dispatch]);

  const notification = useSelector((state) => state.notification);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      {notification !== null && <Notification />}
      <Anecdote />
      <AnecdoteForm />
    </div>
  );
};

export default App;
