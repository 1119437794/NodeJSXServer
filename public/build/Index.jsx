
            import React from 'react';
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = {"ui":[{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"},{"name":"ListView","desc":"列表组件"},{"name":"Btn","desc":"按钮组件"},{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"},{"name":"Input","desc":"输入框组件"}],"config":{"0":{"title":"昵称","placeholder":"CAMERA360","dataIn":"","dataOutput":"","W":100,"H":40,"X":100,"Y":100}}};
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            