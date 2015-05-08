var React = require('react');
var mui = require('material-ui');
var TextField = mui.TextField;


var Facet = React.createClass({

  propTypes: {
    onDelete: React.PropTypes.func,
    onComplete: React.PropTypes.func,
    defaultContent: React.PropTypes.object,
    fieldHintText: React.PropTypes.string,
    valueHintText: React.PropTypes.string
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

  // backspace -- delete this facet on backspace if it's empty
  fieldKeyDownHandler: function(ev) {
    var pair = this.getContent();
    if (pair.field || pair.value) return;
    if ( ev.keyCode == 8 && !(this.refs.field.getValue()) ) {
      this.props.onDelete(pair, this);
      ev.preventDefault();
    }
  },

  valueKeyDownHandler: function(ev) {

    // tab -- call cb if both inputs have text
    if ( event.keyCode == 9 && !(event.shiftKey) && this.props.onComplete ) {
      event.preventDefault();
      var pair = {
        field: this.refs.field.getValue(),
        value: this.refs.value.getValue(),
      };
      this.props.onComplete(pair, event);
    }

    // backspace -- navigate backwards if the value is empty
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
        <div className="field" style={styles}>
          <TextField
            onKeyDown={this.fieldKeyDownHandler}
            ref="field"
            hintText={this.props.fieldHintText}
            defaultValue={content.field}
          />
        </div>
        :
        <div className="value" style={styles}>
          <TextField
            ref="value"
            onKeyDown={this.valueKeyDownHandler}
            hintText={this.props.valueHintText}
            defaultValue={content.value}
          />
        </div>
      </div>
    );
  }
});

module.exports = Facet;
