import { createPool } from "./db";

export default async function NovoEstoque(req,res) {
    const db = await createPool();
    const {id, estoque} = req.body;
  try {
    await db.execute(`UPDATE produtos SET estoque = ? WHERE id = ?`, [estoque, id]); 
    res.status(201).json({ message: 'Estoque atualizado com sucesso!' }); 
  } catch (err) {
    console.error('Erro ao atualizar estoque:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }finally {
    db.end(); // Libera a conexão após o uso
  }
}