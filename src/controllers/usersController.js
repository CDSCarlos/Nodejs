const { getConnection, sql } = require('../db');

exports.getUsers = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Users');
    res.json(result.recordset);
};

exports.getUser = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request()
        .input("Id", sql.Int, id)
        .query('SELECT * FROM Users WHERE Id = @Id');
    res.json(result.recordset[0] || {});
};

exports.createUser = async (req, res) => {
    const { Name, Email } = req.body;
    const pool = await getConnection();
    await pool.request()
        .input("Name", sql.NVarChar, Name)
        .input("Email", sql.NVarChar, Email)
        .query('INSERT INTO Users (Name, Email) VALUES (@Name, @Email)');
    res.json({ message: 'User created successfully' });
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { Name, Email } = req.body;
    const pool = await getConnection();
    await pool.request()
        .input("Id", sql.Int, id)
        .input("Name", sql.NVarChar, Name)
        .input("Email", sql.NVarChar, Email)
        .query('UPDATE Users SET Name=@Name, Email=@Email WHERE Id=@Id');
    res.json({ message: 'User updated successfully' });
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    await pool.request()
        .input("Id", sql.Int, id)
        .query('DELETE FROM Users WHERE Id=@Id');
    res.json({ message: 'User deleted successfully' });
};
