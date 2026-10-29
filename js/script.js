(function () {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        /* --- Разбивка заголовков на буквы --- */
        document.querySelectorAll('.split-text').forEach(el => {
            const text = el.textContent.trim();
            el.textContent = '';
            [...text].forEach(ch => {
                const s = document.createElement('span');
                s.className = 'char';
                s.textContent = ch;
                el.appendChild(s);
            });
        });

        if (reduce) {
         document.querySelectorAll('.char, .drop-el, .rise-up, .rise-el, .fade-item, .fade-item-left, .fade-item-right, .cta-btn, .ochar')
            .forEach(e => e.style.opacity = 1);
            return; // без анимаций и параллакса
        }

        /* --- Каскад «падают сверху»: email → логотип → телефон --- */
        anime.timeline({ easing: 'easeOutQuart' })
            .add({ targets: '#contact-email', opacity: [0, 1], translateY: [-70, 0], duration: 900 }, 150)
            .add({ targets: '#logo-link',     opacity: [0, 1], translateY: [-70, 0], duration: 900 }, 350)
            .add({ targets: '#contact-phone', opacity: [0, 1], translateY: [-70, 0], duration: 900 }, 550);

        /* --- Посимвольное появление букв --- */
        document.querySelectorAll('.split-text').forEach(el => {
            anime({
                targets: el.querySelectorAll('.char'),
                opacity: [0, 1],
                translateY: [24, 0],
                scale: [0.7, 1],
                duration: 550,
                easing: 'easeOutCubic',
                delay: anime.stagger(45, { start: +el.dataset.start || 0 })
            });
        });

        /* --- Заголовок: зацикленное разрастание белой тени --- */
        anime({
            targets: '.hero-title',
            textShadow: [
                '0 0 0px rgba(255,255,255,0),    0 0 30px rgba(80,150,255,0.35)',
                '0 0 22px rgba(255,255,255,0.9), 0 0 30px rgba(80,150,255,0.35)'
            ],
            duration: 2600,          // скорость разрастания
            delay: 2000,             // старт, когда буквы заголовка уже допечатались
            direction: 'alternate',  // плавный рост и возврат («дыхание»)
            loop: true,              // зациклено
            easing: 'easeInOutSine'
        });

        /* --- Плавание корабля (большая амплитуда) --- */
        anime({
            targets: '#ship',
            translateX: [0, 26], translateY: [0, -30], rotate: [0, 1.5],
            duration: 3750, direction: 'alternate', loop: true, easing: 'easeInOutSine'
        });

        /* --- Астероид с вышкой: плавание со своей амплитудой --- */
        anime({
            targets: '#rock',
            translateX: [0, -14],
            translateY: [0, -18],
            rotate: [0, -2],
            duration: 5200,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });

        /* --- Медленное «дыхание» фона --- */
        anime({
            targets: '#space-bg',
            scale: [1, 1.08], translateX: ['0%', '-1.5%'], translateY: ['0%', '1%'],
            duration: 45000, direction: 'alternate', loop: true, easing: 'easeInOutSine'
        });

        /* --- Мигание 5 звёзд, у каждой свой период --- */
        document.querySelectorAll('.big-star').forEach(s => s.style.opacity = 0.12);
        anime({
            targets: '.big-star',
            opacity: [0.12, 1], scale: [0.75, 1.2],
            duration: () => anime.random(2600, 4200),   // медленно и вразнобой
            direction: 'alternate', loop: true, easing: 'easeInOutSine'
        });

        /* --- Пульс лучей --- */
        anime({
            targets: '.beam',
            opacity: [0.55, 0.95],
            duration: 4000, delay: anime.stagger(1500),
            direction: 'alternate', loop: true, easing: 'easeInOutSine'
        });

        /* --- Промо-блок: появление снизу --- */
// Карточка выезжает вверх, когда закончился набор букв подзаголовка (~3.6s)
anime({
    targets: '#promoCard',
    opacity: [0, 1],
    translateY: [90, 0],
    duration: 950,
    delay: 3800,
    easing: 'easeOutCubic'
});
// Содержимое появляется каскадом поверх уже стоящей карточки
anime({
    targets: '.rise-el',
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 700,
    delay: anime.stagger(160, { start: 4500 }),
    easing: 'easeOutQuint'
});

/* --- Медленное «дыхание» фона --- */
anime({
    targets: '#space-bg',
    scale: [1, 1.08], translateX: ['0%', '-1.5%'], translateY: ['0%', '1%'],
    duration: 45000, direction: 'alternate', loop: true, easing: 'easeInOutSine'
});

        /* --- Параллакс слоёв от мыши (разная глубина) --- */
        const layers = document.querySelectorAll('.space-hero .layer');
        let tx = 0, ty = 0, cx = 0, cy = 0;
        window.addEventListener('mousemove', e => {
            tx = e.clientX / innerWidth - 0.5;
            ty = e.clientY / innerHeight - 0.5;
        });
        (function parallax() {
            cx += (tx - cx) * 0.06;
            cy += (ty - cy) * 0.06;
            layers.forEach(l => {
                const d = +l.dataset.depth;
                l.style.transform = `translate3d(${cx * d * -80}px, ${cy * d * -60}px, 0)`;
            });
            requestAnimationFrame(parallax);
        })();
    })();


    /* --- Круговой таймер: старт 1 день 3 часа 5 минут --- */
