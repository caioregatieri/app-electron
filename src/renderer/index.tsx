import ReactDom from 'react-dom/client'
import React from 'react'

import { WindowStoreProvider } from './store'
import { AppRoutes } from './routes'

import 'resources/styles/globals.sass'

const { App } = window;

// this line broke when run npm start ou builded app version
console.log(App)

ReactDom.createRoot(document.querySelector('app') as HTMLElement).render(
  <React.StrictMode>
    <WindowStoreProvider>
      <AppRoutes />
    </WindowStoreProvider>
  </React.StrictMode>
)
