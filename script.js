const goToSection = (sectionId, elementId) => {
  const sections = document.getElementsByClassName("adm-section");
  const items = document.getElementsByClassName("adm-item");

  for (let i = 0; i < sections.length; i++) {
    items[i].classList.remove("adm-item-selected");
    sections[i].style.display = "none";
  }

  document.getElementById(elementId).classList.add("adm-item-selected");

  document.getElementById(sectionId).style.display = "block";
};

////////////////////////////////////////////////////////////////

const buscarTurma = (input) => {
  const result = turmas.filter((eachClass) =>
    eachClass.turma.toLowerCase().includes(input)
  );
  return result;
};

const handleClassSearch = () => {
  let inputBuscaTurma = document
    .getElementById("class-search")
    .value.toLowerCase();
  return inputBuscaTurma.length > 0
    ? gerarCard(buscarTurma(inputBuscaTurma)).join("")
    : gerarCard(turmas).join("");
};

const handleClassRegistration = () => {
  let inputBuscaTurma = document
    .getElementById("registration-class")
    .value.toLowerCase();
  return inputBuscaTurma.length > 0
    ? buscarTurma(inputBuscaTurma)
    : (inputBuscaTurma.innerHTML = "");
};

////////////////////////////////////////////////////////////////

const buscarEstudante = () => {
  let inputBuscaEstudante = document
    .getElementById("student-name")
    .value.toLowerCase();
  let result = "";

  if (inputBuscaEstudante.length > 0) {
    result = estudantes.filter((cadaEstudante) =>
      cadaEstudante.estudante.toLowerCase().includes(inputBuscaEstudante)
    );
  }
  return result;
};

////////////////////////////////////////////////////////////////

const gerarCard = (classSearch) => {
  const cards = classSearch.map((eachClass) => {
    return `<div class="class">
              <h2>${eachClass.turma}</h2>
              <ul>
                <li><b>Curso:</b> ${eachClass.curso}</li>
                <li><b>Início:</b> ${eachClass.inicio}</li>
                <li><b>Término:</b> ${eachClass.fim}</li>
                <li><b>Nº de alunos:</b> ${eachClass.numEstudantes}</li>
                <li><b>Período:</b> ${eachClass.periodo}</li>
                <li><b>Concluído:</b> ${
                  eachClass.concluida ? "Sim" : "Não"
                }</li>
              </ul>
            </div>`;
  });

  document.getElementById("classes-list").innerHTML = cards.join("");
  document.getElementById("class-search").value = "";
};

////////////////////////////////////////////////////////////////

const buscarCurso = (input) => {
  if (input.length > 0) {
    const result = cursos.filter((cadaCurso) =>
      cadaCurso.curso.toLowerCase().includes(input)
    );
    return result;
  } else {
    const result = "not found";
    return result;
  }
};

const handleCourseRegistration = () => {
  let inputBuscaCurso = document
    .getElementById("registration-course")
    .value.toLowerCase();
  return buscarCurso(inputBuscaCurso);
};

const handleCoursePayment = () => {
  let inputBuscaCurso = document
    .getElementById("courses-basket-input")
    .value.toLowerCase();
  return buscarCurso(inputBuscaCurso)[0].valor;
};

////////////////////////////////////////////////////////////////

const carrinhoCursos = [];

const addCarrinho = () => {
  carrinhoCursos.push(handleCoursePayment());
  document.getElementById("courses-basket-input").value = "";
};

////////////////////////////////////////////////////////////////

const parcelarCurso = () => {
  document.getElementById("total-value").innerHTML = "";
  document.getElementById("total-value-sum").innerHTML = "";

  let numParcelas = Number(document.getElementById("installments").value);

  let somaCarrinho = carrinhoCursos.reduce((curr, acc) => curr + acc);

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

  const totalValue = document.createElement("h2");
  const textTotalValue = document.createTextNode("Valor total:");
  totalValue.appendChild(textTotalValue);
  document.getElementById("total-value").appendChild(textTotalValue);

  const totalValueSum = document.createElement("p");
  const textTotalValueSum = document.createTextNode(`${res}`);
  totalValueSum.appendChild(textTotalValueSum);
  document.getElementById("total-value-sum").appendChild(textTotalValueSum);

  document.getElementById("installments").value = "";
};

////////////////////////////////////////////////////////////////

