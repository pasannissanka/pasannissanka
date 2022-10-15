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
import { getArticleFromSlug, getSlug } from "../../src/readMDX";
import NavBarComponent from "../../components/navbar";

export default function Blog({
  post: { source, frontmatter },
}: {
  post: { source: any; frontmatter: any };
}) {
  return (
    <React.Fragment>
      <Head>
        <title>{frontmatter.title} | Pasan Nissanka</title>
      </Head>
      
      <NavBarComponent />

      <div className="article-container">
        <h1 className="article-title">{frontmatter.title}</h1>
        <p className="publish-date">
          {dayjs(frontmatter.publishedAt).format("MMMM D, YYYY")} &mdash;{" "}
          {frontmatter.readingTime}
        </p>
        <div className="content">
          <MDXRemote {...source} components={{ Image }} />
        </div>
      </div>
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
  const { content, frontmatter } = await getArticleFromSlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ["anchor"] },
          },
          { behaviour: "wrap" },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
}
