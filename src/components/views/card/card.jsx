import React from 'react';
import classNames from 'classnames';
import DefaultProps from '../../defaultProps';

export default class Card extends React.PureComponent {
    static propTypes = {
        ...DefaultProps.propTypes,
        centered: React.PropTypes.bool,
        col: React.PropTypes.string,
        color: React.PropTypes.string,
        doubling: React.PropTypes.string,
        fluid: React.PropTypes.bool,
        link: React.PropTypes.bool,
        onClick: React.PropTypes.func
    };

    static contextTypes = {
        isCardChild: React.PropTypes.bool
    };

    static childContextTypes = {
        isCardChild: React.PropTypes.bool
    };

    static defaultProps = {
        ...DefaultProps.defaultProps
    };

    getChildContext() {
        return {
            isCardChild: true
        }
    }

    render() {
        /* eslint-disable no-use-before-define */
        let { component, defaultClasses, centered, col, color, doubling, fluid, link, ...other } = this.props;
        /* eslint-enable no-use-before-define */

        other.className = classNames(this.props.className, this.getClasses());

        return React.createElement(
            this.props.component,
            other,
            this.props.children
        );
    }

    getClasses() {
        let classes = {
            // default
            ui: this.props.defaultClasses  && !this.context.isChildCard,


            // component
            card: this.props.defaultClasses,

            // variations
            centered: this.props.centered,
            doubling: this.props.doubling,
            color: this.props.color,
            fluid: this.props.fluid,
            link: this.props.link || this.props.onClick
        };

        classes[this.props.color] = !!this.props.color;
        classes[this.props.col] = !!this.props.col;
        classes[this.props.doubling] = !!this.props.doubling;

        return classes;
    }
}
