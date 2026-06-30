
describe('Part A - Test Structure', () => {

  before(() => {
    cy.log('Suite starting — one-time setup before all tests');
  });

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/login');
  });

  it('should display the login form', () => {
    cy.get('#username').should('be.visible');
    cy.get('#password').should('be.visible');
  });

  it('should show an error for invalid credentials', () => {
    cy.get('#username').type('wronguser');
    cy.get('#password').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('#flash-message').should('contain', 'invalid');
  });

  it('should login successfully with valid credentials', () => {
    cy.get('#username').type('practice');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/secure');
    cy.get('#flash-message').should('contain', 'You logged into a secure area');
  });

  afterEach(() => {
    cy.clearCookies();
  });

  after(() => {
    cy.log('Suite finished — one-time cleanup after all tests');
  });

});



describe('Part B - Assertions', () => {

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/login');
  });

  it('uses should() - example 1: element visibility', () => {
    cy.get('#username').should('be.visible');
  });

  it('uses should() - example 2: typed value', () => {
    cy.get('#username').type('myUser').should('have.value', 'myUser');
  });

  it('uses should() - example 3: element count', () => {
    cy.get('input').should('have.length', 2);
  });

  it('uses expect() - example 1: number equality', () => {
    const sum = 2 + 2;
    expect(sum).to.equal(4);
  });

  it('uses expect() - example 2: type checking', () => {
    const name = 'Cypress';
    expect(name).to.be.a('string');
  });

  it('uses expect() - example 3: array length', () => {
    const list = [1, 2, 3];
    expect(list).to.have.length(3);
  });

});

describe('Part C - Basic Commands', () => {

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/login');
  });

  it('visits a page', () => {
    cy.url().should('include', 'login');
  });

  it('types into a textbox', () => {
    cy.get('#username').type('testUser');
    cy.get('#username').should('have.value', 'testUser');
  });

  it('clicks a button', () => {
    cy.get('#username').type('practice');
    cy.get('#password').type('SuperSecretPassword!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/secure');
  });

  it('clears a field', () => {
    cy.get('#username').type('testUser').clear();
    cy.get('#username').should('have.value', '');
  });

  it('checks a checkbox', () => {
    cy.visit('https://practice.expandtesting.com/checkboxes');
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  it('unchecks a checkbox', () => {
    cy.visit('https://practice.expandtesting.com/checkboxes');
    cy.get('input[type="checkbox"]').first().check().uncheck().should('not.be.checked');
  });

  it('selects from a dropdown', () => {
    cy.visit('https://practice.expandtesting.com/dropdown');
    cy.get('#dropdown').select('Option 1').should('have.value', '1');
  });

  it('scrolls to an element', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.contains('Form Authentication').scrollIntoView().should('be.visible');
  });

  it('hovers over an element', () => {
    cy.visit('https://the-internet.herokuapp.com/hovers');
    cy.get('.figure').first().trigger('mouseover');
    cy.get('.figure').first().find('.figcaption').should('be.visible');
  });

  it('right clicks an element', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.get('body').rightclick();
  });

  it('double clicks an element', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.get('body').dblclick();
  });

  it('presses keyboard keys', () => {
    cy.get('#username').type('testUser{enter}');
  });

});



describe('Part D - Locators', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/');
  });

  it('cy.get() - finds element by selector', () => {
    cy.get('h1').should('exist');
  });

  it('cy.contains() - finds element by text', () => {
    cy.contains('Checkboxes').should('exist');
  });

  it('.find() - finds inside a parent element', () => {
    cy.get('ul').first().find('li').should('have.length.greaterThan', 0);
  });

  it('.children() - gets direct children', () => {
    cy.get('ul').first().children().should('have.length.greaterThan', 0);
  });

  it('.parent() - gets direct parent', () => {
    cy.get('h1').parent().should('exist');
  });

  it('.closest() - gets nearest matching ancestor', () => {
    cy.get('h1').closest('div').should('exist');
  });

  it('.eq() - gets element by index', () => {
    cy.get('ul li a').eq(2).should('exist');
  });

  it('.first() - gets first matching element', () => {
    cy.get('ul li a').first().should('exist');
  });

  it('.last() - gets last matching element', () => {
    cy.get('ul li a').last().should('exist');
  });

  it('.within() - scopes commands inside a section', () => {
    cy.get('div.example').within(() => {
      cy.get('a').should('exist');
    });
  });

});

describe('Part E - Assertions Practice', () => {

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/login');
  });

  it('be.visible', () => {
    cy.get('#username').should('be.visible');
  });

  it('exist', () => {
    cy.get('#password').should('exist');
  });

  it('contain', () => {
    cy.get('h2').should('contain', 'Test Login');
  });

  it('have.text', () => {
    cy.get('button[type="submit"]').should('have.text', 'Login');
  });

  it('have.value', () => {
    cy.get('#username').type('testUser').should('have.value', 'testUser');
  });

  it('have.length', () => {
    cy.get('input').should('have.length', 2);
  });

  it('be.enabled', () => {
    cy.get('#username').should('be.enabled');
  });

  it('be.checked', () => {
    cy.visit('https://practice.expandtesting.com/checkboxes');
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  it('have.attr', () => {
    cy.get('#username').should('have.attr', 'name', 'username');
  });

});



