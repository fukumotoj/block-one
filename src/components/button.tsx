import React from 'react';

function BlockLoadingButton({onClick}:any) {
    return (
        <button className="block-loader-btn" onClick={onClick}>
            Load Blocks
        </button>
    )
}

export default BlockLoadingButton;