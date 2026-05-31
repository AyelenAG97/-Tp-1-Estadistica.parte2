let users = [];


async function fetchData() {
    try {
        const response = await fetch(
            "https://apidemo.geoeducacion.com.ar/api/testing/encuesta/1",
        );
        if (!response.ok) {
            throw new Error("Ocurrio un error.")
        }

        const data = await response.json();
        users = data.data;
        console.log(users);
        renderTable();
        renderFrecuenciaNiveles();
        renderFrecuenciaCursos();
        renderEstadisticos();
    } catch (error) {
        console.error(error);
    }

}

function renderTable() {
    const tbody = document.querySelector("#tablaUsuarios tbody");
    tbody.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.Edad}</td>
        <td>${user.curso}</td>
        <td>${user.nivel}</td>
        `;

        tbody.appendChild(row);
    })

}

function renderFrecuenciaNiveles() {

    const tbody = document.getElementById("nivelesTabla");

    tbody.innerHTML = "";

    let frecuencias = {};

    users.forEach((user) => {

        let nivel = user.nivel;

        if (frecuencias[nivel]) {
            frecuencias[nivel]++;
        } else {
            frecuencias[nivel] = 1;
        }

    });

    let acumulada = 0;

    let total = users.length;

    for (let nivel in frecuencias) {

        let absoluta = frecuencias[nivel];

        acumulada += absoluta;

        let relativa = ((absoluta / total) * 100).toFixed(2);

        tbody.innerHTML += `
            <tr>
                <td>${nivel}</td>
                <td>${absoluta}</td>
                <td>${acumulada}</td>
                <td>${relativa}%</td>
            </tr>
        `;

    }

}

function renderFrecuenciaCursos() {

    const tbody = document.getElementById("tablaCursos");

    tbody.innerHTML = "";

    let frecuencias = {};

    users.forEach((user) => {

        let curso = user.curso;

        if (frecuencias[curso]) {
            frecuencias[curso]++;
        } else {
            frecuencias[curso] = 1;
        }

    });

    let acumulada = 0;

    let total = users.length;

    for (let curso in frecuencias) {

        let absoluta = frecuencias[curso];

        acumulada += absoluta;

        let relativa = ((absoluta / total) * 100).toFixed(2);

        tbody.innerHTML += `
            <tr>
                <td>${curso}</td>
                <td>${absoluta}</td>
                <td>${acumulada}</td>
                <td>${relativa}%</td>
            </tr>
        `;

    }

}

function obtenerEdades() {
    return users.map(user => 
        user.Edad);
}
function renderEstadisticos() {
    let edades = obtenerEdades();
//Media
let suma = 0;
edades.forEach(edad => {
    suma += edad;
});
let media = suma / edades.length;

//Maximo 
let max = edades[0];
edades.forEach(edad => {
    if (edad > max) {
        max = edad; 
    }
});

//Minimo
let min = edades[0];
edades.forEach(edad => {
    if (edad < min) {
        min = edad; 
    }
});

// Mediana
function calcularMediana(arr) {
    let ordenado = [...arr].sort((a, b) => a - b);
    let mitad = Math.floor(ordenado.length / 2);
    if (ordenado.length % 2 === 0) {
        return (ordenado[mitad - 1] + ordenado[mitad]) / 2;
    } else {
        return ordenado[mitad];
    }
}


let edadesOrdenadas = [...edades].sort((a, b) => a - b);
let mediana = calcularMediana(edadesOrdenadas);

// Cuartiles
let mitad = Math.floor(edadesOrdenadas.length / 2);
let primeraMitad = edadesOrdenadas.slice(0, mitad);
let segundaMitad = edadesOrdenadas.slice(mitad);
let q1 = calcularMediana(primeraMitad);
let q2 = calcularMediana(segundaMitad);

//Desviacion Estandar
let sumaDiferencias = 0;
edades.forEach(edad => {
    sumaDiferencias += Math.pow(edad - media, 2);
});
let promedioDiferencias = sumaDiferencias / edades.length;
let desvio = Math.sqrt(promedioDiferencias);


document.getElementById("mediaValor").textContent = media;
document.getElementById("medianaValor").textContent = mediana;
document.getElementById("maximoValor").textContent = max;
document.getElementById("minimoValor").textContent = min;
document.getElementById("q1Valor").textContent = q1;
document.getElementById("q2Valor").textContent = q2;
document.getElementById("desvioEstandarValor").textContent = desvio;
}

fetchData();
