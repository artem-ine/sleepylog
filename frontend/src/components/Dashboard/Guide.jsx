function Guide() {
  return (
    <div className="shadow-xl w-full lg:w-2/3 border-2 dark:border-primary border-secondary p-3 rounded-xl py-5 mt-5">
      <div className="flex flex-col text-justify gap-3 lg:mx-3">
        <h2 className="font-heading mb-2 text-center dark:text-white text-black text-lg">
          A little guide
        </h2>
        <p>
          Click on "add an entry" to get started! You'll be able to choose an
          emoji that best sums up how you slept, how long you've slept, when you
          got into bed, and when you left its warm embrace. Anything to say
          about your sleep? Had any dreams worth remembering? Put it all in the
          notes!
        </p>
        <p>
          Upon submission, the entry will be displayed in the calendar
          underneath this guide. Think of the calendar as a big, interactive
          diary: every night's log is displayed on its following morning.
        </p>
        <p>
          In a hurry? Click on a day and click on an emoji: it will
          automatically fill in and save last night's rating for you. If you
          want to more info to that entry, then just hit the edit button at the
          top right of the log. Do or write what you'd like, then save it with
          the floppy disk icon!
        </p>
        <p>
          Logged a really good dream that you'd like to go back to often? Click
          the heart button to like your entry, and its notes will appear on your
          dream journal.
        </p>
        <p>
          The "stats" tab allows you to visualize your total sleep hours and
          average mood rating (out of 5) over the past week and month. There's
          also a calculator to get quick average stats from a custom range of
          your choice. More stats will come soon. Hopefully.
        </p>
        <p>
          You can change your profile, reset your password, or delete your
          account on the "profile" tab.
        </p>
        <p>
          Need help? Have some feedback for us? You just got a brilliant idea
          for sleepyLog and would like to see it come to life? Hit "about" in
          the footer, fill in the contact form, and we'll get back to you.
        </p>
        <p>Happy logging! </p>
        <p>Kat & Zeke</p>
      </div>
    </div>
  );
}

export default Guide;
