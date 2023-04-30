import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

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
      console.log(action.payload.id);
      const id = action.payload.id;
      const votedAnecdote = action.payload;
      return state
        .map((anecdote) => (anecdote.id !== id ? anecdote : votedAnecdote))
        .sort((a, b) => b.votes - a.votes);
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
      state.sort((a, b) => b.votes - a.votes);
    },
    getAnecdotes(state, action) {
      return action.payload.sort((a, b) => b.votes - a.votes);
    },
  },
});

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(getAnecdotes(anecdotes));
  };
};

export const createAnecdote = (newAnecdote) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdoteService.create(newAnecdote);
    dispatch(appendAnecdote(createdAnecdote));
  };
};

export const updateVotesInDb = (anecdote) => {
  return async (dispatch) => {
    console.log(anecdote);
    const updatedAnecdote = await anecdoteService.vote(anecdote);
    dispatch(vote(updatedAnecdote));
  };
};

export const { vote, appendAnecdote, getAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
