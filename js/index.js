/*
 * 主函数入口
 */

// 游戏全局配置
import Game from './configs.js';
// DOM元素
import ELEMENTS from './doms.js';
// 厨师类
import Chef from './chef.js';
// 顾客类
import Customer from './customer.js';
// 餐桌类
import Table from './table.js';
// 进度条类
// import ProgressBar from './progressbar.js';

/* 更新显示 */
// 更新时间显示
function updateTimeDisplay() {
    ELEMENTS.timeWeek.textContent = `W${Game.time.week}`;
    ELEMENTS.timeDay.textContent = `D${Game.time.day}`;
}

// 更新金钱显示
function updateMoneyDisplay() {
    ELEMENTS.moneyDisplay.textContent = Game.money;
}

// 更新操作台显示
function updateOperationModalDisplay() {
    ELEMENTS.operationModal.classList.toggle('active');
}

// 更新游戏开始弹窗显示
function updateGameStartModal() {
    updateOperationModalDisplay();
    ELEMENTS.gameStartModal.classList.toggle('show');
}

// 更新招聘新厨师操作台显示
function updateHireChefModal() {
    updateOperationModalDisplay();
    ELEMENTS.hireChefModal.classList.toggle('show');
}

// 更新解雇厨师操作台显示
function updateFireChefModal() {
    updateOperationModalDisplay();
    ELEMENTS.fireChefModal.classList.toggle('show');
}

// 更新点餐菜单操作台显示
function updateOrderMenuModal(customer = '') {
    if (customer) {
        ELEMENTS.orderCustomerImg.innerHTML = `<img src=${customer.head} alt="">`;
        ELEMENTS.orderCustomerName.textContent = customer.name;
    }
    updateOperationModalDisplay();
    ELEMENTS.orderMenuModal.classList.toggle('show');
}

// 更新顾客点餐时已选中的菜品总金额显示
function updateCheckedDishsTotalPriceDisplay(price) {
    ELEMENTS.checkedDishsTotalPrice.textContent = price;
}

// 更新确认点菜按钮显示
function updateSureOrderBtnDisplay(curCheckedDishsType) {
    // 统计每种菜品类型的数量
    const zhucaiCount = curCheckedDishsType.filter(dish => dish === 'zhucai').length;
    const liangcaiCount = curCheckedDishsType.filter(dish => dish === 'liangcai').length;
    const drinkCount = curCheckedDishsType.filter(dish => dish === 'drink').length;

    const isValid = (
        zhucaiCount === 1 &&  // zhucai必有且只能有一个
        liangcaiCount <= 1 && // liangcai最多一个
        drinkCount <= 1       // drink最多一个
    );

    ELEMENTS.sureOrderBtn.disabled = !isValid;
}

// 更新招聘厨师按钮显示
function updateHireChefBtnDisplay() {
    if (Game.chefs.curChefsNum >= Game.chefs.maxChefs) {
        ELEMENTS.hireChefBtn.classList.add('hide');
    } else {
        ELEMENTS.hireChefBtn.classList.remove('hide');
    }
}

// 渲染菜单
function renderDishMenu() {
    Game.dishMenu.menuType.forEach(typeItem => {
        const menuTypeContainer = document.createElement('dl');
        menuTypeContainer.innerHTML = `
            <dt>${typeItem.title}</dt>
        `;

        typeItem.list.forEach(dish => {
            const menuItem = document.createElement('dd');
            menuItem.innerHTML = `
                <label>
                    <input type="checkbox" name="${typeItem.type}" value="${dish.name}"">
                    ${dish.name}
                </label>
                <div>
                    <span>······</span>
                    <span>￥${dish.price < 10 ? '&nbsp;&nbsp;' : ''}${dish.price}</span>
                </div>
            `;

            menuItem.addEventListener('change', (e) => {
                toggleMenuItem(e, dish);
            });

            menuTypeContainer.appendChild(menuItem);
        });

        ELEMENTS.orderMenuContainer.appendChild(menuTypeContainer);
    });
}

// 渲染厨师
function renderChef() {
    const chef = new Chef();
    Game.chefs.list.push(chef);
    // 更新当前厨师数
    Game.chefs.curChefsNum++;
    updateHireChefBtnDisplay();
}

