import ReactDom from 'react-dom/client'
import React from 'react'
import { Device } from 'twilio-client';

import ContextProvider from './hooks/ContextProvider';
import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

import 'resources/styles/globals.sass'

const device = new Device();

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
      {/* <ContextProvider> */}
        <AppRoutes />
      {/* </ContextProvider> */}
    </WindowStoreProvider>
  </React.StrictMode>
)
