// API服务器入口文件
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// 导入路由
const fortuneRouter = require('./routes/fortune');
const paymentRouter = require('./routes/payment');

// 使用路由
app.use('/api/fortune', fortuneRouter);
app.use('/api/payment', paymentRouter);

// 主页路由
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`财神亲批服务运行在端口 ${PORT}`);
});