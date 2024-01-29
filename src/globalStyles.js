import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
    }
`;

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1300px;
    margin-right: auto;
    margin-left: auto;
    padding-right: 30px;
    padding-left: 30px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;


export const Button = styled.button.attrs((props) => ({
    disabled: props.disabled,
}))`
    width: fit-content;
    border-radius: 4px;
    /* background: ${({primary}) => (primary ? 'hsla(200,77.5%,68.6%,1.000)' : 'hsla(200,77.5%,68.6%,1.000)')}; */
    background: ${({primary}) => (primary ? 'rgb(0 94 141)' : 'rgb(0 94 141)')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({fontBig}) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    height: 38px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        transition: all 0.3s ease-out;
        background-color: rgb(28 150 212);
    }

    @media screen and (max-width: 960px) {
        width: fit-content;
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;


export default GlobalStyle;