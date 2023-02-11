import React from 'react';
import styled from "styled-components";

const OutlineButton = (props: { icon: string; title: React.ReactNode; }) => (
    <StyleWrapper>
        <StyledOutLineBtn>
            {props.title}
        </StyledOutLineBtn>
        <StyledImg>
            <img src={props.icon} alt='/' style={{width: '50%'}}/>
        </StyledImg>

    </StyleWrapper>
);

const StyledOutLineBtn = styled.div`
  font-size: 14px;
`;

const StyledImg = styled.div`

`;

const StyleWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ffffff;
  border-radius: 32px;
  padding-left: 8px;
  margin: 6px;
  justify-content: space-evenly;
  text-align: center;
  cursor: pointer;
`;
export default OutlineButton;