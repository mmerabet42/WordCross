import styled from 'styled-components';

export const HomepageContainer = styled.div`
    color: var(--white);
    font-size: 40px;

    height: 100%;

    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: var(--dark2);
        border-radius: 10px;
    }

    .a {
        background-color: var(--pink);
    }

    .b {
        background-color: var(--blue);
    }

    .c {
        background-color: var(--red);
    }

    .d {
        background-color: var(--green);
    }

    .e {
        background-color: var(--yellow);
        color: black;
    }

    .l {
        display: inline-block;

        transition: all 0.1s ease-in-out;
    }

    .l:hover {
        transform: scaleY(0.8) scaleX(0.9);
    }

    .l:active {
        transform: scaleY(1.2) scaleX(0.5);
    }
`; 