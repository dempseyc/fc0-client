import React from 'react'

const PageHeader = (props) => {
    const displayPageName = () => {
        switch (props.pageName) {
            case 'Prompts':
                return 'Foamulae';
                // break;
            case 'Retorts':
                return 'Lather';
                // break;
            case 'User':
                return props.data;
            default:
                break;
        }
    }
    return (
        <div className='PageHeader'>
            <span className='PageHeader-span'>{displayPageName()}</span>
        </div>
    );
}

export default PageHeader