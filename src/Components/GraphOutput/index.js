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

    // const graphContainerRef = React.useRef(Array(offsets.max).fill({
    //     current: null,
    //     style: {}
    // }));
    const graphsScrollRef = React.useRef();

    React.useEffect(() => {
        if (offsets.goSmooth && seeNextRef.current && seePrevRef.current)
            (offsets.goSmooth === 1 ? seeNextRef : seePrevRef).current.scrollIntoView({
                behavior: 'auto'
            });
    }, [offsets]);

    // const rescaleGraphs = (recall) => {
    //     console.log("heeelllllooooo");
    //     const containerHeight = graphsScrollRef.current.clientHeight;
    //     graphContainerRef.current.forEach(value => {    
    //         if (!value.current)
    //             return;
    //         if (value.current.clientHeight > containerHeight) {
    //             const surplue = (containerHeight - 20) / value.current.clientHeight;
    //             if (surplue < 1.0) {
    //                 value.current.style.transform = `scale(${surplue})`;
    //                 // value.style.minWidth = value.current.clientWidth - 100;
    //                 // value.style.fontSize = value.style.fontSize;
    //             }
    //         }
    //     });
    //     // console.log("eirbhvefvezrv");
    //     if (!recall) {
    //         setApplyRescale(prev => true);
    //     }
    // }

    // React.useLayoutEffect(() => {
    //     // console.log("last");
    //     rescaleGraphs(true);
    // }, []);

    // React.useEffect(() => {
    //     window.addEventListener("resize", rescaleGraphs);

    //     return () => {
    //         window.removeEventListener("resize", rescaleGraphs);
    //     }
    // })

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
        <GraphsContainer ref={graphsScrollRef}>
            { offsets.offset > 0 &&
                <div ref={seePrevRef} className="see-next" onClick={() => generateGraph(names, -1)}>
                    <FaArrowLeft />
                </div>
            }
            {getMinGraphs().map(({graphId, bookmarked}, id) => (
                <GraphElement
                    key={graphs[graphId].id}
                    graphs={graphs}
                    graphId={graphId}
                    bookmarked={bookmarked}
                    scrollRef={graphsScrollRef}
                    favoriteGraph={favoriteGraph}
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

const GraphElement = ({graphs, graphId, bookmarked, scrollRef, favoriteGraph}) => {
    const [ surplueValue, setSurplueValue ] = React.useState(0.0);
    const graphRef = React.useRef();

    const rescaleGraph = () => {
        let axis, bigAxis;
        if (window.innerWidth <= 600) {
            axis = (graphs[graphId].width + 2) * 40;
            bigAxis = scrollRef.current.clientWidth;
        }
        else {
            axis = (graphs[graphId].height + 6) * 40;
            bigAxis = scrollRef.current.clientHeight;
        }

        if (axis > bigAxis) {
            const surplue = (bigAxis - 20) / axis;
            if (surplue > 0.0)
                setSurplueValue(surplue);
        }
    }

    React.useEffect(() => {
        rescaleGraph();

        window.addEventListener("resize", rescaleGraph);

        return () => window.removeEventListener("resize", rescaleGraph);
    });

    return (
        <Graph
            widthC={graphs[graphId].width}
            heightC={graphs[graphId].height}
            surplue={surplueValue === 0 ? 1.0 : surplueValue}
        >
            <div className="centerer">
                <div
                    ref={graphRef}
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