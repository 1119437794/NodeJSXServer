
            import React from 'react';
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = [{"componentName":"Hello","options":{}}];
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            