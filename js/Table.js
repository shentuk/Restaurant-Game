/*
 * 餐桌类
 */

import ELEMENTS from './doms.js';
import Game from './configs.js';

class Table {
    constructor(id) {
        this.id = id; // 餐桌编号
        this.init();
        this.free(true);
    }
    // 初始化餐桌
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('table', 'humanHead');
        this.dom.innerHTML = `
            <div class="checkedDishs"></div>
            <img src="./images/Coin.png" alt="" class="payIcon">
            <img src="./images/redheart.png" alt="" class="appeaseIcon">
        `;
        // 插入到餐桌容器中
        ELEMENTS.tableSection.appendChild(this.dom);

        this.bindEvents();
    }
    // 绑定事件
    bindEvents() {
        this.payIcon = this.dom.querySelector('.payIcon');
        this.appeaseIcon = this.dom.querySelector('.appeaseIcon');

        // 点击支付图标
        this.payIcon.addEventListener('click', () => {
            // // 支付金额
            // Game.money -= this.customer.pay;
            // // 更新金钱显示
            // ELEMENTS.moneyDisplay.textContent = Game.money;
            // // 顾客状态改变
            // this.customer.status = 'payed';
            // // 改变餐桌状态
            // this.changeStatus();
        }, this);
        // 点击安抚图标，顾客离开餐厅
        this.appeaseIcon.addEventListener('click', () => {
            // 顾客状态改变
            this.customer.leave();
            // 改变餐桌状态
            this.free();
        }, this);
    }
    // 餐桌空闲
    free(init = false) {
        this.dom.dataset.status = 'free';
        this.customer = null;  // 顾客实例
        this.food = [];        // 食物
        // 空桌数增加
        if (!init) {
            this.customerHead.remove(); // 清空头像
            this.appeaseIcon.classList.remove('show'); // 清空安抚图标
            this.payIcon.classList.remove('show');  // 清空支付图标
            this.dom.querySelector('.checkedDishs').innerHTML = ''; // 清空已点菜品
            Game.tables.emptyNum++;
        }
    }
    // 分配桌子
    assignCustomer(customer) {
        this.customer = customer; // 顾客实例
        // 顾客上座
        this.customerHead = document.createElement('img');
        this.customerHead.classList.add('customerHead');
        this.customerHead.src = this.customer.head;
        this.dom.appendChild(this.customerHead);
        // 空桌数减少
        Game.tables.emptyNum--;
    }
    // 分配菜单，等待上菜
    assignMenu() {
        for (const dish of this.food) {
            // 分配菜单
            dish.assignOwner(this);
            // 进度条：开始等待上菜
            dish.waitingDishsProgressBar();
            // 挂载
            const checkedDish = document.createElement('div');
            checkedDish.classList.add('checkedDish');
            checkedDish.appendChild(dish.table_dish_progress.dom);

            // 上菜图标
            const serveDishIcon = document.createElement('img');
            serveDishIcon.classList.add('serveDishIcon');
            serveDishIcon.src = './images/Food-Dome.png';
            serveDishIcon.addEventListener('click', () => {
                // 上菜
                this.serveDish(dish);
            });
            checkedDish.appendChild(serveDishIcon);

            this.dom.querySelector('.checkedDishs').appendChild(checkedDish);
        }

        this.changeStatus();
    }
    // 上菜用餐
    serveDish(dish) {
        // dish.eatingDishsProgressBar();

        // // 顾客开始用餐
        // this.customer.eatingDish();
        // this.changeStatus();
    }
    // 顾客状态改变时，改变餐桌样式状态
    changeStatus() {
        const status = this.customer.status;
        if (status === 'waitingDish') {
            this.dom.dataset.status = 'waitingDish';// 等待上菜
        }
        else if (status === 'eatingDish') {
            this.dom.dataset.status = 'eatingDish';// 顾客用餐
        }
        else if (status === 'paying') {
            this.dom.dataset.status = 'paying';// 顾客支付
            this.dom.querySelector('.payIcon').classList.add('show');
        }
        else if (status === 'angry') {
            this.dom.dataset.status = 'angry';// 顾客超时生气
            this.dom.querySelector('.appeaseIcon').classList.add('show');
        }
    }
}

export default Table;