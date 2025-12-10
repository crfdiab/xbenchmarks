// XBenchmarks Configurator - Dynamic Score Calculation

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('laptop-configurator');
  if (!form) return;

  const cpuSelect = document.getElementById('cpu-select');
  const gpuSelect = document.getElementById('gpu-select');

  // Listen for changes
  if (cpuSelect) cpuSelect.addEventListener('change', recalculateScores);
  if (gpuSelect) gpuSelect.addEventListener('change', recalculateScores);

  function recalculateScores() {
    const selectedCpuId = cpuSelect ? cpuSelect.value : null;
    const selectedGpuId = gpuSelect ? gpuSelect.value : null;

    if (!selectedCpuId || !selectedGpuId) return;

    const cpu = window.cpusData[selectedCpuId];
    const gpu = window.gpusData[selectedGpuId];
    const laptop = window.laptopData;

    if (!cpu || !gpu) return;

    // Calculate Performance Score
    const performanceScore = calculatePerformanceScore(cpu);
    updateScoreDisplay('perf-score', 'perf-fill', performanceScore);

    // Calculate Gaming Score
    const gamingScore = calculateGamingScore(gpu);
    updateScoreDisplay('game-score', 'game-fill', gamingScore);

    // Calculate Battery Life Score
    const batteryScore = calculateBatteryScore(cpu, gpu, laptop);
    updateScoreDisplay('batt-score', 'batt-fill', batteryScore);
  }

  function calculatePerformanceScore(cpu) {
    try {
      const metrics = cpu.benchmarks?.cpu?.metrics || {};
      const geekbench = cpu.benchmarks?.geekbench_v6?.metrics || {};
      
      // Extract numeric values from geekbench metrics
      const geekbenchValues = Object.values(geekbench)
        .filter(v => typeof v === 'number' || (typeof v === 'string' && !isNaN(parseFloat(v))))
        .map(v => parseFloat(v) || 0);

      if (geekbenchValues.length === 0) {
        // Fallback: use core count as base
        const cores = parseInt(metrics.total_cores) || 4;
        return Math.min(100, (cores / 16) * 100);
      }

      // Average geekbench scores and normalize
      const avgScore = geekbenchValues.reduce((a, b) => a + b, 0) / geekbenchValues.length;
      return Math.min(100, Math.round((avgScore / 100) * 10));
    } catch (e) {
      return 50; // Default fallback
    }
  }

  function calculateGamingScore(gpu) {
    try {
      const fps = gpu.gaming_fps?.average_fps_of_all_games?.["1080p_high"];
      if (!fps) {
        // Fallback based on GPU memory
        const memory = parseFloat(gpu.specs?.memory?.memory_size) || 2;
        return Math.min(100, (memory / 8) * 100);
      }
      const numFps = parseFloat(fps);
      return Math.min(100, Math.round((numFps / 60) * 100));
    } catch (e) {
      return 50; // Default fallback
    }
  }

  function calculateBatteryScore(cpu, gpu, laptop) {
    try {
      const cpuTdp = parseFloat(cpu.benchmarks?.package?.metrics?.tdp_pl1) || 45;
      const gpuTgp = parseFloat(gpu.specs?.physical?.tgp) || 50;
      const batteryWh = parseFloat(laptop.specs?.general?.battery) || 100;

      if (!batteryWh || batteryWh === 0) {
        return 50; // Neutral score if no battery info
      }

      const totalPower = cpuTdp + gpuTgp + 10; // 10W base consumption
      const batteryHours = batteryWh / totalPower;
      
      // Score based on hours: 12 hours = 100
      return Math.min(100, Math.round((batteryHours / 12) * 100));
    } catch (e) {
      return 50; // Default fallback
    }
  }

  function updateScoreDisplay(scoreId, fillId, score) {
    const scoreEl = document.getElementById(scoreId);
    const fillEl = document.getElementById(fillId);

    if (scoreEl) {
      scoreEl.textContent = Math.round(score);
    }

    if (fillEl) {
      fillEl.style.width = score + '%';
    }
  }

  // Initial calculation on page load
  recalculateScores();
});
