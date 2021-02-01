
const Position = (x, y) => {
    return x.toString() + ',' + y.toString();
}

const generateCrossWord2= (words, config, pushGraphCallback) => {
    if (!words.length || (config
        && config.starts.length === words.length
        && config.starts[words.length - 1].wordIndex === words[words.length - 1].length - 1
        && config.starts[words.length - 1].letterIndex === config.starts[words.length - 1].letters.length - 1
    ))
        return true;

    if (!config)
        config =  { starts: [] };

    const graph = new Map(config.graph);
    const boundaries = config.boundaries ?? {
        minX: undefined,
        maxX: undefined,
        minY: undefined,
        maxY: undefined
    };

    const updateBoundaries = (letter) => {
        if (!boundaries.minX || letter.x <= boundaries.minX.x)
            boundaries.minX = letter;
        if (!boundaries.maxX || letter.x >= boundaries.maxX.x)
            boundaries.maxX = letter;
        if (!boundaries.minY || letter.y <= boundaries.minY.y)
            boundaries.minY = letter;
        if (!boundaries.maxY || letter.y >= boundaries.maxY.y)
            boundaries.maxY = letter;
    }

    const resetBoundaries = (index) => {
        if (boundaries.minX && boundaries.minX.wordIndex === index)
            boundaries.minX = null;
        if (boundaries.maxX && boundaries.maxX.wordIndex === index)
            boundaries.maxX = null;
        if (boundaries.minY && boundaries.minY.wordIndex === index)
            boundaries.minY = null;
        if (boundaries.maxY && boundaries.maxY.wordIndex === index)
            boundaries.maxY = null;
    }

    const checkCollision = (index, xOffset, yOffset, direction) => {
        const letters = [];

        for (let i = 0; i < words[index].length; ++i) {
            const currentLetter = words[index][i];
            const currentX = xOffset + (i * !direction);
            const currentY = yOffset + (i * direction);
            const currentPosition = Position(currentX, currentY);

            let graphCase = undefined;

            if (index > 0) {
                const topPos = Position(currentX, currentY - 1);
                const leftPos = Position(currentX - 1, currentY);
                const bottomPos = Position(currentX, currentY + 1);
                const rightPos = Position(currentX + 1, currentY);

                graphCase = graph.get(currentPosition);

                if (graphCase && (graphCase.letter !== currentLetter || graphCase.direction === direction))
                    return null;
                else if (i === 0 && graphCase) {
                    if (!direction && graph.has(leftPos))
                        return null;
                    if (direction && graph.has(topPos))
                        return null;
                }
                else if (i === words[index].length - 1 && graphCase) {
                    if (!direction && graph.has(rightPos))
                        return null;
                    else if (direction && graph.has(bottomPos))
                        return null;
                }
                else if (!graphCase) {
                    // check for top case
                    if ((!direction || i === 0) && graph.has(topPos))
                        return null;
                    // check for down case
                    else if ((!direction || i === words[index].length - 1) && graph.has(bottomPos))
                        return null;
                    // check for left case
                    else if ((direction || i === 0) && graph.has(leftPos))
                        return null;
                    // check for right case
                    else if ((direction || i === words[index].length - 1) && graph.has(rightPos))
                        return null;
                }
            }

            if (!graphCase) {
                letters.push({
                    letter: currentLetter,
                    position: currentPosition,
                    wordIndex: index,
                    direction: direction,
                    x: currentX,
                    y: currentY
                });
            }
        }
        return letters;
    }

    const placeWord = (letters) => {
        letters.forEach(letter => {
            updateBoundaries(letter);
            graph.set(letter.position, letter);
        });
    }

    const removeWord = (index) => {
        resetBoundaries(index);
        graph.forEach(value => {
            if (value.wordIndex === index) {
                graph.delete(value.position);
            }
            else
                updateBoundaries(value);
        });
    }

    const findLetters = (letter) => {
        const letters = [];

        graph.forEach(value => {
            if (value.letter === letter)
                letters.push(value);
        });
        return letters;
    }

    const startGraph = (index, starts) => {
        let isNew = (index >= starts.length ? true : false);

        let current = !isNew ? starts[index] : {
            i: 0,
            j: 0,
            letters: [],
            unaivailableChars: {}
        };

        if (isNew)
            starts.push(current);

        for (; current.i < words[index].length; ++current.i) {
            if (isNew) {
                if (current.unaivailableChars[words[index][current.i]])
                    continue;
    
                current.letters = (index === 0 ? [] : findLetters(words[index][current.i]));
                
                if (index !== 0 && !current.letters.length) {
                    current.unaivailableChars[words[index][current.i]] = true;
                    continue;
                }

                current.j = 0;
            }
            for (; index === 0 || current.j < current.letters.length; ++current.j) {
                if (isNew) {
                    let direction = 0;
                    let xOffset = 0;
                    let yOffset = 0;
        
                    if (index > 0) {
                        direction = !current.letters[current.j].direction;
                        xOffset = current.letters[current.j].x - (current.i * !direction);
                        yOffset = current.letters[current.j].y - (current.i * direction);
                    }
        
                    const newLetters = checkCollision(index, xOffset, yOffset, direction);
                    if (!newLetters)
                        continue;
                    
                    // place word in graph
                    placeWord(newLetters);
                }

                if (index === words.length - 1) {
                    if (isNew) {
                        if (!pushGraphCallback({
                            graph: graph,
                            boundaries: {...boundaries},
                            starts: starts
                        }))
                            return false;
                    }
                }
                else {
                    if (!startGraph(index + 1, starts))
                        return false;
                    starts.pop();
                    if (index === 0)
                        break;
                }
                
                // remove current word from graph
                removeWord(index);

                if (index === 0)
                    break;
                isNew = true;
            }
            if (index === 0)
                break;
        }
        return true;
    }

    if (startGraph(0, config.starts))
        return true;
    return false;
}

export default generateCrossWord2;