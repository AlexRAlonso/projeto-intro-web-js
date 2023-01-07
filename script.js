/* const parcelarCurso = (obj, numParcelas) => {
  let valor = numParcelas <= 2 ? obj.valor * 0.8 : obj.valor;

  let msg = `O curso ${obj.curso} ficou no valor total de R$${valor}, em ${numParcelas}x de R$${valor / numParcelas}.`;
  let msgAdd = " Foi concedido desconto de 20%.";
  
  //if (numParcelas <= 2) msg += msgAdd; // msg = msg + msgAdd
  
  let res = numParcelas <= 2 ? msg + msgAdd : msg;

  console.log(res);
};

parcelarCurso(cursos[0], 1); */

const parcelarCurso = (obj, numParcelas) => {
  let valor = numParcelas <= 2 ? obj.valor * 0.8 : obj.valor;

  const msg = `O curso ${obj.curso} ficou no valor total de R$${valor}`;
  const msgParc = `, em ${numParcelas}x de R$${valor / numParcelas}`;
  const msgDesc = ". Foi concedido desconto de 20%.";
  let res = "";

  if (numParcelas === 1) res = msg + msgDesc;
  else if (numParcelas === 2) res = msg + msgParc + msgDesc;
  else res = msg + msgParc + ".";

  console.log(res);
};

parcelarCurso(cursos[0], 1);

////////////////////////////////////////////////////////////////

const buscarCurso = (arr, nome) => arr.filter((obj) => obj.curso === nome)[0];

console.log(buscarCurso(cursos, "JavaScript"));

////////////////////////////////////////////////////////////////

const buscarTurma = (arr, nome) => arr.filter((obj) => obj.turma === nome)[0];

console.log(buscarTurma(turmas, "Hipátia"));

////////////////////////////////////////////////////////////////

const buscarEstudante = (arr, nome) =>
  arr.filter((obj) => obj.estudante === nome)[0];

console.log(buscarEstudante(estudantes, "Timothee Chalamet"));

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
  console.log(`A matrícula de ${nome} para o curso de ${curso} na turma ${turma} foi efetivada com sucesso!`)
};

matricular("Calvin Klein", "JavaScript", "Clarke", 2)

////////////////////////////////////////////////////////////////

