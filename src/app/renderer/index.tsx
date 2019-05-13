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
import {ProjectService} from './service/project.service';
import {Template} from './models/template.model';
import {ProjectsStateInterface} from './interfaces/state/projects-state.interface';
import {ProjectModel} from './models/project.model';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        __APP_DOC_PREVIEW: string;
    }
}

export let store: Store<ApplicationStateInterface>;

const bootstrapApp = (templates: Template[], baseTemplate: string, initialProjectState: ProjectsStateInterface) => {
    store = configureStore({
        templates: {
            list: templates,
            base: baseTemplate,
        },
        project: new ProjectModel(initialProjectState),
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

bootstrapApp(StorageService.getTemplates(), StorageService.getBaseTemplate(), ProjectService.getInitialProjectState());
