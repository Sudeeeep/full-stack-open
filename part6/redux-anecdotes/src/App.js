import { useDispatch, useSelector } from "react-redux";
import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import { initialAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAnecdotes());
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
