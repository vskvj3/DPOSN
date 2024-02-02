import React from 'react'
import { cardData } from '../../assets/CardDemoData'
import Card from './Card'

function CardSection() {
  return (
    <div>
      <div className="grid grid-cols-5 pt-8 mb-10 ">
        {cardData.map((card) => {
          return (
            <div key={card.id}>
              <Card
                id={card.id}
                name={card.name}
                img={card.image}
                status={card.status}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CardSection