(function () {
    const deadline = Date.now() + ((1 * 24 + 3) * 3600 + 5 * 60) * 1000;
    const units = [
        { key: 'days',    label: 'дней',  max: 7,  ring: '#8dffb8' },
        { key: 'hours',   label: 'часов', max: 24, ring: '#48f7ff' },
        { key: 'minutes', label: 'минут', max: 60, ring: '#ff4ac8' },
        { key: 'seconds', label: 'секунд',max: 60, ring: '#ffd166' }
    ];
    const timerEl = document.getElementById('timer');
    // Создаём круги
    units.forEach(u => {
        const c = document.createElement('div');
        c.className = 't-circle';
        c.style.setProperty('--ring', u.ring);
        c.innerHTML = `<span class="t-num">--</span><span class="t-label">${u.label}</span>`;
        timerEl.appendChild(c);
    });
    const circles = [...timerEl.children];

    function tick() {
        let diff = Math.max(0, deadline - Date.now());
        const s = Math.floor(diff / 1000);
        const vals = { days: Math.floor(s / 86400), hours: Math.floor(s % 86400 / 3600),
                       minutes: Math.floor(s % 3600 / 60), seconds: s % 60 };
        units.forEach((u, i) => {
            const v = vals[u.key];
            circles[i].querySelector('.t-num').textContent = String(v).padStart(2, '0');
            circles[i].style.setProperty('--val', (v / u.max * 100).toFixed(1));
        });
    }
    tick();
    setInterval(tick, 1000);
})();

/* --- Плавное приближение фона при скролле --- */
(function () {
    const hero = document.querySelector('.space-hero');
    const bg = document.getElementById('space-bg');
    if (!hero || !bg) return;

    // Параметры зума
    const SCALE_MIN = 1.0;               // начальное приближение
    const SCALE_MAX = 1.35;              // максимальное (на сколько приблизится)
    const SHIFT_Y   = 40;                // px смещения вверх для эффекта «полёта сквозь туманность»

    let targetScale = SCALE_MIN;
    let curScale = SCALE_MIN;
    let targetY = 0;
    let curY = 0;

    function onScroll() {
        const rect = hero.getBoundingClientRect();
        const vh = window.innerHeight;
        // progress: 0 когда герой сверху экрана, 1 когда низ героя достиг верха viewport
        const total = rect.height + vh;
        const passed = Math.min(Math.max(-rect.top + vh * 0.2, 0), total);
        const p = passed / total;         // 0..1
        targetScale = SCALE_MIN + (SCALE_MAX - SCALE_MIN) * p;
        targetY = -SHIFT_Y * p;
    }

    function tick() {
        // Lerp для плавности (как у параллакса мыши)
        curScale += (targetScale - curScale) * 0.08;
        curY     += (targetY     - curY)     * 0.08;
        bg.style.transform = `scale(${curScale.toFixed(4)}) translateY(${curY.toFixed(2)}px)`;
        requestAnimationFrame(tick);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    tick();
})();


/* --- Универсальный наблюдатель появления при скролле --- */
const revealEls = document.querySelectorAll('.fade-item, .fade-item-left, .fade-item-right');
revealEls.forEach(el => el.style.opacity = 0);

if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;

            // Определяем направление въезда
            let fromX = 0, fromY = 40;
            if (el.classList.contains('fade-item-left'))  { fromX = -50; fromY = 0; }
            if (el.classList.contains('fade-item-right')) { fromX =  50; fromY = 0; }

            anime({
                targets: el,
                opacity: [0, 1],
                translateX: [fromX, 0],
                translateY: [fromY, 0],
                duration: 950,
                easing: 'easeOutCubic',
                delay: (parseInt(el.dataset.i || 0)) * 120
            });
            io.unobserve(el);             // анимируем один раз
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    revealEls.forEach((el, i) => { el.dataset.i = i % 6; io.observe(el); });
} else {
    revealEls.forEach(el => el.style.opacity = 1);
}

/* --- CTA-кнопки: появляются снизу сразу при доскролле --- */
const ctaGroup = document.querySelector('.cta-group');
if (ctaGroup) {
    const ctaBtns = ctaGroup.querySelectorAll('.cta-btn');
    ctaBtns.forEach(b => b.style.opacity = 0);

    if ('IntersectionObserver' in window) {
        const ctaIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                anime({
                    targets: ctaBtns,
                    opacity: [0, 1],
                    translateY: [40, 0],          // выезд снизу вверх
                    duration: 600,                 // быстрее (было 750)
                    easing: 'easeOutQuint',
                    delay: anime.stagger(80)       // лёгкий каскад 80 мс (было 120)
                });
                ctaIO.disconnect();                // один раз
            });
        }, { threshold: 0.05 });                   // реагирует почти мгновенно (было 0.3)
        ctaIO.observe(ctaGroup);
    } else {
        ctaBtns.forEach(b => b.style.opacity = 1);
    }
}


