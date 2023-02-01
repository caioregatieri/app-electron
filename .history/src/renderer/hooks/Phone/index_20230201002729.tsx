import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from 'renderer/services/storage';
import { Device, Connection } from 'twilio-client';

import { usePhoneService } from 'renderer/services/phone';
import {  } from './types';

interface PhoneProviderProps {
  children: ReactNode;
}

interface IPhoneContextData {
  device: any|null;
  connection: any|null;
  deviceNumber: string;
  partner: string;
  deviceIsReady: boolean;
  deviceIsBusy: boolean;
  deviceIsMuted: boolean;
  incomingCall: boolean;
  callSID: string;
  deviceID: string;
}

const PhoneContext = createContext({} as IPhoneContextData);

function PhoneProvider({ children }: PhoneProviderProps) {
  const {
    answerCall: answerCallApi,
    transferCall: forwardingCallApi,
    getDeviceToken: getDeviceTokenApi,
  } = usePhoneService();

  const [timerUpdateToken, setTimerUpdateToken] = useState<NodeJS.Timer|undefined>();
  const [token, setToken] = useState<string>('');
  const [device, setDevice] = useState<any|null>(null);
  const [connection, setConnection] = useState<any|null>(null);
  const [deviceToken, setDeviceToken] = useState('');
  const [deviceNumber, setDeviceNumber] = useState('');
  const [deviceID, setDeviceID] = useState('');
  const [deviceIsReady, setDeviceIsReady] = useState(false);
  const [deviceIsBusy, setDeviceIsBusy] = useState(false);
  const [deviceIsMuted, setDeviceIsMuted] = useState(false);
  const [incomingCall, setIncomingCall] = useState(false);
  const [partner, setPartner] = useState('');
  const [callSID, setCallSID] = useState('');

  return (
    <PhoneContext.Provider
      value={{}}
    >
      {children}
    </PhoneContext.Provider>
  );
}

function usePhone() {
  const context = useContext(PhoneContext);
  return context;
}

export { PhoneProvider, usePhone };

