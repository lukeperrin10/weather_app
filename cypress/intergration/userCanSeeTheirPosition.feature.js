describe('weather info for user\'s location', () => {
  it('is expected to be displayed on initial render', () => {
    cy.visit('/', ({
      onbeforeunload(window) {
        const stubLocation = {
          coords: {
            latitude: 59.33,
            longitude: 18.06,
          }
        };
        cy.stub(window.navigator.geolocation, "getCurrentPosition").callsFake(
          callback => {
            return callback(stubLocation)
          }
        )
      }
    }))
    cy.get('[data-cy=weather-display]').within(() => {
      cy.get('data-cy=temp').should('contain', '10°C');
      cy.get('[data-cy=location]').should('contain', 'Stockholm');


    });
  });
});

