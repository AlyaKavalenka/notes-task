import { useEffect, useState, useContext } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import { EditNoteContext } from '../../context/EditNoteContext';
import { INote, Tag } from '../../types';
import Button from '../Button/Button';
import './PopupNote.scss';
import getParsedNotes from '../../utils/storage';
import Tags from '../Tags/Tags';

export default function PopupNote() {
  const { noteId } = useContext(EditNoteContext);
  const { viewMode, setViewMode } = useContext(ViewModeContext);
  const [note, setNote] = useState<INote>({ id: '', tags: [], text: '' });
  let initialNoteValue = '';
  let initialNoteTags: Tag[] = [];
  let foundId = 0;

  if (viewMode === 'edit') {
    foundId = getParsedNotes().findIndex((item: INote) => item.id === noteId);
    initialNoteValue = getParsedNotes()[foundId].text;
    initialNoteTags = getParsedNotes()[foundId].tags;
  }
  const [noteValue, setNoteValue] = useState(initialNoteValue);
  const [tagsArr, setTagsArr] = useState(initialNoteTags);
  const [editText] = useState(noteValue);

  useEffect(() => {
    let setId = '0';
    if (getParsedNotes().length) {
      setId = `${+getParsedNotes()[getParsedNotes().length - 1].id + 1}`;
    }
    setNote({
      id: setId,
      tags: tagsArr,
      text: noteValue,
    });
  }, [noteValue, tagsArr]);

  function closePopup() {
    setViewMode('view');
  }

  function addNote() {
    if (viewMode === 'create') {
      const addNoteToStorage = [...getParsedNotes(), note];
      localStorage.setItem('notes', JSON.stringify(addNoteToStorage));
    } else if (viewMode === 'edit') {
      const editNoteInStorage = [...getParsedNotes()];
      const editedNote: INote = {
        id: noteId,
        tags: note.tags,
        text: note.text,
      };
      editNoteInStorage.splice(foundId, 1, editedNote);
      localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
    } else {
      localStorage.setItem('notes', JSON.stringify([note]));
    }
    closePopup();
  }

  function deleteNote() {
    const editNoteInStorage = [...getParsedNotes()];
    editNoteInStorage.splice(foundId, 1);
    localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
    closePopup();
  }

  const setNoteTags = (value: Tag[]) => setTagsArr(value);

  return (
    <section className="popup">
      <aside className="popup__wrapper">
        <section className="popup__header">
          <Tags noteTags={note.tags} setNoteTags={setNoteTags} />
          <section className="popup__close">
            <Button
              value="✖"
              handleClick={() => closePopup()}
              disable={false}
            />
          </section>
        </section>
        <div
          placeholder="Type note..."
          id="note-text"
          className="popup__text"
          onInput={(e) => {
            if (e.currentTarget.textContent) {
              const strWithSpace = e.currentTarget.textContent.replaceAll(
                ' ',
                '&nbsp;'
              );
              const tempStr = strWithSpace.replaceAll(
                /(#\w{1,})/gm,
                '<span class="hashtag">$1</span>'
              );
              setNoteValue(e.currentTarget.textContent);
              e.currentTarget.innerHTML = tempStr;
              e.currentTarget.focus();
              const sel = document.getSelection();
              sel?.setBaseAndExtent(
                e.currentTarget,
                e.currentTarget.childNodes.length,
                e.currentTarget,
                e.currentTarget.childNodes.length
              );
            }
          }}
          onKeyUp={(e) => {
            if (e.code === 'Space') {
              const matchTags =
                e.currentTarget.textContent?.match(/(#\w{1,})/gm);
              if (matchTags) {
                const tempArr = [...tagsArr];
                matchTags.map((item) => tempArr.push(item.replace('#', '')));
                const arrToSet = tempArr.filter(
                  (item, index) => tempArr.indexOf(item) === index
                );
                setTagsArr([...arrToSet]);
              }
            }
          }}
          contentEditable
          suppressContentEditableWarning
          role="presentation"
        >
          {editText}
        </div>
        <Button
          value="Save"
          handleClick={() => addNote()}
          disable={!noteValue}
        />
        {viewMode === 'edit' ? (
          <Button
            value="Delete note"
            handleClick={() => deleteNote()}
            disable={false}
          />
        ) : (
          <Button
            value="Cancel"
            handleClick={() => closePopup()}
            disable={false}
          />
        )}
      </aside>
    </section>
  );
}
