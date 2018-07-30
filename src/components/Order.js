// React core
import React from 'react';
// Helpers
import { formatPrice } from '../helpers';

class Order extends React.Component {
  renderOrder = (key) => {
    // Grab the fish
    const fish = this.props.fishes[key];
    // Amount of bought fish
    const count = this.props.order[key];
    // Is available
    const isAvailable = fish.status === 'available';

    if (!isAvailable) {
      // If fish exist output name else say fish
      return <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>;
    }

    return (
      <li key={key}>
        {count} lbs {fish.name} &nbsp;
        {formatPrice(count * fish.price)}
      </li>
    );
  }

  render() {
    // Array of all the orderIds
    const orderIds = Object.keys(this.props.order);
    // Total of how much each of them cost
    const total = orderIds.reduce((prevTotal, key) => {
      // Grab the fish
      const fish = this.props.fishes[key];
      // Amount of bought fish
      const count = this.props.order[key];
      // Is available
      const isAvailable = fish && fish.status === 'available';
      // Tally
      if (isAvailable) {
        return prevTotal + (count * fish.price);
      }
      // Skip over if unavailabe and keep adding up the additional ones
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
        </ul>
        <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;
