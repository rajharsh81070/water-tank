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

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

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
  } else if (datasetSize > input_array.length) {
    toast('fail', 'Input array size less than dataset size')
    document.getElementById('dataset-size').focus()
    return
  } else if (datasetSize < input_array.length) {
    toast('fail', 'Input array size greater than dataset size')
    document.getElementById('dataset-size').focus()
    return
  }
  let lineContainerElement = document.getElementById('lines-container');

  const rows = input_array.max();
  const cols = datasetSize;

  // console.log(rows, cols);

  let table = document.createElement('table');
  table.style.width = '100%';
  table.style.height = '100%';
  // table.style.border = '1px solid black';

  for (let i = 1; i <= rows; i++) {
    let tr = table.insertRow();
    for (let j = 1; j <= cols; j++) {
      let td = tr.insertCell();
      const cell = document.createTextNode('');
      td.appendChild(cell);
      td.id = `col-${j}-height-${rows - i + 1}`;
      td.style.border = '1px solid black';
    }
  }

  lineContainerElement.appendChild(table);

  for (let i = 1; i <= datasetSize; i++) {
    let height = input_array[i - 1];
    for (let j = 1; j <= height; j++) {
      // console.log(`col-${i}-height-${j}`);
      let ele = document.getElementById(`col-${i}-height-${j}`);
      ele.style.background = 'yellow';
    }
  }
  document.getElementById('dataset-size').disabled = true;
  document.getElementById('input-array').disabled = true;
  document.getElementById('reset-btn').disabled = false;
  document.getElementById('generate-array').disabled = true;
}

const trapWater = () => {
  let height = [];
  let maxHeightLeft = [...input_array];
  let maxHeightRight = [...input_array];
  let output = 0;
  for (let i = 1; i < datasetSize; i++) {
    maxHeightLeft[i] = Math.max(input_array[i], maxHeightLeft[i - 1]);
  }
  for (let i = datasetSize - 2; i >= 0; i--) {
    maxHeightRight[i] = Math.max(input_array[i], maxHeightRight[i + 1]);
  }
  height.push(0);
  for (let i = 1; i < datasetSize - 1; i++) {
    let x = Math.min(maxHeightLeft[i], maxHeightRight[i]) - input_array[i];
    height.push(x);
    output += x;
  }
  height.push(0);
  console.log(maxHeightLeft, maxHeightRight, input_array);
  return [height, output];
}

function generateTrapWater() {
  if (!datasetSize || datasetSize < 3 || input_array.length < 3) {
    toast('fail', 'Input dataset size must be minimum 3')
    document.getElementById('dataset-size').focus()
    return
  }

  let lineContainerElement = document.getElementById('lines-container');
  // console.log(lineContainerElement);
  if (lineContainerElement.lastElementChild === null) {
    toast('fail', 'Generate Array')
    document.getElementById('generate-array').focus()
    return
  }

  let [height, output] = trapWater();
  const h3 = document.createElement('h3');
  const text = document.createTextNode(`Output: ${output}`);
  h3.appendChild(text);
  document.getElementById('output').appendChild(h3);
  for (let i = 2; i < datasetSize - 1; i++) {
    let addHeight = height[i - 1];
    for (let j = input_array[i - 1] + 1; j <= input_array[i - 1] + addHeight; j++) {
      // console.log(`col-${i}-height-${j}`);
      let ele = document.getElementById(`col-${i}-height-${j}`);
      ele.style.background = 'blue';
    }
  }

  document.getElementById('trap-water').disabled = true;
}

function resetBtn() {
  document.getElementById('reset-btn').disabled = true;
  document.getElementById('generate-array').disabled = false;
  document.getElementById('trap-water').disabled = false;
  document.getElementById('dataset-size').disabled = false;
  document.getElementById('input-array').disabled = false;
  document.getElementById('dataset-size').value = '';
  document.getElementById('input-array').value = '';
  let lineContainerElement = document.getElementById('lines-container');

  // Remove Present Children
  let child = lineContainerElement.lastElementChild;
  while (child) {
    lineContainerElement.removeChild(child);
    child = lineContainerElement.lastElementChild;
  }

  document.getElementById('output').outerHTML = "";
}