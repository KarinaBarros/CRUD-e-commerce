import { createPool } from "./db";

export default async function ExcluirProduto(req,res) {
    const db = await createPool();
    const { id } = req.body;
    
  
    try {
        // Excluir o produto do banco de dados
      await db.execute(
        'DELETE FROM produtos WHERE id = ?',
        [id]
      );
  
      res.status(201).json({ message: 'Produto excluído com sucesso!' });
    } catch (err) {
      console.error('Erro ao excluir o produto:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    } finally {
      db.end(); // Libera a conexão após o uso
    }
}