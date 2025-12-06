/*
 * 主函数入口
 */

// 游戏全局配置
import Game from './configs.js';
// DOM元素
import ELEMENTS from './doms.js';

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

// 更新已选中的菜品总金额显示
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
/* 更新显示 */

/* 游戏事件 */
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
/* 游戏事件 */

/* 全局事件 */
// 初始化游戏
function initGame() {
    // 默认有一个厨师
    // 弹出游戏开始弹窗
    renderDishMenu();
}

// 点击“开始经营吧”
function startGame() {
    // 隐藏游戏开始弹窗
    // 时间开始计时
    // 顾客随机进入餐馆
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
