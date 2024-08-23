import { createPool } from "./db";

export default async function ExcluirPromocao(req, res) {
    const { id } = req.body;
    const db = await createPool();  
    try {
      await db.execute(`UPDATE produtos SET total_desconto = preco, promocao_id = NULL WHERE promocao_id = ?`, [id]);
      await db.execute(`DELETE FROM promocoes WHERE id =?`, [id]);
      
      res.status(201).json({ message: 'Promoção excluída com sucesso!' });
  
    } catch (err) {
      console.error('Erro ao excluir a promoção:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
      db.end(); // Libera a conexão após o uso
    }
}