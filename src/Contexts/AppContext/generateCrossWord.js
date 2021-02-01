
const Position = (x, y) => {
    return x.toString() + ',' + y.toString();
}

const generateCrossWord = (words, pushGraphCallback) => {
    if (!words.length)
            return;

    const graph = new Map();
    const boundaries = {
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
                    else if (direction && graph.has(topPos))
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

    const startGraph = (index) => {
        const unaivailableChars = {};

        for (let j = 0; j < words[index].length; ++j) {
            if (unaivailableChars[words[index][j]])
                continue;

            const letters = (index === 0 ? [] : findLetters(words[index][j]));
    
            if (index !== 0 && !letters.length) {
                unaivailableChars[words[index][j]] = true;
                continue;
            }

            for (let k = 0; index === 0 || k < letters.length; ++k) {
                let direction = 0;
                let xOffset = 0;
                let yOffset = 0;
    
                if (index > 0) {
                    direction = !letters[k].direction;
                    xOffset = letters[k].x - (j * !direction);
                    yOffset = letters[k].y - (j * direction);
                }
    
                const newLetters = checkCollision(index, xOffset, yOffset, direction);
                if (!newLetters)
                    continue;
    
                // place word in graph
                placeWord(newLetters);

                if (index === words.length - 1) {
                    // const currentTime = new Date().getTime();
                    // while (currentTime + 2000 >= new Date().getTime());
                    pushGraphCallback(new Map(graph), {...boundaries});
                }
                else {
                    startGraph(index + 1);
                    if (index === 0)
                        return ;
                }
                // remove current word from graph
                removeWord(index);

                if (index === 0)
                    break;
            }
            if (index === 0)
                break;
        }
    }

    startGraph(0);
}

export default generateCrossWord;