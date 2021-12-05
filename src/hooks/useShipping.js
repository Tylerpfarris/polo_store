import { useEffect, useState } from 'react';
import { commerce } from '../lib/commerce';

const useShipping = (checkoutToken) => {
   
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );

  const options = shippingOptions.map((sO) => ({
    id: sO.id,
    label: `${sO.description} - ${sO.price.formatted_with_symbol}`,
  }));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    //  console.log('COUNTRIES====', countries);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (checkoutTokenId, countryCode) => {
    const { subdivisions } =
      await commerce.services.localeListShippingSubdivisions(
        checkoutTokenId,
        countryCode
      );
    // console.log('subdivisions====', subdivisions);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    // console.log('options====', options);
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    
    fetchShippingCountries(checkoutToken.id);
    return () => {
      setShippingCountry('');
    };
  }, []);

  useEffect(() => {
    // console.log(shippingCountry);
    fetchSubdivisions(checkoutToken.id, shippingCountry);
    return () => {
      setShippingSubdivision('');

    };
  }, [shippingCountry]);

  useEffect(() => {
    // console.log('USEEFFECT SUB======', shippingSubdivision);
    if(shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
    return () => {
      setShippingOption('');
    };
  }, [shippingSubdivision]);
   
  return {
    shippingOption,
    options,
    subdivisions,
    countries,
    shippingCountry,
    shippingSubdivision,
    setShippingOption,
    setShippingCountry,
    setShippingSubdivision
  };
};

export default useShipping;
