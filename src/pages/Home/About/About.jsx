import React from "react";
import Reavel from "../../../components/Reavel/Reavel";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import Container from "../../../components/Container/Container";
import logo from "../../../assets/logo/logom.png";

const About = () => {
  return (
    <div 
      className="bg-white pb-10 lg:pb-20" 
      id="about"
      style={{ backgroundColor: '#F5F6F5' }} // Light gray-green background for professionalism
    >
      <SectionHeader
          heading={<span style={{ color: "#E87722" }}>About Us</span>}
        />
      <Container>
        <div className="grid grid-cols-1 gap-12">
          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row-reverse justify-center items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md min-w-sm rounded-xl shadow-lg"
                  loading="lazy"
                  src="https://www.rheinzink.com/fileadmin/_processed_/a/0/csm_109-1919-001_A2_ret_ca3b9094c7.jpg"
                  alt="Khelo Mewat Facility"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="flex justify-center items-start mb-4">
                  <img 
                    className="w-48" 
                    src={logo} 
                    alt="Khelo Mewat Logo" 
                    loading="lazy" 
                  />
                </div>
                <Reavel>
                  <p className="text-gray-700 text-lg">
                    Welcome to{" "}
                    <span className="font-semibold text-[#39A935]">
                      Khelo Mewat
                    </span>
                    , where passion, dedication, and excellence converge.
                  </p>
                </Reavel>
                <Reavel>
                  <p className="text-gray-700 mt-4">
                    At Khelo Mewat, we are more than just a sports organization. 
                    We are a community united by our love for sports and our 
                    commitment to nurturing the talents and aspirations of 
                    athletes from all backgrounds.
                  </p>
                </Reavel>
                <Reavel>
                  <p className="text-gray-700 mt-4">
                    Whether you're an aspiring young athlete, a supportive parent, 
                    or a seasoned player aiming for new heights, Khelo Mewat offers 
                    a place for you. Join us on a journey of skill development, 
                    camaraderie, and sportsmanship.
                  </p>
                </Reavel>
              </div>
            </div>
          </FadeInAnimation>

          <FadeInAnimation>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-12">
              <div className="lg:w-1/2">
                <img
                  className="md:max-w-md min-w-sm rounded-xl shadow-lg mx-auto"
                  loading="lazy"
                  src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&q=80&w=1429&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Training Session"
                />
              </div>
              <div className="lg:w-1/2">
                <div className="text-gray-700">
                  <Reavel>
                    <p 
                      className="font-bold text-xl mb-4"
                      style={{ color: '#E87722' }} // Orange for section title
                    >
                      What We Offer:
                    </p>
                  </Reavel>
                  <ul className="list-disc ps-6 space-y-3">
                    <Reavel>
                      <li>
                        <span className="font-semibold text-[#39A935]">
                          Expert Coaching:
                        </span>{" "}
                        Our experienced coaches are dedicated to helping athletes 
                        reach their full potential across various sports including 
                        soccer, basketball, swimming, and athletics.
                      </li>
                    </Reavel>
                    <Reavel>
                      <li>
                        <span className="font-semibold text-[#39A935]">
                          State-of-the-Art Facilities:
                        </span>{" "}
                        Our world-class facilities feature cutting-edge equipment 
                        and well-maintained fields and courts, creating an optimal 
                        training environment.
                      </li>
                    </Reavel>
                    <Reavel>
                      <li>
                        <span className="font-semibold text-[#39A935]">
                          Sportsmanship & Values:
                        </span>{" "}
                        We foster discipline, teamwork, and perseverance, building 
                        not just athletic skills but also character.
                      </li>
                    </Reavel>
                    <Reavel>
                      <li>
                        <span className="font-semibold text-[#39A935]">
                          Community & Support:
                        </span>{" "}
                        Our tight-knit community of athletes, parents, and coaches 
                        provides an atmosphere of encouragement and unity.
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