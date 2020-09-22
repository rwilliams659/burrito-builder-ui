import React from 'react'
import OrderForm from './OrderForm'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Order Form', () => {
  it('should display the correct information ', () => {

    render (
      <OrderForm
        addNewOrder={jest.fn()}
      />
    )

    const nameInput = screen.getByPlaceholderText('Name');
    const beansBtn = screen.getByRole('button', { name: 'beans'});
    const steakBtn = screen.getByRole('button', { name: 'steak' });
    const carnitasBtn = screen.getByRole('button', { name: 'carnitas' });
    const sofritasBtn = screen.getByRole('button', { name: 'sofritas' });
    const lettuceBtn = screen.getByRole('button', { name: 'lettuce' });
    const quesoFrescoBtn = screen.getByRole('button', { name: 'queso fresco' });
    const picoDeGalloBtn = screen.getByRole('button', { name: 'pico de gallo' });
    const hotSauceBtn = screen.getByRole('button', { name: 'hot sauce' });;
    const guacamoleBtn = screen.getByRole('button', { name: 'guacamole' });
    const jalapenosBtn = screen.getByRole('button', { name: 'jalapenos' });
    const cilantroBtn = screen.getByRole('button', { name: 'cilantro' });
    const sourCreamBtn = screen.getByRole('button', { name: 'sour cream' });
    const orderMsg = screen.getByText('Order: Nothing selected');
    const submitBtn = screen.getByRole('button', {name: 'Submit Order'});

    expect(nameInput).toBeInTheDocument();
    expect(beansBtn).toBeInTheDocument();
    expect(steakBtn).toBeInTheDocument();
    expect(carnitasBtn).toBeInTheDocument();
    expect(sofritasBtn).toBeInTheDocument();
    expect(lettuceBtn).toBeInTheDocument();
    expect(quesoFrescoBtn).toBeInTheDocument();
    expect(picoDeGalloBtn).toBeInTheDocument();
    expect(hotSauceBtn).toBeInTheDocument();
    expect(guacamoleBtn).toBeInTheDocument();
    expect(jalapenosBtn).toBeInTheDocument();
    expect(cilantroBtn).toBeInTheDocument();
    expect(sourCreamBtn).toBeInTheDocument();
    expect(orderMsg).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

  it('should have form values that update based on the user inputs', () => {

    render(
      <OrderForm
        addNewOrder={jest.fn()}
      />
    )

    const nameInput = screen.getByPlaceholderText('Name');

    fireEvent.change(nameInput, { target: { value: 'Rachel'}});

    expect(nameInput.value).toBe('Rachel');
  })
})