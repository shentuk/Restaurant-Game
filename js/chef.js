/*
 * 厨师类
 */

class Chef {
    constructor() {
        this.status = 'free'; // 状态，默认空闲
        this.daysWorked = 0; // 工作天数
        this.init();
    }
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('chef', 'humanHead');
        this.dom.dataset.status = this.status;
        this.dom.innerHTML = `
            <img src="./images/chef.png" alt="">
            <div id="fireChefBtn" class="fireChefBtn">+</div>
        `;
    }
}
export default Chef;