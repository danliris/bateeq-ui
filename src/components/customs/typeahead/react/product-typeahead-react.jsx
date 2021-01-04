import React from 'react';
import TypeaheadReact from '../../../form/basic/react/typeahead-react.jsx';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"

const resource = '/storages';

const empty = {
    name: ''
}

'use strict';

export default class ProductTypeaheadReact extends TypeaheadReact {
    constructor(props) {
        super(props);
    }

    init(props) {
      console.log('ProductTypeaheadReact props',props)
        var options = Object.assign({}, ProductTypeaheadReact.defaultProps.options, props.options);
        var initialValue = Object.assign({}, empty, props.value);
        initialValue.toString = function () {
            return `${this.name}`;
        };
        this.setState({ value: initialValue, label: initialValue.toString(), options: options, suggestions: [initialValue] });
    }
}

ProductTypeaheadReact.propTypes = {
    options: React.PropTypes.shape({
        readOnly: React.PropTypes.bool,
        suggestions: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.func
        ])
    })
};

ProductTypeaheadReact.defaultProps = {
    options: {
        readOnly: false,
        suggestions:
        function (keyword, filter) {
            var config = Container.instance.get(Config);
            var endpoint = config.getEndpoint("master");

            return endpoint.find(resource, { keyword: keyword, filter: JSON.stringify(filter) })
                .then(results => {
                    return results.data.map(currency => {
                        currency.toString = function () {
                            return `${this.name}`;
                        }
                        return currency;
                    });
                });
        }
    }
};
