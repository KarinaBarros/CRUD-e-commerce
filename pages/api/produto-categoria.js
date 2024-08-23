import { createPool } from "./db";

export default async function ProdutoCategoria(req,res) {
    const db = await createPool();
    const { id_categoria } = req.body;
    try {
      // Buscar produtos pela categoria
      const [rows] = await db.execute(
        `SELECT p.*, 
         c.nome AS categoria_nome, 
         pr.porcentagem AS promocao_porcentagem
         FROM produtos p
         LEFT JOIN categorias c ON p.id_categoria = c.id
         LEFT JOIN promocoes pr ON p.promocao_id = pr.id WHERE id_categoria = ?`,
        [id_categoria]
      );
  
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    } finally {
      db.end(); // Libera a conexão após o uso
    }
}