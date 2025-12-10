/*
 * 菜品类
 * 功能：用于表示菜品
 */
import Game from './configs.js'
import ProgressBar from "./progressbar.js";

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
    }
    // 顾客正在等待的菜单
    waitingDishs() {
        this.table_dish = new ProgressBar(this, {
            text: this.name,
            time: this.waitingTime,
            startColor: Game.progressBar.waitingDishColor[0],
            endColor: Game.progressBar.waitingDishColor[1],
        });
    }
    // 厨师正在做的菜
    cookingDishs() {
        this.chef_dish = new ProgressBar(this, {
            text: this.name,
            time: this.cookingTime,
            startColor: Game.progressBar.cookingColor[0],
            endColor: Game.progressBar.cookingColor[1],
        })
    }
}

export default Dish;