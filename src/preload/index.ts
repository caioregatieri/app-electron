import { contextBridge } from 'electron'

import * as ipcs from './ipcs'

const API = {
  ...ipcs,
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  username: process.env.USER,
}

declare global {
  interface Window {
    App: typeof API
  }
}

contextBridge.exposeInMainWorld('App', API)
