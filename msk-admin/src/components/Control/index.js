import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Icon } from "antd";
import classnames from "classnames";
import "./index.less";

function XControl({ dispatch, filter, onAdd, onDelete }) {

    let filterRef = React.createRef();

    const [filterVisible, setFilterVisible] = useState(true);

    useEffect(() => {
        let height = filterRef.current.offsetHeight;
        dispatch({ type: CONTROL_RESIZE, payload: { height } })
    })

    return <div className="x-control">
        <div className="x-control-bars">
            <div>
                {onAdd && <a onClick={onAdd}><Icon type="plus" />新增</a>}
                {onDelete && <a onClick={onDelete}><Icon type="delete" />删除</a>}
            </div>
            <div>
                {
                    filter &&
                    <a
                        className={classnames("filter-btn", {
                            visible: filterVisible
                        })}
                        onClick={() => setFilterVisible(!filterVisible)}>
                        <Icon type="filter" theme="filled" />
                    </a>
                }
            </div>
        </div>
        <div className="x-control-filter" ref={filterRef}>
            {filterVisible && filter}
        </div>
    </div>
}

export default connect()(XControl);

const NAMESPACE = "control";
const CONTROL_RESIZE = "@@CONTROL/CONTROL_RESIZE"

export const createXControl = (opts = {}) => {
    const namespace = opts.namespace || NAMESPACE;

    const { only = [], except = [] } = opts;
    if (only.length > 0 && except.length > 0) {
        throw Error('It is ambiguous to configurate `only` and `except` items at the same time.');
    }

    const initialState = {
        height: 40
    }

    const extraReducers = {
        [namespace](state = initialState, { type, payload }) {
            switch (type) {
                case CONTROL_RESIZE:
                    return { ...state, height: payload.height + 40 };
                default:
                    return state;
            }
        }
    }

    return {
        extraReducers
    }
}