import ReactDom from 'react-dom/client'
import React from 'react'
import Twilio from 'twilio-client'

import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

import 'resources/styles/globals.sass'

// this line broken when run npm start ou builded app version
const device = new Twilio.Device();

device.setup('xyls', {
  debug: true
});

console.log(device)

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
      <AppRoutes />
    </WindowStoreProvider>
  </React.StrictMode>
)
