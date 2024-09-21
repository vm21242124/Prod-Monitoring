const express = require("express");
const route = require("./routes/Routes.js");

const { ErrorHandler } = require("./middelware/ErrorHandler.js");
const { AuditMiddleware } = require("./middelware/AuditMiddleware.js");
const { elasticLogger } = require("./config/Logger.js");
const { MetriceMiddleware } = require("./middelware/MetriceMiddleware.js");
const { register } = require("./config/PromClient.js");
const { ProxyMiddleware } = require("./middelware/ProxyMiddleware.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(AuditMiddleware);
app.use(ErrorHandler);
app.use(MetriceMiddleware);
app.use(ProxyMiddleware);

app.listen(port, () => {
  elasticLogger.info(`App listening on port ${port}`);
});
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});
app.use("/route", route);
