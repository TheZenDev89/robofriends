import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{ overflow: 'scroll', border: '3px solid magenta', height: '500px' }}>
            {props.children}
        </div>
    )
};

export default Scroll;