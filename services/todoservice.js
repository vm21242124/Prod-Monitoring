const { default: axios } = require("axios");
const { elasticLogger } = require("../config/Logger");

async function fetchTodo(todoId) {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  elasticLogger.info("Request sent to the API");
  return apiResponse.data;
}
async function fetchAllTodos(todoId) {
  const apiResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );
  elasticLogger.info("Request sent to the API");
  return apiResponse.data;
}
module.exports={fetchAllTodos,fetchTodo}