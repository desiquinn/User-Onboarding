import React from 'react';
// import {List} from 'semanitc-ui-react'

const UserList = (props) => {
console.log("list props", props)
    return (
        <div>
            <p>{props.user.name}</p>
        </div>
    )
};

export default UserList;