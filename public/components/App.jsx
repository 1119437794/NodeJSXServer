/**
 * @component App 根组件
 * */
import React, { Component } from 'react';
import './public.css';

const mockData = {
    0: [
        {
            ID: 1010,
            proName: 'MIX10'
        },
        {
            ID: 1011,
            proName: 'MIX11'
        },
        {
            ID: 2010,
            proName: 'MIX20'
        },
        {
            ID: 2011,
            proName: 'MIX22'
        },
    ],
    1: [
        {
            ID: 3010,
            proName: 'MIX10'
        },
        {
            ID: 3011,
            proName: 'MIX11'
        },
        {
            ID: 4010,
            proName: 'MIX20'
        },
        {
            ID: 4011,
            proName: 'MIX22'
        },
    ],
};

class App extends Component {

    constructor (props) {
        super(props);
        this.state = {};

        // 按需加载组件
        this.loadComponent = (comName) => {
            try {
                return require(`./${comName}/${comName}.jsx`).default;
            } catch (error) {
                console.log('App.jsx', `${comName}组件不存在！`);
                return null;
            }
        }
    }

    render () {
        const { ui, config } = this.props.config;

        if (!Array.isArray(ui)) return null;

        return (

            <div className="app_root">
            {
                // 根据JSON还原界面
                ui.map((item, index) => {
                    const comName = item.name; // 组件名称
                    const comNo = `${comName}_${index}`; // 组件编号
                    const configItem = Object.assign({}, config[index]); // 相应的配置信息
                    const Child = this.loadComponent(comName); // 根据组件名称加载组件

                    // 样式信息
                    const style = {
                        minWidth: configItem.W + 'px',
                        minHeight: configItem.H + 'px',
                        transform: `translate(${configItem.X}px, ${configItem.Y}px)`
                    }

                    // 删除不必要的props
                    delete configItem.X;
                    delete configItem.Y;
                    delete configItem.W;
                    delete configItem.H;

                    // 针对dataIn dataOutput做转换处理，绑定到store上去
                    const { dataIn, dataOutput } = configItem;
                    if (dataIn) {
                        const tmpDataIn = this.state[dataIn];
                        this.state[comNo] = tmpDataIn;
                        configItem.dataIn = tmpDataIn;
                    }

                    if (dataOutput) {
                        configItem.dataOutput = (val) => {
                            if (configItem.API) {
                                // TODO 发一个请求
                                console.log('state', this.state);
                                this.setState({
                                    [dataOutput]: mockData[this.state[dataIn]] // 根据输入参数请求接口，然后返回对应数据
                                })
                            } else {
                                this.setState({
                                    [dataOutput]: val
                                })
                            }
                        };
                    }

                    return (
                        <Child
                            key = {index}
                            style = {style}
                            {...configItem}
                        >
                        </Child>
                    )
                })
            }
        </div>
        )
    }
}

export default App;