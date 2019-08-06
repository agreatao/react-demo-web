```npm run start``` 开发模式启动代码
```npm run server``` 启动服务，启动后通过 ```localhost/xxxx```访问页面（其中，xxxx和下文中的xxx是同一个）

```npm run build``` 打包代码（生产模式，会将代码压缩）


页面在`src/modules`里开发，需要新建一个文件夹代表模块（页面）名称，文件夹中新建`app.js`代表页面文件，需要引入

```javascript
import entry from "utils/entry";
import React from "react";
```

新增modules后，需要在`config/development.config.js`和`config/production.config.js`里配置`pages`，在数组添加一个字符串，和`src/modules`的文件夹名称保持一致

并在根目录下的`app.js`添加路由
```javascript
app.use(`${CONFIG.baseURL}/xxx`, express.static(path.join(__dirname, "dist/templates", "xxx.html")));
```
其中，xxx和上文中的modules文件夹中的文件夹名保持一致

