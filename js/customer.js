/*
 * 顾客类
 */

const customers = [
    { name: 'Zhao', head: 'images/Zhao.png', status: 'free' },
    { name: 'Qian', head: 'images/Qian.png', status: 'free' },
    { name: 'Sun', head: 'images/Sun.png', status: 'free' },
    { name: 'Li', head: 'images/Li.png', status: 'free' },
    { name: 'Zhou', head: 'images/Zhou.png', status: 'free' },
    { name: 'Wu', head: 'images/Wu.png', status: 'free' },
    { name: 'Zhen', head: 'images/Zhen.png', status: 'free' }
];

class Customer {
    constructor(name, head, status) {
        this.name = name; // 姓名
        this.head = head; // 头像
        this.status = status; // 状态
    }
}

export default Customer;