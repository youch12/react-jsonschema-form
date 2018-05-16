import React, { Component } from "react";
import PropTypes from "prop-types";
export const uuidv4 = require("uuid/v4");

import {
  orderProperties,
  retrieveSchema,
  getDefaultRegistry,
} from "../../utils";

class DefaultObjectFieldTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  clickedPanel = evt => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { DescriptionField } = this.props;
    const objectTemplate = (
      <fieldset>
        {this.props.description && (
          <DescriptionField
            id={`${this.props.idSchema.$id}__description`}
            description={this.props.description}
            formContext={this.props.formContext}
          />
        )}
        {this.props.properties.map(prop => prop.content)}
      </fieldset>
    );
    const objectToRender =
      Object.keys(this.props.schema.properties).length > 1 ? (
        <div className="panel-group">
          <div className="panel panel-default">
            <div
              className="panel-heading"
              onClick={evt => this.clickedPanel(evt)}>
              <h4 className="panel-title">
                {this.props.uiSchema["ui:title"] || this.props.title}
              </h4>
            </div>
            <div
              className={`panel-collapse collapse${
                this.state.isOpen ? " in" : ""
              }`}>
              <div className="panel-body">{objectTemplate}</div>
            </div>
          </div>
        </div>
      ) : (
        objectTemplate
      );
    return objectToRender;
  }
}

class ObjectField extends Component {
  static defaultProps = {
    uiSchema: {},
    formData: {},
    errorSchema: {},
    idSchema: {},
    required: false,
    disabled: false,
    readonly: false,
  };

  isRequired(name) {
    const schema = this.props.schema;
    return (
      Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
    );
  }

  onPropertyChange = name => {
    return (value, errorSchema) => {
      const newFormData = { ...this.props.formData, [name]: value };
      this.props.onChange(
        newFormData,
        errorSchema &&
          this.props.errorSchema && {
            ...this.props.errorSchema,
            [name]: errorSchema,
          }
      );
    };
  };

  render() {
    const {
      uiSchema,
      formData,
      errorSchema,
      idSchema,
      name,
      required,
      disabled,
      readonly,
      idPrefix,
      onBlur,
      onFocus,
      registry = getDefaultRegistry(),
    } = this.props;
    const { definitions, fields, formContext } = registry;
    const { SchemaField, TitleField, DescriptionField } = fields;
    const schema = retrieveSchema(this.props.schema, definitions, formData);
    const title = schema.title === undefined ? name : schema.title;
    const description = uiSchema["ui:description"] || schema.description;
    let orderedProperties;

    try {
      const properties = Object.keys(schema.properties);
      orderedProperties = orderProperties(properties, uiSchema["ui:order"]);
    } catch (err) {
      return (
        <div>
          <p className="config-error" style={{ color: "red" }}>
            Invalid {name || "root"} object field configuration:
            <em>{err.message}</em>.
          </p>
          <pre>{JSON.stringify(schema)}</pre>
        </div>
      );
    }

    const Template = registry.ObjectFieldTemplate || DefaultObjectFieldTemplate;

    const templateProps = {
      title: uiSchema["ui:title"] || title,
      description,
      TitleField,
      DescriptionField,
      properties: orderedProperties.map(name => {
        return {
          content: (
            <SchemaField
              key={name}
              name={name}
              required={this.isRequired(name)}
              schema={schema.properties[name]}
              uiSchema={uiSchema[name]}
              errorSchema={errorSchema[name]}
              idSchema={idSchema[name]}
              idPrefix={idPrefix}
              formData={formData[name]}
              onChange={this.onPropertyChange(name)}
              onBlur={onBlur}
              onFocus={onFocus}
              registry={registry}
              disabled={disabled}
              readonly={readonly}
            />
          ),
          name,
          readonly,
          disabled,
          required,
        };
      }),
      required,
      idSchema,
      uiSchema,
      schema,
      formData,
      formContext,
    };

    return <Template {...templateProps} />;
  }
}

if (process.env.NODE_ENV !== "production") {
  ObjectField.propTypes = {
    schema: PropTypes.object.isRequired,
    uiSchema: PropTypes.object,
    errorSchema: PropTypes.object,
    idSchema: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    formData: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    registry: PropTypes.shape({
      widgets: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.func, PropTypes.object])
      ).isRequired,
      fields: PropTypes.objectOf(PropTypes.func).isRequired,
      definitions: PropTypes.object.isRequired,
      formContext: PropTypes.object.isRequired,
    }),
  };
}

export default ObjectField;
