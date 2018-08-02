import React from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends React.Component {
  // PropTypes
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    order: PropTypes.object.isRequired,
    removeFromOrder: PropTypes.func.isRequired
  };

  renderOrder = key => {
    // Grab the fish
    const fish = this.props.fishes[key];
    // Amount of bought fish
    const count = this.props.order[key];
    // Is available
    const isAvailable = fish && fish.status === 'available';
    // Animation options
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    };

    // Make sure the fish is loaded before we continue
    if (!fish) return null;

    if (!isAvailable) {
      // If fish exist output name else say fish
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>
          Sorry {fish ? fish.name : 'fish'} is no longer available
        </li>
      </CSSTransition>
      );
    }

    return (
      <CSSTransition {...transitionOptions}>
      <li key={key}>
        <span>
          <TransitionGroup component="span" className="count">
            <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
              <span>{count}</span>
            </CSSTransition>
          </TransitionGroup>
          lbs {fish.name} &nbsp;
          {formatPrice(count * fish.price)}
          <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
        </span>
      </li>
      </CSSTransition>
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
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          Total: <strong>{formatPrice(total)}</strong>
        </div>
      </div>
    );
  }
}

export default Order;