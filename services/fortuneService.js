// 开运箴言服务
const { getFortuneTemplate } = require('./templateService');
const { enhanceWithAI } = require('./aiService');

/**
 * 生成开运箴言
 * @param {string} userId - 用户ID
 * @param {string} templateType - 模板类型
 * @returns {Object} 开运箴言对象
 */
async function generateFortune(userId, templateType = 'standard') {
  // 根据类型获取模板
  const baseTemplate = getFortuneTemplate(templateType);
  
  // 如果是AI增强类型，则调用AI服务
  let enhancedContent = baseTemplate;
  if (templateType === 'ai-enhanced') {
    enhancedContent = await enhanceWithAI(baseTemplate, userId);
  }
  
  // 添加通用元素
  const fortune = {
    id: generateId(),
    userId,
    type: templateType,
    content: enhancedContent,
    timestamp: new Date().toISOString(),
    disclaimer: "本服务为情绪价值体验，不构成命运预测。天时已指，地利已明，而人和在君。心诚则灵，动则气转。福祸相依，顺其自然，方为大道。"
  };
  
  return fortune;
}

/**
 * 生成唯一ID
 * @returns {string} 唯一ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  generateFortune
};