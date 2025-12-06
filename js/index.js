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
function updateOrderMenuModal() {
    updateOperationModalDisplay();
    ELEMENTS.orderMenuModal.classList.toggle('show');
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
    ELEMENTS.chefSection.insertBefore(chef.dom, ELEMENTS.hireChefBtn);
    // 更新当前厨师数
    Game.chefs.curChefsNum++;
    updateHireChefBtnDisplay();
}
/* 更新显示 */

/* 工具函数 */
// 切换菜单项选择
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
function sureFireChef(chef = '') {
    if (chef) {
    }
    // 解雇当前厨师，计算解约金
    updateFireChefModal();
}

// 取消解雇厨师
function cancelFireChef() {
    updateFireChefModal();
}

// 确认点餐菜单
// function sureOrder() {
//     updateOrderMenuModal();
// }

// 取消点餐菜单
function cancelOrder() {
    updateOrderMenuModal();
}


// 解雇厨师
function fireChef() {
    updateFireChefModal();
    // const target = e.target;
    // const chefContainer = target.closest('.chef');
    // const chefIndex = Game.chefs.list.findIndex(chef => chef.dom === chefContainer);
    // if (chefIndex > -1) {
    //     Game.chefs.list.splice(chefIndex, 1);
    //     Game.chefs.curChefsNum--;
    //     updateHireChefBtnDisplay();
    //     chefContainer.remove();
    // }
}

// 顾客到达
// function customerArrival() {
//     // 随机生成顾客，每天最多来一次
//     if (Math.random() < 0.1 && Game.customers.waitingCustomers.length < Game.customers.maxWaitingCustomers) {
//         const newCustomer = new Customer();
//         Game.customers.waitingCustomers.push(newCustomer);
//         renderWaitingCustomers();
//     }
// }

/* 游戏事件 */

/* 全局事件 */
// 初始化游戏
function initGame() {
    /*
     * 初始化游戏
     * 1. 显示游戏开始弹窗
     * 2. 渲染点菜菜单
     * 3. 初始化一个厨师
     */
    updateGameStartModal();
    renderDishMenu();
    renderChef();

    // 绑定事件
    ELEMENTS.startGameBtn.addEventListener('click', startGame);

    ELEMENTS.hireChefBtn.addEventListener('click', updateHireChefModal);
    ELEMENTS.sureHireChefBtn.addEventListener('click', sureHireChef);
    ELEMENTS.cancelHireChefBtn.addEventListener('click', cancelHireChef);

    ELEMENTS.sureFireChefBtn.addEventListener('click', sureFireChef);
    ELEMENTS.cancelFireChefBtn.addEventListener('click', cancelFireChef);

    // ELEMENTS.sureOrderBtn.addEventListener('click', sureOrder);
    ELEMENTS.cancelOrderBtn.addEventListener('click', cancelOrder);
}

// 点击“开始经营吧”
function startGame() {
    /*
     * 开始游戏
     * 1. 隐藏游戏开始弹窗
     * 2. 开启游戏循环
     * 3. 顾客排队等候接待
     */
    updateGameStartModal();
    startGameLoop();
    // customerArrival();
}

// 游戏循环
function startGameLoop() {
    Game.time.timer = setInterval(() => {
        /*
         * 游戏主循环
         * 1. 更新游戏时间
         */
        updateGameTime();
        // checkCustomerArrival();
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
