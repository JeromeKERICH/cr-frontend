import React, { useEffect } from 'react'
import AboutHero from '../../components/about/AboutHero'
import WhyChooseUs from '../../components/about/Why'
import OurProcess from '../../components/home/OurProcess'
import TeamSection from '../../components/about/OurTeam'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutHero/>
      <WhyChooseUs/>
      <OurProcess/>
      <TeamSection/>
    </div>
  )
}

export default About
