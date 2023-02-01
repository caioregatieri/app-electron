import ReactDom from 'react-dom/client'
import React from 'react'
import Twilio from 'twilio-client';
import { Device } from '@twilio/voice-sdk';

// import ContextProvider from './hooks/ContextProvider';
import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

import 'resources/styles/globals.sass'

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
      {/* <ContextProvider> */}
        <AppRoutes />
      </ContextProvider>
    {/* </WindowStoreProvider> */}
  </React.StrictMode>
)
