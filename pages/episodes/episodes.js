import React, { PureComponent } from 'react';
import { Placeholder } from 'react-suspense-polyfill';

import Loading from '../../components/loading';
import withEpisodes from './withEpisodes';
import Episode from './episode';

class Episodes extends PureComponent {
  render() {
    return (
      <div className="episodes">
        <Placeholder fallback={<Loading />}>
          {this.props.episodes.map(e => (
            <Episode key={e.number} {...e} />
          ))}
        </Placeholder>
      </div>
    );
  }
}

export default withEpisodes(Episodes);
