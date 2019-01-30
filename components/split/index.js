import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import classnames from 'classnames';
import './split.scss';

export default class Split extends Component {
  state = { active: null, lastActive: null };

  activateLeft = () => this.setActive('left');
  activateRight = () => this.setActive('right');
  deactivate = () => this.setActive(null);
  setActive = debounce(active => {
    const { active: lastActive } = this.state;
    if (active === lastActive) return;
    this.setState({ active, lastActive });
  }, 10);

  renderHalf(text, description, index) {
    const { active, lastActive } = this.state;
    const side = index ? 'right' : 'left';

    const halfClassName = classnames('split__half', `split__half--${side}`, {
      'split__half--active': active === side,
      'split__half--last-active': lastActive === side
    });

    const onMouseEnter = index ? this.activateRight : this.activateLeft;

    return (
      <div className={halfClassName} onMouseLeave={this.deactivate}>
        <div className="split__background" aria-hidden="true" />
        <div className="split__content">
          <div className="split__description">{description}</div>
          <button className="split__button">{text}</button>
          <button className="split__action" onMouseEnter={onMouseEnter}>
            <span className="split__text">{text}</span>
          </button>
        </div>
      </div>
    );
  }

  render() {
    const { active } = this.state;
    const className = classnames('split', {
      [`split--${active}`]: active
    });

    return (
      <div className="split__wrapper">
        <div className={className} ref={this.setWrapperRef}>
          {this.renderHalf('x')}
          {this.renderHalf('y', 1)}
        </div>
      </div>
    );
  }
}
