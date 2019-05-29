import * as React from 'react';
import NewProject from '../components/project/NewProject';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {TemplatesSelectors} from '../store/selectors/templates.selectors';
import {ProjectActions} from '../store/actions/project.actions';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {OptionModel} from '../../common/model/options-model';
import {Popup} from '../components/common/Popup/Popup';
import {UiSelectors} from '../store/selectors/ui.selectors';
import {T} from '../components/T';
import {UiActions} from '../store/actions/ui.actions';
import {CreateProjectInterface} from '../interfaces/create-project.interface';
import {H1} from '../components/common/html-styled/Headers';
import {TemplateInterface} from '../../common/interfaces/template.interface';

interface Props {
    templates: OptionModel<TemplateInterface>[];
    newProjectPopupVisible: boolean;
    createProject: (options: CreateProjectInterface) => void;
    close: () => void;
}

export class NewProjectPopup extends React.Component<Props> {
    props: Props;

    render() {
        const {templates, createProject, newProjectPopupVisible, close} = this.props;
        return (
            <Popup visible={newProjectPopupVisible}>
                <Popup.Header handleClose={close}>
                    <H1><T>NEW_PROJECT.NEW.HEADER</T></H1>
                </Popup.Header>
                <NewProject
                    createProject={createProject}
                    templates={templates}
                    visible={newProjectPopupVisible}
                />
            </Popup>
        );
    }
}

const mapStateToProps = (state: ApplicationStateInterface) => ({
    templates: TemplatesSelectors.getList(state),
    newProjectPopupVisible: UiSelectors.getNewProjectPopupVisible(state),

});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
    createProject: (options: CreateProjectInterface) => dispatch(ProjectActions.createProject(options)),
    close: () => dispatch(UiActions.closeCreateProjectPopup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewProjectPopup);
