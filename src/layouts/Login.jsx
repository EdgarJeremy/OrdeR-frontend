import React from 'react';
import 'assets/css/login.css';
import NotificationSystem from "react-notification-system";
import CustomLoading from '../components/CustomLoading/CustomLoading';
import { Auth } from '../services/request';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            _notif: null,
            loading: true,
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this._check();
        this.setState({ _notif: this.refs.notif });
    }

    _check() {
        const { history } = this.props;

        Auth.check().then((res) => {
            history.push('/home');
        }).catch((err) => {
            this.setState({ loading: false }, () => {
                console.log(this.state);
            });
        });
    }

    _login(e) {
        const { history } = this.props;
        const { username, password } = this.state;

        this.setState({ loading: true }, () => {
            Auth.login({ username, password }).then((res) => {
                history.push('/home');
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    err.response.data.errors.forEach((error, i) => {
                        this.state._notif.addNotification({
                            message: (
                                <div>
                                    {error.msg}
                                </div>
                            ),
                            level: 'warning',
                            position: 'tr',
                            autoDismiss: 15
                        });
                    });
                });
            });
        });
    }

    _onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { loading } = this.state;
        return (
            <div>
                <NotificationSystem ref="notif" />
                {loading ? <CustomLoading /> : (
                    <div className="container">
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <i className="pe-7s-coffee" style={{ fontSize: '40px' }}></i>
                                    <br /><br />
                                    <h2>OrdeR - Login</h2>
                                    <p>Masukkan data login anda</p>
                                </div>
                                <form onSubmit={this._login.bind(this)}>
                                    <div className="form-group">
                                        <input type="text" name="username" onChange={this._onChange.bind(this)} className="form-control" placeholder="User ID" value={this.state.username} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" name="password" onChange={this._onChange.bind(this)} className="form-control" placeholder="Password" value={this.state.password} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

}

export default Login;