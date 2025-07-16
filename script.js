const cursos = [
  { nombre: "COMUNICACIÓN I", abre: ["COMUNICACIÓN II"] },
  { nombre: "MATEMÁTICA", abre: ["BIOESTADÍSTICA"] },
  { nombre: "METODOLOGÍA DEL APRENDIZAJE UNIVERSITARIO" },
  { nombre: "BIOLOGÍA CELULAR", abre: ["ANATOMÍA GENERAL", "MICROBIOLOGÍA Y PARASITOLOGÍA"] },
  { nombre: "QUÍMICA GENERAL", abre: ["BIOQUÍMICA"] },
  { nombre: "INTRODUCCIÓN A LA OBSTETRICIA" },
  { nombre: "FILOSOFÍA Y PENSAMIENTO CRÍTICO" },
  { nombre: "COMUNICACIÓN II" },
  { nombre: "BIOESTADÍSTICA", abre: ["VIGENCIA Y TRASCENDENCIA DEL PENSAMIENTO DE ANTENOR ORREGO"] },
  { nombre: "ANATOMÍA GENERAL", abre: ["ANATOMÍA ESPECIALIZADA", "EMBRIOLOGÍA Y GENÉTICA", "HISTOLOGÍA GENERAL Y OBSTÉTRICA"] },
  { nombre: "BIOQUÍMICA", abre: ["NUTRICIÓN HUMANA"] },
  { nombre: "RECURSOS DIGITALES" },
  { nombre: "SALUD MENTAL", abre: ["EPIDEMIOLOGÍA", "ECOLOGÍA"] },
  { nombre: "ANATOMÍA ESPECIALIZADA", abre: ["FISIOLOGÍA GENERAL Y ESPECIALIZADA", "CUIDADOS ESENCIALES DEL PACIENTE"] },
  { nombre: "REALIDAD NACIONAL Y GLOBAL" },
  { nombre: "MICROBIOLOGÍA Y PARASITOLOGÍA" },
  { nombre: "HISTOLOGÍA GENERAL Y OBSTÉTRICA" },
  { nombre: "EMBRIOLOGÍA Y GENÉTICA" },
  { nombre: "EPIDEMIOLOGÍA" },
  { nombre: "FISIOLOGÍA GENERAL Y ESPECIALIZADA", abre: ["SEMIOLOGÍA GENERAL Y OBSTÉTRICA", "FISIOPATOLOGÍA", "FARMACOLOGÍA GENERAL Y ESPECIALIZADA"] },
  { nombre: "EDUCACIÓN PARA LA SALUD Y TÉCNICAS EDUCATIVAS", abre: ["OBSTETRICIA COMUNITARIA Y SALUD PÚBLICA"] },
  { nombre: "VIGENCIA Y TRASCENDENCIA DEL PENSAMIENTO DE ANTENOR ORREGO" },
  { nombre: "CUIDADOS ESENCIALES DEL PACIENTE" },
  { nombre: "ÉTICA, CIUDADANÍA E INCLUSIÓN SOCIAL" },
  { nombre: "SEMIOLOGÍA GENERAL Y OBSTÉTRICA", abre: ["ATENCIÓN PRECONCEPCIONAL Y PRENATAL", "SALUD INTEGRAL DE LA MUJER", "MEDICINA LEGAL", "NEONATOLOGÍA"] },
  { nombre: "FISIOPATOLOGÍA" },
  { nombre: "FARMACOLOGÍA GENERAL Y ESPECIALIZADA", abre: ["TERAPÉUTICA OBSTÉTRICA", "PLANIFICACIÓN FAMILIAR"] },
  { nombre: "MEDIO AMBIENTE Y DESARROLLO SOSTENIBLE" },
  { nombre: "METODOLOGÍA DE LA INVESTIGACIÓN CIENTÍFICA", abre: ["PROYECTO DE INVESTIGACIÓN"] },
  { nombre: "NUTRICIÓN HUMANA" },
  { nombre: "ELECTIVO 1: MEDICINA TRADICIONAL, ALTERNATIVA Y COMPLEMENTARIA" },
  { nombre: "ELECTIVO 1: COACHING Y LIDERAZGO" },
  { nombre: "ATENCIÓN PRECONCEPCIONAL Y PRENATAL", abre: ["ATENCIÓN DE PARTO Y PUERPERIO"] },
  { nombre: "PROYECTO DE INVESTIGACIÓN", abre: ["TESIS I"] },
  { nombre: "TERAPÉUTICA OBSTÉTRICA" },
  { nombre: "OBSTETRICIA COMUNITARIA Y SALUD PÚBLICA", abre: ["ADMINISTRACIÓN Y GESTIÓN EN SALUD"] },
  { nombre: "SALUD INTEGRAL DE LA MUJER", abre: ["PLANIFICACIÓN FAMILIAR", "SEXUALIDAD HUMANA Y EDUCACIÓN SEXUAL INTEGRAL"] },
  { nombre: "TALLER DE CREATIVIDAD, INNOVACIÓN Y EMPRENDIMIENTO" },
  { nombre: "ATENCIÓN DE PARTO Y PUERPERIO", abre: ["GINECOLOGÍA Y OBSTETRICIA PATOLÓGICA", "PSICOPROFILAXIS OBSTÉTRICA Y ESTIMULACIÓN PRENATAL", "MEDIOS DE AYUDA DIAGNÓSTICA Y MONITOREO ELECTRÓNICO FETAL", "PRÁCTICA PREPROFESIONAL"] },
  { nombre: "SEXUALIDAD HUMANA Y EDUCACIÓN SEXUAL INTEGRAL" },
  { nombre: "ADMINISTRACIÓN Y GESTIÓN EN SALUD" },
  { nombre: "PLANIFICACIÓN FAMILIAR" },
  { nombre: "NEONATOLOGÍA" },
  { nombre: "TESIS I", abre: ["TESIS II"] },
  { nombre: "ELECTIVO 2: PRIMEROS AUXILIOS" },
  { nombre: "ELECTIVO 2: BIODANZA APLICADA A LA OBSTETRICIA" },
  { nombre: "GINECOLOGÍA Y OBSTETRICIA PATOLÓGICA", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "PSICOPROFILAXIS OBSTÉTRICA Y ESTIMULACIÓN PRENATAL", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "PRÁCTICA PREPROFESIONAL", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "TESIS II", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "MEDICINA LEGAL", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "DEONTOLOGÍA PROFESIONAL" },
  { nombre: "MEDIOS DE AYUDA DIAGNÓSTICA Y MONITOREO ELECTRÓNICO FETAL", abre: ["INTERNADO EN OBSTETRICIA", "INTERNADO EN PERINATOLOGÍA"] },
  { nombre: "INTERNADO EN OBSTETRICIA", abre: ["INTERNADO EN SALUD SEXUAL Y REPRODUCTIVA", "INTERNADO EN GESTIÓN Y ATENCIÓN PRIMARIA DE SALUD"] },
  { nombre: "INTERNADO EN PERINATOLOGÍA", abre: ["INTERNADO EN SALUD SEXUAL Y REPRODUCTIVA", "INTERNADO EN GESTIÓN Y ATENCIÓN PRIMARIA DE SALUD"] },
  { nombre: "INTERNADO EN SALUD SEXUAL Y REPRODUCTIVA" },
  { nombre: "INTERNADO EN GESTIÓN Y ATENCIÓN PRIMARIA DE SALUD" },
  { nombre: "TRABAJO DE INVESTIGACIÓN" }
];

