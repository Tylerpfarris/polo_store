import {
  Container,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { AddShoppingCart } from '@material-ui/icons';
import { stripHtml } from 'string-strip-html';
import { striptags } from 'striptags';

const ProductDetails = ({ product, match, fetchProduct, onAddToCart }) => {
  const [loading, setLoading] = useState(true);
  const assets = product?.assets;

  const productId = match.params.id;

  const description = striptags(`${product.description}`.trim());

  console.log('PRODUCT=====', product);
  const { result } = stripHtml(`${product.description}`);
  console.log(result);

  const imageContainer = ({ url, name }) => {
    return (
      <Container style={{ justifyContent: 'center', display: 'flex' }}>
        <img
          src={url}
          alt={name}
          key={name}
          height={400}
          //width={400}
          style={{
            marginRight: 'auto',
            marginLeft: 'auto',
            justifyContent: 'center',
          }}
        />
      </Container>
    );
  };

  useEffect(() => {
    fetchProduct(productId).finally(() => setLoading(false));
  }, []);

  return (
    <Container style={{ marginTop: '5rem', height: 'contained' }}>
      <CardContent>
        <Carousel
          autoPlay={false}
          animation="fadeIn"
          indicators={true}
          timeout={500}
          navButtonsAlwaysVisible={true}
        >
          {assets?.map((asset) => {
            return loading ? (
              <ReactLoading type="spin" />
            ) : (
              imageContainer(asset)
            );
          })}
        </Carousel>
      </CardContent>
      <Container>
        <Typography variant="h4" variantMapping="h1">
          {product?.name}
        </Typography>
        <Typography variant="h5">
          {product.price?.formatted_with_symbol}
        </Typography>
        <Typography>{result}</Typography>
      </Container>
      <CardActions disableSpacing>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Container>
  );
};

export default ProductDetails;
