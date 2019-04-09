import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
import {configureStore} from './store/configureStore';
import './app.css';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as enLang from './../../lang/en.json';
import {BootstrapDataType} from './types/bootstra-data.type';
import {ApplicationStateInterface} from '../common/interfaces/application-state.interface';
import {Store} from 'redux';
import {StorageService} from './service/storage.service';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        __APP_DOC_PREVIEW: string;
    }
}

export let store: Store<ApplicationStateInterface>;

const bootstrapApp = (data: BootstrapDataType) => {
    store = configureStore({
        templates: {
            list: data[0],
            base: data[1],
        },
        project: {
            directory: data[2] ? data[2].directory : null,
            html: data[2] ? data[2].html : null,
            styles: data[2] ? data[2].styles : null,
        }
    });


    i18n.use(initReactI18next).init({
        lng: 'en',
        resources: {
            en: {
                translation: enLang,
            }
        },
    });​

    render(
        <AppContainer>
            <Root store={store} preview={window.__APP_DOC_PREVIEW}/>
        </AppContainer>,
        document.getElementById('root')
    );

    if (module.hot) {
        module.hot.accept('./Root', () => {
            const NextRoot = require('./Root').default;
            render(
                <AppContainer>
                    <NextRoot store={store} preview={window.__APP_DOC_PREVIEW}/>
                </AppContainer>,
                document.getElementById('root')
            );
        });
    }

};

Promise.all([
    StorageService.getTemplates(),
    StorageService.getBaseTemplate(),
    StorageService.getInitialProjectState(),
]).then((data) => {
    bootstrapApp(data);
});


