const { json } = require("express");
const { elasticLogger } = require("../config/Logger");
const { redisClient } = require("../config/Redis");
const { fetchTodo, fetchAllTodos } = require("../services/todoservice");

exports.getAllTodos = async (req, res) => {
  const { refreshcache } = req.query;
  if (refreshcache) {
    let results = await fetchAllTodos();
    if (results.length === 0) {
      elasticLogger.info("API returned an empty array");
      return res.status(400).json("no data found");
    }

    await redisClient.set("todos", JSON.stringify(results));


    return res.send({
      fromCache: false,
      data: results,
    });
  }
  const data = await redisClient.get("todos");
  res.send({
    fromCache: true,
    data: JSON.parse(data),
  });
};

exports.getTodo = async (req, res) => {
  const { todoId } = req.params;
  const { refreshcache } = req.query;
  
  if (refreshcache) {
    let results = await fetchAllTodos();
    if (results.length === 0) {
      elasticLogger.info("API returned an empty array");
      return res.status(400).json("no data found");
    }

    await redisClient.set("todos", JSON.stringify(results));
    const todo = results.find((obj)=>obj.id==todoId);

    return res.send({
      fromCache: false,
      data: todo,
    });
  }
  
  const data = await redisClient.get(`todos`);

  const allTodos = JSON.parse(data);
  const todo = allTodos.find((obj)=>obj.id==todoId);

  res.status(200).json(todo);

};
