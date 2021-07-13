import React from 'react';

function User({ user: { id, username, email, active }, onRemove, onToggle }) {
    return (
        <div>
            <b
                onClick={() => onToggle(id)}
                style={{ color: active ? 'green' : 'black', cursor: 'pointer' }}
            >
                {username}
            </b>
            <span>{email}</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

function UserList({ users, onRemove, onToggle }) {
    return (
        <div>
            {users.map((user) => (
                <User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
            ))}
        </div>
    );
}

export default UserList;
