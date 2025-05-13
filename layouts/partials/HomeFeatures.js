"use client";
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

// Helper to get the correct language string, fallback to English or first available
const getLangString = (obj, language) => {
  if (!obj) return "";
  if (typeof obj === "string") return obj;
  return obj[language] || obj["en"] || Object.values(obj)[0] || "";
};

const HomeFeatures = ({ feature }) => {
  const { language } = useContext(LanguageContext);

  return (
    <section className="section bg-theme-light">
      <div className="container">
        <div className="text-center">
          {/* Section title with markdown support */}
          {markdownify(getLangString(feature.title, language), "h2")}
        </div>
        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {feature.features.map((item, i) => (
            <div
              className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
              key={`feature-${i}`}
            >
              {item.icon && (
                <Image
                  className="mx-auto"
                  src={item.icon}
                  width={30}
                  height={30}
                  alt=""
                />
              )}
              <div className="mt-4">
                {/* Feature name with markdown support */}
                {markdownify(getLangString(item.name, language), "h3", "h5")}
                {/* Feature content with markdown support */}
                {markdownify(getLangString(item.content, language), "p", "mt-3")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeatures;



