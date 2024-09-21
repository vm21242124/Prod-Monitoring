async function fetchApiData(species) {
  const apiResponse = await axios.get(
    `https://www.fishwatch.gov/api/species/${species}`
  );
  elasticLogger.info("Request sent to the API");
  return apiResponse.data;
}


module.exports={fetchApiData}