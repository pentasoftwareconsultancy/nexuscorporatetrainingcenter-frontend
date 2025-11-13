import React from 'react'
import eventData from "../../assets/vaishnavi/eventStoryData.json"
import StoryCard from '../common/StoryCard'

const SuccessReviews = () => {

  return (
    <div className='flex w-full px-12 pb-5'>
      <div className='w-full flex gap-5 overflow-x-hidden'>

      {[...eventData, ...eventData].map((event, index) => (
        <StoryCard
        key={index}
        image={`/src/assets/vaishnavi/${event.image}`}
        title={event.title}
        description={event.description}
        />
      ))}
      </div>
    </div>
  )
}

export default SuccessReviews