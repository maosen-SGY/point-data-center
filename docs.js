const commonParams = [
  ["region", "string", "指定数据国家（US/GB/ID/TH/VN/PH/MY）", "US", "Y"],
  ["language", "string", "返回语言（zh-CN/en-US/id-ID/th-TH/vi-VN）", "zh-CN", "Y"],
  ["currency", "string", "金额单位（CNY/USD/IDR/VND/THB/MYR）", "USD", "Y"],
  ["date_range", "string", "日期范围（lastDay/last7Day/last30Day/2024-01）", "last7Day", "Y"],
];

const endpointData = {
  "category-rank": {
    module: "类目",
    title: "类目榜单",
    method: "POST",
    path: "/openapi/v1/category/rank",
    intent: "获取类目成交排行榜，支持排序和范围筛选。",
    request: [
      ...commonParams,
      ["category_id", "string", "指定类目，返回该类目及下级类目", "601450", "N"],
      ["category_level", "string", "类目等级：1/2/3", "1", "N"],
      ["revenue_range", "string", "成交金额范围，左闭右开", "100-1000", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"revenue","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["category_id", "string", "类目 id", "601450"],
      ["category_name", "string", "类目名称（随语言变化）", "美妆个护"],
      ["rank", "int", "排名", "1"],
      ["revenue", "double", "成交金额", "10000.00"],
      ["revenue_growth_rate", "double", "成交增长率", "10.75"],
      ["top3_shop_revenue_ratio", "double", "Top3 店铺销售占比", "15.0"],
    ],
  },
  "category-detail": {
    module: "类目",
    title: "单类目详情",
    method: "POST",
    path: "/openapi/v1/category/detail",
    intent: "查看类目维度的收入结构、店铺规模和增长信息。",
    request: [...commonParams, ["category_id", "string", "查询类目 id", "848648", "Y"]],
    response: [
      ["category_id", "string", "类目 id", "848648"],
      ["category_name", "string", "类目名称", "美妆香水"],
      ["revenue", "double", "类目收入", "100000.00"],
      ["shop_number", "int", "动销店铺数", "100"],
      ["live_revenue", "double", "直播成交金额", "2000.0"],
      ["video_revenue", "double", "视频成交金额", "1111.1"],
      ["revenue_growth_rate", "double", "增长率", "30.12"],
    ],
  },
  "shop-rank": {
    module: "店铺",
    title: "店铺榜单",
    method: "POST",
    path: "/openapi/v1/tiktok/shop/rank",
    intent: "按成交额、增长率、件单价等指标筛选店铺。",
    request: [
      ...commonParams,
      ["category_ids", "list<string>", "类目筛选", '["601450"]', "N"],
      ["shop_type", "string", "BRAND/RETAILER", "BRAND", "N"],
      ["revenue_range", "string", "店铺成交金额范围", "100-1000", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"revenue","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["shop_id", "string", "店铺 id", "7494965300835814281"],
      ["shop_name", "string", "店铺名称", "skintific.indonesia"],
      ["rank", "int", "店铺排名", "1"],
      ["revenue", "double", "成交金额", "1000.00"],
      ["sales_volumn", "int", "销量", "100"],
      ["unit_price", "double", "平均件单价", "10.0"],
    ],
  },
  "shop-detail": {
    module: "店铺",
    title: "单店铺详情",
    method: "POST",
    path: "/openapi/v1/tiktok/shop/detail",
    intent: "查看店铺的收入构成、达人合作和内容规模。",
    request: [
      ...commonParams,
      ["shop_id", "string", "指定店铺 id", "7494965300835814281", "Y"],
      ["category_id", "string", "指定类目后返回该类目成交", "700645", "N"],
    ],
    response: [
      ["shop_id", "string", "店铺 id", "7494965300835814281"],
      ["shop_name", "string", "店铺名称", "skintific.indonesia"],
      ["revenue", "double", "成交金额", "20000.0"],
      ["affiliate_revenue", "double", "联盟达人成交金额", "10000.0"],
      ["creator_number", "int", "合作达人数", "100"],
      ["product_number", "int", "上架商品数", "200"],
    ],
  },
  "creator-rank": {
    module: "达人",
    title: "达人榜单",
    method: "POST",
    path: "/openapi/v1/tiktok/creator/rank",
    intent: "按达人带货收入、曝光和粉丝规模排序。",
    request: [
      ...commonParams,
      ["category_ids", "list<long>", "类目筛选", "[700645,223]", "N"],
      ["shop_id", "string", "指定合作店铺", "7494965300835814281", "N"],
      ["creator_type", "string", "BELONGED_TO_SELLER/INDEPENDENT", "INDEPENDENT", "N"],
      ["followers_range", "string", "粉丝范围", "1000-10000", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"revenue","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["creator_id", "string", "达人 id", "6937492675021095937"],
      ["creator_nickname", "string", "达人昵称", "Cici Barbar"],
      ["creator_handle", "string", "达人 handle", "@cici.barbar"],
      ["revenue", "double", "达人成交金额", "2000.0"],
      ["content_views", "int", "内容曝光量", "1200"],
      ["creator_followers", "int", "粉丝数量", "100000"],
    ],
  },
  "creator-detail": {
    module: "达人",
    title: "单达人详情",
    method: "POST",
    path: "/openapi/v1/tiktok/creator/detail",
    intent: "查看达人基础信息、联系方式及商品转化能力。",
    request: [
      ...commonParams,
      ["creator_id", "string", "达人 id", "6937492675021095937", "Y"],
      ["shop_id", "string", "指定店铺后仅统计该店铺相关成交", "7495634116320922282", "N"],
      ["category_ids", "list<long>", "指定类目后仅统计类目成交", "[700645,223]", "N"],
    ],
    response: [
      ["creator_id", "string", "达人 id", "6937492675021095937"],
      ["creator_nickname", "string", "达人昵称", "Cici barbar"],
      ["creator_status", "string", "达人身份", "INDEPENDENT"],
      ["creator_contact_email", "string", "联系方式", "a@qq.com"],
      ["revenue", "double", "成交金额", "100"],
      ["sales_volumn", "int", "销量", "100"],
    ],
  },
  "product-rank": {
    module: "商品",
    title: "商品榜单",
    method: "POST",
    path: "/openapi/v1/tiktok/product/rank",
    intent: "按成交额、佣金率、价格区间筛选商品。",
    request: [
      ...commonParams,
      ["category_ids", "list<string>", "类目筛选", '["601450"]', "N"],
      ["shop_id", "string", "指定店铺", "7495634116320922282", "N"],
      ["is_affiliate", "string", "是否联盟商品", "PUBLIC_PLAN", "N"],
      ["commission_rate", "double", "联盟佣金率", "0.15", "N"],
      ["is_tts_product", "int", "是否全托管（1/0）", "1", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"revenue","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["product_id", "string", "商品 id", "7495758373040719931"],
      ["product_name", "string", "商品名称", "Botol Minyak 1001 Khasiat"],
      ["product_revenue", "double", "商品成交金额", "100.0"],
      ["commission_rate", "double", "佣金率", "0.22"],
      ["sales_volumn", "int", "销量", "1"],
      ["unit_price", "double", "件单价", "2.0"],
    ],
  },
  "product-detail": {
    module: "商品",
    title: "单商品详情",
    method: "POST",
    path: "/openapi/v1/tiktok/product/detail",
    intent: "查看商品价格区间、销售与关联达人表现。",
    request: [...commonParams, ["product_id", "string", "商品 id", "1729587769570529799", "Y"]],
    response: [
      ["product_id", "string", "商品 id", "1729587769570529799"],
      ["product_region", "string", "所属国家", "US"],
      ["max_price", "double", "最高 SKU 价格", "30.1"],
      ["min_price", "double", "最低 SKU 价格", "20.1"],
      ["revenue", "double", "成交金额", "1.0"],
      ["creator_number", "int", "带货达人数", "1"],
    ],
  },
  "video-rank": {
    module: "视频",
    title: "视频榜单",
    method: "POST",
    path: "/openapi/v1/tiktok/video/rank",
    intent: "按视频成交、曝光和广告 ROAS 进行排名。",
    request: [
      ...commonParams,
      ["category_id", "string", "指定类目", "603748", "N"],
      ["creator_id", "string", "指定达人", "7372157480166655019", "N"],
      ["product_id", "string", "指定商品", "1729587769570529799", "N"],
      ["ads_roas", "double", "广告 ROAS 范围", "0.1", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"revenue","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["video_id", "string", "视频 id", "7404191282148511007"],
      ["video_title", "string", "视频标题", "The shaver for your needs"],
      ["revenue", "double", "视频成交金额", "100.0"],
      ["views", "int", "观看量", "100"],
      ["revenue_growth_rate", "double", "成交增长率", "0.1"],
      ["ads_roas", "double", "广告 ROAS", "0.41"],
    ],
  },
  "video-detail": {
    module: "视频",
    title: "单视频详情",
    method: "POST",
    path: "/openapi/v1/tiktok/video/detail",
    intent: "查看视频关联商品、投放和成交表现。",
    request: [...commonParams, ["video_id", "string", "视频 id", "7404191282148511007", "Y"]],
    response: [
      ["video_id", "string", "视频 id", "7404191282148511007"],
      ["video_title", "string", "视频标题", "The shaver for your needs"],
      ["creator_id", "string", "达人 id", "7372157480166655019"],
      ["product_number", "int", "挂载商品数量", "100"],
      ["revenue", "double", "视频成交金额", "100.0"],
      ["ads_period", "int", "投放天数", "30"],
    ],
  },
  "live-rank": {
    module: "直播",
    title: "直播榜单",
    method: "POST",
    path: "/openapi/v1/tiktok/livestream/rank",
    intent: "按直播收入、粉丝、时长等指标筛选直播间。",
    request: [
      ...commonParams,
      ["creator_id", "string", "指定达人", "7014603102829593606", "N"],
      ["followers_range", "string", "粉丝范围", ">100", "N"],
      ["sort_field", "object", "排序字段与方向", '{"field":"followers","type":"DESC"}', "Y"],
      ["page_size", "int", "每页条数（5~100）", "20", "Y"],
      ["page_number", "int", "页码（最多第5页）", "1", "Y"],
    ],
    response: [
      ["livestream_id", "string", "直播间 id", "7413090312010091307"],
      ["livestream_title", "string", "直播间标题", "Big LIVE Deals!"],
      ["creator_handle", "string", "达人 handle", "simplymandys"],
      ["livestream_duration", "int", "直播时长（秒）", "3600"],
      ["revenue", "double", "直播成交金额", "100.0"],
      ["unit_price", "double", "件单价", "20.0"],
    ],
  },
  "live-detail": {
    module: "直播",
    title: "单直播详情",
    method: "POST",
    path: "/openapi/v1/tiktok/livestream/detail",
    intent: "查看直播间时长、观众、商品与成交表现。",
    request: [...commonParams, ["livestream_id", "string", "直播间 id", "7413090312010091307", "Y"]],
    response: [
      ["livestream_id", "string", "直播间 id", "7413090312010091307"],
      ["livestream_title", "string", "直播间标题", "Big LIVE Deals"],
      ["duration", "int", "直播时长（秒）", "3600"],
      ["product_number", "int", "售卖商品数量", "100"],
      ["viewers", "int", "观众人数", "100"],
      ["gpm", "double", "直播 gpm", "10.0"],
    ],
  },
};

const endpointOrder = [
  ["类目", ["category-rank", "category-detail"]],
  ["店铺", ["shop-rank", "shop-detail"]],
  ["达人", ["creator-rank", "creator-detail"]],
  ["商品", ["product-rank", "product-detail"]],
  ["视频", ["video-rank", "video-detail"]],
  ["直播", ["live-rank", "live-detail"]],
];

const endpointMetaEN = {
  "category-rank": { module: "Category", title: "Category Rank", intent: "Get category ranking with sorting and range filters." },
  "category-detail": { module: "Category", title: "Category Detail", intent: "View category revenue structure, shop scale, and growth metrics." },
  "shop-rank": { module: "Shop", title: "Shop Rank", intent: "Filter shops by revenue, growth rate, and unit price." },
  "shop-detail": { module: "Shop", title: "Shop Detail", intent: "View shop revenue structure, creator collaboration, and content scale." },
  "creator-rank": { module: "Creator", title: "Creator Rank", intent: "Rank creators by revenue, exposure, and followers." },
  "creator-detail": { module: "Creator", title: "Creator Detail", intent: "View creator profile, contact, and conversion capability." },
  "product-rank": { module: "Product", title: "Product Rank", intent: "Filter products by revenue, commission rate, and price range." },
  "product-detail": { module: "Product", title: "Product Detail", intent: "View product pricing range, sales, and related creator performance." },
  "video-rank": { module: "Video", title: "Video Rank", intent: "Rank videos by GMV, exposure, and ROAS." },
  "video-detail": { module: "Video", title: "Video Detail", intent: "View related products, ads, and sales performance for videos." },
  "live-rank": { module: "Livestream", title: "Livestream Rank", intent: "Filter livestreams by revenue, followers, and duration." },
  "live-detail": { module: "Livestream", title: "Livestream Detail", intent: "View livestream duration, audience, products, and sales performance." },
};

const moduleNameEN = {
  类目: "Category",
  店铺: "Shop",
  达人: "Creator",
  商品: "Product",
  视频: "Video",
  直播: "Livestream",
};

function isZh() {
  return window.KDC && window.KDC.isZh && window.KDC.isZh();
}

function localizeEndpoint(ep, id) {
  if (isZh()) return ep;
  const meta = endpointMetaEN[id];
  return {
    ...ep,
    module: meta?.module || ep.module,
    title: meta?.title || ep.title,
    intent: meta?.intent || ep.intent,
  };
}

function renderDocNav() {
  const host = document.getElementById("doc-nav");
  host.innerHTML = endpointOrder
    .map(([group, ids]) => {
      const buttons = ids
        .map((id, idx) => {
          const ep = localizeEndpoint(endpointData[id], id);
          return `<button class="doc-link ${id === "category-rank" && idx === 0 ? "active" : ""}" data-endpoint="${id}">${ep.title}</button>`;
        })
        .join("");
      const groupText = isZh() ? group : moduleNameEN[group] || group;
      return `<section class="doc-group"><p class="doc-group-title">${groupText}</p>${buttons}</section>`;
    })
    .join("");
}

function fillTable(tableId, rows, mode) {
  const normalizeDesc = (value) => {
    if (isZh()) return value;
    const replacements = [
      ["指定", "Specify "],
      ["查询", "Query "],
      ["返回", "Return "],
      ["类目", "category"],
      ["店铺", "shop"],
      ["达人", "creator"],
      ["商品", "product"],
      ["视频", "video"],
      ["直播", "livestream"],
      ["金额", "revenue"],
      ["增长率", "growth rate"],
      ["排序字段与方向", "sort field and direction"],
      ["每页条数", "items per page"],
      ["页码", "page number"],
      ["粉丝范围", "follower range"],
      ["是否", "whether "],
      ["国家", "region"],
      ["语言", "language"],
      ["日期范围", "date range"],
      ["必传", "required"],
      ["说明", "description"],
    ];
    let out = String(value);
    replacements.forEach(([from, to]) => {
      out = out.replaceAll(from, to);
    });
    return out;
  };

  const body = document.getElementById(tableId);
  body.innerHTML = rows
    .map((row) => {
      if (mode === "request") {
        const required = isZh() ? row[4] : row[4] === "Y" ? "Yes" : "No";
        return `<tr>
          <td class="mono">${row[0]}</td><td>${row[1]}</td><td>${normalizeDesc(row[2])}</td><td class="mono">${row[3]}</td><td>${required}</td>
        </tr>`;
      }
      return `<tr>
        <td class="mono">${row[0]}</td><td>${row[1]}</td><td>${normalizeDesc(row[2])}</td><td class="mono">${row[3]}</td>
      </tr>`;
    })
    .join("");
}

function renderEndpoint(id) {
  const ep = localizeEndpoint(endpointData[id], id);
  document.getElementById("endpoint-title").textContent = ep.title;
  document.getElementById("endpoint-intent").textContent = ep.intent;
  document.getElementById("endpoint-method").textContent = ep.method;
  document.getElementById("endpoint-path").textContent = `https://www.kalodata.com${ep.path}`;
  fillTable("request-body", ep.request, "request");
  fillTable("response-body", ep.response, "response");

  const sample = {
    success: true,
    data: [{ note: isZh() ? `示例字段请以${ep.title}返回参数为准` : `Use the response fields of ${ep.title} as the source of truth.` }],
    message: null,
    code: 0,
  };
  document.getElementById("response-json").textContent = JSON.stringify(sample, null, 2);
}

function bindDocNav() {
  const nav = document.getElementById("doc-nav");
  nav.onclick = (event) => {
    const btn = event.target.closest(".doc-link");
    if (!btn) return;
    nav.querySelectorAll(".doc-link").forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");
    renderEndpoint(btn.dataset.endpoint);
  };
}

renderDocNav();
bindDocNav();
renderEndpoint("category-rank");

window.addEventListener("kdc:settingsChanged", () => {
  const active = document.querySelector(".doc-link.active")?.dataset.endpoint || "category-rank";
  renderDocNav();
  bindDocNav();
  document.querySelectorAll(".doc-link").forEach((item) => item.classList.remove("active"));
  document.querySelector(`.doc-link[data-endpoint="${active}"]`)?.classList.add("active");
  renderEndpoint(active);
});
