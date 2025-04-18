import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";

const NotFound = ({ data }) => {
  const { frontmatter, content } = data;
  
  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col h-[40vh] items-center justify-center">
          <div className="mb-8">
            <Image 
              src="/images/20945761.jpg" 
              alt="Page not found" 
              width={400} 
              height={300}
              priority
            />
          </div>
          <div className="text-center">
            <h1 className="mb-4">{frontmatter.title}</h1>
            {markdownify(content, "div", "content")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
