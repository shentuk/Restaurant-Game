// 游戏全局配置
export default {
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
        menuType: [
            {
                type: 'liangcai',
                title: '凉菜（二选一，可不点）',
                list: [
                    { name: '凉菜SAN', price: 6, cost: 3, cookingTime: 4, waitingTime: 10, eatingTime: 6 },
                    { name: '冷切DOM', price: 4, cost: 2, cookingTime: 4, waitingTime: 10, eatingTime: 6 },
                ]
            },
            {
                type: 'zhucai',
                title: '主菜（五选一，必点）',
                list: [
                    { name: 'UL炖LI', price: 12, cost: 5, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
                    { name: '红烧HEAD', price: 15, cost: 6, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
                    { name: '酥炸ECharts', price: 18, cost: 7, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
                    { name: '炙烤CSS', price: 16, cost: 6, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
                    { name: '清蒸DIV', price: 12, cost: 4, cookingTime: 6, waitingTime: 18, eatingTime: 8 },
                ]
            },
            {
                type: 'drink',
                title: '饮品（二选一，可不点）',
                list: [
                    { name: '鲜榨flex', price: 5, cost: 2, cookingTime: 4, waitingTime: 10, eatingTime: 4 },
                    { name: '小程序奶茶', price: 6, cost: 2, cookingTime: 4, waitingTime: 10, eatingTime: 4 },
                ]
            },
        ],
        curCheckedDishsType: [],       // 当前顾客已选中的菜品类型
        curCheckedDishsTotalPrice: 0,     // 当前顾客已选中的菜品总金额
        todo: [],       // 待做菜单
    },
    // 厨师配置
    chefs: {
        list: [],       // 当前厨师队列
        maxChefs: 6,    // 最大厨师数
        minChefs: 1,    // 最小厨师数
        curChefsNum: 0,         // 当前厨师数
        chefWeeklySalary: 140, // 每周厨师工资140元
    },
    // 顾客配置
    customers: {
        list: [    // 顾客队列
            { id: 1, name: 'Zhao', head: 'images/Zhao.png' },
            { id: 2, name: 'Qian', head: 'images/Qian.png' },
            { id: 3, name: 'Sun', head: 'images/Sun.png' },
            { id: 4, name: 'Li', head: 'images/Li.png' },
            { id: 5, name: 'Zhou', head: 'images/Zhou.png' },
            { id: 6, name: 'Wu', head: 'images/Wu.png' },
            { id: 7, name: 'Zhen', head: 'images/Zhen.png' }
        ],
        maxWaitingCustomers: 6, // 最大等待顾客数
        waitingCustomers: [],   // 等待顾客队列
    },
    // 餐桌配置
    tables: {
        emptyNum: 4,    // 空桌数
        list: []        // 餐桌队列
    },
}