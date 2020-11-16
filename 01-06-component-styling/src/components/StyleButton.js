import React from 'react';
import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const colorStyles = css`
    /* 색상 */
    // Props 안에 다음과 같이 작성도 가능하다.
    ${({ theme, color }) => {
        const selected = theme.palette[color];
        return css`
            background: ${selected};
            &:hover {
                background: ${lighten(0.1, selected)};
            }
            &:active {
                background: ${darken(0.1, selected)};
            }
        `;
    }}
`;

const StyledButton = styled.button`
    /* 공통 스타일 */
    display: inline-flex;
    align-items: center;
    outline: none;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;

    /* 크기 */
    height: 2.25rem;
    font-size: 1rem;

    ${colorStyles}

    /* 기타 */
    & + & {
        margin-left: 1rem;
    }
`;

function StyleButton({ children, color, ...rest }) {
    return (
        <StyledButton color={color} {...rest}>
            {children}
        </StyledButton>
    );
}

StyleButton.defaultProps = {
    color: 'blue',
};

export default StyleButton;
