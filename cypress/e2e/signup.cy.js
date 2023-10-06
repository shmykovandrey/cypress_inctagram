///<reference types="cypress" />

describe("Sign up", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should do register user", () => {
    cy.get('.navbar a[href$="/register"]').click();
    cy.url().should("include", "/#/register");

    cy.get(".auth-page").as("registerPage");
    cy.get("@registerPage").find("h1").should("have.text", "Sign up");
    cy.get("@registerPage")
      .find("form")
      .should("be.visible")
      .as("registerForm");

    const rnd = Math.round(Math.random() * 8999) + 1000;

    const username = "userp_" + rnd;
    const email = username + "@gmail.com";

    cy.get("@registerForm").find("input[ng-model$=username]").type(username);
    cy.get("@registerForm").find("input[ng-model$=email]").type(email);
    cy.get("@registerForm")
      .find("input[ng-model$=password]")
      .type("xyzXYZ123_");
    cy.get("@registerPage").find("button[type=submit]").click();

    cy.get(".navbar").should("contain.text", username);
  });

  it("should do login user", () => {
    cy.get('.navbar a[href$="/login"]').click();
    cy.url().should("include", "/#/login");

    cy.get(".auth-page h1").should("have.text", "Sign in");
    cy.get(".auth-page form").should("be.visible");

    cy.get(".auth-page form input[ng-model$=email]").type(
      "test_anton@gmail.com"
    );
    cy.get(".auth-page form input[ng-model$=password]").type("xyzXYZ123_");
    cy.get(".auth-page form button[type=submit]").click();

    cy.get(".navbar").should("contain.text", "test_anton");
  });

  it("should do logout user", () => {
    const username = "test_anton";

    // for login
    cy.get('.navbar a[href$="/login"]').click();
    cy.url().should("include", "/#/login");

    cy.get(".auth-page h1").should("have.text", "Sign in");
    cy.get(".auth-page form").should("be.visible");

    cy.get(".auth-page form input[ng-model$=email]").type(
      "test_anton@gmail.com"
    );
    cy.get(".auth-page form input[ng-model$=password]").type("xyzXYZ123_");
    cy.get(".auth-page form button[type=submit]").click();

    cy.get(".navbar").should("contain.text", username);

    // for logout
    cy.get('.navbar a[href$="/settings"]').click();
    cy.get(".settings-page h1").should("have.text", "Your Settings");
    // TODO: improve selector to button[data-cy=logout]
    cy.get(".settings-page button[ng-click*=logout]").click();

    cy.get(".navbar").should("not.contain.text", username);
  });
});
