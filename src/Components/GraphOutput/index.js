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
    
    // const [ graphStyles, setGraphStyles ] = React.useState([]);
    // const [ applyRescale, setApplyRescale ] = React.useState(false);

    const seeNextRef = React.useRef();
    const seePrevRef = React.useRef();

    // const [ graphsScrollRef, setGraphsScrollRef ] = React.useState(null);

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
    
    const graphsScrollRef = React.useRef();
    const [ dimensionsCalc, setDimensionsCalc ] = React.useState(false);

    React.useEffect(() => {
        if (!graphsScrollRef.current)
            setDimensionsCalc(false);
    });

    const onRef = (el) => {
        if (!graphsScrollRef.current) {
            graphsScrollRef.current = el;
            setDimensionsCalc(true);
        }
    }

    return (
        <GraphsContainer ref={onRef}>
            { offsets.offset > 0 &&
                <div ref={seePrevRef} className="see-next" onClick={() => generateGraph(names, -1)}>
                    <FaArrowLeft />
                </div>
            }
            { dimensionsCalc && getMinGraphs().map(({graphId, bookmarked}, id) => (
                <GraphElement
                    key={id}
                    id={id}
                    graphs={graphs}
                    graphId={graphId}
                    bookmarked={bookmarked}
                    favoriteGraph={favoriteGraph}
                    scrollHeight={graphsScrollRef.current ? graphsScrollRef.current.clientHeight : 0.0}
                    scrollWidth={graphsScrollRef.current ? graphsScrollRef.current.clientWidth : 0.0}
                />
            ))}
            { (graphs.length > offsets.offset + offsets.max || lastConfig) &&
                <div ref={seeNextRef} className="see-next" onClick={() => generateGraph(names, 1)}>
                    <FaArrowRight />
                </div>
            }
        </GraphsContainer>
    );
}

const GraphElement = ({id, graphs, graphId, bookmarked, favoriteGraph, scrollWidth, scrollHeight}) => {
    let surplueValue = 0.0;

    const rescaleGraph = () => {
        let axis, bigAxis;
        if (window.innerWidth <= 600) {
            axis = (graphs[graphId].width + 2) * 40;
            bigAxis = scrollWidth;
        }
        else {
            axis = (graphs[graphId].height + 6) * 40;
            bigAxis = scrollHeight;
        }

        if (axis > bigAxis) {
            const surplue = (bigAxis - 20) / axis;
            if (surplue > 0.0)
                surplueValue = surplue;
        }
    }

    React.useEffect(() => {
        // rescaleGraph();

        window.addEventListener("resize", rescaleGraph);

        return () => window.removeEventListener("resize", rescaleGraph);
    });

    rescaleGraph();
    return (
        <Graph
            key={id}
            widthC={graphs[graphId].width}
            heightC={graphs[graphId].height}
            surplue={surplueValue === 0 ? 1.0 : surplueValue}
        >
            <div className="centerer">
                <div
                    className="inner-container"
                >
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
            <div className="mask">
                <p># {graphId}</p>
                <div className="icons">
                    <MdFullscreen className="full-icon" />
                    { bookmarked
                        ? <AiFillStar className="star-icon" onClick={() => favoriteGraph(graphId, bookmarked)} />
                        : <AiOutlineStar className="star-icon" onClick={() => favoriteGraph(graphId, bookmarked)} />
                    }
                </div>
            </div>
        </Graph>
    );
}

export default GraphOutput;