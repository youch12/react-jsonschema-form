"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uuidv4 = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuidv4 = exports.uuidv4 = require("uuid/v4");

var DefaultObjectFieldTemplate = function (_Component) {
  _inherits(DefaultObjectFieldTemplate, _Component);

  function DefaultObjectFieldTemplate(props) {
    _classCallCheck(this, DefaultObjectFieldTemplate);

    var _this = _possibleConstructorReturn(this, (DefaultObjectFieldTemplate.__proto__ || Object.getPrototypeOf(DefaultObjectFieldTemplate)).call(this, props));

    _this.clickedPanel = function (evt) {
      _this.setState({ isOpen: !_this.state.isOpen });
    };

    _this.state = { isOpen: false };
    return _this;
  }

  _createClass(DefaultObjectFieldTemplate, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var DescriptionField = this.props.DescriptionField;

      var objectTemplate = _react2.default.createElement(
        "fieldset",
        null,
        this.props.description && _react2.default.createElement(DescriptionField, {
          id: this.props.idSchema.$id + "__description",
          description: this.props.description,
          formContext: this.props.formContext
        }),
        this.props.properties.map(function (prop) {
          return prop.content;
        })
      );
      var objectToRender = Object.keys(this.props.schema.properties).length > 1 ? _react2.default.createElement(
        "div",
        { className: "panel-group" },
        _react2.default.createElement(
          "div",
          { className: "panel panel-default" },
          _react2.default.createElement(
            "div",
            {
              className: "panel-heading",
              onClick: function onClick(evt) {
                return _this2.clickedPanel(evt);
              } },
            _react2.default.createElement(
              "h4",
              { className: "panel-title" },
              _react2.default.createElement(
                "span",
                {
                  className: "panel-toggle" + (this.state.isOpen ? " open" : "") },
                this.props.uiSchema["ui:title"] || this.props.title || _react2.default.createElement("span", { className: "empty-title-field" })
              ),
              _react2.default.createElement("span", {
                className: "glyphicon glyphicon-edit",
                onClick: function onClick(e) {
                  e.stopPropagation();
                  _this2.props.onEditClicked(_this2.props);
                }
              })
            )
          ),
          _react2.default.createElement(
            "div",
            {
              className: "panel-collapse collapse" + (this.state.isOpen ? " in" : "") },
            _react2.default.createElement(
              "div",
              { className: "panel-body" },
              objectTemplate
            )
          )
        )
      ) : objectTemplate;
      return objectToRender;
    }
  }]);

  return DefaultObjectFieldTemplate;
}(_react.Component);

var ObjectField = function (_Component2) {
  _inherits(ObjectField, _Component2);

  function ObjectField() {
    var _ref;

    var _temp, _this3, _ret;

    _classCallCheck(this, ObjectField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this3 = _possibleConstructorReturn(this, (_ref = ObjectField.__proto__ || Object.getPrototypeOf(ObjectField)).call.apply(_ref, [this].concat(args))), _this3), _this3.onPropertyChange = function (name) {
      return function (value, errorSchema) {
        var newFormData = _extends({}, _this3.props.formData, _defineProperty({}, name, value));
        _this3.props.onChange(newFormData, errorSchema && _this3.props.errorSchema && _extends({}, _this3.props.errorSchema, _defineProperty({}, name, errorSchema)));
      };
    }, _temp), _possibleConstructorReturn(_this3, _ret);
  }

  _createClass(ObjectField, [{
    key: "isRequired",
    value: function isRequired(name) {
      var schema = this.props.schema;
      return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1;
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          formData = _props.formData,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          name = _props.name,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          idPrefix = _props.idPrefix,
          onBlur = _props.onBlur,
          onFocus = _props.onFocus,
          _props$registry = _props.registry,
          registry = _props$registry === undefined ? (0, _utils.getDefaultRegistry)() : _props$registry;
      var definitions = registry.definitions,
          fields = registry.fields,
          formContext = registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions, formData);
      var title = schema.title === undefined ? name : schema.title;
      var description = uiSchema["ui:description"] || schema.description;
      var orderedProperties = void 0;

      try {
        var properties = Object.keys(schema.properties);
        orderedProperties = (0, _utils.orderProperties)(properties, uiSchema["ui:order"]);
      } catch (err) {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "p",
            { className: "config-error", style: { color: "red" } },
            "Invalid ",
            name || "root",
            " object field configuration:",
            _react2.default.createElement(
              "em",
              null,
              err.message
            ),
            "."
          ),
          _react2.default.createElement(
            "pre",
            null,
            JSON.stringify(schema)
          )
        );
      }

      var Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;

      var templateProps = {
        title: uiSchema["ui:title"] || title,
        description: description,
        TitleField: TitleField,
        DescriptionField: DescriptionField,
        onEditClicked: this.props.onEditClicked,
        properties: orderedProperties.map(function (name) {
          return {
            content: _react2.default.createElement(SchemaField, {
              key: name,
              name: name,
              required: _this4.isRequired(name),
              schema: schema.properties[name],
              uiSchema: uiSchema[name],
              errorSchema: errorSchema[name],
              idSchema: idSchema[name],
              idPrefix: idPrefix,
              onEditClicked: _this4.props.onEditClicked,
              formData: formData[name],
              onChange: _this4.onPropertyChange(name),
              onBlur: onBlur,
              onFocus: onFocus,
              registry: registry,
              disabled: disabled,
              readonly: readonly
            }),
            name: name,
            readonly: readonly,
            disabled: disabled,
            required: required
          };
        }),
        required: required,
        idSchema: idSchema,
        uiSchema: uiSchema,
        schema: schema,
        formData: formData,
        formContext: formContext
      };

      return _react2.default.createElement(Template, templateProps);
    }
  }]);

  return ObjectField;
}(_react.Component);

ObjectField.defaultProps = {
  uiSchema: {},
  formData: {},
  errorSchema: {},
  idSchema: {},
  required: false,
  disabled: false,
  readonly: false
};


if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: _propTypes2.default.object.isRequired,
    uiSchema: _propTypes2.default.object,
    errorSchema: _propTypes2.default.object,
    idSchema: _propTypes2.default.object,
    onChange: _propTypes2.default.func.isRequired,
    onEditClicked: _propTypes2.default.func.isRequired,
    formData: _propTypes2.default.object,
    required: _propTypes2.default.bool,
    disabled: _propTypes2.default.bool,
    readonly: _propTypes2.default.bool,
    registry: _propTypes2.default.shape({
      widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
      fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
      definitions: _propTypes2.default.object.isRequired,
      formContext: _propTypes2.default.object.isRequired
    })
  };
}

exports.default = ObjectField;