import * as React from 'react';
import styled from 'styled-components';
import { TRUMP_ONE, TRUMP_TWO, TRUMP_THREE } from '../assets/loader';

const TRUMPS: any[] = [TRUMP_ONE, TRUMP_TWO, TRUMP_THREE];
const TRUMP_QUOTES: string[] = ['MAKE \'MURICA GR8 AGAIN', 'DONALD.. TRUMPED!', 'LIGHTWEIGHT'];
const TRUMP_ANIM_SECONDS: number = 4;

interface ITrump {
    currentTrump: number;
}

const Trump = styled.div<ITrump>`
    width: 600px;
    height: 432px;
    background: url(${TRUMP_ONE});
    animation: showTrump .3s linear;
    animation-fill-mode: forwards;
    bottom: 0;
    right: 0;
    position: absolute;
    
    @keyframes showTrump {
        from {
            transform: translate3d(100%, 100%, 0) scale(0.2);
        }
        
        to {
            transform: translate3d(0, 0, 0) scale(1);
        }
    } 
`;

const TrumpContainer = styled.div`
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    pointer-events: none;
`;

const TrumpMessage = styled.h1`
    font-size: 3.5rem;
    top: 25%;
    position: absolute;
    width: 100%;
    text-align: center;
    color: darkorange;
    animation: datMessageRiteThurr .6s ease-in forwards, datShadowRiteThurr .1s infinite forwards;
    
    @keyframes datMessageRiteThurr {
        0% {
            transform: translate3d(0,0,0) scale(0);
        }
        
        75% {
            transform: translate3d(0,0,0) scale(1.2);
        }
        
        100% {
            transform: translate3d(0,0,0) scale(1);
        }
    }
    
    @keyframes datShadowRiteThurr {
        from {
            text-shadow: darkred 4px 4px 0, orangered -4px -4px 0;
        }
        
        to {
            text-shadow: darkred -4px -4px 0, orangered 4px 4px 0;
        }
    }      
`;


const TrumpIt = styled.button`
    padding: 12px 16px;
    border: 0;
    outline: 0;
    background: #000;
    color: orange;
    border-radius: 3px;
    font-size: 10px;
    text-transform: uppercase;
    margin-top: 24px;
    cursor: pointer;
    
    &:hover {
        background: orange;
        color: darkred;
    }
    
    &:active {
        transform: scale(0.95);
    }
`;

class Memes extends React.Component<any, any> {
    private readonly TOTAL_TRUMPS: number = TRUMPS.length;

    constructor(props) {
        super(props);

        this.state = {
            showTrump: false,
            currentTrump: 1
        };
    }

    prepareNextTrump = () => {
        const currentTrump = (this.state.currentTrump > (this.TOTAL_TRUMPS - 1)) ? 1 : this.state.currentTrump + 1;

        // Set next trump n' hide the old bastard
        this.setState({
            ...this.state,
            showTrump: false,
            currentTrump
        });
    };

    trump = () => {
        if(!this.state.showTrump) {
            this.setState({ ...this.state, showTrump: true });

            // Hide that trump fuq
            setTimeout(this.prepareNextTrump, TRUMP_ANIM_SECONDS * 1000);
        }
    };

    render() {

        const trumpIndex = this.state.currentTrump - 1;
        const TRUMP_ASSET = TRUMPS[trumpIndex];
        const TRUMP_MESSAGE = TRUMP_QUOTES[trumpIndex];

        return (
            <React.Fragment>
                <TrumpIt onClick={this.trump}>Trump it</TrumpIt>
                <TrumpContainer>
                    {this.state.showTrump && <TrumpMessage>{TRUMP_MESSAGE}</TrumpMessage>}
                    {this.state.showTrump && <Trump style={{ backgroundImage: `url(${TRUMP_ASSET})` }} />}
                </TrumpContainer>
            </React.Fragment>
        );
    }
}

export default Memes;