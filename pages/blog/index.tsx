import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import NavBarComponent from "../../components/navbar";
import { getAllArticles, Metadata } from "../../src/readMDX";

const Blog = ({ posts }: { posts: Metadata[] }) => {
  return (
    <div className="p-0 w-full">
      <Head>
        <title>Blog | Pasan Nissanka</title>
      </Head>

      <NavBarComponent />

      <main className="min-h-screen-custom sm:px-16 px-2 py-0 flex-1 flex flex-col mt-12 items-center">
        <div className="sm:w-1/2 w-full p-4 h-full flex sm:flex-row flex-col my-4">
          <div className="flex flex-col w-full">
            {posts.map((data: any, index: number) => {
              return (
                <Link href={`/blog/${data.slug}`} passHref key={index}>
                  <div className="p-3">
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                    <p className="text-sm text-gray-700">
                      {dayjs(data.publishedAt).format("MMMM D, YYYY")} &mdash;{" "}
                      {data.readingTime}
                    </p>
                    <p className="text-base text-black my-5">{data.excerpt}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articles = await getAllArticles();

  articles.sort((a, b) => {
    if (a.publishedAt > b.publishedAt) return 1;
    if (a.publishedAt < b.publishedAt) return -1;
    return 0;
  });

  return {
    props: {
      posts: articles.reverse(),
    },
  };
};

export default Blog;
