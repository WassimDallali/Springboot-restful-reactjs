'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StarRatingComponent = function (_Component) {
  _inherits(StarRatingComponent, _Component);

  function StarRatingComponent(props) {
    _classCallCheck(this, StarRatingComponent);

    var _this = _possibleConstructorReturn(this, (StarRatingComponent.__proto__ || Object.getPrototypeOf(StarRatingComponent)).call(this));

    _this.state = {
      value: props.value
    };
    return _this;
  }

  _createClass(StarRatingComponent, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value;


      if (value != null && value !== this.state.value) {
        this.setState({ value: value });
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(inputValue) {
      var _props = this.props,
          editing = _props.editing,
          value = _props.value;


      if (!editing) {
        return;
      }

      // do not update internal state based on input value if prop passed
      if (value != null) {
        return;
      }

      this.setState({ value: inputValue });
    }
  }, {
    key: 'onStarClick',
    value: function onStarClick(index, value, name, e) {
      e.stopPropagation();

      var _props2 = this.props,
          onStarClick = _props2.onStarClick,
          editing = _props2.editing;


      if (!editing) {
        return;
      }

      onStarClick && onStarClick(index, value, name, e);
    }
  }, {
    key: 'onStarHover',
    value: function onStarHover(index, value, name, e) {
      e.stopPropagation();

      var _props3 = this.props,
          onStarHover = _props3.onStarHover,
          editing = _props3.editing;


      if (!editing) {
        return;
      }

      onStarHover && onStarHover(index, value, name, e);
    }
  }, {
    key: 'onStarHoverOut',
    value: function onStarHoverOut(index, value, name, e) {
      e.stopPropagation();

      var _props4 = this.props,
          onStarHoverOut = _props4.onStarHoverOut,
          editing = _props4.editing;


      if (!editing) {
        return;
      }

      onStarHoverOut && onStarHoverOut(index, value, name, e);
    }
  }, {
    key: 'renderStars',
    value: function renderStars() {
      var _this2 = this;

      var _props5 = this.props,
          name = _props5.name,
          starCount = _props5.starCount,
          starColor = _props5.starColor,
          emptyStarColor = _props5.emptyStarColor,
          editing = _props5.editing;
      var value = this.state.value;


      var starStyles = function starStyles(i, value) {
        return {
          float: 'right',
          cursor: editing ? 'pointer' : 'default',
          color: value >= i ? starColor : emptyStarColor
        };
      };
      var radioStyles = {
        display: 'none',
        position: 'absolute',
        marginLeft: -9999
      };

      // populate stars
      var starNodes = [];

      var _loop = function _loop(i) {
        var id = name + '_' + i;
        var starNodeInput = _react2.default.createElement('input', {
          key: 'input_' + id,
          style: radioStyles,
          className: 'dv-star-rating-input',
          type: 'radio',
          name: name,
          id: id,
          value: i,
          checked: value === i,
          onChange: _this2.onChange.bind(_this2, i, name)
        });
        var starNodeLabel = _react2.default.createElement(
          'label',
          {
            key: 'label_' + id,
            style: starStyles(i, value),
            className: 'dv-star-rating-star ' + (value >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star'),
            htmlFor: id,
            onClick: function onClick(e) {
              return _this2.onStarClick(i, value, name, e);
            },
            onMouseOver: function onMouseOver(e) {
              return _this2.onStarHover(i, value, name, e);
            },
            onMouseLeave: function onMouseLeave(e) {
              return _this2.onStarHoverOut(i, value, name, e);
            }
          },
          _this2.renderIcon(i, value, name, id)
        );

        starNodes.push(starNodeInput);
        starNodes.push(starNodeLabel);
      };

      for (var i = starCount; i > 0; i--) {
        _loop(i);
      }

      return starNodes.length ? starNodes : null;
    }
  }, {
    key: 'renderIcon',
    value: function renderIcon(index, value, name, id) {
      var _props6 = this.props,
          renderStarIcon = _props6.renderStarIcon,
          renderStarIconHalf = _props6.renderStarIconHalf;


      if (typeof renderStarIconHalf === 'function' && Math.ceil(value) === index && value % 1 !== 0) {
        return renderStarIconHalf(index, value, name, id);
      }

      if (typeof renderStarIcon === 'function') {
        return renderStarIcon(index, value, name, id);
      }

      return _react2.default.createElement(
        'i',
        { key: 'icon_' + id, style: { fontStyle: 'normal' } },
        '\u2605'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props,
          editing = _props7.editing,
          className = _props7.className;

      var classes = (0, _classnames2.default)('dv-star-rating', {
        'dv-star-rating-non-editable': !editing
      }, className);

      return _react2.default.createElement(
        'div',
        { style: { display: 'inline-block', position: 'relative' }, className: classes },
        this.renderStars()
      );
    }
  }]);

  return StarRatingComponent;
}(_react.Component);

StarRatingComponent.propTypes = {
  name: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.number,
  editing: _propTypes2.default.bool,
  starCount: _propTypes2.default.number,
  starColor: _propTypes2.default.string,
  onStarClick: _propTypes2.default.func,
  onStarHover: _propTypes2.default.func,
  onStarHoverOut: _propTypes2.default.func,
  renderStarIcon: _propTypes2.default.func,
  renderStarIconHalf: _propTypes2.default.func
};
StarRatingComponent.defaultProps = {
  starCount: 5,
  editing: true,
  starColor: '#ffb400',
  emptyStarColor: '#333'
};
exports.default = StarRatingComponent;
module.exports = exports['default'];
