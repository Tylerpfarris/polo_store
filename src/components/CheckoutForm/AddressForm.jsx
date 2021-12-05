import React from 'react';
import { Button, Grid, Typography, CssBaseline } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';

import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { Link } from 'react-router-dom';
import useShipping from '../../hooks/useShipping';

const AddressForm = ({ checkoutToken, next }) => {
  const methods = useForm();
  const { shippingCountry, shippingSubdivision, shippingOption } =
    useShipping(checkoutToken);
  return (
    <div>
      <CssBaseline />
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => {
            next({
              ...data,
              shippingCountry,
              shippingSubdivision,
              shippingOption,
            });
          })}
        >
          <Grid container spacing={3}>
            <FormInput name="firstName" label="First Name" />
            <FormInput name="lastName" label="Last Name" />
            <FormInput name="address1" label="Address" />
            <FormInput name="email" label="Email" />
            <FormInput name="city" label="City" />
            <FormInput name="zip" label="Zip / Postal code" />
          </Grid>
          <Grid container spacing={3}>
            <FormSelect checkoutToken={checkoutToken} />
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to="/cart" variant="outlined">
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddressForm;
