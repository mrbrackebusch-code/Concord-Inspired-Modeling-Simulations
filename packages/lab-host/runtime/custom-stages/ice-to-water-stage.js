(function() {
  var STAGE_ID = "unit-01/lesson-01/mass-change/ice-to-water";
  var MASS_VALUE = 18.42;
  var MELT_SECONDS = 8;

  window.RainbowCustomStages = window.RainbowCustomStages || {};

  function formatMass(value) {
    return value.toFixed(2) + " g";
  }

  function markup() {
    return [
      '<section class="custom-stage custom-stage--ice">',
      '  <header class="custom-stage__toolbar">',
      '    <div>',
      '      <p class="custom-stage__eyebrow">Reality-First Melt Stage</p>',
      '      <h3 class="custom-stage__title">Ice to water</h3>',
      '      <p class="custom-stage__caption">Measure the beaker, start the melt, and watch the cubes round off, slump, shed runoff, and disappear into the rising water.</p>',
      '    </div>',
      '    <div class="custom-stage__meta">',
      '      <div class="custom-stage__clock">',
      '        <span class="custom-stage__clock-label">Clock</span>',
      '        <strong class="custom-stage__clock-value" data-ice-clock>0 s</strong>',
      '      </div>',
      '      <div class="custom-stage__mass-tag">',
      '        <span class="custom-stage__mass-label">Measured mass</span>',
      '        <strong class="custom-stage__mass-value" data-ice-mass-tag>0.00 g</strong>',
      '      </div>',
      '    </div>',
      '  </header>',
      '  <div class="custom-stage__scene">',
      '    <div class="custom-stage__scene-frame" data-ice-scene-frame>',
      '      <svg class="custom-stage__svg" viewBox="0 0 1000 860" aria-label="Ice melting stage">',
      '        <defs>',
      '          <clipPath id="ice-stage-beaker-interior">',
      '            <path d="M352 122H648V570C648 608 620 638 580 646H420C380 638 352 608 352 570V122Z"/>',
      '          </clipPath>',
      '          <linearGradient id="ice-stage-water" x1="0" y1="0" x2="0" y2="1">',
      '            <stop offset="0" stop-color="#eef9ff" stop-opacity="0.97"/>',
      '            <stop offset="0.55" stop-color="#bdddf1" stop-opacity="0.94"/>',
      '            <stop offset="1" stop-color="#80b9df" stop-opacity="0.98"/>',
      '          </linearGradient>',
      '          <linearGradient id="ice-stage-water-deep" x1="0" y1="0" x2="0" y2="1">',
      '            <stop offset="0" stop-color="#ffffff" stop-opacity="0.26"/>',
      '            <stop offset="1" stop-color="#4a89b3" stop-opacity="0.1"/>',
      '          </linearGradient>',
      '          <radialGradient id="ice-stage-face" cx="30%" cy="24%" r="84%">',
      '            <stop offset="0" stop-color="#ffffff"/>',
      '            <stop offset="0.42" stop-color="#e0f4ff"/>',
      '            <stop offset="1" stop-color="#9fd0ed"/>',
      '          </radialGradient>',
      '          <radialGradient id="ice-stage-soft" cx="36%" cy="28%" r="88%">',
      '            <stop offset="0" stop-color="#ffffff" stop-opacity="0.82"/>',
      '            <stop offset="1" stop-color="#bfe3f6" stop-opacity="0.62"/>',
      '          </radialGradient>',
      '          <filter id="ice-stage-soft-blur" x="-35%" y="-35%" width="170%" height="170%">',
      '            <feGaussianBlur stdDeviation="3.4"/>',
      '          </filter>',
      '          <filter id="ice-stage-slush-blur" x="-35%" y="-35%" width="170%" height="170%">',
      '            <feGaussianBlur stdDeviation="4.2"/>',
      '          </filter>',
      '        </defs>',
      '        <rect x="160" y="74" width="680" height="648" rx="42" fill="#f9f3e7"/>',
      '        <path d="M196 176C248 122 333 98 434 104C538 110 626 145 692 128C730 118 760 102 790 78" fill="none" stroke="#fffdf6" stroke-opacity="0.88" stroke-width="26" stroke-linecap="round"/>',
      '        <ellipse cx="500" cy="700" rx="190" ry="30" fill="#7d98aa" fill-opacity="0.14"/>',
      '        <g id="ice-scale-assembly">',
      '          <ellipse cx="500" cy="720" rx="176" ry="20" fill="#6d6d71" fill-opacity="0.22"/>',
      '          <ellipse id="ice-scale-tray" cx="500" cy="676" rx="172" ry="24" fill="#707277"/>',
      '          <ellipse cx="500" cy="666" rx="166" ry="18" fill="#8f9197"/>',
      '          <path id="ice-scale-body" d="M350 688C374 758 430 800 500 800C570 800 626 758 650 688C631 676 605 670 500 670C395 670 369 676 350 688Z" fill="#de1414" stroke="#931010" stroke-width="6"/>',
      '          <rect x="419" y="713" width="162" height="58" rx="14" fill="#111516" stroke="#414648" stroke-width="4"/>',
      '          <text x="500" y="752" text-anchor="middle" font-family="Georgia, serif" font-size="38" fill="#ffbc57" letter-spacing="2" data-ice-scale-readout>0.00</text>',
      '          <text x="586" y="753" font-family="Georgia, serif" font-size="18" fill="#ffbc57">g</text>',
      '        </g>',
      '        <g id="ice-beaker-assembly">',
      '          <ellipse id="ice-beaker-shadow" cx="500" cy="626" rx="106" ry="22" fill="#98adba" fill-opacity="0.18"/>',
      '          <g clip-path="url(#ice-stage-beaker-interior)">',
      '            <rect id="ice-water-fill" x="352" y="438" width="296" height="208" rx="28" fill="url(#ice-stage-water)" opacity="0.97"/>',
      '            <rect id="ice-water-depth" x="352" y="470" width="296" height="176" rx="28" fill="url(#ice-stage-water-deep)" opacity="0.78"/>',
      '            <ellipse id="ice-water-surface" cx="500" cy="438" rx="132" ry="22" fill="#f7fcff" opacity="0.84"/>',
      '            <path id="ice-surface-highlight" d="M388 430C426 417 468 414 511 418C561 422 603 435 631 455" fill="none" stroke="#ffffff" stroke-opacity="0.52" stroke-width="8" stroke-linecap="round"/>',
      '            <path id="ice-caustic-a" d="M386 486C426 500 463 505 506 501C548 497 590 484 626 466" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="7" stroke-linecap="round"/>',
      '            <path id="ice-caustic-b" d="M398 538C438 552 474 557 514 554C553 551 590 540 620 525" fill="none" stroke="#f0fbff" stroke-opacity="0.12" stroke-width="6" stroke-linecap="round"/>',
      '            <path id="ice-ripple-a" d="M392 468C432 482 474 486 516 482C559 478 598 468 630 452" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="6" stroke-linecap="round"/>',
      '            <path id="ice-ripple-b" d="M404 514C439 526 476 531 514 528C553 525 589 515 619 500" fill="none" stroke="#ebf8ff" stroke-opacity="0.1" stroke-width="4" stroke-linecap="round"/>',
      '            <g id="ice-slush-back" opacity="0" filter="url(#ice-stage-slush-blur)">',
      '              <path d="M384 478C410 460 457 451 509 453C566 455 613 473 626 499C636 520 625 542 596 554C565 567 519 572 466 567C423 563 388 551 373 531C360 513 365 492 384 478Z" fill="#eefaff" fill-opacity="0.46"/>',
      '            </g>',
      '            <g id="ice-cube-a">',
      '              <path d="M398 386L454 352L510 386L454 420Z" fill="url(#ice-stage-face)" stroke="#74add5" stroke-width="4"/>',
      '              <path d="M398 386V468L454 502V420Z" fill="#dff4fe" stroke="#74add5" stroke-width="3"/>',
      '              <path d="M510 386V468L454 502V420Z" fill="#badff4" stroke="#74add5" stroke-width="3"/>',
      '              <path d="M418 396L448 374" fill="none" stroke="#ffffff" stroke-opacity="0.68" stroke-width="4" stroke-linecap="round"/>',
      '            </g>',
      '            <g id="ice-cube-b">',
      '              <path d="M520 348L574 316L628 348L574 380Z" fill="url(#ice-stage-face)" stroke="#72abd4" stroke-width="4"/>',
      '              <path d="M520 348V432L574 464V380Z" fill="#e3f5fe" stroke="#72abd4" stroke-width="3"/>',
      '              <path d="M628 348V432L574 464V380Z" fill="#bedff2" stroke="#72abd4" stroke-width="3"/>',
      '              <path d="M540 360L568 339" fill="none" stroke="#ffffff" stroke-opacity="0.64" stroke-width="4" stroke-linecap="round"/>',
      '            </g>',
      '            <g id="ice-cube-c">',
      '              <path d="M468 286L508 262L548 286L508 310Z" fill="url(#ice-stage-face)" stroke="#74add5" stroke-width="3.4"/>',
      '              <path d="M468 286V344L508 368V310Z" fill="#e5f6fe" stroke="#74add5" stroke-width="2.6"/>',
      '              <path d="M548 286V344L508 368V310Z" fill="#c3e5f7" stroke="#74add5" stroke-width="2.6"/>',
      '            </g>',
      '            <g id="ice-soft-a" opacity="0" filter="url(#ice-stage-soft-blur)">',
      '              <path d="M380 430C393 394 433 373 482 379C538 386 578 417 581 456C584 494 552 526 501 536C449 546 401 534 377 506C363 490 367 455 380 430Z" fill="url(#ice-stage-soft)" stroke="#a6d2ea" stroke-width="3"/>',
      '              <path d="M417 432C455 445 500 447 544 438" fill="none" stroke="#ffffff" stroke-opacity="0.46" stroke-width="4" stroke-linecap="round"/>',
      '            </g>',
      '            <g id="ice-soft-b" opacity="0" filter="url(#ice-stage-soft-blur)">',
      '              <path d="M520 412C530 392 553 381 583 381C616 382 639 398 642 420C644 445 629 466 601 474C570 483 541 478 526 462C514 449 512 427 520 412Z" fill="url(#ice-stage-soft)" fill-opacity="0.88" stroke="#afd6ec" stroke-width="2.6"/>',
      '            </g>',
      '            <g id="ice-soft-c" opacity="0" filter="url(#ice-stage-soft-blur)">',
      '              <path d="M476 370C484 356 500 348 518 348C538 349 553 359 556 373C559 391 548 405 529 412C510 420 489 418 478 407C469 398 469 382 476 370Z" fill="url(#ice-stage-soft)" fill-opacity="0.76" stroke="#b7dced" stroke-width="2.2"/>',
      '            </g>',
      '            <g id="ice-fragment-a" opacity="0">',
      '              <ellipse cx="432" cy="498" rx="14" ry="10" fill="#eefaff" fill-opacity="0.7" stroke="#afd5eb" stroke-width="2"/>',
      '            </g>',
      '            <g id="ice-fragment-b" opacity="0">',
      '              <ellipse cx="554" cy="488" rx="18" ry="12" fill="#effbff" fill-opacity="0.64" stroke="#b5d9ec" stroke-width="2"/>',
      '            </g>',
      '            <g id="ice-fragment-c" opacity="0">',
      '              <ellipse cx="502" cy="518" rx="20" ry="11" fill="#f6fcff" fill-opacity="0.52" stroke="#c0dfef" stroke-width="2"/>',
      '            </g>',
      '            <g id="ice-slush-front" opacity="0" filter="url(#ice-stage-slush-blur)">',
      '              <path d="M386 510C423 491 471 484 525 487C578 490 617 507 626 529C635 553 618 575 582 586C544 599 493 602 443 595C401 589 370 574 361 553C352 535 362 521 386 510Z" fill="#effbff" fill-opacity="0.62"/>',
      '              <path d="M420 520C462 534 514 537 565 528" fill="none" stroke="#ffffff" stroke-opacity="0.34" stroke-width="4" stroke-linecap="round"/>',
      '            </g>',
      '            <path id="ice-runoff-a" d="M446 414C445 432 444 450 443 470" fill="none" stroke="#f9fdff" stroke-opacity="0" stroke-width="5" stroke-linecap="round"/>',
      '            <path id="ice-runoff-b" d="M574 390C574 412 573 435 571 458" fill="none" stroke="#f6fcff" stroke-opacity="0" stroke-width="4" stroke-linecap="round"/>',
      '            <path id="ice-runoff-c" d="M506 336C507 350 507 365 505 382" fill="none" stroke="#fbfeff" stroke-opacity="0" stroke-width="3.5" stroke-linecap="round"/>',
      '          </g>',
      '          <path d="M352 118H648" fill="none" stroke="#66696d" stroke-width="8" stroke-linecap="round"/>',
      '          <path d="M352 122V570C352 608 380 638 420 646H580C620 638 648 608 648 570V122" fill="none" stroke="#6a6d71" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
      '          <path d="M385 148C398 310 404 476 407 618" fill="none" stroke="#ffffff" stroke-opacity="0.48" stroke-width="12" stroke-linecap="round"/>',
      '          <path d="M614 148C603 314 598 480 594 618" fill="none" stroke="#e5eff6" stroke-opacity="0.32" stroke-width="7" stroke-linecap="round"/>',
      '        </g>',
      '      </svg>',
      '      <canvas class="custom-stage__fx" aria-hidden="true"></canvas>',
      '    </div>',
      '  </div>',
      '  <footer class="custom-stage__footer">',
      '    <div class="custom-stage__statusline" data-ice-status>Weigh the setup to establish the starting mass.</div>',
      '    <div class="custom-stage__controls">',
      '      <button class="custom-stage__button" data-ice-before>Weigh (before)</button>',
      '      <button class="custom-stage__button custom-stage__button--primary" data-ice-start disabled>Start melt</button>',
      '      <button class="custom-stage__button custom-stage__button--warm" data-ice-after disabled>Weigh (after)</button>',
      '      <button class="custom-stage__button custom-stage__button--ghost" data-ice-reset>Reset</button>',
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
      meltRunning: false,
      meltCompleted: false,
      afterMeasured: false,
      clockSeconds: 0,
      meltTimeline: null,
      massTween: null
    };

    if (!container || !host || !gsap) {
      throw new Error("Ice custom stage could not boot because the host API or GSAP was unavailable.");
    }

    container.innerHTML = markup();

    refs.clock = container.querySelector("[data-ice-clock]");
    refs.massTag = container.querySelector("[data-ice-mass-tag]");
    refs.status = container.querySelector("[data-ice-status]");
    refs.before = container.querySelector("[data-ice-before]");
    refs.start = container.querySelector("[data-ice-start]");
    refs.after = container.querySelector("[data-ice-after]");
    refs.reset = container.querySelector("[data-ice-reset]");
    refs.readout = container.querySelector("[data-ice-scale-readout]");
    refs.tray = container.querySelector("#ice-scale-tray");
    refs.scaleBody = container.querySelector("#ice-scale-body");
    refs.beaker = container.querySelector("#ice-beaker-assembly");
    refs.beakerShadow = container.querySelector("#ice-beaker-shadow");
    refs.waterFill = container.querySelector("#ice-water-fill");
    refs.waterDepth = container.querySelector("#ice-water-depth");
    refs.waterSurface = container.querySelector("#ice-water-surface");
    refs.surfaceHighlight = container.querySelector("#ice-surface-highlight");
    refs.causticA = container.querySelector("#ice-caustic-a");
    refs.causticB = container.querySelector("#ice-caustic-b");
    refs.rippleA = container.querySelector("#ice-ripple-a");
    refs.rippleB = container.querySelector("#ice-ripple-b");
    refs.cubeA = container.querySelector("#ice-cube-a");
    refs.cubeB = container.querySelector("#ice-cube-b");
    refs.cubeC = container.querySelector("#ice-cube-c");
    refs.softA = container.querySelector("#ice-soft-a");
    refs.softB = container.querySelector("#ice-soft-b");
    refs.softC = container.querySelector("#ice-soft-c");
    refs.fragmentA = container.querySelector("#ice-fragment-a");
    refs.fragmentB = container.querySelector("#ice-fragment-b");
    refs.fragmentC = container.querySelector("#ice-fragment-c");
    refs.slushBack = container.querySelector("#ice-slush-back");
    refs.slushFront = container.querySelector("#ice-slush-front");
    refs.runoffA = container.querySelector("#ice-runoff-a");
    refs.runoffB = container.querySelector("#ice-runoff-b");
    refs.runoffC = container.querySelector("#ice-runoff-c");

    function setStatus(text) {
      refs.status.textContent = text;
    }

    function setClock(value) {
      state.clockSeconds = value;
      refs.clock.textContent = Math.round(value) + " s";
    }

    function setScaleReadout(value) {
      refs.readout.textContent = value.toFixed(2);
      refs.massTag.textContent = formatMass(value);
    }

    function setProcedure(phase) {
      var statuses;

      if (phase === "ready") {
        statuses = [
          ["completed", "Ice sample staged"],
          ["active", "Measure the initial mass"],
          ["locked", "Melting unlocks after weighing"],
          ["planned", "Watch the melting process"],
          ["planned", "Measure the final mass"]
        ];
      } else if (phase === "beforeMeasured") {
        statuses = [
          ["completed", "Ice sample staged"],
          ["completed", "Initial mass recorded"],
          ["active", "Start the melt"],
          ["planned", "Watch the melting process"],
          ["planned", "Measure the final mass"]
        ];
      } else if (phase === "melting") {
        statuses = [
          ["completed", "Ice sample staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Melting started"],
          ["active", "Watch the melting process"],
          ["locked", "Measure the final mass after the melt"]
        ];
      } else if (phase === "melted") {
        statuses = [
          ["completed", "Ice sample staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Melting started"],
          ["completed", "Melting complete"],
          ["active", "Measure the final mass"]
        ];
      } else {
        statuses = [
          ["completed", "Ice sample staged"],
          ["completed", "Initial mass recorded"],
          ["completed", "Melting started"],
          ["completed", "Melting complete"],
          ["completed", "Final mass recorded"]
        ];
      }

      statuses.forEach(function(item, index) {
        host.setProcedureStep(index, item[0], item[1]);
      });
    }

    function syncButtons() {
      refs.before.disabled = state.beforeMeasured || state.meltRunning;
      refs.start.disabled = !state.beforeMeasured || state.meltRunning || state.meltCompleted;
      refs.after.disabled = !state.meltCompleted || state.afterMeasured || state.meltRunning;
      refs.reset.disabled = state.meltRunning;
    }

    function syncEvidence(patch) {
      host.setEvidence(patch);
    }

    function pulseScale() {
      gsap.fromTo([refs.tray, refs.scaleBody], { y: 0 }, {
        y: 7,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
      gsap.fromTo(refs.beaker, { y: gsap.getProperty(refs.beaker, "y") }, {
        y: Number(gsap.getProperty(refs.beaker, "y")) + 5,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
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
          setScaleReadout(readout.value);
        },
        onComplete: function() {
          setScaleReadout(toValue);
          state.massTween = null;
          if (done) {
            done();
          }
        }
      });
    }

    function resetVisuals() {
      gsap.set(refs.beaker, { x: 0, y: -26, scale: 1, rotation: 0, transformOrigin: "50% 70%" });
      gsap.set(refs.beakerShadow, { scaleX: 0.92, opacity: 0.18, transformOrigin: "50% 50%" });
      gsap.set(refs.waterFill, { attr: { y: 438, height: 208 } });
      gsap.set(refs.waterDepth, { attr: { y: 470, height: 176 }, opacity: 0.78 });
      gsap.set(refs.waterSurface, { attr: { cy: 438, rx: 132, ry: 22 } });
      gsap.set(refs.surfaceHighlight, {
        attr: { d: "M388 430C426 417 468 414 511 418C561 422 603 435 631 455" },
        opacity: 0.52,
        x: 0,
        y: 0
      });
      gsap.set(refs.causticA, { opacity: 0.14, x: 0, y: 0 });
      gsap.set(refs.causticB, { opacity: 0.12, x: 0, y: 0 });
      gsap.set(refs.rippleA, { opacity: 0.18, x: 0, y: 0 });
      gsap.set(refs.rippleB, { opacity: 0.1, x: 0, y: 0 });
      [refs.cubeA, refs.cubeB, refs.cubeC].forEach(function(node) {
        gsap.set(node, { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1, transformOrigin: "50% 50%" });
      });
      [refs.softA, refs.softB, refs.softC, refs.fragmentA, refs.fragmentB, refs.fragmentC, refs.slushBack, refs.slushFront].forEach(function(node) {
        gsap.set(node, { x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0, opacity: 0, transformOrigin: "50% 50%" });
      });
      [refs.runoffA, refs.runoffB, refs.runoffC].forEach(function(node) {
        gsap.set(node, { attr: { "stroke-opacity": 0 } });
      });
    }

    function setReadyEvidence() {
      syncEvidence({
        currentMass: "0.00 g",
        initialMass: "--",
        finalMass: "--",
        deltaMass: "--",
        measurementStable: "Awaiting initial measurement",
        boundaryStatus: "Closed melt setup intact",
        beforeSnapshot: "--",
        afterSnapshot: "--",
        activeMistakeFlags: []
      });
    }

    function setMeasuredEvidence() {
      syncEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        measurementStable: "Stable",
        boundaryStatus: "Closed melt setup intact",
        beforeSnapshot: "ice-before-custom-stage"
      });
    }

    function setMeltingEvidence() {
      syncEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        measurementStable: "Observing melt",
        boundaryStatus: "Closed melt setup intact",
        beforeSnapshot: "ice-before-custom-stage"
      });
    }

    function setFinalEvidence() {
      syncEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        finalMass: formatMass(MASS_VALUE),
        deltaMass: "0.00 g",
        measurementStable: "Stable",
        boundaryStatus: "Closed melt setup intact",
        beforeSnapshot: "ice-before-custom-stage",
        afterSnapshot: "ice-after-custom-stage"
      });
    }

    function ensureTimeline() {
      if (!state.meltTimeline) {
        state.meltTimeline = buildMeltTimeline();
      }
      return state.meltTimeline;
    }

    function applyBeforeMeasuredState() {
      state.beforeMeasured = true;
      state.meltRunning = false;
      state.meltCompleted = false;
      state.afterMeasured = false;
      setClock(0);
      setScaleReadout(MASS_VALUE);
      resetVisuals();
      setProcedure("beforeMeasured");
      setStatus("Initial mass captured. Start the melt and watch the edges round off, runoff feed the beaker, and the cubes disappear into the water.");
      setMeasuredEvidence();
      host.setStatus({
        interactive: "Custom stage ready",
        model: "Ice animation stage",
        evidence: "Initial evidence recorded"
      });
      syncButtons();
    }

    function applyMeltPreviewState(progress) {
      var timeline;

      applyBeforeMeasuredState();
      timeline = ensureTimeline();
      timeline.pause(0);
      timeline.progress(progress, true);
      state.meltRunning = true;
      state.meltCompleted = false;
      state.afterMeasured = false;
      setClock(MELT_SECONDS * progress);
      setScaleReadout(MASS_VALUE);
      setProcedure("melting");
      setStatus("Melting in progress. The cubes are softening, sloughing off runoff, and collapsing into the water.");
      setMeltingEvidence();
      host.setStatus({
        interactive: "Custom stage ready",
        model: "Ice animation stage",
        evidence: "Melting in progress"
      });
      syncButtons();
    }

    function applyAfterMeasuredState() {
      var timeline;

      applyBeforeMeasuredState();
      timeline = ensureTimeline();
      timeline.pause(0);
      timeline.progress(1, true);
      state.meltRunning = false;
      state.meltCompleted = true;
      state.afterMeasured = true;
      setClock(MELT_SECONDS);
      setScaleReadout(MASS_VALUE);
      setProcedure("done");
      setStatus("Final mass recorded. The form changed from hard ice to liquid water, but the measured mass stayed the same.");
      setFinalEvidence();
      host.setStatus({
        interactive: "Custom stage ready",
        model: "Ice animation stage",
        evidence: "Locked"
      });
      host.lockEvidence();
      syncButtons();
    }

    function resetScene() {
      if (state.massTween) {
        state.massTween.kill();
        state.massTween = null;
      }

      if (state.meltTimeline) {
        state.meltTimeline.kill();
        state.meltTimeline = null;
      }

      state.beforeMeasured = false;
      state.meltRunning = false;
      state.meltCompleted = false;
      state.afterMeasured = false;
      setClock(0);
      setScaleReadout(0);
      resetVisuals();
      setProcedure("ready");
      setStatus("Weigh the setup to establish the starting mass.");
      syncButtons();
      host.setStatus({
        interactive: "Custom stage ready",
        model: "Ice animation stage",
        evidence: "Awaiting first measurement"
      });
      setReadyEvidence();
      host.emit("ice.stageReady", { experimentId: STAGE_ID });
    }

    function buildMeltTimeline() {
      var clock = { value: 0 };
      var tl = gsap.timeline({
        paused: true,
        defaults: { ease: "sine.inOut" },
        onComplete: function() {
          state.meltRunning = false;
          state.meltCompleted = true;
          setClock(MELT_SECONDS);
          setProcedure("melted");
          setStatus("The ice has finished melting. Measure the final mass.");
          syncEvidence({
            currentMass: formatMass(MASS_VALUE),
            measurementStable: "Stable",
            boundaryStatus: "Closed melt setup intact",
            afterSnapshot: "ice-after-custom-stage"
          });
          host.setStatus({ evidence: "Awaiting final measurement" });
          host.emit("ice.meltCompleted", { durationSeconds: MELT_SECONDS });
          syncButtons();
        }
      });

      tl.to(clock, {
        value: MELT_SECONDS,
        duration: 7.8,
        ease: "none",
        onUpdate: function() {
          setClock(clock.value);
        }
      }, 0);
      tl.to(refs.waterFill, { attr: { y: 396, height: 250 }, duration: 7.8 }, 0);
      tl.to(refs.waterDepth, { attr: { y: 424, height: 222 }, duration: 7.8 }, 0);
      tl.to(refs.waterSurface, { attr: { cy: 396, rx: 138, ry: 24 }, duration: 7.8 }, 0);
      tl.to(refs.surfaceHighlight, {
        attr: { d: "M380 390C428 374 472 372 517 377C569 382 614 397 640 422" },
        opacity: 0.78,
        duration: 7.8
      }, 0);
      tl.to(refs.causticA, { opacity: 0.28, x: 18, y: -6, duration: 2.8, repeat: 1, yoyo: true }, 0.4);
      tl.to(refs.causticB, { opacity: 0.24, x: -20, y: -8, duration: 3.2, repeat: 1, yoyo: true }, 1.1);
      tl.to(refs.rippleA, { opacity: 0.34, y: -18, duration: 2.5, repeat: 1, yoyo: true }, 0.7);
      tl.to(refs.rippleB, { opacity: 0.28, y: -22, duration: 2.8, repeat: 1, yoyo: true }, 1.8);
      tl.to(refs.cubeA, { x: -76, y: 130, scale: 0.36, rotation: -22, opacity: 0.04, duration: 7.4 }, 0);
      tl.to(refs.cubeB, { x: 86, y: 126, scale: 0.34, rotation: 18, opacity: 0.03, duration: 7.4 }, 0.12);
      tl.to(refs.cubeC, { x: 10, y: 146, scale: 0.06, rotation: 14, opacity: 0, duration: 5.8 }, 0);
      tl.to(refs.softA, { x: -44, y: 78, scaleX: 1.12, scaleY: 1.08, opacity: 0.7, duration: 2.5 }, 0.8);
      tl.to(refs.softA, { y: 112, scaleX: 1.34, scaleY: 0.92, opacity: 0.18, duration: 2.7 }, 3.6);
      tl.to(refs.softA, { opacity: 0.02, duration: 1.6 }, 6.0);
      tl.to(refs.softB, { x: 48, y: 72, scaleX: 1.1, scaleY: 1.04, opacity: 0.66, duration: 2.4 }, 1.1);
      tl.to(refs.softB, { y: 102, scaleX: 1.25, scaleY: 0.88, opacity: 0.14, duration: 2.5 }, 3.9);
      tl.to(refs.softB, { opacity: 0.02, duration: 1.4 }, 6.2);
      tl.to(refs.softC, { y: 56, scale: 1.08, opacity: 0.56, duration: 1.8 }, 0.9);
      tl.to(refs.softC, { y: 116, x: -8, scaleX: 1.18, scaleY: 0.78, opacity: 0.08, duration: 2.3 }, 2.6);
      tl.to(refs.fragmentA, { x: -28, y: 20, scale: 1.12, opacity: 0.54, duration: 2.2 }, 3.1);
      tl.to(refs.fragmentA, { y: 46, opacity: 0.1, duration: 2.1 }, 5.1);
      tl.to(refs.fragmentB, { x: 22, y: 24, scaleX: 1.2, scaleY: 1.04, opacity: 0.48, duration: 2.4 }, 3.5);
      tl.to(refs.fragmentB, { y: 50, opacity: 0.08, duration: 2 }, 5.7);
      tl.to(refs.fragmentC, { y: 14, scaleX: 1.12, scaleY: 0.96, opacity: 0.42, duration: 2 }, 4.1);
      tl.to(refs.fragmentC, { y: 36, opacity: 0.06, duration: 1.8 }, 5.9);
      tl.to(refs.slushBack, { y: 16, scaleX: 1.12, scaleY: 1.03, opacity: 0.54, duration: 2.5 }, 3.8);
      tl.to(refs.slushBack, { y: 28, scaleX: 1.22, scaleY: 1.02, opacity: 0.34, duration: 2.3 }, 5.4);
      tl.to(refs.slushFront, { y: 18, scaleX: 1.08, scaleY: 1.02, opacity: 0.7, duration: 2.3 }, 4.4);
      tl.to(refs.slushFront, { y: 30, scaleX: 1.18, scaleY: 1.01, opacity: 0.42, duration: 2.1 }, 6.0);
      tl.to(refs.runoffA, { attr: { "stroke-opacity": 0.42 }, duration: 1.2 }, 0.8);
      tl.to(refs.runoffA, { attr: { "stroke-opacity": 0.06 }, duration: 1.7 }, 2.7);
      tl.to(refs.runoffB, { attr: { "stroke-opacity": 0.34 }, duration: 1.1 }, 1.4);
      tl.to(refs.runoffB, { attr: { "stroke-opacity": 0.04 }, duration: 1.5 }, 3.2);
      tl.to(refs.runoffC, { attr: { "stroke-opacity": 0.28 }, duration: 0.9 }, 0.3);
      tl.to(refs.runoffC, { attr: { "stroke-opacity": 0.02 }, duration: 1.2 }, 1.8);
      tl.to(refs.beakerShadow, { scaleX: 0.98, duration: 7.8 }, 0);

      return tl;
    }

    function handleMeasureBefore() {
      if (state.beforeMeasured || state.meltRunning) {
        return;
      }

      state.beforeMeasured = true;
      syncButtons();
      setStatus("Initial mass captured. Start the melt and watch the cubes round off, slump, and disappear into the water.");
      setProcedure("beforeMeasured");
      pulseScale();
      host.emit("ice.massRecordedBefore", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Recording initial mass" });
      animateMass(0, MASS_VALUE, 1, function() {
        setMeasuredEvidence();
        host.setStatus({ evidence: "Initial evidence recorded" });
      });
    }

    function handleStartMelt() {
      if (!state.beforeMeasured || state.meltRunning || state.meltCompleted) {
        return;
      }

      state.meltRunning = true;
      syncButtons();
      setProcedure("melting");
      setStatus("Melting in progress. Watch the corners soften, runoff feed the beaker, and the last rounded remnants give way.");
      setMeltingEvidence();
      host.emit("ice.meltStarted", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Melting in progress" });
      ensureTimeline().restart();
    }

    function handleMeasureAfter() {
      if (!state.meltCompleted || state.afterMeasured || state.meltRunning) {
        return;
      }

      state.afterMeasured = true;
      syncButtons();
      setProcedure("done");
      setStatus("Final mass recorded. The ice became liquid water, but the measured mass stayed the same.");
      host.emit("ice.massRecordedAfter", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Locking evidence" });
      pulseScale();
      animateMass(MASS_VALUE - 0.08, MASS_VALUE, 0.65, function() {
        setFinalEvidence();
        host.lockEvidence();
      });
    }

    refs.before.addEventListener("click", handleMeasureBefore);
    refs.start.addEventListener("click", handleStartMelt);
    refs.after.addEventListener("click", handleMeasureAfter);
    refs.reset.addEventListener("click", resetScene);

    resetScene();

    (function maybeRunDebugMode() {
      var params = new URLSearchParams(window.location.search);
      var stageDebug = params.get("stageDebug");

      if (stageDebug === "ice-before") {
        applyBeforeMeasuredState();
      } else if (stageDebug === "ice-melt") {
        applyMeltPreviewState(0.62);
      } else if (stageDebug === "ice-after") {
        applyAfterMeasuredState();
      }
    }());

    return function dispose() {
      if (state.massTween) {
        state.massTween.kill();
      }
      if (state.meltTimeline) {
        state.meltTimeline.kill();
      }
      refs.before.removeEventListener("click", handleMeasureBefore);
      refs.start.removeEventListener("click", handleStartMelt);
      refs.after.removeEventListener("click", handleMeasureAfter);
      refs.reset.removeEventListener("click", resetScene);
      container.innerHTML = "";
    };
  }

  window.RainbowCustomStages[STAGE_ID] = {
    mount: mount
  };
}());
