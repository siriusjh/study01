import React, {Component} from 'react';
import {
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as baseActions from '../modules/base';
import storage from '../lib/storage';

const IconsArrowLeft = styled.div`
    display: inline-block;
    margin-right: 10px;
    position: relative;
    top: 4px;
`;

const IconsArrowRight = styled.div`
    display: inline-block;
    margin-left: 10px;
    position: relative;
    top: 4px;
`;

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    handleStepChange = (changeStep) => {

        const {
            step,
            stepOneFinished,
            stepTwoFinished,
            BaseActions,
            residenceTypeFinished,
            residenceYearFinished,
            ageFinished,
            genderFinished,
            marriedFinished
        } = this.props;


        let total = changeStep + step;
        if (total < 2) {
            total = 1
        } else if (total > 3) {
            total = 4
        }

        switch (total) {
            case 1:
                BaseActions.changeSteps(total);
                break;
            case 2:
                if (stepOneFinished) {
                    BaseActions.changeSteps(total);
                }
                break;
            case 3:
                if (stepTwoFinished) {
                    BaseActions.changeSteps(total);
                } else {
                    this.checkTrafficText();
                }
                break;
            case 4:
                if (residenceTypeFinished && residenceYearFinished && ageFinished && genderFinished && marriedFinished) {
                    BaseActions.changeSteps(total);
                } else {
                    alert("모든 항목에 체크해 주세요");
                    return;
                }
                break;
            default:

                break;
        }

    }

    checkTrafficText = () => {
        const trafficText = storage.get("trafficText");
        console.log("호출" + trafficText);
        if (trafficText.length < 50) {
            alert("교통환경의 장/단점을 50자 이상 입력해 주세요");
        }
    }

    render() {

        const { step } = this.props;
        return (
            <footer>
                <div id="btn-steps">
                    <button className="footer-btn" style={`${step< 2 && {visibility:'hidden'}}`}
                            onClick={() => {this.handleStepChange(-1)
                    }}>
                        <IconsArrowLeft>
                            <FaArrowLeft size={20}/>
                        </IconsArrowLeft>
                        이전
                    </button>
                    <button className="footer-btn"
                            onClick={() => {this.handleStepChange(1)
                    }}>
                        다음
                        <IconsArrowRight>
                            <FaArrowRight size={20}/>
                        </IconsArrowRight>
                    </button>
                </div>
            </footer>
        )
    }
}

export default connect(
    (state) => ({
        step: state.base.get('step'),
        stepOneFinished: state.base.get('stepOneFinished'),
        stepTwoFinished: state.base.get('stepTwoFinished'),
        residenceTypeFinished: state.review.get('residenceTypeFinished'),
        residenceYearFinished: state.review.get('residenceYearFinished'),
        ageFinished: state.review.get('ageFinished'),
        genderFinished: state.review.get('genderFinished'),
        marriedFinished: state.review.get('marriedFinished')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Footer);