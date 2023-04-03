import './MainPage.scss';
import { useContext } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';
import PopupNote from '../components/PopupNote/PopupNote';
import { ActivePopupNoteContext } from '../context/ActivePopupNoteContext';
import { INote, Tag } from '../types';

export default function MainPage() {
  const { isActivePopupNote, setActivePopupNote } = useContext(
    ActivePopupNoteContext
  );
  const storageNotes = localStorage.getItem('notes');
  let parsedNotes;
  let allTagsArr: Tag[];
  let tagsOptions;
  let filteredArr;
  if (storageNotes) {
    parsedNotes = JSON.parse(storageNotes);
    allTagsArr = parsedNotes.map((item: INote) => item.tags).flat();
    filteredArr = allTagsArr.filter(
      (item, index) => allTagsArr.indexOf(item) === index
    );
    tagsOptions = filteredArr.map((item: Tag) => (
      <option value="" key={item}>
        {item}
      </option>
    ));
  }

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
            <select name="" id="" value="Filter by tag" className="filter">
              <option value="">Filter by tag:</option>
              {tagsOptions}
            </select>
          </article>
          <Notes />
        </div>
        {isActivePopupNote ? <PopupNote /> : ''}
      </main>
    </>
  );
}
