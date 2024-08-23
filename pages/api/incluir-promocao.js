import { createPool } from "./db";

export default async function IncluirPromocao(req, res) {
    const db = await createPool();
    const { promocao_id, id } = req.body;
    try {
      const [rowsPorcentagem] = await db.execute('SELECT `porcentagem` FROM `promocoes` WHERE `id` = ?', [promocao_id]);
      const porcentagem = rowsPorcentagem[0]?.porcentagem;

      const [rowsPreco] = await db.execute('SELECT `preco` FROM `produtos` WHERE `id` = ?', [id]);
      const preco = rowsPreco[0]?.preco;

      const valorDesconto = (preco * porcentagem)/ 100;
      const total_desconto = preco - valorDesconto;

      await db.execute('UPDATE `produtos` SET `promocao_id` = ?, `total_desconto` = ? WHERE `id` = ?', [promocao_id, total_desconto, id]);


      res.status(201).json({ message: 'Produto incluído com sucesso!' });
  
    } catch (err) {
      console.error('Erro ao incluir na promoção:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
      db.end(); // Libera a conexão após o uso
    }
}