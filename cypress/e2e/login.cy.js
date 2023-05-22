import { loginElements } from "../support/pages/login_element";

const baseUrl =
  "https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg";

const loginEmail = "infrastructure+candidate1@arthuronline.com";
const loginPassword = "vhz!jbe9pfj3qgm!UVR";

describe("template spec", () => {
  it("passes", () => {
    cy.visit(baseUrl);
    cy.get(loginElements.EmailInput).type(loginEmail);
    cy.get(loginElements.PasswordInput).type(loginPassword);
    cy.get(loginElements.LogingButton).click();
  });
});
