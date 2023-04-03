import ReactDOM from 'react-dom/client';
import App from './App';
import { ActivePopupNoteContextProvider } from './context/ActivePopupNoteContext';
import { EditNoteContextProvider } from './context/EditNoteContext';
import './index.scss';
import { FilterTagContextProvider } from './context/FilterTag';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ActivePopupNoteContextProvider>
    <EditNoteContextProvider>
      <FilterTagContextProvider>
        <App />
      </FilterTagContextProvider>
    </EditNoteContextProvider>
  </ActivePopupNoteContextProvider>
);
