import './MainPage.scss';
import { useContext } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';
import PopupNote from '../components/PopupNote/PopupNote';
import { ActivePopupNoteContext } from '../context/ActivePopupNoteContext';
import FilterByTag from '../components/FilterByTag/FilterByTag';
import { FilterTagContext } from '../context/FilterTag';

export default function MainPage() {
  const { isActivePopupNote, setActivePopupNote } = useContext(
    ActivePopupNoteContext
  );
  const { filterTag } = useContext(FilterTagContext);

  function openPopup() {
    setActivePopupNote('create');
  }

  return (
    <>
      <Header />
      <main>
        <div className="main__wrapper">
          <article className="btns">
            <Button
              value="Create note"
              handleClick={() => openPopup()}
              disable={false}
            />
            <FilterByTag />
          </article>
          <Notes filterTag={filterTag} />
        </div>
        {isActivePopupNote ? <PopupNote /> : ''}
      </main>
    </>
  );
}
