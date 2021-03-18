import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { CartContextProvider } from './CartContext';

test('renders learn react link', () => {
  render(
    <CartContextProvider>
      <App />
    </CartContextProvider>
  );
  const AddToCartButton = screen.getByText(/Add to Cart/i);
  fireEvent.click(AddToCartButton)
  fireEvent.click(AddToCartButton)
  fireEvent.click(AddToCartButton)
  const cartAria = screen.getByLabelText(/3 items in cart/i)
  expect(cartAria).toBeInTheDocument();
});
