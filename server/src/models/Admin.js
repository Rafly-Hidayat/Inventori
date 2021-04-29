

module.exports = {
    get : (con, callback) => {
        con.query(`SELECT kd_admin, nama, email, gambar FROM admin`, callback)
    },

    getAll : (con, data, limit, offset, callback) => {
        const query = `SELECT kd_admin, nama, email, gambar FROM admin WHERE
                        kd_admin LIKE '%${data.search}%' OR
                        nama LIKE '%${data.search}%' OR
                        email LIKE '%${data.search}%'
                        ORDER BY ${data.sort} ${data.order}
                        LIMIT ${limit} OFFSET ${offset}`
        con.query(query, callback)
    },

    getById : (con, id, callback) => {
        const query = `SELECT kd_admin, nama, email, gambar FROM admin WHERE kd_admin = ${id}`
        con.query(query, callback)
    },

    update : (con, data, id, res, callback) => {
        con.query(`SELECT * FROM admin WHERE kd_admin = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id admin tidak ditemukan.', 404)	
			const query = `UPDATE admin SET
					nama = '${data.nama}',
					email = '${data.email}'
					WHERE kd_admin = ${id}`
			con.query(query, callback)
        })
    },

    delete : (con, id, res, callback) => {
        con.query(`SELECT * FROM admin WHERE kd_admin = ${id}`, (e, rows) => {
			if(e) throw e
			if(rows == 0) return res.send('id admin tidak ditemukan.', 404)
        const query = `DELETE FROM admin WHERE kd_admin = ${id}`
        con.query(query, callback)
        })
    }
}