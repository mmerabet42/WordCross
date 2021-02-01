import React from 'react';

import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { MdFullscreen } from 'react-icons/md';

import {
    GraphsContainer,
    Graph,
    Character
} from './style';

import { AppContext } from '../../Contexts/AppContext';

const GraphOutput = () => {
    const {
        graphs, lastConfig, offsets, generateGraph,
        addFavorite, removeFavorite, names, favorites
    } = React.useContext(AppContext);
    
    const seeNextRef = React.useRef();
    const seePrevRef = React.useRef();

    React.useEffect(() => {
        if (offsets.goSmooth && seeNextRef.current && seePrevRef.current)
            (offsets.goSmooth === 1 ? seeNextRef : seePrevRef).current.scrollIntoView({
                behavior: 'auto'
            });
    }, [offsets]);

    const getMinGraphs = () => {
        const minGraphs = [];

        for (let i = offsets.offset; i < graphs.length && i < offsets.offset + offsets.max; ++i) {
            minGraphs.push({
                graphId: i,
                bookmarked: ~favorites.graphs.findIndex(value => value.stringifiedLetters === graphs[i].stringifiedLetters)
            });
        }
        return minGraphs;
    }

    const favoriteGraph = (graphId, bookmarked) => {
        if (bookmarked)
            removeFavorite(graphs[graphId].id);
        else
            addFavorite(graphId);
    }

    return (
        <GraphsContainer>
            { offsets.offset > 0 &&
                <div ref={seePrevRef} className="see-next" onClick={() => generateGraph(names, -1)}>
                    <FaArrowLeft />
                </div>
            }
            {getMinGraphs().map(({graphId, bookmarked}, id) => (
                <Graph
                    key={id}
                    widthC={graphs[graphId].width}
                    heightC={graphs[graphId].height}
                >
                    <div className="main">
                        <div className="centerer">
                            <div className="container">
                                {graphs[graphId].letters.map((letter, id) => (
                                    <Character
                                        key={id}
                                        xPos={letter.x}
                                        yPos={letter.y}
                                        xOffset={graphs[graphId].xOffset}
                                        yOffset={graphs[graphId].yOffset}
                                    >
                                        {letter.letter}
                                    </Character>
                                ))}
                            </div>
                        </div>
                        <div className="controller">
                            <p># {graphId}</p>
                            <div className="icons">
                                <MdFullscreen className="full-icon" />
                                { bookmarked
                                    ? <AiFillStar className="star-icon" onClick={() => favoriteGraph(graphId, bookmarked)} />
                                    : <AiOutlineStar className="star-icon" onClick={() => favoriteGraph(graphId, bookmarked)} />
                                }
                            </div>
                        </div>
                    </div>
                </Graph>
            ))}
            { (graphs.length > offsets.offset + offsets.max || lastConfig) &&
                <div ref={seeNextRef} className="see-next" onClick={() => generateGraph(names, 1)}>
                    <FaArrowRight />
                </div>
            }
        </GraphsContainer>
    );
}

export default GraphOutput;