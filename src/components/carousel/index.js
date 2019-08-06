import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import "./style.less";

class RepeatCarousel extends React.Component {
    static propTypes = {
        height: PropTypes.number,
        children: PropTypes.node
    };
    constructor(props) {
        super(props);
        this.currentTop = [0, 0];
        this.wrappers = [];
    }
    componentDidMount() {
        const { children, height } = this.props;
        const { wrapper } = this.refs;
        let container = document.createElement("div");
        ReactDOM.render(children, container);
        wrapper.appendChild(container);
        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.container_height = container.offsetHeight;
            if (!height) {
                wrapper.style.height = this.container_height + "px";
            }
            if (height && this.container_height > height) {
                this.currentTop[0] = -this.container_height;
                container.style.top = this.currentTop[0] + "px";
                this.wrappers.push(container);

                container = document.createElement("div");
                ReactDOM.render(children, container);
                wrapper.appendChild(container);
                container.style.top = this.currentTop[1] + "px";
                this.wrappers.push(container);

                this.setInterval();
            }
        }, 0);
    }
    setInterval() {
        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            if (!this.pause) {
                this.wrappers.forEach((wrapper, index) => {
                    if (--this.currentTop[index] < -this.container_height) {
                        this.currentTop[index] = this.container_height - 1;
                    }
                    wrapper.style.top = this.currentTop[index] + "px";
                });
            }
            this.setInterval();
        }, 50);
    }
    render() {
        const { height } = this.props;
        return (
            <div
                className={classnames("carousel-slide", {
                    "carousel-overflow": height != null
                })}
                style={{ height }}
                ref="wrapper"
                onMouseOver={() => {
                    this.pause = true;
                }}
                onMouseOut={() => {
                    this.pause = false;
                }}
            />
        );
    }
}

export default RepeatCarousel;
