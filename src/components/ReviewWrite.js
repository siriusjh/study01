import React from 'react';
import StepTitle from "./StepTitle";
import StepContents from "./StepContents";

const ReviewWrite = ({step}) => (
    <div>
        <StepTitle step={step}/>
        <StepContents/>
    </div>
)

export default ReviewWrite;