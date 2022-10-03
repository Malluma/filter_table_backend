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
    let sqlLimit = '';
    let values = [];
    
    //Filter params
    if (params.hasOwnProperty("filterField")) {      
      let value = params.filterValue;

      if(params.filterType === 'LIKE'){
        value = `\%${value}\%`;
      }

      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} ${params.filterField} ${params.filterType} ?`;
      values.push(value);
    }
    
    //Pagination params
    if (params.hasOwnProperty("currentPage")) { 
      const count = Number(params.count);
      const startFromRecord = Number(params.currentPage) * count;
      sqlLimit = `LIMIT ?, ?`;
      values.push(startFromRecord);
      values.push(count);
    }

    let totalCount = 0;

    sql.query(`SELECT COUNT(*) as totalCount FROM filter_table ${sqlWhere}`, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else{
        totalCount = res[0].totalCount;
        console.log("Успешно посчитано количество всех записей по параметрам: ", totalCount);
      }
    });

    sql.query(`SELECT *, DATE_FORMAT(date_, '%Y-%m-%d') as DateYYMMDD FROM filter_table ${sqlWhere} ORDER BY date_ ${sqlLimit}`, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else{
        console.log("Успешно прочитаны данные по параметрам: ", params);
        const data = {data: res, totalCount: totalCount}
        console.log('data')
        console.log(data)

        result(null, data);
      }
    });

  };
 
  module.exports = Table;