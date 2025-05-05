import { markdownify } from "@lib/utils/textConverter";
//This is file to make give the 404 not found page, but actually it is because I haven't committed to my repo through linux yet and I need to setup SSH


const NotFound = ({ data }) => {
  const { frontmatter, content } = data;

  return (
    <section className="section">
      <div className="container">
        <div className="flex h-[40vh] items-center justify-center">
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
