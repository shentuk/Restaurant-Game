/*
 * 主函数入口
 */

// import Restaurant from './restaurant.js';
// import Chef from './chef.js';
// import Customer from './customer.js';
// import ProgressBar from './progressbar.js';

// 游戏全局配置
const Game = {
    // 时间配置
    time: {
        timer: null,       // 时间器
        week: 1,           // 周数，从第1周开始
        day: 1,            // 天数，从第1天开始
        seconds: 0,        // 秒数
        daySeconds: 240,   // 每天秒数
    },
    // 金钱配置
    money: 500,         // 初始金钱500
    // 菜单配置
    dishMenu: {
        list: [         // 菜品菜单
            { type: '凉菜', name: '凉菜SAN', cost: 3, price: 6, cookingTime: 4, waitingTime: 10, eatingTime: 6 },
            { type: '凉菜', name: '冷切DOM', cost: 2, price: 4, cookingTime: 4, waitingTime: 10, eatingTime: 6 },
            { type: '主菜', name: 'UL炖LI', cost: 5, price: 12, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
            { type: '主菜', name: '红烧HEAD', cost: 6, price: 15, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
            { type: '主菜', name: '酥炸ECharts', cost: 7, price: 18, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
            { type: '主菜', name: '炙烤CSS', cost: 6, price: 16, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
            { type: '主菜', name: '清蒸DIV', cost: 4, price: 12, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
            { type: '饮品', name: '鲜榨flex', cost: 2, price: 5, cookingTime: 4, waitingTime: 10, eatingTime: 4 },
            { type: '饮品', name: '小程序奶茶', cost: 2, price: 6, cookingTime: 4, waitingTime: 10, eatingTime: 4 },
        ],
        todo: [],       // 待做菜单
    },
    // 厨师配置
    chefs: {
        maxChefs: 6,    // 最大厨师数
        minChefs: 1,    // 最小厨师数
        num: 1,         // 当前厨师数，默认必须有一个厨师
        chefWeeklySalary: 140, // 每周厨师工资140元
    },
    // 顾客配置
    customers: {
        maxWaitingCustomers: 6, // 最大等待顾客数
        waitingCustomers: [],   // 等待顾客队列
    },
    // 餐桌配置
    tables: {
        emptyNum: 4,    // 空桌数
        list: [
            { id: 1, status: 'empty', customer: null, food: [] },
            { id: 2, status: 'empty', customer: null, food: [] },
            { id: 3, status: 'empty', customer: null, food: [] },
            { id: 4, status: 'empty', customer: null, food: [] }
        ],
    },
}

// 初始化游戏
function initGame() {
    // 默认有一个厨师
    // 弹出游戏开始弹窗
}

// 点击“开始经营吧”
function startGame() {
    // 隐藏游戏开始弹窗
    // 时间开始计时
    // 顾客随机进入餐馆
}

// 初始化游戏
// document.addEventListener('DOMContentLoaded', initGame);
