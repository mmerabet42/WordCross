import styled from 'styled-components';

export const GraphsContainer = styled.div`
    flex: 1 1 auto;
    justify-self: flex-end;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;

    overflow: hidden;
    overflow-x: scroll;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
        overflow: hidden;
        overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        height: 5px;

        @media only screen and (max-width: 600px) {
            height: 0px;
            width: 5px;
        }
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--dark2);
        border-radius: 10px;
    }

    .see-next {
        display: flex;
        justify-content: center;
        align-items: center;

        padding-left: 10px;
        padding-right: 10px;
        margin: 10px;
        font-size: 60px;

        color: var(--blue);
        height: calc(100% - 20px);

        transition: all 0.2s linear;

        :hover {
            transform: scale(1.2);
        }

        :active {
            transform: scale(0.9);
        }
    }
`;

export const Graph = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    overflow: hidden;

    margin: 10px;
    padding: 10px;
    border-radius: 20px;

    @media only screen and (min-width: 600px) {
        min-width: ${props => `${(props.widthC + 1)}em`};
    }

    @media only screen and (max-width: 600px) {
        min-height: ${props => `${(props.heightC + 4)}em`};
    }

    transition: none;
    font-size: ${props => `${props.surplue * 40}px`};
    background-color: var(--dark3);
    color: var(--white);

    .centerer {
        flex: 1 1 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .inner-container {
        position: relative;

        height: ${props => `${(props.heightC + 1)}em`};
        width: ${props => `${(props.widthC + 1)}em`};
    }

    .mask {
        padding: 10px;
        border-radius: 20px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;

        z-index: 2;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        font-size: 20px;
        
        p {
            margin: 0px;
            text-align: center;
            background-color: var(--dark3);
            padding: 5px;
            border-radius: 10px;
        }

        .icons {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            font-size: 40px;
            background-color: var(--dark3);
            padding: 5px;
            border-radius: 10px;
        }

        .star-icon {
            margin-right: 0;
            color: var(--yellow);

            transition: all 0.1s linear;

            @media only screen and (min-width: 600px) {
                :hover {
                    transform: scale(1.1);
                }
            }

            :active {
                transform: scale(0.9);
            }
        }

        .full-icon {
            margin-right: 0.2em;
            margin-left: 0.2em;

            color: #ffffff22;
            @media only screen and (max-width: 600px) {
                color: var(--white);
            }
            
            transition: all 0.1s linear;
            
            @media only screen and (min-width: 600px) {
                :hover {
                    transform: scale(1.1);
                }
            }

            :active {
                transform: scale(0.9);
            }
        }
    }

    @media only screen and (min-width: 600px) {
            :hover .full-icon {
                color: var(--white);
            }
        }
`;

export const Character = styled.p`
    cursor: pointer;
    position: absolute;

    top: ${props => (props.yPos + -props.yOffset) + "em"};
    left: ${props => (props.xPos + -props.xOffset) + "em"};

    width: 1em;
    height: 1em;

    display: flex;
    justify-content: center;
    align-items: center;

    margin-block-start: 0;
    margin-block-end: 0;
    padding: 0px;

    text-transform: uppercase;

    transition: all 2s ease;

    :hover {
        background-color: black;
        transition: all 0.1s ease;
        transform: scale(1.3);
        text-decoration: line-through;
        color: var(--red);
    }

`;