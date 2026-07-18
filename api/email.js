const cors = require('cors');
const nodemailer = require('nodemailer');
const corsMiddleware = cors({ origin: '*' });

module.exports = (req, res) => {
  corsMiddleware(req, res, async () => {
    const { action } = req.query;

    // 发送测试邮件
    if (action === 'test') {
      const { to } = req.body;

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_USER}>`,
          to: to,
          subject: '佑爆平台 - 邮件测试',
          text: '恭喜您，邮件服务配置成功！'
        });

        return res.status(200).json({ code: 0, msg: '测试邮件发送成功' });
      } catch (e) {
        return res.status(200).json({ code: -1, msg: '发送失败：' + e.message });
      }
    }

    res.status(405).json({ code: -1, msg: '不支持的操作' });
  });
};

