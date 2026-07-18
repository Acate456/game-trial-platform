const cors = require('cors');
const corsMiddleware = cors({ origin: '*' });

let tasks = [
  { id: 1, title: '注册下载并试玩3分钟', desc: '新用户专属，完成即得佣金', price: '5.00', type: 'trial', publisher: '官方', status: '进行中' },
  { id: 2, title: '邀请好友注册', desc: '邀请1位有效新用户，奖励实时到账', price: '8.00', type: 'new', publisher: '官方', status: '进行中' },
  { id: 3, title: '游戏等级达到30级', desc: '完成等级挑战，高额佣金', price: '20.00', type: 'trial', publisher: '官方', status: '进行中' },
];

module.exports = (req, res) => {
  corsMiddleware(req, res, () => {
    const method = req.method;

    // GET：获取任务列表，支持按类型筛选
    if (method === 'GET') {
      const { type } = req.query;
      let result = tasks;
      if (type && type !== 'all') {
        result = tasks.filter(t => t.type === type);
      }
      return res.status(200).json({ code: 0, data: result, msg: 'success' });
    }

    // POST：发布任务
    if (method === 'POST') {
      const { title, desc, price, type, publisher } = req.body;
      const newTask = {
        id: tasks.length + 1,
        title, desc, price, type, publisher,
        status: '待审核'
      };
      tasks.push(newTask);
      return res.status(200).json({ code: 0, data: newTask, msg: '发布成功，等待审核' });
    }

    res.status(405).json({ code: -1, msg: '不支持的请求方法' });
  });
};

