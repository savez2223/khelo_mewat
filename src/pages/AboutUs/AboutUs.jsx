import React from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="bg-[#F5F6F5] pb-10 lg:pb-20 md:pt-20" id="about-us">
      <Helmet>
        <title>About Us - Khelo Mewat</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader
          heading={<span style={{ color: "#E87722" }}>About Khelo Mewat</span>}
        />
        <div>
          <FadeInAnimation>
            <div className="flex justify-center items-start md:mb-10 mb-5">
              <img className="w-40 md:w-48" src={logo} alt="Khelo Mewat Logo" loading="lazy" />
            </div>
          </FadeInAnimation>
          <div className="text-gray-700 text-lg leading-relaxed text-justify">
            <FadeInAnimation>
              <p>
                Welcome to{" "}
                <span className="font-semibold text-[#39A935]">Khelo Mewat</span>,
                where passion, dedication, and excellence converge. We’re more than just a
                sports organization—we’re a vibrant community united by a love for sports
                and a commitment to nurturing the talents and aspirations of athletes from
                all walks of life.
              </p>
              <br />
              <p>
                Whether you’re a young athlete with big dreams, a parent supporting your
                child’s passion, or a seasoned player aiming for new heights, Khelo Mewat
                welcomes you. Join us on a journey of skill development, camaraderie, and
                sportsmanship. Established to foster a deep love for sports and cultivate
                talent, we offer a comprehensive range of programs tailored to individuals
                of all ages and skill levels.
              </p>
              <br />
              <p>
                <span className="font-bold text-xl text-[#E87722]">Our Vision:</span>
                <br />
                Our vision is to be a premier sports academy that hones athletic abilities
                while shaping individuals with strong values of sportsmanship, discipline,
                and perseverance. Through our programs, we aim to develop well-rounded
                individuals who excel both on and off the field.
              </p>
            </FadeInAnimation>
          </div>
          <br /> <br />
          <FadeInAnimation>
            <div className="flex flex-col-reverse lg:flex-row-reverse gap-12">
              <div className="text-gray-700 text-lg leading-relaxed text-justify lg:w-1/2">
                <p className="font-bold text-xl text-[#E87722] mb-4">What We Offer:</p>
                <ul className="list-disc ps-6 space-y-3">
                  <li>
                    <span className="font-semibold text-[#39A935]">Expert Coaching:</span>{" "}
                    Our experienced coaches are dedicated to unlocking every athlete’s full
                    potential, offering training in sports like soccer, basketball, swimming,
                    and athletics.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      State-of-the-Art Facilities:
                    </span>{" "}
                    Our world-class facilities feature cutting-edge equipment and
                    well-maintained fields and courts, creating an optimal training environment.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      Sportsmanship & Values:
                    </span>{" "}
                    We instill discipline, teamwork, and perseverance, fostering not just
                    athletic prowess but also personal growth.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      Community & Support:
                    </span>{" "}
                    At Khelo Mewat, we’re a family. Our supportive community of athletes,
                    parents, and coaches creates an atmosphere of encouragement and unity.
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md w-full rounded-xl shadow-lg"
                  loading="lazy"
                  src="https://www.rheinzink.com/fileadmin/_processed_/a/0/csm_109-1919-001_A2_ret_ca3b9094c7.jpg"
                  alt="Khelo Mewat Facility"
                />
              </div>
            </div>
          </FadeInAnimation>
          <br /> <br /> <br /> <br />
          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md w-full rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1429&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Training Session"
                />
              </div>
              <div className="text-gray-700 text-lg leading-relaxed text-justify lg:w-1/2">
                <p className="font-bold text-xl text-[#E87722] mb-4">What We Offer:</p>
                <ul className="list-disc ps-6 space-y-3">
                  <li>
                    <span className="font-semibold text-[#39A935]">Expert Coaching:</span>{" "}
                    Our seasoned trainers guide athletes to success across a variety of sports.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      State-of-the-Art Facilities:
                    </span>{" "}
                    We provide top-tier resources to ensure every athlete thrives.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      Sportsmanship & Values:
                    </span>{" "}
                    Our focus extends beyond skills to build character and resilience.
                  </li>
                  <li>
                    <span className="font-semibold text-[#39A935]">
                      Community & Support:
                    </span>{" "}
                    Join a tight-knit family dedicated to your growth and success.
                  </li>
                </ul>
              </div>
            </div>
          </FadeInAnimation>
          <br /> <br />
          <FadeInAnimation>
            <div className="text-gray-700 text-lg leading-relaxed text-justify">
              <p>
                <span className="font-bold text-xl text-[#E87722] mb-4">
                  Join Our Community:
                </span>
                <br />
                Whether you’re a budding athlete or a seasoned player, Khelo Mewat invites
                you to join our thriving community. Our programs cater to professional
                trainees, fitness enthusiasts, and everyone in between.
              </p>
              <br />
              <p>
                <span className="font-bold text-xl text-[#E87722] mb-4">Contact Us:</span>
                <br />
                Ready to pursue sporting excellence? Reach out today to learn about our
                programs, coaching staff, and enrollment details. We’re here to support your
                aspirations and help you achieve your goals.
                <br />
                <br />
                At Khelo Mewat, your journey to greatness begins. Join us, and let’s build a
                legacy of champions together!
              </p>
            </div>
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;