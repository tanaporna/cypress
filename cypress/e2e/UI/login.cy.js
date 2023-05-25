import { loginElements } from "../../support/pages/login_element";

const url =
  "https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg";
const loginEmail = "infrastructure+candidate1@arthuronline.com";
const loginPassword = "vhz!jbe9pfj3qgm!UVR";

// const url = Cypress.env("WEB_URL");
// const loginEmail = Cypress.env("USER_EMAIL");
// const loginPassword = Cypress.env("USER_PASSWORD");

describe("Login Test", () => {
  it("should be able to login successful", () => {
    cy.visit(url);
    cy.get(loginElements.EmailInput).type(loginEmail);
    cy.get(loginElements.PasswordInput).type(loginPassword);
    cy.get(loginElements.LogingButton).click();
  });
});
