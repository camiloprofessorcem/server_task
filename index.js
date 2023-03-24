import express, { json, Router } from 'express';
import { connect, Schema, model } from 'mongoose';
import fs from 'fs'
// Configurações iniciais
const app = express();
app.use(json());
// Conexão com o banco de dados
connect(
    'mongodb+srv://camiloprofessorcem:VLii6oh2sAKjlV72@cluster0.q57dlls.mongodb.net/?retryWrites=true&w=majority'
  //'mongodb://172.23.116.91:27017/?readPreference=primary&ssl=false&directConnection=true'
).then(() => {
  console.log('Conectado ao banco de dados');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

// Modelo de tarefa
const TarefaSchema = new Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: true },
  descricao: String,
  concluida: { type: Boolean, default: false },
});
const Tarefa = model('Tarefa', TarefaSchema);

// Rotas
const router = Router();

router.get('/', (req,res) => {
  res.json({"message":"olá pessoal do deploy automático"})
})
// Listar todas as tarefas
router.get('/tarefas', async (req, res) => {
  const tarefas = await Tarefa.find();
  res.json(tarefas);
});

// Adicionar uma nova tarefa
router.post('/tarefas', async (req, res) => {
  const tarefa = new Tarefa({
    id: req.body.id,
    titulo: req.body.titulo,
    descricao: req.body.descricao,
  });

  await tarefa.save();
  res.json(tarefa);
});

// Atualizar uma tarefa
router.put('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findById(req.params.id);
  if (!tarefa) {
    res.status(404).json({ message: 'Tarefa não encontrada' });
    return;
  }

  tarefa.titulo = req.body.titulo;
  tarefa.descricao = req.body.descricao;
  tarefa.concluida = req.body.concluida;
  await tarefa.save();
  res.json(tarefa);
});

// Excluir uma tarefa
router.delete('/tarefas/:id', async (req, res) => {
  const tarefa = await Tarefa.findOne({ id: req.params.id });
  if (!tarefa) {
    res.status(404).json({ message: 'Tarefa não encontrada' });
    return;
  }

  await tarefa.remove();
  res.json({ message: 'Tarefa excluída com sucesso' });
});

app.use('/', router);

app.listen(9000,() => console.log('Pode Rodar'))