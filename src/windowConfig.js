window.addEventListener('load', event=>{
  const connection_status = document.getElementById('connection_status')

  connection_status.innerText = (new Date()).toLocaleString()
})