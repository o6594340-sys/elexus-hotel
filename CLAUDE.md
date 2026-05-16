# CLAUDE.md — StayGuide Project

## Что это за проект

PWA-приложение для гостей отеля (Hotel Guest Experience Platform).
Рабочее название: **StayGuide**.
Продаётся отелям 4–5★ как SaaS по подписке, white-label.

## Ключевые файлы проекта

- `brief.md` — полное ТЗ: цели, фичи, этапы, риски, метрики
- `product.md` — продуктовые требования P0/P1/P2, стек, тарифы
- `research.md` — исследование конкурентов и клиентов (5 отелей)
- `turkey-market-analysis.md` — оценка турецкого рынка, риски, стратегия входа

## Стратегия продукта

**MICE First** — MICE-модуль является основным продуктом, Guest App идёт в комплекте.
Причина: только 4% гостей используют hotel app для коммуникации. MICE-боль конкретна и измерима.

## Технический стек (утверждён)

- **Frontend / PWA:** Next.js 16 + Tailwind CSS v4 + TypeScript
- **Backend / БД:** Supabase (realtime, auth, RLS, storage)
- **Push:** Web Push API + WhatsApp Business API (дубль для iOS < 16.4)
- **Хостинг:** Vercel (авто-деплой из GitHub)
- **i18n:** next-intl v4 (языки: RU, EN; TR, AR — в планах)
- **Аналитика:** Plausible
- **Шрифты:** Playfair Display + DM Sans (via next/font/google)

## Дизайн-система (утверждена, май 2026)

**Концепция:** luxury hospitality — тёмно-синий + золото + кремовый. Не корпоративный, не детский.

**Цвета:**
```
--color-navy:  #0c1824   /* primary background, text */
--color-gold:  #c9a96e   /* accent, active states — использовать скупо */
--color-cream: #faf9f6   /* page background */
--color-muted: #8a9099   /* secondary text */
```

**Типографика:**
- `font-display` (Playfair Display) — название отеля, заголовки разделов
- `font-sans` (DM Sans) — всё остальное
- Headline: 28–34px | Body: 14–16px | Labels: 12px | Nav: 10px uppercase

**Правила:**
- SVG-иконки везде, emoji запрещены
- Золото максимум в 3 местах на экране (иначе теряет вес)
- Hover только через CSS (`:hover`, `:active`), не через `onMouseEnter` — это PWA
- Все цвета через CSS-переменные / Tailwind токены, не захардкоженные hex
- Модальные окна — bottom sheet стиль, не центр экрана
- Расписание — timeline с временем слева

**Состояние на май 2026:**
- ✅ Главный экран (hero с фото, action buttons, расписание, анонсы)
- ✅ Нижняя навигация с SVG-иконками — 6 вкладок: Home / Dining / Spa / Map / Events / Requests
- ✅ Wi-Fi bottom sheet модал (role=dialog, Escape, backdrop)
- ✅ SPA кнопка — bottom sheet с 6 процедурами, ценами, выбором дня/времени
- ✅ Рестораны / Бары / Что включено (app/dining/page.tsx)
- ✅ Спа — описание, цены, кнопка записи (app/spa/page.tsx)
- ✅ Карта отеля — 5 зон, SVG-иконки (app/map/page.tsx)
- ✅ MICE-страница — generic white-label, 3 venue, 6 услуг (app/mice/page.tsx)
- ✅ Запросы гостя — Supabase realtime, история, статусы
- ✅ Staff Dashboard /admin — real-time, Accept/Complete
- ✅ PWA манифест + иконки 192/512px
- ✅ Задеплоено на Railway: elexus-hotel-production.up.railway.app
- ⚠️ Inline styles → нужно перенести в Tailwind-токены (white-label требует, P1)

## Архитектура

- Мультитенантность: каждый отель — отдельный subdomain (`elexus.stayguide.app`)
- Данные изолированы через Supabase Row Level Security
- CMS — роут `/admin` с авторизацией
- Service Worker: offline-first, aggressive cache при первом открытии

## Приоритеты разработки

