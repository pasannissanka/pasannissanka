import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import { sync } from "glob";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Metadata = {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: Date;
  tags: string[];
  readingTime: string;
  publisher?: string;
  url?: string;
};

export type PortfolioMetadata = Metadata & {
  index: number;
  start: string;
  end?: string;
  isCompleted: boolean;
};

export type Article = {
  content: string;
  metadata: Metadata;
};

export type Portfolio = {
  content: string;
  metadata: PortfolioMetadata;
};

export type ArticleData = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  metadata: Metadata;
};

export type PortfolioData = {
  source: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, string>
  >;
  metadata: PortfolioMetadata;
};

const articlesPath = path.join(process.cwd(), "data/blog");

export async function getSlug() {
  const paths = sync(`${articlesPath}/*.mdx`);

  return paths.map((path) => {
    // holds the paths to the directory of the article
    const pathContent = path.split("/");
    const fileName = pathContent[pathContent.length - 1];
    const [slug, _extension] = fileName.split(".");

    return slug;
  });
}

export async function getArticleFromSlug(slug: string): Promise<Article> {
  const articleDir = path.join(articlesPath, `${slug}.mdx`);
  const source = fs.readFileSync(articleDir);
  const { content, data } = matter(source);

  return {
    content,
    metadata: {
      slug,
      title: data["title"],
      excerpt: data["excerpt"],
      publishedAt: data["publishedAt"],
      readingTime: readingTime(content).text,
      tags: data["tags"]?.split(",") || [],
    },
  };
}

export async function getAllArticles(): Promise<Metadata[]> {
  const articles = fs.readdirSync(path.join(process.cwd(), "data/blog"));

  return articles.reduce((allArticles: any[], articleSlug: string) => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), "data/blog", articleSlug),
      "utf-8"
    );
    const { data } = matter(source);

    return [
      {
        ...data,
        slug: articleSlug.replace(".mdx", ""),
        readingTime: readingTime(source).text,
        title: data["title"],
        excerpt: data["excerpt"],
        publishedAt: data["publishedAt"],
        tags: data["tags"]?.split(",") || [],
      },
      ...allArticles,
    ];
  }, []);
}

export async function getAllPortfolios(): Promise<Portfolio[]> {
  const portfolios = fs.readdirSync(path.join(process.cwd(), "data/portfolio"));

  return portfolios.reduce((allArticles: any[], articleSlug: string) => {
    // get parsed data from mdx files in the "articles" dir
    const source = fs.readFileSync(
      path.join(process.cwd(), "data/portfolio", articleSlug),
      "utf-8"
    );
    const { content, data } = matter(source);

    return [
      {
        content,
        metadata: {
          ...data,
          slug: articleSlug.replace(".mdx", ""),
          readingTime: readingTime(source).text,
          title: data["title"],
          excerpt: data["excerpt"],
          publishedAt: data["publishedAt"],
          tags: data["tags"]?.split(",") || [],
          index: data["index"],
          start: data["start"],
          isCompleted: data["isCompleted"],
          end: data["end"] || "",
        } as PortfolioMetadata,
      },
      ...allArticles,
    ];
  }, []);
}
