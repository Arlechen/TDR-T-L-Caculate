const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        Header, Footer, AlignmentType, LevelFormat, ExternalHyperlink,
        HeadingLevel, BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
        TableOfContents, Bookmark, InternalHyperlink } = require('docx');
const fs = require('fs');

// Border style
const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

// Helper functions
const createTitle = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  children: [new TextRun({ text, font: "Arial", size: 36, bold: true, color: "1F4E79" })]
});

const createHeading = (text, level = HeadingLevel.HEADING_2) => new Paragraph({
  heading: level,
  children: [new TextRun({ text, font: "Arial", size: level === HeadingLevel.HEADING_2 ? 28 : 24, bold: true })]
});

const createPara = (text, options = {}) => new Paragraph({
  children: [new TextRun({ text, font: "Arial", size: 22, ...options })],
  spacing: { after: 200 }
});

const createBullet = (text, level = 0) => new Paragraph({
  numbering: { reference: "bullets", level },
  children: [new TextRun({ text, font: "Arial", size: 22 })],
  spacing: { after: 100 }
});

const createTable = (headers, rows, widths) => {
  const headerCells = headers.map((h, i) => new TableCell({
    borders,
    width: { size: widths[i], type: WidthType.DXA },
    shading: { fill: "D5E8F0", type: ShadingType.CLEAR },
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: h, font: "Arial", size: 22, bold: true })] })]
  }));
  
  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders,
      width: { size: widths[i], type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: [new Paragraph({ children: [new TextRun({ text: cell, font: "Arial", size: 22 })] })]
    }))
  }));
  
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [new TableRow({ children: headerCells }), ...dataRows]
  });
};

