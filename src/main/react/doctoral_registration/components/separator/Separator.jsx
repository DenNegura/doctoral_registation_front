import React from 'react';

const Separator = ({height, width}) => {
    height ? width = "100%" : height = "100%";
    return (
        <div style={{width: width, height: height}}/>
    );
};

export default Separator;