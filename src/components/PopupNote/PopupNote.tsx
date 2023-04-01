import { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { ActivePopupNoteContext } from '../../context/ActivePopupNoteContext';
import { Tag } from '../../types';
import Button from '../Button/Button';
import './PopupNote.scss';

const TextArea = styled.textarea``;

export default function PopupNote() {
  const { setActivePopupNote } = useContext(ActivePopupNoteContext);
  const arrTags: Tag[] = [];

  const tags = arrTags.map((item) => (
    <div className="note__tag" key={`${item}`}>
      {item}
    </div>
  ));

  const [noteValue, setNoteValue] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(resizeTextArea, [noteValue]);

  function addTags() {
    console.log('click on add tag');
  }

  function closePopup() {
    setActivePopupNote(false);
  }

  return (
    <section className="popup">
      <aside className="popup__wrapper">
        <section className="popup__header">
          <section className="note__header">
            {tags}
            <Button value="+" handleClick={() => addTags()} />
          </section>
          <section className="popup__close">
            <Button value="✖" handleClick={() => closePopup()} />
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
        <Button value="Save" handleClick={() => closePopup()} />
        <Button value="Delete note" handleClick={() => closePopup()} />
      </aside>
    </section>
  );
}
