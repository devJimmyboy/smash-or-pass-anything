import React, { useEffect } from 'react'
import { useLocalStorage } from 'react-use'

export interface Item {
  name: string
  image: string
  result: 'smash' | 'pass'
}

interface CtxData {
  currentBackground: number
  backgrounds: string[]
  currentIndex: number
  currentItem: Partial<Item>
  items: Item[]
  setItems: React.Dispatch<React.SetStateAction<Item[]>>
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>
  setBackgrounds: React.Dispatch<React.SetStateAction<string[]>>
  setCurrentItem: React.Dispatch<React.SetStateAction<Partial<Item>>>
}

const SmashContext = React.createContext<CtxData>({
  backgrounds: [],
  items: [],
  currentIndex: 0,
  currentBackground: 0,
  currentItem: {},
  setItems: () => {},
  setCurrentIndex: () => {},
  setBackgrounds: () => {},
  setCurrentItem: () => {},
})

export default function SmashProvider(props: React.PropsWithChildren<{}>) {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)
  const [items, setItems] = React.useState<Item[]>(JSON.parse(localStorage.getItem('items') ?? '[]'))
  const [backgrounds, setBackgrounds] = React.useState<string[]>(JSON.parse(localStorage.getItem('backgrounds') ?? '[]'))
  const [currentBackground, setCurrentBackground] = React.useState<number>(0)

  const [currentItem, setCurrentItem] = React.useState<Partial<Item>>({
    image: undefined,
    name: '',
    result: undefined,
  })
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
            setCurrentItem((prev) => ({ ...prev, image: base64data }))
          }
        }
      }
    } catch (err: any) {
      console.error(err.name, err.message)
    }
  }
  useEffect(() => {
    document.getElementById('main')!.addEventListener('paste', onPaste)
    return () => {
      document.getElementById('main')!.removeEventListener('paste', onPaste)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])
  useEffect(() => {
    localStorage.setItem('backgrounds', JSON.stringify(backgrounds))
  }, [backgrounds])

  useEffect(() => {
    setCurrentBackground(Math.floor(Math.random() * backgrounds.length))
  }, [currentIndex, backgrounds])

  return (
    <SmashContext.Provider value={{ backgrounds, items, currentIndex, currentBackground, setBackgrounds, setCurrentIndex, setItems, currentItem, setCurrentItem }}>
      {props.children}
    </SmashContext.Provider>
  )
}

export function useSmash() {
  const ctx = React.useContext(SmashContext)
  return ctx
}
