import { createContext, useState, useMemo } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface PopupNoteContextProps {
  isActivePopupNote: string;
  setActivePopupNote: React.Dispatch<React.SetStateAction<string>>;
}

export const ActivePopupNoteContext = createContext<PopupNoteContextProps>({
  isActivePopupNote: '',
  setActivePopupNote: () => '',
});

export function ActivePopupNoteContextProvider({ children }: ProviderProps) {
  const [isActivePopupNote, setActivePopupNote] = useState('');

  const value = useMemo(
    () => ({ isActivePopupNote, setActivePopupNote }),
    [isActivePopupNote, setActivePopupNote]
  );

  return (
    <ActivePopupNoteContext.Provider value={value}>
      {children}
    </ActivePopupNoteContext.Provider>
  );
}
