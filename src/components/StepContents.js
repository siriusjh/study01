import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    FaChevronCircleDown,
    FaAngleRight,
    FaStar,
} from 'react-icons/fa';
import {
    FiStar
} from 'react-icons/fi';

import Rating from 'react-rating';

import * as baseActions from '../modules/base';

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
            active: ''
        }
    }

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

    render() {
        const {step} = this.props;
        return (
            <div id="contents">
                {step === 1
                    ? <StepOneContents
                        handleClick={this.handleClick}
                        active={this.state.active}
                    />
                    : <StepTwoContents/>}
            </div>
        )
    }
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

const StepTwoContents = () => (
    <ContentList>
        <ul>
            <li>
                <div className="step2-list-title">
                    <Icons>
                        <FaChevronCircleDown size={25}/>
                    </Icons>
                    <span>교통여건</span>
                    <span className="icon-arrow">
                        <IconRight>
                        <FaAngleRight size={30}/>
                        </IconRight>
                    </span>
                </div>
                <div id="step2-list-contents">
                    <p className="title-section">
                        대중교통 이용이나, 자동차 운행과 같은 교통여건에 대해 평가해주세요. (50자 이상)
                    </p>
                    <div className="stars-section">
                        <span className="stars-text">매우불편</span>
                        <span>
                            <Rating
                                emptySymbol={<FiStar color={"#ffa409"} size={35}/>}
                                fullSymbol={<FaStar color={"#ffa409"} size={35}/>}
                            />
                        </span>
                        <span className="stars-text">매우편리</span>
                    </div>
                    <p className="example-section">
                        (예시) 삼각지역이 도보 3분 거리이고, 종각으로 가는 501버스를 집 바로 앞 버스정류장에서 탈 수 있다.
                        배차 간격이 짧아 출퇴근이 편리하다. 하지만 서울역이 근처에 있어서 차가 항상 막혀, 자가용 이용은 자제하려고 한다.
                    </p>
                    <div className="write-section">
                        <textarea placeholder="교통 여건의 장단점을 입력해주세요"></textarea>
                    </div>
                </div>
            </li>
            <li>
                <div className="step2-list-title">
                    <Icons>
                        <FaChevronCircleDown/>
                    </Icons>
                    <span>주변환경</span>
                    <span className="icon-arrow">
                        <FaAngleRight/>
                    </span>
                </div>
            </li>
            <li>
                <div className="step2-list-title">
                    <Icons>
                        <FaChevronCircleDown/>
                    </Icons>
                    <span>단지관리</span>
                    <span className="icon-arrow">
                        <FaAngleRight/>
                    </span>
                </div>
            </li>
        </ul>
    </ContentList>
)

export default connect(
    (state) => ({
        step: state.base.get('step'),
        stepOneFinished: state.base.get('stepOneFinished'),
        stepTwoFinished: state.base.get('stepTwoFinished')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch)
    })
)(StepContents);