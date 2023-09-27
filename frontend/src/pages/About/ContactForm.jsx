import { useState } from "react";
import { toast } from "react-toastify";
import mimi from "../../assets/images/mimi.png";
import snork from "../../assets/images/snork.png";
import "./contact.css";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contact: formData }),
      });

      if (response.ok) {
        toast.success("Message sent! We'll get back to you as soon as we can!");
      } else {
        const errorData = await response.json();
        console.error(errorData.errors);
        toast.error("Whoops! Is everything correctly filled out?");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("Whoops, an error occurred! Please try again later.");
    }
  };

  return (
    <div className="shadow-xl flex  flex-col mb-10 border-2 dark:border-primary border-secondary rounded-xl px-7 py-7">
      <div className="flex items-center justify-around flex-wrap">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 mb-5 w-full max-w-xs"
        >
          <div className="flex flex-col gap-2">
            <h1 className="font-heading mb-2">Contact Us</h1>
            <div className="flex items-center gap-3">
              <label className="block text-black dark:text-white font-bold mb-2 text-sm">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="bg-white truncate appearance-none border rounded-xl py-2 px-3 text-black text-sm  leading-tight"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex gap-3">
              <label className="block text-black dark:text-white font-bold mb-2 text-sm">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-white truncate appearance-none border rounded-xl py-2 px-3 text-black text-sm leading-tight"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-black dark:text-white font-bold mb-2 text-sm">
                Message:
              </label>
              <textarea
                name="message"
                rows="5"
                cols="40"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-white truncate appearance-none border rounded-xl py-2 px-3 text-black text-sm leading-tight"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm p-2 px-4 rounded-xl"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex flex-col justify-stretch mt-8">
          <img
            src={mimi}
            alt="sun looking happy wearing a sunhat"
            className="h-28 px-6 animate-bounce"
          />
          <img
            src={snork}
            alt="moon sleeping with a sleephat"
            className="h-28 px-6 animate-pulse"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
