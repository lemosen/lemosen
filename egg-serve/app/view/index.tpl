<html>
<head>
    <title>Hacker News</title>
    <!--<link rel="stylesheet" href="/public/css/news.css" />-->
</head>
<body>
<ul class="news-view view">
    <body>
    <ul class="news-view view">
        {% for item in list %}
        <li class="item">
            <p>{{ item.name }}</p>
        </li>
        {% endfor %}
    </ul>
    </body>
</ul>
</body>
</html>