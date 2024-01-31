export default function Input(props) {
  const {
    label,
    onChange,
    placeholder,
    value
  } = props

  return (
    <div className="flex justify-start flex-row items-center">
      {label && <label className="block text-sm font-medium text-gray-900 text-center mx-2 whitespace-nowrap">{label}</label>}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input onChange={onChange} className="block w-full rounded-md border-0 py-1.5 pl-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
}