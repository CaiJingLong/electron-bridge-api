"use strict";
exports.__esModule = true;
exports.injectMain = exports.injectPreload = void 0;

function propertiesName(moduleName) {
  return `get${moduleName}Fields`;
}

function proxyName(moduleName) {
  return `${moduleName}Proxy`;
}

function injectPreload(moduleName) {
  const { contextBridge, ipcRenderer } = require("electron");

  // Get the module names
  const methods = ipcRenderer.sendSync(propertiesName(moduleName));

  const methodProxy = {};

  methods.forEach((method) => {
    // Create a proxy for each method
    methodProxy[method] = (...args) => {
      // Send the method name and arguments to the main process
      return ipcRenderer.sendSync(proxyName(moduleName), method, args);
    };
  });

  // Expose protected methods that to the renderer process(BrowserWindow)
  contextBridge.exposeInMainWorld(moduleName, methodProxy);
}

function injectMain(moduleName) {
  const { ipcMain } = require("electron");

  const obj = require(moduleName);
  const names = Object.getOwnPropertyNames(obj);

  // Send module names
  ipcMain.on(propertiesName(moduleName), (event) => {
    console.log('result names', names)
    event.returnValue = names;
  });

  // Handle module
  ipcMain.on(proxyName(moduleName), (event, method, args) => {
    const result = obj[method](...args);
    event.returnValue = result;
  });
}

exports.injectPreload = injectPreload;
exports.injectMain = injectMain;
