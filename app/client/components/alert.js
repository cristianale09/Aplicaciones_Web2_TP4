export const handleAlert = (text) =>{
    const alert = document.getElementById('alert') // para poder mostrar la alerta
    const textalert = document.getElementById('txtAlert') // para cambiar el texto de la alerta
    
    alert.classList.remove('hidden') // se muestra la alerta quitando el hidden

    textalert.textContent = text // 
}

export const handleCloseAlert = () => {
    const alert = document.getElementById('alert')
    alert.classList.add('hidden')
}

export const alert = () =>{
    retunr `    
    <div class="bg-rose-500 mt-5 rounded-2xl p-4 hidden" id="alert">
        <div class="flex -justify-between items-center">
            <p class="text-sm font-semibold" id="textalert"></p>
            <button class="bg-rose-700 p-2 w-1/12 rounded-full hover:bg-rose-600" id="btnCloseAlert"></button>
        </div>
    </div>
    `
}