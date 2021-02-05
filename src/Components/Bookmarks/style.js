import styled from 'styled-components';

export const BookmarksContainer = styled.div`

    overflow: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--dark2);
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .names {
        background-color: var(--dark3);
        color: var(--white);

        border-radius: 20px;
        padding: 10px;

        margin: 10px;
    }

    .name-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        border-bottom: 2px solid rgba(0, 0, 0, 0.1);

        padding-left: 10px;
        padding-right: 10px;
        
        font-size: 20px;
    }

    .controls {
        display: flex;
        flex-direction: row;
        align-items: center;

        @media only screen and (max-width: 600px) {
            flex-direction: column;
        }

        margin-left: 20px;

        .icons {
            display: flex;
            flex-direction: row;
        }

        .graph-count {
            white-space: nowrap;
            margin: 0px;
            font-size: 15px;
        }

        .see-eye, .clear-books {
            font-size: 1.5em;
            margin-left: 10px;
        }

        .see-eye {
            color: var(--green);
        }

        .clear-books {
            color: var(--red);
        }
    }

    .name-list {
        display: flex;
        flex-direction: row;

        overflow: hidden;
        overflow-x: scroll;

        ::-webkit-scrollbar {
            height: 0px;
        }

        p {
            margin-right: 5px;

            /* padding: 5px; */
            padding-left: 10px;
            padding-right: 10px;
            border-radius: 10px;

            /* background-color: var(--dark); */
        }
    }

    .graphs {
        display: flex;
        flex-direction: row;
        /* justify-content: center; */

        overflow: hidden;
        overflow-x: scroll;

        ::-webkit-scrollbar {
            height: 5px;
        }

        ::-webkit-scrollbar-thumb {
            background-color: var(--dark2);
            border-radius: 10px;
        }

        ::-webkit-scrollbar-track {
            background-color: transparent;
        }
    }
`;

export const Graph = styled.div`
    position: relative;
    background-color: var(--blue);

    margin: 20px;
    padding: 1em;

    border-radius: 10px;

    z-index: 3;
    /* overflow: hidden; */

    display: flex;
    justify-content: center;
    align-items: center;

    .inner-container {
        position: relative;

        width: ${props => `${props.widthC + 1}em`};
        height: ${props => `${props.heightC + 1}em`};

        z-index: 1;
    }

    .mask {

        position: absolute;
        top: -0.5em;
        bottom: -0.5em;
        left: -0.5em;
        right: -0.5em;

        border-radius: 10px;

        background-color: var(--yellow);
        opacity: 0.7;

        transform: scale(0);
        transition: all 0.1s ease-in-out;

        z-index: 2;
    }

    .inner-mask {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        font-size: 40px;

        .fullscreen {
            color: var(--dark);
        }

        .remove {
            color: var(--red);
        }

        .icon {
            transition: all 0.1s ease-in-out;
        }

        .icon:hover {
            transform: scale(1.1);
        }

        .icon:active {
            transform: scale(0.9);
        }
    }

    :hover .mask {
        transform: scale(1.0);
    }
`;

export const Character = styled.p`
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
`;