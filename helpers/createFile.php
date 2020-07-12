<?php
    require('../config.php');

    $inputFilename = basename($_FILES["image"]["name"]);
    $inputFileExtension = strtolower(pathinfo($directory.$inputFilename, PATHINFO_EXTENSION));

    $newFilename = $directory.$_POST['name'].'.'.$inputFileExtension;

    if (move_uploaded_file($_FILES["image"]["tmp_name"], $newFilename)) {
        echo "File uploaded: $newFilename";
    } else {
        echo "Error uploading file";
    }
?>