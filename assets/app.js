function changeModel() {
    let model = document.getElementById("models_select").value
    console.log(model)
    if(model == "CNN"){
        document.getElementById("CNN_tas").classList.remove("hidden")
        document.getElementById("PINN_tas").classList.add("hidden")
    }
    else{
        document.getElementById("CNN_tas").classList.add("hidden")
        document.getElementById("PINN_tas").classList.remove("hidden")
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
