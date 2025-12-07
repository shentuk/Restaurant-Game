/*
 * 厨师类
 */
import Game from './configs.js';
import ELEMENTS from './doms.js';
class Chef {
    constructor() {
        this.status = 'free'; // 状态，默认空闲
        this.daysWorked = 0; // 工作天数
        this.firingSalary = 0; // 解雇工资
        this.init();
        this.bindEvent();
    }
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('chef', 'humanHead');
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = `
            <img src="./images/chef.png" alt="">
            <div id="fireChefBtn" class="fireChefBtn">+</div>
        `;

        // 插入到招聘按钮之前
        ELEMENTS.chefSection.insertBefore(this.dom, ELEMENTS.hireChefBtn);
    }
    bindEvent() {
        // 点击解雇按钮
        this.dom.querySelector('#fireChefBtn').addEventListener('click', () => {
            ELEMENTS.operationModal.classList.toggle('active');
            ELEMENTS.fireChefModal.classList.toggle('show');
            this.firing();
        });
    }
    // 空闲
    // 解雇
    firing() {
        this.status = 'firing';
        this.firingSalary = Math.ceil(this.daysWorked / 7 * Game.chefs.chefWeeklySalary) + Game.chefs.chefWeeklySalary;
        // 更新解雇工资显示
        ELEMENTS.fireChefCost.textContent = `￥ ${this.firingSalary}`;
    }
    // 正在做菜
    // 做完等待上菜
}
export default Chef;