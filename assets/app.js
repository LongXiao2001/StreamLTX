(function () {
  'use strict';

  var takes = window.TAKES || [];
  var classInfo = window.CLASS_INFO || [];
  var pipeline = window.PIPELINE || { levels: [], tail: 'VAE', steps: 9 };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(id) {
    return document.querySelector('[data-' + id + ']');
  }

  function tc(seconds) {
    var s = Math.max(0, Math.round(seconds));
    return String(Math.floor(s / 60)) + ':' + String(s % 60).padStart(2, '0');
  }

  /* ---------- takes ---------- */

  var tabs = el('tabs');
  var video = el('video');
  var cells = el('cells');
  var cueList = el('cues');
  var kindLabel = el('kind');
  var sourceLabel = el('source');
  var titleLabel = el('title');
  var blurbLabel = el('blurb');
  var stripLeft = el('strip-left');
  var stripRight = el('strip-right');
  var strip = el('strip');
  var stripHead = el('head');

  var current = null;
  var cellNodes = [];
  var cueNodes = [];
  var litCount = -1;
  var activeCue = -1;

  var KIND = {
    rundown: 'Rundown — the shot list is queued before the run',
    console: 'Console — instructions typed while on air',
  };

  function cueOwner(take, second) {
    var owner = -1;
    for (var i = 0; i < take.cues.length; i++) {
      if (second >= Math.floor(take.cues[i].t)) owner = i;
    }
    return owner;
  }

  function buildTake(take) {
    current = take;
    litCount = -1;
    activeCue = -1;

    kindLabel.textContent = KIND[take.kind];
    kindLabel.className = 'stage-kind ' + take.kind;
    sourceLabel.textContent = take.source;
    titleLabel.textContent = take.name;
    blurbLabel.textContent = take.blurb;
    stripLeft.textContent = take.cues.length + ' cues · ' + Math.round(take.duration) + ' blocks';
    stripRight.textContent = '0:00';

    video.pause();
    video.poster = take.poster;
    video.src = take.file;

    var total = Math.round(take.duration);
    var cellHtml = '';
    for (var s = 0; s < total; s++) {
      var owner = cueOwner(take, s);
      var cls = owner < 0 ? 'standby' : take.cues[owner].cls;
      cellHtml += '<i class="cell ' + cls + '"></i>';
    }
    cells.innerHTML = cellHtml;
    cellNodes = Array.prototype.slice.call(cells.children);

    cueList.innerHTML = take.cues
      .map(function (cue, i) {
        var speech = cue.line
          ? '<p class="cue-line" lang="zh-CN">' +
            cue.line +
            '</p><p class="cue-gloss">' +
            cue.gloss +
            '</p>'
          : '';
        return (
          '<li><button type="button" class="cue ' +
          cue.cls +
          '" data-seek="' +
          cue.t +
          '" data-index="' +
          i +
          '">' +
          '<span class="cue-no">' +
          String(i + 1).padStart(2, '0') +
          '</span>' +
          '<span class="cue-body">' +
          '<span class="cue-meta"><b class="tag ' +
          cue.cls +
          '">' +
          cue.cls +
          '</b><time>' +
          tc(cue.t) +
          '</time>' +
          (cue.line ? '<em class="tag dialogue">dialogue</em>' : '') +
          '</span>' +
          '<span class="cue-act">' +
          cue.act +
          '</span>' +
          speech +
          '</span></button></li>'
        );
      })
      .join('');
    cueNodes = Array.prototype.slice.call(cueList.querySelectorAll('.cue'));
  }

  function paint() {
    if (!current) return;
    var t = video.currentTime;
    var lit = Math.min(cellNodes.length, Math.floor(t));
    if (lit !== litCount) {
      for (var i = 0; i < cellNodes.length; i++) {
        cellNodes[i].classList.toggle('on', i < lit);
      }
      litCount = lit;
      stripRight.textContent = tc(t);
    }
    if (stripHead) {
      stripHead.style.left = Math.max(0, Math.min(1, t / current.duration)) * 100 + '%';
    }

    var owner = cueOwner(current, Math.floor(t));
    if (owner !== activeCue) {
      if (cueNodes[activeCue]) cueNodes[activeCue].classList.remove('on');
      if (cueNodes[owner]) {
        cueNodes[owner].classList.add('on');
        keepCueVisible(cueNodes[owner].parentNode);
      }
      activeCue = owner;
    }
  }

  function keepCueVisible(row) {
    if (cueList.scrollHeight - cueList.clientHeight < 8) return;
    var top = row.offsetTop;
    var bottom = top + row.offsetHeight;
    if (top < cueList.scrollTop || bottom > cueList.scrollTop + cueList.clientHeight) {
      cueList.scrollTop = Math.max(0, top - 10);
    }
  }

  function selectTake(index) {
    Array.prototype.forEach.call(tabs.children, function (node, i) {
      node.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    buildTake(takes[index]);
    paint();
  }

  if (tabs && video) {
    tabs.innerHTML = takes
      .map(function (take, i) {
        return (
          '<button type="button" role="tab" aria-selected="' +
          (i === 0) +
          '" data-index="' +
          i +
          '"><b>' +
          take.name +
          '</b><span>' +
          (take.kind === 'rundown' ? 'rundown' : 'console') +
          ' · ' +
          tc(take.duration) +
          '</span></button>'
        );
      })
      .join('');

    tabs.addEventListener('click', function (event) {
      var button = event.target.closest('button[data-index]');
      if (button) selectTake(Number(button.dataset.index));
    });

    cueList.addEventListener('click', function (event) {
      var button = event.target.closest('.cue');
      if (!button) return;
      video.currentTime = Number(button.dataset.seek);
      var playing = video.play();
      if (playing && playing.catch) playing.catch(function () {});
    });

    strip.addEventListener('click', function (event) {
      if (event.target.closest('.strip-legend')) return;
      var box = cells.getBoundingClientRect();
      var ratio = (event.clientX - box.left) / box.width;
      video.currentTime = Math.max(0, Math.min(1, ratio)) * current.duration;
      paint();
    });

    video.addEventListener('timeupdate', paint);
    video.addEventListener('seeked', paint);
    selectTake(0);
  }

  /* ---------- control classes ---------- */

  var classesHost = el('classes');
  if (classesHost) {
    var counts = { action: 0, prop: 0, scene: 0, dialogue: 0 };
    takes.forEach(function (take) {
      take.cues.forEach(function (cue) {
        counts[cue.cls]++;
        if (cue.line) counts.dialogue++;
      });
    });
    classesHost.innerHTML = classInfo
      .map(function (item) {
        return (
          '<article class="class-card ' +
          item.id +
          '"><header><b class="tag ' +
          item.id +
          '">' +
          item.label +
          '</b><span class="class-count">' +
          counts[item.id] +
          ' cues</span></header>' +
          '<h3>' +
          item.line +
          '</h3><p>' +
          item.detail +
          '</p></article>'
        );
      })
      .join('');
  }

  /* ---------- hero monitor ---------- */

  var heroVideo = el('hero-video');
  var heroBar = el('hero-bar');
  var heroCounter = el('hero-counter');

  if (heroVideo && heroBar) {
    var heroCells = [];
    var heroLit = -1;

    var buildHero = function () {
      var total = Math.max(1, Math.round(heroVideo.duration || 20));
      var html = '';
      for (var i = 0; i < total; i++) html += '<i></i>';
      heroBar.innerHTML = html;
      heroCells = Array.prototype.slice.call(heroBar.children);
      heroLit = -1;
    };

    heroVideo.addEventListener('loadedmetadata', buildHero);
    if (heroVideo.readyState >= 1) buildHero();

    heroVideo.addEventListener('timeupdate', function () {
      var lit = Math.floor(heroVideo.currentTime);
      if (lit === heroLit) return;
      heroLit = lit;
      heroCells.forEach(function (cell, i) {
        cell.classList.toggle('on', i < lit);
      });
      if (heroCounter) {
        heroCounter.textContent = 'block ' + String(lit).padStart(3, '0');
      }
    });

    if (reduceMotion) {
      heroVideo.removeAttribute('autoplay');
      heroVideo.pause();
    }
  }

  /* ---------- training schematics ---------- */

  var repeatTag = function (n, tag) {
    return new Array(n + 1).join(tag);
  };

  var tf = document.querySelector('[data-fig="tf"]');
  if (tf) {
    // teacher forcing: every block shares one timestep
    tf.innerHTML = repeatTag(8, '<i style="opacity:.62"></i>');
  }

  var df = document.querySelector('[data-fig="df"]');
  if (df) {
    // diffusion forcing: one noise level per block, rising along the sequence
    var n = 8;
    var bars = '';
    for (var b = 0; b < n; b++) {
      bars += '<i style="opacity:' + (0.16 + (0.92 - 0.16) * (b / (n - 1))).toFixed(3) + '"></i>';
    }
    df.innerHTML = bars;
  }

  var dmd = document.querySelector('[data-fig="dmd"]');
  if (dmd) {
    dmd.innerHTML =
      '<div class="srow"><span class="slabel">30 step</span><span class="dots">' +
      repeatTag(30, '<i></i>') +
      '</span></div>' +
      '<div class="srow"><span class="slabel">4 step</span><span class="dots few">' +
      repeatTag(4, '<i></i>') +
      '</span></div>';
  }

  var attn = document.querySelector('[data-fig="attn"]');
  if (attn) {
    attn.innerHTML = [1, 2, 3]
      .map(function (k) {
        return (
          '<div class="seg"><span class="pchip">segment ' +
          k +
          ' · prompt ' +
          k +
          '</span><div class="blocks">' +
          repeatTag(4, '<i></i>') +
          '</div><p class="note">AV blocks in this segment cross-attend to prompt ' +
          k +
          ' only</p></div>'
        );
      })
      .join('');
  }

  /* ---------- inference wavefront ---------- */

  var wfHost = el('wavefront');
  if (wfHost) {
    var levels = pipeline.levels;
    var steps = pipeline.steps;
    // neighbouring blocks differ in tone so the diagonal stays readable
    var shades = [93, 83, 73, 64];
    var shade = function (block) {
      return shades[(block - 1) % shades.length];
    };
    var cell = function (block) {
      return block >= 1
        ? '<span class="wf-cell busy" style="--l:' + shade(block) + '">B' + block + '</span>'
        : '<span class="wf-cell"></span>';
    };

    var rows = '<div class="wf-row head" style="--steps:' + steps + '">';
    rows += '<span class="wf-label">time slice →</span>';
    for (var t = 1; t <= steps; t++) rows += '<span class="wf-th">t' + t + '</span>';
    rows += '</div>';

    // level k works on block t-k+1 during slice t
    levels.forEach(function (label, idx) {
      var k = idx + 1;
      rows += '<div class="wf-row" style="--steps:' + steps + '">';
      rows += '<span class="wf-label">GPU ' + k + ' · ' + label + '</span>';
      for (var t2 = 1; t2 <= steps; t2++) rows += cell(t2 - k + 1);
      rows += '</div>';
    });

    // the fifth GPU: async prompt encoding and incremental VAE decoding
    rows += '<div class="wf-row vae" style="--steps:' + steps + '">';
    rows += '<span class="wf-label">GPU 5 · ' + pipeline.tail + '</span>';
    for (var t3 = 1; t3 <= steps; t3++) rows += cell(t3 - levels.length);
    rows += '</div>';

    wfHost.innerHTML =
      '<div class="wf">' +
      rows +
      '</div><div class="wf-foot">' +
      '<span><b>B<i>n</i></b> = the nth one-second AV block</span>' +
      '<span>the diagonal is one block crossing all four noise levels, latents handed on by <b>P2P</b></span>' +
      '<span>from t' +
      levels.length +
      ' it is at <b>steady state</b>: four GPUs on four different blocks, one finished block per slice</span>' +
      '<span>GPU 5 runs <b>async</b> and never takes a slice of the denoising pipeline</span>' +
      '</div>';
  }

  /* ---------- audio row ---------- */

  var audioScroll = document.querySelector('[data-audio-scroll]');
  var audioBar = document.querySelector('[data-audio-bar]');
  var audioThumb = audioBar ? audioBar.querySelector('i') : null;
  if (audioScroll && audioBar && audioThumb) {
    function syncAudioBar() {
      var max = audioScroll.scrollWidth - audioScroll.clientWidth;
      var visible = audioScroll.scrollWidth ? audioScroll.clientWidth / audioScroll.scrollWidth : 1;
      var width = Math.max(visible * 100, 12);
      var left = max <= 1 ? 0 : (audioScroll.scrollLeft / max) * (100 - width);
      audioThumb.style.width = width + '%';
      audioThumb.style.left = left + '%';
      audioBar.hidden = max <= 1;
    }
    audioScroll.addEventListener('scroll', syncAudioBar, { passive: true });
    window.addEventListener('resize', syncAudioBar);
    audioBar.addEventListener('click', function (event) {
      var rect = audioBar.getBoundingClientRect();
      var max = audioScroll.scrollWidth - audioScroll.clientWidth;
      var ratio = rect.width ? (event.clientX - rect.left) / rect.width : 0;
      audioScroll.scrollLeft = Math.min(1, Math.max(0, ratio)) * max;
    });
    syncAudioBar();
  }
})();
