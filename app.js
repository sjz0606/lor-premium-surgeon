// v3 «Хирург» — app logic
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const root = document.documentElement;
const RM = root.classList.contains('rm');
const HAS3D = root.classList.contains('has3d');

/* ------------------------------------------------------------------ i18n */
const UZ = {
  'skip': 'Asosiy qismga',
  'nav.school': 'Maktab', 'nav.principles': 'Tamoyillar', 'nav.practice': 'Yo‘nalishlar', 'nav.patients': 'Bemorlar', 'nav.book': 'Yozilish', 'nav.menu': 'Menyu',
  'hero.alt': 'Fozilxon Usmonxonov, LOR-jarroh',
  'hero.credit': 'Toshkent. Shifokor arxividan surat',
  'hero.kicker': 'LOR-jarroh, Toshkent',
  'hero.n1': 'Fozilxon', 'hero.n2': 'Usmonxonov',
  'hero.role': 'LOR-jarroh · otojarrohlik · endoskopik rinojarrohlik',
  'hero.lede': 'Quloq, burun va kalla asosi sohasidagi operatsiyalar. Bemorlar Qozog‘iston, Qirg‘iziston, Tojikiston, Rossiya va O‘zbekiston viloyatlaridan keladi.',
  'cta.book': 'Konsultatsiyaga yozilish', 'cta.call': 'Qo‘ng‘iroq qilish',
  'hero.note': 'Toshkent · manzil va qabul vaqti — yozilishda',
  'school.k': 'O‘qish yo‘li', 'school.t': 'Maktab',
  'school.lede': 'Kirov, Moskva, Antalya, Grats, Trichi, Istanbul, Piachensa. U o‘qigan shifoxonalar, kafedralar va jarrohlar — shifokorning o‘z arxividagi suratlar asosida.',
  'school.hint': 'Pastga aylantiring — kamera yo‘nalish bo‘ylab yuradi',
  'pr.k': 'U qanday ishlaydi', 'pr.t': 'Tamoyillar',
  'pr.src': 'Uning Instagramdagi postlari asosida, reklama so‘zlarisiz.',
  'pr.alt': 'Doska oldida klinik holat tahlili', 'pr.cap': 'Doska oldida tahlil. Shifokor arxividan',
  'pr.1t': 'Har oy o‘qish', 'pr.1p': 'Postlarda — chet elda har oylik majburiy stajirovkalar: Yevropa, Hindiston, Rossiya. Har safardan keyin Toshkentdagi qabul e’lon qilingan kundan davom etadi.',
  'pr.2t': 'Eshitish yo‘li orqali', 'pr.2p': 'O‘rta quloqdagi operatsiyalarning bir qismi endaural — tashqi eshitish yo‘li orqali, quloq ortidan kesmasiz bajariladi. Bu usul mos keladimi — ko‘rikdan keyin hal qilinadi.',
  'pr.3t': 'Burun va bo‘shliqlarda endoskop', 'pr.3p': 'Burun to‘sig‘i, poliplar, yuqori jag‘ bo‘shlig‘idagi yot jismlar, papilloma — endoskopik usulda, ekrandagi tasvir nazoratida.',
  'pr.4t': 'Qaror — ko‘rikdan keyin', 'pr.4p': 'Eshitishni tekshirish, endoskopik ko‘rik, MSKT. Davolash natijasi tashxisga bog‘liq; taktika konsultatsiyada muhokama qilinadi.',
  'pra.k': 'To‘rt yo‘nalish', 'pra.t': 'Yo‘nalishlar',
  'd.ear': 'Otojarrohlik', 'd.nose': 'Rinojarrohlik', 'd.kids': 'Bolalar LOR-jarrohligi', 'd.skull': 'Kalla asosi',
  'case.k': 'Klinik holat',
  'case.fine': 'Natija tashxisga bog‘liq; qaror — ko‘rikdan keyin. Materiallar bemorlar roziligi bilan e’lon qilinadi.',
  'br.k': 'Klinika nomi',
  'br.p1': 'Nomi va logotipi tovar belgisi sifatida ro‘yxatdan o‘tgan — № MGU 57238 guvohnoma, O‘zbekiston Respublikasi Adliya vazirligi tomonidan berilgan.',
  'br.p2': 'Logotip — ko‘k-yashil ranglardagi stillashtirilgan bosh profili: quloq, burun va tomoq yagona tizim sifatida.',
  'br.logoalt': 'LOR – PREMIUM logotipi', 'br.certalt': '«LOR – PREMIUM» tovar belgisi guvohnomasi, № MGU 57238',
  'br.certcap': '№ MGU 57238 guvohnoma. Shifokor storisidan kadr',
  'br.tvalt': 'Fozilxon Usmonxonov telestudiyada', 'br.tvcap': 'Teleko‘rsatuv mehmoni, Toshkent',
  'pa.k': 'Bemorlar', 'pa.t': 'Bemorlar hikoyalari',
  'pa.p': 'Bemorlar davolanishdan keyin shifokorga yuborgan xabarlar — uning «Otzivlar» (sharhlar) bo‘limida qanday saqlangan bo‘lsa, shunday. Tahrir va qayta hikoyasiz.',
  'pa.geo': 'Qozog‘iston — Aqtau, Taroz. Qirg‘iziston. Tojikiston — Dushanbe. Rossiya. Qoraqalpog‘iston, Xorazm, Namangan.',
  'pa.prev': 'Oldingisi', 'pa.next': 'Keyingisi',
  'pa.fine': 'Shifokorning Instagram arxividan skrinshotlar. Bemorlar roziligi bilan e’lon qilinadi.',
  'bk.k': 'Konsultatsiya', 'bk.t': 'Konsultatsiyaga yozilish',
  'bk.lede': 'Maydonlarni to‘ldiring — o‘ng tomonda xabar tayyor bo‘ladi. Uni Instagram Direct’ga yuboring yoki qo‘ng‘iroq qiling. Manzil va qabul vaqti yozilishda aytiladi.',
  'f.name': 'Ism', 'f.phone': 'Telefon', 'f.city': 'Shahar, davlat', 'f.cityph': 'Toshkent, O‘zbekiston',
  'f.area': 'Nima bezovta qilyapti', 'f.ear': 'Quloq', 'f.nose': 'Burun, bo‘shliqlar', 'f.throat': 'Tomoq', 'f.child': 'Bola',
  'f.desc': 'Shikoyatlar haqida qisqacha', 'f.descph': 'Masalan: o‘ng quloqda eshitish pasaygan, LOR-shifokorda bo‘lganman',
  'f.contact': 'Qanday bog‘lanish', 'f.c1': 'Qo‘ng‘iroq',
  'bk.foreign': 'Boshqa davlatdanmisiz? MSKT suratlari va audiogrammani xabar bilan birga Instagram Direct’ga oldindan yuborishingiz mumkin.',
  'bk.lk': 'Shifokorga xabar', 'bk.call': 'Qo‘ng‘iroq qilish', 'bk.copy': 'Matnni nusxalash', 'bk.ig': 'Instagram Direct’ga yozish',
  'ft.name': 'Fozilxon Usmonxonov', 'ft.role': 'LOR-jarroh · LOR – PREMIUM',
  'ft.disc': 'Qarshi ko‘rsatmalar mavjud. Mutaxassis maslahati zarur.',
  'ft.cons': 'Klinik materiallar bemorlar roziligi bilan e’lon qilinadi.',
  'ft.concept': 'Sayt konsepti · Lumagen',
};
const RU = {};
let lang = root.lang === 'uz' ? 'uz' : 'ru';
const t = (ru, uz) => (lang === 'uz' ? uz : ru);

