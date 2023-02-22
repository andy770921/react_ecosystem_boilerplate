# react ecosystem boilerplate

## Demo packages

- [Create React App](https://github.com/facebook/create-react-app)
- [React Router (react-router-dom v6)](https://reactrouter.com/en/main/start/overview)
- [React Query (@tanstack/react-query v4)](https://tanstack.com/query/latest/docs/react/overview)

## Demo API endpoints:

- [GitHub API](https://docs.github.com/en/rest/repos/repos)

- In order to call above API, it needs your [GitHub personal access token with read access](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

- Update `.env` with your personal access GitHub token

```
REACT_APP_GITHUB_TOKEN=github_pat_xxx
```

## CRA and ESLint/Prettier Installation Step:

1. Install VSCode extension [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

2. Install [Create-React-App](https://create-react-app.dev/docs/getting-started#creating-a-typescript-app).

```
npx create-react-app my-app --template typescript
```

3. Create a [standard .eslintrc](https://levelup.gitconnected.com/configure-eslint-and-prettier-for-your-react-project-like-a-pro-2022-10287986a1b6): select “To check syntax and find problems” and finish all steps. It will finally generate `.eslintrc` file.

```
npm init @eslint/config
```

4.  Install `prettier` and some relevant stuff [explained here](https://prettier.io/docs/en/install.html#eslint-and-other-linters).

```
npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

5. Create `.prettierrc`.

```json
{
  "semi": true,
  "tabWidth": 2,
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true
}
```

6. Update `.eslintrc` content: `"extends"` and `"plugins"` need to be add with `"prettier"`. `"prettier/prettier": ["error"]` is for indicating the red wavy underline of code.

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "prettier/prettier": ["error"]
  }
}
```

7. Copy `.eslintrc` content and delete `.eslintrc`. Paste the content into `package.json` under `"eslintConfig"`.

```json
{
  "eslintConfig": {
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier"
    ],
    "overrides": [],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": ["react", "@typescript-eslint", "prettier"],
    "rules": {
      "prettier/prettier": ["error"]
    }
  }
}
```

8. Add `package.json` npm script and test if it works as expected.

```json
{
  "scripts": {
    "lint": "eslint src/**/*.{js,jsx,ts,tsx,json}",
    "format": "prettier --write src/**/*.ts{,x}"
  }
}
```

9. Add `.vscode/settings.json`.

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

## Available Scripts

Same as [Create React App](https://github.com/facebook/create-react-app) except `npm run lint` and `npm run format`:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### `npm run lint`

Check lint.

### `npm run format`

Adjust format and save.
