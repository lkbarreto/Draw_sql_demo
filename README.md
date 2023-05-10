# SqlDrawDemo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## JSON-SERVER API

json example: 

{
  "tables": [
    {
      "id": "tabla 1",
      "columns": [
        {
          "id": "columna1",
          "type": "Text",
          "isUnique": false
        },
        {
          "id": "columna 2",
          "type": "Number",
          "isUnique": true
        },
        {
          "id": "columna 3",
          "type": "Boolean",
          "isUnique": false
        }
      ]
    },
    {
      "id": "tabla 2",
      "columns": [
        {
          "id": "name",
          "type": "Text",
          "isUnique": false
        },
        {
          "id": "id",
          "type": "Number",
          "isUnique": true
        },
        {
          "id": "table",
          "type": "Boolean",
          "isUnique": false
        }
      ]
    }
  ]
}
