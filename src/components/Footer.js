import React, { Component } from 'react';
import {
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as baseActions from '../modules/base';

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

class  Footer extends Component {

    handleStepChange = (changeStep) => {

        const { step, stepOneFinished, stepTwoFinished, BaseActions } = this.props;

        let total = changeStep + step;
        if (total < 2) {
            total = 1
        } else if( total > 3) {
            total = 4
        }

        switch (total) {
            case 1:
                BaseActions.changeSteps(total);
                break;
            case 2:
                if(stepOneFinished) {
                    BaseActions.changeSteps(total);
                }
                break;
            case 3:
                if(stepTwoFinished) {
                    BaseActions.changeSteps(total);
                }
                break;
            case 4:

                break;
            default:

                break;
        }

    }

    render() {

        return(
            <footer>
                <div id="btn-steps">
                    <button className="footer-btn" onClick={()=>{this.handleStepChange(-1)}}>
                        <IconsArrowLeft>
                            <FaArrowLeft size={20}/>
                        </IconsArrowLeft>
                        이전
                    </button>
                    <button className="footer-btn" onClick={()=>{this.handleStepChange(1)}}>
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
        stepTwoFinished: state.base.get('stepTwoFinished')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Footer);