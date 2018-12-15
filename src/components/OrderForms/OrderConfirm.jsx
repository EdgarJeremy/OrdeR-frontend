import React from 'react';
import { Col, Alert, Button } from 'react-bootstrap';
import numeral from 'numeral';
import { Order } from '../../services/request';
import errorHandler from '../../services/errorHandler';

export default class OrderConfirm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: props.orders,
            table_number: 1,
            description: '',
            loading: false
        }
    }

    _onOrder() {
        const { orders, description, table_number } = this.state;
        const menus = orders.map((order) => ({ menu_id: order.menu.id, quantity: order.quantity }));
        this.setState({ loading: true }, () => {
            Order.create({ table_number, menus, description }).then((res) => {
                this.setState({ loading: false }, () => {
                    this.props.onComplete();
                });
            }).catch((err) => {
                this.setState({ loading: false }, () => {
                    errorHandler(err, this.props.notifSystem);
                });
            });
        });
    }

    _onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Alert bsStyle="warning">
                    <p><b>Tips</b> : Baca kembali item order kepada pelanggan untuk mengkonfirmasi validitas input</p>
                </Alert>
                <div className="order-header">
                    <Col md={3}>
                        <b>Gambar</b>
                    </Col>
                    <Col md={3}>
                        <b>Nama Menu</b>
                    </Col>
                    <Col md={3}>
                        <b>Jumlah</b>
                    </Col>
                    <Col md={3}>
                        <b>Harga</b>
                    </Col>
                </div>
                {this.props.orders.map((order, k) => (
                    <div className="order-item" key={k}>
                        <Col md={3}>
                            <img style={{ borderRadius: '100%', width: '50px', height: '50px' }} src={`data:image/jpeg;base64,${order.menu.image}`} alt="menu" />
                        </Col>
                        <Col md={3}>
                            <span>{order.menu.name}</span>
                        </Col>
                        <Col md={3}>
                            <span>{order.quantity}x</span>
                        </Col>
                        <Col md={3}>
                            <span>Rp. {numeral(parseInt(order.menu.price, 10) * parseInt(order.quantity, 10)).format('0,0')}</span>
                        </Col>
                    </div>
                ))}
                <Alert>
                    <b>Harga Pesanan : Rp. {numeral(this.props.totalPrice).format('0,0')}</b><br />
                    <b>Pajak : 10% = (Rp. {numeral(parseInt(this.props.totalPrice, 10) * (10 / 100)).format('0,0')})</b><br />
                    <b>Total Harga : Rp. {numeral(parseInt(this.props.totalPrice, 10) + (parseInt(this.props.totalPrice, 10) * (10 / 100))).format('0,0')}</b>
                </Alert>
                <textarea name="description" value={this.state.description} onChange={this._onChange.bind(this)} className="form-control" placeholder="Deskripsi tambahan.. (minuman panas, makanan pedas dll)"></textarea>
                <br />
                <Button bsSize="large" bsStyle="success" disabled={this.state.loading} onClick={this._onOrder.bind(this)} block><i className="pe-7s-paper-plane"></i> {this.state.loading ? 'MENGIRIM PESANAN' : 'ORDER'}</Button>
            </div>
        )
    }

}