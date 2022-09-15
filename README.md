# eslint-plugin

Main propose:

- Modern version of original `prefer-reflect` rules in eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@annangela/eslint-plugin`:

```sh
npm install @annangela/eslint-plugin --save-dev
```

## Usage

Add `@annangela/eslint-plugin` to the plugins section of your `.eslintrc` configuration file:

```json
{
    "plugins": [
        "@annangela/eslint-plugin"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@annangela/prefer-reflect": "error"
    }
}
```

## Supported Rules

* [`prefer-reflect`](docs/rules/prefer-reflect.md): Please look up the doc link.


