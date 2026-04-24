# GuessArena

足球球星猜谜平台 MVP（纯前端版）

## 快速启动

```bash
# 1. 安装依赖
npm install

# 2. 启动开发服务器
npm run dev

# 3. 打开浏览器访问 http://localhost:5173
```

## 项目结构

```
src/
├── main.jsx                # 入口
├── App.jsx                 # 路由（screen 状态切换）
├── index.css               # Tailwind + 全局样式
├── data/
│   └── puzzles.js          # 题库（hardcode，后续接后端替换）
├── hooks/
│   └── useGame.js          # 所有游戏逻辑（状态机）
└── components/
    ├── HomePage.jsx         # 首页：分类选择 + 排行榜
    ├── GamePage.jsx         # 题目页：提示 + 答题
    └── ResultPage.jsx       # 结算页：得分 + 统计
```

## 积分规则

| 事件 | 分数变化 |
|------|---------|
| 初始分 | 100 |
| 解锁提示 | -20 |
| 错误 ≥ 3 次（每次） | -10 |
| 最低分 | 0 |

## 扩展题库

在 `src/data/puzzles.js` 中按照现有格式添加题目即可：

```js
{
  id: 7,
  category: 'football',
  answer: '球星名',
  aliases: ['中文名', 'english name', 'nickname'],
  nationality: '🇩🇪 德国',
  hints: [
    { type: 'text', text: '文字提示内容' },
    { type: 'stat', label: '统计项名称', value: '数值' },
  ],
}
```

## 下一步 TODO（P1）

- [ ] 后端 API（Node.js + Express + SQLite）
- [ ] 用户系统（注册/登录）
- [ ] 真实排行榜（接数据库）
- [ ] 每日挑战模式
- [ ] 更多题库（篮球、历史人物、歌词）
