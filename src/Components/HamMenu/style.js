import styled from 'styled-components';

export const HamMenuContainer = styled.div`
    z-index: 1000;

    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;

    font-weight: bold;

    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);

    .dropped {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        background-color: var(--dark);

        padding: 30px;
        padding-top: 10px;

        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }


    .close-icon {
        /* flex: 0 1 auto; */
        cursor: pointer;
        align-self: flex-end;
        font-size: 30px;
    }

    .body {
        /* flex: 1 1 auto; */
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        /* align-items: center; */
    }

    .icon {
        cursor: pointer;
        font-size: 30px;
        text-align: center;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
    }

    .selected {
        background-color: var(--white);
        color: var(--dark);
        box-shadow: 0px -5px 0px var(--blue) inset;
    }
`;