import { createPool } from "./db";

export default async function NovaCategoria(req, res) {
    const { nome, descricao } = req.body;
    const db = await createPool();

  try {
    // Verificar se a categoria já existe
    const [results] = await db.execute('SELECT * FROM categorias WHERE nome = ?', [nome]);

    if (results.length > 0) {
      // Categoria já existe
      return res.status(400).json({ message: 'Categoria já existe' });
    }

    // Categoria não existe, prosseguir com a inserção
    await db.execute('INSERT INTO categorias(nome, descricao) VALUES (?, ?)', [nome, descricao]);

    res.status(201).json({ message: 'Categoria inserida com sucesso!' });
  } catch (err) {
    console.error('Erro ao inserir a categoria:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }finally {
    db.end(); // Libera a conexão após o uso
  }
}