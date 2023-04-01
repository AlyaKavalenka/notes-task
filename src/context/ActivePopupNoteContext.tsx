import { createContext, useState, useMemo } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface PopupNoteContextProps {
  isActivePopupNote: boolean;
  setActivePopupNote: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ActivePopupNoteContext = createContext<PopupNoteContextProps>({
  isActivePopupNote: false,
  setActivePopupNote: () => false,
});

export function ActivePopupNoteContextProvider({ children }: ProviderProps) {
  const [isActivePopupNote, setActivePopupNote] = useState(false);

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
