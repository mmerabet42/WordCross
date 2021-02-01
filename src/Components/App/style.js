import styled from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    height: 100%;
    /* padding: 50px; */
    padding-top: 0px;
    margin: 0px;

    background-color: #23232F;

    .padded {
        height: calc(100% - 100px);
        margin: 50px;
        
        overflow: hidden;

        display: flex;
        flex-direction: column;
    }

    .title-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        font-size: 30px;

        color: var(--white);

        padding: 10px;
        padding-left: 30px;
        padding-right: 30px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        /* margin-bottom: 1em; */
    }

    .menu-selector {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-size: 20px;

        z-index: 0;
        /* box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3); */
        margin-top: 5px;
    }

    .menu-selector .icon {
        cursor: pointer;
        font-weight: bold;
        margin: 2px;
        padding: 15px;
        margin-left: 20px;
        border-radius: 10px;

        transition: all 0.1s linear;

        :hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }

    .menu-selector .settings {
        font-size: 30px;
        margin-left: 20px;

        transition: all 0.1s linear;

        :hover {
            transform: scaleX(1.5) scaleY(0.9);
        }

        :active {
            transform: scaleY(1.5);
        }
    }

    .menu-selector .selected {
        background-color: var(--white);
        color: var(--dark);
        border-bottom: 5px var(--blue) solid;
        padding-bottom: 12px;

        :hover {
            background-color: var(--white);
        }
    }

    .title {
        font-weight: bold;

        margin-top: 0px;
        margin-bottom: 0px;
    }
`;