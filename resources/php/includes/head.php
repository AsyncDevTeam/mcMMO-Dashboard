<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/x-icon" href="resources/others/textures/defaultLogo/def.ico">
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Mende+Kikakui&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.5.1.js" defer></script>
    <!-- Toast with sweetAlert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.6.16/dist/sweetalert2.all.min.js"></script>
    <!-- User editable -->
    <script src="config/parameters.js" defer></script>
    <link rel="stylesheet" href="config/parameters.css">
    <!-- script of the project -->
    <script src="resources/js/shared.js" defer></script>
    <!-- icon from fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
    <!-- css style of the project -->
    <link rel="stylesheet" href="resources/css/root.css">
    <link rel="stylesheet" href="resources/css/header.css">
    <link rel="stylesheet" href="resources/css/main.css">
    <link rel="stylesheet" href="resources/css/table.css">
    <link rel="stylesheet" href="resources/css/collapsible.css">
    <link rel="stylesheet" href="resources/css/media.css">
    <link rel="stylesheet" href="resources/css/sizes.css">
    <!-- page title -->
    <title>mcMMO Stats</title>
    <!-- csrf token -->
    <?php
    session_start();
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = session_create_id(bin2hex(random_bytes(16)));
    }
    ?><input type="hidden" id="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
