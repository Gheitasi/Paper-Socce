<!DOCTYPE html>
<html lang="fa" dir="rtl">
    <head>
        <meta charset="utf-8">
        <?php $cssVersion = "1.1.0" ?>
        <title>Paper Soccer</title>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <script src="Node.js" charset="utf-8"></script>
        <link rel="stylesheet" href="style.css?ver=<?php echo $cssVersion; ?>">
    </head>
    <body>

        <div class="nobat" style="width:100%;">

                <input type="text" id="rowbx"  placeholder="شماره ردیف"  onkeydown = "if (event.keyCode == 13)
                        document.getElementById('colbx').focus()">
                <input type="text" id="colbx"  placeholder="شماره ستون" onkeydown = "if (event.keyCode == 13)
                        document.getElementById('btnSearch').click()">
                <button id="btnSearch" onclick="showResult()">ثبت</button>
            <br/>
            <div class="center">
                <div style="display:inline-block;">نوبت:</div>
                <b id="nobatSh" style="display:inline-block;"></b>
            </div>


        </div>
        <div class="canvas"style="width:100%;float:left;">
            <canvas id="canvas" width="360" height="560"></canvas>
        </div>



        <script src="main.js?ver=<?php echo $cssVersion; ?>" charset="utf-8"></script>

    </body>
</html>
