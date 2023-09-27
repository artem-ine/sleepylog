import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ContactForm from "./ContactForm";

function About() {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-black text-black dark:text-white flex flex-col items-center">
        <section className="mt-10 flex flex-col px-10 w-full lg:w-2/3">
          <div className="flex flex-col border-2 mb-5 dark:border-primary border-secondary rounded-xl px-7 py-7">
            <h1 className="font-heading mb-2">About Us</h1>
            <p className="mb-2 text-justify">
              Based on shared sentiments about inconsistent sleeping schedules,
              restless nights, and moods fluctuating from day to day, Kat and
              Zeke wanted to create an app that could help keep track of these
              various factors in order to learn more about the possible
              influences that sleep could have on a daily basis.
            </p>
            <p className="text-justify">
              The idea and design of sleepLog thus stemmed from a mood tracker
              app that provided a very quick and user-friendly way to log your
              mood for the day. Since it was so easy and simple to use, it
              didn't require much effort to just check-in and click on an emoji
              as an end-of-day recap. This was a large basis of sleepyLog as we
              wanted to keep the app quick, simple, and seamless enough for
              daily integration so that it doesn't become too much of a chore
              for you to use.
            </p>
          </div>
          <ContactForm />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default About;
