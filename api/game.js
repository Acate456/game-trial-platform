const cors = require('cors');

// 跨域处理
const corsMiddleware = cors({ origin: '*' });

// 模拟游戏数据，后续可替换为数据库
let games = [
  { id: 1, title: '仙侠世界·青云传', icon: '🎮', reward: '3.50', type: '角色扮演', link: '#' },
  { id: 2, title: '狂飙赛车', icon: '🏎️', reward: '2.80', type: '竞速竞技', link: '#' },
  { id: 3, title: '消除大冒险', icon: '💎', reward: '1.50', type: '休闲益智', link: '#' },
  { id: 4, title: '传奇霸业', icon: '⚔️', reward: '5.00', type: '传奇类', link: '#' },
];

module.exports = (req, res) => {
  corsMiddleware(req, res, () => {
    const method = req.method;

    // GET：获取游戏列表
    if (method === 'GET') {
      return res.status(200).json({ code: 0, data: games, msg: 'success' });
    }

    // POST：新增游戏
    if (method === 'POST') {
      const { title, icon, reward, type, link } = req.body;
      const newGame = {
        id: games.length + 1,
        title, icon, reward, type, link
      };
      games.push(newGame);
      return res.status(200).json({ code: 0, data: newGame, msg: '添加成功' });
    }

    // DELETE：删除游戏
    if (method === 'DELETE') {
      const { id } = req.query;
      games = games.filter(g => g.id != id);
      return res.status(200).json({ code: 0, msg: '删除成功' });
    }

    res.status(405).json({ code: -1, msg: '不支持的请求方法' });
  });
};

