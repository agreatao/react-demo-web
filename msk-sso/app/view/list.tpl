<html>
<head>
    <title>Hacker News</title>
    <link ref="stylesheet" href="/public/css/default.css" />
</head>
<body>
    <ul class="news-view view">
        {% for item in list %}
            <li class="item"><a href="{{item.url}}">{{item.title}}</a></li>
        {% endfor %}
    </ul>
    <a href="/logout">登出</a>
</body>
</html>