import './SeasonDisplay.css'
import React from 'react'

const seasonConfig = {
    summer: {
        text: 'Soooo Warm :)',
        iconName: 'sun'
    },
    winter: {
        text: 'Burr, it\'s cold af!',
        iconName: 'snowflake'
    }
}

const getSeason = (lat, month) => {
    if(month > 2 && month < 9) {
        return lat > 0 ? 'summer' : 'winter'
    } else {
        return lat > 0 ? 'winter' : 'summer'
    }
    // return 'summer'
}

const SeasonDisplay = ({ lat }) => {
    const season = getSeason(lat, new Date().getMonth())
    const { text, iconName } = seasonConfig[season]

    return (
        <div className={`season-display ${season}`}>
            <i className={`massive ${iconName} icon icon-left`}></i>
            <h1>{text}</h1>
            <i className={`massive ${iconName} icon icon-right`}></i>
        </div>
    )
}

export default SeasonDisplay