document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelector('.btn-login').addEventListener('click', () => {
    redirect('./pages/login.html')
  });

  document.querySelector('.btn-register').addEventListener('click', () => {
    redirect('./pages/register.html')
  });
});

function redirect(path){
  window.location.href = path;
}