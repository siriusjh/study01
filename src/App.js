import React, {Component} from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ReviewContainer from './containers/ReviewContainer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <div id="main">
                    <article>
                        <div id="container">
                            <ReviewContainer/>
                        </div>
                    </article>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
