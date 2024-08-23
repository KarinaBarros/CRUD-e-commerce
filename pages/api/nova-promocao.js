import { createPool } from "./db";

export default async function NovaPromocao(req, res) {
    const db = await createPool();
    const { nome, descricao, porcentagem } = req.body;
    try {
      // Verificar se a categoria já existe
      const [results] = await db.execute('SELECT * FROM promocoes WHERE nome = ?', [nome]);
  
      if (results.length > 0) {
        // Promoção já existe
        return res.status(400).json({ message: 'Promoção já existe' });
      }
  
      // Promoção não existe, prosseguir com a inserção
      await db.execute('INSERT INTO promocoes(nome, descricao, porcentagem) VALUES (?, ?, ?)', [nome, descricao, porcentagem]);
  
      res.status(201).json({ message: 'Promoção criada com sucesso!' });
    } catch (err) {
      console.error('Erro ao inserir a promoção:', err);
      res.status(500).json({ message: 'Erro interno do servidor' });
    }finally {
      db.end(); // Libera a conexão após o uso
    }
}