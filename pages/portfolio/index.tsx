import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import NavBarComponent from "../../components/navbar";

const Portfolio = () => {
  return (
    <>
      <Head>
        <title>Portfolio | Pasan Nissanka</title>
      </Head>
      <NavBarComponent />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      data: null,
    },
  };
};

export default Portfolio;
