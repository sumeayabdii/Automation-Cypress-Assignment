
describe('Part H - Forms', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

   it('fills only mandatory fields and submits successfully', () => {
   
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userNumber').type('1234567890'); 

    cy.get('label[for="gender-radio-1"]').click();

    
    cy.get('#submit').click({ force: true });

    
    cy.get('.modal-content').should('be.visible');
    cy.get('#example-modal-sizes-title-lg').should('contain', 'Thanks for submitting the form');
  });

});

describe('Part I - Tables', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/tables');
  });

  it('counts rows', () => {
    cy.get('#table1 tbody tr').should('have.length', 4);
  });

  it('counts columns', () => {
    cy.get('#table1 thead th').should('have.length', 6);
  });

  it('reads data from a row', () => {
    cy.get('#table1 tbody tr').first().find('td').eq(0).should('contain', 'Smith');
    cy.get('#table1 tbody tr').first().find('td').eq(1).should('contain', 'John');
  });

  it('clicks a button inside a row', () => {
    cy.get('#table1 tbody tr').first().contains('delete').click();
  });

  it('verifies table contents', () => {
    cy.get('#table1').should('contain', 'Doe');
    cy.get('#table1').should('contain', 'jdoe@hotmail.com');
  });

});


describe(' Part N Mini Project- Web Table Automation Tour', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', () => false);
    
    
    cy.visit('https://testautomationpractice.blogspot.com');
  });

  it('verifies web table data and structures', () => {
    
    cy.get('table[name="BookTable"]').find('tr').should('have.length', 7);
    cy.get('table[name="BookTable"]').find('th').should('have.length', 4);

    
    cy.get('table[name="BookTable"]').find('tr').eq(1).within(() => {
      cy.get('td').eq(0).should('have.text', 'Learn Selenium');
      cy.get('td').eq(1).should('have.text', 'Amit');
    });

    
    cy.get('#productTable').contains('td', 'Laptop')
      .parent('tr')
      .find('input[type="checkbox"]')
      .check()
      .should('be.checked');
  });
});
      