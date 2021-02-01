import React from 'react';

import {
    HomepageContainer
} from './style.js';

const Homepage = () => {
    return (
        <HomepageContainer>
            <p>
                <p className="l a">WordCross</p> is a word crossing <span className="l b">generator</span>.<br/>
            </p>
            <p>
                You give him a list of <span className="l c">words</span> as input, and it will try to cross each <span className="l c">words</span> on each <span className="l c">words</span> and returns all the <span className="l d">possibilites</span> back to you.
            </p>
        </HomepageContainer>

    );
}

export default Homepage;