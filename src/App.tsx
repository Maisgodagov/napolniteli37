import { Fragment, type FormEvent, useMemo, useState } from "react";

type Product = {
  name: string;
  image: string;
  alt: string;
  bullets: string[];
};

type Item = {
  title: string;
  text: string;
};

function formatRuPhone(digits: string): string {
  const d = digits.slice(0, 10);
  const p1 = d.slice(0, 3);
  const p2 = d.slice(3, 6);
  const p3 = d.slice(6, 8);
  const p4 = d.slice(8, 10);

  let out = "+7";
  if (p1) out += ` ${p1}`;
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

const products: Product[] = [
  {
    name: "Лебяжий пух",
    image: "/assets/Лебяжий пух.png",
    alt: "Лебяжий пух наполнитель для одеял и подушек оптом",
    bullets: [
      "мягкий объем и комфорт для подушек и одеял",
      "стабильное качество в регулярных поставках",
    ],
  },
  {
    name: "Микрогель",
    image: "/assets/Микрогель.PNG",
    alt: "Микрогель для производства домашнего текстиля",
    bullets: [
      "тактильно приятный современный наполнитель",
      "подходит для линеек от стандарт до премиум",
    ],
  },
  {
    name: "Полиэфирное волокно",
    image: "/assets/Полиэфирное волокно.png",
    alt: "Полиэфирное волокно оптом от производителя Иваново",
    bullets: [
      "универсальный материал для текстильных изделий",
      "применение: подушки, одеяла, утеплители",
    ],
  },
  {
    name: "Синтепон эконом",
    image: "/assets/Синтепон эконом.png",
    alt: "Синтепон эконом оптом для серийного производства",
    bullets: [
      "оптимальный выбор для массовых партий",
      "выгодная цена и быстрая комплектация заказов",
    ],
  },
  {
    name: "Синтепух вторичка",
    image: "/assets/Синтепух вторичка.png",
    alt: "Синтепух вторичка для подушек и мягких изделий",
    bullets: [
      "практичный наполнитель для бюджетных коллекций",
      "ровная структура и рабочая плотность",
    ],
  },
  {
    name: "Синтепух первичка",
    image: "/assets/Синтепух первичка.png",
    alt: "Синтепух первичка наполнитель премиального сегмента",
    bullets: [
      "высокое восстановление формы и упругость",
      "подходит для подушек, одеял и мягкого инвентаря",
    ],
  },
  {
    name: "Холофайбер шарик",
    image: "/assets/Холофайбер шарик.png",
    alt: "Холофайбер шарик оптом для подушек и игрушек",
    bullets: [
      "шариковая структура для равномерного наполнения",
      "применение: игрушки, подушки, мягкая мебель",
    ],
  },
  {
    name: "Шерсть",
    image: "/assets/Шерсть.png",
    alt: "Шерсть наполнитель для теплых одеял",
    bullets: [
      "натуральное решение для теплых текстильных изделий",
      "для коллекций домашнего текстиля и одеял",
    ],
  },
];

const benefits: Item[] = [
  {
    title: "Производство в Иваново",
    text: "Контролируем качество сырья, плотность и стабильность партий на каждом этапе.",
  },
  {
    title: "От эконом до премиум",
    text: "Подбираем наполнители под бюджет, позиционирование бренда и целевую себестоимость.",
  },
  {
    title: "Опт любых объемов",
    text: "Работаем как с небольшими цехами, так и с крупными производственными заказами.",
  },
  {
    title: "Подбор под задачу",
    text: "Помогаем выбрать состав и формат наполнителя под конкретный тип изделия.",
  },
];

const useCases: string[] = [
  "производство одеял и подушек",
  "домашний текстиль и постельные принадлежности",
  "матрасы и наматрасники",
  "мягкие игрушки и мебельные элементы",
  "утеплители и мягкий инвентарь",
];

const steps: Item[] = [
  {
    title: "1. Заявка и задача",
    text: "Вы сообщаете тип изделия, нужную плотность, объем и требования к качеству.",
  },
  {
    title: "2. Подбор наполнителя",
    text: "Предлагаем подходящие варианты и согласовываем параметры партии.",
  },
  {
    title: "3. Производство и комплектование",
    text: "Готовим заказ в оговоренные сроки с контролем качества по партии.",
  },
  {
    title: "4. Отгрузка и документы",
    text: "Передаем заказ через ТК или самовывозом, оформляем полный комплект документов.",
  },
];

const faq: Item[] = [
  {
    title: "Какие минимальные объемы заказа?",
    text: "Работаем с небольшими и крупными партиями. Минимальный объем зависит от выбранного вида наполнителя.",
  },
  {
    title: "Можно ли заказать регулярные поставки?",
    text: "Да, фиксируем график и резервируем объемы под ваши производственные потребности.",
  },
  {
    title: "Какой срок отгрузки?",
    text: "Срок зависит от объема и состава заказа. Ориентировочные сроки сообщаем сразу после согласования заявки.",
  },
  {
    title: "Работаете ли вы с ИП и ООО?",
    text: "Да, сотрудничаем с юридическими лицами и ИП по безналичному расчету.",
  },
];

function App() {
  const [material, setMaterial] = useState<
    "Синтепон вторичка" | "Синтепон первичка" | "Холофайбер шарик" | "Шерсть"
  >("Синтепон вторичка");
  const [width, setWidth] = useState<1.5 | 2.2>(1.5);
  const [lengthM, setLengthM] = useState(10);
  const [density, setDensity] = useState(100);
  const [clientName, setClientName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formError, setFormError] = useState("");

  const baseXPrice: Record<
    "Синтепон вторичка" | "Синтепон первичка" | "Холофайбер шарик" | "Шерсть",
    Record<1.5 | 2.2, number>
  > = {
    "Синтепон вторичка": { 1.5: 22, 2.2: 33 },
    "Синтепон первичка": { 1.5: 25, 2.2: 37 },
    "Холофайбер шарик": { 1.5: 27, 2.2: 40 },
    Шерсть: { 1.5: 25, 2.2: 37 },
  };

  const money = new Intl.NumberFormat("ru-RU");
  const requestApiUrl =
    import.meta.env.VITE_REQUEST_API_URL || "https://your-backend-domain/api/site-request";
  const requestApiKey = import.meta.env.VITE_REQUEST_API_KEY || "";

  const calc = useMemo(() => {
    const safeLength = Math.max(0.1, lengthM || 0);
    const safeDensity = Math.min(400, Math.max(100, density || 100));
    const xPrice = baseXPrice[material][width];
    const densityFactor = safeDensity / 100;
    const total = Math.round(safeLength * xPrice * densityFactor);

    return {
      safeLength,
      safeDensity,
      xPrice,
      densityFactor,
      total,
    };
  }, [material, width, lengthM, density]);

  const phoneFormatted = formatRuPhone(phoneDigits);

  function handlePhoneChange(value: string): void {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("8")) digits = digits.slice(1);
    if (digits.startsWith("7")) digits = digits.slice(1);
    setPhoneDigits(digits.slice(0, 10));
  }

  async function handleSubmitRequest(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    if (clientName.trim().length < 2) {
      setFormError("Введите имя (минимум 2 символа).");
      return;
    }

    if (phoneDigits.length !== 10) {
      setFormError("Введите корректный номер телефона в формате +7.");
      return;
    }

    setSubmitStatus("loading");

    const message = [
      "Заявка с сайта Napolniteli37.ru",
      `Имя клиента: ${clientName.trim()}`,
      `Телефон клиента: +7${phoneDigits}`,
      "",
      "Параметры расчета:",
      `Наполнитель: ${material}`,
      `Длина: ${calc.safeLength.toFixed(1)} м`,
      `Ширина: ${width} м`,
      `Плотность: ${calc.safeDensity} г/м²`,
      `Ставка X: ${calc.xPrice} ₽`,
      `Итого (ориентировочно): ${calc.total} ₽`,
    ].join("\n");

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (requestApiKey) {
        headers["X-Api-Key"] = requestApiKey;
      }

      const res = await fetch(requestApiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: clientName.trim(),
          phone: `+7${phoneDigits}`,
          material,
          lengthM: calc.safeLength.toFixed(1),
          widthM: width,
          density: calc.safeDensity,
          xPrice: calc.xPrice,
          total: calc.total,
          note: message,
        }),
      });

      if (!res.ok) {
        throw new Error("request_failed");
      }

      setSubmitStatus("success");
      setClientName("");
      setPhoneDigits("");
    } catch {
      setSubmitStatus("error");
      setFormError(
        "Не удалось отправить заявку. Позвоните нам: + 7 961 116 34 13."
      );
    }
  }

  return (
    <Fragment>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="tel:+79611163413">+ 7 961 116 34 13</a>
          <a href="https://viber.com" rel="nofollow noopener noreferrer">
            Viber
          </a>
          <a
            href="https://wa.me/79611163413"
            rel="nofollow noopener noreferrer"
          >
            WhatsApp
          </a>
          <span className="divider">|</span>
          <a href="#catalog">Каталог</a>
          <a href="#calculator">Рассчитать стоимость</a>
          <a href="#delivery">Доставка и оплата</a>
          <a href="#about">О компании</a>
          <a href="#contacts">Контакты</a>
        </div>
      </header>

      <main>
        <section className="hero" id="b2b">
          <div className="container hero-grid">
            <div className="hero-main">
              <p className="hero-badge">
                Наполнители оптом от производителя, Иваново
              </p>
              <h1>Наполнители для одеял, подушек и домашнего текстиля</h1>
              <p className="hero-text">
                Производство наполнителей для одеял, подушек, домашнего текстиля
                и другого мягкого инвентаря от эконом до премиум качества.
                Подбираем оптимальный вариант под ваши задачи и бюджет.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="tel:+79611163413">
                  Рассчитать стоимость
                </a>
              </div>
              <div className="hero-meta">
                <span>Опт: малые и большие объемы</span>
                <span>Доставка по России</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="section container"
          id="catalog"
          aria-label="Асортимент"
        >
          <h2 className="section-title">Асортимент</h2>
          <p className="section-lead">
            Ассортимент наполнителей для подушек, одеял, матрасов, утеплителей и
            других текстильных изделий.
          </p>
          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <figure className="product-media">
                  <img src={product.image} alt={product.alt} loading="lazy" />
                </figure>
                <div className="product-text">
                  <h3>{product.name}</h3>
                  {product.bullets.map((line) => (
                    <p key={line}>- {line}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="calculator">
          <h2 className="section-title">Рассчитать стоимость</h2>
          <div className="calc-shell">
            <div className="calc-grid">
              <div className="calc-form">
                <h3 className="calc-block-title calc-left-title">Параметры расчета</h3>
                <div className="calc-form-grid">
                  <label className="calc-field">
                    Вид наполнителя
                    <select
                      value={material}
                      onChange={(e) =>
                        setMaterial(
                          e.target.value as
                            | "Синтепон вторичка"
                            | "Синтепон первичка"
                            | "Холофайбер шарик"
                            | "Шерсть"
                        )
                      }
                    >
                      <option value="Синтепон вторичка">Синтепон вторичка</option>
                      <option value="Синтепон первичка">Синтепон первичка</option>
                      <option value="Холофайбер шарик">Холофайбер шарик</option>
                      <option value="Шерсть">Шерсть</option>
                    </select>
                  </label>

                  <label className="calc-field">
                    Длина, м
                    <input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={lengthM}
                      onChange={(e) =>
                        setLengthM(Math.max(0.1, Number(e.target.value) || 0.1))
                      }
                    />
                  </label>

                  <label className="calc-field">
                    Ширина, м
                    <select
                      value={width}
                      onChange={(e) => setWidth(Number(e.target.value) as 1.5 | 2.2)}
                    >
                      <option value={1.5}>1.5</option>
                      <option value={2.2}>2.2</option>
                    </select>
                  </label>

                  <label className="calc-field">
                    Плотность, г/м²
                    <input
                      type="number"
                      min={100}
                      max={400}
                      step={10}
                      value={density}
                      onChange={(e) =>
                        setDensity(
                          Math.min(400, Math.max(100, Number(e.target.value) || 100))
                        )
                      }
                    />
                  </label>
                </div>

                <aside className="calc-result" aria-live="polite">
                  <h3 className="calc-right-title">Итог расчета</h3>
                  <div className="calc-total-box">
                    <span>Всего</span>
                    <strong>{money.format(calc.total)} ₽</strong>
                  </div>
                  <div className="calc-kpis">
                    <p>
                      <span>Ставка X</span>
                      <strong>{money.format(calc.xPrice)} ₽</strong>
                    </p>
                    <p>
                      <span>Длина</span>
                      <strong>{calc.safeLength.toFixed(1)} м</strong>
                    </p>
                    <p>
                      <span>Ширина</span>
                      <strong>{width} м</strong>
                    </p>
                    <p>
                      <span>Плотность</span>
                      <strong>{calc.safeDensity} г/м²</strong>
                    </p>
                  </div>

                  <form className="request-form" onSubmit={handleSubmitRequest}>
                    <div className="request-grid">
                      <label className="calc-field">
                        Ваше имя
                        <input
                          type="text"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Например, Иван"
                          required
                        />
                      </label>
                      <label className="calc-field">
                        Телефон
                        <input
                          type="tel"
                          value={phoneFormatted}
                          onChange={(e) => handlePhoneChange(e.target.value)}
                          placeholder="+7 900 000-00-00"
                          required
                        />
                      </label>
                    </div>

                    <button
                      className="btn btn-primary"
                      type="submit"
                      disabled={submitStatus === "loading"}
                    >
                      {submitStatus === "loading"
                        ? "Отправка..."
                        : "Оставить заявку"}
                    </button>
                  </form>

                  {formError ? <p className="form-error">{formError}</p> : null}
                  {submitStatus === "success" ? (
                    <p className="form-success">
                      Ваша заявка принята, мы перезвоним вам в ближайшее время.
                      Если не хотите ждать, можете позвонить сами: + 7 961 116 34 13.
                    </p>
                  ) : null}
                </aside>
              </div>
            </div>
          </div>
        </section>

        <section className="section container" id="about">
          <h2 className="section-title">О компании</h2>
          <p className="section-lead">
            «Наполнители 37» - производство и поставка синтетических и
            натуральных наполнителей для швейных производств, мебельных фабрик и
            текстильных компаний.
          </p>
          <div className="benefit-grid">
            {benefits.map((item) => (
              <article className="benefit-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="usage">
          <h2 className="section-title">Где применяются наши наполнители</h2>
          <div className="chips">
            {useCases.map((value) => (
              <span className="chip" key={value}>
                {value}
              </span>
            ))}
          </div>
        </section>

        <section className="section container" id="delivery">
          <h2 className="section-title">Доставка и оплата</h2>
          <div className="two-col">
            <article className="panel">
              <h3>Доставка</h3>
              <p>
                Поставляем наполнители по Иваново и всей России. Доступны
                отгрузки транспортными компаниями и самовывоз со склада.
              </p>
            </article>
            <article className="panel">
              <h3>Оплата</h3>
              <p>
                Работаем с ИП и ООО по безналичному расчету. Условия оплаты и
                сроки отгрузки фиксируем в счете и документах.
              </p>
            </article>
          </div>
        </section>

        <section className="section container" id="process">
          <h2 className="section-title">Как мы работаем</h2>
          <div className="step-grid">
            {steps.map((item) => (
              <article className="step-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container" id="faq">
          <h2 className="section-title">Частые вопросы</h2>
          <div className="faq-list">
            {faq.map((item) => (
              <details className="faq-item" key={item.title}>
                <summary>{item.title}</summary>
                <p>{item.text}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section container cta-block" id="contacts">
          <h2>Нужны наполнители оптом под вашу задачу?</h2>
          <p>
            Свяжитесь с нами, и мы подберем оптимальный вариант по составу,
            плотности, цене и срокам поставки.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="tel:+78005000844">
              Позвонить + 7 961 116 34 13
            </a>
            <a
              className="btn btn-secondary"
              href="mailto:vasya9090@mail.ru"
            >
              Написать на почту
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <section>
            <h2>Информация</h2>
            <ul>
              <li>
                <a href="#catalog">Асортимент</a>
              </li>
              <li>
                <a href="#delivery">Доставка и оплата</a>
              </li>
              <li>
                <a href="#about">О компании</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </section>
          <section>
            <h2>Контакты</h2>
            <p>
              <a href="tel:+79611163413">+ 7 961 116 34 13</a>,{" "}
              <a href="https://viber.com" rel="nofollow noopener noreferrer">
                Viber
              </a>{" "}
              /{" "}
              <a
                href="https://wa.me/79611163413"
                rel="nofollow noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
            <p>
              <a href="mailto:vasya9090@mail.ru">vasya9090@mail.ru</a>
            </p>
            <p>Город Иваново, улица Ярморочная 18/22</p>
          </section>
        </div>
        <div className="container footer-bottom">
          <p>© 2010 - 2026. Сайт Napolniteli37.ru</p>
          <a href="#">Политика конфиденциальности</a>
        </div>
      </footer>
    </Fragment>
  );
}

export default App;




