import { useState } from "react";
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
        const data = await response.json();
        console.log(data.message);
      } else {
        const errorData = await response.json();
        console.error(errorData.errors);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <section>
      <div className="flex flex-col border-2 dark:border-primary border-secondary rounded-xl px-7 py-7 sm:text-left">
        <div className="flex items-center justify-around">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <h1 className="font-heading mb-2">Contact Us</h1>
            <div className="flex  items-center gap-3">
              <label className="block text-black dark:text-white font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                name="name"
                className="bg-white  appearance-none border rounded-xl py-2 px-3 text-black text-sm leading-tight"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex gap-3">
              <label className="block text-black dark:text-white font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-white appearance-none border rounded-xl py-2 px-3 text-black text-sm leading-tight"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-black dark:text-white font-bold mb-2">
                Message:
              </label>
              <textarea
                name="message"
                rows="5"
                cols="40"
                value={formData.message}
                onChange={handleChange}
                required
                className="bg-white appearance-none border rounded-xl py-2 px-3 text-black text-sm leading-tight"
              />
            </div>
            <button
              type="submit"
              className="bg-secondary border border-black hover:border-accent font-bold text-white text-sm p-2 px-4 rounded-xl"
            >
              Submit
            </button>
          </form>
          <div className="flex flex-col justify-stretch">
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
    </section>
  );
}

export default ContactForm;
