<!DOCTYPE html>
<html>

<head>
    <title>WOOJ</title>
    <style>
        body {
            width: 100%;
            text-align: center;
            background-color: #f2f4f7;
            color: #10223f;
        }

        .title {
            font-size: 32px;
            font-weight: bold;
        }

        .subtitle {
            font-size: 24px;
            font-weight: bold;
        }

        .box {
            margin-top: 20px;
            padding: 40px;
            background-color: #ffffff;
        }

        .box__bottom {
            margin-top: 20px;
            text-align: center;
        }

        .link {
            display: inline-block;
            padding: 7px 15px;
            border-radius: 20px;
            background-color: #d4ff38;
            color: #10223f;
            text-align: center;
            font-weight: bold;
            font-size: 18px;
            text-transform: uppercase;
        }
    </style>
</head>

<body>
    <h1 class="title">WOOJ</h1>
    <div class="box">
        <h2 class="subtitle">Подтверждение адреса электронной почты</h2>
        <p>Перейдите по ссылке ниже для подтверждения адреса электронной почты</p>

        <div class="box__bottom">
            <a class="link" href="{{ $url }}">Подтвердить</a>
        </div>
    </div>
</body>

</html>
