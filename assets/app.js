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