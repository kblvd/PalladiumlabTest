const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('file-preview-container');
const addFileButton = document.getElementById('add-file-button');
const errorMessage = document.getElementById('error-message');
const svgg = document.getElementById('svgg');
const openFilePickerButton = document.getElementById('open-file-picker');
const maxFiles = 5;
let allFiles = [];

openFilePickerButton.addEventListener('click', function() {
  previewContainer.style.display = 'flex'; 
  svgg.style.display = 'block';
  fileInput.click(); 
});

addFileButton.addEventListener('click', function() {
  fileInput.click();
});

fileInput.addEventListener('change', function(event) {
  const newFiles = Array.from(event.target.files);

  if (allFiles.length + newFiles.length > maxFiles) {
    errorMessage.textContent = `Вы можете выбрать максимум ${maxFiles} файлов.`; 
    errorMessage.style.display = 'block'; 
    fileInput.value = ''; 
    return;
  }

  errorMessage.style.display = 'none'; 
  allFiles = [...allFiles, ...newFiles]; 

  previewContainer.innerHTML = '';
  previewContainer.appendChild(addFileButton);

  allFiles.forEach((file, index) => {
    const fileReader = new FileReader();
    const filePreview = document.createElement('div');
    filePreview.classList.add('file-preview');

    const removeButton = document.createElement('button');
    removeButton.classList.add('file-remove');
    removeButton.innerHTML = '×';

    removeButton.addEventListener('click', function() {
      allFiles.splice(index, 1); 
      filePreview.remove(); 
    });

    fileReader.onload = function(e) {
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = e.target.result;
        filePreview.appendChild(img);
      } else {
        const fileTypeIcon = document.createElement('div');
        fileTypeIcon.textContent = file.name.split('.').pop().toUpperCase();
        fileTypeIcon.style.fontSize = '8px';
        fileTypeIcon.classList.add('file-preview') 
        fileTypeIcon.style.color = '#222';
        fileTypeIcon.style.background = "#fff";
        filePreview.appendChild(fileTypeIcon);
      }
      filePreview.appendChild(removeButton);
      previewContainer.insertBefore(filePreview, addFileButton);
    };

    fileReader.readAsDataURL(file);
  });

  fileInput.value = ''; 
});
