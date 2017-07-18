/**
 * Created by pinguo on 2017/7/18.
 * Node服务
 */

const express = require('express');
const bodyParser = require('body-parser');
const utils = require(__dirname + '/utils');
const app = express();

// 中间件处理
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));

// API调用
app.post('/postPageConfig', (req, res) => {

    // 根据配置项输出JSX
    const JSXTpl = utils.outputJSX([
        {
            componentName: req.body.componentName,
            options: {}
        }
    ]);

    // 将JSX写入文件并完成打包编译
    utils.writeFileToDir(__dirname + '/public/build/Index.jsx', JSXTpl, () => res.json({
        componentName: req.body.componentName,
        msg: 'ok'
    }));
})

const server = app.listen(8081, () => {
    const port = server.address().port;
    const ipInfo = utils.getLANIP();
    const logInfo = `server on ${ipInfo.lo0}:${port}\nserver on ${ipInfo.en1}:${port}`;

    console.log(logInfo);
});




