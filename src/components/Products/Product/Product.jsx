import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import PropTypes from 'prop-types';
import useStyles from './styles';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
`;

const CardImage = styled(CardMedia)`
  position: relative;
  z-index: 0;
  :hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

const DetailsSpan = styled(Typography)`
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
  text-indent: 0.5rem;

  background-color: white;
  position: absolute;

  transform: rotate(26deg);

  color: grey;
`;

const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <ImageContainer>
        <div
          aria-label={`details for ${product.name}`}
          style={{
            height: '100%',
            width: '100%',
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DetailsSpan>DETAILS</DetailsSpan>
        </div>
        <CardImage
          className={classes.media}
          image={product.media.source}
          title={product.name}
          component={Link}
          to={`/product/${product.id}`}
        />
      </ImageContainer>

      <CardContent>
        <div className={classes.cardContent}>
          <Typography variant="h5" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5">
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.CardActions}>
        <IconButton
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    media: PropTypes.object,
    price: PropTypes.object,
  }),
};
export default Product;
