import React, { Component } from 'react';
import propTypes from 'prop-types'

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (this.state.name && this.state.ingredients.length > 0) {
      const orderToPost = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }
      this.props.addNewOrder(orderToPost)
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleIngredientChange = (e) => {
    e.preventDefault();
    const name = e.target.name
    const newIngredientsState = this.state.ingredients
    if (!newIngredientsState.includes(name)) {
      newIngredientsState.push(name);
      this.setState({ ingredients: newIngredientsState })
    }
  }

  handleNameChange = (e) => {
    const name = e.target.value; 
    this.setState({ name })
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

OrderForm.propTypes = {
  addNewOrder: propTypes.func
}

export default OrderForm;
