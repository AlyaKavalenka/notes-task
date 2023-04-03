import ReactDOM from 'react-dom/client';
import App from './App';
import { ViewModeContextProvider } from './context/ViewModeContext';
import { EditNoteContextProvider } from './context/EditNoteContext';
import './index.scss';
import { FilterTagContextProvider } from './context/FilterTag';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ViewModeContextProvider>
    <EditNoteContextProvider>
      <FilterTagContextProvider>
        <App />
      </FilterTagContextProvider>
    </EditNoteContextProvider>
  </ViewModeContextProvider>
);
