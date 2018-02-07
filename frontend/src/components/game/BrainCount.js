import React from 'react'

const BrainCount = ({clicks}) => {
    return (
        <div className="gameHeader">
          <h1> Brains: {clicks} </h1>
        </div>
    )
}

export default BrainCount