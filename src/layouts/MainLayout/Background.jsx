import './index.css'

export default function Background() {
  const getDrops = () => {
    //clear out everything
    let increment = 0;
    const drops = [];

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
      drops.push(drop)
    }
    return drops
  }

  return (
    <div className='-z-10'>
      <div className="fixed bg-[url('/background.jpg')] bg-black opacity-90 w-full h-full bg-cover bg-fixed top-0 left-0 -z-20 blur-sm"></div>
      <div className="fixed top-0 left-0 rain front-row -z-10">{getDrops()}</div>
    </div>
  )
}