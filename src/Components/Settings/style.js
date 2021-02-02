import styled from 'styled-components';

export const SettingsContainer = styled.div`
    z-index: 1000;

    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px; 
    right: 0px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .mask {
        position: absolute;
        top: 0px;
        bottom: 0px;
        left: 0px; 
        right: 0px;

        background-color: rgba(0, 0, 0, 0.7);
    }
`;

export const Menu = styled.div`
    position: absolute;

    background-color: var(--dark);
    border-radius: 10px;

    height: 70%;
    width: 70%;

    padding: 10px;

    color: var(--white);

    font-size: 25px;

    display: flex;
    flex-direction: column;

    .header {
        flex: 0 1 auto;
        border-bottom: 2px rgba(0, 0, 0, 0.3) solid;
        padding: 10px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
    }

    .title {
        cursor: auto;
        flex: 1 1 auto;

        display: flex;
        justify-content: center;
    }

    .close-icon {
        flex: 0 1 auto;
        font-size: 30px;

        cursor: pointer;

        transition: all 0.1s linear;

        :hover {
            transform: scaleX(1.5) scaleY(0.9);
        }

        :active {
            transform: scaleY(1.5);
        }
    }

    .body {
        flex: 1 1 auto;

        overflow: hidden;
        overflow-y: scroll;
        margin: 10px;

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
    }

    .group {

        .group-title {
            font-size: 20px;

            color: var(--dark2);
            opacity: 0.9;
        }

        .group-settings {
            margin: 10px;

            font-size: 20px;

            .setting {
                display: flex;
                flex-direction: row;
                align-items: center;

                .descr {
                    margin: 0px;
                    margin-right: 10px;
                }

                .input {
                    padding: 5px;
                    margin: 0px;

                    text-align: center;

                    background-color: var(--dark2);
                    border: none;
                    outline: none;

                    color: white;

                    font-family: inherit;
                    font-size: inherit;

                    ::-webkit-inner-spin-button {
                        appearance: none;
                    }
                }
            }
        }
    }

    .apply {
        font-family: inherit;

        font-size: 25px;
        background-color: var(--blue);
        border: none;
        outline: none;
        color: var(--white);
        padding: 5px;
        margin: 10px;
        border-radius: 10px;

        transition: all 0.1s cubic-bezier(0.47, 0, 0.745, 0.715);

        :hover {
            transform: scale(0.98);
        }

        :active {
            transform: scale(1.05);
        }
    }
`;