function cacheRu() {
  $$('[data-i]').forEach(el => { const k = el.dataset.i; if (!(k in RU)) RU[k] = el.innerHTML; });
  $$('[data-i-alt]').forEach(el => { RU['alt:' + el.dataset.iAlt] = el.alt; });
  $$('[data-i-ph]').forEach(el => { RU['ph:' + el.dataset.iPh] = el.placeholder; });
}
function applyLang(l) {
  lang = l; root.lang = l;
  try { localStorage.setItem('lor3-lang', l); } catch (e) {}
  try { const u = new URL(location.href); if (l === 'uz') u.searchParams.set('lang', 'uz'); else u.searchParams.delete('lang'); history.replaceState(null, '', u); } catch (e) {}
  $$('[data-i]').forEach(el => { const k = el.dataset.i; const v = l === 'uz' ? UZ[k] : RU[k]; if (v != null) el.innerHTML = v; });
  $$('[data-i-alt]').forEach(el => { const k = el.dataset.iAlt; el.alt = l === 'uz' ? (UZ[k] || RU['alt:' + k]) : RU['alt:' + k]; });
  $$('[data-i-ph]').forEach(el => { const k = el.dataset.iPh; el.placeholder = l === 'uz' ? (UZ[k] || RU['ph:' + k]) : RU['ph:' + k]; });
  $$('.lang button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === l)));
  document.title = t('Фозилхон Усмонхонов — ЛОР-хирург · ЛОР – PREMIUM, Ташкент', 'Fozilxon Usmonxonov — LOR-jarroh · LOR – PREMIUM, Toshkent');
  $('#navLinks').setAttribute('aria-label', t('Разделы', 'Bo‘limlar'));
  $('#routeRail').setAttribute('aria-label', t('Остановки маршрута', 'Yo‘nalish bekatlari'));
  renderStopsList(); renderRail(); setStopPanel(curStop, true);
  renderDir(curDir, false); renderReviewsLabels(); updateLetter();
  document.dispatchEvent(new CustomEvent('langchange'));
}

/* ------------------------------------------------------------------ data: school route */
const STOPS = [
  { city: ['Киров', 'Kirov'], when: ['Россия', 'Rossiya'],
    text: ['Кировская областная клиническая больница, отделение оториноларингологии и хирургии основания черепа: здесь он работал врачом-отоларингологом. Кировский государственный медицинский университет.',
           'Kirov viloyat klinik shifoxonasi, otorinolaringologiya va kalla asosi jarrohligi bo‘limi: bu yerda u shifokor-otolaringolog bo‘lib ishlagan. Kirov davlat tibbiyot universiteti.'],
    imgs: ['img/kirov_team.jpg', 'img/kirov_badge.jpg'] },
  { city: ['Москва', 'Moskva'], when: ['ФНКЦ оториноларингологии ФМБА · РМАНПО', 'FMBA otorinolaringologiya markazi · RMANPO'],
    text: ['Подготовка в ФГБУ «Федеральный научно-клинический центр оториноларингологии» ФМБА России. В РМАНПО — разбор клинических случаев с профессором С. Я. Косяковым. Встреча с профессором Г. З. Пискуновым — одним из первопроходцев эндоскопической ринохирургии в России.',
           'Rossiya FMBA «Federal otorinolaringologiya ilmiy-klinik markazi»da tayyorgarlik. RMANPOda — professor S. Ya. Kosyakov bilan klinik holatlar tahlili. Rossiyada endoskopik rinojarrohlik asoschilaridan biri professor G. Z. Piskunov bilan uchrashuv.'],
    imgs: ['img/fncc.jpg', 'img/kosyakov.jpg', 'img/piskunov.jpg'] },
  { city: ['Анталья', 'Antalya'], when: ['Университет Акдениз, Турция', 'Akdeniz universiteti, Turkiya'],
    text: ['Akdeniz University — один из учебных этапов, отмеченных в его разделе «О себе».',
           'Akdeniz University — uning «Men haqimda» bo‘limida qayd etilgan o‘qish bosqichlaridan biri.'],
    imgs: ['img/akdeniz.jpg'] },
  { city: ['Грац', 'Grats'], when: ['Австрия · 5–11 июля 2026', 'Avstriya · 2026-yil 5–11 iyul'],
    text: ['Стажировка в клинике города Грац — школы, из которой вышли Хайнц Штамбергер и Мессерклингер. Тема: микрохирургия уха и основания черепа.',
           'Grats shahridagi klinikada stajirovka — Xayns Shtamberger va Messerklinger yetishib chiqqan maktab. Mavzu: quloq va kalla asosi mikrojarrohligi.'],
    imgs: ['img/graz.jpg'] },
  { city: ['Тричи', 'Trichi'], when: ['Индия · 1–9 августа 2026', 'Hindiston · 2026-yil 1–9 avgust'],
    text: ['Стажировка у ЛОР-хирурга Н. Джанакирама, специалиста по хирургии основания черепа: операции, разбор техник.',
           'Kalla asosi jarrohligi bo‘yicha mutaxassis, LOR-jarroh N. Janakiram huzurida stajirovka: operatsiyalar, texnikalar tahlili.'],
    imgs: ['img/trichy.jpg', 'img/trichy2.jpg'] },
  { city: ['Стамбул', 'Istanbul'], when: ['Турция · сентябрь 2026', 'Turkiya · 2026-yil sentabr'],
    text: ['Всемирный конгресс оториноларингологов. В анонсе — доклад по хирургии уха.',
           'Jahon otorinolaringologlari kongressi. E’londa — quloq jarrohligi bo‘yicha ma’ruza.'],
    imgs: ['img/istanbul.jpg'] },
  { city: ['Пьяченца', 'Piachensa'], when: ['Италия · 4–11 октября 2026', 'Italiya · 2026-yil 4–11 oktabr'],
    text: ['Школа профессора Марио Санны: хирургия основания черепа, неделя в операционных и лаборатории.',
           'Professor Mario Sanna maktabi: kalla asosi jarrohligi, operatsion xonalar va laboratoriyada bir hafta.'],
    imgs: ['img/piacenza.jpg', 'img/piacenza2.jpg'] },
  { city: ['Ташкент', 'Toshkent'], when: ['ЛОР – PREMIUM', 'LOR – PREMIUM'],
    text: ['После каждой поездки — обратно к пациентам. Даты возобновления приёма он объявляет заранее.',
           'Har safardan keyin — yana bemorlar oldiga. Qabul qayta boshlanadigan sanani oldindan e’lon qiladi.'],
    imgs: ['img/hero.jpg'] },
];
const pick = a => (lang === 'uz' ? a[1] : a[0]);
let curStop = 0;

function renderStopsList() {
  const ol = $('#routeList');
  ol.innerHTML = STOPS.map((s, i) => `
    <li class="rl">
      <div class="rl-media" style="--c:${Math.min(s.imgs.length, 3)}">${s.imgs.map(src => `<img src="${src}" alt="${pick(s.city)}" loading="lazy">`).join('')}</div>
      <div class="rl-body">
        <p class="rp-num">${String(i + 1).padStart(2, '0')}<span class="rp-of">/ ${String(STOPS.length).padStart(2, '0')}</span></p>
        <h3 class="rp-city">${pick(s.city)}</h3>
        <p class="rp-when">${pick(s.when)}</p>
        <p class="rp-text">${pick(s.text)}</p>
      </div>
    </li>`).join('');
}
function renderRail() {
  const ol = $('#routeRail');
  ol.innerHTML = STOPS.map((s, i) => `<li><button type="button" data-stop="${i}" ${i === curStop ? 'aria-current="step"' : ''}>${pick(s.city)}</button></li>`).join('');
}
function setStopPanel(i, force) {
  if (i === curStop && !force) return;
  curStop = i;
  const p = $('#routePanel'); const s = STOPS[i];
  const fill = () => {
    $('#rpNum').textContent = String(i + 1).padStart(2, '0');
    $('.rp-of').textContent = '/ ' + String(STOPS.length).padStart(2, '0');
    $('#rpCity').textContent = pick(s.city);
    $('#rpWhen').textContent = pick(s.when);
    $('#rpText').textContent = pick(s.text);
  };
  if (force || RM) { fill(); p.classList.remove('swap'); }
  else { p.classList.add('swap'); clearTimeout(p._t); p._t = setTimeout(() => { fill(); p.classList.remove('swap'); }, 260); }
  $$('#routeRail button').forEach(b => { if (+b.dataset.stop === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
}

/* ------------------------------------------------------------------ data: directions */
const DIRS = {
  ear: {
    title: ['Отохирургия', 'Otojarrohlik'],
    intro: ['Операции на среднем ухе — часто через слуховой проход, без разреза за ухом.', 'O‘rta quloqdagi operatsiyalar — ko‘pincha eshitish yo‘li orqali, quloq ortidan kesmasiz.'],
    list: [['Отосклероз — стапедопластика', 'Otoskleroz — stapedoplastika'], ['Перфорация барабанной перепонки — тимпанопластика', 'Nog‘ora parda teshilishi — timpanoplastika'], ['Холестеатома — санирующая операция', 'Xolesteatoma — sanatsiya qiluvchi operatsiya'], ['Тимпаносклероз, реконструкция цепи слуховых косточек', 'Timpanoskleroz, eshitish suyakchalari zanjirini tiklash'], ['Врождённые аномалии среднего уха', 'O‘rta quloqning tug‘ma anomaliyalari'], ['Отопластика при лопоухости', 'Diqqaygan quloqlarda otoplastika']],
    case: ['Жалобы на снижение слуха и шум в ушах, диагноз — отосклероз. Выполнена эндауральная стапедопластика: стремечко заменено титановым протезом.', 'Eshitish pasayishi va quloqda shovqin, tashxis — otoskleroz. Endaural stapedoplastika bajarildi: uzangi titan protez bilan almashtirildi.'],
    video: 'DZrGKw4KvEp', vcap: ['Видео из Instagram врача', 'Shifokor Instagramidan video'],
  },
  nose: {
    title: ['Ринохирургия', 'Rinojarrohlik'],
    intro: ['Эндоскопические операции в полости носа и околоносовых пазухах.', 'Burun bo‘shlig‘i va burun yon bo‘shliqlarida endoskopik operatsiyalar.'],
    list: [['Искривление перегородки, хроническая заложенность', 'Burun to‘sig‘i qiyshiqligi, surunkali bitish'], ['Зависимость от сосудосуживающих спреев', 'Tomir toraytiruvchi spreylarga qaramlik'], ['Полипы, хронический синусит', 'Poliplar, surunkali sinusit'], ['Инородное тело (пломбировочный материал) в верхнечелюстной пазухе', 'Yuqori jag‘ bo‘shlig‘ida yot jism (plomba materiali)'], ['Инвертированная папиллома', 'Invertirlangan papilloma'], ['Перфорация перегородки носа', 'Burun to‘sig‘i teshilishi']],
    case: ['Пациент из Таджикистана: затруднённое носовое дыхание, головные боли, искривление перегородки. Выполнены радиоволновая септопластика и уменьшение нижних носовых раковин.', 'Tojikistonlik bemor: burundan nafas olish qiyinlashgan, bosh og‘rig‘i, burun to‘sig‘i qiyshiq. Radioto‘lqinli septoplastika va pastki burun chig‘anoqlarini kichraytirish bajarildi.'],
    video: 'Dc1N-S1ObwD', vcap: ['Видео из Instagram врача', 'Shifokor Instagramidan video'],
  },
  kids: {
    title: ['Детская ЛОР-хирургия', 'Bolalar LOR-jarrohligi'],
    intro: ['Дети и подростки: носовое дыхание, храп, слух.', 'Bolalar va o‘smirlar: burun bilan nafas olish, xurrak, eshitish.'],
    list: [['Аденоиды — эндоскопическое удаление', 'Adenoidlar — endoskopik olib tashlash'], ['Храп и сон с открытым ртом', 'Xurrak va og‘iz ochiq holda uxlash'], ['Снижение слуха у подростков', 'O‘smirlarda eshitish pasayishi'], ['Проверка слуха', 'Eshitishni tekshirish']],
    case: ['Подросток 14 лет, снижение слуха в течение нескольких лет. Во время операции выявлена неподвижность стремечка; установлен титановый протез.', '14 yoshli o‘smir, bir necha yildan beri eshitish pasaygan. Operatsiya vaqtida uzangining harakatsizligi aniqlandi; titan protez o‘rnatildi.'],
    video: 'DcWL4IVxmx3', vcap: ['Видео из Instagram врача', 'Shifokor Instagramidan video'],
  },
  skull: {
    title: ['Основание черепа', 'Kalla asosi'],
    intro: ['Направление, ради которого он ездит в Тричи, Грац и Пьяченцу.', 'U Trichi, Grats va Piachensaga aynan shu yo‘nalish uchun boradi.'],
    list: [['Новообразования с распространением на основание черепа', 'Kalla asosiga tarqalgan o‘smalar'], ['Эндоскопический доступ через нос', 'Burun orqali endoskopik kirish'], ['Ведение совместно с онкологом', 'Onkolog bilan birgalikda kuzatish'], ['МСКТ и обследование до решения', 'Qarordan oldin MSKT va tekshiruv']],
    case: ['Пациент из Казахстана: затруднение дыхания справа. Выявлена карцинома с распространением на основание черепа; опухоль удалена эндоскопически, далее — наблюдение онколога.', 'Qozog‘istonlik bemor: o‘ng tomondan nafas olish qiyin. Kalla asosiga tarqalgan karsinoma aniqlandi; o‘sma endoskopik olib tashlandi, keyin — onkolog kuzatuvi.'],
    video: 'DYrxOjhuF6I', vcap: ['Видео: стажировка в Тричи, Индия', 'Video: Trichidagi stajirovka, Hindiston'],
  },
};
let curDir = 'ear';
function renderDir(key, play = true) {
  const d = DIRS[key]; curDir = key;
  $('#spTitle').textContent = pick(d.title);
  $('#spIntro').textContent = pick(d.intro);
  $('#spList').innerHTML = d.list.map(x => `<li>${pick(x)}</li>`).join('');
  $('#spCase').textContent = pick(d.case);
  $('#spVcap').textContent = pick(d.vcap);
  const v = $('#spVideo'); const src = `media/v/${d.video}.mp4`;
  if (!v.src.endsWith(src.slice(2))) {
    v.poster = `media/vp/${d.video}_5.jpg`; v.src = src;
    if (play && v._visible && !RM) v.play().catch(() => {});
  }
  $$('.pra-tabs [role=tab]').forEach(b => {
    const on = b.dataset.dir === key;
    b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1;
    if (on) $('#spread').setAttribute('aria-labelledby', b.id);
  });
}
function initDirs() {
  const tabs = $$('.pra-tabs [role=tab]'); const sp = $('#spread');
  const go = key => {
    if (key === curDir) return;
    if (RM) { renderDir(key); return; }
    sp.classList.add('out');
    setTimeout(() => {
      renderDir(key);
      sp.classList.remove('out'); sp.classList.add('in');
      void sp.offsetWidth; sp.classList.remove('in');
    }, 420);
  };
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => go(b.dataset.dir));
    b.addEventListener('keydown', e => {
      const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return; e.preventDefault();
      const n = tabs[(i + d + tabs.length) % tabs.length]; n.focus(); go(n.dataset.dir);
    });
  });
}

/* ------------------------------------------------------------------ reviews stack */
const REVIEWS = ['22', '18', '04', '40', '00', '48', '33', '35', '51', '12'];
let order = REVIEWS.map((_, i) => i);
function initStack() {
  const st = $('#stack');
  st.innerHTML = REVIEWS.map((n, i) => `<figure class="card" data-i="${i}" role="group" aria-roledescription="slide"><img src="media/hl/reviews_${n}.jpg" alt="" loading="lazy" decoding="async" width="640" height="1136"></figure>`).join('');
  layoutStack();
  const next = () => {
    const top = st.querySelector(`.card[data-i="${order[0]}"]`);
    if (RM) { order.push(order.shift()); layoutStack(); return; }
    top.classList.add('leave');
    order.push(order.shift()); layoutStack(top);
    setTimeout(() => { top.classList.remove('leave'); layoutStack(); }, 560);
  };
  const prev = () => {
    order.unshift(order.pop());
    const c = st.querySelector(`.card[data-i="${order[0]}"]`);
    if (!RM) { c.classList.add('enter'); c.style.setProperty('--k', 0); void c.offsetWidth; c.classList.remove('enter'); }
    layoutStack();
  };
  $('#stackNext').addEventListener('click', next);
  $('#stackPrev').addEventListener('click', prev);
  st.tabIndex = 0;
  st.addEventListener('keydown', e => { if (e.key === 'ArrowRight') { e.preventDefault(); next(); } if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); } });
  let sx = null, sy = 0;
  st.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; });
  st.addEventListener('pointerup', e => {
    if (sx == null) return; const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
    else if (Math.abs(dx) < 6 && Math.abs(dy) < 6) next();
  });
  st.addEventListener('pointercancel', () => { sx = null; });
}
function layoutStack(skip) {
  const st = $('#stack');
  order.forEach((idx, k) => {
    const c = st.querySelector(`.card[data-i="${idx}"]`);
    if (c === skip) return;
    c.style.setProperty('--k', Math.min(k, 5));
    c.hidden = k > 5;
    c.setAttribute('aria-hidden', k === 0 ? 'false' : 'true');
  });
  $('#stackCount').textContent = `${order[0] + 1} / ${REVIEWS.length}`;
}
function renderReviewsLabels() {
  $$('#stack .card').forEach((c, i) => {
    c.setAttribute('aria-label', t(`История пациента ${i + 1} из ${REVIEWS.length}`, `Bemor hikoyasi ${i + 1} / ${REVIEWS.length}`));
    c.querySelector('img').alt = t('Скриншот сообщения пациента', 'Bemor xabarining skrinshoti');
  });
  $('#stack').setAttribute('aria-label', t('Истории пациентов', 'Bemorlar hikoyalari'));
}

