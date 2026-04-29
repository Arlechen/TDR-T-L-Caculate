# EE Tools Portal

电子工程师专业工具箱 - 整合版

## 工具列表

| 工具 | 文件 | 描述 |
|------|------|------|
| 插入损耗计算 | `tools/insertion-loss.html` | PCB微带线插入损耗计算，含频率响应图表 |
| 特征阻抗计算 | `tools/impedance.html` | 支持微带线、带状线、共面波导特征阻抗计算 |
| DCR计算 | `tools/dcr.html` | PCB传输线直流电阻计算 |
| TDR计算 | `tools/tdr.html` | 时域反射计传输线长度/时间计算 |

## 技术栈

- **前端框架**: 原生 HTML5 + CSS3 + JavaScript
- **样式框架**: Tailwind CSS + 自定义CSS
- **图表库**: Chart.js
- **图标库**: Lucide Icons
- **部署平台**: 腾讯 EdgeOne Pages

## 本地开发

```bash
# 直接用浏览器打开 index.html 即可
open index.html
```

## 部署

项目配置为部署到腾讯 EdgeOne Pages：

1. 将整个 `ee-tools-portal` 文件夹推送到 Git 仓库
2. 在 EdgeOne Pages 中导入仓库
3. 构建命令留空，构建输出目录设置为 `/`
4. 点击部署

## 项目结构

```
ee-tools-portal/
├── index.html                 # Portal首页
├── assets/
│   ├── css/
│   │   └── common.css        # 统一样式
│   └── js/
│       └── nav.js            # 统一导航组件
├── tools/
│   ├── insertion-loss.html   # 插入损耗计算
│   ├── impedance.html         # 特征阻抗计算
│   ├── dcr.html              # DCR计算
│   └── tdr.html              # TDR计算
└── README.md
```

## 设计规范

- **主题**: 深色科技风 (Dark Tech Style)
- **主色调**: 科技蓝 (#3b82f6)
- **背景色**: 深灰黑 (#0a0c10)
- **字体**: Inter
- **布局**: Portal模式 - 统一导航 + 工具卡片

## 浏览器支持

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

MIT License
