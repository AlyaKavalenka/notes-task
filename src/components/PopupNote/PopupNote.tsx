import { useEffect, useState, useContext } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import { EditNoteContext } from '../../context/EditNoteContext';
import { INote, Tag } from '../../types';
import Button from '../Button/Button';
import './PopupNote.scss';
import getParsedNotes from '../../utils/storage';
import Tags from '../Tags/Tags';
import NoteText from '../NoteText/NoteText';

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
    setViewMode('view');
  }

  function deleteNote() {
    const editNoteInStorage = [...getParsedNotes()];
    editNoteInStorage.splice(foundId, 1);
    localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
    setViewMode('view');
  }

  const setNoteTags = (value: Tag[]) => setTagsArr(value);
  const setValue = (value: string) => setNoteValue(value);

  return (
    <section className="popup">
      <aside className="popup__wrapper">
        <section className="popup__header">
          <Tags noteTags={note.tags} setNoteTags={setNoteTags} />
          <section className="popup__close">
            <Button
              value="✖"
              handleClick={() => setViewMode('view')}
              disable={false}
            />
          </section>
        </section>
        <NoteText
          setValue={setValue}
          tags={tagsArr}
          setNoteTags={setNoteTags}
          value={noteValue}
        />
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
            handleClick={() => setViewMode('view')}
            disable={false}
          />
        )}
      </aside>
    </section>
  );
}
