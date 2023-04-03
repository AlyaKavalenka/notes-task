import { useState } from 'react';
import { Tag } from '../../types';
import './PopupText.scss';

interface IPopupTextProps {
  setValue: (value: string) => void;
  tags: Tag[];
  setNoteTags: (value: Tag[]) => void;
  value: string;
}

export default function PopupText(props: IPopupTextProps) {
  const { setValue, tags, setNoteTags, value } = props;
  const [editText] = useState(value);

  return (
    <div
      placeholder="Type note..."
      id="note-text"
      className="text"
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
          setValue(e.currentTarget.textContent);
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
        if (e.key === ' ') {
          const matchTags = e.currentTarget.textContent?.match(/(#\w{1,})/gm);
          if (matchTags) {
            const tempArr = [...tags];
            matchTags.map((item) => tempArr.push(item.replace('#', '')));
            const arrToSet = tempArr.filter(
              (item, index) => tempArr.indexOf(item) === index
            );
            setNoteTags([...arrToSet]);
          }
        }
      }}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      tabIndex={0}
    >
      {editText}
    </div>
  );
}
