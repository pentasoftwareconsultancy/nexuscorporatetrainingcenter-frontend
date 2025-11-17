import React from 'react'
import HomeHero from '../../components/nonuser/home/HomeHero.jsx';
import OurClient from '../../components/nonuser/home/OurClient.jsx';
import CoursesProvided from '../../components/nonuser/home/CoursesProvided.jsx';
import UpcomingBatches from '../../components/nonuser/home/UpcomingBatches.jsx';
import FAQ from '../../components/nonuser/home/FAQ.jsx';
import SuccessReviews from '../../components/public/SuccessReviews.jsx';

const HomePage = () => {
  return (
    <div>
      <HomeHero />
      <OurClient />
      <CoursesProvided />
      <UpcomingBatches />
      <FAQ />
      <SuccessReviews />
    </div>
  )
}

export default HomePage