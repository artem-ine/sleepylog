import React, { useState } from "react";
import SignupModal from "./Signup Modal";

function GuestView() {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h1 className="font-heading">What is sleepyLog?</h1>
      <p>
        sleepyLog is a personalized sleep tracker app designed to help visualize trends and sleeping patterns. If you find that you have unconsistent rest and would like to know why, hopefully this helps you satisfy your curiosity and take action if there's any indicators through our data visualisation to having a good night's rest. 
      </p>
      <br />
      <h1 className="font-heading">Ok, great! But what do you do exactly?</h1>
      <p>
        Treat sleepyLog as an e-diary or sleep journal - but better! Unlike jotting your notes in traditional pen and paper, we can store all of your entries as data to create easy-to-view stats based on how often and how much you log in your personal journal. That's much simpler and easier than flipping through pages and manually calculating how often you've had a good night's rest within the past week, months, or even years!
      </p>
      <br />
      <h1 className="font-heading">Sweet, I'm sold!</h1>
      <p>
        Glad to hear it! All that's left now is to create an account to start logging and gain access to your very own personal dashboard! 
      </p>
    </div>
  );
}

export default GuestView;
