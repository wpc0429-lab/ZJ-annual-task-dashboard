import XLSX from "xlsx";
import fs from "node:fs/promises";

const SOURCE = "source/人工智能场景计划表-0810.xlsx";
const OUTPUT = "src/ai-plan-data.json";
const CURRENT_DATE = "2026-08-09";
const EXCLUDED_SCENARIOS = new Set(["智能大厅服务"]);

const workbook = XLSX.readFile(SOURCE);
const sheet = workbook.Sheets["应用建设"];

function excelSerialToISO(serial) {
  const date = new Date(Date.UTC(1899, 11, 30) + Number(serial) * 86400000);
  return date.toISOString().slice(0, 10);
}

function normalizeDate(value) {
  if (value === null || value === undefined || value === "" || value === "/") return null;
  if (typeof value === "number") return excelSerialToISO(value);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  const text = String(value).trim();
  if (!text || text === "/") return null;
  if (text.includes("长期")) return "长期";
  const full = text.match(/^(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})/);
  if (full) return `${full[1]}-${String(full[2]).padStart(2, "0")}-${String(full[3]).padStart(2, "0")}`;
  const short = text.match(/^(\d{1,2})月(\d{1,2})日?$/);
  if (short) return `2026-${String(short[1]).padStart(2, "0")}-${String(short[2]).padStart(2, "0")}`;
  return text;
}

function normalizeStatus(value) {
  const text = value === null || value === undefined ? "" : String(value).trim();
  if (text === "已完成" || text === "是") return "done";
  if (text === "部分完成") return "partial";
  if (text === "否") return "todo";
  return "todo";
}

function progressFromStatus(status) {
  if (status === "done") return 100;
  if (status === "partial") return 50;
  return 0;
}

function compareDate(left, right) {
  if (!left) return 1;
  if (!right) return -1;
  if (left === "长期") return 1;
  if (right === "长期") return -1;
  return left.localeCompare(right);
}

