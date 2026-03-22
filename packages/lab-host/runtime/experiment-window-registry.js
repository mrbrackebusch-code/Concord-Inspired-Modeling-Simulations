(function() {
  var experiments = [
    {
      id: "unit-01/lesson-01/mass-change/steel-wool-pulled-apart",
      shortId: "steel-wool-pulled-apart",
      hostModes: ["studio", "embed", "game"],
      title: "Steel wool pulled apart",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-pulled-apart.json",
      stageLabel: "Careful handling / sample integrity",
      briefing: "Weigh the steel wool, pull part of it away from the tray, then return it before recording the run. The apparatus window should eventually track fragment loss and measurement integrity as first-class events.",
      objectTray: ["Steel wool sample", "Balance tray", "Drag handle"],
      procedure: [
        "Place the full sample on the tray",
        "Note the stable starting mass",
        "Pull part of the sample away",
        "Return the sample to the tray",
        "Record the run and compare repeated results"
      ],
      sharedVerbs: ["drag/drop", "click/grab", "press Record", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "before snapshot", "after snapshot"],
      eventHooks: ["onObjectPlaced", "onMeasurementStable", "onMassRecorded", "onRunCompleted"],
      mistakeFlags: ["fragmentLost", "measurementUnstable"]
    },
    {
      id: "unit-01/lesson-01/mass-change/ice-to-water",
      shortId: "ice-to-water",
      hostModes: ["studio", "embed", "game"],
      title: "Ice to water",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/ice-to-water.json",
      stageLabel: "Closed-system melt trial",
      briefing: "Weigh the container with ice, run the melt, then return to the scale. The experiment window should eventually track melt timing, leak detection, and measurement timing cleanly.",
      objectTray: ["Beaker or vial", "Ice sample", "Balance tray"],
      procedure: [
        "Place the ice sample in the container",
        "Record the initial mass",
        "Start the melt",
        "Wait for the melt to complete",
        "Record the final mass"
      ],
      sharedVerbs: ["press Record", "press Run", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "boundary status", "before snapshot", "after snapshot"],
      eventHooks: ["onObjectPlaced", "onRunStarted", "onRunCompleted", "onMassRecorded", "onMeasurementStable"],
      mistakeFlags: ["waterLeaked", "measurementUnstable"]
    },
    {
      id: "unit-01/lesson-01/mass-change/precipitate",
      shortId: "precipitate",
      hostModes: ["studio", "embed", "game"],
      title: "Precipitate forms",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/precipitate.json",
      stageLabel: "Transfer cleanly / no contamination",
      briefing: "Use the two-capped-vials sequence: weigh before, pour, then weigh after. The shell should eventually own the evidence tray while the Lab interactive handles the visible pour and precipitate development.",
      objectTray: ["Two capped vials", "Solutions", "Balance tray"],
      procedure: [
        "Place both capped vials on the tray",
        "Record the initial mass",
        "Pour one vial into the other",
        "Wait for the new solid to form",
        "Record the final mass"
      ],
      sharedVerbs: ["snap into slot", "press Record", "press Run", "Capture", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "before snapshot", "after snapshot", "event flags"],
      eventHooks: ["onMassRecorded", "onRunStarted", "onRunCompleted", "onSnapshotCaptured"],
      mistakeFlags: ["solutionSpilled", "transferIncomplete", "measurementUnstable"]
    },
    {
      id: "unit-01/lesson-01/mass-change/steel-wool-burns",
      shortId: "steel-wool-burns",
      hostModes: ["studio", "embed", "game"],
      title: "Steel wool burns",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/steel-wool-burns.json",
      stageLabel: "Contain fragments / observe matter entering",
      briefing: "Weigh the steel wool, start heating, and record what happens after the burn. Later versions of the experiment window should expose incoming-matter hooks without telling the student the explanation too early.",
      objectTray: ["Steel wool sample", "Heat source", "Containment dish", "Balance tray"],
      procedure: [
        "Place the steel wool on the tray",
        "Record the initial mass",
        "Start heating",
        "Let the burn finish",
        "Record the final mass"
      ],
      sharedVerbs: ["press Record", "press Run", "Capture", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "boundary status", "before snapshot", "after snapshot"],
      eventHooks: ["onRunStarted", "onRunCompleted", "onMassRecorded", "onMatterEntered"],
      mistakeFlags: ["fragmentLost", "measurementUnstable"]
    },
    {
      id: "unit-01/lesson-01/mass-change/sugar-dissolves",
      shortId: "sugar-dissolves",
      hostModes: ["studio", "embed", "game"],
      title: "Sugar dissolves",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/sugar-dissolves.json",
      stageLabel: "Controlled transfer / gentle handling",
      briefing: "Weigh the vial, water, cap, and sugar before transfer, then dissolve the sugar and reweigh. The host shell should eventually track swirl quality, leaks, and evidence capture as reusable signals.",
      objectTray: ["Vial with water", "Cap", "Sugar sample", "Balance tray"],
      procedure: [
        "Place the vial, cap, and sugar on the tray",
        "Record the initial mass",
        "Transfer the sugar into the vial",
        "Swirl until dissolved",
        "Record the final mass"
      ],
      sharedVerbs: ["press Record", "press Run", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "boundary status", "before snapshot", "after snapshot"],
      eventHooks: ["onObjectPlaced", "onRunCompleted", "onMassRecorded", "onSnapshotCaptured"],
      mistakeFlags: ["spillOccurred", "leakOccurred", "measurementUnstable"]
    },
    {
      id: "unit-01/lesson-01/mass-change/alka-seltzer",
      shortId: "alka-seltzer",
      hostModes: ["studio", "embed", "game"],
      title: "Alka-Seltzer reacts",
      lesson: "Unit 1 Lesson 1",
      suite: "Mass & Change",
      interactiveUrl: "/simulations/unit-01/lesson-01/mass-change/interactives/alka-seltzer.json",
      stageLabel: "Capture the escaping evidence",
      briefing: "Weigh the setup, add the tablet, observe the gas-producing reaction, and reweigh. This is the clearest future candidate for host-visible gas-escape and boundary-state hooks.",
      objectTray: ["Vial with water", "Cap", "Tablet piece", "Balance tray"],
      procedure: [
        "Place the vial, cap, and tablet on the tray",
        "Record the initial mass",
        "Add the tablet and start the reaction",
        "Observe bubbles and gas behavior",
        "Record the final mass"
      ],
      sharedVerbs: ["press Record", "press Run", "Capture", "Reset"],
      evidenceFields: ["current mass", "initial mass", "final mass", "delta mass", "boundary status", "before snapshot", "after snapshot", "event flags"],
      eventHooks: ["onRunStarted", "onRunCompleted", "onGasEscaped", "onMassRecorded"],
      mistakeFlags: ["capLoose", "gasEscaped", "measurementUnstable"]
    }
  ];

  function cloneExperiment(experiment) {
    return JSON.parse(JSON.stringify(experiment));
  }

  function buildLaunchUrl(identifier, options) {
    var experiment = getByIdentifier(identifier) || experiments[0];
    var params = new URLSearchParams();
    var shellMode = options && options.mode ? options.mode : "studio";

    params.set("experiment", experiment.id);
    params.set("mode", shellMode);

    if (options && options.parentOrigin) {
      params.set("parentOrigin", options.parentOrigin);
    }

    if (options && options.sessionId) {
      params.set("sessionId", options.sessionId);
    }

    return "/apps/studio/experiment-window/index.html?" + params.toString();
  }

  function getByIdentifier(identifier) {
    var i;

    if (!identifier) {
      return cloneExperiment(experiments[0]);
    }

    for (i = 0; i < experiments.length; i += 1) {
      if (experiments[i].id === identifier || experiments[i].shortId === identifier) {
        return cloneExperiment(experiments[i]);
      }
    }

    return null;
  }

  window.RainbowLabHostRegistry = {
    list: function() {
      return experiments.map(function(experiment) {
        return cloneExperiment(experiment);
      });
    },
    get: function(identifier) {
      return getByIdentifier(identifier);
    },
    buildLaunchUrl: function(identifier, options) {
      return buildLaunchUrl(identifier, options);
    },
    first: function() {
      return cloneExperiment(experiments[0]);
    }
  };
}());
