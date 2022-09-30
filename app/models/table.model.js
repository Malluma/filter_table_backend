const sql = require("./db.js");

 // конструктор интервала
 const Table = function(tableItem) {
    this.date = tableItem.date;
    this.name = tableItem.name;
    this.amount = tableItem.amount;
    this.distance = tableItem.distance;
  }

  Table.add = (newItem, result) => {
    sql.query("INSERT INTO filter_table SET ?", newItem, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }else{
        console.log("Добавлен интервал: ", newItem);
        result(null, newItem);}
    });
  };

  Table.read = (params, result) => {
    
    let sqlWhere = '';
    let values = [];

    if (params.hasOwnProperty("user_id")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} user_id = ?`;
      values.push(params.user_id);
    }

    if (params.hasOwnProperty("activity_type")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} activity_type = ?`;
      values.push(params.activity_type);
    }

    if (params.hasOwnProperty("interval_start")) {
      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} interval_start >= ?`;
      values.push(params.interval_start);
    }
    
    sql.query(`SELECT *, DATE_FORMAT(date_, '%Y-%m-%d') as DateYYMMDD FROM filter_table ${sqlWhere} ORDER BY date_`, values, (err, res) => {
      //операция вставки из SQL
      if (err) {
        console.log("error: ", err);
        result(err, null);
        //немного бедная обработка ошибок, но на первое время хватит
        return;
      }
      else{
        console.log("Успешно прочитаны данные по параметрам: ", params);
        result(null, res);
      }
    });
  };

  module.exports = Table;