<!DOCTYPE html>
<html>

<head>
    <title>WOOJ</title>
    <style>
        body {
            padding: 20px 20px 40px 20px;
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
            padding: 30px;
            background-color: #ffffff;
        }

        .box__bottom {
            margin-top: 30px;
            text-align: center;
        }

        .link {
            display: inline-block;
            padding: 7px 40px;
            border-radius: 20px;
            background-color: #d4ff38;
            color: #10223f;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
            text-transform: uppercase;
            text-decoration: none;
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
