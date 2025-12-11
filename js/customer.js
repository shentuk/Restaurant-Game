/*
 * 顾客类
 */

import ELEMENTS from './doms.js';
import Game from './configs.js';
import ProgressBar from './progressbar.js';

class Customer {
    constructor(id, name, head) {
        this.id = id;     // 顾客ID
        this.name = name; // 姓名
        this.head = head; // 头像
        this.status = 'free'; // 状态
        this.init();
    }
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('customer', 'humanHead');
        this.dom.innerHTML = `
            <img src=${this.head} alt="">
        `;
    }
    // 来餐厅
    arrival() {
        // 标记这个顾客来过
        Game.customers.customersVisitedToday.push(this.id);
    }
    // 排队等待接待
    waitingSeat() {
        this.status = 'waitingSeat';
        this.dom.dataset.status = this.status;
        // 顾客等位条
        const waitingSeatBar = new ProgressBar(this, {
            text: '等位中',
            time: Game.customers.waitingTime,
            startColor: Game.progressBar.waitingSeatColor[0],
            endColor: Game.progressBar.waitingSeatColor[1],
        });
        this.dom.appendChild(waitingSeatBar.dom);
        // 插入到等待顾客队列中
        ELEMENTS.waitingCustomerSection.insertBefore(this.dom, ELEMENTS.waitingCustomerSection.firstElementChild);
        Game.customers.waitingCustomers.push(this);
    }
    // 上座点菜
    seatingOrder() {
        this.status = 'seatingOrder';
        // 离开等待顾客队列
        this.dom.remove();
    }
    // 等待上菜
    waitingDish() {
        this.status = 'waitingDish';
    }
    // 用餐
    eatingDish() {
        this.status = 'eatingDish';
    }
    // 支付
    paying() {
        this.status = 'paying';
    }
    // 生气
    angry() {
        this.status = 'angry';
    }
    // 离开（一天过后排队顾客离开、排队时间太长、放弃点餐、等餐太久顾客生气、顾客用餐完成支付）
    leave() {
        // 一天过后排队顾客离开/排队时间太长离开
        if (this.status === 'waitingSeat') {
            // 从等待顾客队列中移除
            Game.customers.waitingCustomers = Game.customers.waitingCustomers.filter(customer => customer.id !== this.id);
            // 顾客离开等待区
            this.dom.remove();
        }
        // 放弃点餐离开
        if (this.status === 'seatingOrder') {
            // 顾客离开座位区
        }
        // 等餐太久顾客生气离开
        if (this.status === 'waitingDish') {
            // 顾客离开座位区
        }
        // 顾客用餐完成支付离开
        if (this.status === 'paying') {
            // 顾客离开座位区
        }
    }
}

export default Customer;