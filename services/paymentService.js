// 支付服务
const crypto = require('crypto');

/**
 * 发起支付
 * @param {string} userId - 用户ID
 * @param {number} amount - 金额
 * @param {string} productName - 产品名称
 * @returns {Object} 支付结果
 */
async function initiatePayment(userId, amount, productName) {
  // 生成订单号
  const orderId = generateOrderId();
  
  // 创建支付参数（模拟）
  const paymentParams = {
    orderId,
    userId,
    amount,
    productName,
    timestamp: Date.now(),
    status: 'pending'
  };
  
  // 这里应该集成实际的支付网关
  // 如微信支付、支付宝等
  
  return {
    orderId,
    userId,
    amount,
    productName,
    paymentUrl: `/h5/pay?order_id=${orderId}`, // H5支付页面
    expiresAt: Date.now() + 30 * 60 * 1000 // 30分钟后过期
  };
}

/**
 * 验证支付结果
 * @param {string} orderId - 订单ID
 * @param {string} paymentId - 支付ID
 * @returns {Object} 验证结果
 */
async function verifyPayment(orderId, paymentId) {
  // 实际应用中应调用支付网关API验证
  // 这里是模拟实现
  
  // 模拟支付验证成功
  const isVerified = Math.random() > 0.1; // 90%成功率
  
  return {
    orderId,
    paymentId,
    isVerified,
    verifiedAt: new Date().toISOString(),
    userId: `user_${orderId.substring(0, 8)}`
  };
}

/**
 * 生成订单号
 * @returns {string} 订单号
 */
function generateOrderId() {
  return 'ORDER_' + Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  initiatePayment,
  verifyPayment
};