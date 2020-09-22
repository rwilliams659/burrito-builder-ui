import React from 'react'
import App from './App'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder } from '../../apiCalls'
jest.mock('../../apiCalls.js')

describe('App', () => {
  it('should display the correct information when rendered', async () => {

    getOrders.mockResolvedValue({
      orders: [
        {
          id: 1,
          name: 'Pat',
          ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
        },
        {
          id: 2,
          name: 'Joe',
          ingredients: ['beans', 'sofritas', 'guacamole']
        },
        {
          id: 3,
          name: 'Melissa',
          ingredients: ['lettuce', 'pico de gallo', 'hot sauce']
        }
      ]
    })

    render(
      <App/>
    )

    const appName = screen.getByRole('heading', { name: 'Burrito Builder'});
    const nameInput = screen.getByPlaceholderText('Name');
    const beansBtn = screen.getByRole('button', { name: 'beans' });
    const submitBtn = screen.getByRole('button', { name: 'Submit Order' });
    const order1 = await waitFor(() => screen.getByRole('heading', { name: 'Pat'}));
    const order2 = screen.getByRole('heading', { name: 'Joe' });
    const order3 = screen.getByRole('heading', { name: 'Melissa' })

    expect(appName).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(order1).toBeInTheDocument();
    expect(order2).toBeInTheDocument();
    expect(order3).toBeInTheDocument();
  });

  it('should allow a user to create an order and see it on the screen', async () => {

    getOrders.mockResolvedValue({
      orders: [
        {
          id: 1,
          name: 'Pat',
          ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
        },
        {
          id: 2,
          name: 'Joe',
          ingredients: ['beans', 'sofritas', 'guacamole']
        },
        {
          id: 3,
          name: 'Melissa',
          ingredients: ['lettuce', 'pico de gallo', 'hot sauce']
        }
      ]
    })

    postOrder.mockResolvedValue({
      id: 10,
      name: 'Rachel',
      ingredients: ['beans', 'guacamole']
    })

    render(
      <App />
    )

    const nameInput = screen.getByPlaceholderText('Name');
    const beansBtn = screen.getByRole('button', { name: 'beans' });
    const guacamoleBtn = screen.getByRole('button', { name: 'guacamole' });
    const submitBtn = screen.getByRole('button', { name: 'Submit Order' });

    fireEvent.change(nameInput, { target: { value: 'Rachel' } });
    fireEvent.click(beansBtn);
    fireEvent.click(guacamoleBtn);
    fireEvent.click(submitBtn);

    const newOrder = await waitFor(() => screen.getByRole('heading', { name: 'Rachel'}));

    expect(newOrder).toBeInTheDocument(); 
  })
})