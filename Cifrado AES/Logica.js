  
function validarClave() {
    var vcla1=document.getElementById("clave").value;
    var disval= document.getElementById('valClave');
    var count8=8-vcla1.length;
    var count16=16-vcla1.length;
    var count32=32-vcla1.length;
    if(vcla1.length==8 || vcla1.length==16 || vcla1.length==32){
        disval.innerHTML  = `<h4> Clave Válida </h4>`;
    }else{
        if(vcla1.length<8){
            disval.innerHTML  = `<h4>Clave inválida</h4></p>`;    
        }else
        if(vcla1.length>8 && vcla1.length<16){
            disval.innerHTML  = `<h4>Clave inválida</h4></p>`;    
        }else
        if(vcla1.length>16 && vcla1.length<32){
            disval.innerHTML  = `<h4>Clave inválida</h4></p>`;    
        }                            
    }
}                                 


function cifradoAES(){
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var cifrado = CryptoJS.AES.encrypt(cadena, clave);
    document.getElementById('ci').value = cifrado;
    document.getElementById("cci").innerHTML = cifrado;
    localStorage.setItem("cifraAES", cifrado);
    localStorage.setItem("cifradoAES", cifrado);    
    var pshw= document.getElementById('pshw');
    pshw.innerHTML  = `<div>
                        <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo cifrado</button><br><br>
                        <a download="cifradoAES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                    </div> `;
}

function descifradoAES(){
    var cadena = document.getElementById("archivoc").value;
    var clave =  document.getElementById("clave").value
    var descifrado = CryptoJS.AES.decrypt(cadena, clave);
    var deshow=descifrado.toString(CryptoJS.enc.Utf8);
    document.getElementById("cdes").innerHTML = deshow;
    localStorage.setItem("descifradoAES", deshow);
    pshw.innerHTML  = `<div>
                    <button id="create" style="background-color: #AAACB0; font-size: 115%;">Crear archivo descifrado</button><br><br>
                    <a download="descifradoAES.txt" id="downloadlink" style="display: none; color: #4A1942;">Descargar</a>
                    </div>`;
}

function validarCamposC(){
    var vcla1="";
    var vcla1=document.getElementById("clave").value;
    var varch=document.getElementById("archivoc").value;
    var tipocifrado= document.getElementById('tcifrado').value;
    if(varch.length<5){
        console.log("Archivo invalido");
        alert ("Ingresa un archivo ");    
    }else if(varch.length>5){
        if (vcla1.length==8 || vcla1.length==16 || vcla1.length==32){               
            if(tipocifrado=='AES'){
                console.log('cifrar con AES');
                cifradoAES();
                crearArchC();
            }else if (tipocifrado==''){
            console.log('');
                cifradoAES();
                crearArchC();
            }                                                 
        }else{
            console.log("Clave invalida");
            alert ("Longitud de clave no válida.");
        }
    }    
}

function validarCamposD(){
    var vcla1="";    
    var vcla1=document.getElementById("clave").value;
    var varch=document.getElementById("archivoc").value;
    var tipocifrado= document.getElementById('tcifrado').value;
    if(varch.length<5){
        console.log("Archivo invalido");
        swal ( "Error" ,  "Ingresa un archivo para poder llevar acabo una acción");    
    }else if(varch.length>5){
        if (vcla1.length==8 || vcla1.length==16 || vcla1.length==32){            
            if(tipocifrado=='AES'){
                console.log('descifrar con AES');
                descifradoAES();
                crearArchD ();
            }else if (tipocifrado==''){
                descifradoAES();
                crearArchD ();
            }                                    
        }else{
            console.log("Clave invalida");
            alert("Longitud de clave no válida." );
        }
    }
}

function crearArchC () {
    var textFile = null,
    makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
    };
    var create = document.getElementById('create'),
    textbox = document.getElementById('cci');
    create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';             
    },false);
    
}

function crearArchD () {
    var textFile = null,
    makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});
    if (textFile !== null) {
        window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
    };
    var create = document.getElementById('create'),
    textbox = document.getElementById('cdes');
    create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(textbox.value);
    link.style.display = 'block';            
    }, false);
}