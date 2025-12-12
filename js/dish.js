/*
 * 菜品类
 * 功能：用于表示菜品，通过进度条来体现
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
    // 分配所属
    assignOwner(owner) {
        this.owner = owner;
    }
    // 厨师正在做的菜进度条
    cookingDishProgressBar() {
        this.status = 'cooking';
        this.chef_dish_progress = new ProgressBar(this, {
            text: this.name,
            time: this.cookingTime,
            startColor: Game.progressBar.cookingColor[0],
            endColor: Game.progressBar.cookingColor[1],
        })
    }
    // 厨师做完等待上菜
    finish() {
        this.status = 'finish';
        this.owner.finishCooking();
    }
    // 顾客正在等待的菜单进度条
    waitingDishsProgressBar(chef) {
        // this.owner_chef = chef;
        this.status = 'waiting';
        this.table_dish_progress = new ProgressBar(this, {
            text: this.name,
            time: this.waitingTime,
            startColor: Game.progressBar.waitingDishColor[0],
            endColor: Game.progressBar.waitingDishColor[1],
        });
    }
    // 顾客正在吃的菜单进度条
    eatingDishsProgressBar() {
        this.status = 'eating';
        this.table_dish_progress.update({
            time: this.eatingTime,
            startColor: Game.progressBar.eatingDishColor[0],
            endColor: Game.progressBar.eatingDishColor[1],
        });
    }
    // 顾客用餐结束支付
    paying() {
        this.status = 'paying';

        // 如果其他菜已经为确定状态则顾客可以支付，否则等待其他菜的变化
        // const table = this.owner;
        // if (table.food.every(dish => dish.status !== 'waiting' && dish.status !== 'eating')) {
        //     table.customer.paying();
        //     table.changeStatus();
        // }
    }
    // 顾客等待超时
    timeout() {
        this.status = 'timeout';
        // 如果所有菜都超时则顾客生气
        const table = this.owner;
        if (table.food.every(dish => dish.status === 'timeout')) {
            table.customer.angry();
            table.changeStatus();
        }
    }
}

export default Dish;