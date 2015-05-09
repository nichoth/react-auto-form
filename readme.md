# React Auto Form

Automatically add more blank input elements for key value pairs.

```js
var React = require('react');
var Form = require('react-auto-form');
window.React = React;

var App = React.createClass({

  submitHandler: function(event) {
    event.preventDefault();
    console.log(this.refs.form.getData());
  },

  render: function() {
    return (
      <form onSubmit={this.submitHandler}>
        <Form ref={'form'} />
        <button type="submit">submit</button>
      </form>
    );
  }

});

React.render(<App />, document.body);
```

[demo](https://cf4fc572d30e67257078965eae8c76ccfd05e2d9.htmlb.in)
