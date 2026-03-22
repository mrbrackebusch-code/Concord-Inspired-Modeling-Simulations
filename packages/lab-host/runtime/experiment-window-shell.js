(function() {
  var controller = null;
  var launchOptions = null;
  var embedBridge = {
    enabled: false,
    parentOrigin: "*",
    sessionId: null,
    stateDispatchPending: false,
    lastDispatchReason: "init"
  };
  var hostState = {
    experiment: null,
    shellMode: "studio",
    procedure: [],
    evidence: {
      currentMass: "--",
      initialMass: "--",
      finalMass: "--",
      deltaMass: "--",
      measurementStable: "Awaiting bridge",
      boundaryStatus: "Awaiting bridge",
      beforeSnapshot: "--",
      afterSnapshot: "--",
      activeMistakeFlags: []
    },
    status: {
      host: "Booting",
      interactive: "Pending",
      model: "Pending",
      evidence: "Awaiting bridge"
    },
    events: [],
    lastSeenEventSequence: 0
  };

  function cloneHostState() {
    return JSON.parse(JSON.stringify(hostState));
  }

  function text(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function html(id, value) {
    var element = document.getElementById(id);
    if (element) {
      element.innerHTML = value;
    }
  }

  function normalizeShellMode(mode) {
    return mode === "embed" || mode === "game" ? mode : "studio";
  }

  function parseLaunchOptions() {
    var params = new URLSearchParams(window.location.search);

    return {
      experimentId: params.get("experiment"),
      mode: normalizeShellMode(params.get("mode")),
      parentOrigin: params.get("parentOrigin") || "*",
      sessionId: params.get("sessionId") || ""
    };
  }

  function buildShellUrl(experimentId, options) {
    var params = new URLSearchParams();
    var mode = options && options.mode ? normalizeShellMode(options.mode) : hostState.shellMode;

    params.set("experiment", experimentId);
    params.set("mode", mode || "studio");

    if (options && options.parentOrigin) {
      params.set("parentOrigin", options.parentOrigin);
    }

    if (options && options.sessionId) {
      params.set("sessionId", options.sessionId);
    }

    return "/apps/studio/experiment-window/index.html?" + params.toString();
  }

  function buildRawUrl(experiment) {
    return "/vendor/lab/dist/embeddable.html#" + experiment.interactiveUrl;
  }

  function createListItem(label, value, className) {
    var classes = className ? " class=\"" + className + "\"" : "";
    return "<li" + classes + "><span>" + label + "</span><strong>" + value + "</strong></li>";
  }

  function recordEvent(type, payload) {
    hostState.events.unshift({
      type: type,
      payload: payload || {},
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    });

    if (hostState.events.length > 10) {
      hostState.events = hostState.events.slice(0, 10);
    }

    renderEventLog();
    notifyParent("rainbow.labHost.event", {
      event: hostState.events[0]
    });
    scheduleStateDispatch("event");
  }

  function notifyParent(type, payload) {
    if (!embedBridge.enabled || window.parent === window) {
      return;
    }

    window.parent.postMessage({
      source: "rainbow-lab-host",
      type: type,
      sessionId: embedBridge.sessionId,
      experimentId: hostState.experiment ? hostState.experiment.id : null,
      shellMode: hostState.shellMode,
      payload: payload || {}
    }, embedBridge.parentOrigin);
  }

  function scheduleStateDispatch(reason) {
    if (!embedBridge.enabled) {
      return;
    }

    embedBridge.lastDispatchReason = reason || "stateChanged";

    if (embedBridge.stateDispatchPending) {
      return;
    }

    embedBridge.stateDispatchPending = true;

    window.setTimeout(function() {
      embedBridge.stateDispatchPending = false;
      notifyParent("rainbow.labHost.state", {
        reason: embedBridge.lastDispatchReason,
        state: cloneHostState()
      });
    }, 0);
  }

  function renderProcedure() {
    var markup = hostState.procedure.map(function(step, index) {
      return "<li class=\"procedure-step procedure-step--" + step.status + "\">" +
        "<span class=\"procedure-step__index\">" + (index + 1) + "</span>" +
        "<div><strong>" + step.label + "</strong><small>" + step.statusLabel + "</small></div>" +
        "</li>";
    }).join("");

    html("procedure-list", markup);
  }

  function renderInstrumentPanel() {
    var markup = [
      createListItem("Host", hostState.status.host),
      createListItem("Interactive", hostState.status.interactive),
      createListItem("Current model", hostState.status.model),
      createListItem("Evidence state", hostState.status.evidence),
      createListItem("Current mass", hostState.evidence.currentMass),
      createListItem("Boundary status", hostState.evidence.boundaryStatus),
      createListItem("Measurement stable", hostState.evidence.measurementStable)
    ].join("");

    html("instrument-status-list", markup);
  }

  function renderEvidencePanel() {
    var markup = [
      createListItem("Current mass", hostState.evidence.currentMass),
      createListItem("Initial mass", hostState.evidence.initialMass),
      createListItem("Final mass", hostState.evidence.finalMass),
      createListItem("Delta mass", hostState.evidence.deltaMass),
      createListItem("Before snapshot", hostState.evidence.beforeSnapshot),
      createListItem("After snapshot", hostState.evidence.afterSnapshot)
    ].join("");

    html("evidence-values-list", markup);
  }

  function renderMistakeFlags() {
    var activeFlags = hostState.evidence.activeMistakeFlags || [];
    var markup = hostState.experiment.mistakeFlags.map(function(flag) {
      var active = activeFlags.indexOf(flag) !== -1;
      var className = active ? "mistake-flag mistake-flag--active" : "mistake-flag";
      var suffix = active ? " active in current state" : " inactive";
      return "<li class=\"" + className + "\"><span>" + flag + "</span><strong>" + suffix + "</strong></li>";
    }).join("");

    html("mistake-flags-list", markup);
  }

  function renderEventLog() {
    var markup;

    if (hostState.events.length === 0) {
      markup = "<li class=\"event-log__empty\">No host-visible events yet.</li>";
    } else {
      markup = hostState.events.map(function(entry) {
        var payloadKeys = Object.keys(entry.payload);
        var payloadText = payloadKeys.length ? JSON.stringify(entry.payload) : "no payload";
        return "<li class=\"event-log__item\">" +
          "<span class=\"event-log__time\">" + entry.timestamp + "</span>" +
          "<strong>" + entry.type + "</strong>" +
          "<code>" + payloadText + "</code>" +
          "</li>";
      }).join("");
    }

    html("event-log", markup);
  }

  function renderShellNote() {
    var note = hostState.shellMode === "embed" ?
      "Embedded platform view active. This close-up experiment surface is callable from a parent host while the simulation continues to own the phenomenon details." :
      "Stage 1 host shell active. The phenomenon still owns most controls inside the Lab stage while procedure, evidence, and event contracts migrate outward.";

    text("shell-note", note);
  }

  function renderExperimentMetadata(experiment) {
    text("experiment-suite", experiment.lesson + " / " + experiment.suite);
    text("experiment-title", experiment.title);
    text("experiment-stage-label", experiment.stageLabel);
    text("briefing-copy", experiment.briefing);

    html("object-tray-list", experiment.objectTray.map(function(item) {
      return "<li>" + item + "</li>";
    }).join(""));

    html("interaction-grammar-list", experiment.sharedVerbs.map(function(verb) {
      return "<li>" + verb + "</li>";
    }).join(""));

    html("evidence-schema-list", experiment.evidenceFields.map(function(field) {
      return "<li>" + field + "</li>";
    }).join(""));

    html("event-contract-list", experiment.eventHooks.map(function(hook) {
      return "<li>" + hook + "</li>";
    }).join(""));

    document.getElementById("raw-interactive-link").setAttribute("href", buildRawUrl(experiment));
  }

  function renderExperimentSelector(currentExperiment) {
    var experiments = window.RainbowLabHostRegistry.list();
    var selector = document.getElementById("experiment-selector");

    if (!selector) {
      return;
    }

    selector.innerHTML = experiments.map(function(experiment) {
      var selected = experiment.id === currentExperiment.id ? " selected" : "";
      return "<option value=\"" + experiment.id + "\"" + selected + ">" + experiment.title + "</option>";
    }).join("");

    selector.addEventListener("change", function(event) {
      window.location.href = buildShellUrl(event.target.value, {
        mode: hostState.shellMode,
        parentOrigin: embedBridge.parentOrigin !== "*" ? embedBridge.parentOrigin : "",
        sessionId: embedBridge.sessionId
      });
    });
  }

  function renderAll(experiment) {
    renderShellNote();
    renderExperimentMetadata(experiment);
    renderProcedure();
    renderInstrumentPanel();
    renderEvidencePanel();
    renderMistakeFlags();
    renderEventLog();
  }

  function createBridge() {
    window.RainbowLabHost = {
      version: "0.1.0",
      buildLaunchUrl: function(experimentId, options) {
        return buildShellUrl(experimentId, options);
      },
      emit: function(type, payload) {
        recordEvent(type, payload);
      },
      setEvidence: function(patch) {
        var key;

        for (key in patch) {
          if (patch.hasOwnProperty(key)) {
            hostState.evidence[key] = patch[key];
          }
        }

        hostState.status.evidence = "Updated";
        renderEvidencePanel();
        renderInstrumentPanel();
        renderMistakeFlags();
        scheduleStateDispatch("bridgeEvidence");
      },
      setStatus: function(patch) {
        var key;

        for (key in patch) {
          if (patch.hasOwnProperty(key)) {
            hostState.status[key] = patch[key];
          }
        }

        renderInstrumentPanel();
        scheduleStateDispatch("bridgeStatus");
      },
      setProcedureStep: function(stepIndex, status, statusLabel) {
        if (!hostState.procedure[stepIndex]) {
          return;
        }

        hostState.procedure[stepIndex].status = status;
        hostState.procedure[stepIndex].statusLabel = statusLabel || status;
        renderProcedure();
        scheduleStateDispatch("bridgeProcedure");
      },
      lockEvidence: function() {
        hostState.status.evidence = "Locked";
        renderInstrumentPanel();
        scheduleStateDispatch("bridgeLockEvidence");
      },
      getState: function() {
        return cloneHostState();
      }
    };
  }

  function getScriptingApi() {
    return controller && controller.scriptingAPI && controller.scriptingAPI.api ? controller.scriptingAPI.api : null;
  }

  function getContractValue(name) {
    var api = getScriptingApi();

    if (!api) {
      return undefined;
    }

    try {
      return api.get(name);
    } catch (error) {
      return undefined;
    }
  }

  function resetContractState(experiment) {
    hostState.procedure = experiment.procedure.map(function(step) {
      return {
        label: step,
        status: "planned",
        statusLabel: "Awaiting simulation contract"
      };
    });

    hostState.evidence = {
      currentMass: "--",
      initialMass: "--",
      finalMass: "--",
      deltaMass: "--",
      measurementStable: "Awaiting bridge",
      boundaryStatus: "Awaiting bridge",
      beforeSnapshot: "--",
      afterSnapshot: "--",
      activeMistakeFlags: []
    };
    hostState.lastSeenEventSequence = 0;
    hostState.status.evidence = "Awaiting bridge";
    scheduleStateDispatch("contractReset");
  }

  function applyProcedureState(stepIndex, value) {
    var parts;
    var status;
    var statusLabel;

    if (!hostState.procedure[stepIndex] || typeof value !== "string" || value.length === 0) {
      return;
    }

    parts = value.split("::");
    status = parts[0] || "planned";
    statusLabel = parts.slice(1).join("::") || status;

    hostState.procedure[stepIndex].status = status;
    hostState.procedure[stepIndex].statusLabel = statusLabel;
    renderProcedure();
    scheduleStateDispatch("procedureChanged");
  }

  function applyActiveMistakeFlags(value) {
    if (typeof value !== "string" || value.trim().length === 0) {
      hostState.evidence.activeMistakeFlags = [];
    } else {
      hostState.evidence.activeMistakeFlags = value.split(",").map(function(flag) {
        return flag.trim();
      }).filter(function(flag) {
        return flag.length > 0;
      });
    }

    renderMistakeFlags();
    scheduleStateDispatch("mistakeFlagsChanged");
  }

  function applyEventSequence(value) {
    var sequence = Number(value);
    var eventType;
    var eventDetail;

    if (!isFinite(sequence) || sequence <= hostState.lastSeenEventSequence) {
      return;
    }

    hostState.lastSeenEventSequence = sequence;
    eventType = getContractValue("lastEventType") || "unknown";
    eventDetail = getContractValue("lastEventDetail") || "";
    recordEvent("sim." + eventType, {
      detail: eventDetail
    });
  }

  function applyEvidenceField(propertyName, value) {
    if (value === undefined || value === null || value === "") {
      return;
    }

    switch (propertyName) {
      case "currentMassDisplay":
        hostState.evidence.currentMass = value;
        break;
      case "initialMass":
        hostState.evidence.initialMass = value;
        break;
      case "finalMass":
        hostState.evidence.finalMass = value;
        break;
      case "deltaMass":
        hostState.evidence.deltaMass = value;
        break;
      case "measurementStable":
        hostState.evidence.measurementStable = value;
        break;
      case "boundaryStatus":
        hostState.evidence.boundaryStatus = value;
        break;
      case "beforeSnapshotId":
        hostState.evidence.beforeSnapshot = value;
        break;
      case "afterSnapshotId":
        hostState.evidence.afterSnapshot = value;
        break;
      case "activeMistakeFlags":
        applyActiveMistakeFlags(value);
        break;
      case "procedureCompletionState":
        hostState.status.evidence = value;
        break;
    }

    renderEvidencePanel();
    renderInstrumentPanel();
    scheduleStateDispatch("evidenceChanged");
  }

  function bindContractProperty(propertyName, applyValue) {
    var api = getScriptingApi();
    var initialValue;

    if (!api) {
      return;
    }

    initialValue = getContractValue(propertyName);
    if (initialValue !== undefined) {
      applyValue(initialValue);
      api.onPropertyChange(propertyName, function(value) {
        applyValue(value);
      });
    }
  }

  function bindContract(experiment) {
    var index;
    var evidenceProperties = [
      "currentMassDisplay",
      "initialMass",
      "finalMass",
      "deltaMass",
      "measurementStable",
      "boundaryStatus",
      "beforeSnapshotId",
      "afterSnapshotId",
      "activeMistakeFlags",
      "procedureCompletionState"
    ];

    resetContractState(experiment);
    renderProcedure();
    renderEvidencePanel();
    renderInstrumentPanel();
    renderMistakeFlags();

    for (index = 0; index < experiment.procedure.length; index += 1) {
      bindContractProperty("procedureState" + index, (function(stepIndex) {
        return function(value) {
          applyProcedureState(stepIndex, value);
        };
      }(index)));
    }

    evidenceProperties.forEach(function(propertyName) {
      bindContractProperty(propertyName, function(value) {
        applyEvidenceField(propertyName, value);
      });
    });

    bindContractProperty("eventSequence", applyEventSequence);
  }

  function mountInteractive(experiment) {
    var interactiveContainer = document.getElementById("interactive-container");

    if (!interactiveContainer || !window.Lab || !window.Lab.InteractivesController) {
      text("interactive-stage-status", "Lab runtime was not available.");
      notifyParent("rainbow.labHost.error", {
        message: "Lab runtime was not available."
      });
      return;
    }

    hostState.status.host = "Ready";
    hostState.status.interactive = "Loading";
    hostState.status.model = "Waiting for Lab";
    renderInstrumentPanel();
    scheduleStateDispatch("interactiveLoading");

    text("interactive-stage-status", "Loading experiment apparatus...");
    recordEvent("host.mountRequested", { interactiveUrl: experiment.interactiveUrl });

    controller = new window.Lab.InteractivesController(experiment.interactiveUrl, "#interactive-container");

    controller.on("interactiveRendered", function() {
      hostState.status.interactive = "Rendered";
      renderInstrumentPanel();
      text("interactive-stage-status", "Experiment apparatus loaded.");
      recordEvent("lab.interactiveRendered", {
        title: controller.get("title")
      });
      notifyParent("rainbow.labHost.interactiveRendered", {
        title: controller.get("title")
      });
      scheduleStateDispatch("interactiveRendered");
    });

    controller.on("modelLoaded", function() {
      var currentModelId = controller.currentModel && controller.currentModel.id ? controller.currentModel.id : "Loaded";

      hostState.status.interactive = "Loaded";
      hostState.status.model = currentModelId;
      renderInstrumentPanel();
      recordEvent("lab.modelLoaded", {
        modelId: currentModelId
      });
      bindContract(experiment);
      notifyParent("rainbow.labHost.modelLoaded", {
        modelId: currentModelId
      });
      scheduleStateDispatch("modelLoaded");
    });
  }

  function initializeState(experiment) {
    hostState.experiment = experiment;
    resetContractState(experiment);
    scheduleStateDispatch("experimentInitialized");
  }

  function applyShellMode() {
    var body = document.body;
    var page = document.querySelector(".window-page");

    if (!body || !page) {
      return;
    }

    body.classList.toggle("rainbow-experiment-window--embed", hostState.shellMode === "embed");
    page.classList.toggle("window-page--embed", hostState.shellMode === "embed");
  }

  function handleParentMessage(event) {
    var data = event.data;
    var payload;

    if (!embedBridge.enabled || !data || data.source !== "rainbow-game-host") {
      return;
    }

    if (embedBridge.parentOrigin !== "*" && event.origin !== embedBridge.parentOrigin) {
      return;
    }

    payload = data.payload || {};

    switch (data.type) {
      case "rainbow.labHost.requestState":
        scheduleStateDispatch("parentRequest");
        break;
      case "rainbow.labHost.focusStage":
        if (document.getElementById("interactive-container")) {
          document.getElementById("interactive-container").focus();
        }
        break;
      case "rainbow.labHost.reload":
        window.location.reload();
        break;
      case "rainbow.labHost.setExperiment":
        if (payload.experimentId) {
          window.location.href = buildShellUrl(payload.experimentId, {
            mode: hostState.shellMode,
            parentOrigin: embedBridge.parentOrigin !== "*" ? embedBridge.parentOrigin : "",
            sessionId: embedBridge.sessionId
          });
        }
        break;
    }
  }

  function setupEmbedBridge(options) {
    embedBridge.enabled = options.mode === "embed";
    embedBridge.parentOrigin = options.parentOrigin || "*";
    embedBridge.sessionId = options.sessionId || "";

    if (!embedBridge.enabled) {
      return;
    }

    window.addEventListener("message", handleParentMessage);
    notifyParent("rainbow.labHost.ready", {
      state: cloneHostState()
    });
  }

  function init() {
    if (!window.RainbowLabHostRegistry) {
      text("interactive-stage-status", "Experiment registry was not available.");
      return;
    }

    var experiment;

    launchOptions = parseLaunchOptions();
    hostState.shellMode = launchOptions.mode;
    experiment = window.RainbowLabHostRegistry.get(launchOptions.experimentId) || window.RainbowLabHostRegistry.first();

    createBridge();
    initializeState(experiment);
    applyShellMode();
    setupEmbedBridge(launchOptions);
    renderExperimentSelector(experiment);
    renderAll(experiment);
    recordEvent("host.experimentResolved", { experimentId: experiment.id });
    mountInteractive(experiment);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
}());
