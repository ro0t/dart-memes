import * as React from 'react';
import styled from 'styled-components';
import { TRUMP_ONE, TRUMP_TWO, TRUMP_THREE, BULLSEYE } from '../assets/loader';

const TRUMPS: any[] = [TRUMP_ONE, TRUMP_TWO, TRUMP_THREE];
const TRUMP_QUOTES: string[] = ['MAKE \'MURICA GR8 AGAIN', 'DONALD.. TRUMPED!', 'LIGHTWEIGHT'];
const TRUMP_ANIM_SECONDS: number = 4;

const BULLS_I_MESSAGE: string = "BULLS 👁";
const BULLS_I_ANIM_SECONDS: number = 2;

/** The overlay that all animations appear in and such. */
const GameOverlayContainer = styled.div`
    position: absolute;
    top:0;
    right:0;
    left:0;
    bottom:0;
    pointer-events: none;
    transform: translate3d(0,0,0);
    
    /** Shared animation */
    @keyframes datMessageRiteThurr {
        0% { transform: translate3d(0,0,0) scale(0); }
        75% { transform: translate3d(0,0,0) scale(1.2); }
        100% { transform: translate3d(0,0,0) scale(1); }
    }
`;

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
        from { transform: translate3d(100%, 100%, 0) scale(0.2); }
        to { transform: translate3d(0, 0, 0) scale(1); }
    } 
`;

const BigAssMessage = styled.h1`
    font-size: 3.5rem;
    top: 25%;
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 1000;
`;

const TrumpMessage = styled(BigAssMessage)`
    color: darkorange;
    animation: datMessageRiteThurr .6s ease-in forwards, datShadowRiteThurr .1s infinite forwards;
    
    @keyframes datShadowRiteThurr {
        from {
            text-shadow: darkred 4px 4px 0, orangered -4px -4px 0;
        }
        
        to {
            text-shadow: darkred -4px -4px 0, orangered 4px 4px 0;
        }
    }      
`;

const Bullseye = styled.div`
    --bullseye-size: 200px;
    background: url(${BULLSEYE}) center center no-repeat;
    background-size: 100%;
    width: var(--bullseye-size);
    height: var(--bullseye-size);
    position: absolute;
    top: 50%;
    left: 50%;
    animation: pulseBullsEye .2s forwards infinite;
    z-index: 900;
    
    @keyframes pulseBullsEye {
        0% { transform: translate3d(-50%, -50%, 0) scale(1); }
        50% { transform: translate3d(-50%, -50%, 0) scale(1.25); }
        100% { transform: translate3d(-50%, -50%, 0) scale(1); }
    }
`;

const BullseyeMessage = styled(BigAssMessage)`
    color: #fff;
    animation: datMessageRiteThurr .6s ease-in forwards, datShadowRiteThurr .1s infinite forwards;
    
    @keyframes datShadowRiteThurr {
        from {
            text-shadow: red 4px 4px 0, darkred -4px -4px 0;
        }
        
        to {
            text-shadow: darkred -4px -4px 0, red 4px 4px 0;
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

const BullsIt = styled(TrumpIt)`
    color: red;
    margin-left: 12px;
    
    &:hover {
        background: red;
    }
`;

class Memes extends React.Component<any, any> {
    private readonly TOTAL_TRUMPS: number = TRUMPS.length;

    constructor(props) {
        super(props);

        this.state = {
            showTrump: false,
            showBullseye: false,
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

    bullseye = () => {
        if(!this.state.showBullseye) {
            this.setState({ ...this.state, showBullseye: true });

            // Hide that trump fuq
            setTimeout(() => {
                this.setState({ ...this.state, showBullseye: false });
            }, BULLS_I_ANIM_SECONDS * 1000);
        }
    };

    render() {
        const trumpIndex = this.state.currentTrump - 1;
        const TRUMP_ASSET = TRUMPS[trumpIndex];
        const TRUMP_MESSAGE = TRUMP_QUOTES[trumpIndex];

        return (
            <React.Fragment>
                <div className={'dev-buttons-container'}>
                    <TrumpIt onClick={this.trump}>Trump it</TrumpIt>
                    <BullsIt onClick={this.bullseye}>Bullseye</BullsIt>
                </div>
                <GameOverlayContainer>
                    {this.state.showTrump && <TrumpMessage>{TRUMP_MESSAGE}</TrumpMessage>}
                    {this.state.showTrump && <Trump style={{ backgroundImage: `url(${TRUMP_ASSET})` }} />}
                    {this.state.showBullseye && <BullseyeMessage>{BULLS_I_MESSAGE}</BullseyeMessage>}
                    {this.state.showBullseye && <Bullseye />}
                </GameOverlayContainer>
            </React.Fragment>
        );
    }
}

export default Memes;