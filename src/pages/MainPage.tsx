import './MainPage.scss';
import { useContext } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';
import PopupNote from '../components/PopupNote/PopupNote';
import { ActivePopupNoteContext } from '../context/ActivePopupNoteContext';

export default function MainPage() {
  const { isActivePopupNote, setActivePopupNote } = useContext(
    ActivePopupNoteContext
  );

  function openPopup() {
    setActivePopupNote(true);
  }

  return (
    <>
      <Header />
      <main>
        <div className="main__wrapper">
          <article className="btns">
            <Button value="Create note" handleClick={() => openPopup()} />
            <select name="" id="" value="Filter by tag" className="filter">
              <option value="">Filter by tag</option>
            </select>
          </article>
          <Notes />
        </div>
        {isActivePopupNote ? <PopupNote /> : ''}
      </main>
    </>
  );
}
