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

  if (data.token) {
    alert("Login realizado com sucesso!");
    localStorage.setItem("token", data.token);
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

  const res = await fetch('/auth/register', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name, email, password})
  });

  const data = await res.json();

  if(data.message){
    alert('Cadastro realizado com sucesso!');
    window.location.href = '/';
  }else{
    alert(data.error);
  }
}