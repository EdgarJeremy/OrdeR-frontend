import React from 'react';
import { Grid, Row, Col, Table, Button, FormControl, Modal } from "react-bootstrap";
import swal from 'sweetalert';
import moment from 'moment';
import 'moment/locale/id';
import Card from "components/Card/Card.jsx";
import MenuAdd from '../../components/MenuForms/MenuAdd';
import { Menu as mMenu } from '../../services/request';
import errorHandler from '../../services/errorHandler';
import CustomLoading from 'components/CustomLoading/CustomLoading';

export default class Menu extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			addModal: false,
			menus: [],
			loading: false
		}
	}

	componentDidMount() {
		this._fetch();
	}

	_fetch() {
		this.setState({ loading: true }, () => {
			mMenu.findAll().then((res) => {
				this.setState({ menus: res.data.rows, loading: false });
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
		const { addModal, menus } = this.state;
		return (
			<div className="content solid">
				{
					this.state.loading ? <CustomLoading /> :
						(
							<Row>
								<Col md={12}>
									<Card
										title="Daftar Menu"
										ctTableFullWidth
										ctTableResponsive
										content={
											<div>
												<div className="search-container">
													<FormControl color="#ffeaa7" placeholder="cari menu..." /><br />
													<Button onClick={this._showModal.bind(this)}><i className="pe-7s-plus"></i> Tambah Menu</Button>
												</div>
												<Table striped hover>
													<thead>
														<tr>
															<th>Foto</th>
															<th>Nama Menu</th>
															<th>Harga</th>
															<th>Tipe</th>
															<th>Waktu Diinput</th>
															<th></th>
														</tr>
													</thead>
													<tbody>
														{menus.map((menu, i) => (
															<tr key={i}>
																<td>
																	<img width="100px" height="100px" src={`data:image/jpeg;base64,${menu.image}`} alt="" />
																</td>
																<td>{menu.name}</td>
																<td>Rp. {menu.price}</td>
																<td>{menu.type === 'food' ? 'Makanan' : 'Minuman'}</td>
																<td>{moment(menu.created_at).format('Do MMMM YYYY, h:mm:ss a')}</td>
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
						)
				}
				<Modal show={addModal} onHide={this._hideModal.bind(this)}>
					<Modal.Header closeButton>
						Tambah Menu
					</Modal.Header>
					<Modal.Body>
						<MenuAdd {...this.props} onComplete={() => {
							swal('Menu Tersimpan', 'Menu baru sudah tersimpan', 'success').then(() => {
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