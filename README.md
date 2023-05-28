# use

Install the package with:

```bash
npm i electron-bridge-api

pnpm i electron-bridge-api
```

## Usage

in `preload.js`

```js
const { injectPreload } = require('electron-bridge-api')

injectPreload('fs')
```

in `main.js`

```js
const { injectMain } = require('electron-bridge-api')

injectMain('fs')
```

## Use in browser

### JavaScript

```js
const fs = window.fs

// Use the node:fs api
```

### Typescript

If you use in typescript

Define a `window.d.ts`

```ts
declare interface Window {
  fs: typeof import('fs');
}
```

You can use next api in the browser

```ts
const fs = window.fs;
fs.mkdirSync('/tmp/from-electron');
```