function isNearOrOverdue(value) {
  if (!value || value === "长期" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const current = new Date(`${CURRENT_DATE}T00:00:00Z`);
  const due = new Date(`${value}T00:00:00Z`);
  const twoWeeks = new Date(current.getTime() + 14 * 86400000);
  return due <= twoWeeks;
}

function cleanText(value) {
  if (value === null || value === undefined) return "";
  const text = String(value).trim();
  return text === "/" ? "" : text;
}

function normalizeVendor(value) {
  return value === "华云" ? "华云数据" : value;
}

function uniqueText(items) {
  return [...new Set(items.filter(Boolean))].join("、");
}

function compactText(items, fallback) {
  const text = items.filter(Boolean).join("、");
  return text ? `${text.slice(0, 128)}${text.length > 128 ? "……" : ""}` : fallback;
}

const departmentThesis = {
  "综合部": "提升办公材料与舆情处理效率，形成可复制的智能办公能力。",
  "市场部": "强化市场规则、政策和仿真推演能力，提升业务研判效率。",
  "结算部": "围绕核算、披露与结算稽核，构建智能化校验体系。",
  "合规部": "强化异常行为、业务流程与风险监测的智能化能力。",
  "技术部": "夯实平台运维、代码、数据和个人助手的 AI 能力底座。",
  "交易部": "推动交易全流程自动化，提升交易执行与复核效率。",
  "客服中心": "打造智能客服、语音、工单与融媒体服务能力。",
  "研究室": "推进预测、市场推演和云边协同出清等研究场景。",
};

// 场景名称 -> 产品类型映射
const SCENARIO_KIND_MAP = {
  // 拳头产品（绿色）
  "舆情管理智能": "punch",
  "规则一致性校验": "punch",
  "市场模拟与仿真推演场景": "punch",
  "新一代人工智能试点，非化石能源建设": "punch",
  "结算信息披露智能问数": "punch",
  "业务流程智能稽核": "punch",
  "量化交易识别": "punch",
  "PX-Code人工智能个人助手": "punch",
  "交易全流程自动化": "punch",
  "话务工单智能分析": "punch",
  "电量电价智能预测": "punch",
  "大市场与微市场云边协同出清": "punch",
  // 待定（蓝色）
  "省间交易/全国统一电力市场": "pending",
};

function getScenarioKind(scenarioName) {
  return SCENARIO_KIND_MAP[scenarioName] || null;
}

const range = XLSX.utils.sheet_to_json(sheet, { header: 1, range: 2 });
const rows = range;

const groups = new Map();
let currentDepartment = "";
let currentScenario = "";
let currentSequence = "";

rows.forEach((row, index) => {
  const excelRow = index + 3;
  const [sequence, department, scenario, detail, status, demo, due, canDemo, integrated, vendor, businessOwner, techOwner, completeStatus, remark] = row;
  if (cleanText(department)) currentDepartment = cleanText(department);
  if (cleanText(scenario)) currentScenario = cleanText(scenario);
  if (sequence !== null && sequence !== undefined && sequence !== "") currentSequence = String(sequence);
  if (!currentDepartment || !currentScenario) return;
  if (EXCLUDED_SCENARIOS.has(currentScenario)) return;

  const dueDate = normalizeDate(due);
  const item = {
    detail: cleanText(detail) || "场景建设推进",
    status: normalizeStatus(status),
    demo: cleanText(demo),
    due: dueDate,
    canDemo: cleanText(canDemo),
    integrated: cleanText(integrated),
    vendor: normalizeVendor(cleanText(vendor)),
    techOwner: cleanText(techOwner),
    businessOwner: cleanText(businessOwner),
    remark: cleanText(remark),
  };
  const key = `${currentDepartment}::${currentScenario}`;
  if (!groups.has(key)) {
    groups.set(key, {
      department: currentDepartment,
      scenario: currentScenario,
      sequence: currentSequence,
      punch: false,
      yellow: false,
      blue: false,
      items: [],
    });
  }
  const group = groups.get(key);
  group.items.push(item);
});

function buildMilestones(group, due) {
  const raw = group.items.map((item, index) => ({
    label: item.detail || `子任务 ${index + 1}`,
    date: item.due || due || "待定",
    state: item.status === "done" ? "done" : item.status === "partial" ? "current" : "todo",
  }));
  if (raw.length <= 6) return raw.map((item) => [item.label, item.date, item.state]);
  return [...raw.slice(0, 5), raw.at(-1)].map((item) => [item.label, item.date, item.state]);
}

const scenarios = [...groups.values()].map((group, index) => {
  const progress = Math.round(group.items.reduce((sum, item) => sum + progressFromStatus(item.status), 0) / Math.max(group.items.length, 1));
  const dueDates = group.items.map((item) => item.due).filter(Boolean).sort(compareDate);
  const due = dueDates.at(-1) ?? null;
  const firstDue = dueDates[0] ?? null;
  
  // 优先使用映射表的类型
  const mappedKind = getScenarioKind(group.scenario);
  let kind = mappedKind || "normal";
  if (!mappedKind) {
    kind = group.punch ? "punch" : progress < 50 && isNearOrOverdue(firstDue) ? "risk" : "normal";
  }
  
  const businessOwner = uniqueText(group.items.map((item) => item.businessOwner));
  const techOwner = uniqueText(group.items.map((item) => item.techOwner));
  const vendorUnits = uniqueText(group.items.map((item) => item.vendor));
  const remarks = group.items.map((item) => item.remark).filter(Boolean);
  const vendor = vendorUnits.split("、")[0] || "";
  const owner = businessOwner || techOwner || vendor || "待定";
  const incomplete = group.items.find((item) => item.status !== "done");
  const details = group.items.map((item) => item.detail).filter(Boolean);
  const next = incomplete ? `推进"${incomplete.detail}"${incomplete.due ? `，计划节点：${incomplete.due}` : ""}。` : "完成最终验收并准备交付。";
  const risk = kind === "risk" ? `当前完成度 ${progress}%，最近节点为 ${firstDue || "待定"}，建议在本次汇报中确认推进责任与资源安排。` : "";
  
  // 确定 priority 标签：蓝色=待定，黄色=远期产品
  let priority = null;
  if (mappedKind === "pending") priority = "blue";  // 蓝色 - 待定
  else if (mappedKind === "punch") priority = "punch";  // 拳头产品
  else if (group.yellow) priority = "yellow";  // Excel黄色标记
  else if (group.blue) priority = "blue";  // Excel蓝色标记
  else priority = "yellow";  // 其他默认黄色（远期产品）
  
  return {
    id: `ai-${String(index + 1).padStart(2, "0")}`,
    name: group.scenario,
    department: group.department,
    departmentId: `dept-${group.department}`,
    sequence: group.sequence,
    kind,
    priority,
    progress,
    due,
    businessOwner: businessOwner || "待定",
    techOwner: techOwner || "待定",
    vendor: vendor || "待定",
    owner,
    role: `${businessOwner ? `业务负责人 · ${businessOwner}` : ""}${techOwner ? `${businessOwner ? " / " : ""}技术部对接人 · ${techOwner}` : ""}` || "责任人待定",
    description: compactText(details.slice(0, 3), "AI 场景建设与应用推进。"),
    next,
    risk,
    milestones: buildMilestones(group, due),
    remarks,
    items: group.items,
  };
});

const departments = [];
for (const scenario of scenarios) {
  let department = departments.find((item) => item.id === scenario.departmentId);
  if (!department) {
    department = { id: scenario.departmentId, name: scenario.department, thesis: departmentThesis[scenario.department] ?? "围绕人工智能场景建设，持续提升业务效率与交付能力。", scenarios: [] };
    departments.push(department);
  }
  department.scenarios.push(scenario);
}

for (const department of departments) {
  const totalProgress = department.scenarios.reduce((sum, scenario) => sum + scenario.progress, 0);
  department.overall = Math.round(totalProgress / Math.max(department.scenarios.length, 1));
  department.active = department.scenarios.filter((scenario) => scenario.progress < 100).length;
  const nearest = department.scenarios.flatMap((scenario) => scenario.items.map((item) => item.due)).filter(Boolean).sort(compareDate)[0] ?? null;
  department.nearest = nearest;
}

const sortedByDue = scenarios.filter((scenario) => scenario.due && scenario.due !== "长期").sort((left, right) => compareDate(left.due, right.due));
const milestoneCandidates = [
  ["aug", "8月", "8月节点", "首批场景交付"],
  ["sep", "Q3", "7–9月", "三季度集成"],
  ["dec", "Q4", "10–12月", "年度目标收口"],
];
const quarterMilestones = milestoneCandidates.map(([id, label, range, title], index) => {
  const fallback = sortedByDue.at(Math.min(index * 4, Math.max(sortedByDue.length - 1, 0)));
  const target = index === 2 ? sortedByDue.at(-1) : fallback;
  return {
    id,
    label,
    range,
    title,
    date: target?.due ?? "待定",
    taskId: target?.id ?? scenarios[0]?.id,
  };
});
const longTermScenario = scenarios.find((scenario) => scenario.due === "长期");
quarterMilestones.push({ id: "long", label: "持续", range: "长期建设", title: "持续优化", date: "长期", taskId: longTermScenario?.id ?? scenarios[0]?.id });

const output = {
  sourceFile: "人工智能场景计划表-0810.xlsx",
  sourceSheet: "应用建设",
  reportDate: "2026-08-09",
  currentDate: CURRENT_DATE,
  departments,
  scenarios,
  quarterMilestones,
};

await fs.writeFile(OUTPUT, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ output: OUTPUT, departments: departments.length, scenarios: scenarios.length, punch: scenarios.filter((item) => item.kind === "punch").length, risk: scenarios.filter((item) => item.kind === "risk").length }));
