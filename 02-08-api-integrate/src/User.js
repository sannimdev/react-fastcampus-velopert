import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    return response.data;
}

function User({ id }) {
    const [state] = useAsync(() => getUser(id), [id]);
    const { loading, data: user, error } = state;

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>오류가 발생했습니다.</div>;
    if (!user) return <div>데이터 없음...</div>;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>
                <strong>Email: </strong> {user.email}
            </p>
        </div>
    );
}
export default User;
