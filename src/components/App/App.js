import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
    .then(orders => this.setState({ orders: orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (orderToPost) => {
    postOrder()
      .then(order => {
        const newOrderState = this.state.orders;
        newOrderState.push(order);
        this.setState({ orders: newOrderState})
      })
      .catch(err => console.error('Could not post new order'))
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

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
