/**
 * @component App 根组件
 * */
import React, { Component } from 'react';

class App extends Component {
    render () {
        const config = this.props.config;

        if (!Array.isArray(config)) return null;

        return (

            <div className="app_root">
            {
                config.map((item, index) => {
                    let Child = null;
                    const props = item.options;
                    const componentName = item.componentName;

                    try {
                        // TODO 使用import
                        Child = require(`./${componentName}/${componentName}.jsx`).default;
                    } catch (error) {
                        console.log('App.jsx', `${componentName}组件不存在！`)
                        return null;
                    }

                    return <Child
                        key={index}
                        {...props}
                    />
                })
            }
        </div>
        )
    }
}

export default App;