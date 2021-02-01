import React from 'react';
import { v4 as uuidV4 } from 'uuid';
import update from 'immutability-helper';

import generateCrossWord2 from './generateCrossWord2';

export const AppContext = React.createContext();

const NAMES_STORAGE_KEY = 'names';
const GRAPHS_STORAGE_KEY = 'graphs';
const OFFSETS_STORAGE_KEY = 'offsets';
const LASTCONFIG_STORAGE_KEY = 'lastconfig';
const FAVORITE_STORAGE_KEY = "favorites";

export const AppProvider = props => {
    const [ names, setNames ] = React.useState([]);
    const [ graphs, setGraphs ] = React.useState([]);
    const [ offsets, setOffsets ] = React.useState({});
    const [ lastConfig, setLastConfig ] = React.useState(null);
    const [ favorites, setFavorites ] = React.useState({});

    React.useEffect(() => {
        const namesItem = localStorage.getItem(NAMES_STORAGE_KEY);
        const graphsItem = localStorage.getItem(GRAPHS_STORAGE_KEY);
        const offsetsItem = localStorage.getItem(OFFSETS_STORAGE_KEY);
        const lastConfigItem = localStorage.getItem(LASTCONFIG_STORAGE_KEY);
        const favoritesItem = localStorage.getItem(FAVORITE_STORAGE_KEY);

        setNames(JSON.parse(namesItem) ?? []);
        setOffsets(JSON.parse(offsetsItem) ?? {  
            offset: 0,
            max: 10,
            goSmooth: 0
        });
        setGraphs(JSON.parse(graphsItem) ?? []);
        setFavorites(JSON.parse(favoritesItem) ?? {
            names: [],
            graphs: []
        });
        setLastConfig(JSON.parse(lastConfigItem));
    }, []);

    React.useEffect(() => {
        localStorage.setItem(NAMES_STORAGE_KEY, JSON.stringify(names));
    }, [names]);

    React.useEffect(() => {
        localStorage.setItem(GRAPHS_STORAGE_KEY, JSON.stringify(graphs));
    }, [graphs]);

    React.useEffect(() => {
        localStorage.setItem(LASTCONFIG_STORAGE_KEY, JSON.stringify(lastConfig));
    }, [lastConfig]);

    React.useEffect(() => {
        localStorage.setItem(OFFSETS_STORAGE_KEY, JSON.stringify(offsets));
        console.log(offsets);
    }, [offsets]);

    React.useEffect(() => {
        localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(favorites));
    }, [favorites]);

    const generateGraph = (words, intention) => {
        console.log(`intention: ${intention}`);
        if (intention === -1 || (intention === 1 && offsets.offset + offsets.max < graphs.length)) {
            setOffsets(prev => ({
                offset: prev.offset + prev.max * intention,
                max: prev.max,
                goSmooth: intention === 1 ? 1 : 0
            }));
            return;
        }
        else if (!intention && !words.length) {
            setLastConfig(null);
            setGraphs([]);
            setOffsets(prev => ({
                offset: 0,
                max: prev.max,
                goSmooth: 0
            }));
            return;
        }

        const currentConfig = (!intention ? null : lastConfig);
        const newGraphs = [];

        const ret = generateCrossWord2(words, currentConfig, (config) => {
            const letters = [];
            config.graph.forEach(value => {
                letters.push({
                    x: value.x,
                    y: value.y,
                    index: value.wordIndex,
                    letter: value.letter
                });
            });
            const stringifiedLetters = JSON.stringify(letters);

            const favId = favorites.graphs.findIndex(value => value.stringifiedLetters === stringifiedLetters);
            let graphUuid;
            if (favId !== -1)
                graphUuid = favorites.graphs[favId].id;
            else
                graphUuid = uuidV4();

            newGraphs.push({
                id: graphUuid,
                names: JSON.stringify(words),
                width: config.boundaries.maxX.x - config.boundaries.minX.x,
                height: config.boundaries.maxY.y - config.boundaries.minY.y,
                xOffset: config.boundaries.minX.x,
                yOffset: config.boundaries.minY.y,
                letters: letters,
                stringifiedLetters: stringifiedLetters,
                favorite: favId === -1 ? false : true
            });

            if (newGraphs.length === offsets.max) {
                setLastConfig(config);
                return false;
            }

            return true;
        });

        if (ret)
            setLastConfig(null);

        if (newGraphs.length) {
            if (!intention)
                setGraphs(newGraphs);
            else
                setGraphs([...graphs, ...newGraphs]);
            setOffsets(prev => ({
                offset: (prev.offset + prev.max) * intention,
                max: prev.max,
                goSmooth: -1
            }));
        }
    }

    const addFavorite = (graphIndex) => {
        const graph = graphs[graphIndex];

        if (favorites.graphs.find(value => value.stringifiedLetters === graph.stringifiedLetters))
            return;

        const copyGraph = {...graph};
        copyGraph.letters = [...graph.letters];

        setFavorites(prev => ({
            names: (!prev.names.find(value => value.names === graph.names)
                ? [...prev.names, {
                    names: graph.names,
                    show: true
                }]
                : prev.names
            ),
            graphs: [...prev.graphs, copyGraph]
        }));

        copyGraph.favorite = true;

        setGraphs(prev => prev.map(value => value.id === graph.id ? copyGraph : value));
    }

    const removeFavorite = (graphId) => {
        const graphIndex = graphs.findIndex(value => value.id === graphId);

        setFavorites(prev => ({
            names: prev.names,
            graphs: prev.graphs.filter(value => value.id !== graphId)
        }));

        if (graphIndex !== -1) {
            setGraphs(prev => update(prev, {
                [graphIndex]: {
                    favorite: {
                        $set: false
                    }
                }
            }));
        }
    }

    const value = {
        names, setNames,
        graphs, setGraphs,
        offsets, setOffsets,
        lastConfig, setLastConfig,
        generateGraph,
        favorites, setFavorites, addFavorite, removeFavorite
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
}