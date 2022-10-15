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
            <h1 className="text-3xl mb-4 font-bold" {...props} />
          </a>
        </Link>
      );
    }
    return <h1 className="text-3xl mb-4 font-bold" {...props} />;
  },
  h2: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLHeadingElement> &
      HTMLAttributes<HTMLHeadingElement>
  ) => {
    return <h2 className="text-2xl mb-4 font-bold" {...props} />;
  },

  p: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLParagraphElement> &
      HTMLAttributes<HTMLParagraphElement>
  ) => <p className="text-base text-justify leading-relaxed my-3" {...props} />,
};
