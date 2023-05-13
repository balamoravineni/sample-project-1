import React from 'react';

export default function Comment(props) {

  const { body, margin } = props;

  return (
    <div className='comment' style={{marginLeft: `${margin*20}px`}}>
      {body}
    </div>
  )
}