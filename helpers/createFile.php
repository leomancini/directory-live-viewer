<?php
    require('../config.php');
    
    header("Access-Control-Allow-Origin: *");
    
    if ($_GET['dataType'] === 'png_base64') {
        $imageData = base64_decode($_POST['image']);

        file_put_contents($directory.time().$timestampNameDelimiter.$_POST['name'].'.png', $imageData);
    } else {
        $inputFilename = basename($_FILES['image']['name']);
        $inputFileExtension = strtolower(pathinfo($directory.$inputFilename, PATHINFO_EXTENSION));

        $newFilename = $directory.time().$timestampNameDelimiter.$_POST['name'].'.'.$inputFileExtension;
        move_uploaded_file($_FILES['image']['tmp_name'], $newFilename);
    }
?>