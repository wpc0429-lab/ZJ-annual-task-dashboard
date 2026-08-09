import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CaretDown,
  Check,
  WarningCircle,
  X,
} from "@phosphor-icons/react";
import aiPlan from "./ai-plan-data.json";

const demoDepartments = [
  {
    id: "trade",
    name: "交易业务部",
    thesis: "聚焦交易效率与市场竞争力，构建敏捷交易能力体系。",
    overall: 68,
    active: 14,
    nearest: "2026-08-28",
    scenarios: [
      {
        id: "trade-platform",
        name: "智能交易中台升级",
        kind: "punch",
        progress: 68,
        due: "2026-08-30",
        owner: "李明轩",
        role: "交易业务部 / 产品负责人",
        description: "构建统一交易中台，提升交易处理能力与灵活性，支持多业务快速接入与创新。",
        next: "完成系统联调与性能优化，确保在试点上线前达到性能目标。",
        milestones: [
          ["需求评审完成", "2026-02-28", "done"],
          ["技术方案确定", "2026-04-30", "done"],
          ["核心模块开发完成", "2026-06-30", "done"],
          ["系统联调与性能优化", "2026-08-15", "current"],
          ["试点上线", "2026-09-15", "todo"],
          ["全面上线与验收", "2026-09-30", "todo"],
        ],
      },
      {
        id: "trade-growth",
        name: "用户增长方案落地",
        progress: 75,
        due: "2026-09-30",
        owner: "周予安",
        role: "交易业务部 / 运营负责人",
        description: "围绕重点用户场景优化触达、转化和留存路径，形成可复用的增长机制。",
        next: "完成重点客户试点复盘，沉淀第二阶段推广方案。",
        milestones: [
          ["用户分层完成", "2026-06-15", "done"],
          ["试点方案上线", "2026-07-10", "done"],
          ["重点客户复盘", "2026-08-20", "current"],
          ["规模化推广", "2026-09-30", "todo"],
        ],
      },
      {
        id: "trade-member",
        name: "会员体系 2.0 上线",
        progress: 90,
        due: "2026-10-15",
        owner: "沈知行",
        role: "交易业务部 / 用户运营",
        description: "升级会员权益与服务分层，提升核心用户的活跃度和服务体验。",
        next: "完成最终灰度验证，准备正式发布。",
        milestones: [
          ["权益方案确认", "2026-06-20", "done"],
          ["灰度验证", "2026-08-25", "current"],
          ["正式发布", "2026-10-15", "todo"],
        ],
      },
      {
        id: "trade-risk",
        name: "推荐算法效果提升",
        progress: 45,
        due: "2026-09-15",
        kind: "risk",
        owner: "顾言",
        role: "交易业务部 / 数据产品",
        description: "提升关键业务场景下的推荐命中率，并完善算法效果评估和反馈闭环。",
        next: "补齐样本数据，优先解决高频场景的效果波动。",
        risk: "测试环境资源占用较高，可能影响模型迭代进度。",
        milestones: [
          ["指标口径统一", "2026-05-30", "done"],
          ["样本集构建", "2026-07-15", "current"],
          ["模型效果验证", "2026-08-30", "todo"],
          ["灰度发布", "2026-09-15", "todo"],
        ],
      },
    ],
  },
  {
    id: "digital",
    name: "数字化部",
    thesis: "驱动平台与数据能力全面进化，支撑业务创新。",
    overall: 63,
    active: 9,
    nearest: "2026-07-31",
    scenarios: [
      {
        id: "digital-data",
        name: "企业数据中台建设",
        kind: "punch",
        progress: 63,
        due: "2026-10-31",
        owner: "林知远",
        role: "数字化部 / 数据平台主管",
        description: "统一沉淀核心业务数据资产，提升跨部门数据协同与分析能力。",
        next: "完成数据域验收，推动重点应用接入。",
        milestones: [
          ["数据域盘点", "2026-05-20", "done"],
          ["主数据治理", "2026-07-15", "current"],
          ["重点应用接入", "2026-09-30", "todo"],
          ["平台验收", "2026-10-31", "todo"],
        ],
      },
      {
        id: "digital-finance",
        name: "财务共享平台优化",
        progress: 71,
        due: "2026-08-31",
        owner: "孟婉清",
        role: "数字化部 / 平台负责人",
        description: "优化财务共享平台流程编排与数据视图，降低跨系统处理成本。",
        next: "完成关键流程上线前验收。",
        milestones: [
          ["流程梳理", "2026-04-30", "done"],
          ["方案开发", "2026-06-30", "done"],
          ["上线验收", "2026-08-31", "current"],
        ],
      },
      {
        id: "digital-mobile",
        name: "移动端工作台升级",
        progress: 42,
        due: "2026-09-15",
        kind: "risk",
        owner: "谢昀",
        role: "数字化部 / 体验设计",
        description: "升级移动端工作入口和通知机制，改善高频工作场景的处理体验。",
        next: "收敛跨端适配问题，完成重点用户内测。",
        risk: "跨端适配问题尚未完全收敛，需要追加专项支持。",
        milestones: [
          ["体验方案确认", "2026-05-30", "done"],
          ["核心页面开发", "2026-07-31", "current"],
          ["用户内测", "2026-08-31", "todo"],
          ["正式发布", "2026-09-15", "todo"],
        ],
      },
    ],
  },
  {
    id: "security",
    name: "安全技术部",
    thesis: "夯实安全防线，守护系统稳定与数据安全。",
    overall: 58,
    active: 10,
    nearest: "2026-06-01",
    scenarios: [
      {
        id: "security-zero",
        name: "零信任安全体系建设",
        progress: 47,
        due: "2026-12-15",
        kind: "punch",
        owner: "方知行",
        role: "安全技术部 / 安全架构",
        description: "建立面向关键业务系统的零信任访问与持续验证体系。",
        next: "完成核心系统接入清单和策略灰度。",
        milestones: [
          ["安全架构设计", "2026-05-30", "done"],
          ["核心系统接入", "2026-08-31", "current"],
          ["策略灰度", "2026-10-31", "todo"],
          ["全面验收", "2026-12-15", "todo"],
        ],
      },
      {
        id: "security-ops",
        name: "安全运营平台升级",
        progress: 66,
        due: "2026-08-15",
        owner: "宋之衡",
        role: "安全技术部 / 安全运营",
        description: "完善安全事件发现、研判与处置闭环，提升运营自动化程度。",
        next: "完成新告警规则的联调和回归验证。",
        milestones: [
          ["规则梳理", "2026-05-31", "done"],
          ["引擎升级", "2026-07-30", "current"],
          ["回归验证", "2026-08-15", "todo"],
        ],
      },
      {
        id: "security-data",
        name: "数据安全合规治理",
        progress: 58,
        due: "2026-10-31",
        owner: "吴至诚",
        role: "安全技术部 / 合规治理",
        description: "围绕数据分类分级、流转审计和敏感信息保护完善治理机制。",
        next: "完成重点数据域的分类分级复核。",
        milestones: [
          ["制度梳理", "2026-06-30", "done"],
          ["数据盘点", "2026-08-31", "current"],
          ["治理验收", "2026-10-31", "todo"],
        ],
      },
    ],
  },
  {
    id: "operations",
    name: "运营管理部",
    thesis: "提升运营效率，实现可量化、可增长的管理体系。",
    overall: 69,
    active: 9,
    nearest: "2026-07-31",
    scenarios: [
      {
        id: "ops-metrics",
        name: "运营指标体系重塑",
        progress: 69,
        due: "2026-09-30",
        kind: "punch",
        owner: "赵一鸣",
        role: "运营管理部 / 运营负责人",
        description: "重塑面向经营决策的指标体系，让重点任务的进展、风险和产出可量化。",
        next: "完成指标口径评审，接入月度经营例会。",
        milestones: [
          ["指标盘点", "2026-05-31", "done"],
          ["口径评审", "2026-08-20", "current"],
          ["经营例会接入", "2026-09-30", "todo"],
        ],
      },
      {
        id: "ops-process",
        name: "流程自动化平台建设",
        progress: 74,
        due: "2026-08-31",
        owner: "周谨言",
        role: "运营管理部 / 流程管理",
        description: "将高频运营流程线上化、标准化，降低协同成本。",
        next: "完成第二批流程的上线验收。",
        milestones: [
          ["流程筛选", "2026-04-30", "done"],
          ["第一批上线", "2026-06-30", "done"],
          ["第二批验收", "2026-08-31", "current"],
        ],
      },
      {
        id: "ops-supplier",
        name: "供应商协同管理优化",
        progress: 33,
        due: "2026-11-30",
        kind: "risk",
        owner: "杜若川",
        role: "运营管理部 / 供应链管理",
        description: "优化供应商协同、评价和交付跟踪机制，减少关键节点信息滞后。",
        next: "先完成重点供应商清单和协同规则确认。",
        risk: "跨团队协同节奏偏慢，需要业务负责人明确投入。",
        milestones: [
          ["问题盘点", "2026-06-30", "done"],
          ["规则确认", "2026-08-31", "current"],
          ["试点验证", "2026-10-15", "todo"],
          ["全面推广", "2026-11-30", "todo"],
        ],
      },
    ],
  },
];

