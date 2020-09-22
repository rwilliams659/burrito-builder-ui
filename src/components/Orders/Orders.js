import React from 'react';
import './Orders.css';
import propTypes from 'prop-types'

const Orders = props => {
  const orderEls = props.orders.map(order => {
    return (
      <div className="order" key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient, index) => {
            return <li key={index}>{ingredient} ${props.ingredientCosts[ingredient].toFixed(2)}</li>
          })}
        </ul>
        <p>Total cost: ${order.ingredients.reduce((totalCost, ingredient) => {
          return totalCost + props.ingredientCosts[ingredient]
        }, 0).toFixed(2)}</p>
        <button id={order.id} onClick={props.removeOrder} aria-label={`Delete order for ${order.name}`}>Delete order</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

Orders.propTypes = {
  orders: propTypes.array,
  removeOrder: propTypes.func,
  ingredientCosts: propTypes.object
}


export default Orders;