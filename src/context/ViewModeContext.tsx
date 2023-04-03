import { createContext, useState, useMemo } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface ViewModeContextProps {
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<string>>;
}

export const ViewModeContext = createContext<ViewModeContextProps>({
  viewMode: '',
  setViewMode: () => '',
});

export function ViewModeContextProvider({ children }: ProviderProps) {
  const [viewMode, setViewMode] = useState('view');

  const value = useMemo(
    () => ({ viewMode, setViewMode }),
    [viewMode, setViewMode]
  );

  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
}
