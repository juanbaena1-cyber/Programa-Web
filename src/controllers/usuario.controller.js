const listar = async (req, res) => {
  res.json({ mensaje: 'listar usuarios pendiente' });
};

module.exports = { listar };