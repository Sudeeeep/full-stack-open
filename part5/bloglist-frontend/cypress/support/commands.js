/* eslint-disable no-undef */
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/login`,
    body: {
      username,
      password,
    },
  }).then((response) => {
    localStorage.setItem("loggedInBlogUser", JSON.stringify(response.body));
    cy.visit("");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes }) => {
  cy.request({
    method: "POST",
    url: `${Cypress.env("BACKEND")}/blogs`,
    body: {
      title,
      author,
      url,
      likes,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedInBlogUser")).token
      }`,
    },
  });
  cy.visit("");
});
