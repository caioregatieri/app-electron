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

}

const PhoneContext = createContext({} as IPhoneContextData);


function PhoneProvider({ children }: PhoneProviderProps) {


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

