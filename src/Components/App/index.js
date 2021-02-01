import React from 'react';

import { HiMenu } from 'react-icons/hi';

import { AppProvider } from '../../Contexts/AppContext';

import {
    AppContainer,
} from './style';

import Dashboard from '../Dashboard';
import GraphOutput from '../GraphOutput';
import Bookmarks from '../Bookmarks';
import Homepage from '../Homepage';

const App = () => (
    <AppProvider>
        <InnerApp />
    </AppProvider>
);

const InnerApp = () => {

    const [ menuState, setMenuState ] = React.useState({
        current: 2,
        menus: [
            {
                name: "Generator",
                component: (
                    <>
                        <Dashboard />
                        <GraphOutput />
                    </>
                )
            }, { 
                name: "Bookmarks",
                component: (
                    <Bookmarks/>
                ) 
            }, {
                name: "Homepage",
                showMenu: false,
                component: (
                    <Homepage />
                )
            }
        ]
    });

    const menuClick = (name) => {
        const id = menuState.menus.findIndex(value => value.name === name);

        if (menuState.current === id)
            return;
        
        setMenuState(prev => ({
            current: id,
            menus: prev.menus
        }));
    }

    return (
        <AppContainer>
            <div className="title-container">
                <p
                    className="title"
                    onClick={() => menuClick("Homepage")}
                >
                    WordCross
                </p>
                <div className="menu-selector">
                    {menuState.menus.map((menu, id) => (
                        menu.showMenu || menu.showMenu === undefined && <p
                            key={id}
                            className={`icon ${menu.name} ${id === menuState.current ? "selected" : null}`}
                            onClick={() => menuClick(menu.name)}
                        >
                            {menu.name}
                        </p>
                    ))}
                    <HiMenu
                        className="settings"
                    />
                </div>
            </div>
            <div className="padded">
                {menuState.menus[menuState.current].component}
            </div>
        </AppContainer>
    )
}

export default App;