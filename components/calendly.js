"use client"

import React from 'react';
import { InlineWidget } from 'react-calendly';

const Calendly = () => {
  return (
    <div className="App" id="booking">
      <InlineWidget url="https://calendly.com/lenaelena/" />
    </div>
  );
};

export default Calendly;
