// React core
import React from 'react';
// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Input ref property
  myInput = React.createRef();

  // This allows us to bind this
  goToStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get text from input
    const storeName = this.myInput.current.defaultValue;
    // 3. Change page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter a Store</h2>
        <input
          type="text"
          ref={this.myInput}
          required
          placholder="Store Name"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store -></button>
      </form>
    );
  }
}

export default StorePicker;