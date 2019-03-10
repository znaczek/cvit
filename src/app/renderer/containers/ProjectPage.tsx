import * as React from 'react';
import Project from '../components/project/Project';

type Props = {};

export default class ProjectPage extends React.Component<Props> {
    props: Props;

    render() {
        return <Project/>;
    }
}
