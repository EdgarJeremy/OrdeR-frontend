import React from 'react';
import moment from 'moment';
import 'moment/locale/id';

import Card from "components/Card/Card.jsx";
import CustomLoading from 'components/CustomLoading/CustomLoading';
import { FormControl, Modal } from 'react-bootstrap';
import { Order } from '../../services/request';
import errorHandler from '../../services/errorHandler';
import OrderDetail from '../../components/OrderForms/OrderDetail';

export default class Monitor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            orders: [],
            detailOrder: {},
            detailModel: false
        }
    }

    componentDidMount() {
        this._fetch();
    }

    _fetch() {
        this.setState({ loading: true }, () => {
            Order.findAll().then((res) => {
                this.setState({ orders: res.data.rows, loading: false });
            }).catch((err) => {
                this.setState({ loading: false });
                errorHandler(err, this.props.notifSystem);
            });
        });
    }

    _onDetail(order) {

    }

    render() {
        const { orders, detailOrder, detailModel } = this.state;
        return (
            <div className="content solid">
                {
                    this.state.loading ? <CustomLoading /> :
                        (
                            <Card
                                title="Daftar Order"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                        <div className="search-container">
                                            <FormControl color="#ffeaa7" placeholder="cari order..." /><br />
                                        </div>
                                        <div className="monitor">
                                            <div className="monitor-item-header">
                                                <div className="col-md-2">
                                                    <b>Gambar</b>
                                                </div>
                                                <div className="col-md-2">
                                                    <b>Nomor Nota</b>
                                                </div>
                                                <div className="col-md-2">
                                                    <b>Status</b>
                                                </div>
                                                <div className="col-md-2">
                                                    <b>Jumlah Order</b>
                                                </div>
                                                <div className="col-md-2">
                                                    <b>Waktu Order</b>
                                                </div>
                                                <div className="col-md-2">
                                                    <b>Pilihan</b>
                                                </div>
                                            </div>
                                            {
                                                orders.map((order, k) => (
                                                    <div className="monitor-item" key={k}>
                                                        <div className="col-md-2">
                                                            <div className="menu-order-avatars">
                                                                {
                                                                    order.order_items.slice(0, 3).map((item, k) => (
                                                                        <img key={k} src={`data:image/jpeg;base64,${item.menu.image}`} alt={item.menu.name} />
                                                                    ))
                                                                }
                                                                {
                                                                    order.order_items.length > 3 && (
                                                                        <span className="menu-order-avatars-placeholder">
                                                                            <b>+{order.order_items.length - 3}</b>
                                                                        </span>
                                                                    )
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <span>
                                                                {order.bill_number}
                                                            </span>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <span>
                                                                <span className="batch-order-status">{order.status.toUpperCase()}</span>
                                                            </span>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <span>
                                                                {order.order_items.length} menu
                                                            </span>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <span>
                                                                {moment(order.created_at).format('M/d h:mm a')}
                                                            </span>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <span>
                                                                <a onClick={() => this.setState({ detailOrder: order, detailModel: true })} href="javascript:void(0)">Lihat detail</a>
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            />
                        )
                }
                <Modal show={detailModel} onHide={() => this.setState({ detailModel: false })}>
                    <Modal.Header closeButton>
                        Detail Order
                    </Modal.Header>
                    <Modal.Body>
                        {detailOrder && <OrderDetail order={detailOrder} />}
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}