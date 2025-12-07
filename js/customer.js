/*
 * 顾客类
 */

import ELEMENTS from './doms.js';
import Game from './configs.js';

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
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = `
            <img src=${this.head} alt="">
        `;
    }
    // 排队等待接待
    waitingSeat() {
        this.status = 'waitingSeat';
        this.dom.dataset.status = this.status;
        // 插入到等待顾客队列中
        ELEMENTS.waitingCustomerSection.insertBefore(this.dom, ELEMENTS.waitingCustomerSection.firstElementChild);
    }
    // 上座点菜
    seatingOrder() {
        this.status = 'seatingOrder';
        // 离开等待顾客队列
        this.dom.remove();
    }
    // 等待上菜
    // 用餐
    // 生气
    // 支付
    // 离开（排队时间太长、放弃点餐、等餐太久顾客生气、顾客用餐完成支付）
}

export default Customer;