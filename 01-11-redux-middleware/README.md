# 리덕스 미들웨어

## 개요

-   리덕스가 지니는 핵심 기능이다. (리덕스의 꽃)
-   Context API, MobX와 비교했을 때 차별화할 수 있는 기능이다.
-   이 기능을 사용하지 않으면 차라리 Context API를 사용하는 것이 낫다.
    -   왜냐하면 굳이 리덕스 없이도 Context API로도 구현이 가능하니까.

## 리덕스 미들웨어

-   액션 → 미들웨어 → 리듀서 → 스토어
    -   특정 조건에 따라 액션이 처리되지 않도록 미들웨어 단에서 무시할 수도 있다.
    -   미들웨어를 사용해서 액션이 리듀서에 전달되므로 특정 코드를 첨가할 수 있다.
        -   ex) 액션의 payload값을 수정하거나 콘솔에 값을 출력, 또 다른 값을 만들어서 dispatch 등...
-   주로 비동기 작업을 처리할 떄 사용한다.
    -   API 요청하기

### 미들웨어 함수 작성 방법

```js
const middleware = (store) => (next) => (action) => {};

function middleware(store) {
    // store 객체
    return function (next) {
        // next는 미들웨어에서 액션을 받아왔을 때 다음 미들웨어에 전달하는 함수이다.
        return function (action) {
            // 액션 객체
            // 하고 싶은 작업
        };
    };
}
```

### redux-thunk

-   **액션 객체**가 아닌 **함수**를 디스패치할 수 있다.
-   리덕스 창시자가 직접 만든 라이브러리

```js
// 이게 정말 전부다 😂
const thunk = (store) => (next) => (action) =>
    typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);

const myThink = () => (dispatch, getState) => {
    dispatch({ type: 'HELLO' });
    dispatch({ type: 'BYE' });
};
```

-   thunk 함수의 예시

```js
const getComments = () => (dispatch, getState) => {
    /*
        이 안에서는 액션을 dispatch할 수 있고
        getState를 상요하여 현재 상태를 조회할 수도 있다.
    */
    //요청이 시작되었음을 알리는 액션
    dispatch({ type: 'GET_COMMENTS' });

    //댓글을 조회하는 프라미스를 반환하는 getComments가 있다고 가정하자.
    api.getComments(id) // 요청
        .then((comments) => dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments })) // 성공
        .catch((e) => dispatch({ type: 'GET_COMMENTS_ERROR', error: e })); // 실패한 경우
};

// 컴포넌트에서 디스패치
dispatch(getComments());
dispatch(myThunk());
```

-   thunk 함수의 예시

```js
const getComments = () => (dispatch, getState) => {
    /*
        이 안에서는 액션을 dispatch할 수 있고
        getState를 상요하여 현재 상태를 조회할 수도 있다.
    */
    //요청이 시작되었음을 알리는 액션
    dispatch({ type: 'GET_COMMENTS' });

    //댓글을 조회하는 프라미스를 반환하는 getComments가 있다고 가정하자.
    api.getComments(id) // 요청
        .then((comments) => dispatch({ type: 'GET_COMMENTS_SUCCESS', id, comments })) // 성공
        .catch((e) => dispatch({ type: 'GET_COMMENTS_ERROR', error: e })); // 실패한 경우
};

// 컴포넌트에서 디스패치
dispatch(getComments());
dispatch(myThunk());
```

## 리덕스 미들웨어의 종류

-   redux-thunk (✔ 튜토리얼에서 다룰 내용)
-   redux-saga (✔ 튜토리얼에서 다룰 내용)
-   redux-observable (Rx.js를 아는 경우 redux-observable을 배우기 수월하다.)
-   redux0promise-middleware (Promise에 기반한 미들웨어)

## 다룰 내용

-   리덕스 미들웨어 직접 만들기
-   redux-logger 사용하기
-   redux-thunk 사용하기
-   redux-saga 사용하기

### redux-saga

-   redux-thunk 다음으로 가장 많이 사용하는 비동기 작업 관련 미들웨어이다.
-   redux-saga는 액션을 모니터링하고 있다가 특정 액션이 발생하면 그에 따라 특정 작업을 하는 방식으로 사용한다.
    -   특정 작업은 특정 자바스크립트를 실행하거나 다른 액션을 실행하거나 상태를 조회하는 등의 작업이 포함된다.
    -   예를들어 비동기 작업을 진행할 떄 기존 요청을 취소할 수 있다.
    -   redux-thunk는 사용할 때 함수 타입의 값을 dispatch하는데 redux-saga에서는 순수 액션 객체를 사용하면서 이와 같은 작업을 수행할 수 있다.
-   웹 소켓을 사용하면 Channel이라는 기능을 사용하여 더욱 효율적으로 코드를 관리할 수 있다.
-   비동기 작업이 실패했을 떄 재시도하는 기능을 구현할 수도 있다.
-   redux-saga는 자바스크립트의 `Generator` 문법을 사용한다.
    -   redux-saga를 사용하기 이전에 이 문법을 선행학습
-   Generator란?
    -   함수의 흐름을 특정 구간에 멈춰놓았다가 나중에 다시 실행할 수 있다.
    -   결괏값을 여러 번 내보낼 수 있다.
    -   대략 다음과 같은 느낌
    ```js
    function weirdFunction(){
        return 1;
        return 2;
        return 3;
        return 4;
        return 5;
    ```
    ```js
    function* generatorFunction(){
        console.log("안녕하세요?")
        yield 1;
        console.log("제너레이터 함수)
        yield 2;
        console.log("funciton *");
        yield 3;
        return 4;
    }
    ```
    ```js
    function* sumGenerator() {
        console.log('sumGenerator가 시작되었습니다!');
        let a = yield;
        console.log('a 값을 받았습니다.');
        let b = yield;
        console.log('b값을 받았습니다.');
        return a + b;
    }
    ```
    ```js
    function* infiniteAddGenerator() {
        let result = 0;
        while (true) {
            result += yield result;
        }
    }
    ```

## JSON Server

```
npx json-server ./data.json --port 4000
```
