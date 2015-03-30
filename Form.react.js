var React = require('react'),
    mui = require('material-ui'),
    Paper = mui.Paper,
    TextField = mui.TextField;

var Facet = React.createClass({

  propTypes: {
    onDelete: React.PropTypes.func,
    onComplete: React.PropTypes.func,
    defaultContent: React.PropTypes.object
  },

  clearValue: function() {
    this.refs.field.clearValue();
    this.refs.value.clearValue();
  },

  focus: function() {
    this.refs.field.focus();
  },

  getContent: function() {
    return {
      field: this.refs.field.getValue(),
      value: this.refs.value.getValue()
    }
  },

  fieldKeyDownHandler: function(ev) {
    // backspace
    var pair = this.getContent();
    if (pair.field || pair.value) return;
    if ( ev.keyCode == 8 && !(this.refs.field.getValue()) ) {
      this.props.onDelete(pair, this);
      ev.preventDefault();
    }
  },

  valueKeyDownHandler: function(ev) {
    if ( event.keyCode == 9 && !(event.shiftKey) && this.props.onComplete ) {
      event.preventDefault();
      var pair = {
        field: this.refs.field.getValue(),
        value: this.refs.value.getValue(),
      };
      this.props.onComplete(pair, event);
    }

    // backspace
    if ( ev.keyCode == 8 && !(this.refs.value.getValue()) ) {
      this.refs.field.focus();
      ev.preventDefault();
    }
  },

  render: function() {

    var styles = {
      padding: "1em",
      display: "inline-block",
      maxWidth: "50%"
    };

    var content = this.props.defaultContent || {field: null, value: null};

    return (
      <div>
        <div className="test-field" style={styles}>
          <TextField
            onKeyDown={this.fieldKeyDownHandler}
            ref="field"
            hintText="Hint Text"
            defaultValue={content.field}
          />
        </div>
        <div className="test-field" style={styles}>
          <TextField
            ref="value"
            onKeyDown={this.valueKeyDownHandler}
            hintText="Hint Text"
            defaultValue={content.value}
          />
        </div>
      </div>
    );
  }
});


var Form = React.createClass({

  getInitialState: function() {
    return {
      rows: [{field: '', value: ''}]
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
    if (this.state.rows.length > 1) {
      var state = this.state;
      console.log(elmt.props.index);
      delete state.rows[elmt.props.index];
      this.setState(state);
      this.refs[elmt.props.index-1].refs.value.focus();
    }
  },

  render: function() {
    console.log(this.state);
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
        <div className="form">
          {rows}
          <Facet
            ref={'empty'}
            onComplete={this.onFacetComplete}
            onDelete={this.onFacetDelete}
          />
        </div>
      </Paper>
    );
  }

});

module.exports = Form;
