import React from 'react';

import { CgClose } from 'react-icons/cg';

import {
    HamMenuContainer
} from './style';

const HamMenu = ({onClose, menuState, menuClick, setShowSettings}) => {
    return (
        <HamMenuContainer>
            <div className="dropped">
                <CgClose className="close-icon" onClick={onClose} />
                <div className="body">
                    {menuState.menus.map((menu, id) => (
                        (menu.showMenu || menu.showMenu === undefined) && <p
                            key={id}
                            className={`icon ${menu.name} ${id === menuState.current ? "selected" : null}`}
                            onClick={() => menuClick(menu.name)}
                        >
                            {menu.name}
                        </p>
                    ))}
                    <p className="icon" onClick={setShowSettings}>Settings</p>
                </div>
            </div>
        </HamMenuContainer>
    );
}

export default HamMenu;