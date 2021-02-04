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

    ::-webkit-scrollbar {
        height: 5px;
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
    justify-content: center;
    align-items: center;

    margin: 10px;
    border-radius: 20px;
    padding: 10px;
    overflow: hidden;

    /* height: calc(100% - 20px); */
    /* min-width: ${props => props.widthC + 1 + "em"}; */
    /* height: ${props => `${(props.heightC + 1) * 40}px`}; */
    min-width: ${props => `${(props.surplue * ((props.widthC + 1) * 40)) + 20}px`};

    font-size: 40px;
    background-color: var(--dark2);
    color: var(--white);

    :hover .mask {
        transform: scale(1.0);
    }

    .inner-container {
        position: relative;

        transform-origin: left center;
        transform: ${props => `scale(${props.surplue})`};
        height: ${props => `${(props.heightC + 1) * 40}px`};
        min-width: ${props => `${(props.surplue * ((props.widthC + 1) * 40)) + 20}px`};
    }

    .mask {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px;
        right: 0px;

        margin: 10px;
        padding: 10px;
        border-radius: 20px;

        background-color: #FFD67055;
        backdrop-filter: blur(3px);
        transform: scale(0);
        transition: all 0.1s linear;

        z-index: 2;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        font-size: 50px;
        
        p {
            margin: 0px;
        }

        .icons {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        .full-icon {
            margin-right: 0.2em;
            margin-left: 0.2em;
            color: #ffffff22;
            transition: all 0.1s linear;
        }

        :hover .full-icon {
            color: #ffffff;

            :hover {
                transform: scale(1.1);
            }

            :active {
                transform: scale(0.9);
            }
        }

        .star-icon {
            margin-right: 0;
            color: var(--yellow);

            transition: all 0.1s linear;

            :hover {
                transform: scale(1.1);
            }

            :active {
                transform: scale(0.9);
            }
        }
    }

    /* .main {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        overflow: hidden;

        border-radius: 10px;
    }

    .centerer {
        flex: 1 1 auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: var(--dark2);

        border-bottom-left-radius: 30px;
        border-bottom-right-radius: 30px;
        box-shadow: 0px 5px 1px rgba(0, 0, 0, 0.15);
    }

    .container {
        margin: 1em;
        
        width: ${props => props.widthC + 1 + "em"};
        height: ${props => `${(props.heightC > 5 ? 5 : props.heightC) + 1}em`};
        transform-origin: top center;
        transform: ${props => `scale(${props.heightC <= 5 ? 1.0 : 6 / props.heightC})`};

        position: relative;

    }

    .controller {
        flex: 0 1 auto;

        font-size: 20px;
        color: white;
        font-weight: bold;

        display: flex;
        justify-content: space-between;
        align-items: center;

        margin-left: 2em;
        margin-right: 2em;
    }

    .icons {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        font-size: 2em;
    }

    .full-icon {
        margin-right: 0.2em;
        margin-left: 0.2em;
        color: #ffffff22;
        transition: all 0.1s linear;
    }

    :hover .full-icon {
        color: #ffffff;

        :hover {
            transform: scale(1.1);
        }

        :active {
            transform: scale(0.9);
        }
    }

    .star-icon {
        margin-right: 0;
        color: var(--yellow);

        transition: all 0.1s linear;

        :hover {
            transform: scale(1.1);
        }

        :active {
            transform: scale(0.9);
        }
    } */
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

    transition: all 2s ease;

    :hover {
        background-color: black;
        transition: all 0.1s ease;
        transform: scale(1.3);
        text-decoration: line-through;
        color: var(--red);
    }

`;