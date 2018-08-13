import React, {Component} from 'react';
import {
    FaStar
} from 'react-icons/fa';
import {
    FiStar
} from 'react-icons/fi';

import Rating from 'react-rating';
import storage from '../lib/storage';
import danjis from '../data';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as reviewActions from '../modules/review';
import * as baseActions from '../modules/base';


class ReviewWriteContents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            floors: [],
            noFloor: false
        }
    }

    componentDidMount() {
        const { BaseActions, ReviewActions } = this.props;
        let text = storage.get("trafficText");
        ReviewActions.updateTrafficTextLength(text.length);
        if(text.length > 49) {
            ReviewActions.changeTrafficFinished(true);
            BaseActions.finishedStepTwo(true);
        } else {
            ReviewActions.changeTrafficFinished(false);
            BaseActions.finishedStepTwo(false);
        }
    }


    handleTrafficRating = (value) => {
        storage.set("trafficRating", value);
    }

    handleChangeDong = (e) => {
        let floor = e.target.value;
        let floors = [];

        if (floor > 0) {
            for (let i = 0; i < floor; i++) {
                floors.push(i)
            }
            this.setState({
                floors: floors,
                noFloor: false
            })
        } else {
            this.setState({
                floors: [],
                noFloor: true
            })
        }
    }

    handleText = (e) => {
        const {ReviewActions} = this.props;
        let text = e.target.value;
        storage.set("trafficText", text);
        ReviewActions.updateTrafficTextLength(text.length);
        if(text.length > 49) {
            ReviewActions.changeTrafficFinished(true);
        } else {
            ReviewActions.changeTrafficFinished(false);
        }
    }

    render() {
        const {section, trafficTextLength} = this.props;
        const trafficRating = storage.get("trafficRating");
        const trafficText = storage.get("trafficText");
        let view = '';
        const dong = danjis.danjis[0].dong;

        switch (section) {
            case "traffic":
                view = <Traffic
                    trafficRating={trafficRating}
                    handleText={this.handleText}
                    trafficTextLength={trafficTextLength}
                    trafficText={trafficText}
                />;
                break;
            case "danjis":
                view = <Danjis
                    dong={dong}
                    handleChangeDong={this.handleChangeDong}
                    floors={this.state.floors}
                    noFloor={this.state.noFloor}
                />;
                break;
            default:
                break;
        }

        return (
            view
        )
    }

}

const Traffic = ({trafficRating, handleText, trafficTextLength, trafficText}) => (
    <div id="step2-list-contents">
        <p className="title-section">
            대중교통 이용이나, 자동차 운행과 같은 교통여건에 대해 평가해주세요. (50자 이상)
        </p>
        <div className="stars-section">
            <span className="stars-text">매우불편</span>
            <span className="stars-rating">
                <Rating
                    emptySymbol={<FiStar color={"#ffa409"} size={35}/>}
                    fullSymbol={<FaStar color={"#ffa409"} size={35}/>}
                    initialRating={trafficRating}
                    onChange={this.handleTrafficRating}
                />
            </span>
            <span className="stars-text">매우편리</span>
        </div>
        <p className="example-section">
            (예시) 삼각지역이 도보 3분 거리이고, 종각으로 가는 501버스를 집 바로 앞 버스정류장에서 탈 수 있다.
            배차 간격이 짧아 출퇴근이 편리하다. 하지만 서울역이 근처에 있어서 차가 항상 막혀, 자가용 이용은 자제하려고 한다.
        </p>
        <div className="write-section">
            <textarea placeholder="교통 여건의 장단점을 입력해주세요" onChange={handleText}>{trafficText}</textarea>
            <p className="traffic-length">글자 수 체크 : <span>{trafficTextLength}</span></p>
        </div>
    </div>
)

const Danjis = ({dong, handleChangeDong, floors, noFloor}) => (
    <div>
        <p className="title-section">거주 하셨던 동, 층 정보를 입력해 주세요.</p>
        <div className="danjis-select">
            <select className="dong" onChange={handleChangeDong}>
                <option>동 선택</option>
                {dong.map(option => {
                    return <option value={option.floor} key={option.id}>{option.name}</option>
                })}
            </select>
            {
                noFloor
                    ? <input type="text" placeholder="층 입력"/>
                    : <select className="floor">
                        <option>층 선택</option>
                        {floors.map(option => {
                            return <option value={option} key={option}>{option}</option>
                        })}
                    </select>
            }
        </div>
    </div>
)


export default connect(
    (state) => ({
        trafficTextLength: state.review.get('trafficTextLength')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        ReviewActions: bindActionCreators(reviewActions, dispatch)
    })
)(ReviewWriteContents);