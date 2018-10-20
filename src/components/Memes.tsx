import * as React from 'react';
import { Howl, Howler } from 'howler';
import styled from 'styled-components';
import {
    TRUMP_ONE,
    TRUMP_TWO,
    TRUMP_THREE,
    TRUMP_MAGA,
    TRUMP_FIRED,
    TRUMP_BEATCHINA,
    BULLSEYE,
    JACKPOT, JACKPOT_SOUND
} from '../assets/loader';

const TRUMPS: any[] = [TRUMP_ONE, TRUMP_TWO, TRUMP_THREE];
const TRUMP_QUOTES: string[] = [
    'MAKE \'MURICA GR8 AGAIN',
    'YOU SIR ARE FIRED!',
    'LIGHTWEIGHT'
];
const TRUMP_SOUNDS: any[] = [
    TRUMP_MAGA,
    TRUMP_FIRED,
    TRUMP_BEATCHINA
].map(sound => (new Howl(({ src: sound }))));
const TRUMP_ANIM_SECONDS: number = 4;

const BULLS_I_MESSAGE: string = "BULLS 👁";

const JACKPOT_MESSAGE: string = "JJJJJJJACKPOT";

/** Used for animations that appear during game */
const INGAME_ANIM_SECONDS: number = 2;

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

/**
 * TODO - Split animations into more components
 */
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
    animation: datMessageRiteThurr .6s ease-in forwards, datShadeRiteTrump .1s infinite forwards;
    
    @keyframes datShadeRiteTrump {
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
    animation: datMessageRiteThurr .6s ease-in forwards, datBullseyeShade .1s infinite forwards;
    
    @keyframes datBullseyeShade {
        from {
            text-shadow: red 4px 4px 0, darkred -4px -4px 0;
        }
        
        to {
            text-shadow: darkred -4px -4px 0, red 4px 4px 0;
        }
    }      
`;

/**
 * Create a Jackpot Randomizer like the TRUMPS
 */
const Jackpot = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url(${JACKPOT}) repeat;
    animation: fadeInJackpot .3s linear;
    
    @keyframes fadeInJackpot {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;

const JackpotMessage = styled(BigAssMessage)`
    color: yellow;
    animation: datMessageRiteThurr .6s ease-in forwards, datJackpotRiteThurr .1s infinite forwards;
    
    @keyframes datJackpotRiteThurr {
        from {
            text-shadow: darkgreen 4px 4px 0, limegreen -4px -4px 0;
        }
        
        to {
            text-shadow: darkgreen -4px -4px 0, limegreen 4px 4px 0;
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
    margin: 0 12px;
    
    &:hover {
        background: red;
    }
`;

const JackpotIt = styled(TrumpIt)`
    color: darkgreen;
    
    &:hover {
        background: darkgreen;
        color: #fff;
    }
`;

interface IMemesState {
    showTrump: boolean;
    trumpMessage: string;
    showBullseye: boolean;
    showJackpot: boolean;
}

class Memes extends React.Component<any, IMemesState> {
    private readonly jackpotSound: Howl;

    constructor(props) {
        super(props);

        this.state = {
            showTrump: false,
            trumpMessage: TRUMP_QUOTES[0],
            showBullseye: false,
            showJackpot: false
        };

        //
        this.jackpotSound = new Howl({
            src: JACKPOT_SOUND
        });
    }

    /**
     * The Donald Trump graphic can be different every time, so it is set in the render function.
     * This Trump Index set here matches the sound and text together and finally plays the sound
     * after the state has been updated.
     */
    trump = () => {
        if(!this.state.showTrump) {
            const trumpIndex = Math.floor(Math.random() * TRUMPS.length);

            this.setState({
                ...this.state,
                showTrump: true,
                trumpMessage: TRUMP_QUOTES[trumpIndex]
            }, () => {
                TRUMP_SOUNDS[trumpIndex].play();
            });

            // Hide that trump fuq
            setTimeout( () => {
                this.setState({ ...this.state, showTrump: false });
            },TRUMP_ANIM_SECONDS * 1000);
        }
    };

    bullseye = () => {
        if(!this.state.showBullseye) {
            this.setState({ ...this.state, showBullseye: true });

            // Hide that trump fuq
            setTimeout(() => {
                this.setState({ ...this.state, showBullseye: false });
            },INGAME_ANIM_SECONDS * 1000);
        }
    };

    jackpot = () => {
        if(!this.state.showJackpot) {
            this.setState({ ...this.state, showJackpot: true });

            this.jackpotSound.play();

            // Hide that trump fuq
            setTimeout(() => {
                this.setState({ ...this.state, showJackpot: false });
            },INGAME_ANIM_SECONDS * 1000);
        }
    };

    render() {
        const TRUMP_ASSET = TRUMPS[Math.floor(Math.random() * TRUMPS.length)];

        return (
            <React.Fragment>
                <div className={'dev-buttons-container'}>
                    <TrumpIt onClick={this.trump}>Trump it</TrumpIt>
                    <BullsIt onClick={this.bullseye}>Bullseye</BullsIt>
                    <JackpotIt onClick={this.jackpot}>Jackpot</JackpotIt>
                </div>
                <GameOverlayContainer>
                    {this.state.showTrump && (
                        <>
                            <TrumpMessage>{this.state.trumpMessage}</TrumpMessage>
                            <Trump style={{ backgroundImage: `url(${TRUMP_ASSET})` }} />
                        </>
                    )}
                    {this.state.showBullseye && (
                        <>
                            <BullseyeMessage>{BULLS_I_MESSAGE}</BullseyeMessage>
                            <Bullseye />
                        </>
                    )}
                    {this.state.showJackpot && (
                        <>
                            <JackpotMessage>{JACKPOT_MESSAGE}</JackpotMessage>
                            <Jackpot />
                        </>
                    )}
                </GameOverlayContainer>
            </React.Fragment>
        );
    }
}

export default Memes;