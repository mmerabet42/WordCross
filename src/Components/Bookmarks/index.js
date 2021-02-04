import React from 'react';
import update from 'immutability-helper';

import { MdFullscreen } from 'react-icons/md';
import { CgClose } from 'react-icons/cg';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import {
    BookmarksContainer,
    Graph,
    Character
} from './style';

import { AppContext } from '../../Contexts/AppContext';

const Bookmarks = () => {
    const { favorites, removeFavorite, setFavorites } = React.useContext(AppContext);

    const deleteFavorite = (graphId) => {
        removeFavorite(graphId);
    }

    return (
        <BookmarksContainer>
            {favorites.names.map((names, id) => {
                const namesArr = JSON.parse(names.names);
                const graphs = favorites.graphs.filter(value => value.names === names.names);

                const ShowEyeTag = names.show ? AiFillEye : AiFillEyeInvisible;

                const handleShow = () => {
                    setFavorites(prev => update(prev, {
                        names: {
                            [id]: {
                                show: {
                                    $set: !names.show
                                }
                            }
                        }
                    }));
                }

                const clearFavs = () => {
                    setFavorites(prev => ({
                        names: prev.names.filter((v, id2) => id2 !== id),
                        graphs: prev.graphs.filter(value => value.names !== names.names)
                    }));
                }

                return (
                    <div key={id} className="names">
                        <div className="name-info">
                            <div className="name-list">
                                {namesArr.map((name, id) => (
                                    <p key={id}>{name}</p>
                                ))}
                            </div>
                            <div className="controls">
                                <p className="graph-count">{graphs.length} element(s)</p>
                                <div className="icons">
                                    <ShowEyeTag className="see-eye" onClick={handleShow} />
                                    <CgClose className="clear-books" onClick={clearFavs} />
                                </div>
                            </div>
                        </div>
                        <div className="graphs">
                            {names.show && graphs.map((graph, id) => (
                                    <Graph
                                        key={id}
                                        widthC={graph.width}
                                        heightC={graph.height}
                                    >
                                        <div className="inner-container">
                                            {graph.letters.map((letter, id) => (
                                                <Character
                                                    key={id}
                                                    xPos={letter.x}
                                                    yPos={letter.y}
                                                    xOffset={graph.xOffset}
                                                    yOffset={graph.yOffset}
                                                >
                                                    {letter.letter}
                                                </Character>
                                            ))}
                                        </div>
                                        <div className="mask">
                                            <div className="inner-mask">
                                                <MdFullscreen className="icon fullscreen" />
                                                <CgClose className="icon remove" onClick={() => deleteFavorite(graph.id)} />
                                            </div>
                                        </div>
                                    </Graph>
                                )
                            )}
                        </div>
                    </div>
                );
            })}
        </BookmarksContainer>
    );
}

export default Bookmarks;