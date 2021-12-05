import React, { useState, useEffect } from 'react';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';
const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (!cart.line_items?.length) return;

    if (cart.id) {
      const generateToken = async () => {
        console.log('CART=======', cart);
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          });
          console.log('TOKE======', token);
          setCheckoutToken(token);
        } catch (error) {
          if (activeStep !== steps.length) history.push('/');
        }
      };

      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevStep) => prevStep + 1);
  const backStep = () => setActiveStep((prevStep) => prevStep - 1);

  const next = (data) => {
    setShippingData(data);

    nextStep();
  };

  const Confirmation = () =>
    order.customer ? (
      error ? (
        <>
          <Typography variant="h5">Error: {error}</Typography>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">
            Back to home
          </Button>
        </>
      ) : (
        <>
          <CssBaseline />
          <div>
            <Typography variant="h5">
              Thank you for your purchase, {order.customer.firstname}{' '}
              {order.customer.lastname}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">
              Order ref: {order.customer_reference}
            </Typography>
          </div>
          <br />
          <Button component={Link} to="/" variant="outlined" type="button">
            Back to Home
          </Button>
        </>
      )
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
      />
    );
  return (
    <div>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;
