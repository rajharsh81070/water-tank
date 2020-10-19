function toast(type, desc) {
  let toast = document.getElementById("toast")
  let toastDesc = document.getElementById("toast-desc")
  let toastIcon = document.getElementById("toast-icon")

  toast.className = "show";
  toastDesc.innerText = desc
  toastIcon.className = type === 'success' ? 'fa fa-2x fa-check-circle' : 'fa fa-2x fa-exclamation-circle'
  toastIcon.style.color = type === 'success' ? '#d0f0c0' : '#e32636'

  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 5000);
}


let datasetSize, input_array = [];

function handleDatasetSizeChange() {

  datasetSize = Number(document.getElementById('dataset-size').value)
  if (!datasetSize || datasetSize < 3) {
    toast('fail', 'Dataset size must be minimum 3')
    document.getElementById('dataset-size').focus()
    datasetSize = null
    return
  }
}

function handleInputArrayChange() {
  // console.log(document.getElementById('input-array').value);
  input_array = Array(document.getElementById('input-array').value.trim().split(' ').map(str => {
    x = Number(str);
    if (x < 0)
      return 0;
    return x;
  }))[0];
  document.getElementById('input-array').value = input_array;
}

function generateArray() {
  // console.log(datasetSize, input_array);
  if (!datasetSize || datasetSize < 3 || input_array.length < 3) {
    toast('fail', 'Input dataset size must be minimum 3')
    document.getElementById('dataset-size').focus()
    return
  }
  let lineContainerElement = document.getElementById('lines-container');

  // Remove Present Children
  let child = lineContainerElement.lastElementChild;
  while (child) {
    lineContainerElement.removeChild(child);
    child = lineContainerElement.lastElementChild;
  }

  Array.prototype.max = function () {
    return Math.max.apply(null, this);
  };

  const rows = input_array.max();
  const cols = datasetSize;

  console.log(rows, cols);

  let table = document.createElement('table');
  table.style.width = '100%';
  table.style.height = '100%';
  // table.style.border = '1px solid black';

  for (let i = 0; i < rows; i++) {
    let tr = table.insertRow();
    for (let j = 0; j < cols; j++) {
      let td = tr.insertCell();
      td.appendChild(document.createTextNode('Cell'));
      td.style.border = '1px solid black';
    }
  }
  lineContainerElement.appendChild(table);
}
