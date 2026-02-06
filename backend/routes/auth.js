const express = require("express");
const db = require("../db");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

//========================================================== Cadastro ====================================================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({error: 'Dados inválidos'})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );
    res.json({ message: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(400).json({ error: "Email já cadastrado" });
  }
});

//========================================================== Login ====================================================================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  if (rows.length === 0) {
    return res.status(401).json({ error: "Usuário não encontrado" });
  }

  const user = rows[0];
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Senha inválida" });
  }

  const token = jwt.sign({ id: user.id }, "process.env.JWT_SECRET", { expiresIn: "1h" });

  res.json({ success: true, nome: user.name });
});

module.exports = router;
