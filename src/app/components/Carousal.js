"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const Carousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop
    >
      <SwiperSlide>
        <div className="w-full h-56 md:h-[382px] relative">
          <Image src="/images/caro1.png" alt="Slide 1" fill style={{ objectFit: "cover" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-56 md:h-[382px] relative">
          <Image src="/images/caro2.png" alt="Slide 2" fill style={{ objectFit: "cover" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-56 md:h-[382px] relative">
          <Image src="/images/caro3.png" alt="Slide 3" fill style={{ objectFit: "cover" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-56 md:h-[382px] relative">
          <Image src="/images/caro4.png" alt="Slide 4" fill style={{ objectFit: "cover" }} />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full h-56 md:h-[382px] relative">
          <Image src="/images/caro5.png" alt="Slide 5" fill style={{ objectFit: "cover" }} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
