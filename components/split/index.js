import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import './split.scss';

export default class Split extends PureComponent {
  state = { active: 'left' };

  componentWillReceiveProps = nextProps => {
    if (nextProps.number !== this.props.number) {
      if (nextProps.number > this.props.number) this.activateRight();
      else this.activateLeft();
    }
  };

  activateLeft = () => this.setActive('left');
  activateRight = () => this.setActive('right');
  deactivate = () => this.setActive(null);
  setActive = debounce(active => {
    const { active: prevActive } = this.state;
    if (active !== prevActive) this.setState({ active, animate: false });
    setTimeout(() => this.setState({ animate: true }), 100);
  }, 10);

  renderHalf(header, index) {
    return (
      <div className="split__half" key={index}>
        <div className="split__content">{header}</div>
      </div>
    );
  }

  render() {
    const { headers } = this.props;
    const { active, animate } = this.state;
    const className = classnames('split', {
      [`split--${active}`]: active,
      'split--animate': animate
    });

    return <div className={className}>{headers.map(this.renderHalf)}</div>;
  }
}
