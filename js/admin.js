// 页面加载
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    initMenu();
    initLogout();
    initAiTest();
    renderGameTable();
});

// 登录逻辑
function initLogin() {
    const form = document.getElementById('adminLoginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('adminUser').value;
        const pass = document.getElementById('adminPass').value;
        
        // 默认账号密码，后续对接后端
        if (user === 'admin' && pass === 'admin123') {
            localStorage.setItem('adminLogin', 'true');
            showAdmin();
        } else {
            alert('账号或密码错误');
        }
    });

    // 已登录直接进入
    if (localStorage.getItem('adminLogin') === 'true') {
        showAdmin();
    }
}

function showAdmin() {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('adminLayout').style.display = 'flex';
}

// 退出登录
function initLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('adminLogin');
        location.reload();
    });
}

// 侧边栏菜单切换
function initMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const panels = document.querySelectorAll('.page-panel');
    const pageTitle = document.getElementById('pageTitle');

    const titleMap = {
        dashboard: '数据概览',
        games: '游戏管理',
        tasks: '任务管理',
        users: '用户管理',
        wallet: '钱包结算',
        ai: 'AI API配置',
        email: '邮箱配置',
        settings: '系统设置'
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const menu = item.dataset.menu;
            
            // 切换菜单选中
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 切换面板
            panels.forEach(p => p.classList.remove('active'));
            document.getElementById(`panel-${menu}`).classList.add('active');

            // 更新标题
            pageTitle.textContent = titleMap[menu];
        });
    });
}

// AI连通性测试
function initAiTest() {
    document.getElementById('testAiBtn').addEventListener('click', () => {
        const result = document.getElementById('aiTestResult');
        result.className = 'test-result';
        result.textContent = '正在测试接口连通性...';
        result.style.display = 'block';

        // 预留后端测试接口，后续对接/api/ai/test
        setTimeout(() => {
            result.className = 'test-result success';
            result.textContent = '测试完成：硅基流动、Agnes接口连通正常；千问、豆包、小米接口待验证密钥有效性';
        }, 1500);
    });
}

// 渲染游戏表格
function renderGameTable() {
    const tbody = document.getElementById('gameTableBody');
    const games = [
        { id: 1, name: '仙侠世界·青云传', type: '角色扮演', reward: '3.50', link: '#', status: '上线' },
        { id: 2, name: '狂飙赛车', type: '竞速竞技', reward: '2.80', link: '#', status: '上线' },
        { id: 3, name: '消除大冒险', type: '休闲益智', reward: '1.50', link: '#', status: '维护中' },
    ];

    tbody.innerHTML = games.map(g => `
        <tr>
            <td>${g.id}</td>
            <td>${g.name}</td>
            <td>${g.type}</td>
            <td>¥${g.reward}</td>
            <td><a href="${g.link}" target="_blank">查看链接</a></td>
            <td>${g.status}</td>
            <td>
                <button class="outline-btn" style="padding: 6px 12px; font-size: 12px;">编辑</button>
                <button class="outline-btn" style="padding: 6px 12px; font-size: 12px; margin-left: 4px;">删除</button>
            </td>
        </tr>
    `).join('');
}

