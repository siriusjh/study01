import React, {Component} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
    FaCircle
} from 'react-icons/fa';

const Wrapper = styled.div`
    .header-nav {
        background-color: #f8cd80;
        
        &.active {
            background-color: #fff;
        }
    }
`;

const Icons = styled.div`
    position: relative;
    display: inline-block;
    top: -3px;
`;

class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {step} = this.props;
        console.log("step" + step);
        return (
            <Wrapper>
                <header>
                    <div id="header-title">
                        아파트 리뷰 작성하기
                    </div>
                    <div id="header-steps">
                        <hr/>
                        <ul>
                            <li>
                                <span className={`header-nav ${0 < step < 3 && `active`}`}>
                                    {
                                        step > 1 ? <Icons><FaCircle size={8}/></Icons> : 1
                                    }
                                </span>
                            </li>
                            <li>
                                <span className={`header-nav ${step > 1 && `active`}`}>
                                     {
                                         step > 2 ? <Icons><FaCircle size={8}/></Icons> : 2
                                     }
                                </span>
                            </li>
                            <li><span className={`header-nav ${step === 3 && `active`}`}>3</span></li>
                        </ul>
                    </div>
                </header>
            </Wrapper>
        )
    }
}


export default connect(
    (state) => ({
        step: state.base.get('step')
    })
)(Header);

