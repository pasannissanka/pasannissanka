import { GetStaticProps } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import { components } from "../../components/mdx/mdx_component";
import NavBarComponent from "../../components/navbar";
import { getAllPortfolios, PortfolioData } from "../../src/readMDX";

const Portfolio = ({ portfolios }: { portfolios: PortfolioData[] }) => {
  return (
    <>
      <Head>
        <title>Portfolio | Pasan Nissanka</title>
      </Head>
      <NavBarComponent />

      <main className="min-h-screen-custom sm:px-16 px-2 py-0 flex-1 flex flex-col mt-12 items-center">
        <div className="sm:w-1/2 w-full p-4 h-full flex sm:flex-row flex-col my-4">
          <div className="flex flex-col w-full">
            {portfolios?.map((portfolio, index) => (
              <div className="my-4" key={index}>
                <Link href={`#${portfolio.metadata.slug}`}>
                  <a>
                    <h1
                      id={portfolio.metadata.slug}
                      className="text-3xl font-bold mt-4"
                    >
                      {portfolio.metadata.title}
                    </h1>
                  </a>
                </Link>
                <div className="flex my-2">
                  <span className="text-base text-gray-600">
                    {portfolio.metadata?.start}{" "}
                    {portfolio.metadata.isCompleted
                      ? portfolio.metadata.end
                        ? "—"
                        : ""
                      : "—"}{" "}
                    {portfolio.metadata?.end}
                  </span>
                </div>
                <div className="flex gap-2 mb-5 pb-2 border-b flex-wrap">
                  {portfolio.metadata.tags.map((tag, idx) => (
                    <div
                      className="border rounded-full px-4 py-1 text-xs bg-gray-100"
                      key={idx}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <MDXRemote
                  {...portfolio.source}
                  components={{ ...components, Image }}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getAllPortfolios();

  articles.sort((a, b) => {
    if (a.metadata.index < b.metadata.index) return 1;
    if (a.metadata.index > b.metadata.index) return -1;
    return 0;
  });

  const portfolios = articles
    .filter((a) => a.metadata.isListed)
    .map(async (article) => {
      const mdxSource = await serialize(article.content, {
        mdxOptions: {
          rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeCodeTitles],
        },
        parseFrontmatter: true,
      });
      return {
        source: mdxSource,
        metadata: article.metadata,
      };
    });

  const portfoliosData = await Promise.all(portfolios);

  return {
    props: {
      portfolios: portfoliosData,
    },
  };
};

export default Portfolio;
