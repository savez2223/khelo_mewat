import React from "react";
import ScrollPageTop from "../../components/ScrollPageTop/ScrollPageTop";
import Container from "../../components/Container/Container";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import logo from "../../assets/logo/logom.png";
import FadeInAnimation from "../../components/FadeInAnimation/FadeInAnimation";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <div className="dark:bg-gray-800 pb-10 lg:pb-20 md:pt-20" id="instructors">
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <ScrollPageTop />
      <Container>
        <SectionHeader heading={"About Khelo Mewat"}></SectionHeader>
        <div>
          <FadeInAnimation>
            <div className="flex justify-center items-start md:mb-10 mb-5">
              <img className="w-48" src={logo} alt="logo" loading="lazy" />
            </div>
          </FadeInAnimation>
          <div className="dark:text-white text-slate-700 text-justify">
            <FadeInAnimation>
              <p>
                Welcome to{" "}
                <span className="font-semibold">The Khelo Mewat</span>, where
                passion, dedication, and excellence converge. At Khelo Mewat ,
                we're more than just a sports organization. We're a community
                united by a love for sports and a commitment to nurturing the
                talents and aspirations of athletes from all walks of life.
              </p>

              <br />

              <p>
                Whether you're a young athlete with a dream, a parent looking to
                support your child's passion, or a seasoned player aiming for
                new heights, Khelo Mewat welcomes you. Join us on a journey of
                skill development, camaraderie, and sportsmanship. Established
                with the aim of fostering a love for sports and nurturing
                talent, we provide a comprehensive range of sports courses
                tailored to individuals of all ages and skill levels.
              </p>
              <br />
              <br />
              <p>
                <span className="font-bold text-xl mb-2">Our Vision:</span>
                <br /> Our vision is to be a premier sports academy that not
                only hones athletic abilities but also shapes individuals with a
                strong sense of sportsmanship, discipline, and perseverance.
                Through our programs, we aspire to contribute to the development
                of well-rounded individuals capable of excelling both on and off
                the field.
              </p>
            </FadeInAnimation>
          </div>
          <br /> <br />
          <FadeInAnimation>
            <div className="flex flex-col-reverse lg:flex-row-reverse gap-10">
              <div className="dark:text-white text-slate-700 text-justify">
                <div>
                  {" "}
                  <p className="font-bold text-xl mb-2">What We Offer:</p>
                  <ul className="list-disc ps-6">
                    <li>
                      <span className="font-semibold">Expert Coaching:</span>{" "}
                      Our team of experienced coaches and trainers are dedicated
                      to helping athletes reach their full potential. We offer
                      coaching in a wide range of sports, from soccer and
                      basketball to swimming and athletics.
                    </li>{" "}
                    <li>
                      <span className="font-semibold">
                        State-of-the-Art Facilities:
                      </span>{" "}
                      Our world-class facilities are designed to provide
                      athletes with the tools they need to succeed. From
                      cutting-edge equipment to well-maintained fields and
                      courts, we spare no effort in creating an ideal training
                      environment.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Sportsmanship and Values:
                      </span>{" "}
                      We believe in the power of sports to instill values like
                      discipline, teamwork, and perseverance. Our programs are
                      designed to foster not only athletic prowess but also
                      personal growth.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Community and Support:
                      </span>{" "}
                      At Khelo Mewat, we're more than a team; we're a family.
                      Our supportive community of athletes, parents, and coaches
                      creates an atmosphere of encouragement and camaraderie.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="">
                <img
                  className="md:max-w-md min-w-sm rounded-xl"
                  loading="lazy"
                  src="https://www.rheinzink.com/fileadmin/_processed_/a/0/csm_109-1919-001_A2_ret_ca3b9094c7.jpg"
                  alt=""
                />
              </div>
            </div>
          </FadeInAnimation>
          <br /> <br /> <br /> <br />
          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row-reverse gap-10">
              <div className="">
                <img
                  className="md:max-w-md min-w-sm rounded-xl mx-auto"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1429&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <div className="dark:text-white text-slate-700 text-justify">
                <div>
                  {" "}
                  <p className="font-bold text-xl mb-2">What We Offer:</p>
                  <ul className="list-disc ps-6">
                    <li>
                      <span className="font-semibold">Expert Coaching:</span>{" "}
                      Our team of experienced coaches and trainers are dedicated
                      to helping athletes reach their full potential. We offer
                      coaching in a wide range of sports, from soccer and
                      basketball to swimming and athletics.
                    </li>{" "}
                    <li>
                      <span className="font-semibold">
                        State-of-the-Art Facilities:
                      </span>{" "}
                      Our world-class facilities are designed to provide
                      athletes with the tools they need to succeed. From
                      cutting-edge equipment to well-maintained fields and
                      courts, we spare no effort in creating an ideal training
                      environment.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Sportsmanship and Values:
                      </span>{" "}
                      We believe in the power of sports to instill values like
                      discipline, teamwork, and perseverance. Our programs are
                      designed to foster not only athletic prowess but also
                      personal growth.
                    </li>
                    <li>
                      <span className="font-semibold">
                        Community and Support:
                      </span>{" "}
                      At Khelo Mewat, we're more than a team; we're a family.
                      Our supportive community of athletes, parents, and coaches
                      creates an atmosphere of encouragement and camaraderie.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeInAnimation>
          <br /> <br />
          <FadeInAnimation>
            <div className="dark:text-white text-slate-700 text-justify">
              <p>
                <span className="font-bold text-xl mb-2">
                  Join Our Community:
                </span>
                <br />
                Whether you're a budding athlete or an experienced player, Khelo
                Mewat welcomes you to join our thriving community. Our programs
                cater to individuals seeking professional training, fitness
                enthusiasts looking to stay active, and everyone in between.
              </p>
              <br />
              <p>
                <span className="font-bold text-xl mb-2">Contact Us:</span>
                <br />
                Ready to embark on your journey to sporting excellence? Contact
                us today to inquire about our courses, coaching staff, and
                enrollment details. We're here to support your aspirations and
                help you achieve your athletic goals. <br />
                <br />
                At Khelo Mewat, the pursuit of excellence begins with you. Join
                us, and let's build a legacy of champions together!
              </p>
            </div>
          </FadeInAnimation>
        </div>
      </Container>
    </div>
  );
};

export default AboutUs;
