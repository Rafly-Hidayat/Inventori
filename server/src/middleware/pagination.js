const mysql = require('mysql')

// create mysql pool for multiple connections
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "db_inventori",
  multipleStatements: true
})

function pagination(param, res, table, column){
   if(param.page == null || param.limit == null || param.limit == '' || param.page == '') {
       page = 1
       limit = 5
   } else {
       page = parseInt(param.page)
       limit = parseInt(param.limit)
   }
   
   if(param.sort == null) {
      return res.send("error", 400)
   } else if(param.sort == ''){
       sort = column[0]
   } else {
       sort = param.sort
   }

   let search = param.search

   pool.getConnection((err, connection) => {
       connection.query(`SELECT * FROM ${table}`, (err, rows) => {
           // calculate offset
           const offset = (page - 1) * limit
           const pageLimit = Math.ceil(rows.length/parseInt(limit))

           if(page > pageLimit) return res.send('not found.', 404)
           // query for fetching data with page number and offset
           const query = `select * from ${table} WHERE ${column[1]} LIKE '%${search}%' ORDER BY ${sort} ASC LIMIT ${limit} OFFSET ${offset}`

           pool.getConnection(function(err, connection) {
                connection.query(query, function (error, results) {
                    // When done with the connection, release it.
                    connection.release();
                      if (error) throw error;
                    // create payload
                    var jsonResult = {
                    'pages': `${page} of ${pageLimit}`,
                    'results':results.length,
                    'data':results
                    }
            
                    // create response
                    var myJsonString = JSON.parse(JSON.stringify(jsonResult));
                    // return myJsonString
                    // res.statusMessage = `${model} for page ${page}`
                    // res.statusCode = 200;
                    res.json(myJsonString);
                    // res.end();
                })
            })
        })  
    })
  }

  module.exports = pagination