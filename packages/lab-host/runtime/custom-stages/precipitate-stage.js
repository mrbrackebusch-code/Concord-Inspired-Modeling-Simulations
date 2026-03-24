(function() {
  var STAGE_ID = "unit-01/lesson-01/mass-change/precipitate";
  var MASS_VALUE = 41.26;
  var POUR_SECONDS = 4.6;
  var VIEWBOX = { x: 250, y: 120, width: 500, height: 650 };
  var SOURCE_ORIGIN = { x: 600, y: 452 };
  var RECEIVER_ORIGIN = { x: 430, y: 470 };
  var SOURCE_LIP = { x: 628, y: 276 };
  var RECEIVER_MOUTH = { x: 448, y: 278 };

  window.RainbowCustomStages = window.RainbowCustomStages || {};

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function mix(start, end, amount) {
    return start + (end - start) * amount;
  }

  function formatMass(value) {
    return value.toFixed(2) + " g";
  }

  function stagedValue(progress, enterEnd, holdEnd, startValue, peakValue, endValue) {
    if (progress <= enterEnd) {
      return mix(startValue, peakValue, progress / enterEnd);
    }
    if (progress <= holdEnd) {
      return peakValue;
    }
    return mix(peakValue, endValue, (progress - holdEnd) / (1 - holdEnd));
  }

  function transformPoint(point, tx, ty, rotationDeg, origin) {
    var angle = rotationDeg * Math.PI / 180;
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    var localX = point.x - origin.x;
    var localY = point.y - origin.y;

    return {
      x: origin.x + localX * cos - localY * sin + tx,
      y: origin.y + localX * sin + localY * cos + ty
    };
  }

  function streamPath(sourcePoint, receiverPoint, arcLift) {
    return [
      "M", sourcePoint.x.toFixed(1), " ", sourcePoint.y.toFixed(1),
      "C", mix(sourcePoint.x, receiverPoint.x, 0.32).toFixed(1), " ", (mix(sourcePoint.y, receiverPoint.y, 0.28) - arcLift).toFixed(1),
      " ", mix(sourcePoint.x, receiverPoint.x, 0.74).toFixed(1), " ", (mix(sourcePoint.y, receiverPoint.y, 0.76) + arcLift * 0.18).toFixed(1),
      " ", receiverPoint.x.toFixed(1), " ", receiverPoint.y.toFixed(1)
    ].join("");
  }

  function markup() {
    return [
      '<section class="custom-stage custom-stage--precipitate">',
      '  <header class="custom-stage__toolbar">',
      '    <div>',
      '      <p class="custom-stage__eyebrow">Reality-First Transfer Stage</p>',
      '      <h3 class="custom-stage__title">Precipitate forms</h3>',
      '      <p class="custom-stage__caption">Measure the paired clear solutions, pour one into the other, and watch the first milky cloud bloom where the liquids meet before the new solid settles.</p>',
      '    </div>',
      '    <div class="custom-stage__meta"><div class="custom-stage__mass-tag"><span class="custom-stage__mass-label">Measured mass</span><strong class="custom-stage__mass-value" data-precipitate-mass-tag>0.00 g</strong></div></div>',
      '  </header>',
      '  <div class="custom-stage__scene"><div class="custom-stage__scene-frame">',
      '    <svg class="custom-stage__svg" viewBox="250 120 500 650" aria-label="Precipitate transfer stage">',
      '      <defs>',
      '        <clipPath id="precipitate-receiver-clip"><path d="M392 258H468V574C468 616 450 640 430 648C410 640 392 616 392 574V258Z"/></clipPath>',
      '        <clipPath id="precipitate-source-clip"><path d="M562 254H638V574C638 616 620 640 600 648C580 640 562 616 562 574V254Z"/></clipPath>',
      '        <linearGradient id="precipitate-clear-liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eefaff" stop-opacity="0.92"/><stop offset="1" stop-color="#b7d7e6" stop-opacity="0.88"/></linearGradient>',
      '        <linearGradient id="precipitate-cloud-liquid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f7f9fa" stop-opacity="0.98"/><stop offset="0.48" stop-color="#d6dee3" stop-opacity="0.98"/><stop offset="1" stop-color="#a1afb7" stop-opacity="0.99"/></linearGradient>',
      '        <linearGradient id="precipitate-sediment" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f4" stop-opacity="0.94"/><stop offset="1" stop-color="#aeb8bf" stop-opacity="0.99"/></linearGradient>',
      '        <linearGradient id="precipitate-stream" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.98"/><stop offset="0.28" stop-color="#f6fbff" stop-opacity="0.99"/><stop offset="0.62" stop-color="#d7e6ef" stop-opacity="0.99"/><stop offset="1" stop-color="#95acba" stop-opacity="0.99"/></linearGradient>',
      '        <filter id="precipitate-cloud-blur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8"/></filter>',
      '      </defs>',
      '      <rect x="160" y="74" width="680" height="648" rx="42" fill="#f9f3e7"/>',
      '      <path d="M186 168C246 118 332 96 434 104C542 112 620 152 700 126C734 116 762 102 792 80" fill="none" stroke="#fffdf4" stroke-opacity="0.88" stroke-width="28" stroke-linecap="round"/>',
      '      <ellipse cx="500" cy="706" rx="190" ry="30" fill="#8299a8" fill-opacity="0.14"/>',
      '      <g id="precipitate-scale-assembly">',
      '        <ellipse cx="500" cy="720" rx="176" ry="20" fill="#6d6d71" fill-opacity="0.22"/>',
      '        <ellipse id="precipitate-scale-tray" cx="500" cy="676" rx="172" ry="24" fill="#707277"/>',
      '        <ellipse cx="500" cy="666" rx="166" ry="18" fill="#8f9197"/>',
      '        <path id="precipitate-scale-body" d="M350 688C374 758 430 800 500 800C570 800 626 758 650 688C631 676 605 670 500 670C395 670 369 676 350 688Z" fill="#de1414" stroke="#931010" stroke-width="6"/>',
      '        <rect x="419" y="713" width="162" height="58" rx="14" fill="#111516" stroke="#414648" stroke-width="4"/>',
      '        <text x="500" y="752" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#ffbc57" letter-spacing="1.4" data-precipitate-scale-readout>0.00</text>',
      '        <text x="586" y="753" font-family="Georgia, serif" font-size="18" fill="#ffbc57" data-precipitate-scale-unit>g</text>',
      '      </g>',
      '      <g id="precipitate-apparatus">',
      '        <ellipse id="precipitate-receiver-shadow" cx="430" cy="652" rx="44" ry="12" fill="#5a6770" fill-opacity="0.16"/>',
      '        <ellipse id="precipitate-source-shadow" cx="600" cy="652" rx="44" ry="12" fill="#5a6770" fill-opacity="0.16"/>',
      '        <g id="precipitate-receiver-group">',
      '          <g clip-path="url(#precipitate-receiver-clip)">',
      '            <rect id="precipitate-receiver-liquid-fill" x="396" y="436" width="68" height="210" rx="18" fill="url(#precipitate-clear-liquid)" opacity="0.94"/>',
      '            <rect id="precipitate-receiver-mix-zone" x="398" y="390" width="64" height="188" rx="18" fill="#eef2f4" fill-opacity="0.74" opacity="0"/>',
      '            <ellipse id="precipitate-receiver-mix-top" cx="434" cy="406" rx="26" ry="12" fill="#fbfcfd" fill-opacity="0.8" opacity="0"/>',
      '            <ellipse id="precipitate-receiver-liquid-surface" cx="430" cy="436" rx="30" ry="8" fill="#f8fdff" opacity="0.9"/>',
      '            <g id="precipitate-cloud-group" opacity="0">',
      '              <ellipse id="precipitate-cloud-entry" cx="440" cy="404" rx="18" ry="12" fill="#f9fbfc" fill-opacity="0.9" filter="url(#precipitate-cloud-blur)"/>',
      '              <path id="precipitate-cloud-plume" d="M430 406C446 416 454 432 454 454C454 478 444 500 430 522C416 500 408 478 408 454C408 432 416 416 430 406Z" fill="#eef2f4" fill-opacity="0.86" filter="url(#precipitate-cloud-blur)"/>',
      '              <path id="precipitate-cloud-tail" d="M444 410C440 428 434 448 428 468C422 486 418 502 416 518" fill="none" stroke="#eef2f4" stroke-opacity="0.72" stroke-width="18" stroke-linecap="round" filter="url(#precipitate-cloud-blur)"/>',
      '              <path id="precipitate-cloud-tail-b" d="M432 416C438 430 442 446 440 462C438 478 434 492 428 506" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round" filter="url(#precipitate-cloud-blur)"/>',
      '              <path id="precipitate-cloud-core" d="M404 418C414 396 430 388 448 394C464 400 474 418 474 440C474 470 458 500 436 520C418 534 402 528 394 514C386 500 388 450 404 418Z" fill="#dde5e9" fill-opacity="0.96" filter="url(#precipitate-cloud-blur)"/>',
      '              <ellipse id="precipitate-cloud-puff-a" cx="430" cy="490" rx="30" ry="24" fill="#edf2f4" fill-opacity="0.84" filter="url(#precipitate-cloud-blur)"/>',
      '              <ellipse id="precipitate-cloud-puff-b" cx="440" cy="448" rx="22" ry="18" fill="#f7fafb" fill-opacity="0.78" filter="url(#precipitate-cloud-blur)"/>',
      '              <ellipse id="precipitate-cloud-puff-c" cx="420" cy="528" rx="24" ry="16" fill="#e4eaee" fill-opacity="0.72" filter="url(#precipitate-cloud-blur)"/>',
      '              <path id="precipitate-cloud-swirl-a" d="M446 424C458 438 462 460 456 482C450 500 440 514 426 524" fill="none" stroke="#ffffff" stroke-opacity="0.42" stroke-width="4.5" stroke-linecap="round"/>',
      '              <path id="precipitate-cloud-swirl-b" d="M414 454C426 468 432 486 430 504C428 518 424 530 416 540" fill="none" stroke="#ecf1f3" stroke-opacity="0.3" stroke-width="4" stroke-linecap="round"/>',
      '              <circle id="precipitate-cloud-speck-a" cx="442" cy="474" r="3.4" fill="#ffffff" fill-opacity="0.72"/>',
      '              <circle id="precipitate-cloud-speck-b" cx="426" cy="512" r="3" fill="#f7fafb" fill-opacity="0.64"/>',
      '              <circle id="precipitate-cloud-speck-c" cx="448" cy="530" r="2.6" fill="#f6f8f9" fill-opacity="0.54"/>',
      '            </g>',
      '            <g id="precipitate-sediment-group" opacity="0">',
      '              <path id="precipitate-sediment-bed" d="M400 620C406 608 418 602 432 602C446 602 456 606 462 616V646H400Z" fill="url(#precipitate-sediment)" opacity="0.96"/>',
      '              <path id="precipitate-sediment-ridge" d="M406 610C420 602 446 602 458 612" fill="none" stroke="#ffffff" stroke-opacity="0.38" stroke-width="3.2" stroke-linecap="round"/>',
      '              <circle id="precipitate-sediment-speck-a" cx="414" cy="616" r="3.2" fill="#f6f7f8" fill-opacity="0.74"/>',
      '              <circle id="precipitate-sediment-speck-b" cx="432" cy="622" r="2.8" fill="#eef2f4" fill-opacity="0.66"/>',
      '              <circle id="precipitate-sediment-speck-c" cx="448" cy="618" r="2.4" fill="#f8fafb" fill-opacity="0.68"/>',
      '            </g>',
      '          </g>',
      '          <path d="M392 258H468" fill="none" stroke="#66696d" stroke-width="8" stroke-linecap="round"/>',
      '          <path d="M392 262V574C392 616 410 640 430 648C450 640 468 616 468 574V262" fill="none" stroke="#6a6d71" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>',
      '          <path d="M406 280C414 422 416 540 414 634" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round"/>',
      '        </g>',
      '        <g id="precipitate-source-group">',
      '          <g clip-path="url(#precipitate-source-clip)">',
      '            <rect id="precipitate-source-liquid-fill" x="566" y="422" width="68" height="224" rx="18" fill="url(#precipitate-clear-liquid)" opacity="0.94"/>',
      '            <ellipse id="precipitate-source-liquid-surface" cx="600" cy="422" rx="30" ry="8" fill="#f8fdff" opacity="0.92"/>',
      '            <path id="precipitate-source-liquid-slosh" d="M568 432C584 422 612 420 632 430V444H568Z" fill="#f4fcff" fill-opacity="0.52"/>',
      '          </g>',
      '          <path d="M562 254H638" fill="none" stroke="#66696d" stroke-width="8" stroke-linecap="round"/>',
      '          <path d="M562 258V574C562 616 580 640 600 648C620 640 638 616 638 574V258" fill="none" stroke="#6a6d71" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>',
      '          <path d="M576 276C584 420 586 540 584 634" fill="none" stroke="#ffffff" stroke-opacity="0.5" stroke-width="10" stroke-linecap="round"/>',
      '        </g>',
      '        <g id="precipitate-stream-group" opacity="0">',
      '          <path id="precipitate-stream-glow" d="M0 0" fill="none" stroke="#fffaf0" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.36"/>',
      '          <path id="precipitate-stream-edge" d="M0 0" fill="none" stroke="#8ca2af" stroke-width="15.4" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.72"/>',
      '          <path id="precipitate-stream-main" d="M0 0" fill="none" stroke="url(#precipitate-stream)" stroke-width="13.2" stroke-linecap="round" stroke-linejoin="round"/>',
      '          <path id="precipitate-stream-sheen" d="M0 0" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.86"/>',
      '          <ellipse id="precipitate-impact-bloom" cx="0" cy="0" rx="12" ry="8" fill="#eef3f5" fill-opacity="0.82" stroke="#ffffff" stroke-opacity="0.56" stroke-width="1.8" opacity="0"/>',
      '          <circle id="precipitate-impact-speck-a" cx="0" cy="0" r="3.2" fill="#ffffff" opacity="0"/>',
      '          <circle id="precipitate-impact-speck-b" cx="0" cy="0" r="2.4" fill="#f2f6f8" opacity="0"/>',
      '          <circle id="precipitate-drip-main" cx="0" cy="0" r="7" fill="#f7fbfd" opacity="0"/>',
      '          <circle id="precipitate-drip-sheen" cx="0" cy="0" r="2.8" fill="#ffffff" opacity="0"/>',
      '        </g>',
      '      </g>',
      '    </svg>',
      '    <canvas class="custom-stage__fx" aria-hidden="true"></canvas>',
      '  </div></div>',
      '  <footer class="custom-stage__footer">',
      '    <div class="custom-stage__statusline" data-precipitate-status>Measure the paired tubes before you begin the transfer.</div>',
      '    <div class="custom-stage__controls">',
      '      <button class="custom-stage__button" data-precipitate-before>Weigh (before)</button>',
      '      <button class="custom-stage__button custom-stage__button--primary" data-precipitate-pour disabled>Pour</button>',
      '      <button class="custom-stage__button custom-stage__button--warm" data-precipitate-after disabled>Weigh (after)</button>',
      '      <button class="custom-stage__button custom-stage__button--ghost" data-precipitate-reset>Reset</button>',
      '    </div>',
      '  </footer>',
      '</section>'
    ].join("");
  }

  function mount(options) {
    var container = options.container;
    var host = options.host;
    var gsap = window.gsap;
    var refs = {};
    var state = {
      beforeMeasured: false,
      pouring: false,
      poured: false,
      afterMeasured: false,
      massTween: null,
      pourTween: null,
      fxFrame: null,
      fxResizeHandler: null,
      fx: {
        progress: 0,
        cloudProgress: 0,
        settleProgress: 0,
        receiverX: 0,
        receiverY: 0,
        receiverRotation: 0,
        receiverScale: 1.42
      }
    };

    if (!container || !host || !gsap) {
      throw new Error("Precipitate custom stage could not boot because the host API or GSAP was unavailable.");
    }

    container.innerHTML = markup();
    refs.status = container.querySelector("[data-precipitate-status]");
    refs.fxCanvas = container.querySelector(".custom-stage__fx");
    refs.massTag = container.querySelector("[data-precipitate-mass-tag]");
    refs.before = container.querySelector("[data-precipitate-before]");
    refs.pour = container.querySelector("[data-precipitate-pour]");
    refs.after = container.querySelector("[data-precipitate-after]");
    refs.reset = container.querySelector("[data-precipitate-reset]");
    refs.readout = container.querySelector("[data-precipitate-scale-readout]");
    refs.unit = container.querySelector("[data-precipitate-scale-unit]");
    refs.scaleTray = container.querySelector("#precipitate-scale-tray");
    refs.scaleBody = container.querySelector("#precipitate-scale-body");
    refs.receiverGroup = container.querySelector("#precipitate-receiver-group");
    refs.receiverShadow = container.querySelector("#precipitate-receiver-shadow");
    refs.receiverFill = container.querySelector("#precipitate-receiver-liquid-fill");
    refs.receiverMixZone = container.querySelector("#precipitate-receiver-mix-zone");
    refs.receiverMixTop = container.querySelector("#precipitate-receiver-mix-top");
    refs.receiverSurface = container.querySelector("#precipitate-receiver-liquid-surface");
    refs.sourceGroup = container.querySelector("#precipitate-source-group");
    refs.sourceShadow = container.querySelector("#precipitate-source-shadow");
    refs.sourceFill = container.querySelector("#precipitate-source-liquid-fill");
    refs.sourceSurface = container.querySelector("#precipitate-source-liquid-surface");
    refs.sourceSlosh = container.querySelector("#precipitate-source-liquid-slosh");
    refs.streamGroup = container.querySelector("#precipitate-stream-group");
    refs.streamGlow = container.querySelector("#precipitate-stream-glow");
    refs.streamEdge = container.querySelector("#precipitate-stream-edge");
    refs.streamMain = container.querySelector("#precipitate-stream-main");
    refs.streamSheen = container.querySelector("#precipitate-stream-sheen");
    refs.impactBloom = container.querySelector("#precipitate-impact-bloom");
    refs.impactSpeckA = container.querySelector("#precipitate-impact-speck-a");
    refs.impactSpeckB = container.querySelector("#precipitate-impact-speck-b");
    refs.dripMain = container.querySelector("#precipitate-drip-main");
    refs.dripSheen = container.querySelector("#precipitate-drip-sheen");
    refs.cloudGroup = container.querySelector("#precipitate-cloud-group");
    refs.cloudEntry = container.querySelector("#precipitate-cloud-entry");
    refs.cloudPlume = container.querySelector("#precipitate-cloud-plume");
    refs.cloudTail = container.querySelector("#precipitate-cloud-tail");
    refs.cloudTailB = container.querySelector("#precipitate-cloud-tail-b");
    refs.cloudCore = container.querySelector("#precipitate-cloud-core");
    refs.cloudPuffA = container.querySelector("#precipitate-cloud-puff-a");
    refs.cloudPuffB = container.querySelector("#precipitate-cloud-puff-b");
    refs.cloudPuffC = container.querySelector("#precipitate-cloud-puff-c");
    refs.cloudSwirlA = container.querySelector("#precipitate-cloud-swirl-a");
    refs.cloudSwirlB = container.querySelector("#precipitate-cloud-swirl-b");
    refs.cloudSpeckA = container.querySelector("#precipitate-cloud-speck-a");
    refs.cloudSpeckB = container.querySelector("#precipitate-cloud-speck-b");
    refs.cloudSpeckC = container.querySelector("#precipitate-cloud-speck-c");
    refs.sedimentGroup = container.querySelector("#precipitate-sediment-group");
    refs.sedimentBed = container.querySelector("#precipitate-sediment-bed");

    function resizeFxCanvas() {
      var rect;
      var dpr;
      if (!refs.fxCanvas) {
        return;
      }
      rect = refs.fxCanvas.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }
      dpr = window.devicePixelRatio || 1;
      refs.fxCanvas.width = Math.round(rect.width * dpr);
      refs.fxCanvas.height = Math.round(rect.height * dpr);
      renderFx(performance.now());
    }

    function clearFx() {
      var ctx = refs.fxCanvas && refs.fxCanvas.getContext ? refs.fxCanvas.getContext("2d") : null;
      if (!ctx || !refs.fxCanvas.width || !refs.fxCanvas.height) {
        return;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, refs.fxCanvas.width, refs.fxCanvas.height);
    }

    function stopFxLoop() {
      if (state.fxFrame !== null) {
        cancelAnimationFrame(state.fxFrame);
        state.fxFrame = null;
      }
    }

    function ensureFxLoop() {
      if (state.fxFrame !== null) {
        return;
      }
      state.fxFrame = requestAnimationFrame(function tick(time) {
        state.fxFrame = requestAnimationFrame(tick);
        renderFx(time);
      });
    }

    function renderFx(timeMs) {
      var ctx;
      var scaleX;
      var scaleY;
      var fx;
      var plumeStrength;
      var settleStrength;
      var i;
      var seed;
      var seedB;
      var swirl;
      var particleX;
      var particleY;
      var radius;
      var alpha;
      var haze;
      var streakX;
      var streakY;
      var trail;

      if (!refs.fxCanvas || !refs.fxCanvas.width || !refs.fxCanvas.height) {
        return;
      }
      ctx = refs.fxCanvas.getContext("2d");
      if (!ctx) {
        return;
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, refs.fxCanvas.width, refs.fxCanvas.height);

      fx = state.fx;
      if (fx.progress <= 0.16) {
        return;
      }

      scaleX = refs.fxCanvas.width / VIEWBOX.width;
      scaleY = refs.fxCanvas.height / VIEWBOX.height;
      ctx.setTransform(scaleX, 0, 0, scaleY, -VIEWBOX.x * scaleX, -VIEWBOX.y * scaleY);

      plumeStrength = clamp((fx.cloudProgress - 0.02) / 0.92, 0, 1);
      settleStrength = fx.settleProgress;

      ctx.save();
      ctx.translate(RECEIVER_ORIGIN.x + fx.receiverX, RECEIVER_ORIGIN.y + fx.receiverY);
      ctx.rotate(fx.receiverRotation * Math.PI / 180);
      ctx.scale(fx.receiverScale, fx.receiverScale);
      ctx.translate(-RECEIVER_ORIGIN.x, -RECEIVER_ORIGIN.y);

      ctx.beginPath();
      ctx.moveTo(392, 258);
      ctx.lineTo(468, 258);
      ctx.lineTo(468, 574);
      ctx.bezierCurveTo(468, 616, 450, 640, 430, 648);
      ctx.bezierCurveTo(410, 640, 392, 616, 392, 574);
      ctx.closePath();
      ctx.clip();

      haze = ctx.createRadialGradient(438, 382, 6, 432, 430, 86);
      haze.addColorStop(0, "rgba(255,255,255," + (0.5 + plumeStrength * 0.24).toFixed(3) + ")");
      haze.addColorStop(0.28, "rgba(246,249,250," + (0.28 + plumeStrength * 0.22).toFixed(3) + ")");
      haze.addColorStop(0.68, "rgba(224,231,235," + (0.18 + plumeStrength * 0.18).toFixed(3) + ")");
      haze.addColorStop(1, "rgba(221,229,234,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(392, 258, 78, 286);

      ctx.fillStyle = "rgba(252,253,253," + (0.12 + plumeStrength * 0.16).toFixed(3) + ")";
      ctx.beginPath();
      ctx.ellipse(436, 390, 24 + plumeStrength * 10, 12 + plumeStrength * 6, 0.1, 0, Math.PI * 2);
      ctx.fill();

      for (i = 0; i < 54; i += 1) {
        seed = (Math.sin(i * 91.17) + 1) / 2;
        seedB = (Math.sin(i * 37.73 + 0.8) + 1) / 2;
        swirl = timeMs * 0.00125 + i * 0.46;
        particleX = 430 + Math.sin(swirl) * (10 + seed * 12 + plumeStrength * 10) + Math.cos(swirl * 0.63) * 5;
        particleY = 356 + seedB * (56 + plumeStrength * 88) + Math.sin(swirl * 1.34 + seed) * 8 + settleStrength * (18 + seed * 28);
        radius = 1.6 + seed * 2.8 + plumeStrength * 0.9;
        alpha = 0.14 + seedB * 0.22 + plumeStrength * 0.2;
        ctx.beginPath();
        ctx.fillStyle = "rgba(248,250,251," + alpha.toFixed(3) + ")";
        ctx.arc(particleX, particleY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (i = 0; i < 18; i += 1) {
        seed = (Math.sin(i * 22.17 + 0.4) + 1) / 2;
        swirl = timeMs * 0.0015 + i * 0.72;
        streakX = 434 + Math.sin(swirl) * (8 + seed * 10);
        streakY = 366 + seed * 88 + Math.cos(swirl * 1.3) * 5 + settleStrength * 18;
        trail = 12 + seed * 14 + plumeStrength * 14;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255,255,255," + (0.12 + plumeStrength * 0.16).toFixed(3) + ")";
        ctx.lineWidth = 1.5 + seed * 0.9;
        ctx.lineCap = "round";
        ctx.moveTo(streakX, streakY);
        ctx.lineTo(streakX - 2.5 + Math.sin(swirl) * 2.2, streakY + trail);
        ctx.stroke();
      }

      if (settleStrength > 0.02) {
        for (i = 0; i < 26; i += 1) {
          seed = (Math.sin(i * 14.13 + 0.2) + 1) / 2;
          particleX = 404 + seed * 54;
          particleY = 598 + ((i % 7) * 4) + settleStrength * 18;
          radius = 1.2 + seed * 2.1;
          ctx.beginPath();
          ctx.fillStyle = "rgba(243,246,247," + (0.16 + settleStrength * 0.24).toFixed(3) + ")";
          ctx.arc(particleX, particleY, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    }

    function setStatus(text) {
      refs.status.textContent = text;
    }

    function setScaleNumeric(value) {
      refs.readout.textContent = value.toFixed(2);
      refs.unit.setAttribute("opacity", "1");
      refs.massTag.textContent = formatMass(value);
    }

    function setScaleText(displayText, tagText) {
      refs.readout.textContent = displayText;
      refs.unit.setAttribute("opacity", "0");
      refs.massTag.textContent = tagText;
    }

    function setProcedure(phase) {
      var statuses = {
        ready: [
          ["completed", "Paired tubes staged"],
          ["active", "Measure the initial mass"],
          ["locked", "Pour unlocks after weighing"],
          ["planned", "Watch the precipitate form"],
          ["planned", "Measure the final mass"]
        ],
        beforeMeasured: [
          ["completed", "Paired tubes staged"],
          ["completed", "Initial mass recorded"],
          ["active", "Pour the solutions together"],
          ["planned", "Watch the precipitate form"],
          ["planned", "Measure the final mass"]
        ],
        pouring: [
          ["completed", "Paired tubes staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Transfer started"],
          ["active", "Watch the cloud form and settle"],
          ["locked", "Measure the final mass after transfer"]
        ],
        poured: [
          ["completed", "Paired tubes staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Transfer complete"],
          ["completed", "New solid formed"],
          ["active", "Measure the final mass"]
        ],
        done: [
          ["completed", "Paired tubes staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Transfer complete"],
          ["completed", "New solid formed"],
          ["completed", "Final mass recorded"]
        ]
      }[phase];

      statuses.forEach(function(item, index) {
        host.setProcedureStep(index, item[0], item[1]);
      });
    }

    function syncButtons() {
      refs.before.disabled = state.beforeMeasured || state.pouring;
      refs.pour.disabled = !state.beforeMeasured || state.pouring || state.poured;
      refs.after.disabled = !state.poured || state.afterMeasured || state.pouring;
      refs.reset.disabled = state.pouring;
    }

    function setReadyEvidence() {
      host.setEvidence({
        currentMass: "--",
        initialMass: "--",
        finalMass: "--",
        deltaMass: "--",
        measurementStable: "Awaiting first measurement",
        boundaryStatus: "Tubes paired on tray",
        beforeSnapshot: "--",
        afterSnapshot: "--",
        activeMistakeFlags: []
      });
    }

    function setBeforeMeasuredEvidence() {
      host.setEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        finalMass: "--",
        deltaMass: "--",
        measurementStable: "Stable",
        boundaryStatus: "Both solutions contained",
        beforeSnapshot: "Paired clear solutions",
        afterSnapshot: "--",
        activeMistakeFlags: []
      });
    }

    function setTransferEvidence() {
      host.setEvidence({
        currentMass: "off tray",
        measurementStable: "Unstable during transfer",
        boundaryStatus: "Transfer in progress",
        afterSnapshot: "Cloud forming in receiver",
        activeMistakeFlags: []
      });
    }

    function setFinalEvidence() {
      host.setEvidence({
        currentMass: formatMass(MASS_VALUE),
        finalMass: formatMass(MASS_VALUE),
        deltaMass: formatMass(0),
        measurementStable: "Stable",
        boundaryStatus: "All liquid contained",
        afterSnapshot: "Cloudy white precipitate in receiver",
        activeMistakeFlags: []
      });
    }

    function pulseScale() {
      gsap.fromTo([refs.scaleTray, refs.scaleBody], { y: 0 }, { y: 7, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out" });
    }

    function animateMass(fromValue, toValue, duration, done) {
      var readout = { value: fromValue };
      if (state.massTween) {
        state.massTween.kill();
      }
      state.massTween = gsap.to(readout, {
        value: toValue,
        duration: duration,
        ease: "power2.out",
        onUpdate: function() {
          setScaleNumeric(readout.value);
        },
        onComplete: function() {
          setScaleNumeric(toValue);
          state.massTween = null;
          if (typeof done === "function") {
            done();
          }
        }
      });
    }

    function applyPourVisual(progress) {
      var apparatusScale = 1.42;
      var p = clamp(progress, 0, 1);
      var transferProgress = clamp((p - 0.18) / 0.62, 0, 1);
      var streamProgress = clamp((p - 0.18) / 0.62, 0, 1);
      var dripProgress = clamp((p - 0.82) / 0.16, 0, 1);
      var cloudProgress = clamp((p - 0.2) / 0.48, 0, 1);
      var settleProgress = clamp((p - 0.6) / 0.4, 0, 1);
      var transforms = {
        source: {
          x: stagedValue(p, 0.22, 0.78, 0, -28, -4),
          y: stagedValue(p, 0.22, 0.78, 0, -110, -8),
          rotation: stagedValue(p, 0.22, 0.78, 0, -56, -4)
        },
        receiver: {
          x: stagedValue(p, 0.22, 0.78, 0, -16, 0),
          y: stagedValue(p, 0.22, 0.78, 0, -28, 0),
          rotation: stagedValue(p, 0.22, 0.78, 0, 8, 0)
        }
      };
      var sourceLip = transformPoint(SOURCE_LIP, transforms.source.x, transforms.source.y, transforms.source.rotation, SOURCE_ORIGIN);
      var receiverMouth = transformPoint(RECEIVER_MOUTH, transforms.receiver.x, transforms.receiver.y, transforms.receiver.rotation, RECEIVER_ORIGIN);
      var streamOpacity = clamp((p - 0.14) / 0.06, 0, 1) * (1 - clamp((p - 0.9) / 0.08, 0, 1) * 0.88);
      var impactOpacity = clamp((p - 0.18) / 0.06, 0, 1) * (1 - settleProgress * 0.18);
      var streamD = streamPath({ x: sourceLip.x - 1, y: sourceLip.y + 1 }, { x: receiverMouth.x - 2, y: receiverMouth.y + 46 }, 122 - streamProgress * 22);

      gsap.set(refs.sourceGroup, { x: transforms.source.x, y: transforms.source.y, rotation: transforms.source.rotation, scale: apparatusScale, svgOrigin: SOURCE_ORIGIN.x + " " + SOURCE_ORIGIN.y });
      gsap.set(refs.receiverGroup, { x: transforms.receiver.x, y: transforms.receiver.y, rotation: transforms.receiver.rotation, scale: apparatusScale, svgOrigin: RECEIVER_ORIGIN.x + " " + RECEIVER_ORIGIN.y });
      gsap.set(refs.sourceShadow, { x: mix(0, -32, clamp(p / 0.28, 0, 1)), y: mix(0, -18, clamp(p / 0.28, 0, 1)), scaleX: 1.18, scaleY: 1.12, opacity: mix(0.16, 0.07, clamp(p / 0.28, 0, 1)) });
      gsap.set(refs.receiverShadow, { x: mix(0, 6, clamp(p / 0.24, 0, 1)), y: mix(0, -6, clamp(p / 0.24, 0, 1)), scaleX: 1.18, scaleY: 1.12, opacity: mix(0.16, 0.09, clamp(p / 0.24, 0, 1)) });
      gsap.set(refs.sourceFill, { attr: { y: mix(422, 546, transferProgress), height: mix(224, 98, transferProgress) }, opacity: mix(0.94, 0.38, transferProgress) });
      gsap.set(refs.sourceSurface, { attr: { cy: mix(422, 546, transferProgress), rx: mix(30, 22, transferProgress) }, opacity: mix(0.92, 0.46, transferProgress) });
      gsap.set(refs.sourceSlosh, {
        attr: {
          d: [
            "M568 ", (434 - transferProgress * 10).toFixed(1),
            "C584 ", (420 - transferProgress * 22).toFixed(1),
            " 612 ", (420 + Math.sin(p * Math.PI * 3) * 5).toFixed(1),
            " 632 ", (434 + Math.sin(p * Math.PI * 2.6) * 4).toFixed(1),
            "V446H568Z"
          ].join("")
        },
        opacity: mix(0.66, 0.14, transferProgress)
      });
      gsap.set(refs.receiverFill, { attr: { y: mix(436, 364, transferProgress), height: mix(210, 282, transferProgress) }, fill: transferProgress > 0.22 ? "url(#precipitate-cloud-liquid)" : "url(#precipitate-clear-liquid)" });
      gsap.set(refs.receiverMixZone, {
        attr: { y: mix(398, 378, cloudProgress), height: mix(84, 214, cloudProgress) },
        opacity: mix(0, 0.76, cloudProgress) * (1 - settleProgress * 0.14)
      });
      gsap.set(refs.receiverMixTop, {
        attr: { cy: mix(414, 392, cloudProgress), rx: mix(12, 28, cloudProgress), ry: mix(4, 14, cloudProgress) },
        opacity: mix(0, 0.9, cloudProgress) * (1 - settleProgress * 0.1)
      });
      gsap.set(refs.receiverSurface, { attr: { cy: mix(436, 356, transferProgress), rx: mix(30, 35, transferProgress) } });
      gsap.set(refs.streamGroup, { opacity: streamOpacity });
      gsap.set(refs.streamGlow, { attr: { d: streamD }, opacity: streamOpacity * 0.52 });
      gsap.set(refs.streamEdge, { attr: { d: streamD }, opacity: streamOpacity * 0.88 });
      gsap.set(refs.streamMain, { attr: { d: streamD }, opacity: streamOpacity });
      gsap.set(refs.streamSheen, { attr: { d: streamD }, opacity: streamOpacity * 0.92 });
      gsap.set(refs.impactBloom, { attr: { cx: receiverMouth.x - 4, cy: receiverMouth.y + 34, rx: mix(0, 34, impactOpacity), ry: mix(0, 20, impactOpacity) }, opacity: impactOpacity });
      gsap.set(refs.impactSpeckA, { attr: { cx: receiverMouth.x + 6, cy: receiverMouth.y + 20, r: mix(0, 4.1, impactOpacity) }, opacity: impactOpacity * 0.9 });
      gsap.set(refs.impactSpeckB, { attr: { cx: receiverMouth.x - 14, cy: receiverMouth.y + 26, r: mix(0, 3.1, impactOpacity) }, opacity: impactOpacity * 0.82 });
      gsap.set(refs.dripMain, { attr: { cx: sourceLip.x - 10 - dripProgress * 12, cy: sourceLip.y + 18 + dripProgress * 34, r: mix(0, 7, dripProgress) }, opacity: dripProgress * 0.9 });
      gsap.set(refs.dripSheen, { attr: { cx: sourceLip.x - 11, cy: sourceLip.y + 15 + dripProgress * 34, r: mix(0, 2.8, dripProgress) }, opacity: dripProgress * 0.82 });
      gsap.set(refs.cloudGroup, { opacity: clamp((p - 0.18) / 0.1, 0, 1) * (0.98 + settleProgress * 0.1), x: mix(14, -2, settleProgress), y: mix(-20, 16, settleProgress) });
      gsap.set(refs.cloudEntry, { x: mix(18, 4, settleProgress), y: mix(-20, 8, settleProgress), scaleX: mix(0.24, 1.22, cloudProgress), scaleY: mix(0.18, 1.1, cloudProgress), opacity: mix(0, 0.98, cloudProgress) * (1 - settleProgress * 0.06) });
      gsap.set(refs.cloudPlume, { x: mix(12, -2, settleProgress), y: mix(-20, 12, settleProgress), scaleX: mix(0.2, 1.12, cloudProgress), scaleY: mix(0.14, 1.18, cloudProgress), transformOrigin: "430px 458px", opacity: mix(0, 0.92, cloudProgress) * (1 - settleProgress * 0.12) });
      gsap.set(refs.cloudTail, { x: mix(16, 0, settleProgress), y: mix(-18, 14, settleProgress), scaleX: mix(0.46, 1.08, cloudProgress), scaleY: mix(0.24, 1.08, cloudProgress), transformOrigin: "440px 412px", opacity: mix(0, 0.88, cloudProgress) * (1 - settleProgress * 0.08) });
      gsap.set(refs.cloudTailB, { x: mix(14, -2, settleProgress), y: mix(-12, 18, settleProgress), scaleX: mix(0.42, 1.04, cloudProgress), scaleY: mix(0.22, 1.04, cloudProgress), transformOrigin: "434px 418px", opacity: mix(0, 0.64, cloudProgress) * (1 - settleProgress * 0.1) });
      gsap.set(refs.cloudCore, { x: mix(12, -2, settleProgress), y: mix(-18, 10, settleProgress), scaleX: mix(0.44, 1.32, cloudProgress), scaleY: mix(0.3, 1.22, cloudProgress), opacity: mix(0.18, 1, cloudProgress) });
      gsap.set(refs.cloudPuffA, { x: mix(14, -4, settleProgress), y: mix(-2, 24, settleProgress), scaleX: mix(0.42, 1.42, cloudProgress), scaleY: mix(0.3, 1.24, cloudProgress), opacity: mix(0.12, 0.96, cloudProgress) });
      gsap.set(refs.cloudPuffB, { x: mix(14, 6, settleProgress), y: mix(-18, 14, settleProgress), scale: mix(0.36, 1.34, cloudProgress), opacity: mix(0.08, 0.9, cloudProgress) });
      gsap.set(refs.cloudPuffC, { x: mix(-4, -4, settleProgress), y: mix(8, 34, settleProgress), scaleX: mix(0.3, 1.26, cloudProgress), scaleY: mix(0.22, 1.12, cloudProgress), opacity: mix(0.06, 0.84, cloudProgress) });
      gsap.set(refs.cloudSwirlA, { rotation: mix(-20, 12, settleProgress), transformOrigin: "446px 478px", opacity: mix(0, 0.5, cloudProgress) });
      gsap.set(refs.cloudSwirlB, { rotation: mix(18, -10, settleProgress), transformOrigin: "422px 500px", opacity: mix(0, 0.38, cloudProgress) });
      gsap.set(refs.cloudSpeckA, { x: mix(4, -6, settleProgress), y: mix(-8, 24, settleProgress), opacity: mix(0, 0.88, cloudProgress) });
      gsap.set(refs.cloudSpeckB, { x: mix(8, -12, settleProgress), y: mix(-2, 32, settleProgress), opacity: mix(0, 0.74, cloudProgress) });
      gsap.set(refs.cloudSpeckC, { x: mix(2, -14, settleProgress), y: mix(4, 38, settleProgress), opacity: mix(0, 0.64, cloudProgress) });
      gsap.set(refs.sedimentGroup, { opacity: clamp((p - 0.48) / 0.18, 0, 1), y: mix(18, 0, clamp((p - 0.48) / 0.18, 0, 1)) });
      gsap.set(refs.sedimentBed, { attr: { d: "M400 620C406 " + mix(616, 592, clamp((p - 0.48) / 0.18, 0, 1)).toFixed(1) + " 418 " + mix(608, 590, clamp((p - 0.48) / 0.18, 0, 1)).toFixed(1) + " 432 " + mix(608, 590, clamp((p - 0.48) / 0.18, 0, 1)).toFixed(1) + "C446 " + mix(608, 592, clamp((p - 0.48) / 0.18, 0, 1)).toFixed(1) + " 456 " + mix(612, 594, clamp((p - 0.48) / 0.18, 0, 1)).toFixed(1) + " 462 616V646H400Z" } });

      state.fx.progress = p;
      state.fx.cloudProgress = cloudProgress;
      state.fx.settleProgress = settleProgress;
      state.fx.receiverX = transforms.receiver.x;
      state.fx.receiverY = transforms.receiver.y;
      state.fx.receiverRotation = transforms.receiver.rotation;
      state.fx.receiverScale = apparatusScale;
      renderFx(performance.now());
    }

    function stopTweens() {
      if (state.massTween) {
        state.massTween.kill();
        state.massTween = null;
      }
      if (state.pourTween) {
        state.pourTween.kill();
        state.pourTween = null;
      }
    }

    function resetScene() {
      stopTweens();
      state.beforeMeasured = false;
      state.pouring = false;
      state.poured = false;
      state.afterMeasured = false;
      applyPourVisual(0);
      setScaleNumeric(0);
      setStatus("Measure the paired tubes before you begin the transfer.");
      setProcedure("ready");
      setReadyEvidence();
      host.setStatus({ interactive: "Custom stage ready", model: "Precipitate transfer stage", evidence: "Awaiting initial measurement" });
      syncButtons();
    }

    function applyBeforeMeasuredState() {
      stopTweens();
      state.beforeMeasured = true;
      applyPourVisual(0);
      setScaleNumeric(MASS_VALUE);
      setProcedure("beforeMeasured");
      setBeforeMeasuredEvidence();
      setStatus("Initial mass captured. Pour the clear solution into the receiving tube and watch where the first cloudy solid appears.");
      host.setStatus({ interactive: "Custom stage ready", model: "Precipitate transfer stage", evidence: "Initial evidence recorded" });
      syncButtons();
    }

    function applyAfterMeasuredState() {
      stopTweens();
      state.beforeMeasured = true;
      state.poured = true;
      state.afterMeasured = true;
      applyPourVisual(1);
      setScaleNumeric(MASS_VALUE);
      setProcedure("done");
      setFinalEvidence();
      setStatus("Final mass recorded. The clear liquids became a cloudy white precipitate, but the measured mass stayed the same.");
      host.setStatus({ interactive: "Custom stage ready", model: "Precipitate transfer stage", evidence: "Locked" });
      host.lockEvidence();
      syncButtons();
    }

    function handleMeasureBefore() {
      if (state.beforeMeasured || state.pouring) {
        return;
      }
      state.beforeMeasured = true;
      syncButtons();
      setProcedure("beforeMeasured");
      setStatus("Initial mass captured. Pour the clear solution into the receiving tube and watch where the first cloudy solid appears.");
      host.emit("precipitate.massRecordedBefore", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Recording initial mass" });
      pulseScale();
      animateMass(0, MASS_VALUE, 1, function() {
        setBeforeMeasuredEvidence();
        host.setStatus({ evidence: "Initial evidence recorded" });
      });
    }

    function handlePour() {
      var progressObject;
      if (!state.beforeMeasured || state.pouring || state.poured) {
        return;
      }
      state.pouring = true;
      syncButtons();
      setProcedure("pouring");
      setStatus("Transfer in progress. Watch the source tube lift and tilt, the stream land in the receiver, and the first white cloud bloom where the liquids meet.");
      setScaleText("LIFT", "off tray");
      setTransferEvidence();
      host.emit("precipitate.pourStarted", { durationSeconds: POUR_SECONDS });
      host.setStatus({ evidence: "Transfer in progress" });
      progressObject = { value: 0 };
      state.pourTween = gsap.to(progressObject, {
        value: 1,
        duration: POUR_SECONDS,
        ease: "power1.inOut",
        onUpdate: function() {
          applyPourVisual(progressObject.value);
        },
        onComplete: function() {
          state.pourTween = null;
          state.pouring = false;
          state.poured = true;
          applyPourVisual(1);
          setProcedure("poured");
          host.setEvidence({ currentMass: "--", measurementStable: "Awaiting final measurement", boundaryStatus: "Mixture returned to tray", afterSnapshot: "Cloudy white precipitate in receiver", activeMistakeFlags: [] });
          setScaleText("0.00", formatMass(0));
          setStatus("The transfer is complete. The source tube is nearly empty, the receiver is cloudy with new solid, and the setup is back on the tray for the final mass.");
          host.emit("precipitate.pourCompleted", { mass: MASS_VALUE });
          host.setStatus({ evidence: "Awaiting final measurement" });
          syncButtons();
        }
      });
    }

    function handleMeasureAfter() {
      if (!state.poured || state.afterMeasured || state.pouring) {
        return;
      }
      state.afterMeasured = true;
      syncButtons();
      setProcedure("done");
      setStatus("Final mass recorded. The clear liquids became a cloudy white precipitate, but the measured mass stayed the same.");
      host.emit("precipitate.massRecordedAfter", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Locking evidence" });
      pulseScale();
      animateMass(MASS_VALUE - 0.08, MASS_VALUE, 0.7, function() {
        setFinalEvidence();
        host.lockEvidence();
      });
    }

    refs.before.addEventListener("click", handleMeasureBefore);
    refs.pour.addEventListener("click", handlePour);
    refs.after.addEventListener("click", handleMeasureAfter);
    refs.reset.addEventListener("click", resetScene);

    state.fxResizeHandler = function() {
      resizeFxCanvas();
    };
    window.addEventListener("resize", state.fxResizeHandler);
    resizeFxCanvas();
    ensureFxLoop();

    resetScene();

    (function maybeRunDebugMode() {
      var params = new URLSearchParams(window.location.search);
      var stageDebug = params.get("stageDebug");
      if (stageDebug === "precipitate-before") {
        applyBeforeMeasuredState();
      } else if (stageDebug === "precipitate-pour") {
        state.beforeMeasured = true;
        state.pouring = true;
        applyPourVisual(0.58);
        setScaleText("LIFT", "off tray");
        setProcedure("pouring");
        setTransferEvidence();
        setStatus("The clear stream enters the receiver, the first milky cloud blooms at the mixing zone, and the suspended solid starts to swirl through the liquid.");
        host.setStatus({ interactive: "Custom stage ready", model: "Precipitate transfer stage", evidence: "Transfer in progress" });
        syncButtons();
      } else if (stageDebug === "precipitate-after") {
        applyAfterMeasuredState();
      }
    }());

    return function dispose() {
      stopTweens();
      stopFxLoop();
      if (state.fxResizeHandler) {
        window.removeEventListener("resize", state.fxResizeHandler);
        state.fxResizeHandler = null;
      }
      refs.before.removeEventListener("click", handleMeasureBefore);
      refs.pour.removeEventListener("click", handlePour);
      refs.after.removeEventListener("click", handleMeasureAfter);
      refs.reset.removeEventListener("click", resetScene);
      clearFx();
      container.innerHTML = "";
    };
  }

  window.RainbowCustomStages[STAGE_ID] = {
    mount: mount
  };
}());
