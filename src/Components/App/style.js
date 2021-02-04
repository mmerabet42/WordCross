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
        /* flex: 1 1 auto; */
        height: calc(100% - 100px);
        margin: 50px;

        overflow: hidden;

        display: flex;
        flex-direction: column;

        @media only screen and (max-width: 1000px) {
            /* margin: 10px; */
            margin-left: 10px;
            margin-right: 10px;
        }

        @media only screen and (min-width: 600px) {
            .mobile-scrollable {
                flex: 1 1 auto;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
        }
        @media only screen and (max-width: 600px) {
            margin: 10px;

            .mobile-scrollable {
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
            }
        }

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

        @media only screen and (max-width: 700px) {
            display: none;
        }
    }

    .menu-hamburger {
        display: none;

        @media only screen and (max-width: 700px) {
            display: flex;
        }
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

    .menu-selector .settings, .menu-hamburger .ham-icon {
        cursor: pointer;
        font-size: 30px;
        margin-left: 20px;

        transition: all 0.1s linear;

        /* :hover {
            transform: scaleX(1.5) scaleY(0.9);
        } */

        :active {
            transform: scaleY(1.5);
        }
    }

    .menu-selector .selected {
        background-color: var(--white);
        color: var(--dark);
        box-shadow: 0px -5px 0px var(--blue) inset;

        :hover {
            background-color: var(--white);
        }
    }

    .title {
        cursor: pointer;
        font-weight: bold;

        margin-top: 0px;
        margin-bottom: 0px;
    }
`;