app.post('/user/register', (req, res) => {
    const { firstName, lastName, email, password, mobile, birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile,birth) VALUES(?,?,?,?,?,?)`
    pool.query(
        sql,
        [firstName, lastName, email, password, mobile, birth],
        (error, data) => {
            if (data) {
                res.send({ status: "success", data: data });
            }
            res.send({ status: "error", error: error })
        }
    )
})