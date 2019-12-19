import React from 'react';
import FCTextItem from '../components/FCTextItem';
import FCActionStar from '../containers/FCActionStar';

class RetortBlock extends React.Component {

    render({ item,selected,myLike,likedByMe,createdBy } = this.props) {

        return (
            <div className={'retort-block'}>
                <FCTextItem
                    key={'retort-text'+item.id} 
                    classes={['retort-text']}
                    type={'Retort'}
                    text={item.text}
                    t_color={item.t_color}
                />
                <FCActionStar 
                    key={'star-'+item.id}
                    type='Star'
                    data={{
                        retortID: item.id,
                        promptID: selected,
                        likeID: likedByMe ? myLike.id : null,
                        value: likedByMe,
                        count: item.likes.length,
                        createdBy: createdBy
                    }}
                />
            </div>
        );

    }

}

export default RetortBlock;