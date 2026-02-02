// Finding Details Data - Deep Dive Analysis for each finding
const findingDetails = {
    // ARDC Findings (Slides 2-17)
    2: {
        title: "Demand Planning",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Planning production by <strong>liters of milk</strong> rather than milk components (fat, protein, lactose) fundamentally misaligns with how dairy manufacturing actually works. In dairy, what you sell is fat and protein — milk is merely the carrier.</p>
            <p>This architectural decision cascades into every downstream process: incorrect BOMs, meaningless MRP, impossible true product costing, and untrackable yields.</p>
        `,
        evidence: [
            "All demand forecasting performed in Excel spreadsheets by individuals",
            "No statistical forecasting tools configured in SAP",
            "No MAPE/Bias tracking for forecast accuracy",
            "Seasonal patterns (Ramadan +60%) rely on personal experience",
            "Fat allocation decisions made entirely outside SAP"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>This SAP-certified solution is purpose-built for dairy operations and directly addresses component-based planning. It manages milk ingredients (fat, protein, lactose) along the entire supply chain, enabling you to <strong>balance planned and used milk components</strong> in real-time. The application provides cross-plant raw materials delivery planning, component balancing, and surplus planning — eliminating the need for Excel-based manual forecasting. Native S/4HANA integration ensures seamless demand planning with full visibility.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without component-based planning, Al Rawabi cannot optimize its most valuable asset — milk fat. A 0.1% improvement in fat utilization across 500,000 liters/day could yield AED 2-3M annually. The current Excel-based approach also creates single points of failure when key personnel are unavailable.</p>
        `,
        metrics: [
            { value: "0%", label: "SAP Utilization" },
            { value: "100%", label: "Excel Dependency" },
            { value: "High", label: "Key Person Risk" },
            { value: "Unknown", label: "Forecast Accuracy" }
        ]
    },
    3: {
        title: "Recipe Management",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Bills of Material list <strong>'Milk' as a flat ingredient</strong> with fixed quantity instead of decomposing into fat grams, protein grams, and lactose. This makes true product costing impossible — a high-fat yogurt and a low-fat milk use the same 'Milk' input in SAP.</p>
            <p>Shop-floor recipe adjustments happen constantly but are never reflected in SAP, creating permanent disconnection between actual and system costs.</p>
        `,
        evidence: [
            "BOMs do not decompose milk into fat, protein, lactose components",
            "Frequent recipe changes on floor not updated in SAP",
            "Co-products (cream, skim) not configured for value allocation",
            "Cost impact discovered only at month-end variance analysis",
            "Actual vs standard cost variance consistently unexplainable"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>This SAP-certified solution provides <strong>component-based recipe management</strong> where BOMs are structured around milk components (fat, protein, lactose) rather than raw milk volume. The solution handles <strong>co-product generation and valuation</strong> automatically — when you separate cream from skim, both outputs are tracked with their component values. Real-time recipe adjustments on the shop floor are captured and reflected in actual costing, eliminating the disconnect between production reality and SAP records.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without accurate BOMs, product profitability analysis is meaningless. Premium products may actually be loss-makers while commodity items subsidize them invisibly. Recipe drift without documentation also poses food safety compliance risks during audits.</p>
        `,
        metrics: [
            { value: "0", label: "Component BOMs" },
            { value: "120+", label: "SKUs Affected" },
            { value: "Monthly", label: "Cost Visibility" },
            { value: "None", label: "Co-product Tracking" }
        ]
    },
    4: {
        title: "MRP & Milk Balancing",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>The daily fat balance — tracking incoming milk fat content, calculating cream separation requirements, and allocating fat across products — is the <strong>most critical planning activity</strong> in any dairy. At Al Rawabi, this happens entirely in Excel by a dedicated person.</p>
            <p>SAP's MRP runs but produces meaningless results because it doesn't understand component variability.</p>
        `,
        evidence: [
            "Dedicated person manages daily fat balance in Excel",
            "Raw milk fat content varies 3.0% to 4.5% daily",
            "Protein varies 2.8% to 3.6% - not captured in SAP",
            "After separation, SAP still shows 'Raw Milk' not components",
            "MRP recommendations ignored because they're based on wrong data"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>This solution's core capability is <strong>milk component balancing</strong> — it manages fat, protein, and lactose across the entire supply chain. The system provides <strong>cross-plant raw materials delivery planning</strong> and calculates surplus/deficit of components in real-time. When milk arrives with varying fat content, the solution automatically rebalances production plans based on actual component availability. Integration with lab systems (LIMS) ensures batch characteristics are updated automatically at goods receipt.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Fat is worth 3-4x the value of skim milk per liter. Daily fat balancing errors compound to significant value leakage. The Excel-based approach also prevents scenario planning — "what if we receive lower fat milk tomorrow?" cannot be simulated.</p>
        `,
        metrics: [
            { value: "1", label: "Person Dependency" },
            { value: "Daily", label: "Manual Effort" },
            { value: "1.5%", label: "Fat Variability" },
            { value: "0%", label: "SAP Planning" }
        ]
    },
    5: {
        title: "Scheduling & Capacity",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>The production manager spends <strong>half of every day</strong> manually converting planned orders to production orders ONE BY ONE. Meanwhile, SAP assumes infinite capacity — generating impossible schedules that are immediately discarded.</p>
            <p>With 120 SKUs produced daily (all fresh, same-day production), this complexity desperately needs system optimization.</p>
        `,
        evidence: [
            "Planned orders converted to production orders manually, one by one",
            "Production manager spends 50% of time on scheduling",
            "Capacity planning explicitly confirmed as 'not there'",
            "MRP generates infinite-capacity planned orders",
            "120 SKUs daily, all fresh products requiring same-day production"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>Built natively on S/4HANA, this solution leverages <strong>embedded PP/DS capabilities</strong> for finite capacity planning and sequence optimization. The dairy-specific scheduling considers milk component availability, CIP (cleaning-in-place) requirements, and allergen sequencing. Production orders can be generated and sequenced based on component balancing results, eliminating the manual one-by-one conversion. The system's <strong>integrated planning</strong> ensures that what gets scheduled is actually producible with available milk components.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> A production manager's time is worth more than manual data entry. More critically, without capacity planning, the plant cannot reliably promise delivery dates or optimize changeover sequences. Fresh dairy's short shelf life makes scheduling errors directly translate to waste.</p>
        `,
        metrics: [
            { value: "50%", label: "Manager Time Lost" },
            { value: "120", label: "Daily SKUs" },
            { value: "0", label: "Capacity Planning" },
            { value: "Manual", label: "Sequencing" }
        ]
    },
    6: {
        title: "Module Architecture",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>The current SAP configuration cannot support <strong>variable-yield processes, co-products, or batch genealogy</strong> — fundamental requirements in dairy manufacturing. This is not a usage problem; it's a configuration problem.</p>
            <p>Critical food safety parameters exist only on paper or in PLC historians, creating compliance risk.</p>
        `,
        evidence: [
            "Variable yields not supported in current configuration",
            "Co-product output and value allocation not configured",
            "Batch genealogy incomplete for traceability",
            "Pasteurization parameters (72°C/15s) not in SAP",
            "Fermentation curves exist only on paper charts",
            "Daily mass balance done in Excel, not SAP"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>This solution is architected specifically for dairy's unique requirements: <strong>variable yields, co-product generation, and mass balancing</strong>. It tracks yield, gain, and loss at every production step with full batch genealogy. The <strong>mass balance functionality</strong> reconciles components throughout processing — from raw milk receipt through separation, standardization, and finished product. Critical control points (pasteurization, fermentation) can be integrated via shop-floor connectivity, maintaining electronic records for regulatory compliance.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Regulatory bodies increasingly require electronic records of food safety parameters (21 CFR Part 11, FSMA). Paper-based records create audit vulnerabilities and make root cause analysis during quality incidents extremely difficult and slow.</p>
        `,
        metrics: [
            { value: "Paper", label: "Safety Records" },
            { value: "0%", label: "Auto-Capture" },
            { value: "Excel", label: "Mass Balance" },
            { value: "Risk", label: "Compliance" }
        ]
    },
    7: {
        title: "Milk Reception",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Lab tests measure fat%, protein%, SNF, acidity, and temperature — but results are <strong>recorded on paper only</strong>. SAP receives 'X liters of Raw Milk' without any component data, immediately breaking the chain of component-based operations.</p>
            <p>A documented instance showed 22 days of production without SAP goods receipts.</p>
        `,
        evidence: [
            "Lab test results recorded on paper only",
            "SAP GR contains only volume, no quality data",
            "Weighbridge operates independently with manual recording",
            "22 consecutive days of production without SAP GR documented",
            "Physical production continues when SAP is blocked"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>The solution begins at <strong>milk reception</strong> — capturing component percentages (fat, protein, SNF) directly into batch characteristics at goods receipt. Integration with weighbridge and LIMS ensures automatic data capture without manual transcription. The <strong>component-based inventory</strong> starts here: SAP immediately knows not just liters received, but kilograms of fat, protein, and lactose. This forms the foundation for all downstream component balancing, yield tracking, and accurate costing.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Milk reception is the control point where you either capture component data or lose it forever. Once milk enters the silo without component tracking, all downstream costing and yield analysis becomes estimation. The 22-day GR gap indicates systemic process breakdown.</p>
        `,
        metrics: [
            { value: "Paper", label: "Test Results" },
            { value: "22 days", label: "GR Gap Found" },
            { value: "0%", label: "LIMS Integration" },
            { value: "None", label: "Quality Data in SAP" }
        ]
    },
    8: {
        title: "Quality Management",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p><strong>'SAP QM is not active'</strong> — explicitly confirmed during workshops. All quality testing is recorded on paper and filed by date. Products are released to unrestricted stock and shipped BEFORE final test results, with management accepting this risk.</p>
        `,
        evidence: [
            "SAP QM module not activated",
            "All quality testing on paper, filed by date",
            "Products released before final test results",
            "Direct quote: 'We sleep with that risk'",
            "No systematic quality hold/release workflow"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>The solution integrates with <strong>SAP QM for dairy-specific quality workflows</strong>. Inspection types are configured for milk reception, in-process checks (pasteurization verification, pH levels), and finished goods release. The component tracking inherent in the solution means quality parameters are linked to specific milk batches with their fat/protein content. Quality holds prevent shipment until release criteria are met, eliminating the "ship before test" risk while maintaining the rapid turnaround fresh dairy requires.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Shipping product before test completion is a significant liability exposure. One contamination incident reaching consumers could result in recalls costing millions plus brand damage. Food safety regulations are tightening globally — this approach is unsustainable.</p>
        `,
        metrics: [
            { value: "Inactive", label: "SAP QM" },
            { value: "Paper", label: "All Records" },
            { value: "Before", label: "Ship vs Test" },
            { value: "High", label: "Liability Risk" }
        ]
    },
    9: {
        title: "Traceability",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Food safety regulations require tracing finished product back to raw materials <strong>within 4 hours</strong>. Current systems cannot do this — the only complete traceability exists in paper files that require physical retrieval and manual cross-referencing.</p>
        `,
        evidence: [
            "4-hour traceability requirement cannot be met",
            "Supplier batch numbers often missing at goods receipt",
            "Production orders don't link to input batches",
            "Complete traceability exists only in paper files",
            "Fat from different suppliers cannot be traced to products"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>The solution provides <strong>end-to-end batch genealogy</strong> from raw milk supplier through to finished product. When milk from multiple suppliers is blended in silos, the system tracks proportional contribution of each batch. Component-level traceability means you can trace not just which milk went into a product, but which fat and protein. The <strong>mass balancing capability</strong> ensures traceability is maintained even through separation, standardization, and blending operations — enabling 4-hour regulatory compliance for recall scenarios.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> In a recall scenario, inability to quickly identify affected batches forces broader recalls, multiplying costs and consumer impact. UAE and export market regulations increasingly mandate electronic traceability. This is both a compliance issue and a competitive disadvantage.</p>
        `,
        metrics: [
            { value: "4 hrs", label: "Requirement" },
            { value: "Days", label: "Current Reality" },
            { value: "Paper", label: "Trace Method" },
            { value: "Broken", label: "Batch Chain" }
        ]
    },
    10: {
        title: "Cost & Inventory",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Production cost visibility is <strong>monthly, not daily</strong>. Since milk isn't tracked by components, products are costed using 'average milk cost' regardless of actual fat/protein content. The value of 'missing fat' — potentially the largest cost leakage — is buried in general variance.</p>
        `,
        evidence: [
            "Cost visibility only at month-end",
            "All products use same 'average milk cost'",
            "Component costs not allocated to products",
            "Massive unexplained variances at month-end",
            "Fat losses not quantified or valued separately"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>The solution enables <strong>activity-based costing</strong> specifically designed for dairy operations. Costs are allocated based on actual component consumption — a high-fat cream cheese is costed differently than a low-fat yogurt based on actual fat used, not average milk cost. The <strong>yield, gain, and loss management</strong> quantifies fat losses at each process step, making the "missing fat" visible and valued. Real-time cost visibility replaces month-end surprises with daily actionable intelligence.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without component-level costing, pricing decisions are made blind. Premium products with high fat content may be underpriced while low-fat products are overpriced. This distorts margins and potentially subsidizes competitors who buy Al Rawabi products for reprocessing.</p>
        `,
        metrics: [
            { value: "Monthly", label: "Cost Visibility" },
            { value: "Average", label: "Costing Method" },
            { value: "Unknown", label: "Fat Value Loss" },
            { value: "Large", label: "Month-end Variance" }
        ]
    },
    11: {
        title: "Van Sales Operations",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>SAP has <strong>no visibility of individual van inventory</strong>. All 300+ routes are invisible to SAP — only DC-level stock is known. The Ransale back-office system is the operational brain while SAP is peripheral, receiving end-of-day uploads.</p>
        `,
        evidence: [
            "300+ van routes invisible to SAP",
            "Only DC-level inventory known in SAP",
            "Devices operate offline all day",
            "Morning/evening sync only - no real-time data",
            "Ransale manages pricing, promotions, credit, returns"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Implement SAP Sales & Distribution with mobile integration for real-time van inventory visibility. Use handling units or consignment stock to track van-level inventory. Configure real-time integration or at minimum hourly syncs for operational visibility.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without real-time visibility, inventory optimization is impossible. Over-stocking leads to returns and waste; under-stocking leads to lost sales. The 'black box' between morning loading and evening return prevents dynamic route optimization and promotional response tracking.</p>
        `,
        metrics: [
            { value: "300+", label: "Invisible Routes" },
            { value: "2x", label: "Daily Syncs" },
            { value: "0%", label: "Real-time Data" },
            { value: "Ransale", label: "Primary System" }
        ]
    },
    12: {
        title: "E-Commerce & Channels",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>60-70% of sales are 'pull' orders collected via phone, email, WhatsApp — <strong>none systematically recorded</strong> in SAP. The order-to-delivery cycle happens outside SAP, with SAP only receiving post-facto transaction summaries.</p>
        `,
        evidence: [
            "60-70% of orders via informal channels (phone, WhatsApp)",
            "No systematic order recording in SAP",
            "Van sales uses direct billing without delivery notes",
            "Custom movement types instead of standard delivery process",
            "True order fulfillment exists only for e-commerce"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Implement omnichannel order management with integration to all order sources. Use SAP SD with delivery-based billing. Configure ATP (Available-to-Promise) for accurate delivery commitments. Track customer orders from capture through delivery.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Orders that aren't captured can't be analyzed. Customer buying patterns, product affinity, and service levels remain invisible. This prevents customer segmentation, targeted promotions, and demand sensing. Competitors with better data will outmaneuver on customer experience.</p>
        `,
        metrics: [
            { value: "60-70%", label: "Informal Orders" },
            { value: "0%", label: "Order Capture" },
            { value: "None", label: "ATP Check" },
            { value: "Post-facto", label: "SAP Recording" }
        ]
    },
    13: {
        title: "Revenue & Profitability",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>All pricing logic resides in Ransale back-office, not SAP. Promotion effectiveness is tracked only in Ransale. SAP has <strong>no visibility of promotion performance</strong> or customer-level profitability.</p>
        `,
        evidence: [
            "All pricing logic in Ransale, not SAP",
            "Dual maintenance of pricing creates sync issues",
            "Promotion effectiveness tracked outside SAP",
            "Promotion budgets not controlled through SAP",
            "Customer profitability analysis not possible in SAP"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Centralize pricing in SAP SD with condition records. Use SAP Trade Promotion Management or integrate third-party TPM. Implement CO-PA (Profitability Analysis) for customer/product/channel profitability. Control promotion budgets through SAP funds management.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Promotions without ROI tracking are pure cost. Without SAP-based analysis, you cannot determine which promotions drive profitable volume vs. which merely shift timing. Customer profitability blindness means treating high-value and low-value customers identically.</p>
        `,
        metrics: [
            { value: "Ransale", label: "Pricing System" },
            { value: "None", label: "SAP Promo Tracking" },
            { value: "0%", label: "Customer P&L" },
            { value: "Dual", label: "Maintenance" }
        ]
    },
    14: {
        title: "Group & Consolidation",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Intercompany transactions between the four entities are not fully automated in SAP. Consolidation for group reporting requires significant manual effort. <strong>No real-time group-level visibility</strong> of inventory, sales, or profitability.</p>
        `,
        evidence: [
            "IC transactions require manual reconciliation",
            "Group consolidation heavily manual",
            "No real-time group inventory visibility",
            "Entity-level reporting only, not consolidated",
            "Month-end close extended due to IC reconciliation"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Configure automatic IC posting with SAP's intercompany billing and automatic clearing. Implement Group Reporting or integrate with consolidation tool. Use real-time operational reporting across entities with SAP Analytics Cloud.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without group-level visibility, management decisions are made on partial information. Inventory could be sitting at one entity while another faces stockout. Transfer pricing inefficiencies may go undetected until tax audit.</p>
        `,
        metrics: [
            { value: "4", label: "Entities" },
            { value: "Manual", label: "IC Reconciliation" },
            { value: "None", label: "Group Visibility" },
            { value: "Extended", label: "Close Cycle" }
        ]
    },
    15: {
        title: "Intercompany & Tax",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>With UAE corporate tax now effective, <strong>transfer pricing documentation</strong> is no longer optional. Current IC transactions lack the systematic documentation and arm's-length pricing validation that tax authorities will require.</p>
        `,
        evidence: [
            "Transfer pricing policies not formally documented",
            "IC pricing may not meet arm's-length standard",
            "UAE corporate tax creates new compliance requirements",
            "No systematic transfer pricing in SAP",
            "Tax audit readiness uncertain"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Configure transfer pricing in SAP with documented policies. Maintain IC master agreements in document management. Use SAP Tax Compliance reporting. Implement intercompany profit elimination for consolidated reporting.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Transfer pricing penalties can be severe — up to 200% of tax underpayment plus interest. The UAE Federal Tax Authority is building enforcement capability. Proactive documentation is far cheaper than reactive audit defense.</p>
        `,
        metrics: [
            { value: "New", label: "UAE Corporate Tax" },
            { value: "None", label: "TP Documentation" },
            { value: "Risk", label: "Audit Exposure" },
            { value: "Manual", label: "IC Processing" }
        ]
    },
    16: {
        title: "Procurement & MRP",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>MRP generates procurement proposals that are frequently overridden manually. Supplier lead times and MOQs in SAP don't reflect reality. <strong>Buyer expertise substitutes for system intelligence.</strong></p>
        `,
        evidence: [
            "MRP recommendations frequently overridden",
            "Lead times in SAP don't match actual",
            "MOQs and rounding values not maintained",
            "Buyers use experience rather than SAP suggestions",
            "No supplier performance tracking in SAP"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>The solution transforms MRP from volume-based to <strong>component-based planning</strong>. Rather than ordering "milk," the system plans for fat, protein, and lactose requirements based on production demand. The <strong>cross-plant raw materials delivery planning</strong> capability optimizes milk procurement across the supply network, considering component content variations from different suppliers. This eliminates buyer overrides because system recommendations are based on actual component needs rather than crude volume estimates.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> When buyers routinely override system recommendations, institutional knowledge stays in their heads, not the system. This creates risk when staff change and prevents analytical procurement optimization. Over-ordering ties up working capital; under-ordering risks production stops.</p>
        `,
        metrics: [
            { value: "High", label: "Override Rate" },
            { value: "Inaccurate", label: "Master Data" },
            { value: "None", label: "Supplier KPIs" },
            { value: "Manual", label: "Decision Making" }
        ]
    },
    17: {
        title: "Inventory & Warehouse",
        entity: "Al Rawabi Dairy Company",
        coreArgument: `
            <p>Physical inventory counts don't match SAP — adjustments are made periodically to 'true up' the system. No bin-level management for finished goods. <strong>FEFO (First Expired First Out) not enforced</strong> systematically for short shelf-life dairy.</p>
        `,
        evidence: [
            "Periodic adjustments to match physical counts",
            "No bin-level warehouse management",
            "FEFO not systematically enforced",
            "Shelf-life tracking incomplete",
            "Returns processing not integrated with inventory"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Dairy Management by msg for SAP S/4HANA</strong></p>
            <p>Built on S/4HANA's <strong>Embedded EWM</strong>, the solution provides full warehouse management with shelf-life tracking critical for fresh dairy. FEFO (First Expired First Out) is enforced through batch characteristics that include production date, expiry, and remaining shelf life. The <strong>mass balancing</strong> capability reconciles physical inventory with component tracking — you know not just liters in storage, but fat and protein quantities. Returns are processed through quality inspection with batch tracking maintained, enabling accurate inventory valuation.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Fresh dairy has 14-21 day shelf life. Without FEFO enforcement, older product may remain in warehouse while newer product ships, leading to write-offs. Inventory inaccuracy at 2-3% translates to significant hidden waste in fresh products.</p>
        `,
        metrics: [
            { value: "Periodic", label: "Adjustments" },
            { value: "None", label: "Bin Management" },
            { value: "No", label: "FEFO Enforced" },
            { value: "Unknown", label: "Accuracy %" }
        ]
    },
    // ENF Findings (Slides 18-25)
    18: {
        title: "Van Sales & Channels",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Similar to ARDC, ENF's van sales operate through third-party systems with <strong>end-of-day batch posting to SAP</strong>. Real-time visibility of route performance, inventory levels, and customer interactions is not available.</p>
        `,
        evidence: [
            "Van sales through separate system, not SAP",
            "End-of-day batch upload to SAP",
            "No real-time route visibility",
            "Customer visit tracking outside SAP",
            "Returns and rejections not immediately visible"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution's <strong>Catch Weight Management (CWM)</strong> is essential for poultry van sales where product weight varies per piece. The system maintains inventory in dual units — pieces for logistics, kilograms for valuation — ensuring accurate billing based on actual delivered weight rather than theoretical conversions. Integration with SAP SD provides real-time visibility of route inventory with catch-weight accuracy, eliminating the revenue leakage from weight-based billing discrepancies.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Poultry products have even shorter shelf life than dairy. Without real-time visibility, you cannot redirect inventory from low-demand routes to high-demand routes within the same day. This inflexibility increases waste and lost sales.</p>
        `,
        metrics: [
            { value: "Batch", label: "SAP Updates" },
            { value: "0%", label: "Real-time Data" },
            { value: "External", label: "Route System" },
            { value: "Delayed", label: "Visibility" }
        ]
    },
    19: {
        title: "B2B & Export",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>B2B customers (hotels, restaurants, catering) and export orders have different requirements than retail van sales, but <strong>SAP is not configured</strong> to handle these channel-specific needs — pricing, documentation, and compliance.</p>
        `,
        evidence: [
            "Channel-specific pricing handled manually",
            "Export documentation created outside SAP",
            "HORECA requirements not systematically managed",
            "No channel profitability analysis",
            "Customer-specific packaging not tracked"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution includes <strong>GS1-128 compliant labeling</strong> essential for export markets — dynamically generating barcodes with GTIN, batch, weight, production date, and SSCC numbers. The <strong>PrintManager</strong> component ensures labels match ERP data exactly, preventing disputes at customer receiving docks. Combined with batch genealogy for Halal and export compliance documentation, the solution enables systematic management of HORECA and export channel requirements with full traceability.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> B2B and export channels often have higher margins than retail but require more service. Without channel-specific tracking, you may inadvertently provide premium service at commodity prices. Export compliance errors can result in shipment delays and penalties.</p>
        `,
        metrics: [
            { value: "Manual", label: "Export Docs" },
            { value: "None", label: "Channel Analysis" },
            { value: "External", label: "Compliance" },
            { value: "Unknown", label: "Channel Margins" }
        ]
    },
    20: {
        title: "Hatchery Operations",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Hatchery operations — egg receiving from Salwa, incubation, hatching, chick delivery to farms — are managed outside SAP. <strong>Hatch rates, mortality, and batch genealogy</strong> are not systematically tracked in the ERP.</p>
        `,
        evidence: [
            "Egg receipt from Salwa not linked to SAP batches",
            "Incubation tracking in standalone systems",
            "Hatch rates calculated manually",
            "Chick quality grades not in SAP",
            "Batch genealogy incomplete from egg to bird"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution's <strong>Cycle-Based Production (CBP)</strong> module is purpose-built for hatchery operations. It manages <strong>Reproduction Processes</strong> where parent flocks produce hatching eggs, and <strong>Growing Processes</strong> where eggs transform into day-old chicks. The system tracks the biological pipeline with <strong>Cross-Cycle Planning</strong> — if slaughter requires 50,000 birds in Week 40, it calculates backward to determine eggs needed in incubators in Week 30, accounting for hatchability rates. Batch genealogy automatically links eggs from Salwa to resulting chicks.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Hatchery is where future farm productivity is determined. A 1% improvement in hatch rate across millions of eggs translates to significant additional revenue. Without systematic tracking, you cannot identify and address causes of hatch failures or correlate parent flock performance to chick quality.</p>
        `,
        metrics: [
            { value: "External", label: "Tracking System" },
            { value: "Manual", label: "KPI Calculation" },
            { value: "Broken", label: "Batch Genealogy" },
            { value: "None", label: "Root Cause Analysis" }
        ]
    },
    21: {
        title: "Farm Operations",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Feed consumption at farm silos is <strong>not measured</strong> — feed delivered is assumed consumed. Without actual consumption data, Feed Conversion Ratio (FCR) — the most important efficiency metric in poultry — cannot be accurately calculated.</p>
        `,
        evidence: [
            "No measurement at farm silos",
            "Feed delivery = assumed consumption",
            "FCR calculated on estimates, not actuals",
            "GF feed quality issues undetectable at farm",
            "House-level performance not tracked",
            "Mortality tracking incomplete"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The <strong>Cycle-Based Production (CBP)</strong> module tracks the entire growing cycle with the <strong>Production Cycle</strong> as a central cost collector. FCR — the most critical KPI in poultry — is calculated continuously by tracking feed issues to specific cycles in real-time. The system manages <strong>Mortality</strong> as a standard transaction, amortizing the cost of dead birds onto surviving populations for accurate final costing. <strong>Growth Curves</strong> compare actual weights against breed standards (e.g., Ross 308), providing early warning of performance deviation. Integration with barn scales enables house-level tracking.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Feed is 65-70% of live bird cost. A 0.05 improvement in FCR across the flock saves millions annually. Without measurement, you cannot determine if poor FCR is due to feed quality (GF problem), bird health, or environmental conditions. The GF-ENF accountability gap remains unresolved.</p>
        `,
        metrics: [
            { value: "None", label: "Silo Measurement" },
            { value: "Assumed", label: "Consumption Data" },
            { value: "Estimated", label: "FCR" },
            { value: "65-70%", label: "Feed Cost Share" }
        ]
    },
    22: {
        title: "Processing Plant",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Processing plant operations — live bird receiving, slaughter, cut-up, further processing — are tracked in production control systems but <strong>not fully integrated with SAP</strong>. Yield variances are known only at month-end.</p>
        `,
        evidence: [
            "Line speed and weights in PLC/SCADA only",
            "Yield calculations done post-facto",
            "Cut-up yields not tracked to standard",
            "Further processing recipes not in SAP BOMs",
            "Waste and offal not valued systematically"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The <strong>Disassembly Module</strong> is the solution's core capability — handling the "reverse BOM" where one bird yields multiple outputs. <strong>Cut Lists</strong> define expected yields (wings, breasts, thighs, trim) with multiple cutting strategies for different markets. The <strong>Disassembly Order (DAO)</strong> enables real-time yield monitoring — if breast yields drop below target, supervisors are alerted immediately, not at month-end. The <strong>Data Process System (DPS)</strong> provides native integration with scales and conveyors (Marel, Stork), eliminating the middleware "black box." Offal and by-products are valued using <strong>Net Realizable Value</strong> logic.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> A 1% yield improvement in a processing plant handling thousands of birds daily represents significant meat value. Without real-time yield tracking, you cannot identify problems until month-end — weeks after the birds have been processed. Shift-level accountability is impossible.</p>
        `,
        metrics: [
            { value: "Monthly", label: "Yield Visibility" },
            { value: "Separate", label: "Shop-floor System" },
            { value: "None", label: "Real-time Alerts" },
            { value: "Unknown", label: "Daily Variance" }
        ]
    },
    23: {
        title: "Quality Management",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Similar to ARDC, <strong>SAP QM is not effectively utilized</strong> for ENF. Quality testing at receiving, in-process, and finished goods exists but is paper-based or in standalone systems, not integrated with SAP.</p>
        `,
        evidence: [
            "Quality testing not in SAP QM",
            "Halal compliance documentation manual",
            "Supplier quality ratings not systematic",
            "Customer complaints tracked outside SAP",
            "No quality cost analysis possible"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution provides <strong>inline attribute capture</strong> — quality parameters (pH, temperature, weight) are recorded continuously during processing flow, not as discrete inspection events. <strong>Batch Genealogy and Inheritance</strong> ensures that characteristics flow through production — if the source flock is "Antibiotic Free," all derived products automatically inherit this attribute. For Halal compliance, batch derivation provides unbroken chain-of-custody documentation. In recall scenarios, the system executes <strong>Top-Down or Bottom-Up traces in seconds</strong>: "Show every customer who received product from Flock ID 1024."</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Halal certification requires documented traceability and process control. Manual documentation creates audit risk. Quality costs (rejections, rework, customer complaints) are likely higher than measured because they're not systematically captured.</p>
        `,
        metrics: [
            { value: "Inactive", label: "SAP QM" },
            { value: "Manual", label: "Halal Docs" },
            { value: "External", label: "Complaints" },
            { value: "Unknown", label: "Quality Cost" }
        ]
    },
    24: {
        title: "Feed & Procurement",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Feed procurement from GF (intercompany) has <strong>no quality-based receiving criteria</strong> in SAP. Feed quality issues at the farm cannot be traced back to specific GF production batches.</p>
        `,
        evidence: [
            "Feed from GF received without quality check in SAP",
            "No batch linking from feed to farm performance",
            "Quality disputes with GF handled manually",
            "Feed specifications not maintained in SAP",
            "No supplier scorecard for GF"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The <strong>Cycle-Based Production</strong> module links feed batches to specific production cycles. When feed from GF is issued to a barn, the system tracks consumption against that flock's performance (FCR, mortality, growth rate). If performance drops, the <strong>batch genealogy</strong> traces back to the exact GF feed batch consumed. This transforms "finger-pointing" into data-driven root cause analysis. The system supports <strong>Livestock Reservation</strong> concepts that can manage feed scheduling agreements with GF, and quality parameters are captured at receiving for systematic supplier evaluation.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> When farm performance is poor, was it feed quality, bird genetics, or farm management? Without batch-level traceability and quality data, this question cannot be answered objectively. The result is finger-pointing between entities rather than root cause resolution.</p>
        `,
        metrics: [
            { value: "None", label: "GF Quality Check" },
            { value: "Manual", label: "Dispute Resolution" },
            { value: "Broken", label: "Feed-Farm Link" },
            { value: "No", label: "GF Scorecard" }
        ]
    },
    25: {
        title: "Finance & Controlling",
        entity: "Emirates National Foods",
        coreArgument: `
            <p>Cost accounting for poultry is complex — costs accumulate through hatchery, farm, and processing with biological transformation at each stage. Current SAP configuration does not support <strong>flock-level costing</strong> or biological asset accounting per IAS 41.</p>
        `,
        evidence: [
            "No flock-level cost accumulation",
            "Farm overhead allocation unclear",
            "Processing yields not reflected in product costs",
            "Biological assets not valued per IAS 41",
            "IC pricing with Salwa and GF not formalized"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution addresses poultry's unique cost accumulation challenge across biological transformations. <strong>Cycle-Based Production</strong> uses the Production Cycle as a cost collector, automating capitalization of feed, medication, and overhead into living inventory per <strong>IAS 41</strong> requirements. At processing, <strong>Equivalence Number Costing</strong> allocates the bird's accumulated cost to cuts based on market value — breast absorbs proportionally more cost than trim. The <strong>Material Ledger</strong> revalues inventory based on actual yields, providing the CFO with precise margin visibility. Cross-cycle cost transfer links hatchery costs to farm costs to processed product costs.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Without flock-level costing, you cannot identify which farms or which flocks are profitable. Management decisions about farm investments, culling timing, and production planning are made without accurate cost information. IFRS compliance for biological assets requires fair value accounting.</p>
        `,
        metrics: [
            { value: "None", label: "Flock Costing" },
            { value: "Non-compliant", label: "IAS 41" },
            { value: "Unclear", label: "Overhead Allocation" },
            { value: "Informal", label: "IC Pricing" }
        ]
    },
    // GF Findings (Slides 26-30)
    26: {
        title: "IC & External Sales",
        entity: "Greenfields for Feeds",
        coreArgument: `
            <p>GF sells primarily to ENF (intercompany) with some external sales. <strong>IC pricing is not formalized</strong> in SAP with documented transfer pricing policy. External pricing decisions are made ad-hoc.</p>
        `,
        evidence: [
            "IC sales to ENF without formal pricing policy",
            "Transfer pricing documentation lacking",
            "External customer pricing inconsistent",
            "No customer profitability analysis",
            "Sales volume tracking incomplete"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Configure IC pricing in SAP with documented policy. Implement customer hierarchies for IC vs external. Maintain transfer pricing documentation in SAP. Analyze external customer profitability to guide pricing decisions.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Under UAE corporate tax, transfer pricing must be arm's length and documented. If IC prices to ENF differ significantly from external market prices without justification, tax authorities may adjust taxable income. External sales pricing without analysis may leave money on the table.</p>
        `,
        metrics: [
            { value: "Informal", label: "IC Pricing" },
            { value: "None", label: "TP Documentation" },
            { value: "Ad-hoc", label: "External Pricing" },
            { value: "Unknown", label: "Customer Profit" }
        ]
    },
    27: {
        title: "Procurement & Planning",
        entity: "Greenfields for Feeds",
        coreArgument: `
            <p>Feed mill planning requires balancing ingredient availability, prices, and nutritional requirements. This optimization happens <strong>largely in Excel</strong> or specialized feed formulation software, not integrated with SAP procurement or production.</p>
        `,
        evidence: [
            "Feed formulation in standalone software",
            "Ingredient procurement not linked to formulation",
            "Commodity price changes not reflected real-time",
            "No integrated least-cost formulation",
            "MRP runs on static BOMs, not optimized recipes"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Integrate feed formulation software with SAP. Update BOMs based on optimized recipes. Link commodity market prices to procurement decisions. Use MRP with recipe flexibility for ingredient substitution.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Feed formulation is a daily optimization problem — ingredient prices fluctuate, and formulas can be adjusted while meeting nutritional specs. Without integration, formulation decisions are made without knowing actual ingredient availability, and procurement decisions are made without knowing optimal recipes.</p>
        `,
        metrics: [
            { value: "External", label: "Formulation System" },
            { value: "Static", label: "SAP BOMs" },
            { value: "None", label: "Price Integration" },
            { value: "Suboptimal", label: "Recipe Cost" }
        ]
    },
    28: {
        title: "Feed Manufacturing",
        entity: "Greenfields for Feeds",
        coreArgument: `
            <p>Feed mill production — grinding, mixing, pelleting — generates operational data in PLCs but <strong>not integrated with SAP production orders</strong>. Batch information, ingredient consumption, and quality parameters are not fully captured.</p>
        `,
        evidence: [
            "PLC data not feeding SAP",
            "Batch traceability incomplete",
            "Actual ingredient consumption vs BOM not reconciled real-time",
            "Pelleting quality parameters not in SAP",
            "Production order confirmations delayed"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Integrate feed mill automation with SAP. Capture actual ingredient weights and batch numbers at production. Record quality parameters (pellet durability, moisture) in QM. Reconcile actual vs standard consumption per batch.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Feed quality directly impacts ENF farm performance. Without batch-level traceability from ingredients through production to farm delivery, quality issues cannot be traced to root cause. This perpetuates the GF-ENF accountability gap.</p>
        `,
        metrics: [
            { value: "Separate", label: "Mill Automation" },
            { value: "Incomplete", label: "Batch Trace" },
            { value: "Delayed", label: "Confirmations" },
            { value: "Manual", label: "Reconciliation" }
        ]
    },
    29: {
        title: "Quality Management",
        entity: "Greenfields for Feeds",
        coreArgument: `
            <p>Feed quality testing (protein, moisture, aflatoxins, etc.) exists but results are <strong>not systematically recorded in SAP QM</strong>. Quality certificates are generated manually. Supplier quality for raw materials is not tracked.</p>
        `,
        evidence: [
            "QM not activated for feed production",
            "Lab results on paper or spreadsheets",
            "Quality certificates manual",
            "Incoming material quality not in SAP",
            "No supplier quality ratings"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Activate QM for incoming ingredients, in-process, and finished feed. Generate quality certificates from SAP. Rate suppliers based on quality performance. Configure quality notifications for non-conformances.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Feed mill is the only point where ingredient quality can be verified before it impacts animal performance. Aflatoxin contamination, for example, must be caught here — once in the animal, damage is done. Systematic quality tracking is both a business necessity and an ENF/Salwa relationship requirement.</p>
        `,
        metrics: [
            { value: "Inactive", label: "SAP QM" },
            { value: "Paper", label: "Lab Results" },
            { value: "Manual", label: "Certificates" },
            { value: "None", label: "Supplier Rating" }
        ]
    },
    30: {
        title: "Finance & Controlling",
        entity: "Greenfields for Feeds",
        coreArgument: `
            <p>Feed cost calculation should reflect actual ingredient costs (which fluctuate with commodity markets) and actual recipe used. Current SAP configuration uses <strong>standard costs that don't reflect market reality</strong>.</p>
        `,
        evidence: [
            "Standard costs not updated for commodity prices",
            "Actual recipe variations not costed",
            "IC pricing to ENF not cost-based",
            "No product-level profitability",
            "Manufacturing variances large and unexplained"
        ],
        bestPractice: `
            <p><strong>SAP Best Practice:</strong> Implement actual costing or material ledger for ingredient price updates. Calculate product costs based on actual recipes used. Analyze manufacturing variances by category. Support IC pricing decisions with actual cost data.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Commodity prices can swing 20-30% within a year. If product costs don't reflect current ingredient prices, profitability analysis is fiction. IC pricing to ENF based on outdated costs may transfer value inappropriately within the group.</p>
        `,
        metrics: [
            { value: "Standard", label: "Costing Method" },
            { value: "Outdated", label: "Ingredient Costs" },
            { value: "Large", label: "Variances" },
            { value: "Unknown", label: "True Margin" }
        ]
    },
    // Salwa Findings (Slides 31-35)
    31: {
        title: "Breeder Operations",
        entity: "Salwa @ Liwa",
        coreArgument: `
            <p>Breeder farm operations — managing parent stock flocks that produce hatching eggs for ENF — are <strong>not tracked at house level</strong> in SAP. Flock performance, egg production, and mortality are managed in spreadsheets.</p>
        `,
        evidence: [
            "No house-level tracking in SAP",
            "Egg production recorded in spreadsheets",
            "Flock performance curves not in system",
            "Mortality tracking manual",
            "Feed consumption per house unknown"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The <strong>Cycle-Based Production (CBP)</strong> module manages <strong>Reproduction Processes</strong> where parent flocks produce hatching eggs. The <strong>Production Cycle</strong> serves as a cost collector at house level, tracking bird count, feed consumption, egg production, and mortality in real-time. The system defines theoretical <strong>Production Curves</strong> for breeder breeds and overlays actual performance, providing early warning of deviation. Integration with barn scales and egg counters captures data automatically. Mortality is handled as a standard transaction with cost amortization onto surviving birds.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Breeder flock performance determines egg quality and quantity, which determines hatchery output, which determines ENF farm input. Without house-level tracking, you cannot identify underperforming houses or correlate performance with factors like feed, lighting, or ventilation.</p>
        `,
        metrics: [
            { value: "Company", label: "Tracking Level" },
            { value: "Spreadsheets", label: "Production Data" },
            { value: "Manual", label: "Mortality Track" },
            { value: "Unknown", label: "House Performance" }
        ]
    },
    32: {
        title: "Quality Management",
        entity: "Salwa @ Liwa",
        coreArgument: `
            <p>Hatching egg quality — weight, shell thickness, shape index — directly impacts hatch rates at ENF. This data is <strong>not captured in SAP</strong> and cannot be correlated with hatchery results.</p>
        `,
        evidence: [
            "Egg quality parameters not in SAP",
            "No link between egg quality and hatch rate",
            "Quality grading done manually",
            "Rejected eggs not tracked systematically",
            "Supplier quality data not provided to ENF"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution captures <strong>inline quality attributes</strong> — egg weight, shell thickness, shape index — directly into batch characteristics during grading. <strong>Batch Genealogy</strong> links eggs to parent flock, house, and production date. When ENF's hatchery reports poor results, the system traces back to specific Salwa batches, correlating egg quality with hatch outcomes. This transforms blame-based disputes into <strong>data-driven root cause analysis</strong>. Quality certificates are generated automatically from SAP with GS1-128 compliant labeling for each shipment to ENF.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> When ENF hatchery has poor results, was it egg quality from Salwa or incubation process at ENF? Without quality data at the handoff point, this cannot be determined objectively. Both parties blame each other while the root cause goes unaddressed.</p>
        `,
        metrics: [
            { value: "None", label: "Quality in SAP" },
            { value: "Manual", label: "Grading" },
            { value: "No", label: "Batch Correlation" },
            { value: "Blame", label: "Issue Resolution" }
        ]
    },
    33: {
        title: "Feed & Farm Inputs",
        entity: "Salwa @ Liwa",
        coreArgument: `
            <p>Feed from GF is received without systematic quality inspection in SAP. <strong>Feed consumption per house is not measured</strong>, making FCR (feed per egg) calculation impossible at the detail level.</p>
        `,
        evidence: [
            "Feed from GF not quality-inspected at receipt",
            "No house-level feed consumption tracking",
            "FCR per house cannot be calculated",
            "Feed quality issues discovered only through performance drop",
            "Vaccine and medication usage not tracked per flock"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p><strong>Cycle-Based Production</strong> tracks all inputs — feed, vaccines, medications — against specific production cycles (houses). Feed issues from GF are linked to the consuming flock with batch traceability. The system calculates <strong>feed per egg</strong> continuously, the critical efficiency metric for breeder operations. When performance drops, batch genealogy traces back to specific GF feed batches, enabling objective accountability. Quality parameters are captured at feed receiving, with specifications maintained in SAP for systematic supplier evaluation of GF.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Similar to ENF farms, without feed measurement, Salwa cannot calculate true production cost per egg or identify inefficient houses. The GF-Salwa accountability gap mirrors the GF-ENF gap — feed quality concerns cannot be substantiated.</p>
        `,
        metrics: [
            { value: "None", label: "Feed QC" },
            { value: "Unknown", label: "House Consumption" },
            { value: "Cannot", label: "Calculate FCR" },
            { value: "Gap", label: "GF Accountability" }
        ]
    },
    34: {
        title: "IC Sales & Distribution",
        entity: "Salwa @ Liwa",
        coreArgument: `
            <p>Hatching eggs are transferred to ENF at a <strong>fixed transfer price</strong> that doesn't reflect production cost variations or quality differences. The IC process is manual without SAP integration.</p>
        `,
        evidence: [
            "Fixed egg price regardless of cost",
            "No quality-based pricing differential",
            "IC invoice created manually",
            "No SAP delivery documentation",
            "Transfer pricing policy undocumented"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The solution supports <strong>quality-based pricing tiers</strong> for intercompany transfers. Eggs graded as premium (optimal weight, shell quality) command higher transfer prices than borderline eggs, creating incentive for Salwa to optimize quality. The <strong>Livestock Settlement</strong> concepts can be adapted for egg pricing matrices based on captured attributes. IC billing is automated with <strong>Self-Billing (Evaluated Receipt Settlement)</strong> — ENF receives eggs, and SAP automatically generates the settlement based on quality grades. Batch traceability links every egg shipment to source flock for transfer pricing documentation.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> A fixed transfer price regardless of quality creates no incentive for Salwa to improve egg quality — they receive the same price for premium and borderline eggs. Meanwhile, ENF's hatchery performance suffers from quality variation they cannot control.</p>
        `,
        metrics: [
            { value: "Fixed", label: "Egg Price" },
            { value: "None", label: "Quality Tier" },
            { value: "Manual", label: "IC Process" },
            { value: "No", label: "Cost Linkage" }
        ]
    },
    35: {
        title: "Finance & Controlling",
        entity: "Salwa @ Liwa",
        coreArgument: `
            <p>All costs are accumulated at company level with <strong>no house-level costing</strong>. Parent stock is not valued as biological asset per IAS 41. Fixed transfer price includes no quality pricing differential.</p>
        `,
        evidence: [
            "No house-level cost accumulation",
            "All houses treated identically regardless of performance",
            "Cost per egg not calculated systematically",
            "Parent stock not valued per IAS 41",
            "Flock depreciation calculated manually in Excel",
            "No linkage to actual bird mortality"
        ],
        bestPractice: `
            <p><strong>Recommended Solution: SAP Meat Management by msg for SAP S/4HANA</strong></p>
            <p>The <strong>Production Cycle</strong> serves as a cost collector at house level, accumulating feed, medication, labor, and overhead into the biological asset. The system automates <strong>IAS 41 biological asset valuation</strong>, capitalizing costs into living inventory with fair value adjustments. <strong>Mortality Management</strong> automatically adjusts asset values and amortizes deceased bird costs onto survivors. Flock depreciation is calculated dynamically based on actual bird count and production curve stage — not static Excel formulas. Cost per egg is calculated continuously at house level, enabling identification of underperforming houses and data-driven culling decisions.</p>
        `,
        consultingInsight: `
            <p><strong>Business Impact:</strong> Houses have different performance due to age, genetics, housing conditions, and management. Treating them identically hides significant cost differences. IAS 41 requires biological assets to be measured at fair value — non-compliance creates audit risk.</p>
        `,
        metrics: [
            { value: "Company", label: "Cost Level" },
            { value: "Non-compliant", label: "IAS 41" },
            { value: "Excel", label: "Depreciation" },
            { value: "Unknown", label: "House Costs" }
        ]
    }
};

// Initialize Detail Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('findingDetailPanel');
    const panelBody = document.getElementById('findingDetailBody');
    const closeBtn = document.getElementById('closeFindingPanel');
    const overlay = document.getElementById('panelOverlay');

    if (!panel || !panelBody) return;

    // Close panel function
    function closePanel() {
        panel.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('panel-open');
        document.body.style.overflow = '';

        // Show all click notices again
        document.querySelectorAll('.slide-click-notice').forEach(notice => {
            notice.style.opacity = '1';
            notice.style.visibility = 'visible';
        });
    }

    // Open panel with content
    function openPanel(slideNum) {
        const details = findingDetails[slideNum];
        if (!details) return;

        // Build panel content
        let metricsHTML = '';
        if (details.metrics) {
            metricsHTML = `
                <div class="panel-section">
                    <div class="panel-section-title">
                        <i class="fas fa-chart-bar"></i>
                        <span>Current State Metrics</span>
                    </div>
                    <div class="impact-metrics">
                        ${details.metrics.map(m => `
                            <div class="impact-metric">
                                <div class="metric-value">${m.value}</div>
                                <div class="metric-label">${m.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        let evidenceHTML = '';
        if (details.evidence && details.evidence.length > 0) {
            evidenceHTML = `
                <div class="panel-section">
                    <div class="panel-section-title">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Evidence & Observations</span>
                    </div>
                    <ul class="evidence-list">
                        ${details.evidence.map(e => `
                            <li><i class="fas fa-chevron-right"></i>${e}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        panelBody.innerHTML = `
            <div class="panel-section">
                <div class="panel-section-title">
                    <i class="fas fa-eye"></i>
                    <span>Core Observation</span>
                </div>
                <div class="panel-section-content">
                    ${details.coreArgument}
                </div>
            </div>

            ${metricsHTML}

            ${evidenceHTML}

            <div class="panel-section">
                <div class="panel-section-title">
                    <i class="fas fa-check-circle"></i>
                    <span>SAP Best Practice</span>
                </div>
                <div class="best-practice-box">
                    ${details.bestPractice}
                </div>
            </div>

            <div class="panel-section">
                <div class="panel-section-title">
                    <i class="fas fa-lightbulb"></i>
                    <span>Business Consulting Insight</span>
                </div>
                <div class="consulting-box">
                    ${details.consultingInsight}
                </div>
            </div>
        `;

        panel.classList.add('active');
        overlay.classList.add('active');
        document.body.classList.add('panel-open');
        document.body.style.overflow = 'hidden';

        // Hide all click notices
        document.querySelectorAll('.slide-click-notice').forEach(notice => {
            notice.style.opacity = '0';
            notice.style.visibility = 'hidden';
        });
    }

    // Close button click
    closeBtn.addEventListener('click', closePanel);

    // Overlay click
    overlay.addEventListener('click', closePanel);

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('active')) {
            closePanel();
        }
    });

    // Make finding elements clickable and add notice to each slide
    document.querySelectorAll('.slide-finding').forEach(slide => {
        const slideNum = parseInt(slide.dataset.slide);

        // If we have details for this slide
        if (findingDetails[slideNum]) {
            const findingBody = slide.querySelector('.finding-body');
            const ratingBoxes = slide.querySelectorAll('.rating-box');
            const slideContent = slide.querySelector('.slide-content');

            if (findingBody) {
                findingBody.addEventListener('click', () => openPanel(slideNum));
            }

            ratingBoxes.forEach(box => {
                box.addEventListener('click', () => openPanel(slideNum));
            });

            // Add notice to each finding slide
            if (slideContent) {
                const notice = document.createElement('div');
                notice.className = 'slide-click-notice';
                notice.innerHTML = `
                    <div class="notice-icon"><i class="fas fa-hand-pointer"></i></div>
                    <span class="notice-text">Click elements for further details</span>
                `;
                slideContent.appendChild(notice);
            }
        }
    });
});
