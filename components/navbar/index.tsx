import Link from "next/link";
import { useState } from "react";

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
            <Link href="/">
              <a className="text-xl my-3 border-b border-gray-500 capitalize ">
                Home
              </a>
            </Link>
            <Link href="/blog">
              <a className="text-xl my-3 border-b border-gray-500 capitalize">
                Blog
              </a>
            </Link>
            <Link href="/portfolio">
              <a className="text-xl my-3 border-b border-gray-500 capitalize">
                Portfolio
              </a>
            </Link>
            <Link href="/cv">
              <a className="text-xl my-3 border-b border-gray-500 capitalize">
                CV
              </a>
            </Link>
            <Link href="/contact-me">
              <a className="text-xl my-3 border-b border-gray-500 capitalize">
                Contact me
              </a>
            </Link>
          </div>
        </div>
      </section>

      <Link href="/">
        <a className="capitalize flex">Pasan Nissanka</a>
      </Link>

      <div className="absolute m-auto left-0 right-0 sm:visible invisible">
        <div className="text-gray-500 flex justify-center items-center capitalize">
          <Link href="/">
            <a className="hover:text-gray-400 px-4 border-r">Home</a>
          </Link>
          <Link href="/blog">
            <a className="hover:text-gray-400 px-4 border-r">Blog</a>
          </Link>
          <Link href="/portfolio">
            <a className="hover:text-gray-400 px-4 border-r">Portfolio</a>
          </Link>
          <Link href="/cv">
            <a className="hover:text-gray-400 px-4 border-r">CV</a>
          </Link>
          <Link href="/contact-me">
            <a className="hover:text-gray-400 px-4">Contact me</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBarComponent;
