/**
 * Created by pinguo on 2017/7/18.
 * 工具模块
 */
const fs = require('fs');
const AdmZip = require('adm-zip');
const exec = require('child_process').exec;

module.exports = {

    /**
     * 获取局域网IP
     * TODO windows 系统获取不到？！
     * */
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

    // 将内容写入指定目录
    writeContentToDir (dir, content) {
        return new Promise((resolve = null, reject = null) => {
            fs.writeFile(dir, content, err => {
                if (err) {
                    return reject ? reject() : console.log('writeContentToDir', err);
                } else {
                    return resolve ? resolve() : console.log('writeContentToDir finished');
                }
            })
        })

    },

    /**
     * 输出JSX
     * @param config { Array } 配置参数
     * TODO 无状态组件
     * */
    outputJSX (config) {
        const configStr = JSON.stringify(config);

        return `
            import React from 'react';
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = ${configStr};
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            `
    },

    // 打包并编译JSX
    bundleJSX (callback) {
        const hash = + new Date();
        const webpackConfigPath = `${__dirname.replace('utils', '')}public/webpack.config.js`;
        const cmd = `export hash=${hash} && webpack --config ${webpackConfigPath}`;
        exec(cmd, err => {
            if (err) return console.log('bundleJSX', err);
            callback(hash);
        });
    },

    /**
     * 将输出的JSX写入到指定目录，并完成打包编译
     * @param dir { Str } 写入路径
     * @param tpl { Str } 写入模板
     * @param callback { Func } 写入完成回调
     *
     * */
    writeJSXToDirAndBundle (dir, tpl, callback) {
        this.writeContentToDir(dir, tpl)
            .then(() => this.bundleJSX(callback));
    },

    /**
     * 将文件压缩成zip包提供下载
     * TODO [该方案不对，压缩包里不是独立文件] http://cnodejs.org/topic/506094d001d0b80148194028
     * https://www.npmjs.com/package/adm-zip
     * @param fileList [Array] 需要压缩的文件路径
     * @param outputDir [Str] 压缩文件输出路径
     * */
    outputZip (fileList, outputDir) {
        const zip = new AdmZip();
        fileList.map(item => zip.addLocalFile(item));
        zip.writeZip(outputDir, zip.toBuffer());
    }
}

