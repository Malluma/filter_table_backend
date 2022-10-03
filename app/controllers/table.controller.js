const Table = require("../models/table.model.js");

//Создаем и сохраняем новый интервал
exports.add = (req, res) => {
  
  //  Валидизируем запрос
  if (!req.body) {
    res.status(400).send({
      message: "Не переданы данные в body!"
        });
  }

  let sendData = []

  req.body.forEach(element => {
    // создание интервала
    const tableItem = new Table({
      date: element.date,
      name: element.name,
      amount: element.amount,
      distance: element.distance,
    });

    Table.add(tableItem, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Произошла ошибка во время выполнения кода"
        });
      else sendData.push(data);
    }); 
  });

  res.send(sendData)

};

//  Найти записи по различным параметрам
exports.read = (req, res) => {

  //console.log(req.query)

  if (!req.query) {
    res.status(400).send({
      message: "Не переданы данные в query!"
    });
  }

  Table.read(req.query, (err, data) => {

    console.log(data)

    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Не найдено данных по такому набору параметров: ${req.query}.`
        });
      } 
    } else res.send(data);
  });
};