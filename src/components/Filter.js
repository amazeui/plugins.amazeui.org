import React, {
  Component,
  PropTypes,
} from 'react';

export default class Filter extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  render() {
    const {
      value,
      onChange,
    } = this.props;

    return (
      <div>
        <h1>{value}</h1>
        <p>
          <input
            onChange={e => onChange(e.target.value)}
            value={value}
          />
        </p>
      </div>
    );
  }
}
