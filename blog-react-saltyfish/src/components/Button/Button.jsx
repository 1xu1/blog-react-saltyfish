export default function Button(props) {
  const {
    children,
    onClick,
    loading = false
  } = props
  return (
    <button
      className={"transition inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 relative"
        + (loading ? ' pointer-events-none cursor-default opacity-60' : '')}
      onClick={onClick}>
      {loading && <svg className=" loading animate-spin h-5 w-5 mx-auto z-10" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>}
      {children}
    </button>
  );
}