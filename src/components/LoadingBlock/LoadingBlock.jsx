export default function LoadingBlock(props) {
  const {
    loading,
    text
  } = props

  return (
    <div className=" relative">
      {loading && <div className='w-full h-full absolute block start-0 z-10}'>
        <span className=" absolute top-1/2 start-1/2 -mt-4">
          <svg className=" w-6 h-8" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style={{ enableBackground: 'new 0 0 50 50' }} xmlSpace="preserve">
            <rect className="fill-cyan-400" x="0" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect className="fill-cyan-400" x="10" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect className="fill-cyan-400" x="20" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
          </svg>
          {text && <span>text</span>}
        </span>
      </div>}
      <div className={loading ? 'opacity-50 select-none pointer-events-none ' : ''}>
        {props.children}
      </div>
    </div>
  );
}