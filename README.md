# 🌍 LinguaMaster - 多语种在线教育平台

一款沉浸式多语种在线教育平台，支持英语、日语、韩语等主流语言学习，提供分级课程体系和互动式学习体验。

## ✨ 功能特性

### 1. 分级课程体系
- 支持英语、日语、韩语三种主流语言
- 每个语言提供 Beginner、Intermediate、Advanced 三个难度级别
- 精心设计的课程卡片展示，包含实时进度追踪

### 2. 互动式学习模块
- **单词记忆**：闪卡形式，点击揭示释义，包含例句和发音
- **语法练习**：选择题形式，即时反馈和详细解释
- **口语跟读**：麦克风录音，倒计时练习，AI 评分
- **听力训练**：音频播放，问答形式，即时评分

### 3. 学习进度追踪
- 每周学习活动图表可视化
- 学习连续天数（Streak）显示
- 各课程进度可视化
- 个人学习目标追踪

### 4. 用户注册登录
- 邮箱密码认证
- Google/Facebook OAuth 登录
- 个人资料管理

### 5. 个性化学习路径推荐
- 根据学习偏好推荐课程
- 语言和难度级别筛选
- 智能学习目标设置

### 6. 社区交流及成就激励
- 论坛讨论区
- 学习小组功能
- 成就徽章系统
- 分类成就展示

## 🛠️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite 6
- **样式框架**: Tailwind CSS 3
- **状态管理**: Zustand
- **路由**: React Router DOM 7
- **图标库**: Lucide React
- **后端**: Express.js (可选)

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm run dev
```

### 构建生产版本

```bash
pnpm run build
```

### 预览生产版本

```bash
pnpm run preview
```

## 📁 项目结构

```
src/
├── components/          # UI 组件
│   ├── Header.tsx       # 顶部导航栏
│   ├── LanguageSelector.tsx  # 语言选择器
│   └── CourseCard.tsx   # 课程卡片组件
├── pages/               # 页面组件
│   ├── Home.tsx         # 首页
│   ├── Courses.tsx      # 课程列表页
│   ├── CourseDetail.tsx # 课程详情页
│   ├── Learn.tsx        # 学习模块页
│   ├── Progress.tsx     # 进度追踪页
│   ├── Community.tsx    # 社区页
│   ├── Achievements.tsx # 成就页
│   ├── Profile.tsx      # 个人资料页
│   └── Auth.tsx         # 认证页
├── store/               # 状态管理
│   └── appStore.ts      # Zustand 全局状态
├── data/                # 模拟数据
│   └── mockData.ts      # 课程和用户数据
├── types/               # TypeScript 类型定义
│   └── index.ts         # 全局类型定义
├── hooks/               # 自定义 Hooks
│   └── useTheme.ts      # 主题切换 Hook
└── lib/                 # 工具函数
    └── utils.ts         # 通用工具函数
```

## 📱 响应式设计

- **桌面端**: 多栏布局，充分利用屏幕空间
- **平板端**: 自适应两栏或单列布局
- **移动端**: 单列布局，底部导航栏，触控友好

## 🎨 设计特点

- 现代渐变色彩方案（蓝绿色系）
- 流畅的动画过渡效果
- 卡片式设计，清晰的信息层级
- 圆润现代的图标风格

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 GitHub Issue

---

⭐ 如果这个项目对你有帮助，请给个 Star！