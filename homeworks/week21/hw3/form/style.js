/* eslint-disable import/no-unresolved */
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Wrapper = styled.div`
  max-width: 645px;
  background: white;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  font-family: MicrosoftJhengHei;
  margin: 10% auto;
`;

export const Form = styled.form`
  padding: 50px 40px;
  border-top:solid 8px #fad312;
`;

export const Title = styled.h1`
  margin: 0 0 35px 0;
`;

export const Description = styled.p`
  font-size: 14px;
  color: black;
  line-height:1.5em;
  margin-top: 0;
`;

export const QuestionTitle = styled.div`
  line-height: 2em;
  font-size: 20px;
  margin: 40px 0 10px 0;
`;

export const Required = styled.span`
  :after {
    content: ' *';
    color: #e74149;
  }
`;

export const Input = styled.input`
  padding:5px;
  width:250px;
`;

export const MustFilled = styled.p`
  font-size: 16px;
  color:#e74149;
`;

export const Footer = styled.footer`
  border-top: solid 3px #fad312;
  background: #000000;
  color:#999999;
  font-size: 13px;
  text-align: center;
  padding: 30px 0;
  margin-top: 60px;
`;

export const Button = styled.input`
  padding:15px 30px;
  background:#fad312;
  font-size: 15px;
  border-radius: 3px;
  cursor: pointer;
  transition: transform 0.1s;
  margin: 50px 0 20px 0 ;
  border: none;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Selection = styled.div`
line-height:2em;
`;
