import React, { Component } from 'react';
import {
    FaArrowRight,
    FaArrowLeft
} from 'react-icons/fa';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';

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

        const { step, BaseActions } = this.props;

        let total = changeStep + step;
        if (total < 2) {
            total = 1
        } else if( total > 3) {
            total = 4
        }

        BaseActions.changeSteps(total);
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
        step: state.base.get('step')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(Footer);