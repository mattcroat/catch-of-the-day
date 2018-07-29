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
```jsx
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

# Writing HTML With JSX

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

# Passing Dynamic Data With props

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