/* ------------------------------------------------------------------ booking composer */
const AREA = { ear: ['ухо', 'quloq'], nose: ['нос, пазухи', 'burun, bo‘shliqlar'], throat: ['горло', 'tomoq'], child: ['ребёнок (ЛОР)', 'bola (LOR)'] };
const CONTACT = { call: ['звонок', 'qo‘ng‘iroq'], tg: ['Telegram', 'Telegram'], wa: ['WhatsApp', 'WhatsApp'], ig: ['Instagram', 'Instagram'] };
function letterText() {
  const f = $('#bkForm'); const v = n => (f.elements[n].value || '').trim();
  const area = f.querySelector('[name=area]:checked').value; const ct = f.querySelector('[name=contact]:checked').value;
  const dash = '—';
  const L = [];
  L.push(t('Здравствуйте, Фозилхон Одилхонович!', 'Assalomu alaykum, Fozilxon Odilxonovich!'));
  L.push(t('Хочу записаться на консультацию.', 'Konsultatsiyaga yozilmoqchiman.'));
  L.push('');
  L.push(`${t('Имя', 'Ism')}: ${v('name') || dash}`);
  L.push(`${t('Телефон', 'Telefon')}: ${v('phone') || dash}`);
  L.push(`${t('Город, страна', 'Shahar, davlat')}: ${v('city') || dash}`);
  L.push(`${t('Что беспокоит', 'Nima bezovta qilyapti')}: ${pick(AREA[area])}`);
  if (v('desc')) L.push(`${t('Жалобы', 'Shikoyatlar')}: ${v('desc')}`);
  L.push(`${t('Удобная связь', 'Qulay aloqa')}: ${pick(CONTACT[ct])}`);
  return L.join('\n');
}
function updateLetter() { const el = $('#letterText'); if (el) el.textContent = letterText(); }
async function copyText(s) {
  try { await navigator.clipboard.writeText(s); return true; } catch (e) {
    const ta = document.createElement('textarea'); ta.value = s; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch (_) {} ta.remove(); return ok;
  }
}
function initBook() {
  const f = $('#bkForm'); f.addEventListener('input', updateLetter); f.addEventListener('change', updateLetter);
  f.addEventListener('submit', e => e.preventDefault());
  const status = $('#bkStatus');
  $('#copyBtn').addEventListener('click', async () => {
    const ok = await copyText(letterText());
    if (!ok) { const r = document.createRange(); r.selectNodeContents($('#letterText')); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r); }
    status.textContent = ok ? t('Текст скопирован. Вставьте его в сообщение.', 'Matn nusxalandi. Uni xabarga qo‘ying.') : t('Автокопирование недоступно: текст выделен, скопируйте его вручную.', 'Avtomatik nusxalash ishlamadi: matn belgilandi, uni qo‘lda nusxalang.');
  });
  $('#igBtn').addEventListener('click', () => {
    copyText(letterText()).then(ok => { if (ok) status.textContent = t('Текст скопирован — вставьте его в Direct.', 'Matn nusxalandi — uni Direct’ga qo‘ying.'); });
  });
  updateLetter();
}

