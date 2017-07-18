
            import ReactDom from 'react-dom';
            import App from '../components/App.jsx';
            const config = [{"componentName":"Tree","options":{}}];
            
            ReactDom.render(
                <App config={config}/>,
                document.getElementById('app'));
            