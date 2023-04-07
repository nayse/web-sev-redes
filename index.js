const express = require('express'); 
const bodyParser = require('body-parser');

// cria instancia do fram. expresss
const aplicacao = express();
const porta = 3000;


aplicacao.use(express.json());
aplicacao.use(express.urlencoded({ extended: true }));


let membrosBTS = []; 


class MembroBanda {
  constructor(id, nome, idade, funcao) {
    this.id = id;
    this.nome = nome;
    this.idade = idade;
    this.funcao = funcao;
  }

}
//---------------------------------


function getMembros(requisicao, resposta) {
  const todosMembros = membrosBTS // retrieve all members from your data source
  resposta.send(todosMembros);
}


//GET por id
const getMembroUnico = (requisicao, resposta) => {
  const { id } = requisicao.params;
  if (id) {
    const membro = membrosBTS.find((membro) => membro.id === parseInt(id));
    if (!membro) {
      console.error(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
      return resposta.status(404).send(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
    }
    resposta.header('Header', 'Autenticação válida').status(200).json(membro);
  } else {
    const dadosMembros = membrosBTS.map(({ id, nome, idade, funcao }) => ({ id, nome, idade, funcao }));
    resposta.header('Header', 'Autenticação válida').status(200).json({dadosMembros});
  }
};


//---------------------------------
// POST
const postMembro = (requisicao,resposta) => {
  const novoMembro = new MembroBanda(requisicao.body.id, requisicao.body.nome, requisicao.body.idade, requisicao.body.funcao);
  membrosBTS.push(novoMembro);
  console.log('Membro adicionado com sucesso:', novoMembro);
  resposta.header('Header', 'Autenticação válida').status(200).json(novoMembro); 
};

//---------------------------------
// PUT
const putMembro = (requisicao, resposta) => {
  const { id } = requisicao.params; 
  const indiceMembro = membrosBTS.findIndex((membro) => membro.id === parseInt(id));
  if (indiceMembro < 0) {
    console.error(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
    return resposta.status(404).send(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
  }
  const atualizaMembro = new MembroBanda(parseInt(id), requisicao.body.nome, requisicao.body.idade, requisicao.body.funcao);
  membrosBTS[indiceMembro] = atualizaMembro;
  console.log('Membro atualizado com sucesso:', atualizaMembro);
  resposta.status(200).json(atualizaMembro);
};


//---------------------------------
//PATCH
const patchMembro = (requisicao, resposta) => {
  const { id }  = requisicao.params;
  const indiceMembro = membrosBTS.findIndex((membro) => membro.id === parseInt(id));
  if (indiceMembro < 0) {
    console.error(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
    return resposta.status(404).send(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
  }
  membrosBTS[indiceMembro] = { ...membrosBTS[indiceMembro], ...requisicao.body };
  console.log('Membro atualizado com sucesso:', membrosBTS[indiceMembro]);
  resposta.status(200).json(membrosBTS[indiceMembro]);
};

//----------------------------------
//DELETE
const deleteMembro = (requisicao, resposta) => {
  const { id } = requisicao.params;
  const indiceMembro = membrosBTS.findIndex((membro) => membro.id === parseInt(id));
  if (indiceMembro < 0) {
    console.error(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
    return resposta.status(404).send(`Erro HTTP 404 (não encontrado) - Não existe nenhum membro com o id: ${id}`);
  }
  // apaga membro com a index repassada
  membrosBTS.splice(indiceMembro, 1);
  // return success status
  return resposta.status(200).send(`Membro com o id ${id} foi excluído com sucesso.`);
};

//-------------------------------------------------------------------------------------------------------------------
// configuração de rotas e a inicialização de um servidor HTTP

aplicacao.get('/', getMembros)
aplicacao.get('/:id', getMembroUnico)
aplicacao.post('/:id', postMembro)
aplicacao.put('/:id', putMembro)
aplicacao.patch('/:id', patchMembro)
aplicacao.delete('/:id', deleteMembro)
aplicacao.options('/:id', (requisicao, resposta) => {
  resposta.status(200)
    .set('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD')
    .send();
});




aplicacao.listen(porta, () => {
  console.log(`Servidor rodando na porta ${porta}`);
});
