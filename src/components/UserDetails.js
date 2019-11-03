import React from 'react'

const UserDetails = (props) => {
    const details = {...props.user};
   return (
      <div>{details.email}</div>
   );
}

export default UserDetails