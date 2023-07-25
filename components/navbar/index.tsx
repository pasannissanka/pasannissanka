import Link from "next/link";
import { useState } from "react";

const ROUTES: {
  href: string;
  title: string;
  alt: string;
  external: boolean;
}[] = [
  {
    href: "/",
    title: "Home",
    alt: "home",
    external: false,
  },
  {
    href: "https://medium.com/@pasannissanka",
    title: "Blog",
    alt: "blog",
    external: true,
  },
  {
    href: "/portfolio",
    title: "Portfolio",
    alt: "portfolio",
    external: false,
  },
  {
    href: "https://www.dropbox.com/s/c9wgxgmu30b4h5z/Pasan_Nissanka_CV_2.pdf?dl=0",
    title: "CV",
    alt: "cv",
    external: true,
  },
  {
    href: "/#contact-me",
    title: "Contact Me",
    alt: "home",
    external: false,
  },
];

const NavBarComponent = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav className="flex h-12 w-full border-b border-gray-300 items-center px-5 sm:px-12 justify-start text-lg top-0 fixed z-50 bg-white">
      <section className="flex sm:hidden mr-8">
        <div
          className="space-y-2"
          onClick={() => setIsNavOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-7 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-7 animate-pulse bg-gray-600"></span>
          <span className="block h-0.5 w-7 animate-pulse bg-gray-600"></span>
        </div>

        <div
          className={
            isNavOpen
              ? "absolute w-full h-screen top-0 left-0 bg-white z-50"
              : "hidden"
          }
        >
          <div
            className="absolute top-0 right-0 px-8 py-8"
            onClick={() => setIsNavOpen(false)}
          >
            <svg
              className="h-8 w-8 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <div className="h-full flex flex-col items-center justify-center">
            {ROUTES.map((ROUTE, idx) => (
              <Link key={idx} href={ROUTE.href} passHref={ROUTE.external}>
                {ROUTE.external ? (
                  <a
                    className="text-xl my-3 border-b border-gray-500 capitalize "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ROUTE.title}
                  </a>
                ) : (
                  <a className="text-xl my-3 border-b border-gray-500 capitalize ">
                    {ROUTE.title}
                  </a>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Link href="/">
        <a className="capitalize flex">Pasan Nissanka</a>
      </Link>

      <div className="absolute m-auto left-0 right-0 sm:visible invisible">
        <div className="text-gray-500 flex justify-center items-center capitalize">
          {ROUTES.map((ROUTE, idx) => (
            <Link key={idx} href={ROUTE.href} passHref={ROUTE.external}>
              {ROUTE.external ? (
                <a
                  className={`hover:text-gray-400 duration-300 px-4 ${
                    idx === ROUTES.length - 1 ? "" : "border-r"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ROUTE.title}
                </a>
              ) : (
                <a
                  className={`hover:text-gray-400 duration-300 px-4 ${
                    idx === ROUTES.length - 1 ? "" : "border-r"
                  }`}
                >
                  {ROUTE.title}
                </a>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
