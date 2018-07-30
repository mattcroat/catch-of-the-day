# Thinking and Understanding React Components

Everything in React is a component:
+ Reusable piece of your website
+ Every component in React is it's own class
+ Best practice is to use capital letters for class names
+ Every class in React needs at least one method inside of it
+ We don't touch the DOM, only when we mount the page
+ To render it to the page we need react-dom
+ Tags in React need to be closed
+ Best practice is to store components in multiple files

# Import React

```jsx
// Import React
import React from 'react';
// We need this to render our component
import { render } from 'react-dom';

// Component
class StorePicker extends React.Component {
  // Every class in React needs at least one method inside of it
  render() {
    return <p>Hello!</p>
  }
}

// Render takes JSX and a mounting point
render(<StorePicker />, document.querySelector('#main'));
```

We don't touch the DOM, only when we mount the page

### index.html
```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Catch of the Day</title>
</head>

<body>
  <input type="checkbox" id="fold">
  <label for="fold">Fold</label>

  <div id="main">
    <!-- This is where our React app will go -->
  </div>

</body>

</html>
```

# Storing Components in Multiple Files

### index.js
```jsx
// Import React
import React from 'react';
// We need this to render our component
import { render } from 'react-dom';
// Import StorePicker component
import StorePicker from './components/StorePicker';

// Render takes JSX and a mounting point
render(<StorePicker />, document.querySelector('#main'));
```

### components/StorePicker.js
```jsx
import React from 'react';

// Component
class StorePicker extends React.Component {
  // Every class in React needs at least one method inside of it
  render() {
    return <p>Hello!</p>
  }
}

export default StorePicker;
```

# Writing HTML with JSX

JSX is a mix of JavaScript and HTML:
+ You can't use regular HTML attributes
+ Return is not a function, it's a keyword, we're returning what's inside the parentheses
+ You can't return sibling elements but you can wrap them in React.Fragment tag

React JSX behind the scenes
```jsx
import React from 'react';

class StorePicker extends React.Component {
  render() {
    return React.createElement('p', { className: 'Hey' }, 'Heyo');
  }
}
```

JSX
```jsx
import React, { Fragment } from 'react';

class StorePicker extends React.Component {
  render() {
    return (
      <Fragment>
        <p>Fish!</p>
        <form className="store-selector">
          { /* Comment */ }          
          <h2>Please Enter a Store</h2>
        </form>
      </Fragment>
    )
  }
}
```

# Loading CSS Into React

CSS in React can be approached in a number of different ways:
+ Normal CSS link in index.html
+ Inline CSS the JSX way, importing CSS into a component that only relates to it
+ Importing CSS directly into index.js that gets applied to the entire application

# Creating Application Layout with Components

App component:
+ The mama component that's gonna hold all our children

### App.js
```jsx
// React core
import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
```

# Passing Dynamic Data with props

Props:
+ Way to get data into a component
+ 🏠 State is where data lives, state is the data's home and 🚗 props is how the data gets to where it needs to go
+ Object inside of a component

These attributes provide more information to the tag
```html
<img src="dog.jpg" alt="Dog">
```

Because we're dealing with components it's very much the same way in React however they're not called attributes, they're called props.

Props are the way we get data into a component.


### App.js
```jsx
// React core
import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
```

Header is the component instance of this.
Props is going to be a object inside of the component.

### Header.js
```jsx
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>
          Catch
          <span className="ofThe">
            <span className="of">Of</span>
            <span className="the">The</span>
          </span>
          Day
        </h1>
        <h3 className="tagline">
          <span>{this.props.tagline}</span>
        </h3>
      </header>
    );
  }
}

export default Header;
```

**In Chrome dev tools $r shows last selected elemented.**

Inspecting the selected component shows all it's properties and reveals that the whole component thing is basically a object. Each component is a new instance.

# Stateless Functional Components

**If your component only has a render method and prop types then it's unnecessary to do the entire react class thing with render.**

Pass it argument props and remove this

