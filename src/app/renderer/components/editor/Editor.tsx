import * as React from 'react';
import {EditorTab} from './EditorTab';
import {ProjectService} from '../../service/project-service';


interface Props {
    content: string,
}

export class Editor extends React.Component<Props> {
    public props: Props;

    public render() {
        const {content} = this.props;
        const html = ProjectService.getHTML(content);
        const styles = ProjectService.getStyles(content);

        return (
           <div>
               <EditorTab
                   value={html}
                   mode="html"
                   id="content"
               />
                <EditorTab
                    value={styles}
                    mode="css"
                    id="styles"
                />
           </div>
        );
    }
}
