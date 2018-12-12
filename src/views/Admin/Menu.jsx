import React from 'react';
import { Grid, Row, Col, Table, Button, FormControl } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

export default class Menu extends React.Component {

    render() {
        return (
            <div className="content solid">
                <Grid fluid>
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
                                            <Button><i className="pe-7s-plus"></i> Tambah Menu</Button>
                                        </div>
                                        <Table striped hover>
                                            <thead>
                                                <tr>
                                                    <th>Foto</th>
                                                    <th>Nama Menu</th>
                                                    <th>Harga</th>
                                                    <th>Tipe</th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.from(new Array(10)).map((e, i) => (
                                                    <tr>
                                                        <td>
                                                            <img src={`https://picsum.photos/100/100?t=${Math.random()}`} alt="" />
                                                        </td>
                                                        <td>Nasi Goreng</td>
                                                        <td>Rp. 25,000</td>
                                                        <td>Makanan</td>
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
            </div>
        )
    }

}