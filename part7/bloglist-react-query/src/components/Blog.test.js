/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog/>", () => {
  const blog = {
    title: "test blog",
    author: "Sudeep Nair",
    url: "www.blogs.com/test",
    likes: 0,
    user: {
      username: "username",
      name: "name",
    },
  };

  let container;
  const likeHandler = jest.fn();
  beforeEach(() => {
    container = render(
      <Blog currentBlog={blog} likeBlog={likeHandler} />
    ).container;
  });

  test("renders title and author only by default", () => {
    const title = container.querySelector(".title");
    const author = container.querySelector(".author");
    const url = container.querySelector(".url");
    const likes = container.querySelector("likes");

    expect(title).toBeInTheDocument();
    expect(author).toBeInTheDocument();

    expect(url).not.toBeInTheDocument();
    expect(likes).not.toBeInTheDocument();
  });

  test("renders blog's url and likes when view button is clicked", async () => {
    const viewBtn = container.querySelector(".viewBtn");
    const user = userEvent.setup();

    await user.click(viewBtn);

    const url = container.querySelector(".url");
    const likes = container.querySelector(".likes");

    expect(url).toBeInTheDocument();
    expect(likes).toBeInTheDocument();
  });

  test("event handler is called when like button is clicked", async () => {
    const viewBtn = container.querySelector(".viewBtn");
    const user = userEvent.setup();

    await user.click(viewBtn);

    const likeBtn = container.querySelector(".likeBtn");
    screen.debug(likeBtn);
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(likeHandler.mock.calls).toHaveLength(2);
  });
});
