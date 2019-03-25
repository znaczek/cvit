import * as React from 'react';
import Project from '../components/project/Project';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {Template} from '../models/template.model';
import {TemplatesSelectors} from '../store/selectors/templates.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {OptionModel} from '../../common/model/options-model';
import {Popup} from '../components/common/Popup/Popup';
import {UiSelectors} from '../store/selectors/ui.selectors';
import {H1} from '../components/common/styled/H1';
import {T} from '../components/T';
import {UiActions} from '../store/actions/UiActions';

interface Props {
    templates: OptionModel<Template>[];
    newProjectPopupVisible: boolean;
    create: (templateName: string, directory: string) => void;
    close: () => void;
}

export class ProjectPage extends React.Component<Props> {
    props: Props;

    render() {
        const {templates, create, newProjectPopupVisible, close} = this.props;
        return (
            <Popup visible={newProjectPopupVisible}>
                <Popup.Header handleClose={close}>
                    <H1><T>PROJECT.NEW.HEADER</T></H1>
                </Popup.Header>
                <Project create={create} templates={templates}/>
            </Popup>
        );
    }
}

const mapStateToProps = (state: ApplicationStateInterface) => ({
    templates: TemplatesSelectors.getList(state),
    newProjectPopupVisible: UiSelectors.getNewProjectPopupVisible(state),

});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    create: (templateName: string, directory: string) => dispatch(ProjectActions.createProject()),
    close: () => dispatch(UiActions.closeCreateProjectPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage);