```jsx
import React from 'react';
// Implicit return
const Header = props => (
  <header className="top">
    <h1>
      Catch
        <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
      </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

export default Header;
```

You can destructure the props into their own variables

```jsx
import React from 'react';

const Header = ({ tagline, age }) => (
  <header className="top">
    <h1>
      Catch
        <span className="ofThe">
        <span className="of">Of</span>
        <span className="the">The</span>
      </span>
      Day
      </h1>
    <h3 className="tagline">
      <span>{tagline}</span>
    </h3>
  </header>
);

export default Header;
```

# Routing with React Router

+ Switch tries each Route until it find one or returns not found
+ When the path exactly matches then it renders the component
+ We have to render out the Router to our mounting point

### Router.js
```jsx
// React core
import React from 'react';
// Router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import StorePicker from './StorePicker';
import App from './App';
import NotFound from './NotFound';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorePicker} />
      <Route exact path="/store/:storeId" component={App} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
```

### index.js
```jsx
// React core
import React from 'react';
import { render } from 'react-dom';
// Components
import Router from './components/Router';
import './css/style.css'

// Render takes JSX and a mounting point
render(<Router />, document.querySelector('#main'));
```

# Helper and Utility Functions

+ src/helpers.js any non React component, useful collection of helper functions

```jsx
// React core
import React from 'react';
// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>
        <input
          type="text"
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
```

# Events, Ref and this Binding

+ Events work the same as in JavaScript and are wrapped in SyntheticEvent for cross-browser compatability
+ They're done inline in React
+ There are two ways to handle inputs, refs that touch the DOM element and state that syncs the text of the input
+ Ref allows us to reference an actual DOM node on the page, it's going to surface the input on the component so that we can grab it
+ Any methods me add are not bound by default making it hard to reference so we need to bind them on our own


Inline event
```jsx
// React core
import React from 'react';
// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  handleClick() {
    alert('Hey! 👍');
  }
  
  render() {
    return (
      <form className="store-selector">
        <h2>Please Enter a Store</h2>

        <button onClick={this.handleClick}>Click me!</button>
        
        <input
          type="text"
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
```

Binding this
```jsx
// React core
import React from 'react';
// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Input ref property
  myInput = React.createRef();

  // This allows us to bind this
  goToStore = (event) => {
    event.preventDefault();

    console.log(this);
  }
  
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
```

# Handling Events

```jsx
// React core
import React from 'react';
// Helpers
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  // Input ref property
  myInput = React.createRef();

  // This allows us to bind this
  goToStore = (event) => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get text from input
    const storeName = this.myInput.value.value;
    // 3. Change page to /store/whatever-they-entered
    this.props.history.push(`/store/${storeName}`);
  }
  
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
```

# Understanding State

What is state?
+ State is a object that holds data
+ Lives inside of a component
+ Stores all data from a component that it and some of it's children needs
+ Single source of truth
+ We don't need to pass entire state, only the piece which we wish to update

Our goal is to pass <AddFishForm/> data to our state that lives in <App/> and update it but our <AddFishForm/> doesn't know about createFish() so we need to pass it down from <App/> using props.

<AddFishForm/> is currently two levels deep.

<App/>
  ...
  <Inventory/>
    <AddFishForm/>

### AddFishForm.js
```jsx
// Core react
import React from 'react';

class AddFishForm extends React.Component {
  // Our values
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();

  createFish = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Store our values in a object
    const fish = {
      name: this.nameRef.value.value,
      price: parseFloat(this.priceRef.value.value),
      status: this.statusRef.value.value,
      desc: this.descRef.value.value,
      image: this.imageRef.value.value
    };
    // 3. Pass the object to props
    this.props.addFish(fish);
    // 4. Refresh form
    event.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input name="name" ref={this.nameRef} type="text" placeholder="Name" />
        <input
          name="price"
          ref={this.priceRef}
          type="text"
          placeholder="Price"
        />
        <select name="status" ref={this.statusRef}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold out!</option>
        </select>
        <textarea name="desc" ref={this.descRef} placeholder="Desc" />
        <input
          name="image"
          ref={this.imageRef}
          type="text"
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
```

