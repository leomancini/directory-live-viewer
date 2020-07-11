const config = {
    'getFilesApi': 'helpers/getFiles.php',
    'filesDirectory': './files/'
}

function checkDirectoryForChanges() {
    fetch(config.getFilesApi)
        .then(response => response.json())
        .then(files => {
            const newFiles = files.filter(file1 => !window.files.some(file2 => file2.name === file1.name));

            if (newFiles.length > 0) {                
                showNewFile(newFiles[0]); // TODO: Add support for adding multiple files at once
                window.files = files;
            }

            // TODO: Remove list items when file is deleted
        });
        
    setTimeout(function() {
        checkDirectoryForChanges();
    }, 1000);
}

function fileListItem(file, newOrExisting) {
    return `
        <li id='${file.id}' class='${newOrExisting}'>
            <img src='${config.filesDirectory}${file.name}'>
            <div class='metadata'>
                <h1>${file.nameWithoutExtension}</h1>
                <p>${file.createdTimestampFormatted}</p>
            </div>
        </li>`;
}

function showNewFile(file) {
    newFileTempContainer.innerHTML = fileListItem(file, 'newFileTemp');

    const newFileListItem = document.querySelector(`ul#newFileTempContainer`).children[0];

    setTimeout(function() {
        newFileListItem.style.height =
            `${parseInt(window.getComputedStyle(document.querySelector("li img"), null).getPropertyValue('margin-top'))
            + Math.round(file.height / (file.width / document.querySelector("li img").width))
            + parseInt(window.getComputedStyle(document.querySelector("li img"), null).getPropertyValue('margin-bottom'))
            + document.querySelector(".metadata").offsetHeight}px`;
        newFileListItem.style.marginBottom = `${parseInt(window.getComputedStyle(document.querySelector("li .metadata"), null).getPropertyValue('margin-bottom'))}px`;

        setTimeout(function() {
            newFileListItem.classList.add('visible');

            setTimeout(moveNewFileToExistingFiles, 1000);
        }, 600);
    }, 500);
}

function moveNewFileToExistingFiles() {
    const newFile = document.querySelector(`ul#newFileTempContainer`).children[0];
    newFile.classList.remove('newFileTemp');
    newFile.classList.remove('visible');
    newFile.classList.add('existingFile');

    filesList.prepend(newFile);
}

function showExistingFiles(files) {
    let filesListItems = [];

    files.forEach(function(file) {
        filesListItems.unshift(fileListItem(file, 'existingFile'));
    });

    filesList.innerHTML = filesListItems.join('');
}

const filesList = document.querySelector("ul#files");
const newFileTempContainer = document.querySelector("ul#newFileTempContainer");

fetch(config.getFilesApi)
    .then(response => response.json())
    .then(files => {
        window.files = files;
        showExistingFiles(files);
        checkDirectoryForChanges();
    });