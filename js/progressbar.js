/*
 * 进度条类
 * 功能：用于显示菜品状态条和顾客等位条
 */

class ProgressBar {
    constructor(text, time, startColor, endColor) {
        this.text = text;
        this.time = time;
        this.startColor = startColor;
        this.endColor = endColor;
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
        setTimeout(() => {
            this.pos++;
            if (this.pos <= 100) {
                this.progressColorGradient();
            }
        }, this.time / 100 * 1000);
    }
}

export default ProgressBar;