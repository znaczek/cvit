import * as React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import EditorPage from './containers/EditorPage';
import App from './App';
import ProjectPage from './containers/ProjectPage';
import {PreviewPage} from './containers/PreviewPage';

interface Props {
    store: Store;
    preview: string;
}

export default class Root extends React.Component<Props> {
    render() {
        const {store, preview} = this.props;
        console.log('AAA', preview);
        return (
            <Provider store={store}>
                {
                    preview ? (
                        <PreviewPage preview={preview}/>
                    ) : (
                        <App>
                            <ProjectPage/>
                            <EditorPage/>
                        </App>
                    )
                }
            </Provider>
        );
    }
}
