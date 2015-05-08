var React = require('react');
var Form = require('../');
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
