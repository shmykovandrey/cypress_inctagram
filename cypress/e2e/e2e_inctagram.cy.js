beforeEach(() => {
  cy.visit("https://inst-project.vercel.app/");
  cy.get("#__next").should("be.visible");
});
describe("template spec", () => {
  it("openStartPage", () => {
    cy.location("pathname").should("eq", "/sign-in");
  });

  it("registrationNewUserPositive", () => {
    cy.location("pathname").should("eq", "/sign-in");
    cy.get("a").contains("Sign Up").as("goToRegistration").click();
    cy.wait(1000).location("pathname").should("eq", "/sign-up");
    cy.get("input[name=userName]").type("trololo");
    cy.get("input[name=email]").type("trololo@gmail.com");
    cy.get("input[name='password.password']").type("qweqweqwe");
    cy.get("input[name='password.confirmPassword']").type("qweqweqwe");
    cy.get("button[role=checkbox]").click();
    cy.get("button[type=submit]").click();
    cy.wait(4000);
    cy.get("p").should(
      "contain",
      "We have sent a link to confirm your email to"
    );
  });

  it("authRegistredUserPositive", () => {
    cy.get("input[name=userName]").type("trololo");
    cy.get("input[name=password]").type("qweqweqwe");
    cy.get("button[type=submit]").click();
    cy.wait(5000);
    cy.location("pathname").should("eq", "/profile");
  });

  it("deleteAuthUser", () => {
    cy.request("POST", "https://instagramm-backend.vercel.app/auth/login", {
      login: "trololo",
      password: "qweqweqwe",
    });
    cy.request("DELETE", "https://instagramm-backend.vercel.app/user/delete");
  });
});
