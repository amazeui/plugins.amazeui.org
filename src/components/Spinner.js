import React, {
  Component,
  PropTypes,
} from 'react';

class Spinner extends Component {
  static propTypes = {
    amSize: PropTypes.oneOf([
      'xs',
      'sm',
      'lg',
      'xl',
      'xxl',
      'xxxl',
    ]),
  };

  render() {
    return (
      <span
        className={`am-icon-spinner am-icon-spin am-text-${this.props.amSize}`}
      >
        {this.props.children}
      </span>
    );
  }
}

export default Spinner;
