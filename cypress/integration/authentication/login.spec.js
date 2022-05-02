// Copyright 2022 Catena-X
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/// <reference types="cypress" />

describe('authentication', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('login with error', () => {
    cy.get('#username').type('test123');
    cy.get('#outlined-adornment-password').type('test123');
    cy.get('#login').click();
    cy.get('#login-error-label', { timeout: 10000 }).should('be.visible');
  });

  it('login successfully', () => {
    cy.get('#username').type('dftadmin');
    cy.get('#outlined-adornment-password').type('dft$123');
    cy.get('#login').click();
    cy.get('#navbar-title', { timeout: 10000 }).should('be.visible');
  });
});
