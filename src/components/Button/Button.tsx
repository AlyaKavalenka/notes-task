import './Button.scss';

export default function Button(props: { value: string }) {
  const { value } = props;
  return (
    <button type="button" className="btn">
      {value}
    </button>
  );
}
