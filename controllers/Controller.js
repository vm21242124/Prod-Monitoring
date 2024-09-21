const { elasticLogger } = require("../config/Logger");
const { fetchApiData } = require("../services/todoservice");

exports.getTodos=async(req, res) =>{
  const species = req.params.species;
  let results;
  try {
    results = await fetchApiData(species);
    if (results.length === 0) {
      elasticLogger.info("API returned an empty array");
      throw "API returned an empty array";
    }
    res.send({
      fromCache: false,
      data: results,
    });
  } catch (error) {
    elasticLogger.info("got error", error);
    res.status(404).send("Data unavailable");
  }
}
