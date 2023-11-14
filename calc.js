document.getElementById("form").addEventListener('submit', (e) => {
    converterValores();
    e.preventDefault();
});

function converterValores() {
    var retorno = "";

    var tipoConversao = document.getElementById("tipoConversao");
    var nome = document.getElementById("nome").value;
    var valor = document.getElementById("valor").value;

    if (nome == "") {
        retorno = "Informe seu nome";
    }
    else if (valor == "") {
        retorno = "Informe um valor para converter";
    }
    else if (isNaN(Number(valor))) {
        retorno = "A distância deve ser um número";
    }
    else {
        var chave = tipoConversao.value;
        valor = Number(valor);

        retorno = "Olá " + nome + '<br/>'
        if (chave == "M-A") {
            var distancia = metrosParaAnosLuz(valor);
            retorno += Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 20 }).format(valor) + ((valor == 1) ? " metro" : " metros") + " = " + Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 20 }).format(distancia) + ((distancia == 1) ? " ano-luz" : " anos-luz") + "<br/>";
            retorno += "Sua viagem demorará " + obterTempoAnosLuz(distancia);
        }
        else if (chave == "A-M") {
            var distancia = anosLuzParaMetros(valor);
            retorno += Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 20 }).format(valor) + ((valor == 1) ? " ano-luz" : " anos-luz") + " = " + Intl.NumberFormat("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 20 }).format(distancia) + ((distancia == 1) ? " metro" : " metros") + "<br/>";
            retorno += "Sua viagem demorará " + obterTempoAnosLuz(valor);
        }
    }

    document.getElementById("resultado").innerHTML = retorno;
}

function metrosParaAnosLuz(distancia) {
    return distancia / anosLuzParaMetros(1);
}

function anosLuzParaMetros(distancia) {
    return distancia * 9460528405000020;
}

function obterTempoAnosLuz(distancia) {
    var anos = Math.trunc(distancia);
    var decimal = distancia - anos;

    var dias = Math.trunc(decimal * 365);
    decimal = decimal * 365 - dias;

    var horas = Math.trunc(decimal * 24);
    decimal = decimal * 24 - horas;

    var minutos = Math.trunc(decimal * 60);
    decimal = decimal * 60 - minutos;

    var segundos = Math.trunc(decimal * 60);
    decimal = decimal * 60 - segundos;

    return anos + (anos == 1 ? " ano " : " anos ") + dias + (dias == 1 ? " dia " : " dias ") + horas + (horas == 1 ? " hora " : " horas ") + minutos + (minutos == 1 ? " minuto " : " minutos ")  + segundos + (segundos == 1 ? " segundo " : " segundos ");
}