var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;


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
      maxWidth: "45%"
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
        :
        <div className="test-value" style={styles}>
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

module.exports = Facet;
