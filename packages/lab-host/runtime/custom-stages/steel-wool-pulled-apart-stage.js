(function() {
  var STAGE_ID = "unit-01/lesson-01/mass-change/steel-wool-pulled-apart";
  var MASS_VALUE = 4.82;
  var HANDLE_HOME = { x: 612, y: 434 };
  var HANDLE_MAX = { x: 792, y: 252 };
  var HANDLE_SETTLED = { x: 650, y: 390 };
  var SPREAD_THRESHOLD = 0.66;
  var TIGHT_PATHS = [
    "M430 492C438 454 478 444 512 458C548 474 560 514 534 534C506 554 454 548 432 518",
    "M410 470C436 436 484 428 524 444C558 458 574 490 568 520C560 548 528 566 486 564C444 562 406 532 410 470",
    "M442 526C418 500 420 456 456 438C492 420 548 436 566 474C584 512 562 552 520 562C482 572 458 554 442 526",
    "M454 450C482 438 520 444 542 470C562 494 560 528 536 546C510 564 468 562 444 540C424 520 428 468 454 450",
    "M430 508C458 484 500 478 534 494C554 504 564 522 560 538C556 558 530 572 492 574C456 576 424 562 414 538C408 524 414 514 430 508",
    "M452 430C476 424 506 430 530 444C556 460 568 482 564 500C560 520 536 532 506 530C474 528 444 514 430 494C420 478 426 438 452 430",
    "M470 566C438 552 422 528 426 500C432 462 470 438 516 446C560 454 586 492 580 528C574 560 526 582 470 566",
    "M404 500C418 474 446 458 478 454C528 448 578 468 590 502C600 532 572 564 528 574C488 582 434 570 412 544C400 530 396 516 404 500"
  ];
  var LOOSE_PATHS = [
    "M372 518C384 450 434 418 504 420C578 422 632 456 640 510C646 558 606 602 540 612C474 622 398 598 376 554",
    "M392 452C432 404 504 390 572 414C624 432 658 474 654 522C650 572 610 610 544 620C478 630 410 602 388 548",
    "M360 502C378 452 420 418 472 404C546 384 632 406 668 454C694 488 694 538 666 576C636 618 574 638 500 632C430 626 374 586 360 502",
    "M402 590C368 558 362 500 392 452C434 384 516 360 596 392C658 416 694 468 692 530C690 588 646 630 580 646C514 662 444 640 402 590",
    "M430 392C482 360 552 360 612 392C660 418 688 460 688 506C688 564 646 616 586 634C530 650 454 642 404 608C354 572 346 510 372 454C384 426 404 406 430 392",
    "M344 522C360 440 430 382 520 386C608 390 682 444 704 526C720 590 676 650 604 676C530 702 438 694 378 648C332 612 322 572 344 522",
    "M410 642C364 604 348 544 372 482C404 398 494 354 592 372C674 386 736 446 742 522C748 586 706 646 636 676C566 706 470 692 410 642",
    "M334 470C366 404 438 362 522 364C620 366 712 424 736 500C756 560 724 620 656 662C590 702 486 708 404 678C330 650 286 602 292 538C294 512 306 490 334 470"
  ];
  var TUFT_PATHS = [
    "M-58 16C-42 -18 -4 -30 28 -18C56 -8 72 14 68 40C64 64 40 82 8 82C-20 82 -46 62 -58 16",
    "M-42 40C-18 4 26 0 56 22C78 38 84 62 68 82C50 102 12 108 -20 94C-48 82 -60 60 -42 40",
    "M-56 56C-34 26 4 20 34 34C60 44 74 66 60 86C44 110 6 116 -28 102C-52 92 -70 74 -56 56",
    "M-18 -4C6 -18 42 -12 62 8C76 22 78 44 60 58C38 74 0 70 -24 48C-40 34 -38 8 -18 -4",
    "M-44 -6C-24 -24 10 -28 38 -12C58 0 68 22 56 40C42 60 10 66 -18 54C-42 42 -58 14 -44 -6"
  ];
  var FLYAWAY_PATHS = [
    "M-12 -54C8 -66 34 -60 46 -40",
    "M44 -36C62 -44 88 -40 102 -22",
    "M70 12C94 8 120 20 132 42",
    "M10 70C28 84 54 90 82 86",
    "M-42 48C-62 54 -86 48 -102 28"
  ];
  var TIGHT_HIGHLIGHT_PATHS = [
    "M438 486C458 462 492 454 522 462",
    "M452 526C480 540 514 540 540 526",
    "M452 448C480 438 514 440 536 458"
  ];
  var TIGHT_MICRO_PATHS = [
    "M438 500C452 482 476 476 496 486C514 494 522 512 514 528C504 544 480 550 458 542C440 534 430 518 438 500",
    "M452 464C470 452 494 452 512 466C526 478 530 498 520 514C508 532 482 536 462 524C444 514 438 486 452 464",
    "M474 448C492 442 514 448 526 462C536 474 536 490 526 502C512 520 482 522 462 506C448 494 454 456 474 448",
    "M430 520C448 508 472 504 494 510C512 514 522 526 520 540C516 556 490 562 464 558C440 552 424 540 424 528C424 524 426 522 430 520",
    "M458 538C474 528 494 526 512 534C526 540 534 552 530 566C524 582 498 588 474 580C454 572 444 552 450 542C452 540 454 538 458 538",
    "M446 480C458 470 476 466 494 470C512 474 524 486 522 500C518 516 494 524 472 520C452 516 438 500 440 488C440 484 442 482 446 480",
    "M490 474C504 470 522 474 532 486C540 496 540 510 530 522C518 536 496 540 480 530C466 520 468 480 490 474"
  ];
  var TIGHT_SHARD_PATHS = [
    "M430 486C456 472 492 470 524 480",
    "M444 520C468 494 508 486 544 494",
    "M454 444C476 456 500 482 516 514",
    "M420 510C450 520 486 518 520 506",
    "M462 554C474 532 500 516 534 506",
    "M438 460C458 486 486 506 520 518"
  ];
  var TIGHT_FRAY_PATHS = [
    "M420 484C406 476 392 474 382 480",
    "M432 454C422 436 418 420 422 404",
    "M470 438C482 420 496 408 516 398",
    "M532 444C552 434 566 422 576 408",
    "M556 476C576 474 590 480 602 494",
    "M540 528C554 542 562 558 560 576",
    "M496 558C498 576 506 592 522 606",
    "M448 548C438 562 426 572 408 576",
    "M420 522C404 534 392 548 390 566",
    "M570 512C588 518 602 530 608 546"
  ];
  var TIGHT_KNOT_PATHS = [
    "M438 474C460 486 486 502 512 524",
    "M452 444C476 468 494 492 506 522",
    "M430 514C458 500 488 494 522 498",
    "M468 434C486 454 504 482 522 516",
    "M446 542C470 530 500 522 532 520",
    "M420 466C446 484 474 508 494 536",
    "M494 446C512 466 526 490 534 520"
  ];
  var TIGHT_KNOT_HIGHLIGHTS = [
    "M452 470C472 482 494 498 512 516",
    "M438 512C464 500 492 498 520 504",
    "M470 446C488 466 502 490 514 514"
  ];
  var TIGHT_COMPACT_FLYAWAYS = [
    "M404 470C392 458 380 452 366 452",
    "M436 430C430 414 430 398 438 384",
    "M520 426C536 414 552 404 570 400",
    "M580 466C598 462 614 466 626 476",
    "M560 548C574 560 582 576 582 592",
    "M452 572C446 590 448 606 458 620"
  ];
  var LOOSE_HIGHLIGHT_PATHS = [
    "M386 520C446 482 516 472 588 490",
    "M412 610C470 626 548 624 616 596",
    "M430 420C506 392 598 404 654 454"
  ];
  var LOOSE_MICRO_PATHS = [
    "M378 514C412 466 474 444 536 450C592 456 638 486 652 532C662 570 638 610 592 632C544 656 474 654 420 626C376 602 354 560 364 530C366 524 370 518 378 514",
    "M402 462C444 424 510 410 574 424C626 436 666 472 676 518C684 554 664 592 624 618C582 644 516 646 458 626C408 610 372 578 370 542C368 510 378 484 402 462",
    "M430 406C482 384 548 388 604 420C648 446 678 490 680 536C682 582 654 622 608 646C560 670 488 670 430 646C378 624 344 588 340 546C336 490 372 432 430 406",
    "M344 542C386 500 448 484 514 492C580 500 638 532 662 582",
    "M414 606C466 624 534 624 592 604C632 590 664 564 680 530",
    "M392 444C440 416 500 410 556 422C606 432 650 460 676 500",
    "M446 520C478 500 522 496 560 508C592 518 616 544 620 574C624 602 602 626 568 636C530 648 480 644 442 624C408 606 392 578 398 550C402 538 412 528 446 520",
    "M430 564C466 548 510 546 548 556C582 564 606 586 606 612C606 632 590 648 560 656C520 668 464 664 426 642C398 624 388 596 398 578C404 570 414 564 430 564"
  ];
  var LOOSE_DETAIL_PATHS = [
    "M416 504C444 456 510 438 568 454C612 468 636 506 632 548C626 590 580 620 522 620C468 620 420 590 406 548C402 532 404 518 416 504",
    "M434 548C460 500 514 478 564 486C602 492 626 520 626 554C626 594 590 628 540 636C490 644 440 620 420 580C414 568 418 558 434 548",
    "M452 442C496 408 562 406 614 434C648 452 668 486 668 522C668 568 638 606 588 626",
    "M380 560C414 516 472 494 534 496C598 500 650 530 672 580",
    "M394 468C430 434 486 418 546 422C608 426 660 456 684 508"
  ];
  var LOOSE_SHARD_PATHS = [
    "M376 526C426 478 492 454 564 458",
    "M404 612C462 624 530 620 594 594",
    "M430 436C474 462 518 508 538 568",
    "M474 398C526 424 578 474 604 542",
    "M360 566C410 544 470 540 532 554",
    "M452 642C488 608 540 590 602 592",
    "M396 470C434 504 488 534 560 546"
  ];
  var LOOSE_FRAY_PATHS = [
    "M362 518C332 520 308 532 292 554",
    "M398 434C380 404 374 378 380 346",
    "M470 392C484 360 512 336 548 324",
    "M606 412C640 404 670 412 692 432",
    "M676 514C706 520 730 534 744 558",
    "M630 624C644 652 642 682 624 706",
    "M520 648C520 680 532 706 556 726",
    "M416 632C398 654 372 668 342 670",
    "M360 566C332 578 308 602 294 634",
    "M448 452C458 504 492 546 548 578"
  ];
  var TUFT_HIGHLIGHT_PATHS = [
    "M-38 22C-10 -2 30 -2 54 20",
    "M-26 70C6 86 42 84 66 68"
  ];
  var TUFT_MICRO_PATHS = [
    "M-42 28C-28 10 -2 4 20 12C38 18 48 34 44 50C38 68 14 74 -8 66C-30 58 -50 40 -42 28",
    "M-24 0C-6 -10 20 -6 36 10C48 22 50 40 40 54C26 70 0 72 -20 56C-34 46 -38 18 -24 0",
    "M-18 48C0 40 22 42 38 54C48 62 50 76 40 88C28 102 4 104 -16 92C-30 84 -34 60 -18 48",
    "M-8 18C10 8 30 10 44 24"
  ];
  var TUFT_DETAIL_PATHS = [
    "M-44 26C-20 -2 22 -6 48 10C64 20 70 40 62 58C48 82 12 88 -22 74C-42 64 -54 48 -44 26",
    "M-22 72C2 84 34 82 58 64C72 52 74 34 62 20C44 -2 8 -8 -20 10C-38 22 -40 52 -22 72"
  ];
  var TUFT_SHARD_PATHS = [
    "M-44 32C-18 18 18 16 48 28",
    "M-28 62C2 54 30 58 54 72",
    "M-10 -2C10 16 24 36 34 58",
    "M-36 16C-8 36 24 48 52 46"
  ];
  var NECK_PATHS = [
    "M-34 18C-22 -8 8 -14 30 -2C48 8 54 24 48 42C40 64 10 74 -18 68C-42 62 -46 36 -34 18",
    "M-20 8C0 -10 28 -8 46 8C58 20 60 40 50 56C36 76 6 78 -18 62C-34 52 -38 26 -20 8",
    "M-8 48C12 60 38 58 56 40"
  ];
  var NECK_HIGHLIGHT_PATHS = [
    "M-18 14C2 2 26 4 40 18",
    "M-6 52C14 62 34 58 48 44"
  ];
  var NECK_MICRO_PATHS = [
    "M-34 26C-22 8 4 0 24 8C40 14 48 28 44 42C36 58 14 64 -10 58C-28 54 -42 40 -34 26",
    "M-18 10C0 -2 24 0 38 14C48 24 48 40 38 54C24 70 0 72 -18 58C-30 48 -32 22 -18 10",
    "M-10 46C8 38 28 40 42 50"
  ];
  var NECK_SHARD_PATHS = [
    "M-32 20C-6 12 18 16 38 28",
    "M-18 50C4 42 24 42 42 48",
    "M-10 4C6 20 20 36 28 56"
  ];
  var NECK_VOLUME_PATH = "M-42 22C-34 -10 2 -22 34 -10C58 0 66 28 58 52C46 80 10 92 -24 80C-48 70 -56 46 -42 22Z";
  var PULL_ZONES = [
    { base: { x: 428, y: 488 }, target: { x: 344, y: 452 } },
    { base: { x: 452, y: 450 }, target: { x: 396, y: 368 } },
    { base: { x: 494, y: 434 }, target: { x: 494, y: 316 } },
    { base: { x: 536, y: 450 }, target: { x: 594, y: 370 } },
    { base: { x: 564, y: 486 }, target: { x: 648, y: 446 } }
  ];
  var COMPACT_VOLUME_PATH = "M392 506C402 456 446 422 506 428C560 434 600 462 612 504C622 548 594 584 538 596C476 610 414 590 398 546C394 534 392 520 392 506Z";
  var LOOSE_VOLUME_PATH = "M338 520C356 430 432 376 532 382C628 388 706 442 724 522C738 586 706 642 640 676C578 706 472 710 392 678C334 654 298 610 302 556C304 542 314 530 338 520Z";
  var TUFT_VOLUME_PATH = "M-68 20C-54 -20 -10 -38 30 -30C70 -22 94 8 92 46C90 86 54 116 10 116C-30 116 -68 92 -72 52C-72 42 -72 30 -68 20Z";

  window.RainbowCustomStages = window.RainbowCustomStages || {};

  function formatMass(value) {
    return value.toFixed(2) + " g";
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function mix(start, end, amount) {
    return start + (end - start) * amount;
  }

  function renderStrokePaths(paths, stroke, width, opacity) {
    return paths.map(function(d) {
      return '<path d="' + d + '" fill="none" stroke="' + stroke + '" stroke-width="' + width + '" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="' + opacity + '"/>';
    }).join("");
  }

  function buildBridgePath(startX, startY, endX, endY, bend, lift) {
    return [
      "M", startX, " ", startY,
      "C", mix(startX, endX, 0.24) + bend, " ", mix(startY, endY, 0.3) - lift,
      " ", mix(startX, endX, 0.7) - bend, " ", mix(startY, endY, 0.78) + lift * 0.18,
      " ", endX, " ", endY
    ].join("");
  }

  function zoneVector(zone) {
    var dx = zone.target.x - zone.base.x;
    var dy = zone.target.y - zone.base.y;
    var length = Math.sqrt(dx * dx + dy * dy) || 1;
    return {
      x: dx / length,
      y: dy / length,
      px: -dy / length,
      py: dx / length,
      angle: Math.atan2(dy, dx) * 180 / Math.PI
    };
  }

  function zoneAccentPath(zone, alongStart, crossStart, alongMid, crossMid, alongEnd, crossEnd) {
    var vector = zoneVector(zone);
    var x = zone.base.x;
    var y = zone.base.y;
    var start = {
      x: x + vector.x * alongStart + vector.px * crossStart,
      y: y + vector.y * alongStart + vector.py * crossStart
    };
    var mid = {
      x: x + vector.x * alongMid + vector.px * crossMid,
      y: y + vector.y * alongMid + vector.py * crossMid
    };
    var end = {
      x: x + vector.x * alongEnd + vector.px * crossEnd,
      y: y + vector.y * alongEnd + vector.py * crossEnd
    };

    return [
      "M", start.x.toFixed(1), " ", start.y.toFixed(1),
      "Q", mid.x.toFixed(1), " ", mid.y.toFixed(1),
      " ", end.x.toFixed(1), " ", end.y.toFixed(1)
    ].join("");
  }

  function zoneBracketPath(zone) {
    return [
      zoneAccentPath(zone, -18, -16, -8, -18, 6, -13),
      zoneAccentPath(zone, -20, 15, -6, 18, 8, 13)
    ].join(" ");
  }

  function tensionStrandPath(startPoint, endPoint, crossStart, crossEnd, bend) {
    var dx = endPoint.x - startPoint.x;
    var dy = endPoint.y - startPoint.y;
    var length = Math.sqrt(dx * dx + dy * dy) || 1;
    var px = -dy / length;
    var py = dx / length;
    var start = {
      x: startPoint.x + px * crossStart,
      y: startPoint.y + py * crossStart
    };
    var end = {
      x: endPoint.x + px * crossEnd,
      y: endPoint.y + py * crossEnd
    };
    var mid = {
      x: mix(start.x, end.x, 0.54) + px * bend,
      y: mix(start.y, end.y, 0.54) + py * bend
    };

    return [
      "M", start.x.toFixed(1), " ", start.y.toFixed(1),
      "Q", mid.x.toFixed(1), " ", mid.y.toFixed(1),
      " ", end.x.toFixed(1), " ", end.y.toFixed(1)
    ].join("");
  }

  function handleRingMarkup() {
    return [
      '<g id="steel-handle-group">',
      '  <circle id="steel-handle-shadow" cx="' + HANDLE_HOME.x + '" cy="' + HANDLE_HOME.y + '" r="28" fill="#0f181b" fill-opacity="0.12"/>',
      '  <circle id="steel-handle-loop" cx="' + HANDLE_HOME.x + '" cy="' + HANDLE_HOME.y + '" r="20" fill="#f9f4dc" stroke="#5a5d62" stroke-width="6"/>',
      '  <circle id="steel-handle-core" cx="' + HANDLE_HOME.x + '" cy="' + HANDLE_HOME.y + '" r="10" fill="#f3c35c" stroke="#8d6a20" stroke-width="3"/>',
      '  <circle id="steel-handle-hit" cx="' + HANDLE_HOME.x + '" cy="' + HANDLE_HOME.y + '" r="36" fill="#ffffff" fill-opacity="0.001" stroke="none"/>',
      '</g>'
    ].join("");
  }

  function hotspotMarkup() {
    var markup = [
      '<g id="steel-zone-guides">',
      '  <path id="steel-zone-arrow-glow" d="" fill="none" stroke="#fff2be" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>',
      '  <path id="steel-zone-arrow" d="" fill="none" stroke="#d0a638" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>',
      '  <path id="steel-drag-guide-glow" d="" fill="none" stroke="#eef2f3" stroke-width="7" stroke-linecap="round"/>',
      '  <path id="steel-drag-guide" d="" fill="none" stroke="#788188" stroke-width="3.2" stroke-linecap="round"/>',
      '</g>'
    ];

    PULL_ZONES.forEach(function(zone, index) {
      var vector = zoneVector(zone);
      markup.push(
        '<g id="steel-zone-' + index + '" data-zone="' + index + '" opacity="0">',
        '  <path id="steel-zone-fill-' + index + '" d="' + zoneAccentPath(zone, -14, -7, -2, 2, 13, 7) + ' ' + zoneAccentPath(zone, -12, 9, 0, -2, 12, -6) + '" fill="none" stroke="#f0db88" stroke-width="6.4" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.54"/>',
        '  <path id="steel-zone-ring-' + index + '" d="' + zoneAccentPath(zone, -10, -10, 1, -1, 16, 3) + ' ' + zoneAccentPath(zone, -8, 10, 3, 1, 14, -4) + '" fill="none" stroke="#fff7d1" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.96"/>',
        '  <path d="' + zoneBracketPath(zone) + '" fill="none" stroke="#c9a33a" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.74"/>',
        '  <circle id="steel-zone-hit-' + index + '" cx="' + zone.base.x + '" cy="' + zone.base.y + '" r="46" fill="#ffffff" fill-opacity="0.001" stroke="none"/>',
        '</g>'
      );
    });

    return markup.join("");
  }

  function markup() {
    return [
      '<section class="custom-stage custom-stage--steel">',
      '  <header class="custom-stage__toolbar">',
      '    <div>',
      '      <p class="custom-stage__eyebrow">Reality-First Manipulation Stage</p>',
      '      <h3 class="custom-stage__title">Steel wool pulled apart</h3>',
      '      <p class="custom-stage__caption">Weigh the compact steel wool, then pull the highlighted grab zones outward one by one to fluff the same sample into a much larger airy tangle before weighing it again.</p>',
      '    </div>',
      '    <div class="custom-stage__meta">',
      '      <div class="custom-stage__mass-tag">',
      '        <span class="custom-stage__mass-label">Measured mass</span>',
      '        <strong class="custom-stage__mass-value" data-steel-mass-tag>0.00 g</strong>',
      '      </div>',
      '    </div>',
      '  </header>',
      '  <div class="custom-stage__scene">',
      '    <div class="custom-stage__scene-frame">',
      '      <svg class="custom-stage__svg" viewBox="0 0 1000 860" aria-label="Steel wool pull-apart stage">',
      '        <rect x="160" y="74" width="680" height="648" rx="42" fill="#f6f1e4"/>',
      '        <path d="M186 168C252 116 318 96 414 102C526 110 614 150 702 126C734 118 760 106 794 82" fill="none" stroke="#fff9eb" stroke-opacity="0.9" stroke-width="28" stroke-linecap="round"/>',
      '        <ellipse cx="500" cy="704" rx="190" ry="30" fill="#8095a3" fill-opacity="0.14"/>',
      '        <g id="steel-scale-assembly">',
      '          <ellipse cx="500" cy="720" rx="176" ry="20" fill="#6d6d71" fill-opacity="0.22"/>',
      '          <ellipse id="steel-scale-tray" cx="500" cy="676" rx="172" ry="24" fill="#707277"/>',
      '          <ellipse cx="500" cy="666" rx="166" ry="18" fill="#8f9197"/>',
      '          <path id="steel-scale-body" d="M350 688C374 758 430 800 500 800C570 800 626 758 650 688C631 676 605 670 500 670C395 670 369 676 350 688Z" fill="#de1414" stroke="#931010" stroke-width="6"/>',
      '          <rect x="419" y="713" width="162" height="58" rx="14" fill="#111516" stroke="#414648" stroke-width="4"/>',
      '          <text x="500" y="752" text-anchor="middle" font-family="Georgia, serif" font-size="38" fill="#ffbc57" letter-spacing="2" data-steel-scale-readout>0.00</text>',
      '          <text x="586" y="753" font-family="Georgia, serif" font-size="18" fill="#ffbc57">g</text>',
      '        </g>',
      '        <g id="steel-sample-assembly">',
      '          <ellipse id="steel-shadow" cx="500" cy="644" rx="104" ry="26" fill="#5f6a71" fill-opacity="0.12"/>',
      '          <g id="steel-loose-body" opacity="0.08">',
      '            <path d="' + LOOSE_VOLUME_PATH + '" fill="#c4cbcf" fill-opacity="0.22" stroke="#90979d" stroke-opacity="0.22" stroke-width="2"/>',
                 renderStrokePaths(LOOSE_MICRO_PATHS, "#81898d", "1.25", "0.34"),
                 renderStrokePaths(LOOSE_PATHS, "#6b7177", "3.1", "0.74"),
                 renderStrokePaths(LOOSE_DETAIL_PATHS, "#70777c", "2.4", "0.5"),
                 renderStrokePaths(LOOSE_SHARD_PATHS, "#5b6368", "1.8", "0.54"),
                 renderStrokePaths(LOOSE_FRAY_PATHS, "#6f777c", "1.7", "0.5"),
                 renderStrokePaths(LOOSE_HIGHLIGHT_PATHS, "#d8dee1", "2.2", "0.7"),
      '          </g>',
      '          <g id="steel-tight-body">',
      '            <path d="' + COMPACT_VOLUME_PATH + '" fill="#b9c0c4" fill-opacity="0.2" stroke="#8d959b" stroke-opacity="0.18" stroke-width="2.2"/>',
                 renderStrokePaths(TIGHT_MICRO_PATHS, "#7f878b", "1.2", "0.34"),
                 renderStrokePaths(TIGHT_PATHS, "#51565b", "4.1", "0.96"),
                  renderStrokePaths(TIGHT_SHARD_PATHS, "#5c6267", "1.9", "0.58"),
                  renderStrokePaths(TIGHT_FRAY_PATHS, "#737a80", "1.8", "0.56"),
                  renderStrokePaths(TIGHT_KNOT_PATHS, "#484e54", "2.25", "0.72"),
                  renderStrokePaths(TIGHT_KNOT_HIGHLIGHTS, "#dce1e4", "1.35", "0.6"),
                  renderStrokePaths(TIGHT_COMPACT_FLYAWAYS, "#7b8387", "1.55", "0.48"),
                  renderStrokePaths(TIGHT_HIGHLIGHT_PATHS, "#d8dee1", "2.4", "0.76"),
      '          </g>',
      '          <path id="steel-bridge-a" d="' + buildBridgePath(566, 474, HANDLE_HOME.x - 22, HANDLE_HOME.y + 14, -12, 46) + '" fill="none" stroke="#5f666c" stroke-width="4.2" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-b" d="' + buildBridgePath(548, 446, HANDLE_HOME.x - 18, HANDLE_HOME.y - 6, 10, 58) + '" fill="none" stroke="#697177" stroke-width="3.8" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-c" d="' + buildBridgePath(526, 506, HANDLE_HOME.x - 30, HANDLE_HOME.y + 26, -8, 30) + '" fill="none" stroke="#717981" stroke-width="3.2" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-d" d="' + buildBridgePath(586, 520, HANDLE_HOME.x - 10, HANDLE_HOME.y + 30, 18, 22) + '" fill="none" stroke="#7a8388" stroke-width="3" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-e" d="' + buildBridgePath(538, 466, HANDLE_HOME.x - 24, HANDLE_HOME.y + 6, -4, 36) + '" fill="none" stroke="#8a9398" stroke-width="2.4" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-f" d="' + buildBridgePath(572, 488, HANDLE_HOME.x - 8, HANDLE_HOME.y + 18, 6, 28) + '" fill="none" stroke="#9aa3a8" stroke-width="1.9" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-glow-a" d="' + buildBridgePath(566, 474, HANDLE_HOME.x - 22, HANDLE_HOME.y + 14, -12, 46) + '" fill="none" stroke="#e6eaec" stroke-width="1.3" stroke-linecap="round" stroke-opacity="0"/>',
      '          <path id="steel-bridge-glow-b" d="' + buildBridgePath(548, 446, HANDLE_HOME.x - 18, HANDLE_HOME.y - 6, 10, 58) + '" fill="none" stroke="#d8dee1" stroke-width="1.1" stroke-linecap="round" stroke-opacity="0"/>',
      '          <g id="steel-neck-tangle" opacity="0">',
      '            <path d="' + NECK_VOLUME_PATH + '" fill="#c2c8cb" fill-opacity="0.18" stroke="#959da1" stroke-opacity="0.16" stroke-width="1.8"/>',
                   renderStrokePaths(NECK_MICRO_PATHS, "#858d92", "1.1", "0.3"),
                   renderStrokePaths(NECK_PATHS, "#70777c", "2.2", "0.86"),
                   renderStrokePaths(NECK_SHARD_PATHS, "#666d72", "1.5", "0.48"),
                   renderStrokePaths(NECK_HIGHLIGHT_PATHS, "#dfe4e7", "1.4", "0.64"),
      '          </g>',
      '          <g id="steel-lobe-left" opacity="0">',
      '            <g transform="scale(0.92)">',
      '              <path d="' + TUFT_VOLUME_PATH + '" fill="#c7cdd1" fill-opacity="0.18" stroke="#9aa2a7" stroke-opacity="0.16" stroke-width="1.8"/>',
                     renderStrokePaths(TUFT_MICRO_PATHS, "#848c90", "1.1", "0.3"),
                     renderStrokePaths(TUFT_PATHS, "#6c7378", "3", "0.84"),
                     renderStrokePaths(TUFT_DETAIL_PATHS, "#737a80", "2.2", "0.42"),
                     renderStrokePaths(TUFT_SHARD_PATHS, "#656d73", "1.7", "0.5"),
                     renderStrokePaths(TUFT_HIGHLIGHT_PATHS, "#e1e5e7", "1.8", "0.58"),
      '            </g>',
      '          </g>',
      '          <g id="steel-lobe-top" opacity="0">',
      '            <g transform="scale(0.82)">',
      '              <path d="' + TUFT_VOLUME_PATH + '" fill="#c7cdd1" fill-opacity="0.16" stroke="#9aa2a7" stroke-opacity="0.14" stroke-width="1.6"/>',
                     renderStrokePaths(TUFT_MICRO_PATHS, "#848c90", "1.05", "0.28"),
                     renderStrokePaths(TUFT_PATHS, "#72797e", "2.7", "0.8"),
                     renderStrokePaths(TUFT_DETAIL_PATHS, "#7a8286", "2", "0.36"),
                     renderStrokePaths(TUFT_SHARD_PATHS, "#6d757a", "1.55", "0.46"),
                     renderStrokePaths(TUFT_HIGHLIGHT_PATHS, "#e1e5e7", "1.7", "0.54"),
      '            </g>',
      '          </g>',
                   hotspotMarkup(),
      '          <g id="steel-active-tension" opacity="0">',
      '            <path id="steel-tension-a" d="" fill="none" stroke="#656d73" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>',
      '            <path id="steel-tension-b" d="" fill="none" stroke="#737a80" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>',
      '            <path id="steel-tension-c" d="" fill="none" stroke="#8a9196" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>',
      '            <path id="steel-tension-d" d="" fill="none" stroke="#dfe4e7" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round"/>',
      '          </g>',
      '          <g id="steel-pulled-tuft" opacity="0">',
      '            <g id="steel-pulled-tuft-body">',
      '              <path d="' + TUFT_VOLUME_PATH + '" fill="#c5ccd0" fill-opacity="0.2" stroke="#979fa4" stroke-opacity="0.18" stroke-width="2"/>',
                   renderStrokePaths(TUFT_MICRO_PATHS, "#848c90", "1.18", "0.32"),
                   renderStrokePaths(TUFT_PATHS, "#656d73", "3.4", "0.94"),
                   renderStrokePaths(TUFT_DETAIL_PATHS, "#6b7277", "2.5", "0.48"),
                   renderStrokePaths(TUFT_SHARD_PATHS, "#5f676c", "1.8", "0.52"),
                   renderStrokePaths(TUFT_HIGHLIGHT_PATHS, "#dce1e4", "2.1", "0.68"),
      '            </g>',
      '            <g id="steel-flyaways">',
                   renderStrokePaths(FLYAWAY_PATHS, "#8c9498", "2.4", "0.75"),
      '            </g>',
      '          </g>',
      '        </g>',
      '      </svg>',
      '    </div>',
      '  </div>',
      '  <footer class="custom-stage__footer">',
      '    <div class="custom-stage__statusline" data-steel-status>Weigh the compact sample first, then pull the highlighted grab zones outward to fluff the same steel wool into a much larger volume.</div>',
      '    <div class="custom-stage__controls">',
      '      <button class="custom-stage__button" data-steel-before>Weigh (before)</button>',
      '      <button class="custom-stage__button custom-stage__button--warm" data-steel-after disabled>Weigh (after)</button>',
      '      <button class="custom-stage__button custom-stage__button--ghost" data-steel-reset>Reset</button>',
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
      spreadComplete: false,
      afterMeasured: false,
      dragging: false,
      animated: false,
      spreadProgress: 0,
      pullProgresses: [0, 0, 0, 0, 0],
      activeZoneIndex: 0,
      activeDragProgress: 0,
      dragPoint: null,
      massTween: null,
      settleTween: null,
      zonePulseTween: null,
      pulsingZoneIndex: null,
      dragPointerId: null,
      dragZoneIndex: null
    };

    if (!container || !host || !gsap) {
      throw new Error("Steel wool custom stage could not boot because the host API or GSAP was unavailable.");
    }

    container.innerHTML = markup();

    refs.svg = container.querySelector(".custom-stage__svg");
    refs.massTag = container.querySelector("[data-steel-mass-tag]");
    refs.status = container.querySelector("[data-steel-status]");
    refs.before = container.querySelector("[data-steel-before]");
    refs.after = container.querySelector("[data-steel-after]");
    refs.reset = container.querySelector("[data-steel-reset]");
    refs.readout = container.querySelector("[data-steel-scale-readout]");
    refs.tray = container.querySelector("#steel-scale-tray");
    refs.scaleBody = container.querySelector("#steel-scale-body");
    refs.sampleAssembly = container.querySelector("#steel-sample-assembly");
    refs.tight = container.querySelector("#steel-tight-body");
    refs.loose = container.querySelector("#steel-loose-body");
    refs.shadow = container.querySelector("#steel-shadow");
    refs.bridgeA = container.querySelector("#steel-bridge-a");
    refs.bridgeB = container.querySelector("#steel-bridge-b");
    refs.bridgeC = container.querySelector("#steel-bridge-c");
    refs.bridgeD = container.querySelector("#steel-bridge-d");
    refs.bridgeE = container.querySelector("#steel-bridge-e");
    refs.bridgeF = container.querySelector("#steel-bridge-f");
    refs.bridgeGlowA = container.querySelector("#steel-bridge-glow-a");
    refs.bridgeGlowB = container.querySelector("#steel-bridge-glow-b");
    refs.neck = container.querySelector("#steel-neck-tangle");
    refs.lobeLeft = container.querySelector("#steel-lobe-left");
    refs.lobeTop = container.querySelector("#steel-lobe-top");
    refs.activeTension = container.querySelector("#steel-active-tension");
    refs.tensionA = container.querySelector("#steel-tension-a");
    refs.tensionB = container.querySelector("#steel-tension-b");
    refs.tensionC = container.querySelector("#steel-tension-c");
    refs.tensionD = container.querySelector("#steel-tension-d");
    refs.dragGuide = container.querySelector("#steel-drag-guide");
    refs.dragGuideGlow = container.querySelector("#steel-drag-guide-glow");
    refs.zoneArrow = container.querySelector("#steel-zone-arrow");
    refs.zoneArrowGlow = container.querySelector("#steel-zone-arrow-glow");
    refs.zoneGroups = PULL_ZONES.map(function(_, index) {
      return container.querySelector("#steel-zone-" + index);
    });
    refs.zoneFills = PULL_ZONES.map(function(_, index) {
      return container.querySelector("#steel-zone-fill-" + index);
    });
    refs.zoneRings = PULL_ZONES.map(function(_, index) {
      return container.querySelector("#steel-zone-ring-" + index);
    });
    refs.zoneHits = PULL_ZONES.map(function(_, index) {
      return container.querySelector("#steel-zone-hit-" + index);
    });
    refs.tuft = container.querySelector("#steel-pulled-tuft");
    refs.tuftBody = container.querySelector("#steel-pulled-tuft-body");
    refs.flyaways = container.querySelector("#steel-flyaways");

    function setStatus(text) {
      refs.status.textContent = text;
    }

    function setScaleReadout(value) {
      refs.readout.textContent = value.toFixed(2);
      refs.massTag.textContent = formatMass(value);
    }

    function setUnstableReadout(progress, handleX, handleY) {
      var jitter = Math.sin((handleX - HANDLE_HOME.x) * 0.08) * 0.035 +
        Math.cos((handleY - HANDLE_HOME.y) * 0.11) * 0.024 +
        progress * 0.012;
      setScaleReadout(clamp(MASS_VALUE + jitter, MASS_VALUE - 0.07, MASS_VALUE + 0.07));
    }

    function effectiveZoneProgress(index) {
      var base = state.pullProgresses[index] || 0;

      if (state.dragging && state.dragZoneIndex === index) {
        return Math.max(base, state.activeDragProgress || 0);
      }

      return base;
    }

    function stopZonePulse() {
      if (state.zonePulseTween) {
        state.zonePulseTween.kill();
        state.zonePulseTween = null;
      }
      state.pulsingZoneIndex = null;
    }

    function setGuidePath(startPoint, endPoint, opacity) {
      if (!startPoint || !endPoint || !opacity) {
        refs.dragGuide.setAttribute("d", "");
        refs.dragGuideGlow.setAttribute("d", "");
        gsap.set([refs.dragGuide, refs.dragGuideGlow], { opacity: 0 });
        return;
      }

      refs.dragGuide.setAttribute("d", buildBridgePath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 0, 20));
      refs.dragGuideGlow.setAttribute("d", buildBridgePath(startPoint.x, startPoint.y, endPoint.x, endPoint.y, 0, 20));
      gsap.set(refs.dragGuide, { opacity: opacity });
      gsap.set(refs.dragGuideGlow, { opacity: opacity * 0.7 });
    }

    function setZoneArrow(index) {
      var zone;
      var arrowEnd;
      var wingA;
      var wingB;
      var path;

      if (index < 0 || index >= PULL_ZONES.length || state.dragging) {
        refs.zoneArrow.setAttribute("d", "");
        refs.zoneArrowGlow.setAttribute("d", "");
        gsap.set([refs.zoneArrow, refs.zoneArrowGlow], { opacity: 0 });
        return;
      }

      zone = PULL_ZONES[index];
      arrowEnd = {
        x: mix(zone.base.x, zone.target.x, 0.52),
        y: mix(zone.base.y, zone.target.y, 0.52)
      };
      wingA = {
        x: arrowEnd.x - 12 + (zone.base.y - zone.target.y) * 0.04,
        y: arrowEnd.y + 9
      };
      wingB = {
        x: arrowEnd.x + 9,
        y: arrowEnd.y + 14 - (zone.base.x - zone.target.x) * 0.04
      };
      path = [
        "M", zone.base.x + 6, " ", zone.base.y - 6,
        "Q", mix(zone.base.x, arrowEnd.x, 0.45), " ", mix(zone.base.y, arrowEnd.y, 0.45) - 18,
        " ", arrowEnd.x, " ", arrowEnd.y,
        "M", wingA.x, " ", wingA.y,
        "L", arrowEnd.x, " ", arrowEnd.y,
        "L", wingB.x, " ", wingB.y
      ].join("");

      refs.zoneArrow.setAttribute("d", path);
      refs.zoneArrowGlow.setAttribute("d", path);
      gsap.set(refs.zoneArrow, { opacity: 0.92 });
      gsap.set(refs.zoneArrowGlow, { opacity: 0.72 });
    }

    function syncZoneHighlights() {
      var index;
      var activeIndex = state.spreadComplete ? -1 : state.activeZoneIndex;

      for (index = 0; index < PULL_ZONES.length; index += 1) {
        var isActive = index === activeIndex && state.beforeMeasured && !state.afterMeasured;
        var isCompleted = (state.pullProgresses[index] || 0) >= 0.999;
        var activeScale = state.dragging && state.dragZoneIndex === index ? mix(1.02, 1.16, state.activeDragProgress) : 1;

        gsap.set(refs.zoneGroups[index], {
          opacity: isActive ? 1 : (isCompleted ? 0.14 : 0),
          scaleX: (isCompleted ? 0.82 : 1) * activeScale,
          scaleY: (isCompleted ? 0.82 : 1) * activeScale,
          transformOrigin: PULL_ZONES[index].base.x + "px " + PULL_ZONES[index].base.y + "px"
        });
        gsap.set(refs.zoneFills[index], {
          opacity: isActive ? 0.74 : 0.32
        });
        gsap.set(refs.zoneRings[index], {
          opacity: isActive ? 1 : 0.42
        });
      }

      if (activeIndex !== state.pulsingZoneIndex) {
        stopZonePulse();
      }

      if (activeIndex >= 0 && !state.zonePulseTween) {
        state.zonePulseTween = gsap.to(
          [refs.zoneGroups[activeIndex], refs.zoneRings[activeIndex]],
          {
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 0.55,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            transformOrigin: PULL_ZONES[activeIndex].base.x + "px " + PULL_ZONES[activeIndex].base.y + "px"
          }
        );
        state.pulsingZoneIndex = activeIndex;
      }

      setZoneArrow(activeIndex);
    }

    function syncEvidence(patch) {
      host.setEvidence(patch);
    }

    function setProcedure(phase) {
      var statuses;

      if (phase === "ready") {
        statuses = [
          ["completed", "Compact sample staged on the tray"],
          ["active", "Measure the initial mass"],
          ["locked", "Fluffing unlocks after weighing"],
          ["planned", "Let the same sample settle back on the tray"],
          ["planned", "Measure the final mass"]
        ];
      } else if (phase === "beforeMeasured") {
        statuses = [
          ["completed", "Compact sample staged on the tray"],
          ["completed", "Initial mass recorded"],
          ["active", "Pull the highlighted grab areas to fluff the sample"],
          ["planned", "Let the same sample settle back on the tray"],
          ["planned", "Measure the final mass"]
        ];
      } else if (phase === "dragging") {
        statuses = [
          ["completed", "Compact sample staged on the tray"],
          ["completed", "Initial mass recorded"],
          ["active", "Steel wool is stretching and opening up"],
          ["locked", "Release once the same sample is fully fluffed"],
          ["locked", "Measure after the sample settles"]
        ];
      } else if (phase === "fluffed") {
        statuses = [
          ["completed", "Compact sample staged on the tray"],
          ["completed", "Initial mass recorded"],
          ["completed", "Sample fluffed into a much larger volume"],
          ["completed", "Same sample settled back on the tray"],
          ["active", "Measure the final mass"]
        ];
      } else {
        statuses = [
          ["completed", "Compact sample staged on the tray"],
          ["completed", "Initial mass recorded"],
          ["completed", "Sample fluffed into a much larger volume"],
          ["completed", "Same sample settled back on the tray"],
          ["completed", "Final mass recorded"]
        ];
      }

      statuses.forEach(function(item, index) {
        host.setProcedureStep(index, item[0], item[1]);
      });
    }

    function syncButtons() {
      refs.before.disabled = state.beforeMeasured || state.dragging;
      refs.after.disabled = !state.spreadComplete || state.afterMeasured || state.dragging;
      refs.reset.disabled = state.dragging;
    }

    function pulseScale() {
      gsap.fromTo([refs.tray, refs.scaleBody], { y: 0 }, {
        y: 7,
        duration: 0.18,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
      gsap.fromTo(refs.shadow, { scaleX: gsap.getProperty(refs.shadow, "scaleX") || 1 }, {
        scaleX: (Number(gsap.getProperty(refs.shadow, "scaleX")) || 1) * 1.05,
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

    function svgPointFromEvent(event) {
      var rect = refs.svg.getBoundingClientRect();
      var point = refs.svg.createSVGPoint();
      point.x = event.clientX;
      point.y = event.clientY;
      return point.matrixTransform(refs.svg.getScreenCTM().inverse());
    }

    function bridgePath(index, handleX, handleY, progress) {
      var anchors = [
        { x: 566, y: 474, bend: -12, lift: 46, endOffsetX: -28, endOffsetY: 16 },
        { x: 548, y: 446, bend: 10, lift: 58, endOffsetX: -18, endOffsetY: -2 },
        { x: 526, y: 506, bend: -8, lift: 30, endOffsetX: -34, endOffsetY: 24 },
        { x: 586, y: 520, bend: 18, lift: 22, endOffsetX: -10, endOffsetY: 30 },
        { x: 538, y: 466, bend: -4, lift: 36, endOffsetX: -24, endOffsetY: 6 },
        { x: 572, y: 488, bend: 6, lift: 28, endOffsetX: -8, endOffsetY: 18 }
      ];
      var anchor = anchors[index];
      return buildBridgePath(anchor.x, anchor.y, handleX + anchor.endOffsetX, handleY + anchor.endOffsetY, anchor.bend * (0.6 + progress * 0.6), anchor.lift * (0.45 + progress * 0.55));
    }

    function applySpreadVisual() {
      var p0 = effectiveZoneProgress(0);
      var p1 = effectiveZoneProgress(1);
      var p2 = effectiveZoneProgress(2);
      var p3 = effectiveZoneProgress(3);
      var p4 = effectiveZoneProgress(4);
      var total = (p0 + p1 + p2 + p3 + p4) / PULL_ZONES.length;
      var eased = Math.pow(total, 0.84);
      var leftInfluence = clamp(Math.max(p0 * 1.02, p1 * 0.86), 0, 1);
      var topInfluence = clamp(Math.max(p2, p1 * 0.82, p3 * 0.62), 0, 1);
      var rightInfluence = clamp(Math.max(p4 * 1.04, p3 * 0.92), 0, 1);
      var neckInfluence = clamp(Math.max(rightInfluence * 0.92, p3 * 0.84), 0, 1);
      var activeBase = state.dragging && state.dragZoneIndex !== null ? PULL_ZONES[state.dragZoneIndex].base : null;
      var activeTarget = state.dragging ? state.dragPoint : null;
      var dragTravelX = activeBase && activeTarget ? activeTarget.x - activeBase.x : 0;
      var dragTravelY = activeBase && activeTarget ? activeTarget.y - activeBase.y : 0;
      var activeLift = state.dragging ? state.activeDragProgress : 0;
      var localShiftX = clamp(dragTravelX * 0.16, -24, 24);
      var localShiftY = clamp(dragTravelY * 0.12, -18, 12);
      var pullAngle = activeBase && activeTarget ?
        clamp(Math.atan2(dragTravelY, Math.max(Math.abs(dragTravelX), 1)) * 180 / Math.PI, -30, 16) :
        mix(-12, 6, rightInfluence - leftInfluence + 0.5);
      var leftLobeX = mix(486, 396, leftInfluence);
      var leftLobeY = mix(532, 500, leftInfluence);
      var topLobeX = mix(536, 500, topInfluence) + mix(0, -12, p1) + mix(0, 10, p3);
      var topLobeY = mix(492, 350, topInfluence);
      var tuftX = mix(548, 604, rightInfluence) + mix(0, 14, p3);
      var tuftY = mix(516, 392, rightInfluence) - mix(0, 8, p3);
      var neckX = mix(548, 566, neckInfluence);
      var neckY = mix(506, 446, neckInfluence);
      var looseRotation = mix(0, -4.2, eased) + (rightInfluence - leftInfluence) * 4.2;
      var tightRotation = mix(0, -3.1, eased) + (rightInfluence - leftInfluence) * 1.6;
      var bridgePointX = mix(586, 612, rightInfluence);
      var bridgePointY = mix(488, 434, rightInfluence);
      var sampleShiftX = mix(0, localShiftX * 0.34, activeLift);
      var sampleShiftY = mix(0, localShiftY * 0.22, activeLift);

      leftLobeX += mix(0, -16, p0) + mix(0, -10, p1);
      leftLobeY += mix(0, -12, p0) + mix(0, -6, p1);
      topLobeX += mix(0, -18, p1) + mix(0, 12, p3);
      topLobeY += mix(0, -36, p1) + mix(0, -72, p2) + mix(0, -24, p3);
      neckX += mix(0, 10, p3) + mix(0, 18, p4);
      neckY += mix(0, -14, p3) + mix(0, -10, p4);
      tuftX += mix(0, 28, p3) + mix(0, 44, p4);
      tuftY += mix(0, -22, p3) + mix(0, -18, p4);
      bridgePointX += mix(0, 18, p3) + mix(0, 26, p4);
      bridgePointY += mix(0, -18, p3) + mix(0, -8, p4);

      if (state.dragging && state.dragZoneIndex !== null && activeTarget) {
        if (state.dragZoneIndex === 0) {
          leftLobeX = mix(leftLobeX, activeTarget.x - 18, 0.74 * activeLift);
          leftLobeY = mix(leftLobeY, activeTarget.y + 18, 0.74 * activeLift);
          topLobeX = mix(topLobeX, topLobeX - 12, 0.22 * activeLift);
          looseRotation -= 5.4 * activeLift;
        } else if (state.dragZoneIndex === 1) {
          leftLobeX = mix(leftLobeX, activeTarget.x - 14, 0.42 * activeLift);
          leftLobeY = mix(leftLobeY, activeTarget.y + 24, 0.42 * activeLift);
          topLobeX = mix(topLobeX, activeTarget.x - 8, 0.56 * activeLift);
          topLobeY = mix(topLobeY, activeTarget.y + 20, 0.64 * activeLift);
          looseRotation -= 3.6 * activeLift;
        } else if (state.dragZoneIndex === 2) {
          topLobeX = mix(topLobeX, activeTarget.x, 0.72 * activeLift);
          topLobeY = mix(topLobeY, activeTarget.y + 24, 0.8 * activeLift);
          tightRotation -= 2.8 * activeLift;
        } else if (state.dragZoneIndex === 3) {
          topLobeX = mix(topLobeX, topLobeX + 16, 0.24 * activeLift);
          topLobeY = mix(topLobeY, topLobeY - 8, 0.18 * activeLift);
          neckX = mix(neckX, activeTarget.x - 40, 0.44 * activeLift);
          neckY = mix(neckY, activeTarget.y + 24, 0.54 * activeLift);
          tuftX = mix(tuftX, activeTarget.x - 18, 0.56 * activeLift);
          tuftY = mix(tuftY, activeTarget.y + 26, 0.62 * activeLift);
          pullAngle += 4 * activeLift;
          bridgePointX = mix(bridgePointX, activeTarget.x - 26, 0.46 * activeLift);
          bridgePointY = mix(bridgePointY, activeTarget.y + 18, 0.46 * activeLift);
        } else if (state.dragZoneIndex === 4) {
          neckX = mix(neckX, activeTarget.x - 52, 0.48 * activeLift);
          neckY = mix(neckY, activeTarget.y + 22, 0.48 * activeLift);
          tuftX = mix(tuftX, activeTarget.x - 16, 0.78 * activeLift);
          tuftY = mix(tuftY, activeTarget.y + 18, 0.78 * activeLift);
          pullAngle += 7.5 * activeLift;
          bridgePointX = mix(bridgePointX, activeTarget.x - 30, 0.6 * activeLift);
          bridgePointY = mix(bridgePointY, activeTarget.y + 20, 0.6 * activeLift);
        }
      }

      state.spreadProgress = total;

      gsap.set(refs.tight, {
        x: mix(0, -14, eased) + mix(0, -6, leftInfluence) + sampleShiftX * 0.66,
        y: mix(0, 12, eased) + sampleShiftY * 0.42,
        rotation: tightRotation,
        skewX: mix(0, -3.4, eased),
        scaleX: mix(1, 0.84, eased),
        scaleY: mix(1, 0.8, eased),
        opacity: mix(1, 0.42, eased),
        transformOrigin: "500px 500px"
      });
      gsap.set(refs.loose, {
        x: mix(0, 8, eased) + mix(0, -8, leftInfluence) + mix(0, 10, rightInfluence) + sampleShiftX,
        y: mix(6, 0, eased) + mix(0, -10, topInfluence) + sampleShiftY,
        rotation: looseRotation,
        skewX: mix(0, 3.8, eased),
        scaleX: mix(0.72, 1.18, eased),
        scaleY: mix(0.72, 1.12, eased),
        opacity: mix(0.08, 0.98, eased),
        transformOrigin: "500px 520px"
      });
      gsap.set(refs.shadow, {
        x: mix(0, 10, eased) + mix(0, -10, leftInfluence) + mix(0, 8, rightInfluence) + sampleShiftX * 0.5,
        scaleX: mix(0.82, 1.22, eased),
        scaleY: mix(1, 1.12, eased),
        opacity: mix(0.12, 0.23, eased),
        transformOrigin: "500px 644px"
      });

      gsap.set(refs.bridgeA, { opacity: mix(0, 0.96, neckInfluence), strokeWidth: mix(4.2, 5.8, neckInfluence) });
      gsap.set(refs.bridgeB, { opacity: mix(0, 0.92, neckInfluence), strokeWidth: mix(3.8, 5.1, neckInfluence) });
      gsap.set(refs.bridgeC, { opacity: mix(0, 0.88, neckInfluence), strokeWidth: mix(3.2, 4.4, neckInfluence) });
      gsap.set(refs.bridgeD, { opacity: mix(0, 0.84, neckInfluence), strokeWidth: mix(3, 4.1, neckInfluence) });
      gsap.set(refs.bridgeE, { opacity: mix(0, 0.74, neckInfluence), strokeWidth: mix(2.4, 3.2, neckInfluence) });
      gsap.set(refs.bridgeF, { opacity: mix(0, 0.64, neckInfluence), strokeWidth: mix(1.9, 2.5, neckInfluence) });
      gsap.set(refs.bridgeGlowA, { opacity: mix(0, 0.62, neckInfluence), strokeWidth: mix(1.3, 1.7, neckInfluence) });
      gsap.set(refs.bridgeGlowB, { opacity: mix(0, 0.52, neckInfluence), strokeWidth: mix(1.1, 1.45, neckInfluence) });
      refs.bridgeA.setAttribute("d", bridgePath(0, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeB.setAttribute("d", bridgePath(1, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeC.setAttribute("d", bridgePath(2, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeD.setAttribute("d", bridgePath(3, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeE.setAttribute("d", bridgePath(4, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeF.setAttribute("d", bridgePath(5, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeGlowA.setAttribute("d", bridgePath(0, bridgePointX, bridgePointY, neckInfluence));
      refs.bridgeGlowB.setAttribute("d", bridgePath(1, bridgePointX, bridgePointY, neckInfluence));

      gsap.set(refs.neck, {
        x: neckX,
        y: neckY,
        rotation: mix(0, -10, neckInfluence) + pullAngle * 0.08,
        scaleX: mix(0.72, 1.04, neckInfluence),
        scaleY: mix(0.76, 1.02, neckInfluence),
        opacity: mix(0, 0.92, neckInfluence),
        transformOrigin: "0px 0px"
      });
      gsap.set(refs.lobeLeft, {
        x: leftLobeX,
        y: leftLobeY,
        rotation: mix(0, -18, leftInfluence),
        scaleX: mix(0.48, 1.02, leftInfluence),
        scaleY: mix(0.5, 0.98, leftInfluence),
        opacity: mix(0, 0.88, leftInfluence),
        transformOrigin: "0px 0px"
      });
      gsap.set(refs.lobeTop, {
        x: topLobeX,
        y: topLobeY,
        rotation: mix(0, 10, topInfluence),
        scaleX: mix(0.42, 0.98, topInfluence),
        scaleY: mix(0.44, 0.94, topInfluence),
        opacity: mix(0, 0.78, topInfluence),
        transformOrigin: "0px 0px"
      });
      gsap.set(refs.tuft, {
        x: tuftX,
        y: tuftY,
        rotation: mix(0, -11, rightInfluence) + pullAngle * 0.1,
        opacity: mix(0, 1, rightInfluence),
        transformOrigin: "0px 0px"
      });
      gsap.set(refs.tuftBody, {
        scaleX: mix(0.68, 1.1, rightInfluence),
        scaleY: mix(0.72, 1.08, rightInfluence),
        skewX: mix(0, 4, rightInfluence),
        opacity: mix(0.18, 1, rightInfluence),
        transformOrigin: "0px 0px"
      });
      gsap.set(refs.flyaways, {
        x: mix(-8, 30, rightInfluence),
        y: mix(0, -24, rightInfluence),
        rotation: mix(0, -8, rightInfluence),
        scaleX: mix(0.72, 1.12, rightInfluence),
        scaleY: mix(0.72, 1.12, rightInfluence),
        opacity: mix(0, 0.9, rightInfluence),
        transformOrigin: "0px 0px"
      });

      if (activeBase && activeTarget && activeLift > 0.04) {
        refs.tensionA.setAttribute("d", tensionStrandPath(activeBase, activeTarget, -9, -5, -8));
        refs.tensionB.setAttribute("d", tensionStrandPath(activeBase, activeTarget, 0, -2, 5));
        refs.tensionC.setAttribute("d", tensionStrandPath(activeBase, activeTarget, 8, 6, 10));
        refs.tensionD.setAttribute("d", tensionStrandPath(activeBase, activeTarget, -4, 8, -2));
        gsap.set(refs.activeTension, { opacity: mix(0, 0.94, activeLift) });
      } else {
        refs.tensionA.setAttribute("d", "");
        refs.tensionB.setAttribute("d", "");
        refs.tensionC.setAttribute("d", "");
        refs.tensionD.setAttribute("d", "");
        gsap.set(refs.activeTension, { opacity: 0 });
      }

      setGuidePath(activeBase, activeTarget, state.dragging ? 0.9 : 0);
      syncZoneHighlights();
    }

    function stopSettleTween() {
      if (state.settleTween) {
        state.settleTween.kill();
        state.settleTween = null;
      }
    }

    function animatePullState(targetPulls, duration, easeName, done) {
      var visual = {
        p0: state.pullProgresses[0] || 0,
        p1: state.pullProgresses[1] || 0,
        p2: state.pullProgresses[2] || 0,
        p3: state.pullProgresses[3] || 0,
        p4: state.pullProgresses[4] || 0
      };

      if (typeof easeName === "function") {
        done = easeName;
        easeName = "power2.out";
      }

      stopSettleTween();
      state.settleTween = gsap.to(visual, {
        p0: targetPulls[0],
        p1: targetPulls[1],
        p2: targetPulls[2],
        p3: targetPulls[3],
        p4: targetPulls[4],
        duration: duration,
        ease: easeName || "power2.out",
        onUpdate: function() {
          state.pullProgresses = [visual.p0, visual.p1, visual.p2, visual.p3, visual.p4];
          applySpreadVisual();
        },
        onComplete: function() {
          state.pullProgresses = targetPulls.slice();
          applySpreadVisual();
          state.settleTween = null;
          if (done) {
            done();
          }
        }
      });
    }

    function setReadyEvidence() {
      syncEvidence({
        currentMass: "0.00 g",
        initialMass: "--",
        finalMass: "--",
        deltaMass: "--",
        measurementStable: "Awaiting initial measurement",
        boundaryStatus: "Compact sample staged on tray",
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
        boundaryStatus: "Compact sample on tray",
        beforeSnapshot: "steel-before-custom-stage",
        activeMistakeFlags: []
      });
    }

    function setDraggingEvidence() {
      syncEvidence({
        currentMass: "unstable",
        initialMass: formatMass(MASS_VALUE),
        measurementStable: "Unstable during manipulation",
        boundaryStatus: "Same sample stretched into a larger volume",
        beforeSnapshot: "steel-before-custom-stage",
        activeMistakeFlags: []
      });
    }

    function setFluffedEvidence() {
      syncEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        measurementStable: "Stable",
        boundaryStatus: "Same sample fluffed and settled on tray",
        beforeSnapshot: "steel-before-custom-stage",
        afterSnapshot: "steel-fluffed-custom-stage",
        activeMistakeFlags: []
      });
    }

    function setFinalEvidence() {
      syncEvidence({
        currentMass: formatMass(MASS_VALUE),
        initialMass: formatMass(MASS_VALUE),
        finalMass: formatMass(MASS_VALUE),
        deltaMass: "0.00 g",
        measurementStable: "Stable",
        boundaryStatus: "Same sample fluffed and settled on tray",
        beforeSnapshot: "steel-before-custom-stage",
        afterSnapshot: "steel-after-custom-stage",
        activeMistakeFlags: []
      });
    }

    function resetScene() {
      if (state.massTween) {
        state.massTween.kill();
        state.massTween = null;
      }
      stopSettleTween();
      stopZonePulse();
      state.beforeMeasured = false;
      state.spreadComplete = false;
      state.afterMeasured = false;
      state.dragging = false;
      state.animated = false;
      state.pullProgresses = [0, 0, 0, 0, 0];
      state.activeZoneIndex = 0;
      state.activeDragProgress = 0;
      state.dragPoint = null;
      state.dragPointerId = null;
      state.dragZoneIndex = null;
      gsap.set(refs.sampleAssembly, { rotation: 0, y: 0 });
      applySpreadVisual();
      setScaleReadout(0);
      setProcedure("ready");
      setStatus("Weigh the compact sample first, then pull the highlighted grab zones outward to fluff the same steel wool into a much larger volume.");
      syncButtons();
      host.setStatus({
        interactive: "Custom stage ready",
        model: "Steel wool manipulation stage",
        evidence: "Awaiting first measurement"
      });
      setReadyEvidence();
      host.emit("steel.stageReady", { experimentId: STAGE_ID });
    }

    function completeActiveZone() {
      var targetPulls = state.pullProgresses.slice();
      var completedIndex = state.activeZoneIndex;
      targetPulls[completedIndex] = 1;

      animatePullState(targetPulls, 0.36, "power2.out", function() {
        state.dragging = false;
        state.dragZoneIndex = null;
        state.activeDragProgress = 0;
        state.dragPoint = null;

        if (!state.animated) {
          state.animated = true;
          host.emit("steel.manipulationStarted", { spreadProgress: state.spreadProgress });
        }

        if (completedIndex >= PULL_ZONES.length - 1) {
          state.spreadComplete = true;
          setScaleReadout(MASS_VALUE);
          setProcedure("fluffed");
          setStatus("The same steel wool now occupies much more space. Weigh it again to check whether the mass changed.");
          setFluffedEvidence();
          host.setStatus({ evidence: "Awaiting final measurement" });
          host.emit("steel.manipulationCompleted", { spreadProgress: state.spreadProgress });
          gsap.fromTo(refs.sampleAssembly, {
            rotation: -1.1,
            y: 2
          }, {
            rotation: 0.8,
            y: -3,
            duration: 0.18,
            repeat: 1,
            yoyo: true,
            ease: "sine.inOut",
            onComplete: function() {
              gsap.set(refs.sampleAssembly, { rotation: 0, y: 0 });
            }
          });
        } else {
          state.activeZoneIndex = completedIndex + 1;
          setScaleReadout(MASS_VALUE);
          setProcedure("beforeMeasured");
          setStatus("Grab the next highlighted area and pull outward to keep fluffing the same sample.");
          setMeasuredEvidence();
          host.setStatus({ evidence: "Initial evidence recorded" });
        }

        applySpreadVisual();
        syncButtons();
      });
    }

    function cancelCurrentPull() {
      state.dragging = false;
      state.dragZoneIndex = null;
      state.activeDragProgress = 0;
      state.dragPoint = null;
      applySpreadVisual();
      setScaleReadout(MASS_VALUE);
      setProcedure("beforeMeasured");
      setStatus("Pull farther in the highlighted direction to keep fluffing the same sample.");
      setMeasuredEvidence();
      host.setStatus({ evidence: "Initial evidence recorded" });
      syncButtons();
    }

    function updateDrag(point) {
      var zone = PULL_ZONES[state.dragZoneIndex];
      var vx = zone.target.x - zone.base.x;
      var vy = zone.target.y - zone.base.y;
      var lengthSq = vx * vx + vy * vy;
      var px = point.x - zone.base.x;
      var py = point.y - zone.base.y;
      var rawProgress = (px * vx + py * vy) / lengthSq;
      var progress = clamp(rawProgress, 0, 1);
      var guidePoint = {
        x: zone.base.x + vx * progress,
        y: zone.base.y + vy * progress
      };

      state.activeDragProgress = progress;
      state.dragPoint = guidePoint;

      applySpreadVisual();

      if (progress > 0.18) {
        setStatus("Good. Keep pulling from that highlighted patch so the steel wool stretches and opens in that direction.");
      }

      setProcedure("dragging");
      setDraggingEvidence();
      setUnstableReadout(progress, guidePoint.x, guidePoint.y);
      host.setStatus({ evidence: "Manipulation in progress" });
    }

    function handlePointerDown(event) {
      var zoneIndex = Number(event.currentTarget.getAttribute("data-zone-index"));

      if (!state.beforeMeasured || state.afterMeasured || state.spreadComplete || state.settleTween || zoneIndex !== state.activeZoneIndex) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      startZoneDrag(zoneIndex, event, event.currentTarget);
    }

    function startZoneDrag(zoneIndex, event, captureTarget) {
      state.dragging = true;
      state.dragPointerId = event.pointerId;
      state.dragZoneIndex = zoneIndex;
      state.activeDragProgress = 0;
      state.dragPoint = PULL_ZONES[zoneIndex].base;
      if (captureTarget && captureTarget.setPointerCapture) {
        captureTarget.setPointerCapture(event.pointerId);
      }
      syncButtons();
      updateDrag(svgPointFromEvent(event));
    }

    function handleStagePointerDown(event) {
      var point;
      var zone;
      var dx;
      var dy;

      if (!state.beforeMeasured || state.afterMeasured || state.spreadComplete || state.settleTween || state.dragging) {
        return;
      }

      point = svgPointFromEvent(event);
      zone = PULL_ZONES[state.activeZoneIndex];
      dx = point.x - zone.base.x;
      dy = point.y - zone.base.y;

      if ((dx * dx + dy * dy) > (78 * 78)) {
        return;
      }

      event.preventDefault();
      startZoneDrag(state.activeZoneIndex, event, refs.svg);
    }

    function handlePointerMove(event) {
      if (!state.dragging || event.pointerId !== state.dragPointerId) {
        return;
      }
      event.preventDefault();
      updateDrag(svgPointFromEvent(event));
    }

    function handlePointerUp(event) {
      if (!state.dragging || event.pointerId !== state.dragPointerId) {
        return;
      }

      event.preventDefault();
      if (event.currentTarget.releasePointerCapture) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      state.dragPointerId = null;

      if (state.activeDragProgress >= 0.74) {
        completeActiveZone();
      } else {
        cancelCurrentPull();
      }
    }

    function handleMeasureBefore() {
      if (state.beforeMeasured || state.dragging) {
        return;
      }

      state.beforeMeasured = true;
      pulseScale();
      setProcedure("beforeMeasured");
      setStatus("Grab the highlighted area on the steel wool and pull outward to start fluffing the same sample.");
      host.emit("steel.massRecordedBefore", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Recording initial mass" });
      syncButtons();
      animateMass(0, MASS_VALUE, 0.9, function() {
        setMeasuredEvidence();
        host.setStatus({ evidence: "Initial evidence recorded" });
      });
    }

    function handleMeasureAfter() {
      if (!state.spreadComplete || state.afterMeasured || state.dragging) {
        return;
      }

      state.afterMeasured = true;
      pulseScale();
      setProcedure("done");
      setStatus("Final mass recorded. The steel wool occupied far more space, but the measured mass stayed the same.");
      host.emit("steel.massRecordedAfter", { mass: MASS_VALUE });
      host.setStatus({ evidence: "Locking evidence" });
      syncButtons();
      animateMass(MASS_VALUE - 0.06, MASS_VALUE, 0.65, function() {
        setFinalEvidence();
        host.lockEvidence();
      });
    }

    refs.zoneHits.forEach(function(hit, index) {
      hit.setAttribute("data-zone-index", String(index));
      hit.addEventListener("pointerdown", handlePointerDown);
      hit.addEventListener("pointermove", handlePointerMove);
      hit.addEventListener("pointerup", handlePointerUp);
      hit.addEventListener("pointercancel", handlePointerUp);
    });
    refs.svg.addEventListener("pointerdown", handleStagePointerDown);
    refs.svg.addEventListener("pointermove", handlePointerMove);
    refs.svg.addEventListener("pointerup", handlePointerUp);
    refs.svg.addEventListener("pointercancel", handlePointerUp);
    refs.before.addEventListener("click", handleMeasureBefore);
    refs.after.addEventListener("click", handleMeasureAfter);
    refs.reset.addEventListener("click", resetScene);

    resetScene();

    (function maybeRunDebugMode() {
      var params = new URLSearchParams(window.location.search);
      var stageDebug = params.get("stageDebug");

      if (stageDebug === "steel-before") {
        state.beforeMeasured = true;
        state.activeZoneIndex = 0;
        setScaleReadout(MASS_VALUE);
        applySpreadVisual();
        setProcedure("beforeMeasured");
        setMeasuredEvidence();
        setStatus("Grab the highlighted patch on the steel wool and pull outward to start fluffing the same sample.");
        host.setStatus({
          interactive: "Custom stage ready",
          model: "Steel wool manipulation stage",
          evidence: "Initial evidence recorded"
        });
        syncButtons();
      } else if (stageDebug === "steel-step-1") {
        state.beforeMeasured = true;
        state.pullProgresses = [1, 0, 0, 0, 0];
        state.activeZoneIndex = 1;
        setScaleReadout(MASS_VALUE);
        applySpreadVisual();
        setProcedure("beforeMeasured");
        setMeasuredEvidence();
        setStatus("Grab the next highlighted patch and pull outward to keep fluffing the same sample.");
        host.setStatus({
          interactive: "Custom stage ready",
          model: "Steel wool manipulation stage",
          evidence: "Initial evidence recorded"
        });
        syncButtons();
      } else if (stageDebug === "steel-drag") {
        state.beforeMeasured = true;
        state.pullProgresses = [1, 0.82, 0, 0, 0];
        state.activeZoneIndex = 1;
        state.dragging = true;
        state.dragZoneIndex = 1;
        state.activeDragProgress = 0.82;
        state.dragPoint = {
          x: mix(PULL_ZONES[1].base.x, PULL_ZONES[1].target.x, 0.82),
          y: mix(PULL_ZONES[1].base.y, PULL_ZONES[1].target.y, 0.82)
        };
        applySpreadVisual();
        setUnstableReadout(0.82, state.dragPoint.x, state.dragPoint.y);
        setProcedure("dragging");
        setDraggingEvidence();
        setStatus("Good. Keep pulling from that highlighted patch so the steel wool stretches and opens in that direction.");
        host.setStatus({
          interactive: "Custom stage ready",
          model: "Steel wool manipulation stage",
          evidence: "Manipulation in progress"
        });
        syncButtons();
      } else if (stageDebug === "steel-pull") {
        state.beforeMeasured = true;
        state.pullProgresses = [1, 1, 1, 1, 1];
        state.activeZoneIndex = PULL_ZONES.length;
        state.spreadComplete = true;
        applySpreadVisual();
        setScaleReadout(MASS_VALUE);
        setProcedure("fluffed");
        setFluffedEvidence();
        setStatus("The same steel wool now occupies much more space. Weigh it again to check whether the mass changed.");
        host.setStatus({
          interactive: "Custom stage ready",
          model: "Steel wool manipulation stage",
          evidence: "Awaiting final measurement"
        });
        syncButtons();
      } else if (stageDebug === "steel-after") {
        state.beforeMeasured = true;
        state.spreadComplete = true;
        state.afterMeasured = true;
        state.pullProgresses = [1, 1, 1, 1, 1];
        state.activeZoneIndex = PULL_ZONES.length;
        applySpreadVisual();
        setScaleReadout(MASS_VALUE);
        setProcedure("done");
        setFinalEvidence();
        setStatus("Final mass recorded. The steel wool occupied far more space, but the measured mass stayed the same.");
        host.setStatus({
          interactive: "Custom stage ready",
          model: "Steel wool manipulation stage",
          evidence: "Locked"
        });
        host.lockEvidence();
        syncButtons();
      }
    }());

    return function dispose() {
      if (state.massTween) {
        state.massTween.kill();
      }
      stopSettleTween();
      stopZonePulse();
      refs.zoneHits.forEach(function(hit) {
        hit.removeEventListener("pointerdown", handlePointerDown);
        hit.removeEventListener("pointermove", handlePointerMove);
        hit.removeEventListener("pointerup", handlePointerUp);
        hit.removeEventListener("pointercancel", handlePointerUp);
      });
      refs.before.removeEventListener("click", handleMeasureBefore);
      refs.after.removeEventListener("click", handleMeasureAfter);
      refs.reset.removeEventListener("click", resetScene);
      container.innerHTML = "";
    };
  }

  window.RainbowCustomStages[STAGE_ID] = {
    mount: mount
  };
}());
