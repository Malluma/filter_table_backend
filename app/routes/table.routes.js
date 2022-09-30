module.exports = app => {
  //импортируем наш контроллер, что бы можно было передать им функции по запросу
  const table = require("../controllers/table.controller.js");

  app.post("/table", table.add);

  app.get("/table", table.read);

  //app.delete("/intervals/:intervalId", intervals.delete);

  //app.put("/intervals/update", intervals.update);

};
