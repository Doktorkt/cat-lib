window.CatLib = Object.assign(window.CatLib || {}, {
  "показать": (...t) => t.join(" "),
  "заголовок": (...t) => "\n=== " + t.join(" ").toUpperCase() + " ===\n",
  "рамка": (...t) => { const s = t.join(" "), l = "─".repeat(s.length + 4); return `┌${l}┐\n│  ${s}  │\n└${l}┘`; },
  "список": (...a) => a.map((el, i) => `${i + 1}. ${el}`).join("\n"),
  "сложить": (...n) => n.reduce((a, b) => Number(a) + Number(b), 0),
  "вычесть": (a, b) => Number(a) - Number(b),
  "умножить": (...n) => n.reduce((a, b) => Number(a) * Number(b), 1),
  "разделить": (a, b) => Number(b) === 0 ? "На ноль делить нельзя" : Number(a) / Number(b),
  "процент": (s, p) => (Number(s) * Number(p)) / 100,
  "скидка": (c, p) => Number(c) - (Number(c) * Number(p)) / 100,
  "степень": (a, b) => Math.pow(Number(a), Number(b)),
  "корень": (a) => Math.sqrt(Number(a)),
  "округлить": (a, z = 2) => Number(Number(a).toFixed(Number(z))),
  "среднее": (...n) => n.reduce((a, b) => Number(a) + Number(b), 0) / n.length,
  "случайное": (min = 1, max = 100) => Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min),
  "кубик": (g = 6) => Math.floor(Math.random() * Number(g)) + 1,
  "монетка": () => Math.random() < 0.5 ? "Орёл" : "Решка",
  "выбрать": (...v) => v[Math.floor(Math.random() * v.length)],
  "длина": (...t) => t.join(" ").length,
  "слова": (...t) => t.length,
  "заменить": (t, a, b) => String(t).replaceAll(String(a), String(b)),
  "дата": () => new Date().toLocaleDateString("ru-RU"),
  "время": () => new Date().toLocaleTimeString("ru-RU"),
  "таймер": (sec, fn) => { setTimeout(() => { if(typeof fn === "function") fn(); }, Number(sec)*1000); return "Таймер: " + sec + " сек."; },
  "звук": (freq = 440, sec = 0.3) => { const C = window.AudioContext || window.webkitAudioContext; if(!C) return "Нет звука"; const ctx = new C(), o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = Number(freq); g.gain.value = 0.2; o.connect(g); g.connect(ctx.destination); o.start(); o.stop(ctx.currentTime + Number(sec)); return "Звук " + freq + " Гц"; },
  "если": (cond, a, b = "") => cond ? a : b,
  "сохранить": (k, v) => { localStorage.setItem("cat_" + k, JSON.stringify(v)); return "Сохранено: " + k; },
  "загрузить": (k) => { const v = localStorage.getItem("cat_" + k); return v ? JSON.parse(v) : "Пусто"; }
});
window.CatLib = Object.assign(window.CatLib || {}, {
  _turtle: { x: 150, y: 120, angle: -90, color: "#8a2be2", width: 3 },
  _getCanvas: () => { let el = document.getElementById("cat_canvas") || document.querySelector("canvas"); if(!el){ el = document.createElement("canvas"); el.id = "cat_canvas"; el.width = 300; el.height = 240; el.style.cssText = "display:block;margin:10px auto;border:1px solid #666;border-radius:8px;background:#111;"; (document.getElementById("output") || document.body).appendChild(el); } return el; },
  "холстФон": (c = "#111") => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.fillStyle = c; ctx.fillRect(0, 0, el.width, el.height); return "Фон залит"; },
  "холстОчистить": () => { const el = window.CatLib._getCanvas(); el.getContext("2d").clearRect(0, 0, el.width, el.height); window.CatLib._turtle.x = el.width/2; window.CatLib._turtle.y = el.height/2; return "Холст очищен"; },
  "рисоватьКруг": (x = 150, y = 120, r = 40, c = "#8a2be2") => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.beginPath(); ctx.arc(Number(x), Number(y), Number(r), 0, Math.PI*2); ctx.fillStyle = c; ctx.fill(); return "Круг готов"; },
  "рисоватьКвадрат": (x = 50, y = 50, w = 80, h = 80, c = "#ff9800") => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.fillStyle = c; ctx.fillRect(Number(x), Number(y), Number(w), Number(h)); return "Квадрат готов"; },
  "рисоватьЛинию": (x1 = 10, y1 = 10, x2 = 200, y2 = 200, c = "#00e676", w = 3) => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.beginPath(); ctx.moveTo(Number(x1), Number(y1)); ctx.lineTo(Number(x2), Number(y2)); ctx.strokeStyle = c; ctx.lineWidth = Number(w); ctx.stroke(); return "Линия готова"; },
  "рисоватьТекст": (txt = "Мяу!", x = 50, y = 50, c = "#fff", sz = 20) => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.fillStyle = c; ctx.font = sz + "px sans-serif"; ctx.fillText(txt, Number(x), Number(y)); return "Текст написан"; },
  "черепашкаВперёд": (шаг = 40) => { const el = window.CatLib._getCanvas(), t = window.CatLib._turtle, rad = t.angle * Math.PI / 180, nx = t.x + Math.cos(rad)*Number(шаг), ny = t.y + Math.sin(rad)*Number(шаг), ctx = el.getContext("2d"); ctx.beginPath(); ctx.moveTo(t.x, t.y); ctx.lineTo(nx, ny); ctx.strokeStyle = t.color; ctx.lineWidth = t.width; ctx.stroke(); t.x = nx; t.y = ny; return `Черепашка: (${Math.round(nx)}, ${Math.round(ny)})`; },
  "черепашкаПоворот": (град = 90) => { window.CatLib._turtle.angle += Number(град); return "Угол: " + window.CatLib._turtle.angle; },
  "черепашкаЦвет": (c = "#8a2be2") => { window.CatLib._turtle.color = c; return "Цвет: " + c; }
});
window.CatLib = Object.assign(window.CatLib || {}, {
  "шкала": (val, max = 100, w = 20) => { const f = Math.round((Number(val) / Number(max)) * Number(w)); return `[${"█".repeat(f)}${"░".repeat(Math.max(0, Number(w) - f))}] ${val}/${max}`; },
  "текстГрафик": (d) => { const e = Object.entries(d), m = Math.max(...e.map(([, v]) => Number(v)), 1); return e.map(([k, v]) => `${k.padEnd(10, " ")} | ${"▇".repeat(Math.round((Number(v) / m) * 20))} (${v})`).join("\n"); },
  "графикСтолбцы": (...vals) => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.clearRect(0,0,el.width,el.height); const nums = vals.map(Number), m = Math.max(...nums,1), s = el.width/nums.length; nums.forEach((v,i)=>{ const h=(v/m)*(el.height-30); ctx.fillStyle="#8a2be2"; ctx.fillRect(i*s+8,el.height-h-10,s-16,h); }); return "График столбцов построен"; },
  "графикЛиния": (...pts) => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.clearRect(0,0,el.width,el.height); const nums = pts.map(Number), m = Math.max(...nums,1), s = el.width/Math.max(nums.length-1,1); ctx.beginPath(); ctx.strokeStyle="#00bcd4"; ctx.lineWidth=3; nums.forEach((v,i)=>{ const x=i*s, y=el.height-(v/m)*(el.height-20)-10; i===0?ctx.moveTo(x,y):ctx.lineTo(x,y); }); ctx.stroke(); return "Линейный график построен"; },
  "графикКруг": (...vals) => { const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"); ctx.clearRect(0,0,el.width,el.height); const nums = vals.map(Number).filter(n => n > 0), total = nums.reduce((a,b)=>a+b,0); if(!total) return "Нет данных"; const colors = ["#8a2be2","#00bcd4","#ff9800","#00e676","#e91e63","#ffeb3b","#3f51b5"], cx = el.width/2, cy = el.height/2, r = Math.min(cx,cy)-15; let start = -Math.PI/2; nums.forEach((v,i)=>{ const slice = (v/total)*Math.PI*2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,start,start+slice); ctx.closePath(); ctx.fillStyle = colors[i % colors.length]; ctx.fill(); start += slice; }); return "Круговая диаграмма построена"; }
});
window.CatLib = Object.assign(window.CatLib || {}, {
  _robotSocket: null,
  _robotUrl: "http://192.168.4.1",
  "роботАдрес": (url) => { window.CatLib._robotUrl = String(url); return "Адрес: " + url; },
  "роботПодключитьWS": (ws = "ws://192.168.4.1:81") => { try { window.CatLib._robotSocket = new WebSocket(ws); return "WS: " + ws; } catch(e) { return "WS недоступен"; } },
  "роботКоманда": async (cmd, p = {}) => { if(window.CatLib._robotSocket && window.CatLib._robotSocket.readyState===1){ window.CatLib._robotSocket.send(JSON.stringify({cmd,...p})); return "Отправлено (WS): "+cmd; } const q = new URLSearchParams({cmd,...p}).toString(); try { await fetch(`${window.CatLib._robotUrl}/action?${q}`, {mode:"no-cors"}); return "Отправлено (Wi-Fi): "+cmd; } catch(e) { return `Команда «${cmd}» готова (устройство ${window.CatLib._robotUrl} не подключено)`; } },
  "дронВзлёт": (alt = 100) => window.CatLib["роботКоманда"]("takeoff", {alt}),
  "дронПосадка": () => window.CatLib["роботКоманда"]("land"),
  "дронВперёд": (dist = 50) => window.CatLib["роботКоманда"]("forward", {dist}),
  "дронНазад": (dist = 50) => window.CatLib["роботКоманда"]("back", {dist}),
  "дронВлево": (dist = 50) => window.CatLib["роботКоманда"]("left", {dist}),
  "дронВправо": (dist = 50) => window.CatLib["роботКоманда"]("right", {dist}),
  "дронПоворот": (deg = 90) => window.CatLib["роботКоманда"]("cw", {deg}),
  "дронСтоп": () => window.CatLib["роботКоманда"]("emergency"),
  "роботМоторы": (l = 100, r = 100) => window.CatLib["роботКоманда"]("motors", {l, r}),
  "роботСерво": (pin = 9, angle = 90) => window.CatLib["роботКоманда"]("servo", {pin, angle}),
  "проектСвет": (pin = 2, state = 1) => window.CatLib["роботКоманда"]("led", {pin, state}),
  "проектДатчик": async (pin = 0) => { try { const r = await fetch(`${window.CatLib._robotUrl}/sensor?pin=${pin}`); return await r.text(); } catch(e) { return "Датчик не подключён"; } }
});
window.CatLib = Object.assign(window.CatLib || {}, {
  _aiKey: localStorage.getItem("cat_ai_key") || "",
  _aiUrl: localStorage.getItem("cat_ai_url") || "https://openrouter.ai/api/v1/chat/completions",
  _aiModel: localStorage.getItem("cat_ai_model") || "google/gemma-2-9b-it:free",
  "ИИ_ключ": (key, url, model) => {
    window.CatLib._aiKey = String(key);
    localStorage.setItem("cat_ai_key", String(key));
    if(url) { window.CatLib._aiUrl = String(url); localStorage.setItem("cat_ai_url", String(url)); }
    if(model) { window.CatLib._aiModel = String(model); localStorage.setItem("cat_ai_model", String(model)); }
    return "Ключ ИИ сохранён в память";
  },
  "ИИ_цель": (...t) => {
    const goal = t.join(" ").trim();
    if(!goal) return "Напиши цель после двоеточия";
    const steps = [
      `1. Определить первый микро-шаг на 15 минут для цели «${goal}»`,
      `2. Подготовить всё необходимое и убрать отвлекающие факторы`,
      `3. Выполнить основной блок работы по задаче`,
      `4. Проверить результат и исправить недочёты`,
      `5. Закрепить успех и подвести итог`
    ];
    const data = { goal, steps, done: 0, coins: Number(localStorage.getItem("cat_coins") || 0), date: new Date().toLocaleDateString("ru-RU") };
    localStorage.setItem("cat_goal_data", JSON.stringify(data));
    if(window.CatLib["рисоватьКруг"]) window.CatLib["рисоватьКруг"](150, 120, 45, "#8a2be2");
    return `🎯 Цель принята (${data.date}): «${goal}»\n\nПлан шагов:\n${steps.join("\n")}\n\nПрогресс: [░░░░░░░░░░] 0/5 | Монеты: ${data.coins} 🪙`;
  },
  "ИИ_шаг": () => {
    const raw = localStorage.getItem("cat_goal_data");
    if(!raw) return "Сначала поставь цель командой ИИ_цель";
    const data = JSON.parse(raw);
    if(data.done >= data.steps.length) return `🏆 Цель «${data.goal}» уже полностью достигнута! Твой баланс: ${data.coins} 🪙`;
    data.done += 1;
    data.coins = Number(localStorage.getItem("cat_coins") || 0) + 10;
    localStorage.setItem("cat_coins", data.coins);
    localStorage.setItem("cat_goal_data", JSON.stringify(data));
    const bar = "█".repeat(data.done * 2) + "░".repeat((5 - data.done) * 2);
    if(window.CatLib["рисоватьКруг"]) window.CatLib["рисоватьКруг"](150, 120, 45 + data.done * 8, data.done === 5 ? "#00e676" : "#8a2be2");
    if(window.CatLib["звук"]) window.CatLib["звук"](data.done === 5 ? 523 : 440, 0.3);
    const msg = data.done === 5 ? "🎉 ПОБЕДА! Все 5 шагов выполнены!" : `✅ Выполнен шаг ${data.done} из 5! Следующий: ${data.steps[data.done]}`;
    return `${msg}\nПрогресс: [${bar}] ${data.done}/5 | +10 монет (Всего: ${data.coins} 🪙)`;
  },
  "ИИ_статус": () => {
    const raw = localStorage.getItem("cat_goal_data");
    if(!raw) return "Активной цели пока нет. Задай её через ИИ_цель: ...";
    const d = JSON.parse(raw);
    const bar = "█".repeat(d.done * 2) + "░".repeat((5 - d.done) * 2);
    if(window.CatLib._getCanvas) {
      const el = window.CatLib._getCanvas(), ctx = el.getContext("2d"), cx = el.width/2, cy = el.height/2, r = Math.min(cx,cy)-15;
      ctx.clearRect(0,0,el.width,el.height);
      const doneAngle = (d.done / 5) * Math.PI * 2;
      if(d.done > 0) { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2,-Math.PI/2+doneAngle); ctx.closePath(); ctx.fillStyle="#00e676"; ctx.fill(); }
      if(d.done < 5) { ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,-Math.PI/2+doneAngle,Math.PI*1.5); ctx.closePath(); ctx.fillStyle="#8a2be2"; ctx.fill(); }
    }
    return `📌 Цель: «${d.goal}» (от ${d.date})\nПрогресс: [${bar}] ${d.done}/5\nБаланс: ${d.coins} 🪙\n\n${d.steps.map((s, i) => (i < d.done ? "✔️ " : "⏳ ") + s).join("\n")}`;
  },
  "ИИ_спросить": async (...q) => {
    const prompt = q.join(" ").trim();
    if(!prompt) return "Напиши вопрос наставнику";
    const raw = localStorage.getItem("cat_goal_data");
    const goalCtx = raw ? `Текущая цель пользователя: «${JSON.parse(raw).goal}».` : "";
    if(window.CatLib._aiKey) {
      try {
        const res = await fetch(window.CatLib._aiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + window.CatLib._aiKey },
          body: JSON.stringify({
            model: window.CatLib._aiModel,
            messages: [
              { role: "system", content: "Ты строгий, но поддерживающий ИИ-наставник по достижению целей. Отвечай кратко, по делу и на русском языке. " + goalCtx },
              { role: "user", content: prompt }
            ]
          })
        });
        const json = await res.json();
        return json.choices?.[0]?.message?.content || "ИИ не вернул ответ";
      } catch(e) { return "Ошибка сети при обращении к ИИ. Работаю в автономном режиме."; }
    }
    const tips = [
      "Не жди идеального настроения — сделай всего 5 минут прямо сейчас, и втянешься.",
      "Разбей текущую задачу на настолько маленький шаг, чтобы его невозможно было не сделать.",
      "Убери телефон и лишние вкладки на 15 минут. Таймер запущен — действуй!",
      "Дисциплина важнее мотивации: один закрытый шаг сегодня приближает финал.",
      "Посмотри на свой прогресс: ты уже начал, не останавливайся на полпути!"
    ];
    const reply = tips[Math.floor(Math.random() * tips.length)];
    return `🟣 Наставник: ${reply}${raw ? `\n(Напоминаю про цель: «${JSON.parse(raw).goal}»)` : ""}`;
  }
});
