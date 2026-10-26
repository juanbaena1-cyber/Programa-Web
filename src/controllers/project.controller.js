const createProject = async (req, res) => {
  res.status(201).json({ mensaje: 'crear proyecto pendiente', datos: req.body });
};

const updateProject = async (req, res) => {
  res.json({ mensaje: 'actualizar proyecto pendiente', datos: req.body });
};

const deleteProject = async (req, res) => {
  res.json({ mensaje: `eliminar proyecto ${req.params.id} pendiente` });
};

const getAllProjects = async (req, res) => {
  res.json({ mensaje: 'listar proyectos pendiente' });
};

const getProjectById = async (req, res) => {
  res.json({ mensaje: `obtener proyecto ${req.params.id} pendiente` });
};

const assingUserToProject = async (req, res) => {
  res.json({ mensaje: 'asociar usuario a proyecto pendiente', datos: req.body });
};

const removeUserFromProject = async (req, res) => {
  res.json({ mensaje: 'desasociar usuario de proyecto pendiente', datos: req.body });
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
  getProjectById,
  assingUserToProject,
  removeUserFromProject,
};