const estadoCursos = JSON.parse(localStorage.getItem("estadoCursos")) || {};

function guardarEstado() {
  localStorage.setItem("estadoCursos", JSON.stringify(estadoCursos));
}

function actualizarVista() {
  const malla = document.getElementById("malla");
  malla.innerHTML = "";

  cursos.forEach(curso => {
    const div = document.createElement("div");
    div.className = "curso";
    div.textContent = curso.nombre;

    const aprobado = estadoCursos[curso.nombre] === true;
    const bloqueado = curso.abiertoPor && !curso.abiertoPor.some(pre => estadoCursos[pre]);

    if (bloqueado) {
      div.classList.add("bloqueado");
    } else if (aprobado) {
      div.classList.add("aprobado");
    }

    div.onclick = () => {
      if (div.classList.contains("bloqueado")) return;
      estadoCursos[curso.nombre] = !estadoCursos[curso.nombre];
      guardarEstado();
      actualizarVista();
    };

    malla.appendChild(div);
  });
}

// Crear relaciones inversas
cursos.forEach(c => {
  c.abre?.forEach(dep => {
    const target = cursos.find(x => x.nombre === dep);
    if (target) {
      if (!target.abiertoPor) target.abiertoPor = [];
      target.abiertoPor.push(c.nombre);
    }
  });
});

actualizarVista();