const demoQuarterMilestones = [
  { id: "q2", label: "Q2", range: "4–6月", title: "关键场景交付", date: "2026-06-30", taskId: "digital-finance" },
  { id: "q3", label: "Q3", range: "7–9月", title: "中期成果验收", date: "2026-09-30", taskId: "trade-platform" },
  { id: "q4", label: "Q4", range: "10–12月", title: "年度目标达成", date: "2026-12-31", taskId: "ops-metrics" },
  { id: "next", label: "下阶段", range: "2027", title: "年度复盘", date: "2027-01-15", taskId: "ops-metrics" },
];

const demoAllScenarios = demoDepartments.flatMap((department) =>
  department.scenarios.map((scenario) => ({ ...scenario, departmentName: department.name, departmentId: department.id })),
);

const sourceDepartments = aiPlan.departments;
const sourceScenarios = aiPlan.scenarios;
const sourceQuarterMilestones = aiPlan.quarterMilestones;

function dateForYear(value, year) {
  if (!value) return "待定";
  if (value === "长期") return value;
  return value.replace(/^\d{4}/, year);
}

function kindLabel(kind) {
  if (kind === "punch") return "年度拳头产品";
  if (kind === "risk") return "需要关注";
  return "正常推进";
}

function isScenarioDemoable(scenario) {
  return (scenario.items || []).some(item => item.canDemo === '是');
}