const matricular = () => {
  document.getElementById("confirmation-message").innerHTML = "";
  document.getElementById("checkmark").innerHTML = "";

  let validationTestCourse = handleCourseRegistration();
  let validationTestClass = handleClassRegistration();

  if (validationTestCourse.length === 0) {
    const confirmation = document.createElement("h2");
    const textConfirmation = document.createTextNode(
      "ATENÇÃO: Curso não encontrado!"
    );
    confirmation.appendChild(textConfirmation);
    document.getElementById("confirmation-message").appendChild(confirmation);
    return;
  } else if (validationTestClass.length === 0) {
    const confirmation = document.createElement("h2");
    const textConfirmation = document.createTextNode(
      "ATENÇÃO: Turma não encontrada!"
    );
    confirmation.appendChild(textConfirmation);
    document.getElementById("confirmation-message").appendChild(confirmation);
    return;
  } else {
    let registrationName = document.getElementById("registration-name").value;
    let registrationCourse = handleCourseRegistration()[0].curso;
    let registrationClass = handleClassRegistration()[0].turma;
    let registrationInstallments = document.getElementById(
      "registration-installments"
    ).value;

    if (
      !registrationName ||
      !registrationCourse ||
      !registrationClass ||
      !registrationInstallments
    ) {
      const confirmation = document.createElement("h2");
      const textConfirmation = document.createTextNode(
        "ATENÇÃO: Todos os campos são obrigatórios!"
      );
      confirmation.appendChild(textConfirmation);
      document.getElementById("confirmation-message").appendChild(confirmation);
      return;
    }

    if (
      registrationName.length > 0 &&
      registrationCourse &&
      registrationClass &&
      registrationInstallments
    ) {
      document.getElementById("confirmation-message").innerHTML = "";
      document.getElementById("checkmark").innerHTML = "";
      const confirmation = document.createElement("h2");
      const textConfirmation = document.createTextNode(
        "Matrícula de estudante efetivada!"
      );
      confirmation.appendChild(textConfirmation);
      document.getElementById("confirmation-message").appendChild(confirmation);

      const confirmationName = document.createElement("p");
      const textConfirmationName = document.createTextNode(
        `Nome: ${registrationName}`
      );
      confirmationName.appendChild(textConfirmationName);
      document
        .getElementById("confirmation-message")
        .appendChild(confirmationName);

      const confirmationCourse = document.createElement("p");
      const textConfirmationCourse = document.createTextNode(
        `Curso: ${registrationCourse}`
      );
      confirmationCourse.appendChild(textConfirmationCourse);
      document
        .getElementById("confirmation-message")
        .appendChild(confirmationCourse);

      const confirmationClass = document.createElement("p");
      const textConfirmationClass = document.createTextNode(
        `Turma: ${registrationClass}`
      );
      confirmationClass.appendChild(textConfirmationClass);
      document
        .getElementById("confirmation-message")
        .appendChild(confirmationClass);

      const checkmark = document.createElement("img");
      checkmark.src = "assets/check-green.svg";
      checkmark.alt = "check-mark";
      checkmark.id = "check-mark";
      document.getElementById("checkmark").appendChild(checkmark);
    }

    let newStudentValue = handleCourseRegistration()[0].valor;

    let newStudent = {
      estudante: registrationName,
      turma: registrationClass,
      curso: registrationCourse,
      valor: newStudentValue,
      numParcelas: registrationInstallments,
      desconto: false,
      valorParcela: newStudentValue / registrationInstallments,
    };

    estudantes.push(newStudent);
  }

  document.getElementById("registration-name").value = "";
  document.getElementById("registration-course").value = "";
  document.getElementById("registration-class").value = "";
  document.getElementById("registration-installments").value = "";
};

////////////////////////////////////////////////////////////////

const relatorioEstudante = (nomeEstudante) => {
  document.getElementById("report").innerHTML = "";
  const estudante = buscarEstudante(nomeEstudante)[0];

  if (!estudante) {
    const reportNotFound = document.createElement("p");
    const textReportNotFound = document.createTextNode(
      "A sua busca não encontrou nenhum resultado."
    );
    report.appendChild(textReportNotFound);
    document.getElementById("report").appendChild(reportNotFound);
    return;
  }

  if (estudante.estudante.length > 0) {
    const reportName = document.createElement("p");
    const textReportName = document.createTextNode(
      `Estudante: ${estudante.estudante}`
    );
    report.appendChild(textReportName);
    document.getElementById("report").appendChild(reportName);

    const reportClass = document.createElement("p");
    const textReportClass = document.createTextNode(
      `Turma: ${estudante.turma}`
    );
    report.appendChild(textReportClass);
    document.getElementById("report").appendChild(reportClass);

    const reportCourse = document.createElement("p");
    const textReportCourse = document.createTextNode(
      `Curso: ${estudante.curso}`
    );
    report.appendChild(textReportCourse);
    document.getElementById("report").appendChild(reportCourse);
    document.getElementById("student-name").value = "";

    const reportValue = document.createElement("p");
    const textReportValue = document.createTextNode(
      `Valor total: R$${estudante.valor},00`
    );
    report.appendChild(textReportValue);
    document.getElementById("report").appendChild(reportValue);

    const reportInstallment = document.createElement("p");
    const textReportInstallment = document.createTextNode(
      `Valor das parcelas: R$${estudante.valorParcela},00`
    );
    report.appendChild(textReportInstallment);
    document.getElementById("report").appendChild(reportInstallment);

    const reportNumInstallments = document.createElement("p");
    const textReportNumInstallments = document.createTextNode(
      `Nº de parcelas: ${estudante.numParcelas}`
    );
    report.appendChild(textReportNumInstallments);
    document.getElementById("report").appendChild(reportNumInstallments);
  }
};