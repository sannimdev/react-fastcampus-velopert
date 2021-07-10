import React from 'react';

function User({ user: { id, username, email } }) {
    return (
        <div>
            <b>{username}</b>
            <span>{email}</span>
        </div>
    );
}

function UserList({ users }) {
    return (
        <div>
            {users.map((user) => (
                <User user={user} key={user.id} />
            ))}
        </div>
    );
}

export default UserList;
