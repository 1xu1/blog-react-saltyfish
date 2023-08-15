"use client"
import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import ReactDOM from "react-dom/client";

let div = null
let root = null

function notice(args) {
  if (!root) {
    div = document.createElement("div");
    document.body.appendChild(div);
    root = ReactDOM.createRoot(div);
  }
  return root.render(<Notifications id='Notifications-only' {...args} />);
}

function Notifications(props) {

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    add({ ...props})
  }, [props])

  const maxCount = 10

  useEffect(() => {
    if (notices.length > maxCount) {
      const [firstNotice] = notices
      remove(firstNotice)
    }
  }, [notices])

  const add = (notice) => {
    setNotices((prevNotices) => [...prevNotices, notice])
    setTimeout(() => {
      remove(notice)
    }, props.duration)
  }
  const remove = (notice) => {
    setNotices((prevNotices) => (
      prevNotices.filter((item) => item.uuid !== notice.uuid)
    ))
  }


  return (
    <div className='fixed top-5 right-5' id={props.id}>
      {
        notices.map((notification) => {
          return <Notification key={notification.uuid} {...notification} />
        })
      }
    </div>
  );
}



let api = {};

let seed = 0
const now = Date.now()
const getuuid = () => {
  const id = seed
  seed += 1
  return `MESSAGE_${now}_${id}`
}

["info", "success", "warn", "error"].forEach((type) => {
  api[type] = (title, duration = 3000) => {
    return notice({ title, duration, type, uuid:getuuid() });
  };
});

export default api;