We want to make addFish() available to <AddFishForm/> which is two levels lower in our React app. We're passing it down to <Inventory/> because <AddFishForm/> lives on it. Once we get back the data we can update our state.

### App.js
```jsx
// React core
import React from 'react';

// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

  // Add fish
  addFish = fish => {
    // 1. Take a copy of existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fishes to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({ fishes });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
```

addFish() doesn't live on <Inventory/>, it's passed down by props. It now has access to the function that lives two levels higher. We need to reference it using the keyword props.

```jsx
// Core react
import React from 'react';
// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish} />
      </div>
    );
  }
}

export default Inventory;
```

# Loading data into State onClick

Same as previously, we need to pass down a method using props and update state.

### App.js
```jsx
// React core
import React from 'react';
// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
// Sample fishes
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
```

### Inventory.js
```jsx
// Core react
import React from 'react';
// Components
import AddFishForm from './AddFishForm';

class Inventory extends React.Component {
  render() {
    return (
      <div className="inventory">
        <h2>Inventory</h2>
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSampleFishes}>
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
```

# Display State with JSX

We're passing values from state as props to <Fish/>. This template is then used by <App/>.

```jsx
// React core
import React from 'react';
// Helpers
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, name, price, desc, status } = this.props.details;

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">{name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button>Add To Cart</button>
      </li>
    );
  }
}

export default Fish;
```

We're looping over the fishes from state using Object.keys() because they're an object. For every entry we're outputing a <Fish/> component with a key and details.

```jsx
// React core
import React from 'react';
// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
// Sample fishes
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

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

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {/* Loop over fishes */}
            {Object.keys(this.state.fishes).map(key => (
              <Fish key={key} details={this.state.fishes[key]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
```

# Updating our Order State

We pass order via props again that needs a key. If you need access to a key you have to pass it a second time with a prop named other than key. In this case index.

```jsx
// React core
import React from 'react';
// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
// Sample fishes
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

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
        <Order />
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;

```

Then we handle the click where the order gets added to state over props 👍

```jsx
// React core
import React from 'react';
// Helpers
import { formatPrice } from '../helpers';

class Fish extends React.Component {
  render() {
    const { image, name, price, desc, status } = this.props.details;
    const isAvailable = status === 'available';

    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button disabled={!isAvailable} onClick={() => this.props.addToOrder(this.props.index)}>
          {isAvailable ? 'Add To Order' : 'Sold out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
```

# Displaying Order State with JSX

Pass fishes and order props down <Order/>

### App.js
```jsx
// React core
import React from 'react';
// Components
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
// Sample fishes
import sampleFishes from '../sample-fishes';

class App extends React.Component {
  // Our state
  state = {
    fishes: {},
    order: {}
  };

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
```

Seperate render functions in a single component
+ Overloaded complex code
+ Doesn't make sense to make a seperate component

Tally up the total of our actual order and loop over orderIds

### Order.js
```jsx
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
```

# Persisting our State with Firebase

[Firebase](https://firebase.google.com/):
+ Real-time database provided by Google using web sockets rather than AJAX
+ Updated data gets relayed to everyone who has the store open
+ Going to allow us to mirror our state to Firebase

Firebase realtime database rules for testing
```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### src/base.js
```js
// React Firebase specific package
import Rebase from 're-base';
// Official Firebase package
import firebase from 'firebase';

// Configure application
const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAUYpYY65CK7xFHtNljl4k3z-_vHdav1VM',
  authDomain: 'catch-of-the-day-27c7a.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-27c7a.firebaseio.com'
});

// Create rebase bindings
const base = Rebase.createClass(firebaseApp.database());

// Named export
export { firebaseApp };

// Default export
export default base;
```

We need to wait until our <App/> component is on the page then we can sync them up

Lifecycle methods
+ They tell us when certain things are happening componentDidMount()
+ Since we're constantly listening to things we need to unlisten else it causes a memory leak componentWillUnmount()