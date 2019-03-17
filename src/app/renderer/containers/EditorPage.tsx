import * as React from 'react';
import {connect} from 'react-redux';
import {ApplicationStateInterface} from '../../common/interfaces/application-state.interface';
import {AppThunkDispatchType} from '../../common/types/app-thunk-dispatch.type';
import {Editor} from '../components/editor/Editor';

interface Props {
    someProps: any,
}

export class EditorPage extends React.Component<Props> {
    props: Props;

    render() {
        return <Editor/>;
    }
}

const mapStateToProps = (state: ApplicationStateInterface) => ({
});

const mapDispatchToProps = (dispatch: AppThunkDispatchType) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
