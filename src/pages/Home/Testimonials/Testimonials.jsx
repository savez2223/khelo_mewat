import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import "./Testimonials.css";
import SectionHeader from "../../../components/SectionHeader/SectionHeader";
import FadeInAnimation from "../../../components/FadeInAnimation/FadeInAnimation";
import Container from "../../../components/Container/Container";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch("testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));
  }, []);

  return (
    <div className="dark:bg-gray-800  pb-10 lg:pb-20">
      <SectionHeader heading={"Testimonials"}></SectionHeader>
      <Container>
        <Swiper
          autoplay={{ delay: 2300, disableOnInteraction: false }}
          speed={800}
          grabCursor={true}
          loop={true}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <FadeInAnimation key={testimonial.id} custom={index}>
              <SwiperSlide id="testimonials" className="md:!h-72 !h-[22rem]">
                <TestimonialCard testimonial={testimonial}></TestimonialCard>
              </SwiperSlide>
            </FadeInAnimation>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default Testimonials;
