import type { NextPage } from "next";
import Head from "next/head";
import NavBarComponent from "../components/navbar";

const Home: NextPage = () => {
  return (
    <div className="p-0 w-full">
      <Head>
        <title>Pasan Nissanka</title>
        <meta name="description" content="Welcome to my blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBarComponent />
      <main className="h-screen px-16 py-0 flex-1 flex flex-col justify-center items-center">
        <h1 className="text-lg text-blue-700 p-5">Test</h1>
      </main>

      <footer className="flex justify-center items-center flex-grow"></footer>
    </div>
  );
};

export default Home;
