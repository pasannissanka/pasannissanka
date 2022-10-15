import dayjs from "dayjs";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import rehypeSlug from "rehype-slug";
import { MDXRemote } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { ArticleData, getArticleFromSlug, getSlug } from "../../src/readMDX";
import NavBarComponent from "../../components/navbar";
import { components } from "../../components/mdx/mdx_component";

export default function Blog({
  post: { source, metadata },
}: {
  post: ArticleData;
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{metadata.title} | Pasan Nissanka</title>
      </Head>

      <NavBarComponent />

      <main className="min-h-screen-custom sm:px-16 px-2 py-0 flex-1 flex flex-col mt-12 items-center">
        <div className="sm:w-1/2 w-full p-4 h-full flex sm:flex-row flex-col my-4">
          <div className="flex flex-col w-full">
            <h1 className="text-3xl my-2">{metadata.title}</h1>
            <p className="text-sm text-gray-700 mb-4 pb-2 border-b border-gray-300">
              {dayjs(metadata.publishedAt).format("MMMM D, YYYY")} &mdash;{" "}
              {metadata.readingTime}
            </p>
            <div className="my-6">
              <MDXRemote {...source} components={{ ...components, Image }} />
            </div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

// dynamically generate the slugs for each article(s)
export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((slug) => ({ params: { slug } }));

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  //fetch the particular file based on the slug
  const { slug } = params;
  const { content, metadata } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeSlug, rehypeHighlight, rehypeCodeTitles],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        metadata,
      } as ArticleData,
    },
  };
}
