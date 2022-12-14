const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  app.use(
    "/ws-stomp",
    createProxyMiddleware({ target: "http://localhost:8080", ws: true })
  );
  app.use(
    "*",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
};