let currentDeleteId = null

function showModal(id) {
  currentDeleteId = id
  document.getElementById('confirmModal').style.display = 'block'
}

function closeModal() {
  document.getElementById('confirmModal').style.display = 'none'
}

async function doDelete() {
  await deleteFile(currentDeleteId)
  closeModal()
  renderFileList()
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else return (bytes / 1048576).toFixed(1) + ' MB'
}

async function renderFileList() {
  const files = await getFiles()
  const list = document.getElementById('file-list')
  list.innerHTML = ''
  files.forEach(file => {
    const div = document.createElement('div')
    div.style.padding = '10px'
    div.style.background = 'white'
    div.style.margin = '5px 0'
    div.style.borderRadius = '6px'
    div.innerHTML = `
      ${file.name} (${formatSize(file.size)})
      <button onclick="showModal(${file.id})" style="width:auto;float:right;background:red;">删除</button>
    `
    list.appendChild(div)
  })
}