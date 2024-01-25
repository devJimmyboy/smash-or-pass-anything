import { useState } from 'react'
import ImgInfo from './components/ImgInfo'
import Settings from './components/Settings'
import { useSmash } from './SmashContext'
import Results from './components/Results'

function App() {
  const { items, setItems } = useSmash()
  const [showSettings, setShowSettings] = useState(false)

  const smashes = items.filter((item) => item.result === 'smash').length
  const passes = items.filter((item) => item.result === 'pass').length
  return (
    <>
      <div className="overflow-x-hidden" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center', height: '100vh' }} id="main">
        <div className="text-5xl my-12">Smash or Pass (For Losers)</div>
        <div className=" w-full flex justify-around items-center flex-row ">
          <button className="flex flex-col items-center">
            <p>Pass</p>
            <p>{passes}</p>
          </button>
          <ImgInfo />
          <button className="flex flex-col items-center">
            <p>Smash</p>
            <p>{smashes}</p>
          </button>
        </div>
        <Results />
      </div>
      <div className="absolute top-2 right-4 flex flex-col gap-2">
        <button onClick={() => setShowSettings((e) => !e)}>settings</button>

        <button
          onClick={() => {
            setItems([])
          }}>
          clear
        </button>
      </div>
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
    </>
  )
}

export default App