**P0 (MVP — ✅ ГОТОВО к демо):**
- ✅ Action-first главный экран (кнопки: полотенца, спа, Wi-Fi, ресепшен)
- ✅ SPA booking sheet с процедурами и ценами
- ✅ Рестораны, что включено в пакет, спа, карта
- ✅ MICE-страница (white-label, 3 venue)
- ✅ Запросы гостя с историей и статусами (Supabase realtime)
- ✅ Staff dashboard /admin
- ✅ PWA манифест + иконки
- ❌ PWA service worker / offline cache (некритично для демо)
- ❌ Мультиязычность RU/EN (некритично для демо)

**P1 (после демо):**
- MICE event-specific content via CMS (программа, Wi-Fi, менеджер)
- Push-уведомления
- Мультиязычность RU/EN (next-intl v4)
- Inline styles → Tailwind-токены (white-label)
- CMS с напоминаниями, шаблонами, алертом устаревания
- FAQ, расписание анимации
- ROI-калькулятор в CMS

**P2 (следующая версия):**
- AI-чатбот
- PMS-интеграция
- Оценка сервиса (service recovery)

## Важные продуктовые решения

- Главный экран — **действия**, не информация. Гости не читают — они заказывают.
- Контент в CMS **должен** иметь защиту от устаревания (напоминания + алерт GM)
- Push на iOS < 16.4 не работает → критичные уведомления дублировать через WhatsApp
- Без PMS-интеграции на старте — это главный страх отелей, standalone = ниже барьер входа
- Контракты с отелями только в EUR (защита от инфляции TRY)

## Целевые клиенты (первая очередь)

1. **Elexus Hotel** (Сев. Кипр) — нет ничего цифрового, максимальная готовность ★★★★★
2. **Susesi Luxury Resort** (Белек) — высокий сервис, нет digital, готов €300–600/мес
3. **Regnum Carya** (Белек) — MICE-гигант, бумажные программы, растёт до 900 номеров

## Что НЕ делаем

- Mobile key / Bluetooth / NFC (только native app)
- Онлайн-оплата внутри app
- Native iOS/Android app (только PWA)
- AI-чатбот (P2, интегрировать готовое решение позже)

## Демо для выставки

Выставка в отеле Elexus (Северный Кипр). Сценарий (2.5 мин):
1. Зачитать реальный TripAdvisor-отзыв Elexus (про All Inclusive Plus)
2. QR → GM сканирует своим телефоном → открылось без скачивания
3. Action-кнопки → «Полотенца» → запрос → **на ноутбуке обновляется в реальном времени** (нужен Supabase!)
4. Раздел "Что включено" — "вот что бы увидел тот гость из отзыва"
5. CMS → обновление расписания за 30 секунд → анонс на телефоне
6. MICE-страница (даже захардкоженная) → "через 3 недели для ваших CIS-групп"
7. Оффер: 60 дней бесплатно, если <30% гостей используют — уходите

**Главные возражения GM и ответы:**
- "Кто будет обновлять?" → шаблоны + алерт устаревания + онбординг от нас
- "Докажите ROI" → распечатать расчёт: 600 номеров × 0.5 звонка × 30 мин × €15/час
- "Нет других отелей?" → "Вы будете первым, это founding-hotel rate, через сезон будет кейс"
- "Интеграция с PMS?" → "Специально без — запуск за 7 дней, не 6 месяцев"

## Критический разбор (май 2026) — результаты

Оценки от 3 специалистов:
- **UX-дизайнер:** Visual 6.5 / UX 6.0 / Luxury Feel 5.5 из 10
- **Frontend-разработчик:** Code 4 / Performance 5 / Accessibility 3 из 10
- **Продакт-менеджер:** demo-ready для разговора, НЕ для подписания

**Топ-5 задач до демо — все выполнены ✅:**
1. ✅ Supabase realtime для requests (demo-blocker)
2. ✅ Hero с фото отеля на главном экране
3. ✅ MICE-страница white-label
4. ✅ Wi-Fi модал → настоящий dialog (role, Escape, backdrop)
5. ✅ SPA кнопка → booking sheet с процедурами и ценами

**Ссылки для демо:**
- Гость (телефон): https://elexus-hotel-production.up.railway.app
- Персонал (ноутбук): https://elexus-hotel-production.up.railway.app/admin
- Очистить данные перед демо: `DELETE FROM requests;` в Supabase SQL Editor
