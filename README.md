# eslint-plugin-prefer-reflect

Modern version of original `prefer-reflect` rules in eslint

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@annangela/eslint-plugin-prefer-reflect`:

```sh
npm install @annangela/eslint-plugin-prefer-reflect --save-dev
```

## Usage

Add `@annangela/prefer-reflect` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@annangela/eslint-plugin-prefer-reflect"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@annangela/eslint-plugin-prefer-reflect/prefer-reflect": "error"
    }
}
```

## Supported Rules

* [`prefer-reflect`](docs/rules/prefer-reflect.md): Please look up the doc link.


