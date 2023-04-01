import { createContext, useState, useMemo } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface EditNoteContextProps {
  noteId: string;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
}

export const EditNoteContext = createContext<EditNoteContextProps>({
  noteId: '',
  setNoteId: () => '',
});

export function EditNoteContextProvider({ children }: ProviderProps) {
  const [noteId, setNoteId] = useState('');

  const value = useMemo(() => ({ noteId, setNoteId }), [noteId, setNoteId]);

  return (
    <EditNoteContext.Provider value={value}>
      {children}
    </EditNoteContext.Provider>
  );
}
