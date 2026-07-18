const cors = require('cors');
const corsMiddleware = cors({ origin: '*' });

// 模拟用户数据
let users = [
  { id: 1, username: 'test', phone: '13800138000', balance: '12.50', regTime: '2025-01-01', status: '正常' }
];

module.exports = (req, res) => {
  corsMiddleware(req, res, () => {
    const method = req.method;
    const { action } = req.query;

    // 登录
    if (method === 'POST' && action === 'login') {
      const { username, password } = req.body;
      // 简化逻辑，后续对接数据库+密码加密
      const user = users.find(u => u.username === username);
      if (user) {
        return res.status(200).json({ code: 0, data: user, msg: '登录成功' });
      }
      return res.status(200).json({ code: -1, msg: '账号或密码错误' });
    }

    // 注册
    if (method === 'POST' && action === 'register') {
      const { username, phone, password } = req.body;
      const exist = users.find(u => u.username === username);
      if (exist) {
        return res.status(200).json({ code: -1, msg: '账号已存在' });
      }
      const newUser = {
        id: users.length + 1,
        username, phone,
        balance: '0.00',
        regTime: new Date().toLocaleDateString(),
        status: '正常'
      };
      users.push(newUser);
      return res.status(200).json({ code: 0, data: newUser, msg: '注册成功' });
    }

    // 获取用户信息
    if (method === 'GET' && action === 'info') {
      const { id } = req.query;
      const user = users.find(u => u.id == id);
      return res.status(200).json({ code: 0, data: user, msg: 'success' });
    }

    res.status(405).json({ code: -1, msg: '不支持的请求方法' });
  });
};
