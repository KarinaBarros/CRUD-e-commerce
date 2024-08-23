import { createPool } from "./db";

export default async function Categorias(req, res) {
    const db = await createPool();
    try {
        const [rows] = await db.execute('SELECT * FROM `categorias`'); 
        res.json(rows); 
      } catch (err) {
        console.error('Erro ao buscar categorias:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
      }finally {
        db.end();// Libera a conexão após o uso
      }
}