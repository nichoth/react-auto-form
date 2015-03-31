var React = require('react'),
    Facet = require('./Facet.react'),
    mui = require('material-ui'),
    Paper = mui.Paper;

var Form = React.createClass({

  getInitialState: function() {
    return {
      rows: []
    };
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
        />
      );
    }, this);

    return (
      <Paper className="test" zDepth={1}>
        <div ref={'form'} className="form">
          {rows}
          <Facet
            ref={'empty'}
            index={this.state.rows.length}
            onComplete={this.onFacetComplete}
            onDelete={this.onFacetDelete}
          />
        </div>
      </Paper>
    );
  }

});

module.exports = Form;
