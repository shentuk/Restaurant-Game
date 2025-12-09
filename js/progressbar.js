/*
 * 进度条类
 * 功能：用于显示菜品状态条和顾客等位条
 */

import Game from './configs.js'

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
    // 进度条没有中断到100%时owner行为变化
    changeOwnerStatus() {
        // 顾客放弃等位，直接离开餐厅
        if (this.owner.status === 'waitingSeat') {
            this.owner.leave();
        }
    }
}

export default ProgressBar;