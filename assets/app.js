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
    let maps = document.getElementsByClassName("NorESM_map"); 
    for (let i = 0; i < maps.length; i++) {
        if (maps[i].id == model) {
            maps[i].classList.remove("hidden");
        } else {
            maps[i].classList.add("hidden");
        }
    }
}

window.addEventListener('load', () => {
    console.log('loaded')
    const loading1 = document.getElementById('loading-sign-1')
    loading1.classList.add('hidden')
    const nor_esm = document.getElementById('NorESM_tas')
    const select = document.getElementById("NorESM_Var_select")
    nor_esm.classList.remove('hidden')
    select.classList.remove('hidden')

    const loading2 = document.getElementById('loading-sign-2')
    loading2.classList.add('hidden')
    const models = document.getElementById('CNN_tas')
    const select1 = document.getElementById("models_select")
    const select2 = document.getElementById("variable_select")
    models.classList.remove('hidden')
    select1.classList.remove('hidden')
    select2.classList.remove('hidden')

})

