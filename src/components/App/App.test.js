import React from 'react'
import App from './App'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { getOrders, postOrder, deleteOrder } from '../../apiCalls'
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

  it('should display a message that there are no orders yet if there were none stored in server', async () => {

    getOrders.mockResolvedValue({
      orders: []
    })

    render(
      <App />
    )

    const appName = screen.getByRole('heading', { name: 'Burrito Builder' });
    const nameInput = screen.getByPlaceholderText('Name');
    const submitBtn = screen.getByRole('button', { name: 'Submit Order' });
    const noOrderMsg = await waitFor(() => screen.getByText('No orders yet!'))

    expect(appName).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(noOrderMsg).toBeInTheDocument();
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
  });

  it('should allow a user to delete an order from the system once it is complete', async () => {

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

    deleteOrder.mockResolvedValue(['Successful delete'])

    render(
      <App />
    )

    const order1 = await waitFor(() => screen.getByRole('heading', { name: 'Pat' }));
    const deleteBtn1 = screen.getByLabelText('Delete order for Pat');
    
    fireEvent.click(deleteBtn1);

    await waitFor(() => expect(order1).not.toBeInTheDocument());
  })
})