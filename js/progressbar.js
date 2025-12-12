/*
 * 进度条类
 * 功能：用于显示菜品状态条和顾客等位条
 */

import Game from './configs.js';

class ProgressBar {
    constructor(owner, options) {
        const {
            text,
            time,
            startColor,
            endColor
        } = options;
        this.owner = owner;  // 所属者
        this.text = text;    // 显示文本
        this.time = time;    // 完成时间
        this.startColor = startColor; // 开始颜色
        this.endColor = endColor;     // 结束颜色
        this.pos = 0;
        this.init();
    }
    init() {
        this.dom = document.createElement('div');
        this.dom.classList.add('progressbar');
        this.dom.textContent = this.text;
        this.progressColorGradient();
    }
    // 更新进度条
    update(options) {
        const {
            time,
            startColor,
            endColor
        } = options;
        this.time = time;
        this.startColor = startColor;
        this.endColor = endColor;
        this.pos = 0;
    }
    // 进度条颜色渐变
    progressColorGradient() {
        this.dom.style.backgroundImage = `linear-gradient(to right,${this.endColor} ${this.pos}%, ${this.startColor} ${this.pos}%)`;
        // 实现在time时间内this.pos从0到100
        this.timer = setTimeout(() => {
            if (this.pos >= 100) {
                clearInterval(this.timer);
                this.changeOwnerStatus();
            } else {
                // 操作时全局时间停止
                Game.time.start && this.pos++;
                this.progressColorGradient();
            }

        }, this.time / 100 * 1000);
    }
    // 进度条没有中断直到100%时owner行为变化
    changeOwnerStatus() {
        // 顾客放弃等位，直接离开餐厅
        if (this.owner.status === 'waitingSeat') {
            // 顾客离开餐厅
            this.owner.leave();
        }
        // 厨师做完菜
        if (this === this.owner.chef_dish_progress) {
            // 菜做完
            this.owner.finish();
            this.dom.style.backgroundImage = '';
            this.dom.style.backgroundColor = Game.progressBar.finishCookingColor;
        }
        // 顾客用餐结束支付
        if (this === this.owner.table_dish_progress && this.owner.status === 'eating') {
            this.owner.paying();
            this.dom.style.backgroundImage = '';
            this.dom.style.backgroundColor = Game.progressBar.payingColor;
        }
        // 顾客该菜等待超时
        if (this === this.owner.table_dish_progress && this.owner.status === 'waiting') {
            this.owner.timeout();
            this.dom.style.backgroundImage = '';
            this.dom.style.backgroundColor = Game.progressBar.timeoutColor;
            this.dom.style.textDecoration = 'line-through';
        }
    }

}

export default ProgressBar;