import { createPool } from "./db";

export default async function EstoqueBaixo(req, res) {
    const db = await createPool();
    try {
        // Buscar produtos pela categoria
        const [rows] = await db.execute(
          `SELECT *FROM produtos WHERE estoque < 10`
        );
    
        res.json(rows);
      } catch (err) {
        res.status(500).json({ message: 'Erro interno do servidor' });
      } finally {
        db.end(); // Libera a conexão após o uso
      }
}