/* ------------------------------------------------------------------ nav */
function initNav() {
  const nav = $('#nav'); const links = $('#navLinks'); const btn = $('#menuBtn');
  btn.addEventListener('click', () => { const o = !links.classList.contains('open'); links.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); });
  links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && links.classList.contains('open')) { links.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); btn.focus(); } });
  $$('.lang button').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
  const darkSecs = [$('#school'), $('#patients')];
  const secs = ['school', 'principles', 'practice', 'patients', 'book'].map(id => document.getElementById(id));
  const onScroll = () => {
    const y = window.scrollY; const probe = nav.offsetHeight * .5 + 2;
    let dark = false;
    darkSecs.forEach(s => { const r = s.getBoundingClientRect(); if (r.top <= probe && r.bottom > probe) dark = true; });
    nav.classList.toggle('dark', dark);
    nav.classList.toggle('solid', !dark && y > 20);
    let cur = null; secs.forEach(s => { const r = s.getBoundingClientRect(); if (r.top < innerHeight * 0.4) cur = s.id; });
    $$('#navLinks a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + cur));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

/* ------------------------------------------------------------------ videos: play when visible */
function initVideos() {
  const io = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target; v._visible = e.isIntersecting;
    if (e.isIntersecting && !RM) v.play().catch(() => {}); else v.pause();
  }), { threshold: 0.35 });
  $$('video').forEach(v => io.observe(v));
}

