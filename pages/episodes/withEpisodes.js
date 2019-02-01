import React, { PureComponent } from 'react';

const withEpisodes = Component => {
  return class WithEpisodes extends PureComponent {
    state = { episodes: [] };

    componentDidMount() {
      fetch('/api/episodes')
        .then(res => res.json())
        .then(episodes => this.setState({ episodes }));
    }

    render() {
      const { episodes } = this.state;
      return <Component {...this.props} episodes={episodes} />;
    }
  };
};

export default withEpisodes;
