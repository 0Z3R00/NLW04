/*
function EnviarEmail(para, id, assunto, texto){
    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario{
    send(){
        EnviarEmail('mm@hotmail.com', 22, 'teste node js', 'começou a NLW#04');
    }
}

criando a mesma função usando TS
function EnviarEmail(para: string, id: string, assunto: string, texto: string){
    console.log(para, id, assunto, texto);
}
*/


//interface 

interface DadosDeEnvioEmail {
    para: string;
    id: string;
    assunto: string;
    texto: string;
}

function EnviarEmail({para, id, assunto, texto}: DadosDeEnvioEmail) {
    console.log(para, id, assunto, texto);
}

class EnviarEmailParaUsuario {
    send() {
        EnviarEmail({
            para: 'mm@hotmail.com',
            id: '22',
            assunto: 'teste node js',
            texto: 'começou a NLW#04'
        });
    }
}

var user = new EnviarEmailParaUsuario();
user.send();