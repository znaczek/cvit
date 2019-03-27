import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
import {configureStore} from './store/configureStore';
import './app.css';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as enLang from './../../lang/en.json';
import {BootstraDataType} from './types/bootstra-data.type';
import {ApplicationStateInterface} from '../common/interfaces/application-state.interface';
import {Store} from 'redux';
import {StorageService} from './service/storage.service';
import {history} from './history';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        bb: () => void;
    }
}

/**
 * Only for debuging purpose
 */
window.bb = () => history.push('/');

export let store: Store<ApplicationStateInterface>;

const bootstrapApp = (data: BootstraDataType) => {

    store = configureStore({
        templates: {
            list: data[0],
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
            <Root store={store} history={history}/>
        </AppContainer>,
        document.getElementById('root')
    );

    if (module.hot) {
        module.hot.accept('./Root', () => {
            const NextRoot = require('./Root').default;
            render(
                <AppContainer>
                    <NextRoot store={store} history={history}/>
                </AppContainer>,
                document.getElementById('root')
            );
        });
    }

};

Promise.all([
    StorageService.getTemplates(),
]).then((data) => {
    bootstrapApp(data);
});

