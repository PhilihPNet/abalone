<?php
session_start();
?>
<html>
<head>
<meta name="viewport" content="width=device-width, minimum-scale=0.1">
	<meta charset="UTF-8">
		<link href='abalone.css' rel='stylesheet'>

<title>Abaalone</title>
<style>

    </style>
<script>
</script>
    <script type="text/javascript" src="abalone.js"></script>
    <script type="text/javascript" src="ReqAjax.js"></script>

</head>
<body style="">
<div id="jeu" style="width:562px;height:500px;">
	<div id="pave">
	</div>
	<img id="plateau" style="" src="./images/plateauP.png">
</div>
<fieldset id="info"></fieldset>
</body>
<script>

init();
document.oncontextmenu= false;
function refresh(){ReqAjax('deplacement','js');}
	var timeoutID = window.setInterval(refresh,1000);

</script>
</html>