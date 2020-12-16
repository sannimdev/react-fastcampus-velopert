const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// 📢 초기 상태가 객체일 필요는 없다.
const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}
