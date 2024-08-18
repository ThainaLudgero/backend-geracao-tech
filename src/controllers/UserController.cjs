const User = require('../models/User.cjs');
const bcrypt = require('bcrypt');

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

  // Validações básicas
  if (!firstname || !surname || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'As senhas não correspondem' });
  }

  try {
    // Verifica se o email já está em uso
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 10);

    // Cria o novo usuário
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

module.exports = {
  getUserById,
  createUser
};
