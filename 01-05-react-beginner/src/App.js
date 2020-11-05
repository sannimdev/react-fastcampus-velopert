import React, { useRef, useState, useMemo, useCallback } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';

function countActiveUsers(users) {
    /*🤷‍♂️
        문제점: 불필요한 시점에 함수가 호출되어 렌더링된다.
        CreateUser 컴포넌트에서 input이벤트가 발생될 때에도 지속적으로 호출되고 있음.
     */
    console.log('활성 사용자 수를 세는 중...');
    return users.filter((user) => user.active).length;
}

function App() {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
    });
    const { username, email } = inputs;
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'velopert',
            email: 'public.velopert@gmail.com',
            active: true,
        },
        {
            id: 2,
            username: 'sannim',
            email: 'inegg.apps@gmail.com',
            active: false,
        },
        {
            id: 3,
            username: 'liz',
            email: 'liz@gmail.com',
            active: false,
        },
    ]);
    const nextId = useRef(4); // 새로운 항목을 추가할 때는 id가 4인 것부터 시작

    const onChange = useCallback(
        ({ target }) => {
            const { name, value } = target;
            setInputs({
                ...inputs,
                [name]: value,
            });
        },
        /*
        🤷‍♂️ useCallback (함수를 위한 초ㅓㅣ적화)
        inputs가 변할 때에만 함수를 다시 만들어 반환하고 변동사항이 없으면 이전에 반환된 함수를 재사용한다.         
         */
        [inputs]
    );

    const onCreate = useCallback(() => {
        /*
          🤷‍♂️ useRef: useState로 굳이 관리할 필요가  없는 요소
          즉, 해당 값이 바뀌더라도 렌더링이 될 필요가 없는 요소는 useState보다는 useRef로 관리하는 것이 좋다
        */
        const user = {
            id: nextId.current,
            username,
            email,
        };
        setUsers((users) => [...users, user]);
        setInputs({
            username: '',
            email: '',
        });
        nextId.current += 1;
        /*
            🤷‍♂️
            useCallback이 감싸인 곳에서 참조되고 있는 사항(변수, 함수 등)을 모두 depths([]).에 기재해야 한다.
        */
    }, [username, email]);

    const onRemove = useCallback((id) => {
        setUsers((users) => users.filter((user) => user.id !== id));
    }, []);

    const onToggle = useCallback((id) => {
        setUsers((users) =>
            users.map((user) => (user.id === id ? { ...user, active: !user.active } : user))
        );
    }, []);

    /*
    🤷‍♂️ userMemo
    => [배열]에 든 값이 변화가 있을 때에만 지정한 함수가 호출되도록 설정
    */
    const count = useMemo(() => countActiveUsers(users), [users]);

    return (
        <>
            <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
            <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
            <div>활성 사용자 수: {count}</div>
        </>
    );
}

export default App;
