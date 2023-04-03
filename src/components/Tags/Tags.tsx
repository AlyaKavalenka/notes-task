import { useContext, useRef, useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Button from '../Button/Button';
import { Tag } from '../../types';

export default function Tags(props: {
  noteTags: Tag[];
  setNoteTags: (value: Tag[]) => void;
}) {
  const { viewMode } = useContext(ViewModeContext);
  const { noteTags, setNoteTags } = props;
  const [inputTagValue, setInputTagValue] = useState('');

  const tags = noteTags.map((item, index) => (
    <div className="note__tag" key={`${item}`}>
      {item}
      {viewMode ? (
        <button
          type="button"
          className="note__delete-tag"
          onClick={() => {
            const copyTagsArr: Tag[] = [...noteTags];
            copyTagsArr.splice(index, 1);
            setNoteTags([...copyTagsArr]);
          }}
        >
          x
        </button>
      ) : (
        ''
      )}
    </div>
  ));

  const inputTagRef = useRef<HTMLInputElement>(null);
  function addTags() {
    if (inputTagValue) {
      setNoteTags([...noteTags, inputTagValue]);
      setInputTagValue('');
      if (inputTagRef.current) {
        inputTagRef.current.value = '';
      }
    }
  }

  return (
    <section className="note__header">
      {tags}
      {viewMode !== 'view' ? (
        <>
          <input
            type="text"
            className="note__input-tag"
            onInput={(e) => setInputTagValue(e.currentTarget.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                addTags();
              }
            }}
            ref={inputTagRef}
          />
          <Button
            value="+"
            handleClick={() => addTags()}
            disable={!inputTagValue}
          />
        </>
      ) : (
        ''
      )}
    </section>
  );
}
