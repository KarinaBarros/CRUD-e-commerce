import { createPool } from "./db";

export default async function NovoPreco(req, res) {
    const db = await createPool();
    let total_desconto; // Alterado para let
    const { id, preco } = req.body;
  try {
      // Obtém o promocao_id do produto
      const [rowsPromocao_id] = await db.execute('SELECT `promocao_id` FROM `produtos` WHERE `id` = ?', [id]);
      const promocao_id = rowsPromocao_id[0]?.promocao_id;
      
      // Obtém a porcentagem de desconto da promoção
      let porcentagem = 0; // Inicializa com 0
      if (promocao_id !== null) { // Verifica se promocao_id não é null
          const [rowsPorcentagem] = await db.execute('SELECT `porcentagem` FROM `promocoes` WHERE `id` = ?', [promocao_id]);
          porcentagem = rowsPorcentagem[0]?.porcentagem || 0; // Define porcentagem como 0 se não encontrado
      }
      
      // Calcula o valor do desconto e o preço total com desconto
      const valorDesconto = (preco * porcentagem) / 100;
      total_desconto = preco - valorDesconto;

      if (promocao_id === null) { // Verifica se promocao_id é null
          total_desconto = preco;
      }
      
      // Atualiza o preço e o total_desconto do produto
      await db.execute('UPDATE produtos SET preco = ?, total_desconto = ? WHERE id = ?', [preco, total_desconto, id]);
      
      res.status(201).json({ message: 'Preço atualizado com sucesso!' });
  } catch (err) {
      console.error('Erro ao atualizar preço:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
  } finally {
      db.end(); // Libera a conexão após o uso
  }
}