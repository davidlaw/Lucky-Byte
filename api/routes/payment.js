const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPayment } = require('../services/paymentService');

// 发起支付
router.post('/initiate', async (req, res) => {
  try {
    const { userId, amount, productName } = req.body;
    
    // 验证参数
    if (!userId || !amount || !productName) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数'
      });
    }
    
    // 发起支付
    const paymentResult = await initiatePayment(userId, amount, productName);
    
    res.json({
      success: true,
      data: paymentResult,
      message: '支付发起成功'
    });
  } catch (error) {
    console.error('发起支付失败:', error);
    res.status(500).json({
      success: false,
      message: '支付发起失败，请稍后再试'
    });
  }
});

// 验证支付结果
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentId } = req.body;
    
    // 验证参数
    if (!orderId || !paymentId) {
      return res.status(400).json({
        success: false,
        message: '缺少必要参数'
      });
    }
    
    // 验证支付结果
    const verificationResult = await verifyPayment(orderId, paymentId);
    
    res.json({
      success: true,
      data: verificationResult,
      message: verificationResult.isVerified ? '支付验证成功' : '支付验证失败'
    });
  } catch (error) {
    console.error('验证支付结果失败:', error);
    res.status(500).json({
      success: false,
      message: '支付验证失败，请稍后再试'
    });
  }
});

module.exports = router;