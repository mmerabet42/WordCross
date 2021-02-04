import React from 'react';
import update from 'immutability-helper';

import { CgClose } from 'react-icons/cg';
import { MdEdit } from 'react-icons/md';
import { BiMove } from 'react-icons/bi';

import {
    DashboardContainer
} from './style';

import { AppContext } from '../../Contexts/AppContext';

const CURRENT_NAMES_STORAGE_KEY = "currentnames";
const NAME_MODE_STORAGE_KEY = "nameMode";

const Dashboard = () => {
    const {
        names, setNames, generateGraph
     } = React.useContext(AppContext);

    const [ currentNames, setCurrentNames ] = React.useState([]);
    const [ nameMode, setNameMode ] = React.useState({});

    const nameRef = React.useRef();
    
    React.useEffect(() => {
        const currentNamesItem = localStorage.getItem(CURRENT_NAMES_STORAGE_KEY);
        const nameModeItem = localStorage.getItem(NAME_MODE_STORAGE_KEY);

        setCurrentNames(JSON.parse(currentNamesItem) ?? []);
        setNameMode(JSON.parse(nameModeItem) ?? {
            id: -1,
            mode: "close"
        });
    }, []);

    React.useEffect(() => {
        localStorage.setItem(CURRENT_NAMES_STORAGE_KEY, JSON.stringify(currentNames));
    }, [currentNames]);

    React.useEffect(() => {
        localStorage.setItem(NAME_MODE_STORAGE_KEY, JSON.stringify(nameMode));
    }, [nameMode]);

    const onKeyDown = (e) => {
        if (e.key !== " " && e.key !== "Enter")
            return;
        const trimmed = nameRef.current.value.trim();
        nameRef.current.value = "";
        e.preventDefault();

        if (trimmed.length === 0)
            return;
        setCurrentNames(prev => [...prev, trimmed.toUpperCase()]);
    }

    let cancelClick = false;
    const applyIcon = (id) => {
        if (nameMode.id === id && nameMode.mode === "edit") {
            setCurrentNames(prev => update(prev, {
                    [id]: {
                        $set: nameRef.current.value
                    }
                })
            );
            setNameMode({ id: -1 });
        }
        else {
            setCurrentNames(prev => {
                const copy = [...prev];
                copy.splice(id, 1);
                return copy;   
            });
            setNameMode({ id: -1 });
            cancelClick = true;
        }
    }

    const onDoubleClick = (id) => {
        if (nameMode.id === id && nameMode.mode === "edit") {
            nameRef.current.value = "";
            setNameMode({ id: -1 });
        }
        else {
            nameRef.current.value = currentNames[id].toLowerCase();
            setNameMode({
                id: id,
                mode: "edit"
            });
        }
    }

    const onClick = (id) => {
        if (cancelClick) {
            cancelClick = false;
            return;
        }
    
        if (nameMode.id === id && (nameMode.mode === "move" || nameMode.mode === "remove"))
            setNameMode({ id: -1 });
        else if (nameMode.id === -1) {
            setNameMode({
                id: id,
                mode: "move"
            });
        }
        else if (nameMode.mode === "move") {
            setCurrentNames(prev => {
                const copy = [...prev];
                copy.splice(nameMode.id, 1);
                copy.splice(id, 0, prev[nameMode.id]);
                return copy;
            });
            setNameMode({ id: -1 });
        }
    }

    const onDrop = (event, where, target) => {
        const id = event.dataTransfer.getData("nameid");

        if (where === "input") {
            nameRef.current.value = currentNames[id].toLowerCase();
            nameRef.current.focus();
        }
        else if (where === "name" && id !== target) {
            setCurrentNames(prev => {
                const copy = [...prev];
                copy.splice(id, 1);
                copy.splice(target, 0, prev[id]);
                return copy;
            });
        }
    }

    const onDragStart = (event, id) => {
        event.dataTransfer.setData("nameid", id);
    }

    const onDragOver = (event) => event.preventDefault();

    const randomOrder = () => {
        const copy = [...currentNames];

        for (let i = 0; i < copy.length; ++i) {
            const randomIndex = Math.floor(Math.random() * copy.length);
            const tmp = copy[randomIndex];

            copy[randomIndex] = copy[i];
            copy[i] = tmp;
        }
        setCurrentNames(copy);
        setNameMode({ id: -1 });
    }

    const clearNames = () => {
        setCurrentNames([]);
        setNameMode({ id: -1 });
    }

    const startGeneration = () => {
        setNames(prev => currentNames);
        generateGraph(currentNames, 0);
    }

    return (
        <DashboardContainer>
            <div className="inputs">
                <div className="fields">
                    <input
                        ref={nameRef}
                        className="name-input"
                        onKeyDown={onKeyDown}
                        onDrop={(event) => onDrop(event, "input")}
                        onDragOver={onDragOver}
                        placeholder="Enter a word..."
                    />
                    <div className="names-container">
                        <div className="names">
                            { currentNames.length
                                ? currentNames.map((name, id) => {
                                    let NameIcon = CgClose;
                                    if (nameMode.id === id) {
                                        if (nameMode.mode === "edit")
                                            NameIcon = MdEdit;
                                        else if (nameMode.mode === "move")
                                            NameIcon = BiMove;
                                    }

                                    return (
                                        <div
                                            key={id}
                                            className={`one-name one-name-around ${id === nameMode.id && `one-name-mode`}`}
                                            onDragStart={(event) => onDragStart(event, id)}
                                            onDrop={(event) => onDrop(event, "name", id)}
                                            onDragOver={onDragOver}
                                            onDoubleClick={() => onDoubleClick(id)}
                                            onClick={() => onClick(id)}
                                            draggable
                                        >
                                            <p>{name.toLowerCase()}</p>
                                            <NameIcon className="close-icon" onClick={() => applyIcon(id)} />
                                        </div>
                                    );
                                })
                                : <p className="one-name-around no-name">There are no names. Add names by using the text field above.</p>
                            }
                        </div>
                        <div className="buttons">
                            <p onClick={randomOrder}>Randomize</p>
                            <p onClick={clearNames}>Clear All</p>
                        </div>
                    </div>
                </div>
                <button className="generate-button" onClick={startGeneration}>Generate</button>
            </div>
        </DashboardContainer>
    )
}

export default Dashboard;