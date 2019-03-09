import * as React from 'react';
import Home from '../components/home/Home';

type Props = {};

export default class HomePage extends React.Component<Props> {
  props: Props;

  render() {
    return <Home />;
  }
}
