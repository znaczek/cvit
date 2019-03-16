import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
import {configureStore, history} from './store/configureStore';
import './app.css';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as enLang from './../../lang/en.json';
import {TemplateService} from './service/template.service';
import {BootstraDataType} from './types/bootstra-data.type';

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

const bootstrapApp = (data: BootstraDataType) => {

    const store = configureStore({
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
    TemplateService.getTemplates(),
]).then((data) => {
    bootstrapApp(data);
});


