import { createPool } from "./db";

export default async function RetirarPromocao(req, res) {
    const db = await createPool();
    const { id } = req.body;
    try {
      const [rowsPreco] = await db.execute('SELECT `preco` FROM `produtos` WHERE `id` = ?', [id]);
      const preco = rowsPreco[0]?.preco;
      // Verificar se a categoria já existe
      await db.execute('UPDATE `produtos` SET `promocao_id` = NULL, `total_desconto` = ? WHERE `id` = ?', [preco, id]);
      res.status(201).json({ message: 'Produto excluído com sucesso!' });
  
    } catch (err) {
      console.error('Erro ao excluir na promoção:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
      db.end(); // Libera a conexão após o uso
    }
}