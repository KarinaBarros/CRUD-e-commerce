import jwt from 'jsonwebtoken';

export default async function autenticarToken(req, res) {
    const token = req.headers['authorization']?.split(' ')[1];   
  
  
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }
  
    try {
      const decoded = jwt.verify(token,   
   process.env.SEGREDO_JWT);
      req.user = decoded;
  
      // Lógica da rota protegida
      const { user } = req;
      res.status(200).json({ message: `Olá, ${user.name}!` });
    } catch (error) {
      res.status(403).json({ message: 'Token inválido.' });
    }
}  