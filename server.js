/**
 * Created by pinguo on 2017/7/18.
 * Node服务
 */
const express = require('express');
const bodyParser = require('body-parser');
const utils = require(__dirname + '/utils');
const app = express();
let bundleJSUrl = ''; // bundle.js输出路径

// 中间件处理
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

// CORS
// app.all('*', function(req, res, next) {
//     res.header({
//         'Access-Control-Max-Age' : '60',
//         'Access-Control-Allow-Origin'  : '*',
//         'Access-Control-Allow-Credentials' : 'true',
//         'Access-Control-Allow-Methods' : 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     });
//     next();
// });

// 根据配置项打包输出bundle
app.post('/postPageConfig', (req, res) => {

    // 根据配置项输出JSX
    const JSXTpl = utils.outputJSX(req.body);

    // 将JSX写入文件并完成打包编译
    utils.writeJSXToDirAndBundle(__dirname + '/public/build/Index.jsx', JSXTpl, (hash) => {
        // 1.返给前台bundle.js 的 url
        // 2.调整需要输出的html中js路径，提供用户下载文件
        bundleJSUrl = `/asserts/bundle.${hash}.js`;
        res.redirect(301, 'http://127.0.0.1:8081/asserts/bundle.html');
        // res.json({
        //     componentName: req.body.componentName,
        //     url: bundleJSUrl,
        //     msg: 'ok'
        // })
    });
});
// 提供导出资源包
app.get('/download', (req, res) => {
    const downloadUrl = __dirname + '/public/asserts.zip';
    const fileList = [
        __dirname + '/public/asserts/bundle.html',
        __dirname + '/public/asserts/lib.js',
        __dirname + '/public' + bundleJSUrl];
    utils.outputZip(fileList, downloadUrl);
    res.download(downloadUrl, 'download.zip', err => {
        if(err) return console.log('download', err);
    });
})

const server = app.listen(8081, () => {
    const port = server.address().port;
    const ipInfo = utils.getLANIP();
    const logInfo = `server on ${ipInfo.lo0}:${port}\nserver on ${ipInfo.en1}:${port}`;

    console.log(logInfo);
});




