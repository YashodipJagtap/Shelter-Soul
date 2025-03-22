import React from 'react';
import Affiliation from '../components/Home/Affiliation';
import FeaturedPets from '../components/Home/FeaturedPets';
import About from '../components/Home/About';
import Hero from '../components/Home/Hero';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <section id="home" className="section flex-col justify-between relative">
      <div>
        <div className="container mx-auto">
          {/* hero image  */}
          <Hero />

          {/* about section */}
          <About />

          {/* charity registration section  */}
          {/* <Affiliation /> */}

          {/* feature pets section  */}
          <FeaturedPets />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Home;