// 渲染餐桌
function renderTable() {
    for (let i = 1; i <= Game.tables.emptyNum; i++) {
        const table = new Table(i);
        Game.tables.list.push(table);
    }
}

/* 更新显示 */

/* 工具函数 */
// 切换菜品项选择
function toggleMenuItem(e, dish) {
    const target = e.target;
    if (target.checked) {
        Game.dishMenu.curCheckedDishsType.push(target.name);
        Game.dishMenu.curCheckedDishsTotalPrice += dish.price;
    } else {
        const index = Game.dishMenu.curCheckedDishsType.indexOf(target.name);
        if (index > -1) {
            Game.dishMenu.curCheckedDishsType.splice(index, 1);
        }
        Game.dishMenu.curCheckedDishsTotalPrice -= dish.price;
    }

    updateCheckedDishsTotalPriceDisplay(Game.dishMenu.curCheckedDishsTotalPrice);
    updateSureOrderBtnDisplay(Game.dishMenu.curCheckedDishsType);
}

// 重置已选中的菜品
function clearCheckedDishs() {
    // 取消所有菜品选中
    ELEMENTS.orderMenuContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    Game.dishMenu.curCheckedDishsType = [];
    Game.dishMenu.curCheckedDishsTotalPrice = 0;
    updateCheckedDishsTotalPriceDisplay(Game.dishMenu.curCheckedDishsTotalPrice);
    updateSureOrderBtnDisplay(Game.dishMenu.curCheckedDishsType);
}

// 支付厨师工资
function payChefSalaries() {
    const totalSalary = Game.chefs.list.reduce((total, chef) => {
        // 计算每个厨师的工资，按工作天数和每周工资计算
        const chefSalary = Math.ceil(chef.daysWorked / 7 * Game.chefs.chefWeeklySalary);
        return total + chefSalary;
    }, 0);
    // 更新游戏金钱
    updateGameMoney(-totalSalary);
}
/* 工具函数 */

/* 游戏事件 */
// 确认雇佣厨师
function sureHireChef() {
    renderChef();
    updateHireChefModal();
}

// 取消雇佣厨师
function cancelHireChef() {
    updateHireChefModal();
}

// 确认解雇厨师
function sureFireChef() {
    // 总金额-解约金
    // const severancePay = Game.chefs.chefWeeklySalary * Game.chefs. severancePayRate;
    // updateGameMoney(-severancePay);
    // 去掉当前厨师
    // Game.chefs.list.pop();
    // Game.chefs.curChefsNum--;
    // dom.remove();
    updateHireChefBtnDisplay();
    updateFireChefModal();
}

// 取消解雇厨师
function cancelFireChef() {
    updateFireChefModal();
}

// 确认点餐菜单
function sureOrder() {
    for (const table of Game.tables.list) {
        if (table.status === 'occupied' && table.customer.status === 'seatingOrder') {
            // 点好菜等待上菜
            table.customer.waitingDish();
            table.changeStatus();
            break;
        }
    }
    clearCheckedDishs();
    updateOrderMenuModal();
}

// 取消点餐菜单
function cancelOrder() {
    // 顾客从座位区离开
    for (const table of Game.tables.list) {
        if (table.status === 'occupied' && table.customer.status === 'seatingOrder') {
            table.free();
            break;
        }
    }
    clearCheckedDishs();
    updateOrderMenuModal();
}

// 初始化顾客
function initCustomers() {
    for (let i = 0; i < Game.customers.list.length; i++) {
        const customer = new Customer(Game.customers.list[i].id, Game.customers.list[i].name, Game.customers.list[i].head);
        Game.customers.list[i] = customer;
    }
}

// 重置每日顾客
function resetDailyCustomers() {
    // 只重置等待区顾客，还在座位的顾客不重置，可能会造成进入等待区的顾客和座位区的顾客重复
    Game.customers.waitingCustomers.forEach(customer => {
        customer.leave();
    });
    Game.customers.customersVisitedToday = [];
}

// 检查顾客到达
function checkCustomerArrival() {
    // 随机生成顾客，每天最多来一次
    if (Math.random() < 0.1) {
        const customer = Game.customers.list[Math.floor(Math.random() * Game.customers.list.length)];

        // 检查顾客是否来过
        if (Game.customers.customersVisitedToday.includes(customer.id)) {
            return;
        }

        // 标记这个顾客来过
        customer.arrival();

        // 检查等候区是否已满
        if (Game.customers.waitingCustomers.length >= Game.customers.maxWaitingCustomers) {
            return;
        }

        // 顾客进入等候区
        customer.waitingSeat();
    }
}

