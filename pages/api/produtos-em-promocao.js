import { createPool } from "./db";

export default async function ProdutosEmPromocao(req, res) {
    const db = await createPool();
    try {
        const [rows] = await db.execute('SELECT * FROM `produtos` WHERE `promocao_id` IS NULL'); 
        res.json(rows); 
      } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).json({ message: 'Erro interno do servidor' });
      } finally {
        db.end // Libera a conexão após o uso
      }
}