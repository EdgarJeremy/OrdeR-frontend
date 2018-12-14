import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import 'react-image-crop/dist/ReactCrop.css';
import { User } from '../../services/request';
import errorHandler from '../../services/errorHandler';

export default class UserAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            password: '',
            type: '',
            loading: false
        }
    }

    _onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }


    _onSubmit(e) {
        e.preventDefault();
        const { name, username, password, type } = this.state;
        this.setState({ loading: true }, () => {
            User.create({ name, username, password, type }).then((res) => {
                this.setState({ loading: false }, () => {
                    this.props.onComplete();
                });
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    errorHandler(err, this.props.notifSystem);
                });
            });
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this._onSubmit.bind(this)}>
                    <FormGroup>
                        <ControlLabel>Nama</ControlLabel>
                        <FormControl
                            name="name"
                            type="text"
                            value={this.state.name}
                            placeholder="Nama pengguna"
                            onChange={this._onChange.bind(this)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Username</ControlLabel>
                        <FormControl
                            name="username"
                            type="text"
                            value={this.state.username}
                            placeholder="Username pengguna"
                            onChange={this._onChange.bind(this)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            name="password"
                            type="password"
                            value={this.state.password}
                            placeholder="Password pengguna"
                            onChange={this._onChange.bind(this)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Tipe</ControlLabel>
                        <FormControl
                            componentClass="select"
                            name="type"
                            value={this.state.type}
                            placeholder="Tipe pengguna"
                            onChange={this._onChange.bind(this)}>
                            <option value=""></option>
                            <option value="food">Dapur(Makanan)</option>
                            <option value="beverage">Dapur(Minuman)</option>
                            <option value="order">Order</option>
                            <option value="cashier">Kasir</option>
                            <option value="admin">Administrator</option>
                        </FormControl>
                        <FormControl.Feedback />
                    </FormGroup>
                    <hr />
                    <Button bsStyle="default" disabled={this.state.loading} type="submit">{this.state.loading ? 'Menyimpan...' : 'Simpan'}</Button>
                </form>

            </div>
        )
    }

}