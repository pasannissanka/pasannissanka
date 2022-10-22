import Link from "next/link";
import React, { ClassAttributes, HTMLAttributes } from "react";

export const components = {
  h1: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => {
    if (props.id) {
      return (
        <Link href={`#${props.id}`}>
          <a>
            <h1 className="text-3xl my-4 font-bold" {...props} />
          </a>
        </Link>
      );
    }
    return <h1 className="text-3xl my-4 font-bold" {...props} />;
  },
  h2: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => {
    return <h2 className="text-2xl my-4 font-bold" {...props} />;
  },

  h3: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => <h3 className="text-lg my-4 font-medium" {...props}></h3>,
  p: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLParagraphElement> &
      HTMLAttributes<HTMLParagraphElement>
  ) => {
    return (
      <p
        className="text-base text-left leading-relaxed my-3 flex flex-wrap"
        {...props}
      />
    );
  },
  a: (
    props: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
  ) => (
    <a
      className="text-blue-500 underline hover:text-blue-700 duration-300 mx-1"
      {...props}
    ></a>
  ),
  ul: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >
  ) => <ul className="flex flex-col mx-4" {...props}></ul>,

  li: (
    props: React.DetailedHTMLProps<
      React.LiHTMLAttributes<HTMLLIElement>,
      HTMLLIElement
    >
  ) => <li className="list-disc list-inside" {...props}></li>,
  img: (
    props: React.DetailedHTMLProps<
      React.ImgHTMLAttributes<HTMLImageElement>,
      HTMLImageElement
    >
  ) => {
    return <img className="sm:max-w-sm max-w-xs p-1 h-full" {...props} />;
  },
};
