export default function Input(props) {
  const {
    label,
    onChange,
    placeholder
  } = props

  return (
    <div>
      {label && <label for="label" className="block text-sm font-medium leading-6 text-gray-900">{label}</label>}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input onChange={onChange} type="text" name="label" id="label" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder={placeholder} />
      </div>
    </div>
  );
}