# 项目结构
## 文件作用及主要方法/函数
src/
|-- components/
| |-- auth/
| | |-- authForm.tsx
| |-- quiz/
| | |-- quizSetList.tsx
| | |-- quizQuestion.tsx
| | |-- quizSummary.tsx
| |-- common/
| | |-- header.tsx
| | |-- footer.tsx
| | |-- layout.tsx
| | |-- loading.tsx
| | |-- errorBoundary.tsx
|-- contexts/
| |-- authContext.tsx
| |-- quizContext.tsx
|-- hooks/
| |-- useAuth.ts
| |-- useQuiz.ts
|-- pages/
| |-- home.tsx
| |-- auth.tsx
| |-- quizSetList.tsx
| |-- quizQuestion.tsx
| |-- quizSummary.tsx
|-- services/
| |-- api.ts
| |-- auth.ts
| |-- quiz.ts
|-- utils/
| |-- constants.ts
| |-- helpers.ts
|-- types/
| |-- index.ts
|-- i18n/
| |-- config.ts
| |-- translations/
| |-- en.json
| |-- zh.json
|-- styles/
| |-- globals.css
|-- App.tsx
|-- main.tsx
|-- vite-env.d.ts

### components/

#### auth/
- `authForm.tsx`: 授权组件
  - `AuthForm`: 渲染授权表单，处理表单提交

#### quiz/
- `quizSetList.tsx`: 题库列表组件
  - `QuizSetList`: 渲染题库列表，处理题库选择
- `quizQuestion.tsx`: 问题展示和答题组件
  - `QuizQuestion`: 渲染当前问题，处理答案提交
- `quizSummary.tsx`: 答题总结组件
  - `QuizSummary`: 渲染答题总结，显示统计信息

#### common/
- `header.tsx`: 页面头部组件
  - `Header`: 渲染页面头部，包含导航和用户信息
- `footer.tsx`: 页面底部组件
  - `Footer`: 渲染页面底部
- `layout.tsx`: 页面布局组件
  - `Layout`: 提供通用页面布局
- `loading.tsx`: 加载状态组件
  - `Loading`: 显示加载动画
- `errorBoundary.tsx`: 错误边界组件
  - `ErrorBoundary`: 捕获和显示组件树中的 JavaScript 错误

### contexts/
- `authContext.tsx`: 认证上下文
  - `AuthProvider`: 提供认证状态和方法
  - `useAuth`: 自定义钩子，用于访问认证上下文
- `quizContext.tsx`: 答题上下文
  - `QuizProvider`: 提供答题状态和方法
  - `useQuiz`: 自定义钩子，用于访问答题上下文

### hooks/
- `useAuth.ts`: 认证相关自定义钩子
  - `useAuth`: 封装认证相关逻辑
- `useQuiz.ts`: 答题相关自定义钩子
  - `useQuiz`: 封装答题相关逻辑

### pages/
- `home.tsx`: 首页
  - `Home`: 渲染首页内容
- `auth.tsx`: 授权页面
  - `Auth`: 渲染授权页面
- `quizSetList.tsx`: 题库列表页面
  - `QuizSetListPage`: 渲染题库列表页面
- `quizQuestion.tsx`: 答题页面
  - `QuizQuestionPage`: 渲染答题页面
- `quizSummary.tsx`: 答题总结页面
  - `QuizSummaryPage`: 渲染答题总结页面

### services/
- `api.ts`: API 请求配置
  - `api`: Axios 实例配置
- `auth.ts`: 认证相关 API 请求
  - `login`: 登录请求
  - `register`: 注册请求
  - `logout`: 登出请求
- `quiz.ts`: 答题相关 API 请求
  - `getQuizSets`: 获取题库列表
  - `getQuestion`: 获取问题
  - `submitAnswer`: 提交答案
  - `getQuizSummary`: 获取答题总结

### utils/
- `constants.ts`: 常量定义
- `helpers.ts`: 辅助函数
  - `formatDate`: 日期格式化
  - `validateEmail`: 邮箱验证

### types/
- `index.ts`: 类型定义

### i18n/
- `config.ts`: i18next 配置
- `translations/`: 翻译文件目录
  - `en.json`: 英文翻译
  - `zh.json`: 中文翻译

### styles/
- `globals.css`: 全局样式定义

### App.tsx
- `App`: 应用程序根组件

### main.tsx
- 应用程序入口文件，渲染根组件

### vite-env.d.ts
- Vite 环境类型声明文件