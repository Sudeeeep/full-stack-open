/* eslint-disable no-undef */
describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      name: "Sudeep Nair",
      username: "sudeepn15",
      password: "sudeep@123",
    });
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, {
      name: "test test",
      username: "testuser",
      password: "testuser",
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

    it("user can like a blog", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
        likes: 8,
      });

      cy.contains("test blog");
      cy.get(".viewBtn").click();
      cy.get(".likeBtn").click();

      cy.get(".likes").should("contain", "likes 9");
    });

    it("user who created a blog can delete it", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
        likes: 8,
      });

      // cy.contains("test blog");

      cy.get(".viewBtn").click();
      cy.get(".deleteBtn").click();

      cy.get("html").should("not.contain", "test blog");
    });

    it("only the creator can see the delete button of a blog, not anyone else", function () {
      cy.createBlog({
        title: "test blog",
        author: "test author",
        url: "test url",
        likes: 8,
      });
      cy.get(".viewBtn").click();
      cy.contains("Remove");

      cy.get("#logout-btn").click();

      cy.login({ username: "testuser", password: "testuser" });
      cy.get(".viewBtn").click();
      cy.get(".detailedBlog").should("not.contain", "remove");
    });

    describe("and few blogs are created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "first author",
          url: "first url",
          likes: 100,
        });
        cy.createBlog({
          title: "second blog",
          author: "second author",
          url: "second url",
          likes: 50,
        });
        cy.createBlog({
          title: "third blog",
          author: "third author",
          url: "third url",
          likes: 25,
        });
      });

      it.only("blogs are ordered according to likes", function () {
        cy.get(".blogDiv").eq(0).should("contain", "first blog");
        cy.get(".blogDiv").eq(1).should("contain", "second blog");
        cy.get(".blogDiv").eq(2).should("contain", "third blog");
      });
    });
  });
});