function ProgressLine({ value, kind = "normal" }) {
  return (
    <span className={`progress-line progress-line-${kind}`} aria-label={`进度 ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </span>
  );
}

function ScenarioRow({ scenario, year, selected, onSelect }) {
  const kind = scenario.kind ?? "normal";
  const priority = scenario.priority;
  // 优先级顺序：punch > pending > yellow > selected
  let rowClass = "";
  if (priority === "punch") rowClass = "is-punch";
  else if (priority === "blue" || priority === "pending") rowClass = "is-pending";
  else if (priority === "yellow") rowClass = "is-yellow";
  else if (selected) rowClass = "is-selected";
  
  return (
    <button id={`scenario-${scenario.id}`} className={`scenario-row ${rowClass}`} onClick={() => onSelect(scenario.id)} type="button">
      <span className={`scenario-rail scenario-rail-${kind}`} aria-hidden="true" />
      <span className="scenario-main">
        <span className="scenario-name">{scenario.name}</span>
        <span className={`scenario-date ${kind === "risk" ? "is-risk" : ""}`}>{dateForYear(scenario.due, year)}</span>
      </span>
      <span className="scenario-progress">
        <ProgressLine value={scenario.progress} kind={kind} />
        <span className="scenario-progress-value">{scenario.progress}%</span>
      </span>
      <ArrowUpRight className="scenario-arrow" size={14} weight="regular" aria-hidden="true" />
    </button>
  );
}

function DepartmentSection({ department, year, selectedId, onSelect }) {
  return (
    <section className="department-section" aria-labelledby={`${department.id}-heading`}>
      <div className="department-header">
        <div className="department-intro">
          <h2 id={`${department.id}-heading`}>{department.name}</h2>
          <p>{department.thesis}</p>
        </div>
        <div className="department-metric department-overall">
          <strong>{department.overall}<small>%</small></strong>
          <span>整体进度</span>
        </div>
        <div className="department-metric">
          <strong>{department.active}<small>个</small></strong>
          <span>进行中场景</span>
        </div>
        <div className="department-metric department-nearest">
          <strong>{dateForYear(department.nearest, year)}</strong>
          <span>最近完成时间</span>
        </div>
        <CaretDown size={18} weight="regular" className="department-caret" aria-hidden="true" />
      </div>
      <div className="scenario-list">
        {department.scenarios.map((scenario) => (
          <ScenarioRow key={scenario.id} scenario={scenario} year={year} selected={selectedId === scenario.id} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function Milestone({ milestone, year }) {
  const [label, date, state] = milestone;
  return (
    <li className={`milestone milestone-${state}`}>
      <span className="milestone-marker" aria-hidden="true">
        {state === "done" ? <Check size={12} weight="bold" /> : state === "current" ? <span /> : null}
      </span>
      <span className="milestone-label">{label}</span>
      <time>{dateForYear(date, year)}</time>
    </li>
  );
}

function DetailDrawer({ scenario, year, onClose }) {
  if (!scenario) return null;
  const kind = scenario.kind ?? "normal";
  const businessOwner = scenario.businessOwner || scenario.owner || "待定";
  const techOwner = scenario.techOwner || "待定";
  const vendor = scenario.vendor || "待定";
  return (
    <aside className="detail-drawer" aria-label="场景详情">
      <div className="drawer-topline">
        <span className={`drawer-kicker drawer-kicker-${kind}`}>
          {kind === "punch" ? "年度拳头产品" : kindLabel(kind)}
        </span>
        <button className="icon-button drawer-close" onClick={onClose} type="button" aria-label="关闭详情">
          <X size={21} weight="regular" />
        </button>
      </div>
      <div className="drawer-heading">
        <h2>{scenario.name}</h2>
        <p>{scenario.description}</p>
      </div>
      <div className="drawer-meta-grid">
        <div>
          <span>责任部门</span>
          <strong>{scenario.departmentName ?? scenario.department}</strong>
        </div>
        <div>
          <span>预计完成时间</span>
          <strong className={kind === "risk" ? "text-risk" : ""}>{dateForYear(scenario.due, year)}</strong>
        </div>
      </div>
      <div className="drawer-progress-block">
        <div className="drawer-progress-label">
          <span>当前进度</span>
          <strong>{scenario.progress}%</strong>
        </div>
        <ProgressLine value={scenario.progress} kind={kind} />
      </div>
      <div className="drawer-section">
        <div className="drawer-section-title">里程碑计划</div>
        <ol className="milestone-list">
          {scenario.milestones.map((milestone) => <Milestone key={`${scenario.id}-${milestone[0]}`} milestone={milestone} year={year} />)}
        </ol>
      </div>
      <div className="drawer-section drawer-responsibility">
        <div className="drawer-section-title">责任分工</div>
        <div className="responsibility-grid">
          <div className="responsibility-item">
            <span>需求方 / 业务负责人</span>
            <strong><i className="responsibility-avatar">{businessOwner.slice(0, 1)}</i>{businessOwner}</strong>
          </div>
          <div className="responsibility-item">
            <span>技术部对接人</span>
            <strong><i className="responsibility-avatar responsibility-avatar-tech">{techOwner.slice(0, 1)}</i>{techOwner}</strong>
          </div>
          <div className="responsibility-item responsibility-item-wide">
            <span>研发单位</span>
            <strong>{vendor}</strong>
          </div>
        </div>
      </div>
      {isScenarioDemoable(scenario) ? (
        <div className="drawer-section drawer-demo">
          <div className="drawer-section-title">
            <span className="demo-badge">2026-08-20演示场景</span>
          </div>
          <ul className="demo-item-list">
            {(scenario.items || []).filter((item) => item.canDemo === '是').map((item, idx) => (
              <li key={idx} className={`demo-item demo-item-${item.status}`}>
                <span className="demo-item-marker" aria-hidden="true" />
                <span className="demo-item-detail">{item.detail}</span>
                <span className="demo-item-meta">
                  {item.status === 'done' ? '已完成' : item.status === 'partial' ? '部分完成' : '未完成'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <div className="drawer-section next-action">
        <div className="drawer-section-title">下一步行动</div>
        <p>{scenario.next}</p>
      </div>
      {scenario.risk ? (
        <div className="risk-note">
          <WarningCircle size={18} weight="regular" />
          <div>
            <strong>风险提示</strong>
            <p>{scenario.risk}</p>
          </div>
        </div>
      ) : null}
      {scenario.remarks && scenario.remarks.length > 0 ? (
        <div className="drawer-section drawer-remarks">
          <div className="drawer-section-title">备注</div>
          <ul className="remarks-list">
            {scenario.remarks.map((remark, idx) => <li key={idx}>{remark}</li>)}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}

function App() {
  const [year, setYear] = useState("2026");
  const [departmentId, setDepartmentId] = useState("all");
  const [demoFilter, setDemoFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(sourceScenarios[0]?.id ?? null);

  const visibleDepartments = useMemo(() => {
    let depts = departmentId === "all" ? sourceDepartments : sourceDepartments.filter((department) => department.id === departmentId);
    if (demoFilter === "820") {
      depts = depts
        .map((department) => ({ ...department, scenarios: department.scenarios.filter((scenario) => isScenarioDemoable(scenario)) }))
        .filter((department) => department.scenarios.length > 0);
    }
    return depts;
  }, [departmentId, demoFilter]);
  const selectedScenario = sourceScenarios.find((scenario) => scenario.id === selectedId) ?? null;
  const overall = Math.round(sourceScenarios.reduce((sum, scenario) => sum + scenario.progress, 0) / Math.max(sourceScenarios.length, 1));
  const totalScenarios = sourceScenarios.length;
  const punchCount = sourceScenarios.filter((scenario) => scenario.kind === "punch").length;

  function selectScenario(id) {
    setSelectedId(id);
  }

  function handleDepartmentChange(event) {
    const nextDepartment = event.target.value;
    setDepartmentId(nextDepartment);
    if (nextDepartment !== "all") {
      const firstScenario = sourceDepartments.find((department) => department.id === nextDepartment)?.scenarios[0];
      if (firstScenario) setSelectedId(firstScenario.id);
    }
  }

  function handleDemoFilterChange(event) {
    const nextFilter = event.target.value;
    setDemoFilter(nextFilter);
    if (nextFilter === "820") {
      const firstDemoable = sourceScenarios.find((scenario) => isScenarioDemoable(scenario));
      if (firstDemoable) setSelectedId(firstDemoable.id);
    }
  }

  function jumpToScenario(id) {
    setSelectedId(id);
    document.getElementById(`scenario-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <div className={`app-shell ${selectedScenario ? "drawer-is-open" : "drawer-is-closed"}`}>
      <main className="page-main">
        <header className="topbar">
          <div className="brand-lockup">
            <div>
              <div className="eyebrow">浙江电力交易中心 · AI 场景建设</div>
              <h1>人工智能应用场景管理驾驶舱</h1>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="select-control">
              <span>年度</span>
              <select value={year} onChange={(event) => setYear(event.target.value)} aria-label="选择年度">
                <option value="2026">2026年</option>
              </select>
              <CaretDown size={14} weight="regular" aria-hidden="true" />
            </label>
            <label className="select-control department-select">
              <span>部门</span>
              <select value={departmentId} onChange={handleDepartmentChange} aria-label="按部门筛选">
                <option value="all">全部部门</option>
                {sourceDepartments.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
              </select>
              <CaretDown size={14} weight="regular" aria-hidden="true" />
            </label>
            <label className="select-control demo-select">
              <span>演示筛选</span>
              <select value={demoFilter} onChange={handleDemoFilterChange} aria-label="820演示筛选">
                <option value="all">全部场景</option>
                <option value="820">820演示场景</option>
              </select>
              <CaretDown size={14} weight="regular" aria-hidden="true" />
            </label>
            <div className="data-source">最后更新：2026-08-09</div>
          </div>
        </header>

        <section className="summary-strip" aria-label="年度摘要">
          <div className="summary-hero">
            <span>整体进度</span>
            <strong>{overall}<small>%</small></strong>
            <ProgressLine value={overall} />
          </div>
          <div className="summary-item">
            <strong>{totalScenarios}<small>个</small></strong>
            <span>重点场景</span>
          </div>
          <div className="summary-item">
            <strong>{sourceScenarios.filter((scenario) => scenario.progress >= 60).length}<small>个</small></strong>
            <span>按期推进中</span>
          </div>
          <div className="summary-item summary-item-punch">
            <strong>{punchCount}<small>个</small></strong>
            <span>年度拳头产品</span>
          </div>
          <div className="summary-item summary-item-risk">
            <strong>{sourceScenarios.filter((scenario) => scenario.kind === "risk").length}<small>个</small></strong>
            <span>需要关注</span>
          </div>
        </section>


        <div className="department-list">
          {visibleDepartments.map((department) => (
            <div key={department.id} id={`department-${department.id}`}>
              <DepartmentSection department={department} year={year} selectedId={selectedId} onSelect={selectScenario} />
            </div>
          ))}
        </div>

        <section className="milestone-ribbon" aria-label="年度交付里程碑">
          <div className="ribbon-label">
            <span>年度交付里程碑</span>
            <small>点击节点查看场景</small>
          </div>
          <div className="ribbon-track">
            {sourceQuarterMilestones.map((milestone, index) => (
              <button className={`ribbon-node ${index === 1 ? "is-current" : ""}`} key={milestone.id} onClick={() => jumpToScenario(milestone.taskId)} type="button">
                <span className="ribbon-node-line" aria-hidden="true" />
                <span className="ribbon-node-label">{milestone.label} <small>{milestone.range}</small></span>
                <strong>{milestone.title}</strong>
                <time>{dateForYear(milestone.date, year)}</time>
              </button>
            ))}
          </div>
        </section>

        <footer className="page-footer">
          <div className="legend" aria-label="图例">
            <span><i className="legend-mark legend-mark-punch" />拳头产品</span>
            <span><i className="legend-mark legend-mark-yellow" />远期产品</span>
            <span><i className="legend-mark legend-mark-pending" />待定</span>
            <span><i className="legend-mark legend-mark-risk" />需要关注</span>
          </div>
          <span>数据源：人工智能场景计划表-0809.xlsx · 进度按完成状态折算</span>
        </footer>
      </main>
      {selectedScenario ? <DetailDrawer scenario={selectedScenario} year={year} onClose={() => setSelectedId(null)} /> : null}
    </div>
  );
}

export { App };
