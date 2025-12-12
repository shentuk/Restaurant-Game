// 游戏全局配置
export default {
    // 时间配置
    time: {
        timer: null,       // 时间器
        week: 1,           // 周数，从第1周开始
        day: 1,            // 天数，从第1天开始
        seconds: 0,        // 秒数
        daySeconds: 48,   // 每天秒数
        start: true,       // 游戏是否开始
    },
    // 金钱配置
    money: 500,         // 初始金钱500
    // 菜单配置
    dishMenu: {
        menuType: [
            {
                title: '凉菜（二选一，可不点）',
                list: [
                    { type: 'liangcai', name: '凉菜SAN', price: 6, cost: 2, cookingTime: 6, waitingTime: 15, eatingTime: 6 },
                    { type: 'liangcai', name: '冷切DOM', price: 4, cost: 1, cookingTime: 6, waitingTime: 15, eatingTime: 6 },
                ]
            },
            {
                title: '主菜（五选一，必点）',
                list: [
                    { type: 'zhucai', name: 'UL炖LI', price: 12, cost: 3, cookingTime: 10, waitingTime: 25, eatingTime: 8 },
                    { type: 'zhucai', name: '红烧HEAD', price: 15, cost: 4, cookingTime: 10, waitingTime: 25, eatingTime: 8 },
                    { type: 'zhucai', name: '酥炸ECharts', price: 18, cost: 5, cookingTime: 10, waitingTime: 25, eatingTime: 8 },
                    { type: 'zhucai', name: '炙烤CSS', price: 16, cost: 4, cookingTime: 10, waitingTime: 25, eatingTime: 8 },
                    { type: 'zhucai', name: '清蒸DIV', price: 12, cost: 3, cookingTime: 10, waitingTime: 25, eatingTime: 8 },
                ]
            },
            {
                title: '饮品（二选一，可不点）',
                list: [
                    { type: 'drink', name: '鲜榨flex', price: 5, cost: 1, cookingTime: 6, waitingTime: 15, eatingTime: 4 },
                    { type: 'drink', name: '小程序奶茶', price: 6, cost: 2, cookingTime: 6, waitingTime: 15, eatingTime: 4 },
                ]
            },
        ],
        curCheckedDishs: [],     // 当前顾客已选中的菜品
        curCheckedDishsTotalPrice: 0,     // 当前顾客已选中的菜品总金额
        chefTodos: [],       // 厨师待做菜单
        customerWaitingDishs: [],    // 顾客等待菜单
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
        waitingTime: 24,        // 顾客等位时间24秒
        customersVisitedToday: [], // 今天已经来过的顾客
    },
    // 餐桌配置
    tables: {
        emptyNum: 4,    // 空桌数
        list: []        // 餐桌队列
    },
    // 进度条配置
    progressBar: {
        waitingSeatColor: ['#4299e1', '#2166c0'], // 等位条颜色
        waitingDishColor: ['#e22f29', '#8f0707'], // 等菜条颜色
        eatingDishColor: ['#e67d54', '#cc5405'], // 用餐条颜色
        payingColor: '#0d9c0d', // 支付条颜色
        timeoutColor: '#282626ff', // 超时条颜色
        cookingColor: ['#e67d54', '#b44d08'], // 做菜条颜色
        finishCookingColor: '#947de6', // 做完菜条颜色
    }
}