// ================================================= Login ==========================================================================
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Login realizado com sucesso!");
    localStorage.setItem("nomeUsuario", data.nome);
    window.location.href = 'profile.html'
  } else {
    alert(data.error);
  }
}

async function irParaCadastro(){
  window.location.href = 'register.html'
}

// ================================================= Cadastro ==========================================================================
function voltarLogin(){
  window.location.href = '/';
}

async function register(){
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  if(password !== confirmPassword){
    alert('As senhas não conincidem')
    return
  }

  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, password, confirmPassword})
  });

  const data = await res.json();

  if(data.message){
    alert('Cadastro realizado com sucesso!');
    window.location.href = '/';
  }else{
    alert(data.error);
  }
}

// ================================================= Perfil ==========================================================================
function verificarAutenticacao(){
  const nome = localStorage.getItem('nomeUsuario');

  if(!nome){
    window.location.href = '/';
  }

  document.getElementById('nomeUsuario').innerText = nome;
}

function logout(){
  localStorage.removeItem('nomeUsuario');
  window.location.href = '/'
}