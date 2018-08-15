import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    FaChevronCircleDown,
    FaAngleRight,
    FaAngleDown
} from 'react-icons/fa';

import * as baseActions from '../modules/base';
import * as reviewActions from '../modules/review';
import ReviewWriteContents from './ReviewWriteContents';

const ContentBtn = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    
    .btn {
        width: 48.5%;
        height: 40px;
        
         &.active{
             background-color: #ffa409;
         }
    }
`;


const ContentList = styled.div`
     display: flex;
     flex-direction: column;
     
     .step2-list-title {
        position: relative;
        padding-left: 20px;
        margin-top: -1px;
        margin-left: -15px;
        margin-right: -15px;
        font-size: 17px;
        background: #fff;
        color: #666;
        font-weight: 400;
        border-top: 1px solid #bbb;
        border-bottom: 1px solid #bbb;
        line-height: 50px;
        cursor: pointer;
        
         &.active{
             background-color: #ffa409;
             color: #fff;
         }
    }

    .icon-arrow {
        position: absolute;
        right: 0;
        top: 4px;
        bottom: 4px;
        line-height: 42px;
        padding: 0 25px;
        border-left: 1px solid #e8e8e8;
    }
      .title-section{
        color: #666;
    }

    .stars-section {
        position: relative;
        height: 73px;
        background: #fff;
        border: 1px solid #bbb;
        text-align: center;
        display: flex;
        justify-content: space-around
    }

    .stars-section .stars-text {
       display: inline-block;
       width: 40px;
       padding-top: 13px;
    }
    
    .stars-rating {
       padding-top: 15px;
    }

    .example-section {
        position: relative;
        background: #e1e1e1;
        border: 1px solid #bbb;
        color: #666;
    }

    .write-section {
        position:relative;
        margin-bottom: 10px;
    }

    .write-section textarea{
        display: block;
        width: 100%;
        height: 120px;
        background: #fff;
        border: none;
        border-bottom: 2px solid silver;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 14px;
    }
    
    .danjis-select {
        display: flex;
        justify-content: space-around;
        
    }
    
    .danjis-select select{
        height: 45px;
        width: 45%;
        border: 1px solid silver;
        font-size: 15px;
        box-sizing: border-box;
    }
    
      .danjis-select input{
        height: 45px;
        width: 45%;
        border: 1px solid silver;
        font-size: 15px;
        box-sizing: border-box;
    }
`;

const Icons = styled.div`
    display: inline-block;
    position: relative;
    top: 6px;
    margin-right: 20px;
`;

const IconRight = styled.div`
    display: inline-block;
    position: relative;
    top: 6px;
`;

class StepContents extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: '',
            listActive: ''
        }
    }

    /*step1 클릭 이벤트*/
    handleClick = (e) => {

        const {BaseActions} = this.props;
        const clicked = e.target.id;

        if (clicked === 'first') {
            alert("브라우저를 종료합니다.");
            window.open('about:blank', '_self').close();
        } else {
            BaseActions.finishedStepOne(true);
        }

        if (this.state.active === clicked) {
            this.setState({active: ''});
            BaseActions.finishedStepOne(false);
        } else {
            this.setState({active: clicked});
        }
    }

    /*step2 클릭 이벤트*/
    handleListClick = (e) => {
        const clicked = e.target.id;

        if (this.state.listActive === clicked) {
            this.setState({listActive: ''});
        } else {
            this.setState({listActive: clicked});
        }
    }


    render() {
        const {step, trafficFinished, environmentFinished, danjiFinished} = this.props;

        return (
            <div id="contents">
                {
                    step === 1
                        ? <StepOneContents
                            handleClick={this.handleClick}
                            active={this.state.active}
                        />
                        : <StepTwoContents
                            handleListClick={this.handleListClick}
                            active={this.state.listActive}
                            trafficFinished={trafficFinished}
                            environmentFinished={environmentFinished}
                            danjiFinished={danjiFinished}
                        />
                }
            </div>
        )
    }
}

StepContents.propTypes = {
    step: PropTypes.number,
    trafficFinished: PropTypes.bool,
    environmentFinished: PropTypes.bool,
    danjiFinished: PropTypes.bool
}

const StepOneContents = ({handleClick, active}) => (
    <ContentBtn>
        <button type="button" className={`btn ${active === "first" ? 'active' : ''}`} id="first"
                onClick={handleClick}>아니오
        </button>
        <button type="button" className={`btn ${active === "second" ? 'active' : ''}`} id="second"
                onClick={handleClick}>네
        </button>
    </ContentBtn>
)

StepOneContents.propTypes = {
    handleClick: PropTypes.func,
    active: PropTypes.string,
}

const StepTwoContents = ({handleListClick, active, trafficFinished, environmentFinished, danjiFinished}) => (
    <ContentList>
        <ul>
            <li>
                <div className={`step2-list-title ${active === "traffic" ? 'active' : ''}`} id="traffic"
                     onClick={handleListClick}>
                    <Icons>
                        {
                            active !== "traffic" &&
                            trafficFinished ? <FaChevronCircleDown color={"#ffa409"} size={25}/> :
                                <FaChevronCircleDown size={25}/>
                        }
                    </Icons>
                    교통여건
                    <span className="icon-arrow">
                        <IconRight>
                            {active === "traffic" ? <FaAngleDown size={30}/> : <FaAngleRight size={30}/>}
                        </IconRight>
                    </span>
                </div>
                {active === "traffic" && <ReviewWriteContents section={"traffic"}/>}
            </li>
            <li>
                <div className={`step2-list-title ${active === "environment" ? 'active' : ''}`} id="environment"
                     onClick={handleListClick}>
                    <Icons>
                        {
                            active !== "environment" &&
                            environmentFinished ? <FaChevronCircleDown color={"#ffa409"} size={25}/> :
                                <FaChevronCircleDown size={25}/>
                        }
                    </Icons>
                    주변환경
                    <span className="icon-arrow">
                         <IconRight>
                             {active === "environment" ? <FaAngleDown size={30}/> : <FaAngleRight size={30}/>}
                         </IconRight>
                    </span>
                </div>
                {active === "environment" && <ReviewWriteContents section={"environment"}/>}
            </li>
            <li>
                <div className={`step2-list-title ${active === "danjis" ? 'active' : ''}`} id="danjis"
                     onClick={handleListClick}>
                    <Icons>
                        {
                            active !== "danjis" &&
                            danjiFinished ? <FaChevronCircleDown color={"#ffa409"} size={25}/> :
                                <FaChevronCircleDown size={25}/>
                        }
                    </Icons>
                    동/층 정보
                    <span className="icon-arrow">
                          <IconRight>
                              {active === "danjis" ? <FaAngleDown size={30}/> : <FaAngleRight size={30}/>}
                          </IconRight>
                    </span>
                </div>
                {active === "danjis" && <ReviewWriteContents section={"danjis"}/>}
            </li>
        </ul>
    </ContentList>
)


StepTwoContents.propTypes = {
    handleListClick: PropTypes.func,
    active: PropTypes.string,
    trafficFinished: PropTypes.bool,
    environmentFinished: PropTypes.bool,
    danjiFinished: PropTypes.bool
}


export default connect(
    (state) => ({
        step: state.base.get('step'),
        stepOneFinished: state.base.get('stepOneFinished'),
        stepTwoFinished: state.base.get('stepTwoFinished'),
        trafficFinished: state.review.get('trafficFinished'),
        environmentFinished: state.review.get('environmentFinished'),
        danjiFinished: state.review.get('danjiFinished')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        ReviewActions: bindActionCreators(reviewActions, dispatch)
    })
)(StepContents);