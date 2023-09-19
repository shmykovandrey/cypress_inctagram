describe("backend_test", () => {
  before(() => {
    cy.request("POST", "https://instagramm-backend.vercel.app/auth/login", {
      login: "feomatar",
      password: "feomatar123",
    });
    cy.getCookies("Authorization").as("loginCookies");
  });

  it.only("check cookies", () => {
    cy.getCookies("Authorization")
      .should("have.length", 1)
      .then((cookies) => {
        expect(cookies[0]).to.have.property("name", "Authorization");
        expect(cookies[0]).to.have.property("domain");
        expect(cookies[0]).to.have.property("httpOnly");
        expect(cookies[0]).to.have.property("path");
        expect(cookies[0]).to.have.property("secure");
      });
  });
  it.only("success getProfile", () => {
    cy.get("@loginCookies").then((cookies) => {
      console.log(cookies);
    });
    cy.request(
      "GET",
      "https://instagramm-backend.vercel.app/user/profile"
    ).then((res) => {
      console.log(res);
    });
  });
});
