// 模板服务
const fs = require('fs');
const path = require('path');

// 读取模板文件
const templatesDir = path.join(__dirname, '../templates');

// 标准模板库 - 128套模板
const standardTemplates = [
  {
    expectation: "阁下明后两日，财星渐明，尤利{direction}。{hour}易有意外之喜敲门",
    blessing: "你近期心思活络，正是求变之时。财神见你心诚，特此点拨：你命带福禄，所欠无非东风",
    ritual: "明日清晨，面向{direction}静立片刻，深呼吸九次",
    direction: ["东方", "南方", "西方", "北方"],
    hour: ["申时(15-17点)", "午时(11-13点)", "辰时(7-9点)", "酉时(17-19点)"]
  },
  {
    expectation: "贵人在{direction}方，{hour}或有贵人相助之象，宜把握时机。",
    blessing: "你近来运势渐升，贵人运旺。财神庇佑，前路光明，只需保持初心即可。",
    ritual: "晨起面向{direction}，心中默念感恩之语，连续{count}日",
    direction: ["东南方", "西南方", "东北方", "西北方"],
    hour: ["巳时(9-11点)", "未时(13-15点)", "戌时(19-21点)", "子时(23-1点)"],
    count: [3, 5, 7, 9]
  },
  {
    expectation: "今明{hour}，{direction}方有财气汇聚，宜主动出击。",
    blessing: "你命中有贵人扶持，近来机会频现。只需把握当下，必有所得。",
    ritual: "选择{direction}座位办公，{count}日内必见成效",
    direction: ["正东", "正南", "正西", "正北"],
    hour: ["寅时(3-5点)", "卯时(5-7点)", "亥时(21-23点)", "丑时(1-3点)"],
    count: [3, 5, 7, 9]
  }
  // 更多模板...
];

/**
 * 根据类型获取箴言模板
 * @param {string} type - 模板类型
 * @returns {Object} 模板内容
 */
function getFortuneTemplate(type = 'standard') {
  switch (type) {
    case 'premium':
      // 高级模板
      return generateTemplateFromPool(standardTemplates);
    case 'ai-enhanced':
      // AI增强模板 - 返回基础结构，由AI服务填充
      return {
        expectation: "",
        blessing: "",
        ritual: "",
        timestamp: new Date().toISOString()
      };
    case 'standard':
    default:
      // 标准模板
      return generateTemplateFromPool(standardTemplates);
  }
}

/**
 * 从模板池中随机生成一个模板
 * @param {Array} templatePool - 模板池
 * @returns {Object} 生成的模板
 */
function generateTemplateFromPool(templatePool) {
  const randomTemplate = templatePool[Math.floor(Math.random() * templatePool.length)];
  
  // 随机替换变量
  const directions = randomTemplate.direction || ["东方", "南方", "西方", "北方"];
  const hours = randomTemplate.hour || ["申时(15-17点)", "午时(11-13点)", "辰时(7-9点)", "酉时(17-19点)"];
  const counts = randomTemplate.count || [3, 5, 7, 9];
  
  let result = { ...randomTemplate };
  delete result.direction;
  delete result.hour;
  delete result.count;
  
  // 替换占位符
  result.expectation = result.expectation
    .replace('{direction}', getRandomItem(directions))
    .replace('{hour}', getRandomItem(hours))
    .replace('{count}', getRandomItem(counts));
    
  result.blessing = result.blessing
    .replace('{direction}', getRandomItem(directions))
    .replace('{hour}', getRandomItem(hours))
    .replace('{count}', getRandomItem(counts));
    
  result.ritual = result.ritual
    .replace('{direction}', getRandomItem(directions))
    .replace('{hour}', getRandomItem(hours))
    .replace('{count}', getRandomItem(counts));
  
  return result;
}

/**
 * 获取数组中的随机项
 * @param {Array} arr - 数组
 * @returns {*} 随机项
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

module.exports = {
  getFortuneTemplate,
  generateTemplateFromPool
};