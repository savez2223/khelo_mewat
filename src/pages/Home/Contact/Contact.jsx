import Container from "../../../components/Container/Container";
import { FaSquarePhone, FaClock } from "react-icons/fa6";
import { IoMdPin } from "react-icons/io";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";

const Contact = () => {
  return (
    <div className="dark:bg-gray-700 bg-amber-300 pb-10 lg:pb-20" id="contact">
      <SectionHeader heading={"Contact Us"}></SectionHeader>
      <Container>
        <FadeInAnimation>
          <div className="grid grid-cols-1 md:grid-cols-2 shadow p-4 md:p-8 border-2 border-white gap-4">
            <div className="space-y-2 md:space-y-5">
              <div className="text-amber-400 dark:text-white bg-white dark:bg-transparent  p-3 md:w-9/12 rounded">
                <div className="flex gap-2">
                  <FaSquarePhone className="text-2xl md:text-4xl" />
                  <p className="text-lg md:text-xl font-semibold md:font-bold">
                    Contact
                  </p>
                </div>
                <div className="md:font-semibold md:ps-12">
                  <p>Phone: +91 9389678954</p>
                  <p>Email: Mewatsports@inqury.com</p>
                </div>
              </div>
              <div className="text-amber-400 dark:text-white bg-white dark:bg-transparent p-3 md:w-9/12 rounded">
                <div className="flex gap-2">
                  <IoMdPin className="text-2xl md:text-4xl" />
                  <p className="text-lg md:text-xl font-semibold md:font-bold">
                    Addres
                  </p>
                </div>
                <div className="md:font-semibold md:ps-12">
                  <p>MEC Sports Club</p>
                  <p>Nuh Mewat , Haryana 122107</p>
                </div>
              </div>
              <div className="text-amber-400 dark:text-white bg-white dark:bg-transparent p-3 md:w-9/12 rounded">
                <div className="flex gap-2">
                  <FaClock className="text-2xl md:text-4xl" />
                  <p className="text-lg md:text-xl font-semibold md:font-bold">
                    Working hours
                  </p>
                </div>
                <div className="md:font-semibold md:ps-12">
                  <p>Sat - Thu: 09:00am - 10:00pm</p>
                  <p>Friday: 10:00am - 08:00pm</p>
                </div>
              </div>
            </div>
            <form className="contact-form pt-4">
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white dark:bg-slate-500"
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white dark:bg-slate-500"
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-base font-semibold dark:text-white mb-1"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 bg-white dark:bg-slate-500"
                  rows="3"
                  id="message"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button className="btn bg-white text-amber-500 border-white hover:border-white hover:bg-gray-100 transition-all duration-200 hover:scale-95 w-full">
                Submit
              </button>
            </form>
          </div>
        </FadeInAnimation>
      </Container>
    </div>
  );
};

export default Contact;
