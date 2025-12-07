/*
 * 餐桌类
 */

import ELEMENTS from './doms.js';

class Table {
    constructor(id) {
        this.id = id; // 餐桌编号
        this.status = 'free'; // 状态
        this.customer = null; // 顾客实例
        this.food = []; // 食物
        this.init();
    }
    // 初始化餐桌
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('humanHead');
        this.dom.dataset.status = this.status;
        // 插入到餐桌容器中
        ELEMENTS.tableSection.appendChild(this.dom);
    }
    // 分配顾客
    assignCustomer(customer) {
        this.status = 'waitingDish';
        this.customer = customer;
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = `
            <img src=${this.customer.head} alt="">
        `;
    }
}

export default Table;