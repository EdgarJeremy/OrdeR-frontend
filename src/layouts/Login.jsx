import React from 'react';
import 'assets/css/login.css';
import CustomLoading from '../components/CustomLoading/CustomLoading';
import { Auth } from '../services/request';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this._check();
    }

    _check() {
        Auth.check().then((res) => {
            this.setState({ loading: false });
            console.log('success', res);
        }).catch((err) => {
            this.setState({ loading: false });
            console.log('error', err.response);
        });
    }

    _login() {

    }

    render() {
        const { loading } = this.state;
        return (
            loading ? <CustomLoading /> :
                (<div className="container">
                    <div className="login-form">
                        <div className="main-div">
                            <div className="panel">
                                <h2>OrdeR - Login</h2>
                                <p>Masukkan data login anda</p>
                            </div>
                            <form>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="User ID" />
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                                <button type="button" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                )
        )
    }

}

export default Login;