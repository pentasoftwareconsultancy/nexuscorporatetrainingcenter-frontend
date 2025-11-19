import React from 'react'
import FacultySection from '../../components/nonuser/about/FacultySection.jsx';
import VMVSection from '../../components/nonuser/about/VMVSection.jsx';
import PartnerSection from '../../components/nonuser/about/PartnerSection.jsx';
import SuccessReviews from '../../components/public/SuccessReviews.jsx';

const AboutPage = () => {
  return (
    <div>
      <FacultySection />
      <VMVSection />
      <PartnerSection />
      <SuccessReviews />
    </div>
  )
}

export default AboutPage