describe('Part F - Working with Elements', () => {

  it('Buttons', () => {
    cy.visit('https://practice.expandtesting.com/login');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('Text fields', () => {
    cy.visit('https://practice.expandtesting.com/login');
    cy.get('#username').type('John').should('have.value', 'John');
  });

  it('Password fields', () => {
    cy.visit('https://practice.expandtesting.com/login');
    cy.get('#password').type('Secret123').should('have.value', 'Secret123');
  });

  it('Checkboxes', () => {
    cy.visit('https://practice.expandtesting.com/checkboxes');
    cy.get('input[type="checkbox"]').first().check().should('be.checked');
  });

  it('Radio buttons', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.get('label[for="gender-radio-1"]').click();
  });

  it('Dropdowns', () => {
    cy.visit('https://practice.expandtesting.com/dropdown');
    cy.get('#dropdown').select('Option 2').should('have.value', '2');
  });

  it('Text areas', () => {
    cy.visit('https://demoqa.com/automation-practice-form');
    cy.get('#currentAddress').type('123 Main Street').should('have.value', '123 Main Street');
  });

  it('Links', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.contains('A/B Testing').click();
    cy.url().should('include', 'abtest');
  });

  it('Images', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.get('img').should('exist');
  });

});

describe('Part G - Waiting', () => {

  it('automatic waiting', () => {
    cy.visit('https://the-internet.herokuapp.com/dynamic_loading/1');
    cy.get('#start button').click();
    cy.get('#finish').should('be.visible');
  });

  it('retry-ability', () => {
    cy.visit('https://the-internet.herokuapp.com/dynamic_loading/2');
    cy.get('#start button').click();
    cy.get('#finish h4').should('contain', 'Hello World');
  });

  it('cy.wait() fixed wait', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.wait(1000);
    cy.get('h1').should('be.visible');
  });

  it('waiting for an API request using cy.intercept()', () => {
    cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1').as('getPost');
    cy.visit('https://jsonplaceholder.typicode.com/posts/1');
  });

  it('waiting for page load', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.get('h1').should('be.visible');
  });

});


describe('Part H - Forms', () => {

  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('fills out the full practice form and submits it', () => {
    cy.get('#firstName').type('John');
    cy.get('#lastName').type('Doe');
    cy.get('#userEmail').type('johndoe@example.com');

    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select('1995');
    cy.get('.react-datepicker__month-select').select('5');
    cy.get('.react-datepicker__day--010:not(.react-datepicker__day--outside-month)').first().click();

    cy.get('#subjectsInput').type('Maths{enter}');

    cy.get('label[for="hobbies-checkbox-1"]').click();

    cy.get('label[for="gender-radio-1"]').click();

    cy.get('#submit').click();

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



describe('Part J - Browser Interactions', () => {

  it('browser back and forward', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.contains('A/B Testing').click();
    cy.url().should('include', 'abtest');
    cy.go('back');
    cy.url().should('eq', 'https://the-internet.herokuapp.com/');
    cy.go('forward');
    cy.url().should('include', 'abtest');
  });

  it('reload', () => {
    cy.visit('https://the-internet.herokuapp.com/');
    cy.reload();
    cy.get('h1').should('be.visible');
  });

  it('new tab - Cypress stays single-tab, so we check the link instead', () => {
    cy.visit('https://the-internet.herokuapp.com/windows');
    cy.get('a[target="_blank"]').should('have.attr', 'href');
  });

  it('browser alert', () => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    cy.on('window:alert', (text) => {
      expect(text).to.equal('I am a JS Alert');
    });
    cy.contains('Click for JS Alert').click();
  });

  it('confirmation dialog', () => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    cy.on('window:confirm', () => true);
    cy.contains('Click for JS Confirm').click();
    cy.get('#result').should('contain', 'Ok');
  });

  it('prompt dialog', () => {
    cy.visit('https://the-internet.herokuapp.com/javascript_alerts');
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Cypress test input');
    });
    cy.contains('Click for JS Prompt').click();
    cy.get('#result').should('contain', 'Cypress test input');
  });

});

describe('Part K - Keyboard Actions', () => {

  beforeEach(() => {
    cy.visit('https://practice.expandtesting.com/login');
  });

  it('Enter', () => {
    cy.get('#username').type('practice');
    cy.get('#password').type('SuperSecretPassword!{enter}');
    cy.url().should('include', '/secure');
  });

  it('Tab', () => {
    cy.get('#username').type('testUser{tab}');
  });

  it('Escape', () => {
    cy.get('#username').type('testUser{esc}');
  });

  it('Arrow keys', () => {
    cy.get('#username').type('testUser{leftarrow}{rightarrow}{uparrow}{downarrow}');
  });

  it('Delete', () => {
    cy.get('#username').type('testUser{del}');
  });

  it('Backspace', () => {
    cy.get('#username').type('testUser{backspace}{backspace}').should('have.value', 'testUs');
  });

});



describe('Part L - Scrolling', () => {

  beforeEach(() => {
    cy.visit('https://the-internet.herokuapp.com/large');
  });

  it('scrolls to the bottom of the page', () => {
    cy.scrollTo('bottom');
  });

  it('scrolls to the top of the page', () => {
    cy.scrollTo('bottom');
    cy.scrollTo('top');
  });

  it('scrolls to a specific element', () => {
    cy.get('#large-table').scrollIntoView();
  });

  it('verifies the element becomes visible after scrolling', () => {
    cy.get('#large-table').scrollIntoView().should('be.visible');
  });

});



describe('Part M - File Upload', () => {

  it('uploads a sample file', () => {
    cy.visit('https://practice.expandtesting.com/upload');
    cy.get('#fileInput').selectFile('cypress/fixtures/sample-image.png');
    cy.get('#fileSubmit').click();
    cy.get('#uploaded-files').should('contain', 'sample-image.png');
  });

});


cy.screenshot();