import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as baseActions from '../modules/base';
import * as reviewActions from "../modules/review";
import storage from '../lib/storage';
import danjis from '../data';


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

const FooterWrapper = styled.div`
     ${({step}) => step === 2 && `
        #btn-steps {
            justify-content: space-between;
        }`
    }
`;

class Footer extends Component {

    /*단계 변경*/
    handleStepChange = (changeStep) => {
        const {
            step,
            stepOneFinished,
            stepTwoFinished,
            BaseActions,
            residenceType,
            residenceYear,
            age,
            gender,
            isMarried
        } = this.props;

        let total = changeStep + step;
        if (total < 2) {
            total = 1
        } else if (total > 3) {
            total = 4
        }

        this.checkStepTwo();

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
                    this.checkStepTwoSection(total);
                }
                break;
            case 4:
                if (residenceType && residenceYear && age && gender && isMarried) {
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

    /*step two 영역별 체크*/
    checkStepTwoSection = (total) => {
        const {BaseActions} = this.props;
        const trafficText = storage.get("trafficText");
        const environmentText = storage.get("environmentText");
        const dong = storage.get("dong");
        const floor = storage.get("floor");

        if (trafficText) {
            if (trafficText.length < 50) {
                alert("교통환경의 장/단점을 50자 이상 입력해 주세요");
                return;
            }
        } else {
            alert("교통환경의 장/단점을 50자 이상 입력해 주세요");
            return;
        }

        if (environmentText) {
            if (environmentText.length < 50) {
                alert("주변환경의 장/단점을 50자 이상 입력해 주세요");
                return;
            }
        } else {
            alert("주변환경의 장/단점을 50자 이상 입력해 주세요");
            return;
        }

        if (!dong || !floor) {
            alert("단지 정보를 입력해 주세요");
            return;
        }
        BaseActions.changeSteps(total);
    }


    /*step two 입력 체크*/
    checkStepTwo = () => {
        const {BaseActions, ReviewActions} = this.props;
        let trafficText = storage.get("trafficText");
        let environmentText = storage.get("environmentText");
        let dongInfo = storage.get("dong");
        let floorInfo = storage.get("floor");

        let dongObj = '';
        for (let dong of danjis.danjis[0].dong) {
            if (dongInfo == dong.id) {
                dongObj = dong;
            }
        }

        let dongFloor = dongObj.floor;
        let floors = [];

        if (dongFloor > 0) {
            for (let i = 0; i < dongFloor; i++) {
                floors.push(i)
            }
            ReviewActions.setFloors(floors);
            ReviewActions.changeFloorType(false);
        } else {
            ReviewActions.setFloors([]);
            ReviewActions.changeFloorType(true);
        }

        if (trafficText) {
            ReviewActions.updateTrafficTextLength(trafficText.length);
            if (trafficText.length > 49) {
                ReviewActions.changeTrafficFinished(true);
            } else {
                ReviewActions.changeTrafficFinished(false);
            }
        }
        if (environmentText) {
            ReviewActions.updateEnvironmentTextLength(environmentText.length);

            if (environmentText.length > 49) {
                ReviewActions.changeEnvironmentFinished(true);
            } else {
                ReviewActions.changeEnvironmentFinished(false);
            }
        }

        if (dongInfo && floorInfo) {
            ReviewActions.changeDanjiFinished(true);
        } else {
            ReviewActions.changeDanjiFinished(false);
        }

        if (trafficText && environmentText && dongInfo && floorInfo) {
            if (trafficText.length > 49 && environmentText.length > 49) {
                BaseActions.finishedStepTwo(true);
            } else {
                BaseActions.finishedStepTwo(false);
            }
        }
    }


    render() {
        const {step} = this.props;

        return (
            <footer>
                <FooterWrapper step={step}>
                    <div id="btn-steps">
                        {
                            step === 2 &&
                            <button className="footer-btn" onClick={() => {this.handleStepChange(-1)}}>
                                <IconsArrowLeft>
                                    <FaArrowLeft size={20}/>
                                </IconsArrowLeft>
                                이전
                            </button>
                        }
                        {
                            step < 3 &&
                            <button className="footer-btn" onClick={() => {this.handleStepChange(1)}}>
                                다음
                                <IconsArrowRight>
                                    <FaArrowRight size={20}/>
                                </IconsArrowRight>
                            </button>

                        }
                        {
                            step === 3 &&
                            <button className="footer-btn" onClick={() => {this.handleStepChange(1)}}>
                                리뷰 제출하기
                                <IconsArrowRight>
                                    <FaArrowRight size={20}/>
                                </IconsArrowRight>
                            </button>
                        }
                    </div>
                </FooterWrapper>
            </footer>
        )
    }
}

Footer.propTypes = {
    step: PropTypes.number,
    stepOneFinished: PropTypes.bool,
    stepTwoFinished: PropTypes.bool,
    residenceType: PropTypes.string,
    residenceYear: PropTypes.string,
    age: PropTypes.string,
    gender: PropTypes.string,
    isMarried: PropTypes.string
}

export default connect(
    (state) => ({
        step: state.base.get('step'),
        stepOneFinished: state.base.get('stepOneFinished'),
        stepTwoFinished: state.base.get('stepTwoFinished'),
        residenceType: state.review.get('residenceType'),
        residenceYear: state.review.get('residenceYear'),
        age: state.review.get('age'),
        gender: state.review.get('gender'),
        isMarried: state.review.get('isMarried'),
        trafficFinished: state.review.get('trafficFinished'),
        environmentFinished: state.review.get('environmentFinished'),
        danjiFinished: state.review.get('danjiFinished')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        ReviewActions: bindActionCreators(reviewActions, dispatch)
    })
)(Footer);