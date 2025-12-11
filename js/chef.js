/*
 * 厨师类
 */
import Game from './configs.js';
import ELEMENTS from './doms.js';
import { updateFireChefModal } from './index.js';
class Chef {
    constructor() {
        this.status = 'free'; // 状态，默认空闲
        this.daysWorked = 0; // 工作天数
        this.firingSalary = 0; // 解雇工资
        this.food = null; // 正在做菜的菜品
        this.init();
    }
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('chef', 'humanHead');
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = `
            <img src="./images/chef.png" alt="">
            <div class="fireChefBtn">+</div>
            <img src="./images/Food-Dome.png" alt="" class="chefCookDoneIcon">
        `;
        // 插入到招聘按钮之前
        ELEMENTS.chefSection.insertBefore(this.dom, ELEMENTS.hireChefBtn);

        this.bindEvents();
    }
    // 绑定事件
    bindEvents() {
        this.fireChefBtn = this.dom.querySelector('.fireChefBtn');
        this.chefCookDoneIcon = this.dom.querySelector('.chefCookDoneIcon');
        this.fireChefBtn.addEventListener('click', () => {
            updateFireChefModal();
            this.firing();
        });
    }
    // 空闲
    free() {
        this.status = 'free';
        this.dom.dataset.status = this.status;
        this.food = null;
    }
    // 解雇
    firing() {
        this.status = 'firing';
        // 解约金
        this.firingSalary = Math.ceil(this.daysWorked / 7 * Game.chefs.chefWeeklySalary) + Game.chefs.chefWeeklySalary;
        // 更新解雇工资显示
        ELEMENTS.fireChefCost.textContent = `￥ ${this.firingSalary}`;
    }
    // 正在做菜
    cooking(dish) {
        this.status = 'cooking';
        this.dom.dataset.status = this.status;
        // 分配菜单
        dish.assignOwner(this);
        this.food = dish;
        // 进度条开始做菜
        dish.cookingDishProgressBar();
        this.dom.appendChild(dish.chef_dish_progress.dom);
    }
    // 做完等待上菜
    finishCooking() {
        this.status = 'finishCooking';
        this.dom.dataset.status = this.status;
        this.dom.querySelector('.chefCookDoneIcon').classList.add('show');
    }
}
export default Chef;