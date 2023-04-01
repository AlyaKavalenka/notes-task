import './Button.scss';

export default function Button(props: {
  value: string;
  handleClick: () => void;
}) {
  const { value, handleClick } = props;
  return (
    <button type="button" className="btn" onClick={handleClick}>
      {value}
    </button>
  );
}
