/* const parcelarCurso = (obj, numParcelas) => {
  let valor = numParcelas <= 2 ? obj.valor * 0.8 : obj.valor;

  let msg = `O curso ${obj.curso} ficou no valor total de R$${valor}, em ${numParcelas}x de R$${valor / numParcelas}.`;
  let msgAdd = " Foi concedido desconto de 20%.";
  
  //if (numParcelas <= 2) msg += msgAdd; // msg = msg + msgAdd
  
  let res = numParcelas <= 2 ? msg + msgAdd : msg;

  console.log(res);
};

parcelarCurso(cursos[0], 1); */

/* const parcelarCurso = (obj, numParcelas) => {
  let valor = numParcelas <= 2 ? obj.valor * 0.8 : obj.valor;

  const msg = `O curso ${obj.curso} ficou no valor total de R$${valor}`;
  const msgParc = `, em ${numParcelas}x de R$${valor / numParcelas}`;
  const msgDesc = ". Foi concedido desconto de 20%.";
  let res = "";

  switch(numParcelas) {
    case 1:
      res = msg + msgDesc
      break
    case 2:
      res = msg + msgParc + msgDesc
      break
    default:
      res = msg + msgParc + "."
  }

  console.log(res);
};

parcelarCurso(cursos[0], 1); */

/* const buscarEstudante = (arr, nome) =>
  arr.filter((obj) => obj.estudante === nome)[0];

console.log(buscarEstudante(estudantes, "Timothee Chalamet")); */

////////////////////////////////////////////////////////////////

const buscarTurma = (arr, nome) => arr.filter((obj) => obj.turma === nome)[0];

console.log(buscarTurma(turmas, "Hipátia"));

////////////////////////////////////////////////////////////////

const buscarEstudante = (arr, nome) => {
  let res = arr.filter((obj) =>
    obj.estudante.toLowerCase().includes(nome.toLowerCase())
  )[0];
  return res || "Estudante não encontrado.";
};

console.log(buscarEstudante(estudantes, "TiM"));

////////////////////////////////////////////////////////////////

/* const buscarCurso = (arr, nome) => arr.filter(obj => obj.curso === nome)[0]; */

const buscarCurso = (arr, nome) => arr.find(obj => obj.curso === nome);

console.log(buscarCurso(cursos, "JavaScript"));

////////////////////////////////////////////////////////////////

const carrinhoCursos = [];

const addCarrinho = (nomeCurso) => {
  carrinhoCursos.push(buscarCurso(cursos, nomeCurso).valor);
  return carrinhoCursos;
};

addCarrinho("APIs REST");
addCarrinho("JavaScript");
addCarrinho("HTML e CSS");
console.log(carrinhoCursos);

////////////////////////////////////////////////////////////////

const parcelarCurso = (obj, carrinhoCursos, numParcelas) => {
  let somaCarrinho = carrinhoCursos.reduce((curr, acc) => curr + acc);

  /*   let valorFinal = 0;

  if (carrinhoCursos.length === 3) valorFinal = somaCarrinho * 0.85;
  else if (carrinhoCursos.length === 2) valorFinal = somaCarrinho * 0.8;
  else valorFinal = somaCarrinho;

  console.log(valorFinal) */

  const mapValor = { 1: somaCarrinho, 2: somaCarrinho * 0.9 };

  let valorFinal = mapValor[carrinhoCursos.length] || somaCarrinho * 0.85;

  valorFinal = numParcelas <= 2 ? valorFinal * 0.8 : valorFinal;

  const msg = `Sua compra ficou no valor total de R$${valorFinal}`;
  const msgParc = `, em ${numParcelas}x de R$${valorFinal / numParcelas}`;
  const msgDesc = ". Foi concedido desconto de 20%.";
  let res = "";

  if (numParcelas === 1) res = msg + msgDesc;
  else if (numParcelas === 2) res = msg + msgParc + msgDesc;
  else res = msg + msgParc + ".";

  console.log(res);
};

parcelarCurso(cursos[0], carrinhoCursos, 2);

////////////////////////////////////////////////////////////////

const matricular = (nome, curso, turma, parcelas) => {
  const novoEstudante = {
    estudante: nome,
    turma: turma,
    curso: curso,
    numParcelas: parcelas,
  };
  estudantes.push(novoEstudante);
  console.log(estudantes);
  console.log(
    `A matrícula de ${nome} para o curso de ${curso} na turma ${turma} foi efetivada com sucesso!`
  );
};

matricular("Calvin Klein", "JavaScript", "Clarke", 2);

////////////////////////////////////////////////////////////////

const relatorioEstudante = (nomeEstudante) => {
  const estudante = buscarEstudante(estudantes, nomeEstudante);
  let relatorio = {
    estudante: estudante.estudante,
    turma: estudante.turma,
    valor: estudante.valor,
    numParcelas: estudante.numParcelas,
  };
  return relatorio;
};

console.log(relatorioEstudante("Timothee Chalamet"));
