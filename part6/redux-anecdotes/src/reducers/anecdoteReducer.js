import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload;
      const anecdoteToIncrement = state.find((s) => s.id === id);
      anecdoteToIncrement.votes++;
      state.sort((a, b) => b.votes - a.votes);
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    getAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { vote, createAnecdote, getAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
