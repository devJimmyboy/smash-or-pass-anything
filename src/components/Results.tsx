// import React from 'react'
import { useSmash } from '../SmashContext'

type Props = {}

export default function Results({}: Props) {
  const { items, setItems } = useSmash()
  // display items in a grid

  return (
    <div className="grid grid-cols-5 gap-4">
      {items
        .map((item, i) => (
          <div
            className="flex flex-col items-center"
            key={i}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setItems((prev) => prev.filter((_, index) => index !== i))
            }}>
            <div className="w-64 h-64">
              <img
                draggable={false}
                src={item.image}
                className="w-64 h-64 active:scale-150"
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
            <p>{item.name}</p>
            <p>{item.result}</p>
          </div>
        ))
        .reverse()}
    </div>
  )
}
