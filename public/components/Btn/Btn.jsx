import React, { Component } from 'react';
import './Btn.scss';

class Btn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rootClassName: 'btn_root'
        }
    }

    render () {
        const {
            name,
            style,
            dataOutput,
            component_id
        } = this.props;
        const { rootClassName } = this.state;

        let fixedDataOutput = typeof dataOutput === 'function' ? dataOutput : () => console.log('默认输出回调')

        return (
            <button 
                ref={ ref => this.rootDom = ref }
                className={rootClassName}
                style={style}
                onClick={(e) => fixedDataOutput(e.target.value)}
            >
                {name}
                {
                    component_id ? <span className="com_id"> {component_id} </span> : null
                }
            </button>
        )
    }
}

Btn.defaultProps = {
    name: '确定',
    dataIn: '', // 输入源绑定
    dataOutput: '', // 输出源绑定
    API: '', // 接口提供 可选
    W: 90,
    H: 30
}

export default Btn;