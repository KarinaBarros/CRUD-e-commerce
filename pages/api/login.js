import { createPool } from "./db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export default async function Login(req, res) {
    const db = await createPool();
    const { email, senha } = req.body;
  
    try {
      const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
      const nome = rows[0].nome;
  
      if (rows.length === 0) {
        return res.status(404).json({ message: 'Email ou senha incorretos.' });
      }
  
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Email ou senha incorretos.' });
      }
  
      if (user.admin === 0) {
        return res.status(403).json({ message: "Você não tem permissões suficientes para acessar este recurso." });
      }
  
      const token = jwt.sign({ userId: user.id }, process.env.SEGREDO_JWT, { expiresIn: '1d' });
      res.status(200).json({ message: 'Login bem-sucedido!', token, nome });
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
        db.end(); // Libera a conexão após o uso
    }
}