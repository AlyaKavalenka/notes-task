import { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { EditNoteContext } from '../../context/EditNoteContext';
import { INote, Tag } from '../../types';
import Button from '../Button/Button';
import './PopupNote.scss';

const TextArea = styled.textarea``;

export default function PopupNote() {
  const { noteId } = useContext(EditNoteContext);
  const { isActivePopupNote, setActivePopupNote } = useContext(
    ActivePopupNoteContext
  );
  const [note, setNote] = useState<INote>({ id: '', tags: [], text: '' });
  const storageNotes = localStorage.getItem('notes');
  let initialNoteValue = '';
  let initialNoteTags: Tag[] = [];
  let foundId = '';
  if (isActivePopupNote === 'edit' && storageNotes) {
    const parsed = JSON.parse(storageNotes);
    foundId = parsed.findIndex((item: INote) => item.id === noteId);
    initialNoteValue = JSON.parse(storageNotes)[foundId].text;
    initialNoteTags = JSON.parse(storageNotes)[foundId].tags;
  }
  const [noteValue, setNoteValue] = useState(initialNoteValue);
  const [tagsArr, setTagsArr] = useState(initialNoteTags);
  const [inputTagValue, setInputTagValue] = useState('');

  const tags = tagsArr.map((item) => (
    <div className="note__tag" key={`${item}`}>
      {item}
    </div>
  ));

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextArea();
    let setId = '0';
    if (storageNotes) {
      if (JSON.parse(storageNotes).length) {
        setId = `${
          +JSON.parse(storageNotes)[JSON.parse(storageNotes).length - 1].id + 1
        }`;
      }
    }
    setNote({
      id: setId,
      tags: tagsArr,
      text: noteValue,
    });
  }, [noteValue, storageNotes, tagsArr]);

  const inputTagRef = useRef<HTMLInputElement>(null);
  function addTags() {
    setTagsArr([...tagsArr, inputTagValue]);
    setInputTagValue('');
    if (inputTagRef.current) {
      inputTagRef.current.value = '';
    }
  }

  function closePopup() {
    setActivePopupNote('');
  }

  function addNote() {
    if (storageNotes && isActivePopupNote === 'create') {
      const addNoteToStorage = [...JSON.parse(storageNotes), note];
      localStorage.setItem('notes', JSON.stringify(addNoteToStorage));
    } else if (storageNotes && isActivePopupNote === 'edit') {
      const editNoteInStorage = [...JSON.parse(storageNotes)];
      const editedNote: INote = {
        id: noteId,
        tags: note.tags,
        text: note.text,
      };
      editNoteInStorage.splice(+foundId, 1, editedNote);
      localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
    } else {
      localStorage.setItem('notes', JSON.stringify([note]));
    }
    closePopup();
  }

  function deleteNote() {
    if (storageNotes) {
      const editNoteInStorage = [...JSON.parse(storageNotes)];
      editNoteInStorage.splice(+foundId, 1);
      localStorage.setItem('notes', JSON.stringify(editNoteInStorage));
      closePopup();
    }
  }

  return (
    <section className="popup">
      <aside className="popup__wrapper">
        <section className="popup__header">
          <section className="note__header">
            {tags}
            <input
              type="text"
              className="note__input-tag"
              onInput={(e) => setInputTagValue(e.currentTarget.value)}
              ref={inputTagRef}
            />
            <Button value="+" handleClick={() => addTags()} disable={false} />
          </section>
          <section className="popup__close">
            <Button
              value="✖"
              handleClick={() => closePopup()}
              disable={false}
            />
          </section>
        </section>
        <TextArea
          placeholder="Type note..."
          id="note-text"
          className="popup__text"
          ref={textAreaRef}
          value={noteValue}
          onInput={(e) => setNoteValue(e.currentTarget.value)}
          rows={8}
        />
        <Button
          value="Save"
          handleClick={() => addNote()}
          disable={!noteValue}
        />
        {isActivePopupNote === 'edit' ? (
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
