"use client";

import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

// Helper to get the correct language string, fallback to English or first available
const getLangString = (obj, language) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[language] || obj["en"] || Object.values(obj)[0] || "";
};

const Services = ({ services }) => {
  const { language } = useContext(LanguageContext);

  return services.map((service, index) => {
    const isOdd = index % 2 > 0;
    return (
      <section
        key={`service-${index}`}
        className={`section ${isOdd && "bg-theme-light"}`}
      >
        <div className="container">
          <div className="items-center gap-8 md:grid md:grid-cols-2">
            {/* Carousel */}
            <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
              <Swiper
                modules={[Autoplay, Pagination]}
                pagination={
                  service.images.length > 1 ? { clickable: true } : false
                }
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                init={service?.images > 1 ? false : true}
              >
                {/* Slides */}
                {service?.images.map((slide, index) => (
                  <SwiperSlide key={index}>
                    <Image src={slide} alt="" width={600} height={500} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Content */}
            <div
              className={`service-content mt-5 md:mt-0 ${
                !isOdd && "md:order-1"
              }`}
            >
              {/* Title with markdown support */}
              {markdownify(
                getLangString(service?.title, language),
                "h2",
                "font-bold leading-[40px]"
              )}
              {/* Content with markdown support */}
              {markdownify(
                getLangString(service?.content, language),
                "p",
                "mb-2 mt-4"
              )}
              {service.button.enable && (
                <Link
                  href={service?.button.link}
                  className="cta-link inline-flex items-center text-primary"
                >
                  {getLangString(service?.button.label, language)}
                  <Image
                    className="ml-1"
                    src="/images/arrow-right.svg"
                    width={18}
                    height={14}
                    alt="arrow"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  });
};

export default Services;


