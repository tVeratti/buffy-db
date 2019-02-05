import React, { PureComponent } from 'react';
import { Placeholder } from 'react-suspense-polyfill';

import Loading from '../../components/loading';
import withEpisodes from './withEpisodes';
import Episode from './episode';

class Episodes extends PureComponent {
  render() {
    const { episodes } = this.props;

    return (
      <div className="episodes">
        <Placeholder fallback={<Loading />}>
          <ul className="episodes__list">
            {episodes.map(e => (
              <Episode key={e.number} {...e} />
            ))}
          </ul>
        </Placeholder>
      </div>
    );
  }
}

export default withEpisodes(Episodes);
