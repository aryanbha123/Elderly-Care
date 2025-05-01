import React from 'react'
import Hero from '../components/sections/Hero'
import AboutSection from '../components/sections/About'
import HealthCareSection from '../components/sections/HealthCareSection'
import Info from '../components/sections/Info'
import Header from '../components/sections/Header'
import Footer from '../components/sections/Footer'

export default function Home () {
  return (
    <>
      <Header />
      <Hero />
      <Info />
      <AboutSection />
      <HealthCareSection />
      <Footer />
      {/* <Content />
      <Services />
      <Features /> */}
    </>
  )
}
