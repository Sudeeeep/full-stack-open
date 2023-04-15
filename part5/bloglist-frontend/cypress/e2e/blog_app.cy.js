/* eslint-disable no-undef */
describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      name: "Sudeep Nair",
      username: "sudeepn15",
      password: "sudeep@123",
    });
    cy.visit("");
  });

  it("login form is shown", function () {
    cy.get("#username");
    cy.get("#password");
    cy.get("#submit-btn");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("sudeepn15");
      cy.get("#password").type("sudeep@123");
      cy.get("#submit-btn").click();

      cy.get("html").should("contain", "Sudeep Nair logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("sudeepn15");
      cy.get("#password").type("wrongPass");
      cy.get("#submit-btn").click();

      cy.get("html").should("not.contain", "Sudeep Nair logged in");

      cy.get(".error").should("contain", "invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "sudeepn15", password: "sudeep@123" });
    });

    it("A blog can be created", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
        likes: 8,
      });

      cy.contains("test blog");
    });
  });
});
