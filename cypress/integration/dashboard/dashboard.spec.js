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

Cypress.Commands.add('upload_file', (selector, fileUrl, type = '') => {
  return cy.fixture(fileUrl, 'base64')
    .then(Cypress.Blob.base64StringToBlob)
    .then(blob => {
      const nameSegments = fileUrl.split('/')
      const name = nameSegments[nameSegments.length - 1]
      const testFile = new File([blob], name, { type })
      const event = { dataTransfer: { files: [testFile] } }
      return cy.get(selector).trigger('drop', event)
    })
});

describe("drag and drop upload", () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.get('#username').type('dftadmin');
    cy.get('#outlined-adornment-password').type('dft$123');
    cy.get('#login').click();
  });

  it("uploads file from filesystem", () => {
    cy.upload_file('#drop-zone', '../../public/resources/serialPartTypization.csv', 'text/csv');
    cy.get('#upload-button').click();
  });
});