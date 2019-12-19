import React from 'react';
import '../styles/TextItem.css';

const colors = {
    Username_t_colors:
        [
            '#47ffff', '#9dffff',
            '#d1ffff', '#f1ffff',
            '#e6ffff', '#d8ffea',
            '#e3ffe4', '#ffffff',
            '#ffffff', '#fdffff',
            '#baffff', '#47ffff'
        ],
    Prompt_b_colors:
        [ 
            '#1f8585',
            '#438486',
            '#598389',
            '#678386',
            '#628775',
            '#5c8b64',
            '#618b62',
            '#6f866f',
            '#7c807c',
            '#6d8080',
            '#508382',
        ],
    Retort_t_colors:
        [
            '#ccddee',
            '#cce1ea',
            '#c5e3e8',
            '#c5e4e7',
            '#e9cce7',
            '#eacce7',
            '#eac5e8',
            '#e9c5ea',
            '#e7e0cc',
            '#e5dec5',
            '#e1ddc5'
        ]
};

const FCTextItem = (props) => {
    switch (props.type) {
        case 'Prompt':
            return (
                <div
                    className={props.classes.join(' ')+props.selected}
                    style={{backgroundColor:  colors.Prompt_b_colors[props.item ? props.item.b_color : 0]}}
                    onClick={ props.click }>
                {props.item ? props.item.text : ""}
                {props.children}
                </div>
            )
        case 'Retort':
            return (
                <div
                    className={props.classes.join(' ')}
                    style={{color:  colors.Retort_t_colors[props.t_color]}}
                >
                    {props.text}
                </div>
            )
        case 'Username':
            let userColor = (props.id+colors.Username_t_colors.length) % colors.Username_t_colors.length;
            return (
                <>
                    <span 
                        className={props.classes.join(' ')}
                        style={{color: colors.Username_t_colors[userColor]}}
                    >
                        {props.text}
                    </span>
                </>
            )
        default:
            return (
                <div>problem in FCTextItem</div>
            )
    } // end of switch

};

export default FCTextItem;