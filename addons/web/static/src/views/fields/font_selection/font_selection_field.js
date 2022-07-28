/** @odoo-module **/

import { registry } from "@web/core/registry";
import { _lt } from "@web/core/l10n/translation";
import { standardFieldProps } from "../standard_field_props";
import { formatSelection } from "../formatters";

const { Component } = owl;

export class FontSelectionField extends Component {
    get options() {
        const options = this.props.record.fields[this.props.name].selection.filter(
            (option) => option[0] !== false && option[1] !== ""
        );
        if (!this.isRequired) {
            options.unshift([false, this.props.placeholder || ""]);
        }
        return options;
    }
    get isRequired() {
        return this.props.record.isRequired(this.props.name);
    }
    get string() {
        return formatSelection(this.props.value, { selection: this.options });
    }

    stringify(value) {
        return JSON.stringify(value);
    }

    /**
     * @param {Event} ev
     */
    onChange(ev) {
        const value = JSON.parse(ev.target.value);
        this.props.update(value);
    }
}

FontSelectionField.template = "web.FontSelectionField";
FontSelectionField.props = {
    ...standardFieldProps,
    placeholder: { type: String, optional: true },
};

FontSelectionField.displayName = _lt("Font Selection");
FontSelectionField.supportedTypes = ["selection"];

FontSelectionField.extractProps = ({ attrs }) => {
    return {
        placeholder: attrs.placeholder,
    };
};

registry.category("fields").add("font", FontSelectionField);
