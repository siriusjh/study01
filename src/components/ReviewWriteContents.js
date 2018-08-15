import React, {Component} from 'react';
import PropTypes from 'prop-types';
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
            floor: storage.get("floor")
        }
    }

    /*교통여건 별점*/
    handleTrafficRating = (value) => {
        storage.set("trafficRating", value);
    }

    /*주변환경 별점*/
    handleEnvironmentRating = (value) => {
        storage.set("environmentRating", value);
    }

    /*동 select box*/
    handleChangeDong = (e) => {
        const {ReviewActions} = this.props;
        storage.set("floor", '');
        this.setState({
            floor: ''
        })

        let dongId = e.target.value;
        let dongObj = '';
        for (let dong of danjis.danjis[0].dong) {
            if (dongId == dong.id) {
                dongObj = dong;
            }
        }

        storage.set("dong", dongObj.id);

        let floor = dongObj.floor;
        let floors = [];
        if (floor > 0) {
            for (let i = 0; i < floor; i++) {
                floors.push(i)
            }
            ReviewActions.setFloors(floors);
            ReviewActions.changeFloorType(false);
        } else {
            ReviewActions.setFloors([]);
            ReviewActions.changeFloorType(true);
        }

    }

    /*textarea*/
    handleText = (e) => {
        const {ReviewActions} = this.props;
        let sectionId = e.target.id;
        let text = e.target.value;

        if (sectionId === "traffic") {
            storage.set("trafficText", text);
            ReviewActions.updateTrafficTextLength(text.length);
            if (text.length > 49) {
                ReviewActions.changeTrafficFinished(true);
            } else {
                ReviewActions.changeTrafficFinished(false);
            }
        } else {
            storage.set("environmentText", text);
            ReviewActions.updateEnvironmentTextLength(text.length);
            if (text.length > 49) {
                ReviewActions.changeEnvironmentFinished(true);
            } else {
                ReviewActions.changeEnvironmentFinished(false);
            }
        }
    }

    /*층 select-box*/
    handleChangeFloor = (e) => {
        const {ReviewActions} = this.props;
        const floor = e.target.value;

        console.log("floor" + floor);
        if (floor) {
            storage.set("floor", floor);
            ReviewActions.changeDanjiFinished(true);
            this.setState({
                floor: floor
            })
        } else {
            storage.set("floor", '');
            ReviewActions.changeDanjiFinished(false);
            this.setState({
                floor: ''
            })
        }
    }

    render() {
        const {section, trafficTextLength, environmentTextLength, floors, noFloor} = this.props;
        const trafficRating = storage.get("trafficRating");
        const trafficText = storage.get("trafficText");
        const environmentRating = storage.get("environmentRating");
        const environmentText = storage.get("environmentText");
        const dongInfo = storage.get("dong");
        const floorInfo = this.state.floor;
        const dong = danjis.danjis[0].dong;

        let view = '';

        switch (section) {
            case "traffic":
                view = <Traffic
                    trafficRating={trafficRating}
                    changeRating={this.handleTrafficRating}
                    handleText={this.handleText}
                    trafficTextLength={trafficTextLength}
                    trafficText={trafficText}
                />;
                break;
            case "environment":
                view = <Environment
                    environmentRating={environmentRating}
                    changeRating={this.handleEnvironmentRating}
                    handleText={this.handleText}
                    environmentTextLength={environmentTextLength}
                    environmentText={environmentText}
                />
                break;
            case "danjis":
                view = <Danjis
                    dong={dong}
                    handleChangeDong={this.handleChangeDong}
                    floors={floors}
                    noFloor={noFloor}
                    handleChangeFloor={this.handleChangeFloor}
                    dongInfo={dongInfo}
                    floorInfo={floorInfo}
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

ReviewWriteContents.propTypes = {
    section: PropTypes.string,
    trafficTextLength: PropTypes.number,
    environmentTextLength: PropTypes.number,
    floors: PropTypes.array,
    noFloor: PropTypes.bool
}

/*교통여건*/
const Traffic = ({trafficRating, changeRating, handleText, trafficTextLength, trafficText}) => (
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
                    onChange={changeRating}
                />
            </span>
            <span className="stars-text">매우편리</span>
        </div>
        <p className="example-section">
            (예시) 삼각지역이 도보 3분 거리이고, 종각으로 가는 501버스를 집 바로 앞 버스정류장에서 탈 수 있다.
            배차 간격이 짧아 출퇴근이 편리하다. 하지만 서울역이 근처에 있어서 차가 항상 막혀, 자가용 이용은 자제하려고 한다.
        </p>
        <div className="write-section">
            <textarea placeholder="교통 여건의 장단점을 입력해주세요" id="traffic" onChange={handleText}>{trafficText}</textarea>
            <p className="traffic-length">글자 수 체크 : <span>{trafficTextLength}</span></p>
        </div>
    </div>
)

Traffic.propTypes = {
    trafficRating: PropTypes.number,
    changeRating: PropTypes.func,
    handleText: PropTypes.func,
    trafficTextLength: PropTypes.number,
    trafficText: PropTypes.string
}

/*주변환경*/
const Environment = ({environmentRating, changeRating, handleText, environmentTextLength, environmentText}) => (
    <div id="step2-list-contents">
        <p className="title-section">
            슈퍼(편의점). 백화점(대형마트), 산책로, 공원 등의 주변 환경에 대해 말씀해주세요. (50자 이상)
        </p>
        <div className="stars-section">
            <span className="stars-text">매우부족</span>
            <span className="stars-rating">
                <Rating
                    emptySymbol={<FiStar color={"#ffa409"} size={35}/>}
                    fullSymbol={<FaStar color={"#ffa409"} size={35}/>}
                    initialRating={environmentRating}
                    onChange={changeRating}
                />
            </span>
            <span className="stars-text">매우충분</span>
        </div>
        <p className="example-section">
            (예시) 마을 버스로 2 정거장이면 용산역 이마트도 있고, 정문 앞에 신선한 야채를 파는 레몬 마트가 있어서 장을 보기 편하다.
            용산가족공원 바로 아래에 위치한 아파트여서, 아이들을 자주 데리고 나간다. 공기도 주변 아파트보다 더 맑은 느낌이다.
        </p>
        <div className="write-section">
            <textarea placeholder="주변환경의 장단점을 입력해주세요" id="environment"
                      onChange={handleText}>{environmentText}</textarea>
            <p className="traffic-length">글자 수 체크 : <span>{environmentTextLength}</span></p>
        </div>
    </div>
)

Environment.propTypes = {
    environmentRating: PropTypes.number,
    changeRating: PropTypes.func,
    handleText: PropTypes.func,
    environmentTextLength: PropTypes.number,
    environmentText: PropTypes.string
}

/*동/층 정보*/
const Danjis = ({dong, handleChangeDong, floors, noFloor, handleChangeFloor, dongInfo, floorInfo}) => (
    <div>
        <p className="title-section">거주 하셨던 동, 층 정보를 입력해 주세요.</p>
        <div className="danjis-select">
            <select className="dong" onChange={handleChangeDong} value={dongInfo}>
                <option>동 선택</option>
                {dong.map(option => {
                    return <option value={option.id} key={option.id}>{option.name}</option>
                })}
            </select>
            {
                noFloor
                    ? <input type="text" placeholder="층 입력" onChange={handleChangeFloor} value={floorInfo}/>
                    : <select className="floor" onChange={handleChangeFloor} value={floorInfo}>
                        <option>층 선택</option>
                        {floors.map(option => {
                            return <option value={option} key={option}>{option}</option>
                        })}
                    </select>
            }
        </div>
    </div>
)

Danjis.propTypes = {
    dong: PropTypes.array,
    handleChangeDong: PropTypes.func,
    floors: PropTypes.array,
    noFloor: PropTypes.bool,
    handleChangeFloor: PropTypes.func
}

export default connect(
    (state) => ({
        trafficTextLength: state.review.get('trafficTextLength'),
        environmentTextLength: state.review.get('environmentTextLength'),
        danjiFinished: state.review.get('danjiFinished'),
        floors: state.review.get('floors'),
        noFloor: state.review.get('noFloor')
    }),
    (dispatch) => ({
        BaseActions: bindActionCreators(baseActions, dispatch),
        ReviewActions: bindActionCreators(reviewActions, dispatch)
    })
)(ReviewWriteContents);