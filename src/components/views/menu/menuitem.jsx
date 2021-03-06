import React from 'react';
import classNames from 'classnames';
import DefaultProps from '../../defaultProps';

/**
 * Menu/Dropdown item
 */
export default class MenuItem extends React.PureComponent {
    static propTypes = {
        ...DefaultProps.propTypes,
        /**
         * Is item active
         */
        active: React.PropTypes.bool,
        /**
         * Is item disabled
         */
        disabled: React.PropTypes.bool,
        /**
         * Item color
         */
        color: React.PropTypes.string,
        /**
         * Item value (used in controlled menu)
         */
        menuValue: React.PropTypes.oneOfType([
            React.PropTypes.number,
            React.PropTypes.string
        ])
    };
    static defaultProps = {
        ...DefaultProps.defaultProps
    };

    onClick = (event) => {
        event.preventDefault();
        const { onClick, menuValue, disabled } = this.props;
        if (onClick && !disabled) onClick(menuValue, event);
    };

    render() {
        const { component, children, defaultClasses, active, color, disabled, menuValue, ...other } = this.props;
        other.className = classNames(other.className, this.getClasses());
        const Component = component;
        return (
            <Component {...other}
                       onClick={this.onClick}
                       data-value={menuValue}
            >
                {children}
            </Component>
        )
    }

    getClasses() {
        const classes = {
            // variations
            active: this.props.active,
            disabled: this.props.disabled,
            link: this.props.defaultClasses,
            // component
            item: this.props.defaultClasses
        };
        classes[this.props.color] = !!this.props.color;
        return classes;
    }
}
