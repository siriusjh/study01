import React, {Component} from 'react';
import { connect } from 'react-redux'
import ReviewWrite from '../components/ReviewWrite';
import ReviewWriterInfo from '../components/ReviewWriterInfo';
import ReviewResult from '../components/ReviewResult';

class ReviewContainer extends Component {

    //현재 step에 따라 다른 view를 보여준다.
    handleView(step) {
        let view = '';
        switch (step) {
            case 1:
                view = <ReviewWrite step={step}/>;
                break;
            case 2:
                view = <ReviewWrite step={step}/>;
                break;
            case 3:
                view = <ReviewWriterInfo step={step}/>;
                break;
            case 4:
                view = <ReviewResult step={step}/>;
                break;
            default:
                view = <ReviewWrite step={1}/>;
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