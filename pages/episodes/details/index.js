import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import getSlug from 'speakingurl';

class Details extends PureComponent {
  render() {
    const { episodes, router } = this.props;
    const episode = episodes.find(e => e.number == router.query.number);
    if (!episode) return null;

    return (
      <div className="episodes__details">
        <div>{episode.title}</div>
      </div>
    );
  }
}

export default withRouter(Details);
