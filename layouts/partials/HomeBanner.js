"use client";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

// Helper to get the correct language string, fallback to English or first available
const getLangString = (obj, language) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[language] || obj["en"] || Object.values(obj)[0] || "";
};

const HomeBanner = ({ banner }) => {
  const { language } = useContext(LanguageContext);

  return (
    <section className="section pb-[50px]">
      <div className="container">
        <div className="row text-center">
          <div className="mx-auto lg:col-10">
            {/* Title with markdown support */}
            {markdownify(
              getLangString(banner.title, language),
              "h1",
              "font-primary font-bold"
            )}

            {/* Content with markdown support */}
            {markdownify(
              getLangString(banner.content, language),
              "p",
              "mt-4"
            )}

            {/* Button with language support */}
            {banner.button.enable && (
              <Link
                className="btn btn-primary mt-4"
                href={banner.button.link}
                rel={banner.button.rel}
              >
                {getLangString(banner.button.label, language)}
              </Link>
            )}

            {/* Banner image */}
            <Image
              className="mx-auto mt-12"
              src={banner.image}
              width={750}
              height={390}
              alt="banner image"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;

