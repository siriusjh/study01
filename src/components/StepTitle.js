import React from 'react';
import {
    FaQuestionCircle,
    FaPencilAlt
} from 'react-icons/fa';

import styled from 'styled-components';

const Icons = styled.div`
    display: inline-block;
    position: absolute;
    left: 0;
    top: 4px;
`;

const StepOneTitle = () => (
    <h3>
        <Icons>
            <FaQuestionCircle/>
        </Icons>
        최근 5년 이내에 아파트에 거주한 경험이 있나요?
    </h3>
)

const StepTwoTitle = () => (
    <h3>
        <Icons>
            <FaPencilAlt/>
        </Icons>
        검색한 단지에 대해 아래의 항목들을 입력해주세요.
    </h3>
)

const StepTitle = ({step}) => (
    <div id="step-title">
        {step === 1 ? <StepOneTitle/> : <StepTwoTitle step={step}/>}
    </div>
)

export default StepTitle;