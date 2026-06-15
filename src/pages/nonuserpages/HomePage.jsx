import React from 'react'
import HomeHero from '../../components/nonuser/home/HomeHero.jsx';
import OurClient from '../../components/nonuser/home/OurClient.jsx';
import CoursesProvided from '../../components/nonuser/home/CoursesProvided.jsx';
import UpcomingBatches from '../../components/nonuser/home/UpcomingBatches.jsx';
import GallerySection from '../../components/nonuser/gallery/GallerySection.jsx';
import EventStory from '../../components/nonuser/gallery/EventStory.jsx';
import TrainingCentreEventsSection from '../../components/nonuser/gallery/TrainingCentreEventsSection.jsx';
import FAQ from '../../components/nonuser/home/FAQ.jsx';
import SuccessReviews from '../../components/public/SuccessReviews.jsx';

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <OurClient />
      <CoursesProvided />
      <div className="px-4 sm:px-6 md:px-10 my-4">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      <UpcomingBatches />
      <TrainingCentreEventsSection />
      <GallerySection />
      <EventStory />
      <FAQ />
      <SuccessReviews />
    </div>
  )
}

export default HomePage