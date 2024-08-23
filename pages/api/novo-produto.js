import { createPool } from "./db";
import upload from './upload';

export default async function NovoProduto(req, res) {
  // Cria uma Promise para o upload
  const uploadPromise = new Promise((resolve, reject) => {
    upload.single('imagem_principal')(req, res, (err) => {
      if (err) {
        reject(err); // Rejeita a Promise em caso de erro
      } else {
        resolve(); // Resolve a Promise quando o upload é bem-sucedido
      }
    });
  });

  try {
    // Aguarda a conclusão do upload
    await uploadPromise;

    const db = await createPool();
    const { nome, descricao, preco, estoque, id_categoria } = req.body;
    const imagem = req.file ? req.file.path : null;
    const imagem_principal = imagem.replace("public", "");
    console.log('imagem:', imagem_principal);

    await db.execute(
      'INSERT INTO produtos(nome, descricao, preco, total_desconto, estoque, id_categoria, imagem_principal) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nome, descricao, preco, preco, estoque, id_categoria, imagem_principal]
    );

    res.status(201).json({ message: 'Produto inserido com sucesso!' });
  } catch (err) {
    console.error('Erro ao fazer upload ou inserir o produto:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};


