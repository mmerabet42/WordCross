import React from 'react';

import { CgClose } from 'react-icons/cg';

import {
    DashboardContainer
} from './style';

import { AppContext } from '../../Contexts/AppContext';

const CURRENT_NAMES_STORAGE_KEY = "currentnames";

const Dashboard = () => {
    const {
        names, setNames, generateGraph
     } = React.useContext(AppContext);

    const [ currentNames, setCurrentNames ] = React.useState([]);
    const [ sendNames, setSendNames ] = React.useState(false);

    const nameRef = React.useRef();
    
    React.useEffect(() => {
        const currentNamesItem = localStorage.getItem(CURRENT_NAMES_STORAGE_KEY);

        setCurrentNames(JSON.parse(currentNamesItem) ?? []);
    }, []);

    // React.useEffect(() => {
    //     generateGraph(0);
    // }, [names]);

    React.useEffect(() => {
        localStorage.setItem(CURRENT_NAMES_STORAGE_KEY, JSON.stringify(currentNames));
    }, [currentNames]);

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

    const removeName = (id) => {
        setCurrentNames(prev => {
            const copy = [...prev];
            copy.splice(id, 1);
            return copy;   
        });
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
                                ? currentNames.map((name, id) => (
                                    <div
                                        key={id} className="one-name one-name-around"
                                        onDragStart={(event) => onDragStart(event, id)}
                                        onDrop={(event) => onDrop(event, "name", id)}
                                        onDragOver={onDragOver}
                                        draggable
                                    >
                                        <p>{name.toLowerCase()}</p>
                                        <CgClose className="close-icon" onClick={() => removeName(id)} />
                                    </div>
                                ))
                                : <p className="one-name-around no-name">There are no names. Add names by using the text field above.</p>
                            }
                        </div>
                        <div className="buttons">
                            <p onClick={randomOrder}>Randomize</p>
                            <p onClick={() => setCurrentNames([])}>Clear All</p>
                            {/* <div className="icons">
                                <div className="random-icon" onClick={randomOrder}>
                                    <VscDebugRestart />
                                    <BiDice5 />
                                </div>
                                <HiTrash className="trash-icon" onClick={() => { setCurrentNames([]) }} />
                            </div> */}
                        </div>
                    </div>
                </div>
                <button className="generate-button" onClick={startGeneration}>Generate</button>
            </div>
        </DashboardContainer>
    )
}

export default Dashboard;