
            import React from 'react';
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = {"ui":[{"name":"Input","desc":"输入框组件"}],"config":{}};
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            