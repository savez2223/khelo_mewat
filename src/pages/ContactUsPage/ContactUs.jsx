import React from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const ContactUs = () => {
  return (
    <div className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-12 mt-10" id="contact-us">
      <Helmet>
        <title>Contact Us - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>Contact Us</span>}
        />

        {/* Logo Section */}
        <FadeInAnimation>
          <div className="flex justify-center items-center md:mb-10 mb-5">
            <img
              className="w-40 md:w-48"
              src={logo}
              alt="Khelo Mewat Logo"
              loading="lazy"
            />
          </div>
        </FadeInAnimation>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <FadeInAnimation>
            <div>
              <p className="text-gray-700 text-lg leading-relaxed text-justify">
                We’d love to hear from you! Whether you have questions about
                Khelo Mewat, want to participate, or need any assistance, feel
                free to reach out to us.
              </p>
              <div className="mt-6 space-y-3 text-gray-700 text-lg">
                <p>
                  <strong className="text-[#E87722]">Address:</strong> District
                  Sports Office, Nuh, Haryana, India
                </p>
                <p>
                  <strong className="text-[#E87722]">Phone:</strong> +91 98765
                  43210
                </p>
                <p>
                  <strong className="text-[#E87722]">Email:</strong>{" "}
                  contact@khelomewat.com
                </p>
                <p>
                  <strong className="text-[#E87722]">Office Hours:</strong>{" "}
                  Mon-Fri, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </FadeInAnimation>

          {/* Contact Form */}
          <FadeInAnimation>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-[#E87722] mb-4">
                Send Us a Message
              </h2>
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg bg-white text-black"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg bg-white text-black"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Message</label>
                  <textarea
                    className="w-full p-2 border rounded-lg bg-white text-black"
                    rows="4"
                    placeholder="Your Message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#E87722] text-white px-4 py-2 rounded-lg w-full hover:bg-[#D56B1F]"
                >
                  Send Message
                </button>
              </form>
            </div>
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default ContactUs;
