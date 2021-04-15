describe("weather info for user`s location", () => {
  it("is expected to be displayed on initial render", () => {
    cy.visit("/",( {
      onbeforeunload(window) {
        const stubLocation = {
          coords: {
            latitude: 59.46081,
            longitude: 17.88477,
          },
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          (callback) => {
            return callback(stubLocation);
          }
        );
      },
    }));
    cy.get("[data-cy=weather-display]").within(() => {
      cy.get("[data-cy=temp]").should("contain", "7°C");
      cy.get("[data-cy=location]").should("contain", "Stockholm");
    });
  });
});
