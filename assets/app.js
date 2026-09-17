(function () {
  'use strict';

  var takes = window.TAKES || [];
  var classInfo = window.CLASS_INFO || [];
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
})();
