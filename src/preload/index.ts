import { contextBridge } from 'electron'
import Twilio from 'twilio-client';

import * as ipcs from './ipcs'

const API = {
  ...ipcs,
  sayHelloFromBridge: () => console.log('\nHello from bridgeAPI! 👋\n\n'),
  username: process.env.USER,
}

declare global {
  interface Window {
    App: typeof API
    Twilio: typeof Twilio
  }
}

contextBridge.exposeInMainWorld('App', API)
contextBridge.exposeInMainWorld('Twilio', Twilio)
