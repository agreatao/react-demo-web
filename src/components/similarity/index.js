import React from "react";
import classnames from "classnames";
import "./style.less";

const Similarity = props => {
    const { percent, type } = props;
    let [int, float] = (percent && percent <= 1 ? percent * 100 : percent).toFixed(2).split(".") || ["0", "00"];
    return (
        <div className={classnames("similarity", "similarity-" + type)}>
            <span className="similarity-text">
                <span>{int}</span>.<span className="sub">{float}</span>%
            </span>
        </div>
    );
};

export default Similarity;
