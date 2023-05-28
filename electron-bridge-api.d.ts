declare module "electron-bridge-api" {
  export function injectPreload(moduleName: string): void;
  export function injectMain(moduleName: string): void;
}
