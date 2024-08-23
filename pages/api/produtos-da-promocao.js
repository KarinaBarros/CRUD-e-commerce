import { createPool } from "./db";

export default async function ProdutosDaPromocao(req, res) {
    const db = await createPool();
    const {promocao_id} =req.body;
    try {
      const [rows] = await db.execute('SELECT * FROM `produtos` WHERE `promocao_id` = ?', [promocao_id]); 
      res.json(rows); 
    } catch (err) {
      console.error('Erro ao buscar produtos:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
      db.end(); // Libera a conexão após o uso
    }
}