// 招待顾客
function serveWaitingCustomers() {
    // 检查是否有顾客在等待
    if (Game.customers.waitingCustomers.length <= 0) {
        return;
    }
    // 检查是否有可用的桌位
    if (Game.tables.emptyNum <= 0) {
        return;
    }
    // 为顾客服务, 从等待队列中招待第一位顾客
    const customer = Game.customers.waitingCustomers.shift();
    // 为顾客分配桌位
    for (const table of Game.tables.list) {
        if (table.status === 'free') {
            table.assignCustomer(customer);
            Game.tables.emptyNum--;
            break; // 找到空闲餐桌后立即跳出循环
        }
    }
    // 顾客入座点菜
    customer.seatingOrder();

    updateOrderMenuModal(customer);
}

/* 游戏事件 */

/* 全局事件 */
// 绑定事件
function bindEvents() {
    ELEMENTS.startGameBtn.addEventListener('click', startGame);

    ELEMENTS.hireChefBtn.addEventListener('click', updateHireChefModal);  // 招聘厨师按钮
    ELEMENTS.sureHireChefBtn.addEventListener('click', sureHireChef);
    ELEMENTS.cancelHireChefBtn.addEventListener('click', cancelHireChef);

    ELEMENTS.sureFireChefBtn.addEventListener('click', sureFireChef);
    ELEMENTS.cancelFireChefBtn.addEventListener('click', cancelFireChef);

    ELEMENTS.waitingCustomerSection.addEventListener('click', serveWaitingCustomers);
    ELEMENTS.sureOrderBtn.addEventListener('click', sureOrder);
    ELEMENTS.cancelOrderBtn.addEventListener('click', cancelOrder);
}

// 初始化游戏
function initGame() {
    /*
     * 初始化游戏
     * 1. 显示游戏开始弹窗
     * 2. 渲染点菜菜单
     * 3. 渲染厨师（默认一个）
     * 4. 渲染餐桌（默认四个）
     * 5. 初始化顾客（所有顾客实例）
     * 6. 绑定事件（全局）
     */
    updateGameStartModal();
    renderDishMenu();
    renderChef();
    renderTable();
    initCustomers();
    bindEvents();
}

// 开始游戏
function startGame() {
    /*
     * 开始游戏
     * 1. 隐藏游戏开始弹窗
     * 2. 开启游戏循环
     */
    updateGameStartModal();
    startGameLoop();
}

// 游戏循环
function startGameLoop() {
    Game.time.timer = setInterval(() => {
        /*
         * 游戏主循环
         * 1. 更新游戏时间
         * 2. 检查顾客到达
         * 3. 检查等待顾客
         * 4. 检查厨师进度
         * 5. 检查桌位状态
         */
        updateGameTime();
        checkCustomerArrival();
        // checkWaitingCustomers();
        // checkChefProgress();
        // checkTableStatus();
    }, 1000);
}

// 更新游戏时间
function updateGameTime() {
    // 每秒钟更新一次时间
    Game.time.seconds++;

    // 检查是否需要进入下一天
    if (Game.time.seconds >= Game.time.daySeconds) {
        Game.time.seconds = 0;
        Game.time.day++;

        // 更新厨师工作天数
        Game.chefs.list.forEach(chef => {
            chef.daysWorked++;
        });

        // 检查是否需要进入下一周
        if (Game.time.day > 7) {
            Game.time.day = 1;
            Game.time.week++;

            // 每一周后支付厨师工资
            payChefSalaries();

            // 厨师工作天数重置为0
            Game.chefs.list.forEach(chef => {
                chef.daysWorked = 0;
            });
        }

        // 重置每日顾客
        resetDailyCustomers();

        // 更新时间显示
        updateTimeDisplay();
    }
}

// 更新游戏金钱
function updateGameMoney(rev) {
    Game.money += rev;
    // 更新金钱显示
    updateMoneyDisplay();
}
/* 全局事件 */

// 初始化游戏
document.addEventListener('DOMContentLoaded', initGame);
