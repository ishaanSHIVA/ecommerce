import React from "react";

import { Product, FooterBanner } from "../components";
import { HeroBanner } from "../components/HeroBanner";
import { client } from "../lib/client";

const Home = (props) => {
  console.log(HeroBanner);
  return (
    <>
      <HeroBanner heroBanner={props.bannerData.length && props.bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {props.products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner
        footerBanner={props.bannerData && props.bannerData[0]}
      ></FooterBanner>
    </>
  );
};

export const getServerSideProps = async () => {
  // sanity dashboards for all products
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  // sanity dahsboards for all banners
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);``

  return {
    props: { products, bannerData },
  };
};

export default Home;
