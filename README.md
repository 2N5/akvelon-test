# Akwelon Frontend Developer Test Assignment

Sample SPA for displaying, adding, editing and removing invoices.

## Contains:

### Main view
It contains a table that receives a list of accounts, options for dealing with them and the Add New button. After clicking the Add new button user is navigated to the Create Invoice view.

### Create Invoice view
Contains a form that is used for invoice creation. Consists of the following fields:

- Number (text field that should have at least 3 symbols.)
- Invoice Date (ISO Date field)
- Supply Date (ISO Date field)
- Comment (text field, should have no more than 160 characters)

After clicking the Save button invoice entity is saved and user is navigated to the Main View

## Technology stack:

- HTML5
- Vanilla JavaScript
- SCSS
- [Webpack](https://webpack.js.org/)
- [JSON-server](https://github.com/typicode/json-server)

## Coding standards:

- [Prettier](https://prettier.io/) – code formatter
- [ESLint](https://eslint.org/) – JavaScript linter
- [Stylelint](https://stylelint.io/) – CSS linter

### Installation

```
npm install
```

### Start JSON-Server

```
npm run server
```

### Start Dev Server

For the application to work correctly, it requires a running [JSON-server](https://github.com/typicode/json-server)

```
npm start
```

### Build Prod Version

Production app version

```
npm run build
```

