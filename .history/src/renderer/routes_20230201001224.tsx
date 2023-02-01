import { Router, Route } from 'electron-router-dom'
// import { useAuth } from 'renderer/hooks/Auth'
// import { usePhone } from 'renderer/hooks/Phone'

import { MainScreen, AboutScreen, AnotherScreen } from 'renderer/screens'

export function AppRoutes() {
  // const { user, loading } = useAuth();
  // const { incomingCall, deviceIsBusy } = usePhone();

  return (
    <Router
      main={
        <>
          <Route path="/" element={<MainScreen />} />
          <Route path="/anotherScreen" element={<AnotherScreen />} />
        </>
      }
      about={<Route path="/" element={<AboutScreen />} />}
    />
  )
}
