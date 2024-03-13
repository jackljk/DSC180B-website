function changeModel() {
    let model = document.getElementById("models_select").value
    let variable = document.getElementById("variable_select").value
    let show = model + "_" + variable
    let maps = document.getElementsByClassName("models");
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].id == show) {
            maps[i].classList.remove("hidden");
        } else {
            maps[i].classList.add("hidden");
        }
    }
}


function changeModelNorESM() {
    let model = document.getElementById("NorESM_Var_select").value;
    console.log(model);
    let maps = document.getElementsByClassName("NorESM_map"); 
    console.log(maps);
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].id == model) {
            maps[i].classList.remove("hidden");
        } else {
            maps[i].classList.add("hidden");
        }
    }
}

