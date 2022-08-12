// PARTE - Abrir as janelas
let iconesDesktop = Array.prototype.slice.call(document.querySelectorAll(".desktop-icon"));
iconesDesktop.forEach(function(iconElement) {
    iconElement.addEventListener("click", function(eventInfo) {
        // this refere ao elemento que foi clicado (tem o mesmo valor de iconElement)

        var iconId = (this.id).toLowerCase()
        var relatedWindowId = iconId.replace("icon", "window")
        var relatedWindow = document.getElementById(relatedWindowId)
        // Seleciona a janela baseado no #id do ícone clicado 
        
        relatedWindow.style.transform = "scale(1)";
        
        overlay(relatedWindow)
    });
})

// Link "C:/desktop/pfp.jpg" abre a imagem #pfp-window
const sobrePath = document.getElementById("pfp-jpg-path");
sobrePath.addEventListener("click", function() {
    let janelaImagem = document.getElementById("pfp-window")
    janelaImagem.style.transform = "scale(1)";
})

// PARTE - Z-index das janelas (a função é ativada quando o usuário clica em um dos ícones)
function overlay(janela) {
    let zAtual = parseInt(janela.style.zIndex)
    janela.style.zIndex = 200;

    sobre = document.getElementById("sobre-window")
    porqueccs = document.getElementById("porqueccs-window")
    pfp = document.getElementById("pfp-window")
    clock = document.getElementById("clock-window")

    var janelaId = (janela.id).toLowerCase()
    if (janelaId === "sobre-window"){
        porqueccs.style.zIndex = parseInt(porqueccs.style.zIndex) -  1
        pfp.style.zIndex = parseInt(pfp.style.zIndex) -  1
        clock.style.zIndex = parseInt(pfp.style.zIndex) -  1
    }
    else if (janelaId === "porqueccs-window") {
        sobre.style.zIndex = parseInt(sobre.style.zIndex) -  1
        pfp.style.zIndex = parseInt(pfp.style.zIndex) -  1
        clock.style.zIndex = parseInt(pfp.style.zIndex) -  1
    }
    else if (janelaId === "pfp-window") {
        sobre.style.zIndex = parseInt(sobre.style.zIndex) -  1
        porqueccs.style.zIndex = parseInt(porqueccs.style.zIndex) -  1
        clock.style.zIndex = parseInt(pfp.style.zIndex) -  1
    }
    else if (janelaId === "clock-window") {
        sobre.style.zIndex = parseInt(sobre.style.zIndex) -  1
        pfp.style.zIndex = parseInt(pfp.style.zIndex) -  1
        porqueccs.style.zIndex = parseInt(porqueccs.style.zIndex) -  1
    }
}
let janelasInteiras = document.querySelectorAll('[data-window]')
janelasInteiras.forEach(function(janela) {
    janela.addEventListener("click", function() {
        overlay(janela)
    })
})

// PARTE - Fechar as janelas
let closeButtonJanelas = Array.prototype.slice.call(document.querySelectorAll(".window-header-close"))
closeButtonJanelas.forEach(function(closeElement) {
    closeElement.addEventListener("click", function(eventInfo) {
        var relatedWindow = this.parentNode.parentNode // Seleciona a div que está dois parentes para cima
        
        relatedWindow.style.transform = "scale(0)";
        zAtual = relatedWindow.style.zIndex
        relatedWindow.style.zIndex = (zAtual-1) + "px";
    })
})

// PARTE - Arrastar janelas
let dragAreaJanelas = Array.prototype.slice.call(document.querySelectorAll(".window-header"))
dragAreaJanelas.forEach(function(header) {
    header.addEventListener("mousedown", ()=>{
        /* header.classList.add("active"); */
        header.addEventListener("mousemove", onDrag);
    });
    var relatedWindow = header.parentNode
    function onDrag({movementX, movementY}){
        let getStyle = window.getComputedStyle(relatedWindow);
        let leftVal = parseInt(getStyle.left);
        let topVal = parseInt(getStyle.top);

        relatedWindow.style.left = `${leftVal + movementX}px`;
        relatedWindow.style.top = `${topVal + movementY}px`;
    };
    document.addEventListener("mouseup", ()=>{
        header.removeEventListener("mousemove", onDrag);

        /* // Caso seja colocado em cima do header:
        let getStyle = window.getComputedStyle(relatedWindow);
        let topVal = parseInt(getStyle.top);
        console.log(topVal)
        if (topVal < -2) {
            console.log("SIM")
            relatedWindow.removeAttribute('top'); 
            relatedWindow.style.top = '-2px';
        } */
    });
})

// PARTE - Carregar janelas em posições aleatórias pela tela
const desktop = document.querySelector('#desktop')
const desktopHeight = desktop.offsetHeight;
const desktopWidth = desktop.offsetWidth;
janelasInteiras.forEach(function gerarPosicoes(janela) {
    var janelaHeight = janela.offsetHeight;
    var janelaWidth = janela.offsetWidth;

    // Calcula a range em que as propriedades left e top poderão ser definidas, de modo que não fiquem para fora do #desktop
    var safeHeight = desktopHeight - janelaHeight - 10;
    var safeWidth = desktopWidth - janelaWidth - 10;

    // Escolhe um valor aleatório dentro da área segura
    // Math.radom() gera um decimal aleatório entre 0 e 1
    var topPos = Math.floor(Math.random() * (safeHeight - 5 + 1)) + 5
    var leftPos = Math.floor(Math.random() * (safeWidth - 5 + 1)) + 5
    

    console.log(topPos)
    console.log(leftPos)
    janela.style.top = topPos + 'px';
    janela.style.left = leftPos + 'px';
})

// PARTE - Funcionamento do relógio
function clockDateTime() {
    /* TEMPO */
    var realTime = new Date();

    // Atribui a informação para as diferentes variáveis
    var hours = realTime.getHours();
    var minutes = realTime.getMinutes();
    var seconds = realTime.getSeconds();
    // Transforma o tempo no formato de dois dígitos para valores de tempo com apenas um digito
    hours = ("0"+hours).slice(-2);
    minutes = ("0"+minutes).slice(-2);
    seconds = ("0"+seconds).slice(-2);
    // Formata o tempo real no HTML
    document.getElementById('clock-real-time').innerHTML = hours + ':' + minutes + ':' + seconds

    /* DATA */
    // Gera os números correspondentes a cada informação
    var weekDay = realTime.getDay();
    var dayNumber = realTime.getDate();
    var monthNumber = realTime.getMonth();
    var year = realTime.getFullYear();

    var weekNames = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
    var monthNames = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"]
    // Junta todas as informações da data
    var formatedDateString = String(weekNames[weekDay]) + ', ' + String(dayNumber) + ' de ' + String(monthNames[monthNumber]) + ' de ' + String(year)

    // Formata a data em tempo real
    document.getElementById('date').innerHTML = formatedDateString;
}
function initClock() {
    clockDateTime()
    window.setInterval("clockDateTime()", 1)
}