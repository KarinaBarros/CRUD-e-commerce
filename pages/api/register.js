import { createPool } from "./db";
import bcrypt from 'bcrypt';

export default async function Register(req, res) {
    const { nome, email, senha } = req.body;
    const db = await createPool();
    try {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
  
      if (rows.length > 0) {
        return res.status(409).json({ message: 'Email já está em uso.' });
      }
  
      const hashedPassword = await bcrypt.hash(senha, 10);
      await db.execute('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, hashedPassword]);
  
      res.status(201).json({ message: 'Usuário criado com sucesso!' });
    } catch (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
        db.end(); // Libera a conexão após o uso
    }
}