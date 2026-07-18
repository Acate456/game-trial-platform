// 模拟数据 - 后续对接后端API替换
const mockGames = [
    { id: 1, title: '仙侠世界·青云传', icon: '🎮', reward: '3.50', type: '角色扮演', link: '#' },
    { id: 2, title: '狂飙赛车', icon: '🏎️', reward: '2.80', type: '竞速竞技', link: '#' },
    { id: 3, title: '消除大冒险', icon: '💎', reward: '1.50', type: '休闲益智', link: '#' },
    { id: 4, title: '传奇霸业', icon: '⚔️', reward: '5.00', type: '传奇类', link: '#' },
];

const mockTasks = [
    { id: 1, title: '注册下载并试玩3分钟', desc: '新用户专属，完成即得佣金', price: '5.00', type: 'trial' },
    { id: 2, title: '邀请好友注册', desc: '邀请1位有效新用户，奖励实时到账', price: '8.00', type: 'new' },
    { id: 3, title: '游戏等级达到30级', desc: '完成等级挑战，高额佣金', price: '20.00', type: 'trial' },
];

// 页面加载完成执行
document.addEventListener('DOMContentLoaded', () => {
    renderGames();
    renderTasks();
    initEvents();
});

// 渲染游戏列表
function renderGames() {
    const container = document.getElementById('gameList');
    container.innerHTML = mockGames.map(game => `
        <div class="game-card" onclick="window.open('${game.link}')">
            <div class="game-cover">${game.icon}</div>
            <div class="game-info">
                <div class="game-title">${game.title}</div>
                <div class="game-meta">
                    <span>${game.type}</span>
                    <span class="game-reward">+¥${game.reward}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 渲染任务列表
function renderTasks(filter = 'all') {
    const container = document.getElementById('taskList');
    const filtered = filter === 'all' ? mockTasks : mockTasks.filter(t => t.type === filter);
    
    container.innerHTML = filtered.map(task => `
        <div class="task-item">
            <div>
                <div class="task-title">${task.title}</div>
                <div class="task-desc">${task.desc}</div>
            </div>
            <div class="task-price">¥${task.price}</div>
        </div>
    `).join('');
}

// 初始化事件
function initEvents() {
    // 任务标签切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTasks(btn.dataset.tab);
        });
    });

    // 登录弹窗
    const modal = document.getElementById('loginModal');
    const avatar = document.getElementById('userAvatar');
    const closeBtn = document.getElementById('closeLogin');

    avatar.addEventListener('click', () => modal.classList.add('show'));
    closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // 发布任务按钮
    document.getElementById('publishBtn').addEventListener('click', () => {
        alert('任务发布功能已预留接口，登录后即可使用');
    });
}
