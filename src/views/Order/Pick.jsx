import React from 'react';
import { Row, Col, FormControl, Modal } from "react-bootstrap";
import numeral from 'numeral';
import swal from 'sweetalert';
import Card from "components/Card/Card";
import CustomLoading from 'components/CustomLoading/CustomLoading';
import errorHandler from '../../services/errorHandler';
import { Menu } from '../../services/request';
import OrderConfirm from '../../components/OrderForms/OrderConfirm';

export default class Pick extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            menus: [],
            chosen: [],
            confirmModal: false
        }
    }

    componentDidMount() {
        this._fetch();
    }

    _fetch() {
        this.setState({ loading: true }, () => {
            Menu.findAll().then((res) => {
                this.setState({ menus: res.data.rows, loading: false, chosen: res.data.rows.map((row) => ({ menu: row, quantity: 0 })) });
            }).catch((err) => {
                this.setState({ loading: false });
                errorHandler(err, this.props.notifSystem);
            });
        });
    }

    _choose(key, action) {
        const { chosen } = this.state;
        if (action === 'add') {
            chosen[key].quantity = chosen[key].quantity + 1;
        } else {
            const { chosen } = this.state;
            if (chosen[key].quantity > 0)
                chosen[key].quantity = chosen[key].quantity - 1;
        }
        this.setState({ chosen });
    }

    _getAllChosen() {
        const { chosen } = this.state;
        return chosen.filter((c) => c.quantity > 0);
    }

    _getNumberOfChosen() {
        let number = 0;
        this._getAllChosen().forEach((c) => {
            number += c.quantity;
        });
        return number;
    }

    _getTotalPrice() {
        let price = 0;
        this._getAllChosen().forEach((c) => {
            price += parseInt(c.menu.price, 10) * parseInt(c.quantity, 10);
        });
        return price;
    }

    _proceedOrder() {
        this.setState({ confirmModal: true });
    }

    render() {
        const { menus, chosen, confirmModal } = this.state;
        return (
            <div className="content solid">
                {
                    this.state.loading ? <CustomLoading /> :
                        (
                            <Row>
                                <Col md={12}>
                                    <Card
                                        title="Daftar Menu"
                                        content={
                                            <Row>
                                                <div className="search-container">
                                                    <FormControl color="#ffeaa7" placeholder="cari menu..." />
                                                </div>
                                                {menus.map((menu, k) => (
                                                    <Col lg={3} md={3} sm={4} xs={6} key={k}>
                                                        <div className={`menu-card ${chosen[k].quantity > 0 ? 'chosen' : ''}`}>
                                                            <div className="menu-card-background" style={{ backgroundImage: `url(data:image/jpeg;base64,${menu.image})`, backgroundSize: 'cover' }}>
                                                            </div>
                                                            <div className="menu-card-details">
                                                                <p>{menu.name}</p>
                                                                <span>Rp. {numeral(menu.price).format('0,0')}</span>
                                                            </div>
                                                            <div className="menu-card-action">
                                                                <button className="menu-ctrl-btn plus" onClick={() => this._choose(k, 'subtract')}>-</button>
                                                                <input className="menu-ctrl-input" readOnly value={chosen[k].quantity} />
                                                                <button className="menu-ctrl-btn min" onClick={() => this._choose(k, 'add')}>+</button>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                ))}
                                            </Row>
                                        }>
                                    </Card>
                                </Col>
                            </Row>
                        )
                }
                <div onClick={this._proceedOrder.bind(this)} className={`proceed-order-btn ${this._getNumberOfChosen() > 0 ? 'show' : ''}`}>
                    <div className="">
                        <b>{this._getNumberOfChosen()} item | Rp. {numeral(this._getTotalPrice()).format('0,0')} (est)</b><br />
                        <i className="pe-7s-angle-right"></i> Klik untuk konfirmasi order
                    </div>
                </div>
                <Modal show={confirmModal} onHide={() => this.setState({ confirmModal: false })}>
                    <Modal.Header closeButton>
                        Konfirmasi Order
                    </Modal.Header>
                    <Modal.Body>
                        <OrderConfirm onComplete={() => {
                            swal('Order Selesai', 'Pesanan berhasil terkirim ke dapur. Mohon pantau prosesnya di menu `Pantau Order`', 'success').then(() => {
                                this.setState({ confirmModal: false }, () => {
                                    this._fetch();
                                });
                            });
                        }} {...this.props} orders={this._getAllChosen()} ordersCount={this._getNumberOfChosen()} totalPrice={this._getTotalPrice()} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}