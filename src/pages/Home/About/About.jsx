import React from 'react';
import Reavel from '../../../components/Reavel/Reavel';
import FadeInAnimation from '../../../components/FadeInAnimation/FadeInAnimation';
import SectionHeader from '../../../components/SectionHeader/SectionHeader';
import Container from '../../../Components/Container/Container';
import logo from '../../../assets/logo/logo.png'

const About = () => {
    return (
      <div
        className="dark:bg-gray-700 bg-amber-300 pb-10 lg:pb-20"
        id="about"
      >
        <SectionHeader heading={"About Us"}></SectionHeader>
        <Container>
          <div className="grid grid-cols-1 gap-10">
            <FadeInAnimation>
              <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-10">
                <div className="">
                  <img
                    className="md:max-w-md min-w-sm rounded-xl"
                    loading="lazy"
                    src="https://www.rheinzink.com/fileadmin/_processed_/a/0/csm_109-1919-001_A2_ret_ca3b9094c7.jpg"
                    alt=""
                  />
                </div>
                <div>
                  <div className="flex justify-center items-start mb-2">
                    <img
                      className="w-48"
                      src={logo}
                      alt="logo"
                      loading="lazy"
                    />
                  </div>
                  <Reavel>
                    <p className="dark:text-white text-slate-700">
                      Welcome to{" "}
                      <span className="font-semibold">
                        The Northern Sports Academy
                      </span>
                      , where passion, dedication, and excellence converge.
                    </p>
                  </Reavel>
                  <Reavel>
                    <p className="dark:text-white text-slate-700">
                      At Northern Sports Academy, we're more than just a sports
                      organization. We're a community united by a love for
                      sports and a commitment to nurturing the talents and
                      aspirations of athletes from all walks of life.
                    </p>
                  </Reavel>
                  <br />
                  <Reavel>
                    <p className="dark:text-white text-slate-700">
                      Whether you're a young athlete with a dream, a parent
                      looking to support your child's passion, or a seasoned
                      player aiming for new heights, Northern Sports Academy
                      welcomes you. Join us on a journey of skill development,
                      camaraderie, and sportsmanship.
                    </p>
                  </Reavel>
                </div>
              </div>
            </FadeInAnimation>
            <FadeInAnimation>
              <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
                <div className=''>
                  <img
                    className="md:max-w-md min-w-sm rounded-xl mx-auto"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1429&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                </div>
                <div>
                  <div className="dark:text-white text-slate-700">
                    <Reavel>
                      <p className="font-bold text-xl mb-2">What We Offer:</p>
                    </Reavel>
                    <ul className="list-disc ps-6">
                      <Reavel>
                        <li>
                          <span className="font-semibold">
                            Expert Coaching:
                          </span>{" "}
                          Our team of experienced coaches and trainers are
                          dedicated to helping athletes reach their full
                          potential. We offer coaching in a wide range of
                          sports, from soccer and basketball to swimming and
                          athletics.
                        </li>
                      </Reavel>
                      <Reavel>
                        {" "}
                        <li>
                          <span className="font-semibold">
                            State-of-the-Art Facilities:
                          </span>{" "}
                          {""}
                          Our world-class facilities are designed to provide
                          athletes with the tools they need to succeed. From
                          cutting-edge equipment to well-maintained fields and
                          courts, we spare no effort in creating an ideal
                          training environment.
                        </li>
                      </Reavel>
                      <Reavel>
                        <li>
                          <span className="font-semibold">
                            Sportsmanship and Values:
                          </span>{" "}
                          We believe in the power of sports to instill values
                          like discipline, teamwork, and perseverance. Our
                          programs are designed to foster not only athletic
                          prowess but also personal growth.
                        </li>
                      </Reavel>
                      <Reavel>
                        <li>
                          <span className="font-semibold">
                            Community and Support:
                          </span>{" "}
                          {""}
                          At Northern Sports Academy, we're more than a team;
                          we're a family. Our supportive community of athletes,
                          parents, and coaches creates an atmosphere of
                          encouragement and camaraderie.
                        </li>
                      </Reavel>
                    </ul>
                  </div>
                </div>
              </div>
            </FadeInAnimation>
          </div>
        </Container>
      </div>
    );
};

export default About;