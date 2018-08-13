import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as reviewActions from '../modules/review';

const Wrapper = styled.div`
      #step3-section {
        display: flex;
        flex-direction: column;
    }

    .step3-contents {
        border-top: 1px solid #d4d4d4;
    }

    #residence-type {
        border-top: 0;
    }

    .step3-contents .title{
        font-weight: bold;
    }

    .contents-btn-section {
        margin-bottom: 30px;
        display: flex;
        justify-content: space-between;
    }

    .contents-btn {
        line-height: 40px;
        background: #fff;
        border: 1px solid #bbb;
        border-radius: 1px;
        box-sizing: border-box;
        color: #000;
        width: 100%;
        
         &.active{
             background-color: #ffa409;
             color: #fff;
         }
    }

    #residence-year .contents-btn-section {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    #age .contents-btn {
         font-size: 12px;
    }
`;

class ReviewWriterInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: '',
            typeActive: '',
            yearActive: '',
            ageActive: '',
            genderActive: ''
        }
    }

    handleTypeClick = (e) => {
        const { ReviewActions } = this.props;
        const clicked = e.target.id;
        const value = e.target.value;

        if (this.state.typeActive === clicked) {
            this.setState({typeActive: ''});
            ReviewActions.changeResidenceType(false);
            ReviewActions.updateResidenceType('');
        } else {
            this.setState({typeActive: clicked});
            ReviewActions.changeResidenceType(true);
            ReviewActions.updateResidenceType(value);
        }
    }

    handleYearClick = (e) => {
        const { ReviewActions } = this.props;
        const clicked = e.target.id;
        const value = e.target.value;

        if (this.state.yearActive === clicked) {
            this.setState({yearActive: ''});
            ReviewActions.changeResidenceYear(false);
            ReviewActions.updateResidenceYear('');
        } else {
            this.setState({yearActive: clicked});
            ReviewActions.changeResidenceYear(true);
            ReviewActions.updateResidenceYear(value);
        }
    }

    handleAgeClick = (e) => {
        const { ReviewActions } = this.props;
        const clicked = e.target.id;
        const value = e.target.value;

        if (this.state.ageActive === clicked) {
            this.setState({ageActive: ''});
            ReviewActions.changeAge(false);
            ReviewActions.updateAge('');
        } else {
            this.setState({ageActive: clicked});
            ReviewActions.changeAge(true);
            ReviewActions.updateAge(value);
        }
    }

    handleGenderClick = (e) => {
        const { ReviewActions } = this.props;
        const clicked = e.target.id;
        const value = e.target.value;

        if (this.state.genderActive === clicked) {
            this.setState({genderActive: ''});
            ReviewActions.changeGender(false);
            ReviewActions.updateGender('');
        } else {
            this.setState({genderActive: clicked});
            ReviewActions.changeGender(true);
            ReviewActions.updateGender(value);
        }
    }

    handleClick = (e) => {
        const { ReviewActions } = this.props;
        const clicked = e.target.id;
        const value = e.target.value;

        if (this.state.active === clicked) {
            this.setState({active: ''});
            ReviewActions.changeMarried(false);
            ReviewActions.updateMarried('');
        } else {
            this.setState({active: clicked});
            ReviewActions.changeMarried(true);
            ReviewActions.updateMarried(value);
        }
    }

    render() {

        let typeActive = this.state.typeActive;
        let yearActive = this.state.yearActive;
        let ageActive = this.state.ageActive;
        let genderActive = this.state.genderActive;
        let active = this.state.active;

        return (
            <Wrapper>
                <div id="step3-section">
                    <div id="residence-type" className="step3-contents">
                        <p className="title">
                            리뷰해주신 아파트의 거주형태는?
                        </p>
                        <div className="contents-btn-section">
                            <button type="button" id="own" onClick={this.handleTypeClick} value="자가 거주"
                                    className={`contents-btn ${typeActive === "own" ? 'active' : ''}`}>자가 거주
                            </button>
                            <button type="button" id="rent" onClick={this.handleTypeClick} value="전세 또는 월세"
                                    className={`contents-btn ${typeActive === "rent" ? 'active' : ''}`}>전세 또는 월세
                            </button>
                        </div>
                    </div>
                    <div id="residence-year" className="step3-contents">
                        <p className="title">
                            아파트에 거주하셨던 시기는?
                        </p>
                        <div className="contents-btn-section">
                            <button type="button" id="2013year" onClick={this.handleYearClick} value="2013년까지"
                                    className={`contents-btn ${yearActive === "2013year" ? 'active' : ''}`}>2013년까지
                            </button>
                            <button type="button" id="2014year" onClick={this.handleYearClick} value="2014년까지"
                                    className={`contents-btn ${yearActive === "2014year" ? 'active' : ''}`}>2014년까지
                            </button>
                            <button type="button" id="2015year" onClick={this.handleYearClick} value="2015년까지"
                                    className={`contents-btn ${yearActive === "2015year" ? 'active' : ''}`}>2015년까지
                            </button>
                            <button type="button" id="2016year" onClick={this.handleYearClick} value="2016년까지"
                                    className={`contents-btn ${yearActive === "2016year" ? 'active' : ''}`}>2016년까지
                            </button>
                            <button type="button" id="2017year" onClick={this.handleYearClick} value="2017년까지"
                                    className={`contents-btn ${yearActive === "2017year" ? 'active' : ''}`}>2017년까지
                            </button>
                            <button type="button" id="thisYear" onClick={this.handleYearClick} value="현재 거주 중"
                                    className={`contents-btn ${yearActive === "thisYear" ? 'active' : ''}`}>현재 거주 중
                            </button>
                        </div>
                    </div>
                    <div id="age" className="step3-contents">
                        <p className="title">
                            작성해주시는 분의 연령대는?
                        </p>
                        <div className="contents-btn-section">
                            <button type="button" id="twenty" onClick={this.handleAgeClick} value="20대"
                                    className={`contents-btn ${ageActive === "twenty" ? 'active' : ''}`}>20대
                            </button>
                            <button type="button" id="thirty" onClick={this.handleAgeClick} value="30대"
                                    className={`contents-btn ${ageActive === "thirty" ? 'active' : ''}`}>30대
                            </button>
                            <button type="button" id="forty" onClick={this.handleAgeClick} value="40대"
                                    className={`contents-btn ${ageActive === "forty" ? 'active' : ''}`}>40대
                            </button>
                            <button type="button" id="fifty" onClick={this.handleAgeClick} value="50대"
                                    className={`contents-btn ${ageActive === "fifty" ? 'active' : ''}`}>50대
                            </button>
                            <button type="button" id="sixty" onClick={this.handleAgeClick} value="60대 이상"
                                    className={`contents-btn ${ageActive === "sixty" ? 'active' : ''}`}>60대 이상
                            </button>
                        </div>
                    </div>
                    <div id="gender" className="step3-contents">
                        <p className="title">
                            작성해주시는 분의 성별은?
                        </p>
                        <div className="contents-btn-section">
                            <button type="button" id="male" onClick={this.handleGenderClick} value="남자"
                                    className={`contents-btn ${genderActive === "male" ? 'active' : ''}`}>남자
                            </button>
                            <button type="button" id="female" onClick={this.handleGenderClick} value="여자"
                                    className={`contents-btn ${genderActive === "female" ? 'active' : ''}`}>여자
                            </button>
                        </div>
                    </div>
                    <div id="marital-status" className="step3-contents">
                        <p className="title">
                            결혼 여부를 알려주세요.
                        </p>
                        <div className="contents-btn-section">
                            <button type="button" id="married" onClick={this.handleClick} value="기혼"
                                    className={`contents-btn ${active === "married" ? 'active' : ''}`}>기혼
                            </button>
                            <button type="button" id="notMarried" onClick={this.handleClick} value="미혼"
                                    className={`contents-btn ${active === "notMarried" ? 'active' : ''}`}>미혼
                            </button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        )
    }
}


export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        ReviewActions: bindActionCreators(reviewActions, dispatch)
    })
)(ReviewWriterInfo);