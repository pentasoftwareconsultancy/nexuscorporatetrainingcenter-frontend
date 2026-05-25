import React from 'react'
import GallerySection from '../../components/nonuser/gallery/GallerySection.jsx';
import EventStory from '../../components/nonuser/gallery/EventStory.jsx';
import TrainingCentreEventsSection from '../../components/nonuser/gallery/TrainingCentreEventsSection.jsx';

const GalleryPage = () => {
  return (
    <div>
      <TrainingCentreEventsSection />
      <GallerySection />
      <EventStory />
    </div>
  )
}

export default GalleryPage