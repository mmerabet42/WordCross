import React from 'react';

import { HiMenuAlt4 } from 'react-icons/hi';
import { RiSettings3Fill } from 'react-icons/ri';

import { AppProvider } from '../../Contexts/AppContext';

import {
    AppContainer,
} from './style';

import Dashboard from '../Dashboard';
import GraphOutput from '../GraphOutput';
import Bookmarks from '../Bookmarks';
import Homepage from '../Homepage';
import Settings from '../Settings';
import HamMenu from '../HamMenu';

const App = () => (
    <AppProvider>
        <InnerApp />
    </AppProvider>
);

const InnerApp = () => {

    const [ showSettings, setShowSettings ] = React.useState(false);
    const [ showHamMenu, setShowHamMenu ] = React.useState(false);
    const [ menuState, setMenuState ] = React.useState({
        current: 2,
        menus: [
            {
                name: "Generator",
                component: (
                    // <div className="mobile-scrollable">
                    <>
                        <Dashboard />
                        <GraphOutput />
                    </>
                    // </div>
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

        setShowHamMenu(false);
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
                        (menu.showMenu || menu.showMenu === undefined) && <p
                            key={id}
                            className={`icon ${menu.name} ${id === menuState.current ? "selected" : null}`}
                            onClick={() => menuClick(menu.name)}
                        >
                            {menu.name}
                        </p>
                    ))}
                    <RiSettings3Fill
                        className="settings"
                        onClick={() => setShowSettings(true)}
                    />
                </div>
                <div className="menu-hamburger">
                    <HiMenuAlt4
                        className="ham-icon"
                        onClick={() => setShowHamMenu(true)}
                    />
                    { showHamMenu &&
                        <HamMenu
                            onClose={() => setShowHamMenu(false)}
                            menuState={menuState}
                            menuClick={menuClick}
                            setShowSettings={() => {
                                setShowSettings(true);
                                setShowHamMenu(false);
                            }}
                        />
                    }
                </div>
            </div>
            <div className="padded">
                {menuState.menus[menuState.current].component}
            </div>
            { showSettings &&
                <Settings 
                    onClick={() => setShowSettings(false)}
                />
            }
        </AppContainer>
    )
}

export default App;