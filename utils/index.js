/**
 * Created by pinguo on 2017/7/18.
 * 工具模块
 */
const fs = require('fs');
const exec = require('child_process').exec;

module.exports = {

    // 获取局域网IP
    getLANIP () {
        let iptable = {};
        const os = require('os');
        const ifaces = os.networkInterfaces();

        for (let dev in ifaces) {
            ifaces[dev].forEach((details) => {
                if (details.family === 'IPv4') {
                    iptable[dev] = details.address;
                }
            });
        }

        return iptable;
    },

    /**
     * 输出JSX
     * @param config { Array } 配置参数
     * TODO 无状态组件
     * */
    outputJSX (config) {
        const configStr = JSON.stringify(config);

        return `
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = ${configStr};
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            `
    },

    /**
     * 将模板写入到指定目录
     * @param dir { Str } 写入路径
     * @param tpl { Str } 写入模板
     * @param callback { Func } 写入完成回调
     *
     * */
    writeFileToDir (dir, tpl, callback) {
        fs.writeFile(dir, tpl, err => {
            if (err) return console.log('writeFileToDir', err);

            this.bundleJSX(callback);
        })
    },

    // 打包并编译JSX
    bundleJSX (callback) {
        const webpackConfigPath = `${__dirname.replace('utils', '')}public/webpack.config.js`;
        const cmd = `webpack --config ${webpackConfigPath}`;
        exec(cmd, err => {
            if (err) return console.log('bundleJSX', err);
            callback();
        });
    }
}