/* ------------------------------------------------------------------ cert tilt */
function initTilt() {
  if (RM || matchMedia('(hover: none)').matches) return;
  $$('.tilt').forEach(el => {
    const inn = el.querySelector('.tilt-in');
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      inn.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateZ(10px)`;
    });
    el.addEventListener('pointerleave', () => { inn.style.transform = ''; });
  });
}

/* ------------------------------------------------------------------ WebGL (lazy) */
let THREE = null;
async function loadThree() { if (!THREE) THREE = await import('three'); return THREE; }

function whenVisible(el, cb, margin = '200px') {
  const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); cb(); } }, { rootMargin: margin });
  io.observe(el);
}

/* hero portrait: depth displacement + colour reveal under the cursor */
async function initHeroGL() {
  const box = $('#heroPortrait'); const canvas = box.querySelector('canvas'); const img = box.querySelector('img');
  let T; try { T = await loadThree(); } catch (e) { return; }
  const renderer = new T.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new T.Scene(); const cam = new T.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const tex = await new T.TextureLoader().loadAsync(img.currentSrc || img.src).catch(() => null);
  if (!tex) return;
  tex.colorSpace = T.SRGBColorSpace; tex.minFilter = T.LinearFilter; tex.generateMipmaps = false;
  const U = { uTex: { value: tex }, uRes: { value: new T.Vector2(1, 1) }, uImg: { value: new T.Vector2(620, 1100) }, uMouse: { value: new T.Vector2(.5, .45) }, uM: { value: new T.Vector2(0, 0) }, uReveal: { value: 0 }, uTime: { value: 0 }, uScroll: { value: 0 } };
  const mat = new T.ShaderMaterial({ uniforms: U,
    vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }',
    fragmentShader: `
      precision highp float; varying vec2 vUv;
      uniform sampler2D uTex; uniform vec2 uRes,uImg,uMouse,uM; uniform float uReveal,uTime,uScroll;
      float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
      void main(){
        float ra=uRes.x/uRes.y, ia=uImg.x/uImg.y;
        vec2 uv=vUv; vec2 s=ra>ia?vec2(1.,ia/ra):vec2(ra/ia,1.);
        uv=(uv-.5)*s*(.82-uScroll*.05)+vec2(.56,.6);
        // pseudo depth: the figure (centre column) sits closer than the wall
        float d=exp(-pow((uv.x-.5)*3.2,2.)) * smoothstep(.02,.35,uv.y) * (0.65+0.35*smoothstep(.2,.8,uv.y));
        vec2 off=uM*(0.006+0.022*d);
        vec3 col=texture2D(uTex,uv-off).rgb;
        float g=dot(col,vec3(.299,.587,.114)); g=smoothstep(.02,.98,g);
        vec3 shadow=vec3(.035,.13,.135), hi=vec3(.965,.97,.955);
        vec3 duo=mix(shadow,hi,g);
        vec2 mp=uMouse; vec2 q=(vUv-mp); q.x*=ra;
        float r=smoothstep(.30,.04,length(q))*uReveal;
        vec3 c=mix(duo,col,r*.92);
        c+= (hash(vUv*uRes+uTime)-.5)*.045;
        float vig=smoothstep(1.25,.35,length((vUv-.5)*vec2(1.,1.2)));
        c*=mix(.86,1.,vig);
        gl_FragColor=vec4(c,1.);
      }` });
  scene.add(new T.Mesh(new T.PlaneGeometry(2, 2), mat));
  const size = () => { const r = box.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); U.uRes.value.set(r.width, r.height); };
  size(); new ResizeObserver(size).observe(box);
  box.classList.add('gl');
  const target = new T.Vector2(0, 0), mouse = new T.Vector2(.5, .45), mTarget = new T.Vector2(.5, .45); let revealT = 0;
  const hoverable = matchMedia('(hover: hover)').matches;
  const onMove = e => {
    const r = box.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
    target.set((e.clientX / innerWidth - .5) * 2, (e.clientY / innerHeight - .5) * -2);
    mTarget.set(x, y); revealT = (x >= 0 && x <= 1 && y >= 0 && y <= 1) ? 1 : 0;
  };
  if (hoverable) addEventListener('pointermove', onMove, { passive: true });
  let vis = true; new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) loop(); }).observe(box);
  let raf = 0; const t0 = performance.now();
  function loop() {
    cancelAnimationFrame(raf);
    if (!vis) return;
    const tm = (performance.now() - t0) / 1000;
    if (!hoverable) { target.set(Math.sin(tm * .45) * .6, Math.cos(tm * .33) * .35); }
    U.uM.value.lerp(target, .06); mouse.lerp(mTarget, .1); U.uMouse.value.copy(mouse);
    U.uReveal.value += (revealT - U.uReveal.value) * .06;
    U.uTime.value = Math.floor(tm * 24) % 100;
    U.uScroll.value = Math.min(1, scrollY / innerHeight);
    renderer.render(scene, cam);
    raf = requestAnimationFrame(loop);
  }
  loop();
}

/* school route: 3D cards in depth, camera travels along the route */
async function initRouteGL() {
  const route = $('#route'); const stage = $('#routeStage'); const canvas = $('#routeCanvas');
  route.style.setProperty('--n', STOPS.length);
  let T; try { T = await loadThree(); } catch (e) { root.classList.replace('has3d', 'no3d'); return; }
  let renderer;
  try { renderer = new T.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' }); } catch (e) { root.classList.replace('has3d', 'no3d'); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  const scene = new T.Scene(); scene.fog = new T.Fog(0x000000, 9, 30);
  const cam = new T.PerspectiveCamera(42, 1, .1, 80);
  const loader = new T.TextureLoader();
  const GAP = 9;
  const cardMat = (tex, aspect) => new T.ShaderMaterial({
    transparent: true, depthWrite: true,
    uniforms: { uTex: { value: tex }, uActive: { value: 0 }, uBend: { value: 0 }, uAlpha: { value: 1 }, uAspect: { value: aspect }, uFogNear: { value: 9 }, uFogFar: { value: 30 } },
    vertexShader: `varying vec2 vUv; varying float vDepth; uniform float uBend;
      void main(){ vUv=uv; vec3 p=position; p.z+= sin(uv.x*3.14159)*uBend - uBend*.5*(1.-uv.x);
        vec4 mv=modelViewMatrix*vec4(p,1.); vDepth=-mv.z; gl_Position=projectionMatrix*mv; }`,
    fragmentShader: `precision highp float; varying vec2 vUv; varying float vDepth;
      uniform sampler2D uTex; uniform float uActive,uAlpha,uAspect,uFogNear,uFogFar;
      void main(){
        float bx=.035/uAspect, by=.035;
        vec2 inner=(vUv-vec2(bx,by))/(1.-2.*vec2(bx,by));
        vec3 paper=vec3(.94,.945,.93);
        vec3 c=paper;
        if(inner.x>0.&&inner.x<1.&&inner.y>0.&&inner.y<1.){
          vec3 t=texture2D(uTex,inner).rgb; float g=dot(t,vec3(.299,.587,.114));
          vec3 duo=mix(vec3(.03,.11,.115),vec3(.95),smoothstep(.03,.97,g));
          c=mix(duo,t,uActive);
        }
        float f=smoothstep(uFogFar,uFogNear,vDepth);
        gl_FragColor=vec4(c*f,uAlpha);
      }` });

  // layout: main card per stop (alternating slightly left/right), satellites tucked behind it
  const group = new T.Group(); scene.add(group);
  let mobile = false;
  const stops = STOPS.map((s, i) => {
    const side = i % 2 === 0 ? -1 : 1; const z = -i * GAP;
    const g = new T.Group(); g.position.set(side * .55, 0, z); group.add(g);
    const cards = s.imgs.map((src, j) => {
      const h = j === 0 ? 2.6 : 1.45; // main height may shrink for square images below
      const mesh = new T.Mesh(new T.PlaneGeometry(1, 1, 24, 1), cardMat(null, 1));
      mesh.visible = false; mesh.userData = { h, j, a: .75 };
      g.add(mesh);
      loader.load(src, tex => {
        tex.colorSpace = T.SRGBColorSpace; tex.anisotropy = 4;
        mesh.userData.a = tex.image.width / tex.image.height;
        mesh.material.uniforms.uTex.value = tex; mesh.material.uniforms.uAspect.value = mesh.userData.a;
        mesh.visible = true; placeStop(stopsRef[i]);
      });
      return mesh;
    });
    return { g, cards, side, z };
  });
  const stopsRef = stops;
  function placeStop(s) {
    const main = s.cards[0]; const ma = main.userData.a; const mh = ma > .9 ? 2.1 : 2.6; const mw = mh * ma;
    main.scale.set(mw, mh, 1); main.position.set(0, .05, 0); main.rotation.set(0, 0, 0);
    s.cards.slice(1).forEach((c, k) => {
      const { h, a } = c.userData; const w = h * a; c.scale.set(w, h, 1);
      if (mobile) { c.position.set((k ? -1 : 1) * (mw * .32), 1.55 + k * .25, -1.6 - k * .6); c.rotation.set(0, 0, (k ? 1 : -1) * .05); }
      else { c.position.set(mw / 2 + w / 2 + .18, k ? -.62 : .62, -.9 - k * .35); c.rotation.set(0, -.22, 0); }
    });
  }

  // dotted route on the floor + stop rings
  const pts = stops.map(s => new T.Vector3(s.side * .55, -1.75, s.z));
  pts.unshift(new T.Vector3(0, -1.75, 8)); pts.push(new T.Vector3(0, -1.75, stops.at(-1).z - 8));
  const floorCurve = new T.CatmullRomCurve3(pts, false, 'catmullrom', .5);
  const dg = new T.BufferGeometry().setFromPoints(floorCurve.getSpacedPoints(1000));
  scene.add(new T.Points(dg, new T.PointsMaterial({ color: 0x7fbdb6, size: .035, sizeAttenuation: true, transparent: true, opacity: .9, fog: true })));
  stops.forEach(s => {
    const ring = new T.Mesh(new T.RingGeometry(.16, .19, 48), new T.MeshBasicMaterial({ color: 0x7fbdb6, transparent: true, opacity: .9, fog: true }));
    ring.rotation.x = -Math.PI / 2; ring.position.set(s.side * .55, -1.74, s.z); scene.add(ring); s.ring = ring;
  });
  // faint dust
  const dust = new T.BufferGeometry(); const N = 700; const arr = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { arr[i * 3] = (Math.random() - .5) * 16; arr[i * 3 + 1] = (Math.random() - .3) * 7; arr[i * 3 + 2] = 8 - Math.random() * (STOPS.length * GAP + 14); }
  dust.setAttribute('position', new T.BufferAttribute(arr, 3));
  scene.add(new T.Points(dust, new T.PointsMaterial({ color: 0xeff0ec, size: .018, transparent: true, opacity: .45, fog: true })));

  // camera stations
  const DIST = () => (mobile ? 7.4 : 7.2);
  const camAt = i => { const s = stops[i]; return new T.Vector3(s.side * .3, mobile ? .2 : .25, s.z + DIST()); };
  const lookAt = i => { const s = stops[i]; return new T.Vector3(s.side * .55 + (mobile ? 0 : .55), mobile ? -1.0 : .05, s.z - .4); };

  const resize = () => {
    const w = stage.clientWidth, h = stage.clientHeight; const wasM = mobile; mobile = w < 760;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.fov = mobile ? 52 : 38; cam.updateProjectionMatrix();
    if (!mobile) cam.setViewOffset(w, h, -w * .1, 0, w, h); else cam.clearViewOffset();
    if (wasM !== mobile || !resize.done) stops.forEach(placeStop); resize.done = true;
  };
  resize(); addEventListener('resize', resize);

  const ease = f => f * f * f * (f * (f * 6 - 15) + 10);
  let prog = 0, smooth = 0; const mouse = new T.Vector2(), mT = new T.Vector2();
  if (matchMedia('(hover: hover)').matches) addEventListener('pointermove', e => mT.set(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5), { passive: true });
  const measure = () => {
    const r = route.getBoundingClientRect(); const total = route.offsetHeight - innerHeight;
    prog = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
  };
  addEventListener('scroll', measure, { passive: true }); measure(); smooth = prog;
  $('#routeRail').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const i = +b.dataset.stop; const total = route.offsetHeight - innerHeight;
    const y = route.getBoundingClientRect().top + scrollY + total * (i / (STOPS.length - 1));
    scrollTo({ top: y + 2, behavior: 'smooth' });
  });

  let vis = false; new IntersectionObserver(es => { vis = es[0].isIntersecting; if (vis) { clock.getDelta(); loop(); } }, { rootMargin: '100px' }).observe(stage);
  const hint = $('.route-hint');
  const cp = new T.Vector3(), lp = new T.Vector3();
  let raf = 0; const clock = new T.Clock();
  function loop() {
    cancelAnimationFrame(raf); if (!vis) return;
    const dt = Math.min(clock.getDelta(), .05);
    smooth += (prog - smooth) * Math.min(1, dt * 6);
    const u = smooth * (STOPS.length - 1); const i = Math.min(STOPS.length - 2, Math.floor(u)); const f = ease(Math.min(1, u - i));
    cp.copy(camAt(i)).lerp(camAt(i + 1), f); lp.copy(lookAt(i)).lerp(lookAt(i + 1), f);
    cp.y += Math.sin(f * Math.PI) * .5;
    mouse.lerp(mT, .05);
    cam.position.set(cp.x + mouse.x * .5, cp.y - mouse.y * .3, cp.z);
    cam.lookAt(lp);
    stops.forEach((s, k) => {
      const d = Math.abs(u - k); const act = Math.max(0, 1 - d * 1.8);
      const passed = u - k;
      const alpha = 1 - Math.max(0, Math.min(1, (passed - .18) / .32));
      s.g.visible = alpha > .01;
      s.g.rotation.y = Math.max(0, passed) * s.side * .9;
      s.cards.forEach(c => {
        const un = c.material.uniforms;
        un.uActive.value += (act - un.uActive.value) * .12;
        un.uBend.value = Math.max(0, passed) * 1.2;
        un.uAlpha.value = alpha;
      });
      if (s.ring) s.ring.material.opacity = .25 + act * .75;
    });
    setStopPanel(Math.round(u));
    if (hint) hint.classList.toggle('off', smooth > .02);
    renderer.render(scene, cam);
    raf = requestAnimationFrame(loop);
  }
}

/* ------------------------------------------------------------------ boot */
cacheRu();
renderStopsList(); renderRail(); setStopPanel(0, true);
renderDir('ear', false); initDirs();
initStack(); renderReviewsLabels();
initBook(); initNav(); initVideos(); initTilt();
if (lang === 'uz') applyLang('uz');
if (HAS3D) {
  initHeroGL();
  whenVisible($('#school'), initRouteGL, '600px');
}
