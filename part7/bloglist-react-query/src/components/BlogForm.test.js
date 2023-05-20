/**
 * @jest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm/> calls event handler with right details when form is submitted", async () => {
  const createBlogFn = jest.fn();
  const { container } = render(<BlogForm createBlog={createBlogFn} />);

  const user = userEvent.setup();

  const title = container.querySelector(".titleInput");
  const author = container.querySelector(".authorInput");
  const url = container.querySelector(".urlInput");
  const createButton = screen.getByText("create");

  await user.type(title, "test blog");
  await user.type(author, "test author");
  await user.type(url, "www.testurl.com");
  await user.click(createButton);

  console.log(createBlogFn);
  console.log(createBlogFn.mock);
  console.log(createBlogFn.mock.calls);

  expect(createBlogFn.mock.calls).toHaveLength(1);
  expect(createBlogFn.mock.calls[0][0]).toContain("test blog");
  expect(createBlogFn.mock.calls[0][1]).toContain("test author");
  expect(createBlogFn.mock.calls[0][2]).toContain("www.testurl.com");
});
