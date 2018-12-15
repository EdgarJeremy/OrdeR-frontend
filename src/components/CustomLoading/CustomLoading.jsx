import React from 'react';
import 'assets/css/loading.css';
import ReactLoading from 'react-loading';

class CustomLoading extends React.Component {

    render() {
        return (
            <div className={`loading-container`}>
                <ReactLoading className="loading-el" type="bubbles" color="#333333" width="100%"/>
            </div>
        )
    }

}

export default CustomLoading;