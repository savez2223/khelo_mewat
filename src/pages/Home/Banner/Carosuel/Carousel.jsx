import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import './Carousel.css'

const Carousel = () => {
  return (
    <>
      <div className="container">
        <Swiper
          spaceBetween={30}
          autoplay={{
            delay: 2300,
            disableOnInteraction: false,
          }}
          speed={800}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          modules={[Autoplay, EffectCoverflow]}
        >
          <SwiperSlide>
            <img src="https://i.ibb.co/ZWxBmcX/football.jpg" alt="football" className="relative"/>
            <p className="absolute z-10 bottom-5 right-16 text-white font-semibold text-3xl">Football</p>
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/ncXXSFB/cricket.jpg" alt="cricket" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/XsB8Sz0/tennis.jpg" alt="tennis" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/jrsFT7h/badminton.jpg" alt="badminton" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/YXmyL1y/rugby.jpg" alt="rugby" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/W2wKzYt/baseball.jpg" alt="baseball" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/3df9RTb/basketball.jpg" alt="basketball" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://i.ibb.co/njFx9Pg/swimming.jpg" alt="swimming" />
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Carousel;
