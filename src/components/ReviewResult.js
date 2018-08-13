import React, {Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FaCircle } from 'react-icons/fa';
import Rating from 'react-rating';
import storage from '../lib/storage';
import Moment from 'react-moment';

const Wrapper = styled.div`
    .writer {
        height: 100px;
        background: #fafafa;
        border-bottom: 1px solid #e5e5e5;
    }

    .writer img {
        position: relative;
        left: 20px;
        top: 25px;
        width: 50px;
        height: 50px;
    }

    .writer strong {
        position: relative;
        left: 23px;
        margin-left: 10px;
        margin-right: 10px;
        font-size: 17px;
        color: #000;
    }

    .writer span {
        position: relative;
        left: 20px;
        font-size: 13px;
        color: #bbb;
    }

    .writer .writer-info {
        font-size:14px;
        padding-top: 3px;
        color: #626252;
        position: relative;
        margin: 0 0 0 80px;
    }

    .review {
        padding: 10px;
        background-color: #fff;
        color: #757575;
    }

    .review-title {
        height: 15px;
    }

    .review-title strong {
        float: left;
        line-height: 14px;
        border-right: 1px solid #e1e1e1;
        margin-right: 10px;
        padding-right: 10px;
        vertical-align: middle;
        color: #000;
        padding-top: 5px;
    }
`;


class ReviewResult extends Component {

    render() {
        const {
            residenceType,
            residenceYear,
            age,
            gender,
            isMarried
        } = this.props;

        const date = new Date();

        const trafficRating = storage.get('trafficRating');
        const trafficText = storage.get('trafficText');
        let imgAge = age.substring(0,2);
        let imgGender = '';
            if(gender ==='남자') {
                imgGender = 'm'
            } else {
                imgGender = 'w'
            }

        return (
            <Wrapper>
                <div id="step4-section">
                    <div className="writer">
                        <img src={`http://s.zigbang.com/v2/danji/review_${imgGender}_${imgAge}.png`}/>
                        <strong>{age} {gender}</strong>
                        <span><Moment format="YYYY.MM.DD">{date}</Moment> 등록</span>
                        <p className="writer-info">{residenceYear} · {residenceType} · {isMarried}</p>
                    </div>
                    <div className="review">
                        <div className="review-title">
                            <strong>교통여건</strong>
                            <strong>{trafficRating}.0</strong>
                            <span className="stars">
                                 <Rating
                                     emptySymbol={<FaCircle color={"#e5e5e5"} size={10}/>}
                                     fullSymbol={<FaCircle color={"#757575"} size={10}/>}
                                     readonly={true}
                                     quiet={true}
                                     initialRating={trafficRating}
                                 />
                            </span>
                        </div>
                        <p className="review-contents">
                            {trafficText}
                        </p>
                    </div>
                </div>
            </Wrapper>
        )
    }
}

export default connect(
    (state) => ({
        residenceType: state.review.get('residenceType'),
        residenceYear: state.review.get('residenceYear'),
        age: state.review.get('age'),
        gender: state.review.get('gender'),
        isMarried: state.review.get('isMarried')
    }),
    (dispatch) => ({})
)(ReviewResult);
