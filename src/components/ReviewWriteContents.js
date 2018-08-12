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


class ReviewWriteContents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            floors: [],
            noFloor: false
        }
    }

    handleTrafficRating = (value) => {
        storage.set("trafficRating", value);
    }

    handleChangeDong = (e) => {
        console.log("호출" + e.target.value);
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

    render() {
        const {section} = this.props;
        let trafficRating = storage.get("trafficRating");
        let view = '';
        const dong = danjis.danjis[0].dong;

        switch (section) {
            case "traffic":
                view = <Traffic trafficRating={trafficRating}/>;
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

const Traffic = ({trafficRating}) => (
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
            <textarea placeholder="교통 여건의 장단점을 입력해주세요"></textarea>
        </div>
    </div>
)

const Danjis = ({dong, handleChangeDong, floors, noFloor}) => (
    <div className="form-group">
        <select className="form-control" onChange={handleChangeDong}>
            {dong.map(option => {
                return <option value={option.floor} key={option.id}>{option.name}</option>
            })}
        </select>
        {
            noFloor
                ? <input type="text"/>
                : <select className="form-control">
                    {floors.map(option => {
                        return <option value={option} key={option}>{option}</option>
                    })}
                </select>
        }
    </div>
)


export default ReviewWriteContents;