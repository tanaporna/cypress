import { loginElements } from "../../support/pages/login_element";
import { dashBoardElement } from "../../support/pages/dashboard_element";

const url =
  "https://staging.arthuronline.co.uk/login?X-MODE=QA-eW91LXdpbi1ub3RoaW5nCg";
const loginEmail = "infrastructure+candidate1@arthuronline.com";
const loginPassword = "vhz!jbe9pfj3qgm!UVR";

const timeout = 36000;

describe("Add property", () => {
  beforeEach(() => {
    cy.visit(url);
    cy.get(loginElements.EmailInput).type(loginEmail);
    cy.get(loginElements.PasswordInput).type(loginPassword);
    cy.get(loginElements.LogingButton).click();
  });

  it("should be able to add property with multiple rentable units", () => {
    cy.get(dashBoardElement.PropertiesMenu, { timeout: timeout }).should(
      "be.visible"
    );
    cy.get(dashBoardElement.PropertiesMenu).click();
    cy.contains("Add Property").click();
    cy.get(dashBoardElement.LoadingOverlay, { timeout: timeout })
      .should("exist")
      .and("have.css", "display", "none");
    cy.get(dashBoardElement.PropertyNewForm, { timeout: timeout }).should(
      "be.visible"
    );
    cy.get(dashBoardElement.MultipleUnit).click();
    cy.randNum(4);
    cy.get("@randNum").then((num) => {
      const name = `My Resident - ${num}`;
      cy.get(dashBoardElement.Name).eq(0).type(name);

      cy.get(dashBoardElement.PropertyOwnerDropdown).click();
      cy.get(dashBoardElement.PropertyChoice).click();
      cy.get(dashBoardElement.Address1).type("Arthur Online Ltd Unit 2 ");
      cy.get(dashBoardElement.Address2).type(
        " Iron Bridge House Bridge Approach"
      );
      cy.get(dashBoardElement.City).type("London");
      cy.get(dashBoardElement.PostalCode).type("NW1 8BD");
      cy.get(dashBoardElement.Country).type("United Kingdom");
      cy.get(dashBoardElement.Area).select("No matches found");
      cy.get(dashBoardElement.FullyManage).should("be.checked");
      cy.get(dashBoardElement.UnitCount).clear().type(1);
      cy.get(dashBoardElement.NextButton).click();
      cy.randText(1);
      cy.get("@randText").then((text) => {
        const unit = `Unit {01} - ${text}`;
        cy.get(dashBoardElement.UnitRef)
          .clear()
          .type(unit, { parseSpecialCharSequences: false });
      });

      cy.get(dashBoardElement.unitType).select("Residential");
      cy.get(dashBoardElement.SelectManager).click();
      cy.get(dashBoardElement.SelectManagerDropDown).eq(1).click();
      cy.get(dashBoardElement.CertType).click();
      cy.get(dashBoardElement.CertTypeDropdown).eq(20).click();

      cy.get(dashBoardElement.UnitDetailType).eq(0).select("Rooms");
      cy.get(dashBoardElement.UnitDetailType).eq(1).select("Bed");

      cy.get(dashBoardElement.UnitDetailOwner).eq(0).select("Test 1");
      cy.get(dashBoardElement.UnitDetailOwner).eq(1).select("Test 1");

      cy.get(dashBoardElement.UnitDetailManager).eq(0).select("Qa Tester");
      cy.get(dashBoardElement.UnitDetailManager).eq(1).select("Qa Tester");

      cy.get(dashBoardElement.AddpropertyButton).click();
      cy.get(".properties.guide")
        .contains("Multiple Units Added ")
        .should("be.visible");
      cy.get(dashBoardElement.PropertiesMenu, { timeout: timeout }).should(
        "be.visible"
      );
      cy.get(dashBoardElement.PropertiesMenu).click();
      console.log(name);
      cy.get(dashBoardElement.DashboardPropertyName)
        .contains(name)
        .should("be.visible");
    });
  });
});
