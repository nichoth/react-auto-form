var React = require('react');
var Form = require('../Form.react');
var Facet = require('../Facet.react');
window.React = React;

var React = require('react');

var Example = React.createClass({

  getInitialState: function() {
    return {
      rows: []
    };
  },

  render: function() {
    var rows = this.state.rows.map(function(row) {
      return
    }, this);

    return (
      <Form ref="form">
        <Facet onComplete={this.onFacetComplete} />
      </Form>
    );
  }

});

React.render(<Form />, document.body);
