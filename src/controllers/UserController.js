const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};

const createUser = async (req, res) => {
  const { firstname, surname, email, password, confirmPassword } = req.body;

  if (!firstname || !surname || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não correspondem' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso', userId: newUser.idusuarios });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    return res.status(500).json({ error: 'Ocorreu um erro ao criar o usuário', details: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;

  // Verificação básica dos campos obrigatórios
  if (!firstname || !surname || !email) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
      const user = await User.findByPk(id);

      if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      // Atualiza os campos do usuário
      user.firstname = firstname;
      user.surname = surname;
      user.email = email;
      await user.save();

      return res.status(204).send(); // 204 No Content
  } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return res.status(500).json({ message: 'Ocorreu um erro ao atualizar o usuário', details: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Busca o usuário pelo ID
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Deleta o usuário
    await user.destroy();

    // Retorna 204 No Content indicando sucesso
    return res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ message: 'Ocorreu um erro ao deletar o usuário', details: error.message });
  }
};

module.exports = {
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
