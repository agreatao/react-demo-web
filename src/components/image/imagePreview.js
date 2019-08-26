import { Modal, Icon } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import entry from "utils/entry";
import { connect } from "react-redux";

const Image = connect(state => ({ browser: state.browser }))(
    class Image extends React.Component {
        state = {
            visible: false,
            width: 0,
            height: 0
        };
        handleLoad = e => {
            let imageWidth = 0,
                imageHeight = 0;
            let img = e.currentTarget;
            if (img) {
                imageWidth = img.width;
                imageHeight = img.height;
            }
            const { width, height } = this.props.browser;
            let containerWidth = width - 30,
                containerHeight = height - 30;
            let __radio = (imageHeight && imageWidth / imageHeight) || 0;
            let _radio = (containerHeight && containerWidth / containerHeight) || 0;
            let showWidth, showHeight;
            if (__radio > _radio) {
                showHeight = (__radio && containerWidth / __radio) || 0;
                showWidth = containerWidth;
            } else {
                showWidth = containerHeight * __radio;
                showHeight = containerHeight;
            }
            this.setState({ width: showWidth, height: showHeight, visible: true });
        };
        handleError = e => {
            console.log(e);
        };
        handleCancel = e => {
            e.preventDefault();
            this.setState({ visible: false });
        };
        render() {
            const { src } = this.props;
            const { width, height, visible } = this.state;
            return (
                <Modal
                    className="image-preview"
                    centered
                    getContainer={false}
                    footer={false}
                    maskClosable={false}
                    closable={false}
                    visible={visible}
                    onCancel={this.handleCancel}
                    afterClose={this.props.afterClose}
                    width={width + 30}
                >
                    {ReactDOM.createPortal(<Icon className="image-preview-close-btn" type="close-circle" onClick={this.handleCancel} />, document.body)}
                    <img src={src} style={{ width, height }} onLoad={this.handleLoad} onError={this.handleError} />
                </Modal>
            );
        }
    }
);

const IS_REACT_16 = !!ReactDOM.createPortal;

export default function imagePreview(src) {
    const div = document.createElement("div");
    document.body.appendChild(div);

    function destroy() {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div);
        }
    }

    function render(props) {
        entry(<Image {...props} afterClose={destroy} />, div);
    }

    render({ src });
}
