import { createPool } from "./db";

export default async function PromocaoPesquisa(req, res) {
    const { pesquisa } = req.body;
    const db = await createPool();
    try {
      // Buscar produtos com parte da palavra
      const [rows] = await db.execute(
        'SELECT * FROM produtos WHERE LOWER(nome) LIKE LOWER(?) AND `promocao_id` IS NULL',
        [`%${pesquisa}%`] // Adiciona os curingas ao redor da pesquisa
      );
  
      res.json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro interno do servidor' });
    } finally {
      db.end(); // Libera a conexão após o uso
    }    
}