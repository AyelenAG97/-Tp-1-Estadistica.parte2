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
        renderTable();
        renderFrecuenciaNiveles();
        renderFrecuenciaCursos();
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
        <td>${user.edad}</td>
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

fetchData();
