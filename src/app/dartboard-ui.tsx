import * as React from 'react';
import styled from 'styled-components';
import Memes from '../components/Memes';

const DartboardInterface = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

interface IDartboardUIProps {

}

class DartboardUI extends React.Component<IDartboardUIProps> {

    render() {
        return (
            <React.Fragment>
                <DartboardInterface>
                    <p>Insert UI..</p>
                    <Memes />
                </DartboardInterface>
            </React.Fragment>
        );
    }
}

export default DartboardUI;