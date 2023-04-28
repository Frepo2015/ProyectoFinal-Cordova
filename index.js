let indice;
let nomberHeader = document.getElementById('headerDer');
let btnSubmit = document.getElementById('sub'),
    btnRules = document.getElementById('rule');
let sesion;

const usuarios =`[{ "user": "alfredo2106","pass": "contrasena21","nombre": "Alfredo","apellido": "Cordova", "videoA":"1-2-5"},
    {"user": "coderhouse","pass": "contrasena01","nombre": "Alejandro","apellido": "Masias", "videoA":"7-4-6-1"},
    {"user": "invitado21","pass": "contrasena06","nombre": "Erik","apellido": "Mendoza", "videoA":"5-3-1-4-6-7"}]`;
const videos = `[{"id":1,"nombre": "Rotacion", 
            "descripcion":"Sed ut perspiciatis unde omnis iste natus error sitvoluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba1.mp4"},
            {"id":2,"nombre": "Activacion de gluteo y zona lumbar", 
            "descripcion":"totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba2.mp4"},
            {"id":3,"nombre": "Movilizaciones de cadera", 
            "descripcion":" laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba3.mp4"},
            {"id":4,"nombre": "Extension de gluteo, zona lumbar y isquitibial", 
            "descripcion":"ut perspiciatis unde omnis iste natus error sitvoluptatem a, totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba4.mp4"},
            {"id":5,"nombre": "Estiramiento acostado", 
            "descripcion":"natus error sitvoluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba5.mp4"},
            {"id":6,"nombre": "Estiramiento de nervio ciatico", 
            "descripcion":"error sitvoluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba6.mp4"},
            {"id":7,"nombre": "Movilizacion unilateral", 
            "descripcion":"perspiciatis unde omnis iste natus error sitvoluptatem accusantium doloremque laudantium, totam rem aperiamntore",
            "url":"https://physicaltherapysol.s3.amazonaws.com/p-1/Prueba7.mp4"}
        ]`; 
    
const obj = JSON.parse(usuarios);
const videosObj = JSON.parse(videos);

document.getElementById("sesion").hidden = true;
document.getElementById("formulario").hidden = false;
tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }


function Show(id) {
    if (document.getElementById(id).style.display == 'none') {
        document.getElementById(id).style.display = 'block';
    } else {
        document.getElementById(id).style.display = 'none';
    };

}


function Verify() {
    let usuario = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let aux = 0;
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].user == usuario) {
            console.log('Lo encontre en' + i);
            aux = 1;
            if (obj[i].pass == password) {
                console.log(obj[i].pass);
                Swal.fire(
                    'Bienvenido',
                    `${obj[i].nombre} ${obj[i].apellido}`,
                    'success'
                  )
                let aux2 = i;
                document.getElementById("formulario").hidden = true;
                document.getElementById("sesion").hidden = false;
                mostrar();
                return aux2;
            } else {
                alert('Contrasena incorrecta');
            }

            break;
        } else {
            console.log('Este usuario no es');
        }
    }

    if (aux == 0) {
        alert("Usuario no encontrado");
    }
}

function split(string){
    const str = string;
    const array= str.split('-');
    return array;

}

    document.querySelector('form').addEventListener('submit', e=>{
        e.preventDefault()
        const data = Object.fromEntries(
            new FormData(e.target));
        sesion = data;
        //console.log(data);
        console.log(sesion.username);
        Verify();

        let info = document.getElementById('navbar');
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].user == sesion.username) {
              info.innerHTML = "<h3>"+ obj[i].nombre+" "+obj[i].apellido+"<br>Usuario: "+obj[i].user+"</h3>";
              const arrayVideosDiv = split(obj[i].videoA);
              for (let i = 0; i < arrayVideosDiv.length; i++) {
                const element = parseInt(arrayVideosDiv[i]);
                for (const elemento of videosObj) {
                    if(elemento.id === element){
                        const videoContainer = document.querySelector('.videoContainer');
                        const videoCard = document.createElement('div');
                        videoCard.className = 'card';
                        videoCard.innerHTML = `<video src="${elemento.url}" width="480"muted loop controls></video>
                                        <div class="containerCard">
                                            <h4>${elemento.nombre}</h4>
                                            <p>${elemento.descripcion}</p>
                                        </div>`
                        videoContainer.append(videoCard)
                    }
                }
              }
              
            }
        }
    });

    

    function openTab(evt, tabName) {
        // Declare all variables
        var i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the link that opened the tab
        document.getElementById(tabName).style.display = "block";
        evt.currentTarget.className += " active";
      }

      function mostrar(){
        let url = "https://serviciosdigitalesplus.com/servicio/servicio.php?tipo=1&clave=201833121";
        fetch(url).then((response)=> response.json()).then(data=>{
                console.log(data.dato.length);
                let pestanaPacientes = document.getElementById("Pacientes");
                let listaPacientes = document.createElement('div');
                listaPacientes.id = 'listaPacientes';
                let cadenaHTML = "";
                cadenaHTML = `<table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Nombre</th>
                                                        <th>Apellido Paterno</th>
                                                        <th>Teléfono</th>
                                                    </tr>
                                                </thead>
                                                <tbody>`;
                for(let i=0; i < data.dato.length; i++){
                    cadenaHTML += `<tr>
                                    <td>${data.dato[i].id}</td>
                                    <td>${data.dato[i].nom}</td>
                                    <td>${data.dato[i].app}</td>
                                    <td>${data.dato[i].tel}</td>
                                    </tr>`;
                }
                cadenaHTML += `</tbody>
                                </table>`;
                listaPacientes.innerHTML = cadenaHTML;
                pestanaPacientes.append(listaPacientes);
        });
      }
