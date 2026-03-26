/**
 * TDR Calculator Logic
 * Handles real-time computation, unit conversion, and UI state updates in Chinese.
 */

const STATE = {
    mode: 'L2T', // L2T: Length to Time, T2L: Time to Length
    unit: 'mm',
    traceType: 'stripline',
    dk: 4.2,
    inputValue: 100,
    constants: {
        c_mm_ns: 299.792458, // Speed of light in mm/ns
        c_inch_ns: 11.8028527 // Speed of light in inch/ns
    }
};

const UI = {
    modeL2T: document.getElementById('mode-l-to-t'),
    modeT2L: document.getElementById('mode-t-to-l'),
    unitRadios: document.getElementsByName('unit'),
    traceType: document.getElementById('trace-type'),
    dkValue: document.getElementById('dk-value'),
    dkLabel: document.getElementById('dk-label'),
    dkHint: document.getElementById('dk-hint'),
    mainInput: document.getElementById('main-input'),
    mainInputLabel: document.getElementById('main-input-label'),
    mainInputUnit: document.getElementById('main-input-unit'),
    mainOutputValue: document.getElementById('main-output-value'),
    mainOutputLabel: document.getElementById('main-output-label'),
    mainOutputUnit: document.getElementById('main-output-unit'),
    statVF: document.getElementById('stat-vf'),
    statVP: document.getElementById('stat-vp'),
    statTPD: document.getElementById('stat-tpd'),
    currentDate: document.getElementById('current-date')
};

function init() {
    lucide.createIcons();
    UI.currentDate.textContent = new Date().toLocaleDateString('zh-CN');
    setupEventListeners();
    calculate();
}

function setupEventListeners() {
    UI.modeL2T.addEventListener('click', () => switchMode('L2T'));
    UI.modeT2L.addEventListener('click', () => switchMode('T2L'));

    UI.unitRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            STATE.unit = e.target.value;
            updateUnits();
            calculate();
        });
    });

    UI.traceType.addEventListener('change', (e) => {
        STATE.traceType = e.target.value;
        updateTraceContext();
        calculate();
    });

    UI.dkValue.addEventListener('input', (e) => {
        STATE.dk = parseFloat(e.target.value) || 1;
        calculate();
    });

    UI.mainInput.addEventListener('input', (e) => {
        STATE.inputValue = parseFloat(e.target.value) || 0;
        calculate();
    });
}

function switchMode(mode) {
    STATE.mode = mode;
    if (mode === 'L2T') {
        UI.modeL2T.classList.add('active');
        UI.modeT2L.classList.remove('active');
        UI.mainInputLabel.textContent = '物理走线长度';
        UI.mainOutputLabel.textContent = 'TDR 回路时间 (Δt)';
        UI.mainOutputUnit.textContent = 'ns';
    } else {
        UI.modeT2L.classList.add('active');
        UI.modeL2T.classList.remove('active');
        UI.mainInputLabel.textContent = 'TDR 回路时间 (Δt)';
        UI.mainOutputLabel.textContent = '物理走线长度';
        UI.mainInputUnit.textContent = 'ns';
    }
    updateUnits();
    calculate();
}

function updateUnits() {
    if (STATE.mode === 'L2T') {
        UI.mainInputUnit.textContent = STATE.unit;
        UI.mainOutputUnit.textContent = 'ns';
    } else {
        UI.mainInputUnit.textContent = 'ns';
        UI.mainOutputUnit.textContent = STATE.unit;
    }
}

function updateTraceContext() {
    if (STATE.traceType === 'microstrip') {
        UI.dkLabel.innerHTML = '等效介电常数 (ε<sub>eff</sub>)';
        UI.dkHint.textContent = '微带线电场在空气和介质中分布。请使用根据几何结构计算出的有效值。';
    } else {
        UI.dkLabel.innerHTML = '介电常数 (Dk)';
        UI.dkHint.textContent = '对于带状线，电磁场完全包含在介质基板内。';
    }
}

function calculate() {
    const c = STATE.unit === 'mm' ? STATE.constants.c_mm_ns : STATE.constants.c_inch_ns;
    
    const velocityFactor = 1 / Math.sqrt(STATE.dk);
    const vp = c * velocityFactor;
    
    let result = 0;
    if (STATE.mode === 'L2T') {

        result = (2 * STATE.inputValue) / vp;
    } else {

        result = (vp * STATE.inputValue) / 2;
    }

    UI.mainOutputValue.textContent = result.toFixed(3);
    
    UI.statVF.textContent = `${velocityFactor.toFixed(3)} c`;
    UI.statVP.textContent = `${vp.toFixed(2)} ${STATE.unit}/ns`;
    
    const tpd = 1 / vp;
    UI.statTPD.textContent = `${(tpd * 1000).toFixed(2)} ps/${STATE.unit}`;

    if (STATE.inputValue < 0 || STATE.dk < 1) {
        UI.mainOutputValue.classList.add('text-red-500');
        UI.mainOutputValue.textContent = '无效输入';
    } else {
        UI.mainOutputValue.classList.remove('text-red-500');
    }
}

document.addEventListener('DOMContentLoaded', init);
