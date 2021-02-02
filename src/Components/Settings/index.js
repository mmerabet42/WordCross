import React from 'react';
import update from 'immutability-helper';

import { CgClose } from 'react-icons/cg';
import { AppContext } from '../../Contexts/AppContext';

import {
    SettingsContainer,
    Menu
} from './style';

const Settings = ({onClick}) => {
    const { offsets, setOffsets } = React.useContext(AppContext);

    const graphLimitRef = React.useRef();

    const applyChanges = () => {
        if (graphLimitRef.current.value !== offsets.max && graphLimitRef.current.value >= 5) {
            setOffsets(prev => update(prev, {
                max: { $set: graphLimitRef.current.value - 0 }
            }))
        }
    }

    return (
        <SettingsContainer>
            <div className="mask" onClick={onClick} />
            <Menu>
                <div className="header">
                    <p className="title">Settings</p>
                    <CgClose className="close-icon" onClick={onClick} />
                </div>
                <div className="body">
                    <div className="group">
                        <p className="group-title">Generator Output</p>
                        <div className="group-settings">
                            <div className="setting graph-limit">
                                <p className="descr">Maximum number of graphs to be shown (> 5)</p>
                                <input ref={graphLimitRef} className="input" type="number" defaultValue={offsets.max} min="5" />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="apply" onClick={applyChanges}>Apply Changes</button>
            </Menu>
        </SettingsContainer>  
    );
}

export default Settings;