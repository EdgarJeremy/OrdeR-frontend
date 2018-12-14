import React from 'react';
import { Grid, Row, Col, Table, Button, FormControl, Modal } from "react-bootstrap";
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import Card from "components/Card/Card.jsx";
import { User as mUser } from '../../services/request';
import errorHandler from '../../services/errorHandler';
import CustomLoading from 'components/CustomLoading/CustomLoading';
import UserAdd from '../../components/UserForms/UserAdd';


export default class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addModal: false,
            users: [],
            loading: false
        }
    }

    componentDidMount() {
        this._fetch();
    }

    _fetch() {
        this.setState({ loading: true }, () => {
            mUser.findAll().then((res) => {
                this.setState({ users: res.data.rows, loading: false });
            }).catch((err) => {
                this.setState({ loading: false });
                errorHandler(err, this.props.notifSystem);
            });
        });
    }

    _showModal() {
        this.setState({ addModal: true });
    }

    _hideModal() {
        this.setState({ addModal: false });
    }

    render() {
        const { addModal, users } = this.state;
        return (
            <div className="content solid">
                {
                    this.state.loading ? <CustomLoading contained /> :
                        (
                            <Grid fluid>
                                <Row>
                                    <Col md={12}>
                                        <Card
                                            title="Daftar Pengguna"
                                            ctTableFullWidth
                                            ctTableResponsive
                                            content={
                                                <div>
                                                    <div className="search-container">
                                                        <FormControl color="#ffeaa7" placeholder="cari menu..." /><br />
                                                        <Button onClick={this._showModal.bind(this)}><i className="pe-7s-plus"></i> Tambah Pengguna</Button>
                                                    </div>
                                                    <Table striped hover>
                                                        <thead>
                                                            <tr>
                                                                <th>Nama</th>
                                                                <th>Username</th>
                                                                <th>Tipe</th>
                                                                <th>Waktu Diinput</th>
                                                                <th></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {users.map((user, i) => (
                                                                <tr key={i}>
                                                                    <td>{user.name}</td>
                                                                    <td>{user.username}</td>
                                                                    <td>{(user.type === 'food' ? 'Dapur(Makanan)' : (user.type === 'beverage' ? 'Dapur(Minuman)' : (user.type === 'order' ? 'Order' : (user.type === 'cashier' ? 'Kasir' : 'Administrator'))))}</td>
                                                                    <td>{moment(user.created_at).format('Do MMMM YYYY, h:mm:ss a')}</td>
                                                                    <td>
                                                                        <Button bsStyle="primary"><i className="pe-7s-pen"></i> Edit</Button>&nbsp;
                                                            <Button bsStyle="danger"><i className="pe-7s-trash"></i> Hapus</Button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            }
                                        />
                                    </Col>
                                </Row>
                            </Grid>
                        )
                }
                <Modal show={addModal} onHide={this._hideModal.bind(this)}>
                    <Modal.Header closeButton>
                        Tambah Pengguna
                    </Modal.Header>
                    <Modal.Body>
                        <UserAdd {...this.props} onComplete={() => {
                            swal('Pengguna Tersimpan', 'Pengguna baru sudah tersimpan', 'success').then(() => {
                                this._fetch();
                                this._hideModal();
                            });
                        }} />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }

}