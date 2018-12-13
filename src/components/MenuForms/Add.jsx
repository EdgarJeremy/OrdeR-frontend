import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Modal } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Menu } from '../../services/request';
import errorHandler from '../../services/errorHandler';

export default class Add extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
            type: '',
            rawImage: '',
            rawImageProps: {
                width: 0,
                height: 0
            },
            rawImageCrop: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                aspect: 1
            },
            rawImageModal: false,
            image: '',
            loading: false
        }
    }

    _onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    _onChangeFile(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    this.setState({
                        rawImage: reader.result,
                        rawImageProps: {
                            width: img.width,
                            height: img.height
                        },
                        rawImageCrop: {
                            x: 0,
                            y: 0,
                            height: 100,
                            aspect: 1
                        },
                        rawImageModal: true
                    });
                }
            }
        }
    }

    _onSubmit(e) {
        e.preventDefault();
        const { name, price, type, image } = this.state;
        this.setState({ loading: true }, () => {
            Menu.create({ name, price, type, image: image.replace('data:image/jpeg;base64,', '') }).then((res) => {
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

    _onChangeCrop(crop, pixelCrop) {
        this.setState({ rawImageCrop: crop });
    }

    _onCompleteCrop(crop, pixelCrop) {
        const img = new Image();
        img.src = this.state.rawImage;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
            const base64 = canvas.toDataURL('image/jpeg');
            this.setState({
                image: base64
            });
        }
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
                            placeholder="Nama menu"
                            onChange={this._onChange.bind(this)}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Harga</ControlLabel>
                        <FormControl
                            name="price"
                            type="number"
                            value={this.state.price}
                            placeholder="Harga menu"
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
                            placeholder="Tipe menu"
                            onChange={this._onChange.bind(this)}>
                            <option value=""></option>
                            <option value="food">Makanan</option>
                            <option value="beverage">Minuman</option>
                        </FormControl>
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Foto</ControlLabel>
                        <FormControl
                            className="form-control"
                            componentClass="input"
                            accept="image/*"
                            type="file"
                            name="rawImage"
                            onChange={this._onChangeFile.bind(this)} />
                        <FormControl.Feedback />
                    </FormGroup>
                    {this.state.image && <img width="200px" height="200px" src={this.state.image} alt="Foto menu" />}
                    <hr />
                    <Button bsStyle="default" disabled={this.state.loading} type="submit">{this.state.loading ? 'Menyimpan...' : 'Simpan'}</Button>
                </form>
                <Modal show={this.state.rawImageModal}>
                    <Modal.Header>
                        Potong Gambar
                    </Modal.Header>
                    <Modal.Body style={{ textAlign: 'center' }}>
                        {this.state.rawImage && <ReactCrop src={this.state.rawImage} crop={this.state.rawImageCrop} onChange={this._onChangeCrop.bind(this)} onComplete={this._onCompleteCrop.bind(this)} />}
                        <div style={{ textAlign: 'center', marginTop: 10 }}>
                            <Button onClick={() => this.setState({ rawImageModal: false })}>Selesai</Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </div>
        )
    }

}