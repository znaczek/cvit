import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';
import {configureStore} from './store/configureStore';
import './app.css';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as enLang from './../../lang/en.json';
import {ApplicationStateInterface} from '../common/interfaces/application-state.interface';
import {Store} from 'redux';
import {StorageService} from '../common/services/storage.service';
import {ProjectService} from '../common/services/project.service';
import {Template} from './models/template.model';
import {LocalStorage} from '../common/services/local-storage.service';
import {ProjectStateModel} from './models/project-state.model';
import {PrintConfigStateInterface} from './interfaces/state/print-config-state.interface';
import {ProjectDataInterface} from './interfaces/state/project-data.interface';
import {PrintConfigModel} from './models/print-config.model';
import {PrintConfigService} from '../common/services/print-config.service';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
        __APP_DOC_PREVIEW: string;
    }
}

export let store: Store<ApplicationStateInterface>;

const bootstrapApp = (templates: Template[],
                      baseTemplate: string,
                      directory: string,
                      project: ProjectDataInterface,
                      printConfig: PrintConfigStateInterface) => {
    store = configureStore({
        templates: {
            list: templates,
            base: baseTemplate,
        },
        project: new ProjectStateModel({
            directory,
            ...project
        }),
        printConfig: new PrintConfigModel(printConfig)
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

const lastDirectory = LocalStorage.get('lastDirectory');
bootstrapApp(
    StorageService.getTemplates(),
    StorageService.getBaseTemplate(),
    lastDirectory,
    ProjectService.unpack(lastDirectory),
    PrintConfigService.getPrintConfig(lastDirectory),
);
