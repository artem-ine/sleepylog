import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

function About() {

  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white">
        <section className="mt-10 px-10">
        <div className="flex flex-col border-2 mb-5 dark:border-primary border-secondary rounded-xl px-7 py-7 sm:text-left">
          <h1 className="font-heading mb-2">About Us</h1>
          <p className="mb-2">
            Based on shared sentiments about inconsistent sleeping schedules, restless nights, and moods fluctuating from day to day, Kat and Zeke wanted to create an app that could help keep track of these various factors in order to learn more about the possible influences that sleep could have on a daily basis.
          </p>
          <p>
            The idea and design of sleepLog thus stemmed from a mood tracker app that provided a very quick and user-friendly way to log your mood for the day. Since it was so easy and simple to use, it didn't require much effort to just check-in and click on an emoji as an end-of-day recap. This was a large basis of sleepyLog as we wanted to keep the app quick, simple, and seamless enough for daily integration so that it doesn't become too much of a chore for you to use.
          </p>
        </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;