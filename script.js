const editor = document.getElementById('editor')
const input = document.getElementById('code-input')
const parent = document.getElementById("parent")
const output = document.getElementById('output')
const searchBar = document.getElementById('searchBar');
let projectName; 
let projectNameCrypt;
let name;

function closeEditor() {
  editor.hidden=true
  window.location.reload()
}
window.addEventListener("load",()=>{
  editor.hidden=true;
  domPopulate()
  if (!localStorage.getItem('nex-username')) {
    const user = prompt("enter your name")
    localStorage.setItem('nex-username',user)
  }
})
function setNewProject() {
    projectName = prompt("enter project name")
     name = localStorage.getItem('nex-username');
     projectNameCrypt = `project-${name}-${projectName}`
     if (projectName===null) {
       projectNameCrypt=`${name}-unnamed`
     }
    if (!localStorage.getItem(projectNameCrypt)) {
    localStorage.setItem(projectNameCrypt,input.value)
    }
    input.addEventListener("input",()=>{
      localStorage.setItem(projectNameCrypt,input.value)
    })
}
function openCodeEditor() {
    editor.hidden = false
}

function newProject() {
  setNewProject();
  openCodeEditor();
}

function updateCode() {
  output.srcdoc=input.value;
}

input.addEventListener("input",updateCode)
function getProjects() {
  let projectList = []
  for (var i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.startsWith('project')) {
      projectList.push(key)
    }
  }
  return projectList;
}
function domPopulate() {
  const projectList = getProjects()
  projectList.forEach((item)=>{
    const closeBtn = document.createElement('button')
    closeBtn.setAttribute('class','btn btn-square-x-small')
    closeBtn.innerHTML='×';
    closeBtn.addEventListener('click',()=>{
      localStorage.removeItem(item)
      window.location.reload()
    })
    
    const openBtn = document.createElement('button')
    openBtn.setAttribute('class','btn btn-square-x-small')
    openBtn.innerHTML='+'
    const downloadButton= document.createElement("button")
    downloadButton.setAttribute('class','btn')
    downloadButton.innerHTML="download"
    downloadButton.addEventListener('click',()=>{
      const html = localStorage.getItem(item)
      const blob = new Blob([html],{type:'text/html'})
      saveAs(blob,`${item}.html`)
    })
    
    const li=document.createElement('li');
    li.innerHTML=item;
    li.appendChild(closeBtn)
    li.appendChild(openBtn)
    openBtn.addEventListener('click',()=>{
      projectNameCrypt=item;
      openCodeEditor()
      input.value=localStorage.getItem(item)
      input.addEventListener('input',()=>{
        localStorage.setItem(item,input.value)
      })
    }) 
    li.appendChild(downloadButton)
    parent.appendChild(li)
  })
  searchBar.addEventListener('input', () => {
    const q = searchBar.value.toLowerCase()
    const filteredList = projectList.filter((project)=>{
      return project.toLowerCase().includes(q);
    })
    parent.innerHTML=''
    filteredList.forEach((item)=>{
      const closeBtn = document.createElement('button')
      closeBtn.setAttribute('class', 'btn btn-square-x-small')
      closeBtn.innerHTML = '×';
      closeBtn.addEventListener('click', () => {
        localStorage.removeItem(item)
        window.location.reload()
      })
      
      const openBtn = document.createElement('button')
      openBtn.setAttribute('class', 'btn btn-square-x-small')
      openBtn.innerHTML = '+'
      const downloadButton = document.createElement("button")
      downloadButton.setAttribute('class', 'btn')
      downloadButton.innerHTML = "download"
      downloadButton.addEventListener('click', () => {
        const html = localStorage.getItem(item)
        const blob = new Blob([html], { type: 'text/html' })
        saveAs(blob, `${item}.html`)
      })
      
      const li = document.createElement('li');
      li.innerHTML = item;
      li.appendChild(closeBtn)
      li.appendChild(openBtn)
      openBtn.addEventListener('click', () => {
        projectNameCrypt = item;
        openCodeEditor()
        input.value = localStorage.getItem(item)
        input.addEventListener('input', () => {
          localStorage.setItem(item, input.value)
        })
      })
      li.appendChild(downloadButton)
      parent.appendChild(li)
    })
  })
}