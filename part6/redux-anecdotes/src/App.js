import Anecdote from "./components/Anecdote";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Anecdote />
      <AnecdoteForm />
    </div>
  );
};

export default App;
