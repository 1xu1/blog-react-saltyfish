'use client'
import './index.css'
import { useState, useEffect } from 'react'

export default function Background() {
  const [drops, setDrops] = useState([])

  const getDrops = () => {
    //clear out everything
    let increment = 0;
    const newDrops = [];

    while (increment < 100) {
      const randoHundo = (Math.floor(Math.random() * 19 + 1));
      const randoDelay = (Math.floor(Math.random() * 98 + 1));
      const randoFiver = (Math.floor(Math.random() * 4 + 1));
      const stemWidth = (Math.floor(Math.random() * 3 + 1));
      increment += randoFiver;
      const drop = (
        <div className="drop" key={`drop-${increment}`} style={{ left: `${increment}%`, animationDelay: `-0.${randoDelay}s`, animationDuration: `${0.4 + 0.01 * randoHundo}s`, height: `${4 + stemWidth * 2}vh` }}>
          <div className="stem" style={{ animationDelay: `-0.${randoDelay}s`, animationDuration: `${0.4 + 0.01 * randoHundo}s`, width: `${stemWidth}px` }}></div>
        </div>)
      newDrops.push(drop)
    }
    return newDrops
  }

  useEffect(() => {
    // 只在客户端生成随机雨滴
    setDrops(getDrops())
  }, [])

  return (
    <div className='-z-10'>
      <div className="fixed bg-[url('/background.webp')] bg-black w-full h-full bg-cover bg-fixed top-0 left-0 -z-20 blur-sm"></div>
      <div className="fixed top-0 left-0 rain front-row -z-10">{drops}</div>
    </div>
  )
}