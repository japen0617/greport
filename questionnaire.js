document.addEventListener('DOMContentLoaded', () => {
    // --- DATA (from gas.html) ---
    const questions = [
        {
            controlModule: "來源可視性 Blind Spot Identification",
            code: "1-1",
            assessmentArea: "來源控管",
            questionContent: "是否有建立並持續維護所有流量來源清單（如實體 TAP、Inline Feed、Virtual TAP、Cloud Mirror）？",
            options: {
                "Yes": "已建立完整來源清單，並由專人維護來源位置與異動紀錄，具備可稽核與追溯性。",
                "Conditional": "有來源清單部分建立，惟缺乏明確負責人或異動更新未納入流程。",
                "No": "未建立任何來源清單，來源管理仰賴經驗與口頭交辦。"
            }
        },
        {
            controlModule: "來源可視性 Blind Spot Identification",
            code: "1-2",
            assessmentArea: "分流設計",
            questionContent: "流量分送規則是否有標準？是否有明確規定哪些工具（如 IDS/IPS、SIEM、NDR）該收哪些類型的流量？",
            options: {
                "Yes": "已建立分送規則，並文件化記錄各工具應接收的流量類型，實際配置亦與規範一致。",
                "Conditional": "具備分送規範但未標準化記錄，或僅依經驗設定，如 Flow Mapping 僅存於圖示。",
                "No": "分流邏輯未定，工具接收流量不明確，容易產生誤餵或重疊餵送。"
            }
        },
        {
            controlModule: "來源可視性 Blind Spot Identification",
            code: "1-3",
            assessmentArea: "變更管理",
            questionContent: "當流量分送規則要新增或調整時，是否需要經過申請流程？是否有指定的管控人員與變更紀錄？",
            options: {
                "Yes": "具備正式變更流程與記錄機制，如 CAB / 工單申請，並由專責人控管異動。",
                "Conditional": "變更有通知流程但未紀錄，或由工程師口頭確認，紀錄僅存於私下筆記。",
                "No": "無變更申請與記錄機制，設定異動多憑經驗操作，缺乏追溯性。"
            }
        },
        {
            controlModule: "來源可視性 Blind Spot Identification",
            code: "1-4",
            assessmentArea: "重複性查核",
            questionContent: "是否具備機制定期查核：同一份流量是否遭重複鏡像或送至多個同類型工具，導致分析重複？",
            options: {
                "Yes": "有工具層級分析報告，且具備明確標註或 Log 紀錄，可追溯流量是否重複鏡像或重複送出",
                "Conditional": "偶有發現工具接收重複封包情況，但缺乏定期檢查制度，僅依賴人工回報與事後追蹤。",
                "No": "無法確認是否存在重複鏡像或重複送流情形，亦未建立檢查機制，無從掌握誤報與效能浪費風險。"
            }
        },
        {
            controlModule: "來源可視性 Blind Spot Identification",
            code: "1-5",
            assessmentArea: "架構轉型",
            questionContent: "是否在架構轉型（如網路分段、軟體定義網路、虛擬化、雲端佈建）時重新檢討流量分送配置？",
            options: {
                "Yes": "每次架構變動均納入分送配置評估，並依變更需求調整收流策略與位置。",
                "Conditional": "部分架構變動已調整配置，但流程不一致，調整與否視人員經驗決定。",
                "No": "未將架構異動納入流量設計考量，仍以原有配置持續延用，未進行適應性檢討。"
            }
        },
        {
            controlModule: "數據完整性 Intelligence Qualification",
            code: "2-1",
            assessmentArea: "雜訊排除",
            questionContent: "是否有制定封包過濾與精簡策略（如 Packet Slicing、Header Strip、De-duplication），以降低工具處理不必要欄位與協定的負擔？",
            options: {
                "Yes": "已完成封包裁切與協定排除策略，並套用於分析前處理流程；工具 Log 顯示接收量明顯下降。",
                "Conditional": "僅針對部分協定／來源進行裁切，或由特定人員以人工方式調整，尚未導入標準化流程。",
                "No": "鏡像流量未經過濾即全量送出，無任何欄位裁切與協定排除，易導致工具過載與誤報。"
            }
        },
        {
            controlModule: "數據完整性 Intelligence Qualification",
            code: "2-2",
            assessmentArea: "加密解析",
            questionContent: "是否具備 SSL / TLS 解密能力？解密後的流量是否成功送入分析工具（如 IDS/IPS、NDR、SIEM）？",
            options: {
                "Yes": "已部署完整 SSL/TLS 解密（支援 TLS 1.3），並將解密後流量導入分析平台進行深度解析。",
                "Conditional": "僅針對部分區段進行解密，或解密範圍未涵蓋 TLS1.3，僅能導出 Encrypted metadata。",
                "No": "無部署任何解密機制，分析工具僅接收到加密流量，無法提供有效內容判讀依據。"
            }
        },
        {
            controlModule: "數據完整性 Intelligence Qualification",
            code: "2-3",
            assessmentArea: "應用層識別",
            questionContent: "是否能識別應用層 metadata（如 DNS、App 類別），並成功轉交至 SIEM、NDR、UEBA 等分析工具使用？",
            options: {
                "Yes": "已可產出應用層 metadata，並成功整合至工具使用流程，可見分類與識別結果於報表中呈現。",
                "Conditional": "雖有產出 metadata，但欄位定義或格式與分析工具不一致，需仰賴人工轉換或僅供參考。",
                "No": "尚未導入應用識別能力，工具僅能依據 IP / Port 進行粗略流量分類，無法提供應用層視角。"
            }
        },
        {
            controlModule: "數據完整性 Intelligence Qualification",
            code: "2-4",
            assessmentArea: "回溯重組",
            questionContent: "SIEM 或 NDR 發出告警後，是否可從原始封包還原告警事件內容，以利佐證與深入分析？",
            options: {
                "Yes": "已建置封包回溯與重組流程，告警事件可追溯至原始封包與重組紀錄，支援佐證分析與調查。",
                "Conditional": "雖保有原始封包，但查詢與對應作業多為人工處理，尚未整合進告警工作流程。",
                "No": "無任何回溯或封包重組能力，告警僅能依據摘要、Log 或 IP 訊息研判，無法進行深度分析。"
            }
        },
        {
            controlModule: "數據完整性 Intelligence Qualification",
            code: "2-5",
            assessmentArea: "品質查核",
            questionContent: "是否有建立封包處理品質稽核機制，定期驗證解密、重組與 metadata 的成功率，並納入追蹤或報表？",
            options: {
                "Yes": "已建立自動或手動稽核流程，並將成功率結果納入 KPI 或報表進行週期追蹤。",
                "Conditional": "偶有人工抽查封包處理結果，但無固定頻率與紀錄流程，缺乏持續追蹤依據。",
                "No": "缺乏封包處理品質驗證機制，成功率與失敗原因未被追蹤，亦無稽核相關資料可供參考。"
            }
        },
        {
            controlModule: "工具有效性 Tool Effectiveness",
            code: "3-1",
            assessmentArea: "分級設計",
            questionContent: "是否根據各工具功能差異設計分級送流規則？例如 SIEM 僅收 metadata，NDR 接收完整封包？",
            options: {
                "Yes": "已明確定義各工具的接收需求，並具備分級送流規則與對應設定表；實際流量分送結果已符合預期。",
                "Conditional": "僅部分依功能需求進行手動調整，無統一規則與版本控管，易受人員操作影響。",
                "No": "所有工具皆接收相同流量，未依任務特性調整分送，導致誤報風險與資源浪費。"
            }
        },
        {
            controlModule: "工具有效性 Tool Effectiveness",
            code: "3-2",
            assessmentArea: "負載監控",
            questionContent: "是否已建立即時監控機制，能追蹤工具接收的流量負載（bps / pps）並判斷是否出現超量或延遲情形？",
            options: {
                "Yes": "已部署即時儀表板與效能追蹤報表，可掌握各工具流量變化、延遲趨勢與接收穩定度。",
                "Conditional": "僅透過 Log 或人工回報異常，缺乏完整視覺化界面與告警門檻設計。",
                "No": "完全未追蹤各工具負載狀況，發生延遲或異常僅能事後排查處理。"
            }
        },
        {
            controlModule: "工具有效性 Tool Effectiveness",
            code: "3-3",
            assessmentArea: "丟失預警",
            questionContent: "若工具未接收到流量（如介面異常、模組故障），是否具備自動告警與異常通報能力？",
            options: {
                "Yes": "已部署異常流量監控與告警模組，能即時偵測封包中斷、模組掛點並通報維運團隊。",
                "Conditional": "僅部分平台可從 Log 發現異常，尚未建置統一告警通道與自動通報機制。",
                "No": "無任何異常監測機制，工具失效或斷線狀況僅靠事後人工發現與處理。"
            }
        },
        {
            controlModule: "工具有效性 Tool Effectiveness",
            code: "3-4",
            assessmentArea: "擴展設計",
            questionContent: "是否已規劃支援新興架構（如 K8s、SASE、Remote VPC）之流量鏡像與接入擴展設計？",
            options: {
                "Yes": "已導入容器化與多雲環境鏡像架構（如 GigaVUE V Series、Cloud TAP），支援多場景接入。",
                "Conditional": "僅針對部分環境進行設計或測試，尚未形成標準化擴展機制。",
                "No": "缺乏 K8s、SASE 等場景考量，現有鏡像與接入設計難以支援後續擴充。"
            }
        },
        {
            controlModule: "工具有效性 Tool Effectiveness",
            code: "3-5",
            assessmentArea: "高彈性維運",
            questionContent: "當需調整流量來源或資源配置時，是否具備 Inline Bypass、Load Balancing 或動態切換等彈性機制？",
            options: {
                "Yes": "已建置 Flow Mapping、Tool Group、Inline Bypass 等彈性調度模組，支援動態轉向與資源切換。",
                "Conditional": "雖有備援路徑或人工切換流程，但缺乏即時自動化調度機制與策略彈性。",
                "No": "完全無調度與備援設計，一旦路徑異常即需人工介入，影響可用性與維運效率。"
            }
        }
    ];
    const overallEvaluations = {
        "可視化控管能力 Visibility Control Capabilities": {
            "玩家級": {
                finding: "目前尚未建立完整的來源盤點與鏡像連接管理機制，亦缺乏資料處理流程中的角色分工與紀錄制度，導致來源責任不明、流量配置不透明及重複餵送風險，恐影響後續的視覺化控管與異常追溯效能。",
                recommendation: "建議以「來源清單建立」、「流量盤點」與「視覺化控管」為三大起點，導入 GigaVUE-FM 作為集中管理平台，建構來源對應視圖與工具接收視覺化基礎。同步搭配 GigaSMART 核心模組（如 Flow Mapping、De-duplication）快速提升處理效率，建立標準化控管基礎，強化整體來源治理準備度，為後續的精細化管理與稽核作業奠定根基。"
            },
            "菁英級": {
                finding: "目前已具備基本視覺化管理與部分模組處理能力，但在流量分送策略、雜訊濾除、異常監控與解密處理等面向尚未整合，導致資料可讀性不足，工具接收內容不一致，影響整體分析準確度與警訊可信度。",
                recommendation: "建議聚焦於「資料可讀性提升」與「工具分工一致性」，進一步部署 GigaSMART 進階模組（如 TLS Decryption、Packet Slicing、Application Filtering Intelligence），並搭配 NetFlow / IPFIX Export 向 SIEM、NDR 提供更適用資料來源。若涉及多雲、多站點或容器化環境，亦可同步導入 TA Series 實體節點與 V Series 虛擬節點，支援 K8s、Remote VPC 等分散式部署。此階段以「數據傳遞品質優化」為核心，協助各類工具精準接收、發揮應有效益。"
            },
            "傳奇級": {
                finding: "目前已具備完整的模組化治理與視覺化能力，控制機制成熟，具備良好的擴展彈性與一致性控管基礎。然而現行交付策略仍以靜態配置為主，缺乏進一步資料增值與調度智慧化，限制整體可視性效益的延展性與自動化潛力。",
                recommendation: "建議聚焦於「智慧控制」與「資料增值」，進一步整合 Application Metadata Intelligence（AMI），提升 metadata 應用深度與統一分類輸出能力。可搭配 Tool Group 管理與 API／Automation 實現跨工具調度與容錯編排；導入 FlowOps 或 Fabric Automation，實現告警事件回饋處理、動態分流與帶審核條件的調整流程。此階段目標為「數據交付策略成熟化」，建立可複製至多區域、多雲架構的控管範本，支援更高層次的營運敏捷性與資安決策支援。"
            }
        }
    };
    const overallCapabilityThresholds = { player: 27, elite: 37 };
    const moduleRecommendations = {
        "來源可視性 Blind Spot Identification": {
            "低風險": {
                finding: "目前已建立完整的流量分送架構，來源鏡像與分流管理納入制度化流程，並具備明確紀錄與執行機制，整體控管穩定性良好。惟隨著環境規模成長與應用多樣化，若缺乏中央化盤點與調度能力，仍可能在擴充或變更過程中出現配置延遲與管理落差風險。",
                recommendation: "建議持續透過 GigaVUE-FM 平台統一盤點流量來源與工具配置，作為擴充前評估與異動規劃的依據，以提升可視性控管的擴展彈性與維運效率，確保流量治理能隨業務與架構成長動態調整。"
            },
            "中風險": {
                finding: "雖已建立初步的分流與鏡像策略，但目前缺乏異動紀錄與責任分工機制，且部分流量來源整併流程與工具分配規則尚未標準化，易造成變更過程中控管落差與配置錯誤，進而降低整體可視性架構的一致性與可追溯性。",
                recommendation: "建議強化流量分送策略的異動紀錄與版本控管流程，建立明確責任分工與規則檢視機制，並針對多來源整併場景導入 TA Series、V Series 平台，提升處理彈性與架構調整效率，以確保擴充與調整過程中維持流量治理的一致性與可控性。"
            },
            "高風險": {
                finding: "缺乏全面性的流量來源盤點與責任分工機制，現行分流配置未形成正式管理制度，亦欠缺異動稽核流程與視覺化支援工具。此情形恐導致來源設定重疊、權責界線模糊，甚至出現流量重複餵送至多個工具，進而增加分析負擔與誤判風險。",
                recommendation: "建議建立流量來源與分送規劃清單，明確列示來源分類與責任分工對應，並導入異動申請與查核流程，提升變更管理的可控性與可追溯性。可搭配 GigaVUE-FM 平台實現視覺化流量配置與分流稽核，有效降低重複分析與錯誤配置風險，提升整體可視性治理品質。"
            }
        },
        "數據完整性 Intelligence Qualification": {
            "低風險": {
                finding: "封包處理鏈完整，流量分送後雜訊率與解碼成功率穩定，顯示目前資料品質具備良好的一致性與穩定性。然而若缺乏定期檢視與應用端需求對齊機制，仍可能隨架構變更或工具更新產生隱性落差，進而影響事件判斷的精準度與資料利用效率。",
                recommendation: "建議建立定期檢查機制，盤點實際分送流量與工具所需的 Metadata 資料型態與格式一致性，並依據解析品質與警訊準確度需求進行調整與最佳化。此舉有助於維持數據品質穩定性，強化多工具整合下的分析準確度與可視性治理能力。"
            },
            "中風險": {
                finding: "雖已具備初步的 Metadata 擷取與流量解密能力，但目前缺乏完整的上下文關聯資訊紀錄，導致事件研判多仰賴單一封包或 header 資料，難以建構完整攻擊鏈或使用行為樣態，進而降低告警可信度與回溯調查的有效性。",
                recommendation: "建議強化應用層 Metadata（如 DNS、HTTP 等協定分類資訊）整合至分析平台，並同步補足事件前後流量的上下文記錄與會話關聯能力，以提升告警佐證品質與事件回溯效率，強化整體可視性對應的深度與準確度。"
            },
            "高風險": {
                finding: "目前缺乏封包精簡、去雜訊與有效解密等前處理能力，導致工具端接收到大量不必要或重複性封包，增加處理負擔與誤判機率，進而影響事件偵測效率與系統整體效能，亦可能加快工具端資源耗用與 license 超量風險。",
                recommendation: "建議部署 Packet Slicing、Header Strip、De-duplication、SSL Decryption 與 Metadata 識別等前處理模組，並強化封包重組與解密結果的檢核機制，以提升流量分送的精準度與處理效率，確保分析工具在穩定負載下維持高效運作與準確告警能力。"
            }
        },
        "工具有效性 Tool Effectiveness": {
            "低風險": {
                finding: "目前已具備明確的分級送流策略，能依據應用類型與分析目的，將流量有效派送至對應工具，並搭配異常接收監控機制，確保封包處理的穩定性與準確性。然而現行設計主要針對既有場域環境，若未同步考量新興運算架構（如容器平台、SASE、Service Mesh、分散式節點等），恐於擴展過程中產生對接落差、分析盲點與部署延誤等風險。",
                recommendation: "建議及早盤點未來環境擴充需求，涵蓋多雲與混合雲部署、Kubernetes 架構、遠端 VPC、以及跨站點封包接入等場景，並預先規劃具備彈性調度與高延展性的流量接入與路由策略。此舉可強化整體可視性架構，支援 Zero Trust、DevOps 與 Cloud-Native 環境下的持續成長與治理韌性。"
            },
            "中風險": {
                finding: "雖具備部分分級送流策略與鏡像切換能力，但在異常接收預警與負載監控方面仍顯不足。缺乏即時回應機制恐導致工具端在高流量或異常情境下出現封包遺漏、處理延遲，甚至資源耗盡而無法即時察覺，進而影響分析準確性與資安事件的通報效率。",
                recommendation: "建議補強接收側異常監控機制，包含整合 Heartbeat、NetFlow、告警閾值設定與視覺化監控面板，以強化接收端效能基準管理與流量異常即時偵測能力，進一步提升整體維運效率與事件反應靈敏度。"
            },
            "高風險": {
                finding: "缺乏依據工具分析需求所設計的分級送流策略，亦未建立異常告警與接收備援機制，導致日常維運過度依賴人工監控。此情況在高流量或突發事件下，恐造成單點故障、工具效能瓶頸，甚至 license 資源異常消耗，進而降低可視性穩定性與風險反應能力。",
                recommendation: "建議導入 Flow Mapping、Application Filtering Intelligence 與 Inline Bypass 機制，依工具類型實現差異化流量送達與即時策略切換，同時整合主動監控與異常告警模組，強化接收端的彈性維運與資源調度能力。此舉有助於降低營運風險，避免單點故障與 license 爆量衝擊。"
            }
        }
    };
    const answerScores = { "Yes": 3, "Conditional": 2, "No": 1 };
    const moduleRiskThresholds = {
        "來源可視性 Blind Spot Identification": { high: 8, medium: 12 },
        "數據完整性 Intelligence Qualification": { high: 8, medium: 12 },
        "工具有效性 Tool Effectiveness": { high: 8, medium: 12 }
    };

    // --- STATE ---
    let currentQuestionIndex = 0;
    const userAnswers = {};
    let userInfo = {};

    // --- DOM ELEMENTS ---
    const progressContainerEl = document.getElementById('progress-container');
    const questionMetaInfoEl = document.getElementById('question-meta-info');
    const questionContentEl = document.getElementById('question-content');
    const optionsContainerEl = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const quizAreaEl = document.getElementById('quiz-area');
    const completionAreaEl = document.getElementById('completion-area');
    const userSummaryEl = document.getElementById('user-summary');
const moduleRecommendationsContainerEl = document.getElementById('module-recommendations-container');
const overallEvaluationContainerEl = document.getElementById('overall-evaluation-container');
const loadingEl = document.getElementById('loading');
const submitStatusEl = document.getElementById('submit-status');

    // Icons for module titles
    const moduleIcons = {
        "來源可視性 Blind Spot Identification": "blind.png",
        "數據完整性 Intelligence Qualification": "intelligence.png",
        "工具有效性 Tool Effectiveness": "tool.png"
    };

    // --- FUNCTIONS ---
    function initQuiz() {
        const storedUserInfo = localStorage.getItem('assessmentUserInfo');
        if (!storedUserInfo) {
            alert('無法獲取使用者資訊，將返回首頁。');
            window.location.href = 'index.html';
            return;
        }
        userInfo = JSON.parse(storedUserInfo);

        // Create progress dots
        for (let i = 0; i < questions.length; i++) {
            const stepEl = document.createElement('div');
            stepEl.classList.add('progress-step');

            const dotEl = document.createElement('div');
            dotEl.classList.add('progress-dot');
            stepEl.appendChild(dotEl);

            if (i < questions.length - 1) {
                const connectorEl = document.createElement('div');
                connectorEl.classList.add('progress-connector');
                stepEl.appendChild(connectorEl);
            }
            
            progressContainerEl.appendChild(stepEl);
        }

        loadQuestion();
    }

    function updateProgress() {
        const steps = progressContainerEl.children;
        Array.from(steps).forEach((step, index) => {
            const dot = step.querySelector('.progress-dot');
            const connector = step.querySelector('.progress-connector');

            dot.classList.remove('active', 'completed');
            if (connector) {
                connector.classList.remove('completed');
            }

            if (index < currentQuestionIndex) {
                dot.classList.add('completed');
                if (connector) {
                    connector.classList.add('completed');
                }
            } else if (index === currentQuestionIndex) {
                dot.classList.add('active');
            }
        });
    }

    function loadQuestion() {
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            
            updateProgress();

            questionMetaInfoEl.textContent = `${currentQuestion.controlModule} | ${currentQuestion.code} ${currentQuestion.assessmentArea}`;
            questionContentEl.textContent = currentQuestion.questionContent;
            
            optionsContainerEl.innerHTML = '';
            Object.entries(currentQuestion.options).forEach(([value, description]) => {
                const optionId = `option-${value}`;
                const label = document.createElement('label');
                label.className = 'option-label';
                label.htmlFor = optionId;

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = 'user-choice';
                radioInput.value = value;
                radioInput.id = optionId;
                
                const descSpan = document.createElement('span');
                descSpan.className = 'option-description';
                descSpan.textContent = description;

                label.appendChild(radioInput);
                label.appendChild(descSpan);
                
                label.addEventListener('click', () => {
                    // Remove 'selected' from all other labels
                    document.querySelectorAll('.option-label').forEach(l => l.classList.remove('selected'));
                    // Add 'selected' to the clicked label
                    label.classList.add('selected');
                    nextButton.disabled = false;
                });
                
                optionsContainerEl.appendChild(label);
            });
            
            // Restore previous selection
            if (userAnswers[currentQuestion.code]) {
                const selectedValue = userAnswers[currentQuestion.code];
                const selectedRadio = optionsContainerEl.querySelector(`input[value="${selectedValue}"]`);
                if (selectedRadio) {
                    selectedRadio.checked = true;
                    selectedRadio.parentElement.classList.add('selected');
                }
            }
            
            nextButton.textContent = (currentQuestionIndex === questions.length - 1) ? '完成評估' : '下一題';
            nextButton.disabled = !getSelectedAnswer();
            prevButton.style.display = (currentQuestionIndex > 0) ? 'inline-block' : 'none';
            prevButton.disabled = (currentQuestionIndex === 0);

        } else {
            showCompletionMessage();
        }
    }

    function getSelectedAnswer() {
        const selectedRadio = optionsContainerEl.querySelector('input[name="user-choice"]:checked');
        return selectedRadio ? selectedRadio.value : null;
    }

    function showCompletionMessage() {
        quizAreaEl.style.display = 'none';
        completionAreaEl.style.display = 'block';
        updateProgress(); // 將進度條更新到最終完成狀態
        displayResultsAndRecommendations();
    }

    function calculateModuleRisk(moduleName) {
        let totalScore = 0;
        questions.filter(q => q.controlModule === moduleName).forEach(q => {
            const answer = userAnswers[q.code];
            totalScore += answerScores[answer] || 0;
        });

        const thresholds = moduleRiskThresholds[moduleName];
        if (!thresholds) return "N/A"; 

        if (totalScore <= thresholds.high) return "高風險";
        if (totalScore <= thresholds.medium) return "中風險";
        return "低風險";
    }

    function calculateModuleScore(moduleName) {
        let totalScore = 0;
        questions.filter(q => q.controlModule === moduleName).forEach(q => {
            const answer = userAnswers[q.code];
            totalScore += answerScores[answer] || 0;
        });
        return totalScore;
    }

    function calculateOverallCapability() {
        let grandTotalScore = 0;
        Object.values(userAnswers).forEach(answer => {
            grandTotalScore += answerScores[answer] || 0;
        });

        if (grandTotalScore <= overallCapabilityThresholds.player) return "玩家級";
        if (grandTotalScore <= overallCapabilityThresholds.elite) return "菁英級";
        return "傳奇級";
    }

    function displayResultsAndRecommendations() {
        userSummaryEl.innerHTML = '';

        // --- NEW: Calculate and display score ---
        let grandTotalScore = 0;
        Object.values(userAnswers).forEach(answer => {
            grandTotalScore += answerScores[answer] || 0;
        });
        const maxScore = questions.length * 3;
        const scoreContainerEl = document.getElementById('capabilities-score-container');
        if (scoreContainerEl) {
            scoreContainerEl.innerHTML = `
                <div class="score-line">Capabilities Score: <span class="score-value">${grandTotalScore}</span> / ${maxScore}</div>
            `;
        }

        moduleRecommendationsContainerEl.innerHTML = ''; 
        const riskLevelMap = { "低風險": "Low", "中風險": "Medium", "高風險": "High" };

        Object.keys(moduleRecommendations).forEach(moduleName => {
            const riskLevel = calculateModuleRisk(moduleName);
            const recommendationContent = moduleRecommendations[moduleName]?.[riskLevel];

            if (!recommendationContent) return; // Skip if no content

            const moduleBlock = document.createElement('div');
            moduleBlock.className = 'module-result-block';

            const moduleQuestions = questions.filter(q => q.controlModule === moduleName);
            
            let qaHtml = '<div class="qa-list">';
            moduleQuestions.forEach(q => {
                const userAnswerKey = userAnswers[q.code] || null;
                const answerDescription = userAnswerKey ? q.options[userAnswerKey] : '未回答';
                qaHtml += `
                    <div class="qa-item">
                        <div class="qa-header">${q.code} ${q.assessmentArea}</div>
                        <div class="qa-q">問: ${q.questionContent}</div>
                        <div class="qa-a">答: ${answerDescription}</div>
                    </div>
                `;
            });
            qaHtml += '</div>';

            moduleBlock.innerHTML = `
                <div class="flex items-center gap-2 module-header">
                    <img src="${moduleIcons[moduleName] || ''}" alt="${moduleName} Icon" class="w-8 h-8">
                    <h4 class="module-title">${moduleName}</h4>
                </div>
                <div class="risk-level">Risk Level: <span class="risk-value ${ (riskLevelMap[riskLevel] || riskLevel).toLowerCase() }">${riskLevelMap[riskLevel] || riskLevel}</span></div>
                
                <div class="findings-block">
                    <p>${recommendationContent.finding}</p>
                </div>
                
                <div class="recommendations-block">
                    <h5>建議事項</h5>
                    <p>${recommendationContent.recommendation}</p>
                </div>

                <div class="qa-block">
                    <h5>問答詳情</h5>
                    ${qaHtml}
                </div>
            `;
            moduleRecommendationsContainerEl.appendChild(moduleBlock);
        });

        // Clear previous content
        document.getElementById('key-findings-container').innerHTML = '';
        document.getElementById('recommendations-container').innerHTML = '';

        const overallCapabilityLevel = calculateOverallCapability();
        const overallEvaluationKey = "可視化控管能力 Visibility Control Capabilities"; 
        const overallContent = overallEvaluations[overallEvaluationKey]?.[overallCapabilityLevel];
        
        // Display Key Findings
        const keyFindingsContainerEl = document.getElementById('key-findings-container');
        keyFindingsContainerEl.innerHTML = `
            <p>${overallContent?.finding || "暫無關鍵發現"}</p>`;

        // Display Recommendations
        const recommendationsDiv = document.getElementById('recommendations-container');
        recommendationsDiv.innerHTML = `<p><strong>建議事項：</strong>${overallContent?.recommendation || "暫無建議"}</p>`;

        // The old overallEvaluationContainerEl is no longer used directly for content,
        
        // --- NEW: Display Capability Level Image ---
        const capabilityLevelImage = document.getElementById('capability-level-image');
        let imageSrc = "";
        if (overallCapabilityLevel === "玩家級") {
            imageSrc = "player.png"; 
        } else if (overallCapabilityLevel === "菁英級") {
            imageSrc = "Elite.png";
        } else {
            imageSrc = "Legend.png";
        }
        capabilityLevelImage.src = imageSrc;
        // but its ID might still be referenced in the DOM.
        // If it was a parent container, it's fine. If it was meant to hold the content directly,
        // ensure the new divs are appended to the correct parent.

        // --- NEW: Calculate domain scores for the chart ---
        const sourceScore = calculateModuleScore("來源可視性 Blind Spot Identification");
        const qualityScore = calculateModuleScore("數據完整性 Intelligence Qualification");
        const applicationScore = calculateModuleScore("工具有效性 Tool Effectiveness");

        // Assuming each module has 5 questions, max score per module is 15
        const maxModuleScore = 15;

        // Normalize scores to a 0-1 range
        const sourceValue = sourceScore / maxModuleScore;
        const qualityValue = qualityScore / maxModuleScore;
        const applicationValue = applicationScore / maxModuleScore;

        // --- NEW: Render the triangle chart (Radar chart using Chart.js) ---
        const ctx = document.getElementById('capabilities-chart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['來源可視性', '數據完整性', '工具有效性'],
                datasets: [{
                    label: '能力雷達圖',
                    data: [sourceValue, qualityValue, applicationValue],
                    fill: true,
                    backgroundColor: 'rgba(255, 128, 0, 0.2)',  // Orange with some transparency
                    borderColor: '#ff8000',  // Solid orange border
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#ff8000',
                    pointHoverBackgroundColor: '#ff8000',
                    pointHoverBorderColor: '#fff',
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        min: 0,
                        max: 1,
                        ticks: {
                            display: false, // 這會隱藏 0.2, 0.4 等數字
                            maxTicksLimit: 1 // 確保只考慮最小值/最大值，而它們已被隱藏
                        },
                        pointLabels: {
                            font: {
                                size: 14 // 標籤字體稍微放大以匹配較大的圖表
                            },
                            color: '#333'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        angleLines: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                },
                layout: {
                    padding: 25 // 增加圖表內邊距，防止標籤被裁切
                },
                plugins: {
                    legend: { display: false },  // Hide the legend
                    title: { display: false }  // Hide the chart title
                }
            }
        });

        submitDataToBackend();
        console.log("Quiz finished. Data to submit:", { userInfo, userAnswers });
    }
    
    /**
     * 將報告區塊匯出為單一長頁面的 PDF 檔案並下載。
     * 保留原先的下載按鈕邏輯供使用者另行下載。
     */
    function exportReportAsPDF() {
        const { jsPDF } = window.jspdf;
        const reportElement = document.getElementById('completion-area');
        const downloadButton = document.getElementById('download-pdf-btn');
        const originalButtonText = downloadButton.textContent;

        // --- 準備擷取畫面 ---
        downloadButton.textContent = '報告產生中...';
        downloadButton.disabled = true;
        downloadButton.style.visibility = 'hidden';

        html2canvas(reportElement, {
            scale: 1.5, // 提高清晰度
            useCORS: true,
            logging: false,
            windowWidth: reportElement.scrollWidth,
            windowHeight: reportElement.scrollHeight
        }).then(canvas => {
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;

            const pdfWidth = 210; // A4 寬度約 210mm
            const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            pdf.save('可視化控管評估報告.pdf');

            // --- 完成後恢復 UI ---
            downloadButton.textContent = originalButtonText;
            downloadButton.disabled = false;
            downloadButton.style.visibility = 'visible';
        }).catch(error => {
            console.error("PDF 產生錯誤:", error);
            alert("抱歉，產生 PDF 時發生錯誤。");
            downloadButton.textContent = originalButtonText;
            downloadButton.disabled = false;
            downloadButton.style.visibility = 'visible';
        });
    }

    /**
     * 產生報告 PDF 並以 Base64 字串回傳，不觸發下載。
     */
    function generateReportPdfBase64() {
        const { jsPDF } = window.jspdf;
        const reportElement = document.getElementById('completion-area');
        return html2canvas(reportElement, {
            scale: 1.5,
            useCORS: true,
            logging: false,
            windowWidth: reportElement.scrollWidth,
            windowHeight: reportElement.scrollHeight
        }).then(canvas => {
            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: [pdfWidth, pdfHeight] });
            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            const dataUri = pdf.output('datauristring');
            return dataUri.split(',')[1]; // 返回 Base64 字串
        });
    }

    /**
     * 將產生的 PDF Base64 字串與使用者資訊上傳至後端。
     */
    function uploadPdfBase64(base64) {
        const payload = {
            type: 'pdf',
            userName: userInfo.name,
            userCompany: userInfo.company,
            userEmail: userInfo.email,
            pdfBase64: base64
        };
        fetch("https://script.google.com/macros/s/AKfycbxT8NYmSFt-NltBOt-uAj3sC7UqxV8eVaFL8PQQcCxt-EcmbrV9jpu8NlRz6Wdoynxg/exec", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        }).catch(err => {
            console.error('PDF 上傳失敗:', err);
        });
    }

    function submitDataToBackend() {
        const answerTexts = {};
        Object.keys(userAnswers).forEach(code => {
            const q = questions.find(q => q.code === code);
            if (q && q.options[userAnswers[code]]) {
                answerTexts[code] = q.options[userAnswers[code]];
            } else {
                answerTexts[code] = userAnswers[code];
            }
        });

        const payload = {
            type: 'answers',
            userName: userInfo.name,
            userContactPhone: userInfo.contactPhone,
            userMobilePhone: userInfo.mobilePhone,
            userCompany: userInfo.company,
            userEmail: userInfo.email,
            answers: answerTexts
        };

        fetch("https://script.google.com/macros/s/AKfycbxT8NYmSFt-NltBOt-uAj3sC7UqxV8eVaFL8PQQcCxt-EcmbrV9jpu8NlRz6Wdoynxg/exec", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify(payload),
            headers: { "Content-Type": "application/json" }
        })
        .then(() => {
            submitStatusEl.innerHTML = '<div class="submit-success">✅ 評估結果已成功提交！</div>';
        })
        .catch(err => {
            submitStatusEl.innerHTML = '<div class="submit-error">❌ 提交失敗：' + err + '</div>';
        });

        // 上傳 PDF
        generateReportPdfBase64().then(uploadPdfBase64);
    }
    // --- EVENT LISTENERS ---
    nextButton.addEventListener('click', () => {
        const selectedValue = getSelectedAnswer();
        if (!selectedValue) { 
            alert('請選擇一個選項！');
            return;
        }
        
        const currentQuestionCode = questions[currentQuestionIndex].code;
        userAnswers[currentQuestionCode] = selectedValue;
        currentQuestionIndex++;
        loadQuestion();
    });

    prevButton.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion();
        }
    });

    const downloadPdfBtn = document.getElementById('download-pdf-btn');
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', exportReportAsPDF);
    }

    // --- INITIALIZATION ---
    initQuiz();
});
