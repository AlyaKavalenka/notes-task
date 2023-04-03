import { useContext, useRef, useState } from 'react';
import { ViewModeContext } from '../../context/ViewModeContext';
import Button from '../Button/Button';
import { Tag } from '../../types';
import './Tags.scss';

export default function Tags(props: {
  noteTags: Tag[];
  setNoteTags: (value: Tag[]) => void;
}) {
  const { viewMode } = useContext(ViewModeContext);
  const { noteTags, setNoteTags } = props;
  const [inputTagValue, setInputTagValue] = useState('');

  const tags = noteTags.map((item, index) => (
    <div className="tags__tag" key={`${item}`}>
      {item}
      {viewMode !== 'view' ? (
        <button
          type="button"
          className="tags__delete-tag"
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
    <section className="tags">
      {tags}
      {viewMode !== 'view' ? (
        <>
          <input
            type="text"
            className="tags__input-tag"
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
