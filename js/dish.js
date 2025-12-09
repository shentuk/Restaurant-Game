/*
 * 菜品类
 * 功能：用于表示菜品
 */
class Dish {
    constructor(options) {
        const {
            type, // 菜品类型
            name, // 菜品名称
            price, // 菜品价格
            cost, // 菜品成本
            cookingTime, // 厨师做菜时间
            waitingTime, // 顾客等待时间
            eatingTime, // 顾客就餐时间
        } = options;
        this.type = type;
        this.name = name;
        this.price = price;
        this.cost = cost;
        this.cookingTime = cookingTime;
        this.waitingTime = waitingTime;
        this.eatingTime = eatingTime;
        this.init();
    }
    // 初始化菜单
    init() {
        // 一个菜品实例，会有两个进度条dom，一个是厨师所有进度条，一个是顾客所有进度条
    }
}

