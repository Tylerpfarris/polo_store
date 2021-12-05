import Commerce from '@chec/commerce.js';


export const commerce = new Commerce(process.env.COMMERCE_PUBLIC_KEY, true);
