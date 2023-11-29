export default function Button(props) {
  const {
    children,
    onClick,
    loading = false
  } = props
  return (
    <button
      className={"inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 relative"
        + (loading ? 'pointer-events-none' : '')}
      onClick={onClick}>
      {children}
      {loading && <svg className="absolute top-1/2 left-1/2 ml-[-2] mt-[-2] loading animate-spin h-5 w-5 mx-auto"></svg>}
    </button>
  );
}