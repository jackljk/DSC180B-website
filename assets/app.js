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
    Array.from(maps).forEach(map => {
        if (map.classList.contains(model)) {
            map.classList.remove("hidden");
        } else {
            map.classList.add("hidden");
        }
    });
}
