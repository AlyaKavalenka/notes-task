import './MainPage.scss';
import { useContext, useState } from 'react';
import Button from '../components/Button/Button';
import Header from '../components/Header/Header';
import Notes from '../components/Notes/Notes';
import PopupNote from '../components/PopupNote/PopupNote';
import { ActivePopupNoteContext } from '../context/ActivePopupNoteContext';
import { INote, Tag } from '../types';
import getParsedNotes from '../utils/storage';

export default function MainPage() {
  const { isActivePopupNote, setActivePopupNote } = useContext(
    ActivePopupNoteContext
  );
  const [filterTag, setFilterTag] = useState('none');

  const allTagsArr = getParsedNotes()
    .map((item: INote) => item.tags)
    .flat();
  const filteredArr = allTagsArr.filter(
    (item, index) => allTagsArr.indexOf(item) === index
  );
  const tagsOptions = filteredArr.map((item: Tag) => (
    <option value={item} key={item}>
      {item}
    </option>
  ));

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
            <select
              name=""
              id=""
              value="Filter by tag"
              className="filter"
              onChange={(e) => setFilterTag(e.currentTarget.value)}
            >
              <option value="">Filter by tag: {filterTag || 'none'}</option>
              {filterTag === 'none' ? (
                ''
              ) : (
                <option value="none" className="filter__cancel">
                  Cancel filter
                </option>
              )}
              <optgroup label="Tags:">{tagsOptions}</optgroup>
            </select>
          </article>
          <Notes filterTag={filterTag} />
        </div>
        {isActivePopupNote ? <PopupNote /> : ''}
      </main>
    </>
  );
}
