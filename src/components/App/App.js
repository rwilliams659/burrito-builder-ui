import React, { Component } from 'react';
import './App.css';
import {deleteOrder, getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      ingredientCosts: {
        beans: 1.5,
        steak: 4,
        carnitas: 3,
        sofritas: 2.5,
        lettuce: 0.5,
        'queso fresco': 2,
        'pico de gallo': 1,
        'hot sauce': 0.5,
        guacamole: 2,
        jalapenos: 0.5,
        cilantro: 0.5,
        'sour cream': 1
      }
    }
  }

  componentDidMount() {
    getOrders()
    .then(orders => this.setState({ orders: orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (orderToPost) => {
    postOrder(orderToPost)
      .then(order => {
        const newOrderState = this.state.orders;
        newOrderState.push(order);
        this.setState({ orders: newOrderState})
      })
      .catch(err => console.error('Could not post new order'))
  }

  removeOrder = (event) => {
    event.preventDefault(); 
    const orderId = event.target.id
    deleteOrder(orderId)
      .then(response => {
        const newOrderState = this.state.orders
        const targetIndex = newOrderState.findIndex(order => order.id === parseInt(orderId));
        newOrderState.splice(targetIndex, 1)
        this.setState({ orders: newOrderState})
      })
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm 
            addNewOrder={this.addNewOrder}
          />
        </header>

        <Orders 
          orders={this.state.orders}
          removeOrder={this.removeOrder}
          ingredientCosts={this.state.ingredientCosts}
        />
      </main>
    );
  }
}


export default App;
