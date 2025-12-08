/*
 * 餐桌类
 */

import ELEMENTS from './doms.js';

class Table {
    constructor(id) {
        this.id = id; // 餐桌编号
        this.init();
        this.free();
    }
    // 初始化餐桌
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('table', 'humanHead');
        // 插入到餐桌容器中
        ELEMENTS.tableSection.appendChild(this.dom);
    }
    // 餐桌空闲
    free() {
        this.status = 'free';  // 空闲状态
        this.customer = null;  // 顾客实例
        this.food = [];        // 食物
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = '';
    }
    // 分配顾客点餐
    assignCustomer(customer) {
        this.status = 'occupied'; // 占用状态
        this.customer = customer;
        this.dom.innerHTML = `
            <img src=${this.customer.head} alt="">
        `;
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
        }
        else if (status === 'angry') {
            this.dom.dataset.status = 'angry';// 顾客生气
        }
    }
}

export default Table;