const httpProxy = require("http-proxy");
const { elasticLogger } = require("../config/Logger");
const proxy = httpProxy.createProxy();

exports.ProxyMiddleware=(req,res)=>{
    const hostname = req.hostname;
    const subdomain = hostname.split(".")[0];
  
    switch (subdomain) {
      case "grafana":
        elasticLogger.info("Proxying to Grafana");
        proxy.web(req, res, { target: "http://localhost:3001" }, (err) => {
          if (err) {
            elasticLogger.info("Error proxying to Grafana:", err);
            res.status(502).send("Bad Gateway");
          }
        });
        break;
      case "prometheus":
        elasticLogger.info("Proxying to Grafana");
        proxy.web(req, res, { target: "http://localhost:9090" }, (err) => {
          if (err) {
            elasticLogger.info("Error proxying to Grafana:", err);
            res.status(502).send("Bad Gateway");
          }
        });
        break;
      case "kibana":
        elasticLogger.info("Proxying to Grafana");
        proxy.web(req, res, { target: "http://localhost:5601" }, (err) => {
          if (err) {
            elasticLogger.info("Error proxying to Grafana:", err);
            res.status(502).send("Bad Gateway");
          }
        });
        break;
      case "elastic":
        elasticLogger.info("Proxying to Grafana");
        proxy.web(req, res, { target: "http://localhost:9200" }, (err) => {
          if (err) {
            elasticLogger.info("Error proxying to Grafana:", err);
            res.status(502).send("Bad Gateway");
          }
        });
        break;
      default:
        elasticLogger.info("No matching subdomain, sending 404");
        res.status(404).send("Subdomain not recognized");
    }
}
proxy.on("error", (err, req, res) => {
    elasticLogger.info("Proxy error:", err);
    res.status(500).send("Internal Server Error");
  });