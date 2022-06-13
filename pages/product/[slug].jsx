import React, { useState } from "react";

import { urlFor, client } from "../../lib/client";

import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/state.context";

const ProductDetails = (props) => {
  // console.log(props);
  const { image, name, details, price } = props.product;
  const [index, setIndex] = useState(0);
  const { decreaseQuantity, increaseQuantity, quantity, onAdd } =
    useStateContext();
  // product: {
  //   _createdAt: '2022-06-11T22:47:22Z',
  //   _id: 'fd7b48cc-dfea-42a0-85d1-bcf69569262a',
  //   _rev: 'HePqRSIKIpzDxf9dhvIdQr',
  //   _type: 'product',
  //   _updatedAt: '2022-06-11T22:47:22Z',
  //   details: 'Amazing noise cancelling headphones!',
  //   image: [ [Object] ],
  //   name: 'Headphones',
  //   price: 99,
  //   slug: { _type: 'slug', current: 'headphones' }
  // },
  return (
    <div className="">
      <div className="product-detail-container">
        <div className="">
          <div className="image-container">
            <img
              className="product-detail-image"
              src={urlFor(image && image[index])}
              alt=""
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                src={urlFor(item)}
                className={
                  i == "index" ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="">
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiFillStar></AiFillStar>
              <AiOutlineStar></AiOutlineStar>
            </div>
            <p>(20)</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity: </h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => decreaseQuantity()}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                {quantity}
              </span>

              <span className="plus" onClick={() => increaseQuantity()}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(props.product, quantity)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {props.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async (props) => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  // sanity dashboards for all products
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productQuery = '*[ _type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
