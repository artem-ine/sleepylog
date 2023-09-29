import "chart.js/auto";
import DummyCalendar from "./DummyCalendar";
import DummyChart from "./DummyChart";

function GuestView() {
  return (
    <div className="flex flex-col items-center justify-center pt-10">
      <div className="flex flex-col lg:w-2/3 justify-center p-7">
        <h1 className="font-heading pb-3">What is sleepyLog?</h1>
        <p className="text-justify">
          sleepyLog is a personalized sleep tracker app designed to help you log
          your sleep daily. With the help of our interactive calendar and an
          easy, quick form, you'll be able to record your nighttime habits and
          your naps at the click of a button. sleepyLog is like a e-diary or
          sleep journal - but better: bedtime routine, hours slept, a rating per
          sleep, and any notes you might want to safekeep for reference:
          sleepyLog will help you track it all. And all on your phone, from the
          comfort of your bed!
        </p>
      </div>
      <div className="calendar-container pb-2">
        <DummyCalendar />
      </div>
      <div className="flex flex-col lg:w-2/3 justify-center p-7 mt-5">
        <h1 className="font-heading pb-3">
          And while you're busy counting sheeps, we crunch the numbers:
        </h1>
        <p className="text-justify">
          Unlike jotting your notes in traditional pen and paper, we can store
          all of your entries as data to create easy-to-view stats based on how
          often and how much you log in your personal journal. sleepyLog will
          help you visualize trends and sleeping patterns. If you find that you
          have unconsistent rest and would like to know why, take the first step
          to finding out today.
        </p>
      </div>
      <div className="pb-10 flex flex-col">
        <DummyChart />
      </div>
    </div>
  );
}

export default GuestView;
