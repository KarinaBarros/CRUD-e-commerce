import { createPool } from "./db";

export default async function ProdutoPesquisa(req, res) {
    const db = await createPool();
    const { pesquisa } = req.body;
  try {
     // Buscar produtos com parte da palavra
    const [rows] = await db.execute(
      `SELECT p.*, 
       c.nome AS categoria_nome, 
       pr.porcentagem AS promocao_porcentagem
       FROM produtos p
       LEFT JOIN categorias c ON p.id_categoria = c.id
       LEFT JOIN promocoes pr ON p.promocao_id = pr.id
       WHERE LOWER(p.nome) LIKE LOWER(?)`,
      [`%${pesquisa}%`]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro interno do servidor' });
  } finally {
    db.end(); // Libera a conexão após o uso
  }
}