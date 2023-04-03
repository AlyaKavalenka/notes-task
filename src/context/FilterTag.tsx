import { createContext, useState, useMemo } from 'react';

interface ProviderProps {
  children: React.ReactNode;
}

interface FilterTagContextProps {
  filterTag: string;
  setFilterTag: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterTagContext = createContext<FilterTagContextProps>({
  filterTag: '',
  setFilterTag: () => '',
});

export function FilterTagContextProvider({ children }: ProviderProps) {
  const [filterTag, setFilterTag] = useState('none');

  const value = useMemo(
    () => ({ filterTag, setFilterTag }),
    [filterTag, setFilterTag]
  );

  return (
    <FilterTagContext.Provider value={value}>
      {children}
    </FilterTagContext.Provider>
  );
}
