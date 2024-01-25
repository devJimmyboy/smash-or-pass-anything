import React, { useEffect } from 'react'
import { useSmash } from '../SmashContext'

type Props = { onClose: () => void }

export default function Settings({ onClose }: Props) {
  const [currentBg, setCurrentBg] = React.useState<string | null>(null)
  const { setBackgrounds, backgrounds } = useSmash()
  const onPaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      for (const clipboardItem of clipboardItems) {
        const imageTypes = clipboardItem.types.filter((type) => type.startsWith('image/')) ?? ''
        console.log('getting types', imageTypes)
        for (const imageType of imageTypes) {
          const blob = await clipboardItem.getType(imageType).catch((err) => {
            return null
          })
          if (blob === null) {
            continue
          }
          // convert img blob to base64 string and set to state
          const reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            const base64data = reader.result
            //make sure is correct format
            if (typeof base64data !== 'string') {
              return
            }
            setCurrentBg(base64data)
          }
        }
      }
    } catch (err: any) {
      console.error(err.name, err.message)
    }
  }
  const modalRef = React.useRef<HTMLDivElement>(null)
  const onAdd = () => {
    if (currentBg) {
      setBackgrounds((prev) => [...prev, currentBg])
      setCurrentBg(null)
    }
  }
  useEffect(() => {
    modalRef.current?.addEventListener('paste', (e) => {
      console.log('paste', e)
      onPaste()
    })
    return () => {
      modalRef.current?.removeEventListener('paste', (e) => {
        console.log('paste', e)
        onPaste()
      })
    }
  })
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center" ref={modalRef}>
      <div className="bg-gray-700 p-4 h-80 w-96">
        <div className="text-2xl">Settings</div>
        <div className="flex flex-row">
          {currentBg ? <img src={currentBg} className="w-32 h-32" /> : <>Waiting for Image...</>}
          <div className="flex flex-col">
            <button onClick={onPaste}>paste</button>
            <button onClick={onAdd}>add</button>
          </div>
        </div>
        <button onClick={onClose}>close</button>
        {
          // create a list of current bgs with option to remove
        }
        <div className="flex flex-col">
          {backgrounds.map((bg, i) => (
            <div key={i} className="flex flex-row">
              <img src={bg} className="w-32 h-32" />
              <button
                onClick={() => {
                  setBackgrounds((prev) => prev.filter((_, index) => index !== i))
                }}>
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
