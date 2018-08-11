import React from 'react';
import StepTitle from "./StepTitle";
import StepContents from "./StepContents";

const StepOne = ({step}) => (
    <div>
        <StepTitle step={step}/>
        <StepContents step={step}/>
    </div>
)

export default StepOne;