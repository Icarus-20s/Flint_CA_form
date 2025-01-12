import React from 'react';
import './Aboutus.css';
import OurStory from './OurStory/OurStory';
import OurValues from './OurValues/OurValues';
import OurPeople from './OurPeople/OurPeople';
import CaInNepal from './CaInNepal/CaInNepal';
import OurQuality from './OurQuality/OurQuality';
import 'bootstrap/dist/css/bootstrap.min.css';

const Aboutus = () => {
  return (
    <div className="about-us-page">
      <header>
        <h1>About K.B.P.S & Associates</h1>
      </header>
      <CaInNepal />
      <OurStory />
      <OurValues />
      <OurQuality />
      <OurPeople />
    </div>
  );
};

export default Aboutus;
