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
    let sqlSort = '';
    let sqlLimit = '';
    let values = [];
    let filterValues = [];
    
    //Filter params
    if (params.hasOwnProperty("filterField")) {      
      let value = params.filterValue;

      if(params.filterType === 'LIKE'){
        value = `\%${value}\%`;
      }

      sqlWhere = `${sqlWhere} ${(sqlWhere === '')? 'WHERE ' : "and "} ${params.filterField} ${params.filterType} ?`;
      filterValues.push(value);
    }

    values = [...filterValues, ...filterValues]


    //Sort param
    if (params.hasOwnProperty("sortField") && params.sortField !== 'DEFAULT') {
      sqlSort = `ORDER BY ${params.sortField}`;      
      //values.push(params.sortField);
    }

    //Pagination params
    if (params.hasOwnProperty("currentPage")) { 
      const count = Number(params.count);
      const startFromRecord = Number(params.currentPage) * count;
      sqlLimit = `LIMIT ?, ?`;
      values.push(startFromRecord);
      values.push(count);
    }

    const totalCountSelect = `SELECT COUNT(*) as totalCount FROM filter_table ${sqlWhere}`;
    const filteredDataSelect = `SELECT *, DATE_FORMAT(date_, '%Y-%m-%d') as DateYYMMDD FROM filter_table ${sqlWhere} ${sqlSort} ${sqlLimit}`;

    sql.query(`${totalCountSelect};${filteredDataSelect}`, values, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      else{
        console.log("Успешно прочитаны данные по параметрам: ", params);
        const data = {totalCount: res[0][0].totalCount, data: res[1]}
        result(null, data);
      }
    });

  };
 
  module.exports = Table;