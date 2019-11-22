(function () {
    const $ = q => document.querySelector(q);

    function renderGarage(){
        const garage = getGarage();

        garage.forEach(c => addCarToGarage(c));
    };

    function addCarToGarage(car) {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${car.name}</td>
            <td>${car.licence}</td>
            <td>${new Date(car.time)
                .toLocaleString("pt-BR",  {
                    hour:"numeric", 
                    minute: "numeric"
                })}
            </td>
            <td>
                <button class="delete">x</button>
            </td>

        `;

        $("#garage").appendChild(row);
    };

    function checkOut(info){
        const licence = info[1].textContent;

        console.log(licence)

    }

    const getGarage = () => localStorage.garage ? JSON.parse(localStorage.garage) : [];

    renderGarage();
    $("#send").addEventListener("click", e => {
        const name = $("#name").value
        const licence = $("#licence").value;

        if(!name || !licence) {
            alert("É necessário o preenchimento de todos os campos!");
            return;
        }
        const car = {
            name, 
            licence, 
            time: new Date()}
        const garage = getGarage();
        garage.push(car);
        
        localStorage.garage = JSON.stringify(garage);

        addCarToGarage(car);

        $("#name").value = "";
        $("#licence").value = "";
    });

    $("#garage").addEventListener("click", e => {
        if(e.target.className == "delete")
            checkOut(e.target.parentElement.parentElement.cells);

    })

})();

