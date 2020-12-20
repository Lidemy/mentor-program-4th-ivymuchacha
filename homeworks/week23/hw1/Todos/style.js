/* eslint-disable import/no-unresolved */
import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 600px;
  min-height: 220px;
  margin: 10% auto;
  align-item: center;
  border: solid 0.5px #97a2a0;
  box-shadow: 1.4px 1.4px 10px 0 #97a2a0;
  padding: 10px;
  background: #f5be2e;
  border-radius: 10px;
`;

export const Title = styled.h1`
  text-align: center;
  color: white;
  text-shadow: 3px 3px #97a2a0;
`;

export const Flex = styled.div`
  display: flex;
  position: relative;
`;

export const Filter = styled.input`
  font-size: 15px;
  padding: 5px 10px;
  border: solid 1px #2b9392;
  border-radius: 5px;
  margin: 10px 5px;
  background: #50b8b1;
  color: white;
  cursor: pointer;
`;

export const Input = styled.input`
  max-width: 500px;
  width: 100%;
  padding: 10px;
  border: solid 1px #2b9392;
  border-radius: 5px;
`;

export const Button = styled.button`
  padding: 10px;
  margin-left: 10px;
  background: #2b9392;
  color: white;
  border: solid 1px #2b9392;
  border-radius: 5px;
  cursor: pointer;
`;

export const ClearAll = styled.div`
  position: absolute;
  right: 0;
  font-size: 15px;
  padding: 5px 10px;
  border: solid 1px #f28585;
  border-radius: 5px;
  margin: 10px 5px;
  background: #f28585;
  color: white;
  cursor: pointer;
`;
