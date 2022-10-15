import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import NavBarComponent from "../../components/navbar";
import { getAllArticles } from "../../src/readMDX";

const Blog = ({ posts }: { posts: any }) => {
  return (
    <React.Fragment>
      <Head>
        <title>Blog | Pasan Nissanka</title>
      </Head>

      <NavBarComponent />

      <div>
        {posts.map((frontMatter: any, index: number) => {
          return (
            <Link href={`/blog/${frontMatter.slug}`} passHref key={index}>
              <div>
                <h1 className="title">{frontMatter.title}</h1>
                <p className="summary">{frontMatter.excerpt}</p>
                <p className="date">
                  {dayjs(frontMatter.publishedAt).format("MMMM D, YYYY")}{" "}
                  &mdash; {frontMatter.readingTime}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articles = await getAllArticles();

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1;
      if (a.data.publishedAt < b.data.publishedAt) return -1;

      return 0;
    });

  return {
    props: {
      posts: articles.reverse(),
    },
  };
};

export default Blog;
