import * as React from 'react';
import {Provider} from 'react-redux';
import {Store} from 'redux';
import EditorPage from './containers/EditorPage';
import App from './App';
import NewProjectPopup from './components/project/NewProjectPopup';
import PreviewPage from './containers/PreviewPage';

interface Props {
    store: Store;
    preview: string;
}

export default class Root extends React.Component<Props> {
    render() {
        const {store, preview} = this.props;
        return (
            <Provider store={store}>
                {
                    preview ? (
                        <PreviewPage/>
                    ) : (
                        <App>
                            <NewProjectPopup/>
                            <EditorPage/>
                        </App>
                    )
                }
            </Provider>
        );
    }
}
