const cors = require('cors');
const axios = require('axios');
const corsMiddleware = cors({ origin: '*' });

module.exports = (req, res) => {
  corsMiddleware(req, res, async () => {
    const { action } = req.query;

    // 测试所有API连通性
    if (action === 'test') {
      const results = {};

      // 1. 硅基流动测试
      try {
        await axios.post('https://api.siliconflow.cn/v1/chat/completions', {
          model: 'Qwen/Qwen2-7B-Instruct',
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 5
        }, {
          headers: { Authorization: `Bearer ${process.env.SILICONFLOW_API_KEY}` }
        });
        results.siliconflow = '✅ 连通正常';
      } catch (e) {
        results.siliconflow = '❌ 连接失败：' + e.message;
      }

      // 2. Agnes AI测试
      try {
        await axios.post('https://platform.agnes-ai.com/api/v1/chat/completions', {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 5
        }, {
          headers: { Authorization: `Bearer ${process.env.AGNES_API_KEY}` }
        });
        results.agnes = '✅ 连通正常';
      } catch (e) {
        results.agnes = '❌ 连接失败：' + e.message;
      }

      // 3. 千问、豆包、小米仅做密钥格式校验，不消耗额度
      results.qwen = process.env.QWEN_API_KEY ? '🔑 密钥已配置' : '⚠️ 未配置密钥';
      results.doubao = process.env.DOUBAO_API_KEY ? '🔑 密钥已配置' : '⚠️ 未配置密钥';
      results.mimo = process.env.MIMO_API_KEY ? '🔑 密钥已配置' : '⚠️ 未配置密钥';

      return res.status(200).json({ code: 0, data: results, msg: '测试完成' });
    }

    res.status(405).json({ code: -1, msg: '不支持的操作' });
  });
};