/* --- Печатная машинка: строка → ссылка → стирание → следующая --- */
(function () {
    const items = [
        { text: 'Кривая вёрстка',    url: '/errors/layout' },
        { text: 'Битые ссылки',      url: '/errors/links' },
        { text: 'Мобильный вид',     url: '/errors/mobile' },
        { text: 'Медленная загрузка', url: '/errors/speed' }
    ];

    const container = document.getElementById('typedLines');
    const moreLink  = document.getElementById('moreLink');
    if (!container || !moreLink) return;

    // Создаём один элемент для текущей строки (переиспользуем)
    const lineEl = document.createElement('span');
    lineEl.className = 'typed-line';
    container.appendChild(lineEl);

    let idx = 0;          // индекс текущего пункта
    let charIdx = 0;      // позиция символа при печати/стирании
    let phase = 'typing'; // typing | showing | deleting

    function tick() {
        const current = items[idx];
        const full = current.text;

        if (phase === 'typing') {
            // Печатаем по букве
            charIdx++;
            lineEl.textContent = full.slice(0, charIdx);
            lineEl.classList.remove('done');   // курсор активен

            if (charIdx >= full.length) {
                // Строка напечатана → показываем ссылку
                phase = 'showing';
                lineEl.classList.add('done');  // убираем курсор
                moreLink.href = current.url;
                moreLink.classList.add('show');
                setTimeout(tick, 3000);        // ссылка висит 3 секунды
                return;
            }
            setTimeout(tick, 65);              // скорость печати буквы

        } else if (phase === 'showing') {
            // Скрыли ссылку → начинаем стирать
            moreLink.classList.remove('show');
            phase = 'deleting';
            charIdx = full.length;
            lineEl.classList.remove('done');   // возвращаем курсор при стирании
            setTimeout(tick, 400);             // пауза перед стиранием
            return;

        } else if (phase === 'deleting') {
            // Удаляем по букве
            charIdx--;
            lineEl.textContent = full.slice(0, Math.max(charIdx, 0));

            if (charIdx <= 0) {
                // Строка стерта → переходим к следующей
                phase = 'typing';
                charIdx = 0;
                idx = (idx + 1) % items.length;
                setTimeout(tick, 500);         // короткая пауза перед новой строкой
                return;
            }
            setTimeout(tick, 40);              // стирание быстрее печати
        }
    }

    // Запуск при появлении плашки во viewport
    const board = document.querySelector('.error-board');
    if ('IntersectionObserver' in window && board) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) { tick(); io.disconnect(); }
            });
        }, { threshold: 0.3 });
        io.observe(board);
    } else {
        tick();                                // fallback без IO
    }
})();


document.querySelectorAll('.split-outline').forEach(el => {
    const text = el.textContent.trim();
    el.textContent = '';
    [...text].forEach(ch => {
        const s = document.createElement('span');
        s.className = 'ochar';
        s.textContent = ch;
        el.appendChild(s);
    });
});

/* --- Контурная цитата: послойное заполнение букв белым при скролле --- */
(function () {
    const wrap = document.querySelector('.split-outline');
    if (!wrap) return;

    // Читаем текст из data-атрибута и делим по символу '|'
    const raw = wrap.dataset.text || '';
    const lines = raw.split('|').map(s => s.trim()).filter(Boolean);
    wrap.textContent = '';

    // Создаём структуру: каждая строка — отдельный div.o-line
    const allLetters = [];                 // плоский список всех букв для каскада
    lines.forEach(lineText => {
        const lineEl = document.createElement('div');
        lineEl.className = 'o-line';

        [...lineText].forEach(ch => {
            const charWrap = document.createElement('span');
            charWrap.className = 'ochar-wrap';

            const strokeEl = document.createElement('span');
            strokeEl.className = 'ochar-stroke';
            strokeEl.textContent = ch;

            const fillEl = document.createElement('span');
            fillEl.className = 'ochar-fill';
            fillEl.textContent = ch;

            charWrap.appendChild(strokeEl);
            charWrap.appendChild(fillEl);
            lineEl.appendChild(charWrap);

            allLetters.push(charWrap);
        });

        wrap.appendChild(lineEl);
    });

    /* ===== НАСТРОЙКИ АНИМАЦИИ ===== */
    const START_DELAY   = 1200;   // мс — пауза перед началом заполнения (было ~0)
    const LETTER_STAGGER = 95;    // мс — шаг между буквами (было 55 → медленнее волна)
    /* =============================== */

    // Триггер появления через IntersectionObserver
    const quoteBlock = wrap.closest('.outline-quote') || wrap;

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                // Пауза, потом зажигаем каждую букву с увеличенным шагом
                setTimeout(() => {
                    allLetters.forEach((letter, i) => {
                        setTimeout(() => letter.classList.add('lit'), i * LETTER_STAGGER);
                    });
                }, START_DELAY);

                io.unobserve(entry.target);
            });
        }, { threshold: 0.3 });
        io.observe(quoteBlock);
    } else {
        // Fallback без IO — сразу показываем всё
        allLetters.forEach(l => l.classList.add('lit'));
    }
})();