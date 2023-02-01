import ReactDom from 'react-dom/client'
import React from 'react'
import { Device } from 'twilio-client';

import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

import 'resources/styles/globals.sass'

// this line broke when run npm start ou builded app version
const device = new Device();

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
        <AppRoutes />
    </WindowStoreProvider>
  </React.StrictMode>
)
