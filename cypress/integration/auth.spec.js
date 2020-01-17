// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

function getTestElement(selector) {
  return cy.get(`[data-testid="${selector}"]`);
}

function signInWithPassword(password) {
  // Select Consumer option on step 1
  getTestElement("consumer").click();
  cy.wait(500);

  // Secelt team number 1 on step 2
  getTestElement("number_1").click();
  cy.wait(500);

  // Input password and click sign in button
  getTestElement("inputPassword").type(password);
  getTestElement("buttonAuth").click();
  cy.wait(500);
}

context("Authentication tests", () => {
  beforeEach(() => {
    indexedDB.deleteDatabase("localforage");
    cy.visit(Cypress.env("baseUrl"));
  });

  it("signs in successfully", function() {
    signInWithPassword("consumer1");
    // Check if we got redirected to root url
    cy.url().should("to.eql", "http://localhost:3000/");
  });

  it("gets wrong password message", function() {
    signInWithPassword("foo");
    // Check if we got error panel
    getTestElement("errorPanel").should("to.exist");
  });

  it("signs in successfully and then signs out", function() {
    signInWithPassword("consumer1");

    getTestElement("signOutButton").click();
    cy.wait(500);

    // Check if we got redirected to sign in page
    cy.url().should("to.eql", "http://localhost:3000/auth/signin");
  });
});
