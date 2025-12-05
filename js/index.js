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
        list: [],       // 当前厨师队列
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

// DOM元素
const ELEMENTS = {
    timeWeek: document.getElementById('time-week'),
    timeDay: document.getElementById('time-day'),
    moneyDisplay: document.getElementById('money'),
};

// 更新时间显示
function updateTimeDisplay() {
    ELEMENTS.timeWeek.textContent = `W${Game.time.week}`;
    ELEMENTS.timeDay.textContent = `D${Game.time.day}`;
}

// 更新金钱显示
function updateMoneyDisplay() {
    ELEMENTS.moneyDisplay.textContent = Game.money;
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

// 更新游戏时间
function updateGameTime() {
    // 每秒钟更新一次时间
    Game.time.seconds++;

    // 检查是否需要进入下一天
    if (Game.time.seconds >= Game.time.daySeconds) {
        Game.time.seconds = 0;
        Game.time.day++;

        // 更新厨师工作天数
        Game.chefs.list.forEach(chef => {
            chef.daysWorked++;
        });

        // 检查是否需要进入下一周
        if (Game.time.day > 7) {
            Game.time.day = 1;
            Game.time.week++;

            // 每一周后支付厨师工资
            payChefSalaries();

            // 厨师工作天数重置为0
            Game.chefs.list.forEach(chef => {
                chef.daysWorked = 0;
            });
        }

        // 更新时间显示
        updateTimeDisplay();
    }
}

// 更新游戏金钱
function updateGameMoney(rev) {
    Game.money += rev;
    // 更新金钱显示
    updateMoneyDisplay();
}

// 支付厨师工资
function payChefSalaries() {
    const totalSalary = Game.chefs.list.reduce((total, chef) => {
        // 计算每个厨师的工资，按工作天数和每周工资计算
        const chefSalary = Math.ceil(chef.daysWorked / 7 * Game.chefs.chefWeeklySalary);
        return total + chefSalary;
    }, 0);
    // 更新游戏金钱
    updateGameMoney(-totalSalary);
}

// 初始化游戏
// document.addEventListener('DOMContentLoaded', initGame);
