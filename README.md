# use

Install the package with:

```bash
npm i electron-bridge-api

pnpm i electron-bridge-api
```

## Effects

This way is **not safe**, you need to confirm the risk of injecting api by yourself.

Because it is a synchronous call, the rendering process may block.

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

// And 
const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: preloadJsPath,
      nodeIntegration: true, // add the line
    },
  });

  win.loadURL('http://localhost:8000');
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
