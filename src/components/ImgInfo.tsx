import React, { useEffect, useRef, useState } from 'react'
import SwipeCards, { SwipeRef } from './SwipeCards'
import { useSmash } from '../SmashContext'

type Props = {}

export default function ImgInfo({}: Props) {
  const { currentItem, backgrounds, currentBackground, setItems, setCurrentItem } = useSmash()

  const cards = useRef<SwipeRef>(null)
  const currentBg = backgrounds[currentBackground]

  return (
    <div className="cardContainer">
      <SwipeCards
        ref={cards}
        onSwipe={(dir) => {
          const canSwipe = currentItem.image !== undefined
          if (canSwipe) {
            setItems((prev) => [...prev, { image: currentItem.image!, name: currentItem.name ?? '', result: dir === 'left' ? 'pass' : 'smash' }])
            setCurrentItem({ name: '', image: undefined, result: undefined })
          }

          setTimeout(() => cards.current?.reset(), canSwipe ? 750 : 250)
        }}>
        <div className="smash-card">
          <div className="smash-content">
            <div
              className="absolute w-full h-full -z-10"
              style={{
                background: `url(${currentBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            {currentItem.image ? (
              <img
                style={{
                  minWidth: '15rem',
                  minHeight: '20rem',
                  objectFit: 'contain',
                  maxHeight: '75%',
                  maxWidth: '90%',
                }}
                src={currentItem.image}
              />
            ) : (
              <>Waiting for image...</>
            )}
          </div>
          {/* <img src={currentImg} className="w-full" draggable={false} /> */}
        </div>
      </SwipeCards>
    </div>
  )
}
