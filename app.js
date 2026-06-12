(() => {
  const STORAGE_KEY = "kdc_settings_v2";

  const regionOptions = [
    { code: "US", name: "美国" },
    { code: "BR", name: "巴西" },
    { code: "MX", name: "墨西哥" },
    { code: "ID", name: "印尼" },
    { code: "JP", name: "日本" },
    { code: "MY", name: "马来西亚" },
    { code: "PH", name: "菲律宾" },
    { code: "SG", name: "新加坡" },
    { code: "TH", name: "泰国" },
    { code: "VN", name: "越南" },
    { code: "GB", name: "英国" },
    { code: "ES", name: "西班牙" },
    { code: "IT", name: "意大利" },
    { code: "FR", name: "法国" },
  ];

  const languageOptions = [
    { code: "zh-CN", name: "中文" },
    { code: "en-US", name: "英语" },
    { code: "ja-JP", name: "日语" },
    { code: "zh-TW", name: "汉语" },
    { code: "id-ID", name: "印尼语" },
    { code: "th-TH", name: "泰语" },
    { code: "vi-VN", name: "越南语" },
    { code: "fr-FR", name: "法语" },
    { code: "ko-KR", name: "韩语" },
    { code: "es-ES", name: "西班牙语" },
    { code: "pt-BR", name: "葡萄牙语" },
  ];

  const currencyOptions = [
    { code: "USD", name: "美元" },
    { code: "BRL", name: "巴西雷亚尔" },
    { code: "MXN", name: "墨西哥比索" },
    { code: "IDR", name: "印尼盾" },
    { code: "JPY", name: "日元" },
    { code: "MYR", name: "马来西亚林吉特" },
    { code: "PHP", name: "菲律宾比索" },
    { code: "SGD", name: "新加坡元" },
    { code: "THB", name: "泰铢" },
    { code: "VND", name: "越南盾" },
    { code: "GBP", name: "英镑" },
    { code: "EUR", name: "欧元" },
  ];

  const currencyRatesFromCNY = {
    CNY: 1,
    USD: 0.138,
    BRL: 0.75,
    MXN: 2.48,
    IDR: 2230,
    JPY: 21.7,
    MYR: 0.65,
    PHP: 8.1,
    SGD: 0.186,
    THB: 5.08,
    VND: 3510,
    GBP: 0.108,
    EUR: 0.127,
  };

  const supportEndpoints = [
    { key: "pricing.product.category.rank", path: "/openapi/v1/category/rank" },
    { key: "pricing.product.category.detail", path: "/openapi/v1/category/detail" },
    { key: "pricing.product.shop.rank", path: "/openapi/v1/tiktok/shop/rank" },
    { key: "pricing.product.shop.detail", path: "/openapi/v1/tiktok/shop/detail" },
    { key: "pricing.product.creator.rank", path: "/openapi/v1/tiktok/creator/rank" },
    { key: "pricing.product.creator.detail", path: "/openapi/v1/tiktok/creator/detail" },
    { key: "pricing.product.product.rank", path: "/openapi/v1/tiktok/product/rank" },
    { key: "pricing.product.product.detail", path: "/openapi/v1/tiktok/product/detail" },
    { key: "pricing.product.video.rank", path: "/openapi/v1/tiktok/video/rank" },
    { key: "pricing.product.video.detail", path: "/openapi/v1/tiktok/video/detail" },
    { key: "pricing.product.live.rank", path: "/openapi/v1/tiktok/livestream/rank" },
    { key: "pricing.product.live.detail", path: "/openapi/v1/tiktok/livestream/detail" },
  ];

  const zh = {
    "brand.title": "Kalodata Data Open Center",
    "brand.sub": "开放平台中心",
    "nav.home": "Home",
    "nav.docs": "API 文档",
    "nav.pricing": "定价",
    "nav.center": "个人中心",
    "action.login": "登录",
    "action.logout": "退出",
    "home.hero.tag": "连接业务与电商数据洞察",
    "home.hero.title": "一个中心，三种载体，持续开放能力",
    "home.hero.desc":
      "Kalodata 数据开放中心面向品牌方、服务商和技术团队，提供标准化、可计算、可集成的 TikTok Shop 数据能力。你可以按业务场景选择 API、MCP、Agent 等载体接入，当前已上线 API 服务，MCP 与 Agent 即将推出。",
    "home.hero.docs": "查看 API 文档",
    "home.hero.pricing": "查看采购规则",
    "home.metric.api": "当前开放 API 接口",
    "home.metric.modules": "核心数据模块",
    "home.metric.sites": "TikTok Shop 覆盖站点",
    "home.metric.sla": "SLA 可用性",
    "home.access.title": "三种接入载体，适配不同团队",
    "home.access.sub": "参考 open.sellersprite.com 首页结构，突出“载体选择 + 场景适配 + 上线状态”。",
    "home.status.available": "当前可用",
    "home.status.coming": "敬请期待",
    "home.access.api.desc": "标准 HTTP + JSON 接口，适合系统集成和数据平台对接。",
    "home.access.mcp.desc": "面向 AI 原生工具链，支持模型和自动化工作流直接调用数据能力。",
    "home.access.agent.desc": "面向智能分析任务，支持以自然语言完成洞察提取与业务辅助决策。",
    "home.access.api.b1": "6 大模块数据能力",
    "home.access.api.b2": "榜单 + 详情双接口设计",
    "home.access.api.b3": "按接口与调用量计费",
    "home.access.mcp.b1": "AI 工具编排接入",
    "home.access.mcp.b2": "更低门槛的数据消费",
    "home.access.mcp.b3": "适配智能工作流",
    "home.access.agent.b1": "任务化数据分析",
    "home.access.agent.b2": "多轮上下文协同",
    "home.access.agent.b3": "面向运营与策略团队",
    "home.scenario.title": "典型应用场景",
    "home.scenario.sub": "从选品到竞品监控，开放中心提供可持续复用的数据基础。",
    "home.scenario.1.t": "选品分析",
    "home.scenario.1.d": "结合类目与商品榜单，快速筛选高潜力商品与赛道。",
    "home.scenario.2.t": "达人合作评估",
    "home.scenario.2.d": "基于达人收入、曝光、粉丝结构筛选合作对象。",
    "home.scenario.3.t": "竞品追踪",
    "home.scenario.3.d": "监控店铺、视频、直播表现变化，支持策略调整。",
    "home.scenario.4.t": "跨市场洞察",
    "home.scenario.4.d": "通过 region + currency 统一参数做多国家横向对比。",
    "home.compare.title": "接入方式对比",
    "home.compare.sub": "当前开放 API，后续逐步补齐 MCP 与 Agent 服务。",
    "home.compare.col.feature": "特性",
    "home.compare.col.api": "API",
    "home.compare.col.mcp": "MCP",
    "home.compare.col.agent": "Agent",
    "home.compare.row.status": "上线状态",
    "home.compare.row.threshold": "技术门槛",
    "home.compare.row.integration": "系统集成",
    "home.compare.row.nl": "自然语言使用",
    "home.compare.row.fit": "最适合",
    "home.compare.threshold.api": "中等",
    "home.compare.threshold.mcp": "较低",
    "home.compare.threshold.agent": "低",
    "home.compare.integration.api": "支持",
    "home.compare.integration.mcp": "支持",
    "home.compare.integration.agent": "规划中",
    "home.compare.nl.api": "不支持",
    "home.compare.nl.mcp": "支持",
    "home.compare.nl.agent": "支持",
    "home.compare.fit.api": "现有系统对接",
    "home.compare.fit.mcp": "AI 工具集成",
    "home.compare.fit.agent": "任务自动化分析",
    "home.step.title": "三步开始使用（当前 API 流程）",
    "home.step.1.t": "查看文档",
    "home.step.1.d": "在 API 文档页确认目标接口、入参与返回字段结构。",
    "home.step.2.t": "购买接口商品",
    "home.step.2.d": "在定价页选择对应接口，按每次调用消耗 0.1 积分进行使用。",
    "home.step.3.t": "生成并复制密钥",
    "home.step.3.d": "前往个人中心生成一次性密钥，复制后完成系统接入。",
    "home.example.title": "快速示例（API）",
    "home.cta.title": "准备好开始了吗？",
    "home.cta.desc": "立即查看 API 文档并采购接口商品，开启你的数据接入流程。",
    "home.cta.docs": "进入 API 文档",
    "home.cta.center": "前往个人中心",
    "docs.sidebar.title": "接口目录",
    "docs.title": "API 文档",
    "docs.subtitle": "当前开放服务：API（MCP / Agent 敬请期待）",
    "docs.flow.title": "对接流程",
    "docs.flow.1": "前往",
    "docs.flow.1.link": "个人中心",
    "docs.flow.1.tail": "创建/管理您的接口密钥。",
    "docs.flow.2": "前往",
    "docs.flow.2.link": "定价",
    "docs.flow.2.tail": "页面购买对应接口。",
    "docs.flow.3": "按下方文档说明完成接口入参与返回字段接入。",
    "docs.integration.title": "对接方式",
    "docs.integration.desc":
      "所有接口采用 HTTP POST + JSON，通过请求头 secret-key 鉴权。公共请求参数为 region / language / currency / date_range。本页面仅展示接口结构，不提供在线调试。",
    "docs.req.title": "请求参数（入参）",
    "docs.req.h1": "参数名称",
    "docs.req.h2": "类型",
    "docs.req.h3": "说明",
    "docs.req.h4": "示例",
    "docs.req.h5": "必传",
    "docs.res.title": "返回参数（出参）",
    "docs.res.h1": "字段",
    "docs.res.h2": "类型",
    "docs.res.h3": "说明",
    "docs.res.h4": "示例",
    "docs.sample.title": "返回示例（结构）",
    "pricing.tag": "商品化采购",
    "pricing.title": "按需调用 + 灵活扩容",
    "pricing.desc": "计费方式说明：按单个接口维度计费，单个接口每次调用消耗 0.1 积分，每个商品默认对应 1 次调用。",
    "pricing.note": "* 所有接口统一按调用次数扣除积分，每调用 1 次扣除 0.1 积分。",
    "pricing.cart.title": "购物车",
    "pricing.cart.add": "加入购物车",
    "pricing.cart.empty": "购物车为空",
    "pricing.cart.itemUnit": "500次/件",
    "pricing.cart.total": "总计：",
    "pricing.cart.hint": "每个商品固定 500 次，可通过增加数量扩容。",
    "pricing.cart.buy": "购买",
    "pricing.cart.clear": "清空",
    "pricing.checkout.title": "收银台",
    "pricing.checkout.desc": "请选择支付方式完成本次采购。",
    "pricing.checkout.wechat": "微信支付",
    "pricing.checkout.alipay": "支付宝",
    "pricing.checkout.bank": "企业对公转账",
    "pricing.checkout.total": "应付金额：",
    "pricing.checkout.confirm": "确认支付",
    "pricing.checkout.cancel": "取消",
    "pricing.agreement.link": "查看《数据使用协议》",
    "pricing.agreement.title": "数据使用协议（摘要）",
    "pricing.agreement.content":
      "您同意仅在合法合规范围内使用 Kalodata 数据，不得用于侵犯隐私、违规抓取、倒卖或其他违法用途。您需对账号与密钥安全负责，并遵守平台调用频率与权限边界。平台可基于合规要求对异常调用进行限制或暂停服务。",
    "pricing.agreement.check": "我已阅读并同意《数据使用协议》",
    "pricing.agreement.required": "请先勾选并同意数据使用协议，再继续购买。",
    "pricing.product.price": "商品单价：",
    "pricing.product.path": "接口：",
    "pricing.product.calls": "调用次数：1 次",
    "pricing.product.creditFee": "扣减规则：每调用 1 次消耗 0.1 积分",
    "pricing.product.singleMode": "按单接口计费",
    "pricing.product.rankFee": "单次费用 = {unit} × (page / 5)",
    "pricing.product.detailFee": "详情接口按 {unit}/次",
    "pricing.product.category.rank": "类目榜单（1次）",
    "pricing.product.category.detail": "类目详情（1次）",
    "pricing.product.shop.rank": "店铺榜单（1次）",
    "pricing.product.shop.detail": "店铺详情（1次）",
    "pricing.product.creator.rank": "达人榜单（1次）",
    "pricing.product.creator.detail": "达人详情（1次）",
    "pricing.product.product.rank": "商品榜单（1次）",
    "pricing.product.product.detail": "商品详情（1次）",
    "pricing.product.video.rank": "视频榜单（1次）",
    "pricing.product.video.detail": "视频详情（1次）",
    "pricing.product.live.rank": "直播榜单（1次）",
    "pricing.product.live.detail": "直播详情（1次）",
    "pricing.points.title": "积分余额",
    "pricing.points.current": "当前您的积分数为：{points}",
    "pricing.points.hint": "积分可用于所有接口调用，扣减规则统一。",
    "pricing.points.recharge": "前往积分充值页面",
    "center.hero.tag": "企业账户中心",
    "center.hero.title": "采购、调用、密钥统一管理",
    "center.hero.desc": "按接口维度查看购买次数与剩余调用量，支持查看单接口调用趋势，并完成密钥生成与采购订单管理。",
    "center.balance": "接口调用余额（按接口）",
    "center.orders": "采购订单",
    "center.quota.h1": "接口",
    "center.quota.h2": "总次数",
    "center.quota.h3": "剩余",
    "center.quota.h4": "状态",
    "center.pager.pageSize": "每页 10 条",
    "center.pager.prev": "上一页",
    "center.pager.label": "页码",
    "center.pager.next": "下一页",
    "center.pager.format": "第 {page} / {total} 页",
    "center.status.ok": "正常",
    "center.status.warn": "即将耗尽",
    "center.status.watch": "关注",
    "center.status.pending": "待支付",
    "center.key.title": "接口密钥管理",
    "center.key.desc": "密钥不会存储。生成后请立即复制，复制后将自动消失。",
    "center.key.empty": "尚未生成密钥",
    "center.key.generate": "生成密钥",
    "center.key.copy": "复制密钥",
    "center.key.tip": "提示：仅在本次展示窗口内可见。",
    "center.key.generated": "密钥已生成，请立即复制。",
    "center.key.destroyed": "复制完成：出于安全原因，密钥已从页面移除。",
    "center.key.copiedMsg": "密钥已复制并销毁，请妥善保存。",
    "center.key.profile.title": "信息收集",
    "center.key.profile.desc": "为了更好的服务您，我们希望收集你的一些信息。",
    "center.key.profile.identity": "您的身份类型",
    "center.key.profile.identity.brand": "品牌公司",
    "center.key.profile.identity.consulting": "咨询公司",
    "center.key.profile.identity.merchant": "电商商家",
    "center.key.profile.identity.individual": "个人",
    "center.key.profile.identity.other": "其他",
    "center.key.profile.identity.otherPlaceholder": "请输入您的身份类型",
    "center.key.profile.purpose": "您的目的",
    "center.key.profile.purpose.self": "用于自己的业务分析",
    "center.key.profile.purpose.client": "协助客户做业务分析",
    "center.key.profile.submit": "提交并继续",
    "center.key.profile.cancel": "取消",
    "center.key.profile.error.identity": "请选择您的身份类型。",
    "center.key.profile.error.purpose": "请选择您的使用目的。",
    "center.key.profile.error.other": "请输入“其他”身份类型的具体内容。",
    "center.limit.title": "调用限制",
    "center.limit.desc": "默认固定窗口限流：1 秒最多 100 请求。超限后请重试或联系客户经理扩容。",
    "center.trend.title": "单接口调用趋势",
    "center.trend.desc": "仅展示所选接口的调用趋势，不展示所有接口总调用量。",
    "center.trend.endpoint": "选择接口",
    "center.trend.range": "时间范围",
    "center.trend.range.7": "最近7天",
    "center.trend.range.14": "最近14天",
    "center.trend.range.30": "最近30天",
    "center.trend.axisY": "调用次数",
    "center.trend.axisX": "时间",
    "center.order.search.placeholder": "按接口名搜索，例如：/openapi/v1/tiktok/creator/rank",
    "center.order.count": "共 {count} 条",
    "center.order.h1": "订单号",
    "center.order.h2": "采购内容",
    "center.order.h3": "调用次数",
    "center.order.h4": "订单金额",
    "center.order.h5": "状态",
    "center.order.h6": "下单时间",
    "center.order.none": "无匹配订单",
    "support.icon.label": "客服咨询",
    "support.title": "客服咨询",
    "support.subtitle": "请输入你需要咨询的问题，我们会尽快处理。",
    "support.type.label": "咨询类型",
    "support.type.quote": "咨询报价",
    "support.type.api": "咨询接口",
    "support.type.other": "其他咨询",
    "support.endpoint.label": "选择接口",
    "support.endpoint.placeholder": "请选择接口",
    "support.question.label": "咨询问题",
    "support.question.placeholder": "请输入你的问题",
    "support.contact.label": "联系方式",
    "support.contact.placeholder": "请输入手机号、微信或邮箱",
    "support.submit": "提交",
    "support.close": "取消",
    "support.success": "问题已接收，我们会在 3 天内联系你。",
    "support.error.required": "请填写完整的问题与联系方式。",
    "support.error.endpoint": "当前咨询类型需要先选择接口。",
  };

  const en = {
    "brand.title": "Kalodata Data Open Center",
    "brand.sub": "Open Platform Hub",
    "nav.home": "Home",
    "nav.docs": "API Docs",
    "nav.pricing": "Pricing",
    "nav.center": "Account",
    "action.login": "Sign in",
    "action.logout": "Sign out",
    "home.hero.tag": "Connect Business with E-commerce Insights",
    "home.hero.title": "One Center, Three Channels, Continuous Open Capability",
    "home.hero.desc":
      "Kalodata Data Open Center provides standardized and integrable TikTok Shop data for brands, agencies, and technical teams. Choose API, MCP, or Agent based on your scenario. API is available now; MCP and Agent are coming soon.",
    "home.hero.docs": "View API Docs",
    "home.hero.pricing": "View Pricing",
    "home.metric.api": "Open API Endpoints",
    "home.metric.modules": "Core Data Modules",
    "home.metric.sites": "TikTok Shop Markets",
    "home.metric.sla": "SLA Availability",
    "home.access.title": "Three Access Channels for Different Teams",
    "home.access.sub": "Channel selection + scenario fit + release status.",
    "home.status.available": "Available",
    "home.status.coming": "Coming Soon",
    "home.access.api.desc": "Standard HTTP + JSON interfaces for integration and data platforms.",
    "home.access.mcp.desc": "AI-native integration for toolchains and automated workflows.",
    "home.access.agent.desc": "Task-oriented intelligent analysis via natural language.",
    "home.access.api.b1": "6 core data modules",
    "home.access.api.b2": "Rank + detail dual interface model",
    "home.access.api.b3": "Usage-based billing",
    "home.access.mcp.b1": "AI tool orchestration",
    "home.access.mcp.b2": "Lower adoption threshold",
    "home.access.mcp.b3": "Workflow-native integration",
    "home.access.agent.b1": "Task-based analytics",
    "home.access.agent.b2": "Multi-turn context support",
    "home.access.agent.b3": "For operation and strategy teams",
    "home.scenario.title": "Typical Scenarios",
    "home.scenario.sub": "Reusable data foundation from product selection to competitor monitoring.",
    "home.scenario.1.t": "Product Selection",
    "home.scenario.1.d": "Use category and product rankings to identify high-potential opportunities quickly.",
    "home.scenario.2.t": "Creator Evaluation",
    "home.scenario.2.d": "Filter collaborators by creator revenue, exposure, and audience profile.",
    "home.scenario.3.t": "Competitor Tracking",
    "home.scenario.3.d": "Track shop, video, and livestream changes for strategy adjustments.",
    "home.scenario.4.t": "Cross-Market Insights",
    "home.scenario.4.d": "Compare markets with unified region and currency parameters.",
    "home.compare.title": "Access Mode Comparison",
    "home.compare.sub": "API is available now. MCP and Agent will be rolled out later.",
    "home.compare.col.feature": "Feature",
    "home.compare.col.api": "API",
    "home.compare.col.mcp": "MCP",
    "home.compare.col.agent": "Agent",
    "home.compare.row.status": "Release Status",
    "home.compare.row.threshold": "Technical Threshold",
    "home.compare.row.integration": "System Integration",
    "home.compare.row.nl": "Natural Language",
    "home.compare.row.fit": "Best For",
    "home.compare.threshold.api": "Medium",
    "home.compare.threshold.mcp": "Low",
    "home.compare.threshold.agent": "Very Low",
    "home.compare.integration.api": "Supported",
    "home.compare.integration.mcp": "Supported",
    "home.compare.integration.agent": "Planned",
    "home.compare.nl.api": "No",
    "home.compare.nl.mcp": "Yes",
    "home.compare.nl.agent": "Yes",
    "home.compare.fit.api": "Existing system integration",
    "home.compare.fit.mcp": "AI tooling integration",
    "home.compare.fit.agent": "Task automation analysis",
    "home.step.title": "Start in 3 Steps (Current API Flow)",
    "home.step.1.t": "Read Docs",
    "home.step.1.d": "Confirm target APIs, request fields, and response schema in docs.",
    "home.step.2.t": "Purchase API Items",
    "home.step.2.d": "Select the target API in pricing and consume 0.1 point for each call.",
    "home.step.3.t": "Generate and Copy Key",
    "home.step.3.d": "Generate one-time API key in account page, copy it, then integrate.",
    "home.example.title": "Quick API Example",
    "home.cta.title": "Ready to Start?",
    "home.cta.desc": "Open API docs and purchase API items to start integration.",
    "home.cta.docs": "Open API Docs",
    "home.cta.center": "Go to Account",
    "docs.sidebar.title": "API Directory",
    "docs.title": "API Docs",
    "docs.subtitle": "Current service: API (MCP / Agent coming soon)",
    "docs.flow.title": "Integration Flow",
    "docs.flow.1": "Go to",
    "docs.flow.1.link": "Account",
    "docs.flow.1.tail": "to create/manage your API key.",
    "docs.flow.2": "Go to",
    "docs.flow.2.link": "Pricing",
    "docs.flow.2.tail": "to purchase target APIs.",
    "docs.flow.3": "Follow API fields below to complete integration.",
    "docs.integration.title": "Integration Method",
    "docs.integration.desc":
      "All endpoints use HTTP POST + JSON with secret-key authentication in headers. Common fields: region / language / currency / date_range. This page is read-only and does not support online debugging.",
    "docs.req.title": "Request Parameters",
    "docs.req.h1": "Field",
    "docs.req.h2": "Type",
    "docs.req.h3": "Description",
    "docs.req.h4": "Example",
    "docs.req.h5": "Required",
    "docs.res.title": "Response Parameters",
    "docs.res.h1": "Field",
    "docs.res.h2": "Type",
    "docs.res.h3": "Description",
    "docs.res.h4": "Example",
    "docs.sample.title": "Response Example",
    "pricing.tag": "Productized Purchase",
    "pricing.title": "Pay as You Go + Flexible Scaling",
    "pricing.desc": "Billing: per API endpoint. Each call consumes 0.1 point, and each item corresponds to 1 call.",
    "pricing.note": "* All APIs consume points by call count. Each call costs 0.1 point.",
    "pricing.cart.title": "Cart",
    "pricing.cart.add": "Add to Cart",
    "pricing.cart.empty": "Cart is empty",
    "pricing.cart.itemUnit": "500 calls/item",
    "pricing.cart.total": "Total: ",
    "pricing.cart.hint": "Each item includes 500 calls and can be expanded by quantity.",
    "pricing.cart.buy": "Checkout",
    "pricing.cart.clear": "Clear",
    "pricing.checkout.title": "Checkout",
    "pricing.checkout.desc": "Choose a payment method to complete purchase.",
    "pricing.checkout.wechat": "WeChat Pay",
    "pricing.checkout.alipay": "Alipay",
    "pricing.checkout.bank": "Corporate Transfer",
    "pricing.checkout.total": "Amount Due: ",
    "pricing.checkout.confirm": "Pay Now",
    "pricing.checkout.cancel": "Cancel",
    "pricing.agreement.link": "View Data Usage Agreement",
    "pricing.agreement.title": "Data Usage Agreement (Summary)",
    "pricing.agreement.content":
      "You agree to use Kalodata data only for lawful and compliant purposes. Privacy infringement, abusive scraping, resale, or any illegal use is prohibited. You are responsible for account and key security, and must follow platform call limits and permission boundaries. The platform may restrict suspicious traffic for compliance reasons.",
    "pricing.agreement.check": "I have read and agree to the Data Usage Agreement",
    "pricing.agreement.required": "Please agree to the data usage agreement before checkout.",
    "pricing.product.price": "Item Price: ",
    "pricing.product.path": "API: ",
    "pricing.product.calls": "Calls: 1",
    "pricing.product.creditFee": "Rule: each call consumes 0.1 point",
    "pricing.product.singleMode": "Per-endpoint billing",
    "pricing.product.rankFee": "Unit cost = {unit} × (page / 5)",
    "pricing.product.detailFee": "Detail API = {unit}/call",
    "pricing.product.category.rank": "Category Rank (1 call)",
    "pricing.product.category.detail": "Category Detail (1 call)",
    "pricing.product.shop.rank": "Shop Rank (1 call)",
    "pricing.product.shop.detail": "Shop Detail (1 call)",
    "pricing.product.creator.rank": "Creator Rank (1 call)",
    "pricing.product.creator.detail": "Creator Detail (1 call)",
    "pricing.product.product.rank": "Product Rank (1 call)",
    "pricing.product.product.detail": "Product Detail (1 call)",
    "pricing.product.video.rank": "Video Rank (1 call)",
    "pricing.product.video.detail": "Video Detail (1 call)",
    "pricing.product.live.rank": "Livestream Rank (1 call)",
    "pricing.product.live.detail": "Livestream Detail (1 call)",
    "pricing.points.title": "Point Balance",
    "pricing.points.current": "Your current points: {points}",
    "pricing.points.hint": "Points apply to all API calls with a unified rule.",
    "pricing.points.recharge": "Go to Points Recharge Page",
    "center.hero.tag": "Enterprise Account",
    "center.hero.title": "Unified Purchase, Usage, and Key Management",
    "center.hero.desc": "View purchased and remaining calls by API, monitor per-API trends, and manage keys and orders.",
    "center.balance": "API Call Balance (Per API)",
    "center.orders": "Purchase Orders",
    "center.quota.h1": "API",
    "center.quota.h2": "Total",
    "center.quota.h3": "Remaining",
    "center.quota.h4": "Status",
    "center.pager.pageSize": "10 per page",
    "center.pager.prev": "Prev",
    "center.pager.label": "Page",
    "center.pager.next": "Next",
    "center.pager.format": "Page {page} / {total}",
    "center.status.ok": "Healthy",
    "center.status.warn": "Low Balance",
    "center.status.watch": "Watch",
    "center.status.pending": "Pending",
    "center.key.title": "API Key Management",
    "center.key.desc": "Keys are not stored. Copy immediately after generation; it disappears after copy.",
    "center.key.empty": "No key generated",
    "center.key.generate": "Generate Key",
    "center.key.copy": "Copy Key",
    "center.key.tip": "Tip: visible only in current session.",
    "center.key.generated": "Key generated. Please copy now.",
    "center.key.destroyed": "Copy completed: key removed for security.",
    "center.key.copiedMsg": "Key copied and destroyed. Keep it safe.",
    "center.key.profile.title": "Information Collection",
    "center.key.profile.desc": "To serve you better, we would like to collect some information.",
    "center.key.profile.identity": "Your Identity Type",
    "center.key.profile.identity.brand": "Brand Company",
    "center.key.profile.identity.consulting": "Consulting Company",
    "center.key.profile.identity.merchant": "E-commerce Merchant",
    "center.key.profile.identity.individual": "Individual",
    "center.key.profile.identity.other": "Other",
    "center.key.profile.identity.otherPlaceholder": "Please enter your identity type",
    "center.key.profile.purpose": "Your Purpose",
    "center.key.profile.purpose.self": "For my own business analysis",
    "center.key.profile.purpose.client": "To support client business analysis",
    "center.key.profile.submit": "Submit and Continue",
    "center.key.profile.cancel": "Cancel",
    "center.key.profile.error.identity": "Please select your identity type.",
    "center.key.profile.error.purpose": "Please select your purpose.",
    "center.key.profile.error.other": "Please specify your identity type for Other.",
    "center.limit.title": "Rate Limit",
    "center.limit.desc": "Default fixed-window limit: up to 100 requests per second.",
    "center.trend.title": "Per-API Usage Trend",
    "center.trend.desc": "Only selected API trend is displayed, not aggregated usage.",
    "center.trend.endpoint": "API",
    "center.trend.range": "Time Range",
    "center.trend.range.7": "Last 7 days",
    "center.trend.range.14": "Last 14 days",
    "center.trend.range.30": "Last 30 days",
    "center.trend.axisY": "Calls",
    "center.trend.axisX": "Time",
    "center.order.search.placeholder": "Search by API path, e.g. /openapi/v1/tiktok/creator/rank",
    "center.order.count": "{count} records",
    "center.order.h1": "Order No.",
    "center.order.h2": "API",
    "center.order.h3": "Calls",
    "center.order.h4": "Amount",
    "center.order.h5": "Status",
    "center.order.h6": "Created At",
    "center.order.none": "No matching orders",
    "support.icon.label": "Support",
    "support.title": "Customer Support",
    "support.subtitle": "Tell us your question and we will follow up shortly.",
    "support.type.label": "Inquiry Type",
    "support.type.quote": "Pricing Inquiry",
    "support.type.api": "API Inquiry",
    "support.type.other": "Other",
    "support.endpoint.label": "Select API",
    "support.endpoint.placeholder": "Please select an API",
    "support.question.label": "Your Question",
    "support.question.placeholder": "Describe what you need help with",
    "support.contact.label": "Contact",
    "support.contact.placeholder": "Phone, WeChat, or email",
    "support.submit": "Submit",
    "support.close": "Cancel",
    "support.success": "Your request has been received. We will contact you within 3 days.",
    "support.error.required": "Please provide both question and contact information.",
    "support.error.endpoint": "Please select an API for this inquiry type.",
  };

  const languagePacks = {
    "zh-CN": zh,
    "zh-TW": { ...zh, "action.login": "登入", "action.logout": "登出" },
    "en-US": en,
    "ja-JP": en,
    "id-ID": en,
    "th-TH": en,
    "vi-VN": en,
    "fr-FR": en,
    "ko-KR": en,
    "es-ES": en,
    "pt-BR": en,
  };

  const defaults = {
    region: "US",
    language: "zh-CN",
    currency: "USD",
  };

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...defaults };
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return { ...defaults };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function getTexts(language) {
    return languagePacks[language] || en;
  }

  function t(key, language) {
    const textMap = getTexts(language || state.language);
    return textMap[key] || zh[key] || key;
  }

  function tf(key, vars = {}, language) {
    const raw = t(key, language);
    return raw.replace(/\{(\w+)\}/g, (_, token) => (vars[token] ?? `{${token}}`));
  }

  function formatMoneyCNY(valueInCNY, currencyCode) {
    const code = currencyCode || state.currency;
    const rate = currencyRatesFromCNY[code] || 1;
    const amount = valueInCNY * rate;
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: code,
        maximumFractionDigits: code === "JPY" || code === "VND" || code === "IDR" ? 0 : 2,
      }).format(amount);
    } catch {
      return `${amount.toFixed(2)} ${code}`;
    }
  }

  function applyI18n() {
    document.documentElement.lang = state.language;
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = t(key);
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
      const key = element.getAttribute("data-i18n-placeholder");
      const value = t(key);
      if (value && "placeholder" in element) element.placeholder = value;
    });
  }

  function buildOptions(select, options) {
    select.innerHTML = options.map((item) => `<option value="${item.code}">${item.name}</option>`).join("");
  }

  function dispatchSettingsChanged() {
    window.dispatchEvent(
      new CustomEvent("kdc:settingsChanged", {
        detail: { ...state },
      })
    );
  }

  function initGlobalSelectors() {
    const regionSelect = document.getElementById("global-region");
    const languageSelect = document.getElementById("global-language");
    const currencySelect = document.getElementById("global-currency");
    if (!regionSelect || !languageSelect || !currencySelect) return;

    buildOptions(regionSelect, regionOptions);
    buildOptions(languageSelect, languageOptions);
    buildOptions(currencySelect, currencyOptions);
    regionSelect.value = state.region;
    languageSelect.value = state.language;
    currencySelect.value = state.currency;

    regionSelect.addEventListener("change", () => {
      state.region = regionSelect.value;
      saveSettings(state);
      dispatchSettingsChanged();
    });
    languageSelect.addEventListener("change", () => {
      state.language = languageSelect.value;
      saveSettings(state);
      applyI18n();
      dispatchSettingsChanged();
    });
    currencySelect.addEventListener("change", () => {
      state.currency = currencySelect.value;
      saveSettings(state);
      dispatchSettingsChanged();
    });
  }

  function initSupportWidget() {
    if (document.getElementById("kdc-support-fab")) return;
    const host = document.createElement("div");
    host.innerHTML = `
      <button id="kdc-support-fab" class="kdc-support-fab" type="button" title="${t("support.icon.label")}">💬</button>
      <div id="kdc-support-modal" class="kdc-support-modal" aria-hidden="true">
        <div class="kdc-support-card">
          <h3 data-i18n="support.title">客服咨询</h3>
          <p class="kdc-support-sub" data-i18n="support.subtitle">请输入你需要咨询的问题，我们会尽快处理。</p>
          <div class="kdc-support-grid">
            <div class="kdc-support-field">
              <label data-i18n="support.type.label">咨询类型</label>
              <select id="kdc-support-type"></select>
            </div>
            <div class="kdc-support-field" id="kdc-support-endpoint-row">
              <label data-i18n="support.endpoint.label">选择接口</label>
              <select id="kdc-support-endpoint"></select>
            </div>
            <div class="kdc-support-field full">
              <label data-i18n="support.question.label">咨询问题</label>
              <textarea id="kdc-support-question" data-i18n-placeholder="support.question.placeholder" placeholder="请输入你的问题"></textarea>
            </div>
            <div class="kdc-support-field full">
              <label data-i18n="support.contact.label">联系方式</label>
              <input id="kdc-support-contact" data-i18n-placeholder="support.contact.placeholder" placeholder="请输入手机号、微信或邮箱" />
            </div>
          </div>
          <p id="kdc-support-status" class="kdc-support-status muted"></p>
          <div class="kdc-support-actions">
            <button id="kdc-support-submit" class="btn primary" type="button" data-i18n="support.submit">提交</button>
            <button id="kdc-support-close" class="btn" type="button" data-i18n="support.close">取消</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(host);

    const fab = document.getElementById("kdc-support-fab");
    const modal = document.getElementById("kdc-support-modal");
    const typeSelect = document.getElementById("kdc-support-type");
    const endpointSelect = document.getElementById("kdc-support-endpoint");
    const endpointRow = document.getElementById("kdc-support-endpoint-row");
    const questionInput = document.getElementById("kdc-support-question");
    const contactInput = document.getElementById("kdc-support-contact");
    const submitBtn = document.getElementById("kdc-support-submit");
    const closeBtn = document.getElementById("kdc-support-close");
    const status = document.getElementById("kdc-support-status");

    const setStatus = (key, tone = "muted") => {
      status.textContent = key ? t(key) : "";
      status.className = `kdc-support-status ${tone}`;
      status.dataset.key = key || "";
    };

    const renderTypeOptions = () => {
      typeSelect.innerHTML = [
        { value: "quote", key: "support.type.quote" },
        { value: "api", key: "support.type.api" },
        { value: "other", key: "support.type.other" },
      ]
        .map((item) => `<option value="${item.value}">${t(item.key)}</option>`)
        .join("");
    };

    const renderEndpointOptions = () => {
      endpointSelect.innerHTML = [
        `<option value="">${t("support.endpoint.placeholder")}</option>`,
        ...supportEndpoints.map((item) => `<option value="${item.path}">${t(item.key)} | ${item.path}</option>`),
      ].join("");
    };

    const updateEndpointRow = () => {
      endpointRow.style.display = typeSelect.value === "other" ? "none" : "block";
    };

    renderTypeOptions();
    renderEndpointOptions();
    updateEndpointRow();

    fab.addEventListener("click", () => {
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      setStatus("", "muted");
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    });

    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
      }
    });

    typeSelect.addEventListener("change", updateEndpointRow);

    submitBtn.addEventListener("click", () => {
      const type = typeSelect.value;
      const endpoint = endpointSelect.value;
      const question = String(questionInput.value || "").trim();
      const contact = String(contactInput.value || "").trim();

      if ((type === "quote" || type === "api") && !endpoint) {
        setStatus("support.error.endpoint", "status-warn");
        return;
      }
      if (!question || !contact) {
        setStatus("support.error.required", "status-warn");
        return;
      }

      questionInput.value = "";
      contactInput.value = "";
      endpointSelect.value = "";
      setStatus("support.success", "status-ok");
    });

    window.addEventListener("kdc:settingsChanged", () => {
      const currentType = typeSelect.value;
      const currentEndpoint = endpointSelect.value;
      renderTypeOptions();
      renderEndpointOptions();
      if (["quote", "api", "other"].includes(currentType)) typeSelect.value = currentType;
      if (currentEndpoint) endpointSelect.value = currentEndpoint;
      updateEndpointRow();
      if (status.dataset.key) {
        const tone = status.classList.contains("status-ok")
          ? "status-ok"
          : status.classList.contains("status-warn")
          ? "status-warn"
          : "muted";
        setStatus(status.dataset.key, tone);
      }
      fab.title = t("support.icon.label");
    });
  }

  const state = loadSettings();

  window.KDC = {
    get settings() {
      return { ...state };
    },
    t: (key) => t(key, state.language),
    tf: (key, vars = {}) => tf(key, vars, state.language),
    formatMoneyCNY: (valueInCNY, currencyCode) => formatMoneyCNY(valueInCNY, currencyCode || state.currency),
    isZh: () => String(state.language).startsWith("zh"),
    regionOptions,
    languageOptions,
    currencyOptions,
  };

  document.addEventListener("DOMContentLoaded", () => {
    initGlobalSelectors();
    initSupportWidget();
    applyI18n();
    dispatchSettingsChanged();
  });
})();
