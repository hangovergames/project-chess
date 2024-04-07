const REACT_APP_BACKEND_TARGET_URL = process?.env?.REACT_APP_BACKEND_TARGET_URL ?? 'http://localhost:3001';

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: REACT_APP_BACKEND_TARGET_URL,
            changeOrigin: true,
            autoRewrite: true,
            //protocolRewrite: 'http',
            pathRewrite: {
                ['^/api'] : ''
            }
        })
    );
};
