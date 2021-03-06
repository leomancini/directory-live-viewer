<?php
    require('../config.php');

    $files = scandir($directory);

    $filesWithMetadata = [];

    foreach ($files as $key => $filename) {
        if ($filename !== '.' && $filename !== '..' && $filename !== '.DS_Store') {
            array_push($filesWithMetadata, [
                'id' => md5($filename),
                'name' => $filename,
                'nameWithoutExtension' => explode($timestampNameDelimiter, pathinfo($directory.$filename)['filename'])[1],
                'type' => mime_content_type($directory.$filename),
                'width' => getimagesize($directory.$filename)[0],
                'height' => getimagesize($directory.$filename)[1],
                'createdTimestampFormatted' => date("F j, Y g:i:s A", filectime($directory.$filename)),
                'createdTimestamp' => filectime($directory.$filename)
            ]);
        }
    }

    usort($filesWithMetadata, function($a, $b) {
        return ($a['createdTimestamp'] < $b['createdTimestamp']) ? -1 : 1;
    });

    echo json_encode($filesWithMetadata, JSON_PRETTY_PRINT);
?>