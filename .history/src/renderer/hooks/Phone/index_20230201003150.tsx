import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Device, Connection } from 'twilio-client';

import { usePhoneService } from 'renderer/services/phone';

interface PhoneProviderProps {
  children: ReactNode;
}

interface IPhoneContextData {
  device: Device|null;
  connection: Connection|null;
  deviceNumber: string;
  partner: string;
  deviceIsReady: boolean;
  deviceIsBusy: boolean;
  deviceIsMuted: boolean;
  incomingCall: boolean;
  callSID: string;
  deviceID: string;
  dial: (params: any) => void;
  answerCall: () => void;
  rejectCall: () => void;
  hangUpCall: () => void;
  transferCall: (callSID: string, clientID: string) => void;
  toggleMute: () => void;
  sendDigits: (digit: string) => void;
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

  const dial = (params: any) => {
    setPartner(params.To);
    setDeviceIsMuted(false);
    device!.connect(params);
  }

  const answerCall = async () => {
    try {
      if (!connection) return;
      Logger('Answer call sid: ' + connection.parameters.CallSid);

      connection.accept();

      await answerCallApi({
        token,
        callSID: connection.parameters.CallSid
      });

      setIncomingCall(false);
      setDeviceIsBusy(true);
      setDeviceIsMuted(false);
    } catch (error) {
      Logger(error);
    }
  }

  const rejectCall = () => {
    if (!connection) return;
    Logger('Call rejected...');

    connection.reject();
    setConnection(null);
    setPartner('');
    setIncomingCall(false);
    setDeviceIsBusy(false);
  }

  const hangUpCall = () => {
    if (!connection || !device) return;
    Logger('Hanging call...');

    device.disconnectAll();
    setConnection(null);
    setPartner('');
    setDeviceIsBusy(false);
  }

  const transferCall = async (callSID: string, clientID: string) => {
    if (!connection || !deviceIsBusy) return;
    Logger('transferCall to ' + clientID);

    const result = await forwardingCallApi({
      token,
      callSID,
      clientID
    });

    Logger(result);
  }

  const toggleMute = () => {
    if (!connection) return;
    Logger('toggleMute');

    setDeviceIsMuted(!deviceIsMuted);
    connection.mute(!deviceIsMuted);
  }

  const sendDigits = (digit: string) => {
    if (!connection) return;
    Logger('sendDigits ' + digit);

    connection.sendDigits(digit);
  }

  const Logger = (params: any) => {
    if (typeof params === 'object')
      console.info(...params);
    else
      console.info(params);
  }

  // const startTwilioDevice = () => {
  //   getDeviceTokenApi({
  //     token
  //   })
  //     .then(({ data: response }) => {
  //       if (response.token) {
  //         console.log(`Twilio token found!`);
  //         setDeviceToken(response.token);
  //         setDeviceNumber(response.twilio_phone_number);
  //         setDeviceID(response.device_id);
  //         setDevice(new Device());
  //         return;
  //       }
  //       Logger('Error on get Twilio token');
  //     })
  //     .catch(err => Logger('Error on load Twilio token'));
  // }

  const updateTwilioDevice = () => {
    if (deviceIsBusy) return;

    getDeviceTokenApi({
      token
    })
      .then(({ data: response }) => {
        if (response.token && device) {
          device.updateToken(response.token);
          return;
        }
        Logger('Error on get Twilio token');
      })
      .catch(err => Logger(err));
  }

  return (
    <PhoneContext.Provider
      value={{
        device,
        connection,
        deviceNumber,
        partner,
        deviceIsReady,
        deviceIsBusy,
        deviceIsMuted,
        incomingCall,
        callSID,
        deviceID,
        dial,
        answerCall,
        rejectCall,
        hangUpCall,
        transferCall,
        toggleMute,
        sendDigits,
      }}
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

