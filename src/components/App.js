// React core
import React from 'react';
// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
// Sample fishes
import sampleFishes from '../sample-fishes';
// Firebase
import base from '../base';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

  componentDidMount() {
    // Firebase reference to a piece of data in the database
    const { params } = this.props.match;
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    });
  }

  componentWillUnmount() {
    // When we leave the store we can remove the reference
    base.removeBinding(this.ref);
  }

  // Add fish
  addFish = fish => {
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fishes to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  // Load sample fishes
  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes });
  };

  // Add order
  addToOrder = key => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* Loop over fishes */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                key={key}
                index={key}
                details={this.state.fishes[key]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
