/* eslint-disable react/prop-types */
import { Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import React from 'react';
import useShipping from '../../hooks/useShipping';

const FormSelect = ({ checkoutToken }) => {
  const {
    options,
    shippingOption,
    setShippingOption,
    subdivisions,
    shippingSubdivision,
    setShippingSubdivision,
    countries,
    shippingCountry,
    setShippingCountry,
  } = useShipping(checkoutToken);
  return (
    <>
      <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Country</InputLabel>
        <Select
          defaultValue={''}
          value={shippingCountry}
          fullWidth
          onChange={(e) => setShippingCountry(e.target.value)}
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Subdivision</InputLabel>
        <Select
          defaultValue={''}
          value={shippingSubdivision}
          fullWidth
          onChange={(e) => setShippingSubdivision(e.target.value)}
        >
          {subdivisions.map((subdivision) => {
            return (
              <MenuItem key={subdivision.id} value={subdivision.id}>
                {subdivision.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
      <Grid item xs={12} sm={6}>
        <InputLabel>Shipping Options</InputLabel>
        <Select
          defaultValue={''}
          value={shippingOption}
          fullWidth
          onChange={(e) => setShippingOption(e.target.value)}
        >
          {options.map((option) => {
            return (
              <MenuItem key={option.label} value={option.label}>
                {option.label}
              </MenuItem>
            );
          })}
        </Select>
      </Grid>
    </>
  );
};

export default FormSelect;
