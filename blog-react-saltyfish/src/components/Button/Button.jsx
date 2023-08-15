export default function Button(props) {
  const {
    children,
    onClick
  } = props
  return (
    <button className="block rounded-md bg-sky-500 text-white text-base px-3 py-2 h-10 hover:bg-sky-700" onClick={onClick}>{children}</button>
  );
}