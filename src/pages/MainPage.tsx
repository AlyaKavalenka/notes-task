import './MainPage.scss';
import { useContext } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';
import PopupNote from '../components/PopupNote/PopupNote';
import { ViewModeContext } from '../context/ViewModeContext';
import FilterByTag from '../components/FilterByTag/FilterByTag';
import { FilterTagContext } from '../context/FilterTag';

export default function MainPage() {
  const { viewMode, setViewMode } = useContext(ViewModeContext);
  const { filterTag } = useContext(FilterTagContext);

  return (
    <>
      <Header />
      <main>
        <div className="main__wrapper">
          <article className="btns">
            <Button
              value="Create note"
              handleClick={() => setViewMode('create')}
              disable={false}
            />
            <FilterByTag />
          </article>
          <Notes filterTag={filterTag} />
        </div>
        {viewMode !== 'view' ? <PopupNote /> : ''}
      </main>
    </>
  );
}
