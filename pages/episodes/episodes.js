import React, { PureComponent } from 'react';
import { Placeholder } from 'react-suspense-polyfill';

import Loading from '../../components/loading';
import withEpisodes from './withEpisodes';

class Episodes extends PureComponent {
  render() {
    return (
      <div className="episodes">
        <Placeholder fallback={<Loading />}>{this.props.episodes}</Placeholder>
      </div>
    );
  }
}

export default withEpisodes(Episodes);
