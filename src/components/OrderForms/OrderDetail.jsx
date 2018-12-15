import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import numeral from 'numeral';

export default class OrderDetail extends React.Component {


    _orderPrice() {
        let price = 0;
        this.props.order.order_items.map((item) => {
            price += parseInt(item.quantity) * parseInt(item.menu.price);
        });
        return price;
    }

    render() {
        const { order } = this.props;

        return (
            <div>
                <div className="order-detail-header">
                    <h3>{order.bill_number}</h3>
                    <hr />
                </div>
                <label><b>Menu</b></label>
                <Table>
                    <thead>
                        <tr>
                            <th>Gambar</th>
                            <th>Nama Menu</th>
                            <th>Jumlah Item</th>
                            <th>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            order.order_items.map((item, k) => (
                                <tr>
                                    <td><img style={{ width: '60px', height: '60px' }} src={`data:image/jpeg;base64,${item.menu.image}`} alt="foto" /></td>
                                    <td>{item.menu.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>Rp. {numeral(parseInt(item.quantity, 10) * parseInt(item.menu.price, 10)).format('0,0')}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <label><b>Deskripsi Tambahan</b></label>
                <textarea className="form-control" value={order.description} disabled></textarea><br />
                <Alert>
                    <label><b>Harga Pesanan</b></label>: Rp. {numeral(this._orderPrice()).format('0,0')}<br />
                    <label><b>Pajak</b></label>: 10% = Rp.({numeral(this._orderPrice() * (10 / 100)).format('0,0')})<br />
                    <label><b>Total Harga</b></label>: Rp. {numeral(this._orderPrice() + (this._orderPrice() * (10 / 100))).format('0,0')}<br />
                </Alert>
            </div>
        )
    }

}