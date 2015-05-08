var React = require('react'),
    Facet = require('./lib/Facet.react');

var Form = React.createClass({

  propTypes: {
    fieldHintText: React.PropTypes.string,
    valueHintText: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      rows: []
    };
  },

  // return all the stuff in the inputs
  getData: function() {
    var data = Object.keys(this.refs).map(function(key) {
      return this.refs[key].getContent();
    }, this)
      .filter(function(pair) {
        return (pair.field.length && pair.value.length);
      })
    ;
    return data;
  },

  onFacetComplete: function(pair) {
    if (pair.field && pair.value) {
      var state = this.state;
      state.rows.push(pair);
      this.setState(state);
      this.refs.empty.clearValue();
      this.refs.empty.focus();
    }
  },

  onFacetDelete: function(pair, elmt) {
    if (this.state.rows.length > 0) {
      var state = this.state;
      delete state.rows[elmt.props.index];
      this.setState(state);
      this.refs[elmt.props.index - 1].refs.value.focus();
    }
  },

  render: function() {
    var rows = this.state.rows.map(function(row, i) {
      return (
        <Facet
          onDelete={this.onFacetDelete}
          defaultContent={row}
          key={i}
          index={i}
          ref={i}
          fieldHintText={this.props.fieldHintText}
          valueHintText={this.props.valueHintText}
        />
      );
    }, this);

    return (
        <div className="form">
          {rows}
          <Facet
            ref={'empty'}
            index={this.state.rows.length}
            onComplete={this.onFacetComplete}
            onDelete={this.onFacetDelete}
            fieldHintText={this.props.fieldHintText}
            valueHintText={this.props.valueHintText}
          />
        </div>
    );
  }

});

module.exports = Form;
