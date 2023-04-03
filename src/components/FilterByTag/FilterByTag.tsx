import { useContext } from 'react';
import { INote, Tag } from '../../types';
import { getParsedNotes } from '../../utils/storage';
import { FilterTagContext } from '../../context/FilterTag';
import './FilterByTag.scss';

export default function FilterByTag() {
  const { filterTag, setFilterTag } = useContext(FilterTagContext);

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

  return (
    <select
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
  );
}
