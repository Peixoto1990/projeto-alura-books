async function buscaEndereco(cep) {
    var caixaErro = document.getElementById('erro');
    caixaErro.innerHTML = "";

    var cidade = document.getElementById('cidade');
    var logradouro = document.getElementById('endereco');
    var estado = document.getElementById('estado');
    var bairro = document.getElementById('bairro');

    try {
        var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        var consultaCepConvertida = await consultaCep.json();

        if (consultaCepConvertida.erro) {
            throw Error('CEP não existente!');
        } 

        protegeCampos(cidade, logradouro, estado, bairro);

        cidade.value = consultaCepConvertida.localidade
        logradouro.value = consultaCepConvertida.logradouro
        estado.value = consultaCepConvertida.uf
        bairro.value = consultaCepConvertida.bairro
        
        console.log(consultaCepConvertida);
        
        return consultaCepConvertida;
        
    } catch (erro) {
        caixaErro.innerHTML = `<p>CEP inválido. Tente novamente!</p>`;
        habilitaCampos(cidade, logradouro, estado, bairro);
        console.log(erro);
    }
}

var cep = document.getElementById('cep');

cep.addEventListener('focusout', (event) => {
    buscaEndereco(event.target.value);
})

function protegeCampos(cidade, logradouro, estado, bairro) {
    cidade.setAttribute('readonly','');
    logradouro.setAttribute('readonly','');
    estado.setAttribute('readonly','');
    bairro.setAttribute('readonly','');
}

function habilitaCampos(cidade, logradouro, estado, bairro) {
    cidade.removeAttribute('readonly');
    logradouro.removeAttribute('readonly');
    estado.removeAttribute('readonly');
    bairro.removeAttribute('readonly');

    cidade.value = "";
    logradouro.value = "";
    estado.value = "";
    bairro.value = "";
}
