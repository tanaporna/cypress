/// <reference types ="Cypress" />

describe("Testing API Endpoints Using Cypress", () => {
  it("should be able to get user lists", () => {
    const expectedResult = [
      {
        id: 7,
        email: "michael.lawson@reqres.in",
        first_name: "Michael",
        last_name: "Lawson",
        avatar: "https://reqres.in/img/faces/7-image.jpg",
      },
      {
        id: 8,
        email: "lindsay.ferguson@reqres.in",
        first_name: "Lindsay",
        last_name: "Ferguson",
        avatar: "https://reqres.in/img/faces/8-image.jpg",
      },
      {
        id: 9,
        email: "tobias.funke@reqres.in",
        first_name: "Tobias",
        last_name: "Funke",
        avatar: "https://reqres.in/img/faces/9-image.jpg",
      },
      {
        id: 10,
        email: "byron.fields@reqres.in",
        first_name: "Byron",
        last_name: "Fields",
        avatar: "https://reqres.in/img/faces/10-image.jpg",
      },
      {
        id: 11,
        email: "george.edwards@reqres.in",
        first_name: "George",
        last_name: "Edwards",
        avatar: "https://reqres.in/img/faces/11-image.jpg",
      },
      {
        id: 12,
        email: "rachel.howell@reqres.in",
        first_name: "Rachel",
        last_name: "Howell",
        avatar: "https://reqres.in/img/faces/12-image.jpg",
      },
    ];

    cy.request({
      method: "GET",
      url: "https://reqres.in/api/users?page=2",
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.total).to.eq(12);
      expect(res.body.data).to.have.length(res.body.per_page);
      res.body.data.forEach((user, index) => {
        expect(user.email).to.equal(expectedResult[index].email);
        expect(user.first_name).to.equal(expectedResult[index].first_name);
        expect(user.last_name).to.equal(expectedResult[index].last_name);
        expect(user.avatar).to.equal(expectedResult[index].avatar);
      });
    });
  });

  it("should be able to login successfully", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).has.property("token");
    });
  });

  it("should be able to login unsuccessfully", () => {
    cy.request({
      method: "POST",
      url: "https://reqres.in/api/login",
      body: {
        email: "peter@klaven",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).has.property("error", "Missing password");
    });
  });
});
