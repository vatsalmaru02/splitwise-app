## Description

Split Expenses App (Splitwise Clone):
    - Features
        - Add Group:
            - Create a group:
                - Name
                - Add members(users)
        - Add Expenses:
            - Form to create an expense:
                - Paid by: (select user)
                - Amount
                - Description
                - Split between: (multi-select users from group)
                - Split type:
                    - Evenly
                    - Custom amounts
            - Example:
                - Alice pays ₹1200, shared between Alice, Bob, and Charlie.
                - Split evenly: Each owes ₹400, Alice is owed ₹800.
        - View Balances:
            - List view showing who owes whom how much.
                - “Bob owes Alice ₹400”
                - “Charlie owes Alice ₹400”
            - Optionally show net balance per person.
        - Settle Up:
            - Select who is paying whom and how much.
            - Update balances accordingly.
            - Cannot settle more than owed amount.



# Splitwise

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
