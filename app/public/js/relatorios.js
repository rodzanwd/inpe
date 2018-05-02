const $ = document.querySelector.bind(document);

var campos = [
    atividade = $('#atividade'),
    descricao = $('#descricao'),
    horaInicio = $('#horaInicio'),
    horaFim = $('#horaFim'),
    orientaEstagiario = $('#orientaEstagiario'),
    nomeEstagiario = $('#nomeEstagiario')
];

$('#clear').addEventListener('click', function(event){

    event.preventDefault();

    for (let i = 0; i < campos.length; i++) {
        campos[i].value = '';
    }

    campos[0].focus();

});

function mascara_horaInicial(hora){ 
    var myhora = ''; 
    myhora = myhora + hora; 
    if (myhora.length == 2){ 
        myhora = myhora + ':'; 
        document.forms[0].horaInicio.value = myhora; 
    } 
    if (myhora.length == 5){ 
        verifica_horaInicio(); 
    } 
} 

function verifica_horaInicio(){ 
    hrs = (document.forms[0].horaInicio.value.substring(0,2)); 
    min = (document.forms[0].horaInicio.value.substring(3,5)); 
    
    situacao = ""; 
    // verifica data e hora 
    if ((hrs < 00 ) || (hrs > 23) || ( min < 00) ||( min > 59)){ 
        situacao = "falsa"; 
    } 
    
    if (document.forms[0].horaInicio.value == "") { 
        situacao = "falsa"; 
    } 

    if (situacao == "falsa") { 
        let mensagem = "Hora inválida - clique aqui para corrigir"; 
        let hora = $('.horaInicio');  
        let input = $('#horaInicio');
        
        let div = document.createElement('div');
        div.textContent = mensagem;
        div.classList.add('mensagem');
        div.classList.add('notification');
        div.classList.add('is-danger');

        hora.appendChild(div);

        div.addEventListener('click', function(e) {
            div.classList.add("invisivel"); 
            input.value = "";
            input.focus();
        });
    } 
} 

function mascara_horaFim(hora){ 
    var myhora = ''; 
    myhora = myhora + hora; 
    if (myhora.length == 2){ 
        myhora = myhora + ':'; 
        document.forms[0].horaFim.value = myhora; 
    } 
    if (myhora.length == 5){ 
        verifica_horaFim(); 
    } 
} 

function verifica_horaFim(){ 
    hrs = (document.forms[0].horaFim.value.substring(0,2)); 
    min = (document.forms[0].horaFim.value.substring(3,5)); 
    
    situacao = ""; 
    // verifica data e hora 
    if ((hrs < 00 ) || (hrs > 23) || ( min < 00) ||( min > 59)){ 
        situacao = "falsa"; 
    } 
    
    if (document.forms[0].horaFim.value == "") { 
        situacao = "falsa"; 
    } 

    if (situacao == "falsa") { 
        let mensagem = "Hora inválida - clique aqui para corrigir"; 
        let hora = $('.horaFim');  
        let input = $('#horaFim');
        
        let div = document.createElement('div');
        div.textContent = mensagem;
        div.classList.add('mensagem');
        div.classList.add('notification');
        div.classList.add('is-danger');

        hora.appendChild(div);

        div.addEventListener('click', function(e) {
            div.classList.add("invisivel"); 
            input.value = "";
            input.focus();
        });
    } 
} 

function carregaRelatorio() {
    let atividade = $('#atividade');
    atividade.textContent = "data.atividade";
}

function data() {
    let data = new Date();   
    let dia = data.getDate();
    dia++;
    if (dia < 10) { 
        dia = '0' + mes; 
    }
    let mes = data.getMonth();
    mes++;
    if (mes < 10) { 
        mes = '0' + mes; 
    }
    let ano = data.getFullYear();
    return data = dia + '/' + (mes) + '/' + ano; 
}

function retornaDataAtual() {

    const url = '/relatorios';

    var request = new Request(url, {
        headers: new Headers({
            'Content-Type': 'aplication/json'  
        })
    });


    fetch(request, {
	method: 'get'
    }).then(function(response) {
        return response.json();
    }).catch(function(err) {
        console.error('Deu ruim: ', err);
    });
}