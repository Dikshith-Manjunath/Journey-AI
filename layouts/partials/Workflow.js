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

const Workflow = ({ workflow }) => {
  const { language } = useContext(LanguageContext);

  return (
    <section className="section pb-0">
      <div className="mb-8 text-center">
        {markdownify(
          getLangString(workflow.title, language),
          "h2",
          "mx-auto max-w-[400px] font-bold leading-[44px]"
        )}
        {markdownify(
          getLangString(workflow.description, language),
          "p",
          "mt-3"
        )}
      </div>
      <Image
        src={workflow.image}
        alt="workflow image"
        width={1920}
        height={296}
      />
    </section>
  );
};

export default Workflow;


