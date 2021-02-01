import styled from 'styled-components';

export const DashboardContainer = styled.div`
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;

    margin-left: 100px;
    margin-right: 100px;

    .inputs {
        display: flex;
        flex-direction: row;
        padding: 5px;
    }

    .fields {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        margin-right: 10px;
        padding: 15px;

        background-color: var(--dark2);
        border-radius: 10px;
    }

    .name-input {
        flex: 1 1 auto;
        outline: none;
        /* border: 3px var(--green) solid; */
        border: none;
        border-bottom: 2px solid rgba(0, 0, 0, 0.1);
        background-color: transparent;
        color: var(--white);

        font-size: 20px;
        font-family: inherit;
    }

    .name-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    .buttons {
        display: flex;
        flex-direction: column;

        color: var(--white);
        padding-left: 10px;

        p {
            cursor: pointer;
            padding: 0px;
            margin: 0px;

            :hover {
                text-decoration: underline;
            }
        }
    }

    .generate-button {
        /* flex: 1 1 auto; */
        cursor: pointer;
        outline: none;
        
        font-family: inherit;
        font-size: 25px;
        font-weight: bold;
        
        background-color: var(--blue);
        color: var(--white);

        border: none;
        border-radius: 10px;
        padding: 10px;

        transition: all 0.1s linear;
    }

    .generate-button:hover {
        transform: scale(1.05);
    }

    .generate-button:active {
        transform: scale(1.0);
    }

    .names-container {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        overflow: hidden;
    }

    .icons {
        flex: 1 1 auto;
        
        /* margin: 10px; */
        display: flex;
        flex-direction: row;
    }

    .random-icon, .trash-icon {
        cursor: pointer;
        /* border-radius: 10px; */
        font-size: 1.5em;
        padding: 10px;
        /* margin: 5px; */
        /* padding-left: 20px; */
        /* padding-right: 20px; */
        height: 1em;

        transition: all 0.1s linear;

        :hover {
            /* z-index: 100; */
            transform: scale(1.1);
        }

        :active {
            transform: scale(1.0);
        }
    }

    .random-icon {
        color: var(--white);
        display: flex;
        border-top-right-radius: 10px;
    }

    .trash-icon {
        color: var(--white);
        border-top-left-radius: 10px;
    }

    .names {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        overflow-x: scroll;
    }

    .names::-webkit-scrollbar {
        height: 5px;
    }

    .names::-webkit-scrollbar-track {
        background-color: transparent;
    }

    .names::-webkit-scrollbar-thumb {
        background-color: var(--scrollbar-thumb);
        border-radius: 10px;
    }

    .one-name-around {
        margin: 10px;
        margin-left: 0px;
        padding: 10px;
        font-size: 20px;
    }

    .one-name {
        cursor: move;
        display: flex;
        align-items: flex-end;

        color: var(--white);
        background-color: var(--dark);

        border-radius: 10px;

        transition: all 0.1s linear;
    }

    .no-name {
        color: white;
        margin: 0px;
        padding-left: 0px;
        font-size: 100%;
    }

    .one-name p {
        margin: 0px;
        margin-right: 5px;
    }

    .close-icon {
        cursor: pointer;
        font-size: 25px;
        transition: all 0.1s linear;
    }

    .one-name:hover {
        background-color: var(--red);
    }

    .one-name:hover .close-icon {
        transform: scale(1.1);
    }
`;