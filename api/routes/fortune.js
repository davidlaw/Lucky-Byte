const express = require('express');
const router = express.Router();
const { generateFortune } = require('../services/fortuneService');

// 获取开运箴言
router.post('/generate', async (req, res) => {
  try {
    const { userId, templateType = 'standard' } = req.body;
    
    // 生成开运箴言
    const fortune = await generateFortune(userId, templateType);
    
    res.json({
      success: true,
      data: fortune,
      message: '开运箴言生成成功'
    });
  } catch (error) {
    console.error('生成开运箴言失败:', error);
    res.status(500).json({
      success: false,
      message: '服务暂时不可用，请稍后再试'
    });
  }
});

// 获取箴言模板列表
router.get('/templates', (req, res) => {
  try {
    // 返回可用的模板类型
    res.json({
      success: true,
      data: {
        templates: ['standard', 'premium', 'ai-enhanced']
      }
    });
  } catch (error) {
    console.error('获取模板列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取模板列表失败'
    });
  }
});

module.exports = router;