// Document
const doc = new Document({
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: "1F4E79" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: "2E75B6" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 24, bold: true, font: "Arial" },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } },
        { level: 1, format: LevelFormat.BULLET, text: "○", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          children: [new TextRun({ text: "EE Tools Portal 产品需求文档", font: "Arial", size: 18, color: "666666" })],
          border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "1F4E79", space: 1 } }
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          children: [new TextRun({ text: "机密 | 第 ", font: "Arial", size: 18, color: "666666" }),
                     new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "666666" }),
                     new TextRun({ text: " 页", font: "Arial", size: 18, color: "666666" })],
          border: { top: { style: BorderStyle.SINGLE, size: 6, color: "CCCCCC", space: 1 } }
        })]
      })
    },
    children: [
      // Title Page
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        children: [new TextRun({ text: "EE Tools Portal", font: "Arial", size: 56, bold: true, color: "1F4E79" })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        children: [new TextRun({ text: "产品需求文档 (PRD)", font: "Arial", size: 36, color: "2E75B6" })],
        alignment: AlignmentType.CENTER,
        spacing: { before: 400 }
      }),
      new Paragraph({ spacing: { before: 1000 } }),
      createTable([], [], [4680, 4680]),
      new Paragraph({ spacing: { before: 2000 } }),
      new Paragraph({
        children: [new TextRun({ text: "版本: 1.0", font: "Arial", size: 24 })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        children: [new TextRun({ text: "日期: 2026-04-28", font: "Arial", size: 24 })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        children: [new TextRun({ text: "作者: EE Tools Team", font: "Arial", size: 24 })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({
        children: [new TextRun({ text: "状态: 已批准", font: "Arial", size: 24, color: "22C55E" })],
        alignment: AlignmentType.CENTER
      }),
      new Paragraph({ children: [new PageBreak()] }),
      
      // Table of Contents
      createHeading("目录"),
      new TableOfContents("目录", { hyperlink: true, headingStyleRange: "1-3" }),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 1. Executive Summary
      createTitle("1. 执行摘要"),
      createPara("EE Tools Portal 是一个面向电子工程师的专业工具箱，整合了PCB设计中最常用的四个计算工具：插入损耗计算、特征阻抗计算、DCR计算和TDR计算。"),
      new Paragraph({ spacing: { before: 200 } }),
      createPara("本项目旨在将现有的四个独立HTML工具整合为一个统一的Portal应用，采用Portal模式（统一导航，各工具保持独立页面），并部署到腾讯EdgeOne服务器。"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("核心目标"),
      createBullet("统一品牌形象和用户体验"),
      createBullet("提供一致的深色科技风格界面"),
      createBullet("支持桌面端和移动端响应式布局"),
      createBullet("实现快速部署和持续更新"),
      createBullet("确保计算结果的高精度和可靠性"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 2. Business Background
      createTitle("2. 业务背景"),
      createHeading("2.1 市场现状"),
      createPara("随着高速数字电路和射频设计的快速发展，电子工程师在PCB设计过程中需要进行大量的计算工作，包括传输线阻抗匹配、信号完整性分析、损耗估算等。"),
      new Paragraph({ spacing: { before: 200 } }),
      createPara("目前市场上存在各种独立的计算工具，但普遍存在以下问题："),
      createBullet("工具分散，需要在多个网站间切换"),
      createBullet("界面风格不统一，用户体验不一致"),
      createBullet("缺乏专业的视觉设计"),
      createBullet("移动端支持差"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("2.2 解决方案"),
      createPara("EE Tools Portal 通过整合四个核心工具到一个统一的平台，解决了上述问题，同时保持了各工具的独立性和专业性。"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 3. User Stories
      createTitle("3. 用户故事"),
      createHeading("3.1 主要用户角色"),
      createTable(
        ["角色", "描述", "主要需求"],
        [
          ["PCB设计工程师", "负责高速电路板设计的专业人员", "快速准确的阻抗和损耗计算"],
          ["信号完整性工程师", "专注于信号完整性分析", "精确的传输线参数计算"],
          ["硬件工程师", "进行电路设计和验证", "便捷的日常计算工具"],
          ["学生/学习者", "电子相关专业学生", "学习理解和实践工具"]
        ],
        [2500, 3500, 3360]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("3.2 用户故事详述"),
      createHeading("故事 #1: 统一的工具访问", "Heading3"),
      createPara("作为PCB设计工程师，我希望在一个网站中找到所有常用的PCB计算工具，这样我不需要记住多个网站地址，可以提高工作效率。"),
      createPara("验收标准："),
      createBullet("用户可以通过首页导航到所有工具"),
      createBullet("各工具页面都有返回首页的入口"),
      createBullet("工具之间可以快速切换"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("故事 #2: 一致的视觉体验", "Heading3"),
      createPara("作为信号完整性工程师，我希望所有工具具有统一的视觉风格，这样我在使用不同工具时不需要重新适应界面。"),
      createPara("验收标准："),
      createBullet("所有页面使用统一的设计语言"),
      createBullet("深色科技风格贯穿所有页面"),
      createBullet("交互元素具有一致的样式和行为"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("故事 #3: 移动端支持", "Heading3"),
      createPara("作为需要现场工作的硬件工程师，我希望工具可以在手机上使用，这样我可以在实验台旁快速进行计算。"),
      createPara("验收标准："),
      createBullet("在iOS和Android设备上正常显示"),
      createBullet("输入框不会触发自动缩放"),
      createBullet("关键按钮在移动端有足够的点击区域"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 4. Functional Requirements
      createTitle("4. 功能需求"),
      createHeading("4.1 Portal首页"),
      createTable(
        ["功能编号", "功能名称", "功能描述", "优先级"],
        [
          ["FR-001", "工具导航", "展示4个工具的卡片式入口", "P0"],
          ["FR-002", "响应式布局", "支持桌面端2x2网格，移动端单列", "P0"],
          ["FR-003", "统一导航", "顶部固定导航栏，支持快速切换", "P0"],
          ["FR-004", "特性展示", "展示工具的免费、高精度等特性", "P1"]
        ],
        [1500, 2000, 4360, 1500]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("4.2 插入损耗计算工具"),
      createTable(
        ["功能编号", "功能名称", "功能描述", "优先级"],
        [
          ["IL-001", "频率参数输入", "支持0.1-40GHz频率范围", "P0"],
          ["IL-002", "PCB材料选择", "预设FR4/Rogers/Megtron等材料", "P0"],
          ["IL-003", "损耗计算", "计算导体损耗和介质损耗", "P0"],
          ["IL-004", "频率响应图表", "Chart.js展示损耗-频率曲线", "P0"],
          ["IL-005", "预设配置", "高速数字/射频/毫米波等预设", "P1"]
        ],
        [1500, 2000, 4360, 1500]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("4.3 特征阻抗计算工具"),
      createTable(
        ["功能编号", "功能名称", "功能描述", "优先级"],
        [
          ["ZI-001", "微带线计算", "标准微带线阻抗计算", "P0"],
          ["ZI-002", "带状线计算", "对称/非对称带状线计算", "P0"],
          ["ZI-003", "共面波导计算", "CPW结构阻抗计算", "P1"],
          ["ZI-004", "参数优化", "根据目标阻抗反推线宽", "P2"],
          ["ZI-005", "结构示意图", "Canvas绘制PCB结构图", "P1"]
        ],
        [1500, 2000, 4360, 1500]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("4.4 DCR计算工具"),
      createTable(
        ["功能编号", "功能名称", "功能描述", "优先级"],
        [
          ["DC-001", "基础DCR计算", "基于材料电阻率和几何尺寸", "P0"],
          ["DC-002", "温度校正", "考虑温度对电阻率的影响", "P1"],
          ["DC-003", "材料选择", "支持铜/铝/金等材料", "P0"],
          ["DC-004", "电压降/功耗", "计算1A电流下的压降和损耗", "P1"]
        ],
        [1500, 2000, 4360, 1500]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("4.5 TDR计算工具"),
      createTable(
        ["功能编号", "功能名称", "功能描述", "优先级"],
        [
          ["TD-001", "长度→时间模式", "输入长度计算TDR时间", "P0"],
          ["TD-002", "时间→长度模式", "输入时间反推长度", "P0"],
          ["TD-003", "单位切换", "公制/英制单位支持", "P1"],
          ["TD-004", "结构选择", "微带线/带状线介电常数处理", "P0"]
        ],
        [1500, 2000, 4360, 1500]
      ),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 5. Non-Functional Requirements
      createTitle("5. 非功能需求"),
      createHeading("5.1 性能需求"),
      createTable(
        ["指标", "目标值", "说明"],
        [
          ["页面加载时间", "< 2秒", "首次加载时间"],
          ["计算响应时间", "< 100ms", "用户输入到结果展示"],
          ["Chart.js渲染", "< 500ms", "图表初始化时间"]
        ],
        [2500, 2500, 4360]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("5.2 浏览器兼容性"),
      createBullet("Chrome 80+"),
      createBullet("Firefox 75+"),
      createBullet("Safari 13+"),
      createBullet("Edge 80+"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("5.3 响应式断点"),
      createBullet("桌面端: > 1024px (2x2网格布局)"),
      createBullet("平板端: 768px - 1024px (2x2网格，缩小版)"),
      createBullet("手机端: < 768px (单列垂直布局，汉堡菜单)"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("5.4 可访问性"),
      createBullet("颜色对比度符合WCAG 2.1 AA标准"),
      createBullet("表单元素添加label关联"),
      createBullet("图标添加aria-label"),
      createBullet("支持键盘Tab导航"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 6. Technical Requirements
      createTitle("6. 技术需求"),
      createHeading("6.1 前端技术栈"),
      createTable(
        ["技术", "版本/来源", "用途"],
        [
          ["HTML5", "标准", "页面结构"],
          ["CSS3", "标准", "样式和布局"],
          ["JavaScript", "ES6+", "交互逻辑"],
          ["Tailwind CSS", "CDN", "快速样式开发"],
          ["Chart.js", "4.x CDN", "图表展示"],
          ["Lucide Icons", "CDN", "图标库"],
          ["Inter Font", "Google Fonts", "专业字体"]
        ],
        [2000, 2500, 4860]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("6.2 部署需求"),
      createBullet("平台: 腾讯 EdgeOne Pages"),
      createBullet("域名: 自定义域名配置"),
      createBullet("SSL: EdgeOne自动HTTPS证书"),
      createBullet("CDN: 全球内容分发加速"),
      createBullet("缓存: 静态资源长期缓存策略"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("6.3 目录结构"),
      createPara("ee-tools-portal/"),
      createPara("├── index.html                 # Portal首页"),
      createPara("├── assets/"),
      createPara("│   ├── css/common.css        # 统一样式"),
      createPara("│   └── js/nav.js              # 统一导航"),
      createPara("├── tools/"),
      createPara("│   ├── insertion-loss.html   # 插入损耗计算"),
      createPara("│   ├── impedance.html        # 特征阻抗计算"),
      createPara("│   ├── dcr.html              # DCR计算"),
      createPara("│   └── tdr.html              # TDR计算"),
      createPara("└── README.md"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 7. Design System
      createTitle("7. 设计规范"),
      createHeading("7.1 色彩系统"),
      createTable(
        ["名称", "色值", "用途"],
        [
          ["背景主色", "#0a0c10", "页面背景"],
          ["背景次色", "#0d1117", "卡片/面板背景"],
          ["边框色", "#1e293b", "分隔线和边框"],
          ["主色调", "#3b82f6", "按钮、链接、强调"],
          ["文字主色", "#f1f5f9", "主要文字"],
          ["文字次色", "#94a3b8", "辅助文字"]
        ],
        [2000, 2000, 5360]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("7.2 间距系统"),
      createBullet("基础单位: 4px"),
      createBullet("常用间距: 8px, 16px, 24px, 32px, 48px"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("7.3 圆角系统"),
      createBullet("小圆角 (8px): 输入框、按钮"),
      createBullet("中圆角 (12px): 卡片内部元素"),
      createBullet("大圆角 (16px): 卡片、面板"),
      new Paragraph({ spacing: { before: 200 } }),
      createHeading("7.4 动效规范"),
      createBullet("过渡时长: 200ms (快速), 300ms (正常), 500ms (慢速)"),
      createBullet("卡片悬停: translateY(-5px) + box-shadow增强"),
      createBullet("按钮悬停: 亮度提升 + scale(1.05)"),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 8. Risk Assessment
      createTitle("8. 风险评估"),
      createTable(
        ["风险", "影响", "概率", "缓解措施"],
        [
          ["样式冲突", "中", "高", "CSS命名空间隔离"],
          ["EdgeOne配置不熟悉", "中", "中", "参考官方文档和最佳实践"],
          ["计算精度误差", "高", "低", "使用行业标准算法"],
          ["移动端适配问题", "低", "中", "多设备测试验证"]
        ],
        [2500, 1500, 1500, 3860]
      ),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 9. Timeline
      createTitle("9. 项目计划"),
      createHeading("里程碑"),
      createTable(
        ["阶段", "任务", "交付物", "状态"],
        [
          ["阶段1", "基础架构搭建", "Portal首页、导航组件", "已完成"],
          ["阶段2", "工具页面重构", "4个重构后的工具页面", "已完成"],
          ["阶段3", "PRD文档编写", "Ralph Hughes PRD文档", "进行中"],
          ["阶段4", "EdgeOne部署", "生产环境部署", "待开始"],
          ["阶段5", "集成测试", "全流程功能验证", "待开始"]
        ],
        [1500, 3000, 3000, 1860]
      ),
      new Paragraph({ children: [new PageBreak()] }),
      
      // 10. Appendix
      createTitle("10. 附录"),
      createHeading("10.1 术语表"),
      createTable(
        ["术语", "英文", "说明"],
        [
          ["插入损耗", "Insertion Loss", "信号通过传输线时的功率损耗"],
          ["特征阻抗", "Characteristic Impedance", "传输线的固有阻抗特性"],
          ["DCR", "DC Resistance", "直流电阻"],
          ["TDR", "Time Domain Reflectometry", "时域反射计"],
          ["微带线", "Microstrip", "表层传输线结构"],
          ["带状线", "Stripline", "内层传输线结构"],
          ["CPW", "Coplanar Waveguide", "共面波导"]
        ],
        [2000, 3000, 4360]
      ),
      new Paragraph({ spacing: { before: 300 } }),
      createHeading("10.2 参考资料"),
      createBullet("IPC-2141: Controlled Impedance Circuit Boards"),
      createBullet("IEEE Std 299: Standard for Measuring Shielding Effectiveness"),
      createBullet("Rogers Corporation: High Frequency Materials Guide"),
      createBullet("腾讯 EdgeOne Pages 官方文档"),
      new Paragraph({ spacing: { before: 400 } }),
      new Paragraph({
        children: [new TextRun({ text: "—— 文档结束 ——", font: "Arial", size: 22, color: "666666" })],
        alignment: AlignmentType.CENTER
      })
    ]
  }]
});

// Generate document
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("d:/tools/EE_Tools/ee-tools-portal/PRD_EE_Tools_Portal.docx", buffer);
  console.log("PRD document created successfully!");
});
