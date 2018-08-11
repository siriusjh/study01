import React, {Component} from 'react';
import { connect } from 'react-redux'
import StepOne from '../components/StepOne';
import StepTwo from '../components/StepTwo';

class ReviewContainer extends Component {

    //현재 step에 따라 다른 view를 보여준다.
    handleView(step) {
        console.log(step);
        let view = '';
        switch (step) {
            case 1:
                view = <StepOne step={step}/>;
                break;
            case 2:
                view = <StepTwo/>;
                break;
            default:
                view = <StepOne/>;
                break;
        }
        return view;
    }

    render() {
        const { step } = this.props;

        return (
            this.handleView(step)
        );
    }
}


export default connect(
    (state) => ({
        step: state.base.get('step')
    })
)(ReviewContainer);