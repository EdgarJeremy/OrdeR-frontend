import React from 'react';
import { Grid, Row, Col, FormControl } from "react-bootstrap";
import Card from "components/Card/Card";

export default class Pick extends React.Component {

    render() {
        return (
            <div className="content solid">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Daftar Menu"
                                content={
                                    <Row>
                                        <div className="search-container">
                                            <FormControl color="#ffeaa7" placeholder="cari menu..." />
                                        </div>
                                        {Array.from(new Array(10)).map((i, k) => (
                                            <Col lg={3} md={3} sm={4} xs={6} key={k}>
                                                <div className="menu-card">
                                                    <div className="menu-card-background" style={{ backgroundImage: 'url(https://picsum.photos/300/300?t=' + Math.random() + ')', backgroundSize: 'cover' }}>
                                                    </div>
                                                    <div className="menu-card-details">
                                                        <p>Nasi Goreng</p>
                                                        <span>Rp. 25.000</span>
                                                    </div>
                                                    <div className="menu-card-action">
                                                        <button className="menu-ctrl-btn plus">-</button>
                                                        <input className="menu-ctrl-input" readOnly value={4} />
                                                        <button className="menu-ctrl-btn min">+</button>
                                                    </div>
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                }>
                            </Card>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }

}