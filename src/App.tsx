import { useMemo, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  Check,
  Copy,
  FileText,
  Github,
  Mail,
  RotateCcw,
  Sparkles,
  Target,
  User,
  WandSparkles,
} from 'lucide-react';

type ResumeData = {
  name: string;
  role: string;
  skills: string;
  about: string;
  experience: string;
  contacts: string;
};

type FieldConfig = {
  id: keyof ResumeData;
  label: string;
  placeholder: string;
  icon: typeof User;
  multiline?: boolean;
};

const initialData: ResumeData = {
  name: '',
  role: '',
  skills: '',
  about: '',
  experience: '',
  contacts: '',
};

const exampleData: ResumeData = {
  name: 'Алексей Смирнов',
  role: 'Junior Frontend Developer',
  skills: 'React, TypeScript, Tailwind CSS, Git, адаптивная верстка',
  about: 'Внимательно отношусь к деталям интерфейса, люблю понятную структуру и аккуратную адаптивную верстку.',
  experience: 'Учебные проекты: лендинги, формы, интерфейсы с live preview и интерактивными состояниями.',
  contacts: 'telegram: @poshkiri, email: MP_samilop@mail.ru, github: github.com/poshkiri',
};

const fields: FieldConfig[] = [
  {
    id: 'name',
    label: 'Имя',
    placeholder: 'Например: Алексей Смирнов',
    icon: User,
  },
  {
    id: 'role',
    label: 'Профессия',
    placeholder: 'Например: Junior Frontend Developer',
    icon: BriefcaseBusiness,
  },
  {
    id: 'skills',
    label: 'Навыки',
    placeholder: 'React, TypeScript, Tailwind CSS, Git...',
    icon: WandSparkles,
    multiline: true,
  },
  {
    id: 'about',
    label: 'Описание о себе',
    placeholder: 'Коротко опишите подход к работе, сильные стороны и интересы...',
    icon: FileText,
    multiline: true,
  },
  {
    id: 'experience',
    label: 'Опыт или учебные проекты',
    placeholder: 'Опишите учебные проекты, практику, pet-проекты или стажировку...',
    icon: Target,
    multiline: true,
  },
  {
    id: 'contacts',
    label: 'Контакты',
    placeholder: 'Telegram, Email, GitHub, LinkedIn...',
    icon: Mail,
    multiline: true,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

function App() {
  const [resume, setResume] = useState<ResumeData>(initialData);
  const [copied, setCopied] = useState(false);

  const resumeText = useMemo(() => buildResumeText(resume), [resume]);
  const completion = useMemo(() => getCompletion(resume), [resume]);

  const updateField = (id: keyof ResumeData, value: string) => {
    setResume((current) => ({ ...current, [id]: value }));
    setCopied(false);
  };

  const improveResume = () => {
    setResume((current) => improveTextLocally(current));
    setCopied(false);
  };

  const copyResume = async () => {
    await copyToClipboard(resumeText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const clearResume = () => {
    setResume(initialData);
    setCopied(false);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050711] text-white">
      <div className="fixed inset-0 -z-10 bg-grid" />
      <div className="fixed inset-0 -z-10 bg-glow" />

      <Header />
      <Hero completion={completion} onFillExample={() => setResume(exampleData)} />
      <Builder
        resume={resume}
        resumeText={resumeText}
        copied={copied}
        onChange={updateField}
        onImprove={improveResume}
        onCopy={copyResume}
        onClear={clearResume}
      />
      <Footer />
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050711]/78 backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="#" className="brand-logo">
          <span className="brand-mark" aria-hidden="true">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="truncate">AI Resume Builder</span>
        </a>

        <a href="https://github.com/poshkiri" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 text-sm text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-300/10 sm:inline-flex">
          <Github className="h-4 w-4" />
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Hero({ completion, onFillExample }: { completion: number; onFillExample: () => void }) {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 pt-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-16 lg:pt-16">
      <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10">
        <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 shadow-glow backdrop-blur">
          <Sparkles className="h-4 w-4 text-cyan-300" />
          Local AI-style resume helper
        </motion.div>
        <motion.h1 variants={fadeUp} className="max-w-4xl text-4xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
          Соберите аккуратный текст резюме за несколько минут
        </motion.h1>
        <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Учебное React-приложение с live preview, локальным улучшением формулировок и быстрым копированием готового текста. Всё работает прямо в браузере и остаётся простым для изучения.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#builder" className="btn-primary">
            Начать сборку
            <ArrowRight className="h-5 w-5" />
          </a>
          <button type="button" onClick={onFillExample} className="btn-secondary">
            Заполнить пример
          </button>
        </motion.div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="absolute -inset-8 rounded-[32px] bg-cyan-400/15 blur-3xl animate-pulseGlow" />
        <div className="hero-card animate-float">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Готовность резюме</p>
              <p className="mt-1 text-3xl font-semibold">{completion}%</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 text-cyan-100 shadow-glow">
              <BrainCircuit className="h-7 w-7" />
            </div>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-500 transition-all duration-500" style={{ width: `${completion}%` }} />
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
            {['Форма', 'Preview', 'Copy'].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-center">
                {item}
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </section>
  );
}

function Builder({
  resume,
  resumeText,
  copied,
  onChange,
  onImprove,
  onCopy,
  onClear,
}: {
  resume: ResumeData;
  resumeText: string;
  copied: boolean;
  onChange: (id: keyof ResumeData, value: string) => void;
  onImprove: () => void;
  onCopy: () => void;
  onClear: () => void;
}) {
  return (
    <section id="builder" className="px-5 py-12 sm:px-8 sm:py-16">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} variants={stagger} className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <ResumeForm resume={resume} onChange={onChange} />
        <ResumePreview resume={resume} resumeText={resumeText} copied={copied} onImprove={onImprove} onCopy={onCopy} onClear={onClear} />
      </motion.div>
    </section>
  );
}

function ResumeForm({ resume, onChange }: { resume: ResumeData; onChange: (id: keyof ResumeData, value: string) => void }) {
  return (
    <motion.div variants={fadeUp} className="glass-panel">
      <div className="mb-6">
        <p className="text-sm font-medium text-cyan-200">Форма</p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Введите данные для резюме</h2>
      </div>

      <div className="grid gap-4">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <label key={field.id} className="field-group">
              <span className="field-label">
                <Icon className="h-4 w-4 text-cyan-200" />
                {field.label}
              </span>
              {field.multiline ? (
                <textarea
                  value={resume[field.id]}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  placeholder={field.placeholder}
                  className="field-input min-h-28 resize-none"
                />
              ) : (
                <input
                  value={resume[field.id]}
                  onChange={(event) => onChange(field.id, event.target.value)}
                  placeholder={field.placeholder}
                  className="field-input"
                />
              )}
            </label>
          );
        })}
      </div>
    </motion.div>
  );
}

function ResumePreview({
  resume,
  resumeText,
  copied,
  onImprove,
  onCopy,
  onClear,
}: {
  resume: ResumeData;
  resumeText: string;
  copied: boolean;
  onImprove: () => void;
  onCopy: () => void;
  onClear: () => void;
}) {
  return (
    <motion.div variants={fadeUp} className="glass-panel lg:sticky lg:top-24 lg:self-start">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-medium text-violet-200">Live preview</p>
          <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Готовый текст резюме</h2>
        </div>
        <div className="rounded-2xl border border-violet-300/25 bg-violet-400/10 p-3 text-violet-100 shadow-violet">
          <FileText className="h-6 w-6" />
        </div>
      </div>

      <article className="resume-paper">
        <div className="border-b border-slate-200 pb-5">
          <h3 className="text-3xl font-bold text-slate-950">{resume.name || 'Ваше имя'}</h3>
          <p className="mt-2 text-lg font-medium text-cyan-700">{resume.role || 'Желаемая профессия'}</p>
          <p className="mt-3 text-sm text-slate-600">{resume.contacts || 'Контакты появятся здесь'}</p>
        </div>

        <PreviewBlock title="Навыки" text={resume.skills || 'Добавьте ключевые навыки: технологии, инструменты, подходы.'} />
        <PreviewBlock title="О себе" text={resume.about || 'Добавьте короткое описание о себе, подходе к работе и сильных сторонах.'} />
        <PreviewBlock title="Опыт или учебные проекты" text={resume.experience || 'Опишите проекты, практику или учебные работы.'} />
      </article>

      <pre className="mt-5 max-h-64 overflow-auto whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/25 p-4 text-sm leading-6 text-slate-300">
        {resumeText}
      </pre>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <button type="button" onClick={onImprove} className="btn-primary">
          <Sparkles className="h-5 w-5" />
          Улучшить
        </button>
        <button type="button" onClick={onCopy} className="btn-secondary">
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
          {copied ? 'Скопировано' : 'Скопировать'}
        </button>
        <button type="button" onClick={onClear} className="btn-secondary">
          <RotateCcw className="h-5 w-5" />
          Очистить
        </button>
      </div>
    </motion.div>
  );
}

function PreviewBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="mt-5">
      <h4 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">{title}</h4>
      <p className="mt-2 leading-7 text-slate-700">{text}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-400 sm:flex-row">
        <p>AI Resume Builder — учебный frontend-проект.</p>
        <p>React + TypeScript + Tailwind CSS + Framer Motion</p>
      </div>
    </footer>
  );
}

function buildResumeText(resume: ResumeData) {
  return [
    resume.name || 'Ваше имя',
    resume.role || 'Желаемая профессия',
    '',
    `Навыки: ${resume.skills || 'укажите ключевые навыки'}`,
    '',
    `О себе: ${resume.about || 'добавьте короткое описание о себе'}`,
    '',
    `Опыт или учебные проекты: ${resume.experience || 'добавьте описание опыта или учебных проектов'}`,
    '',
    `Контакты: ${resume.contacts || 'добавьте контакты'}`,
  ].join('\n');
}

function getCompletion(resume: ResumeData) {
  const filled = Object.values(resume).filter((value) => value.trim().length > 0).length;
  return Math.round((filled / Object.keys(resume).length) * 100);
}

function improveTextLocally(resume: ResumeData): ResumeData {
  // Future improvement: replace this template helper with a real AI API call.
  const role = resume.role.trim() || 'Frontend Developer';
  const skills = normalizeSentence(resume.skills, 'React, TypeScript, Tailwind CSS, адаптивная верстка');
  const experience = normalizeSentence(
    resume.experience,
    'создавал учебные интерфейсы, формы и адаптивные страницы',
  );
  const about = normalizeSentence(
    resume.about,
    'внимательно отношусь к деталям интерфейса и стремлюсь писать понятный поддерживаемый код',
  );

  return {
    ...resume,
    role,
    skills: `Уверенно использую ${skills}. Понимаю основы компонентного подхода, адаптивной верстки и аккуратной работы с пользовательским интерфейсом.`,
    about: `Я ${role}, который ${about}. Быстро разбираюсь в задачах, ценю аккуратную визуальную подачу и стараюсь делать интерфейсы понятными для пользователя.`,
    experience: `Имею практический опыт через учебные проекты: ${experience}. В работе уделяю внимание структуре компонентов, визуальной иерархии, состояниям интерфейса и адаптивности.`,
  };
}

function normalizeSentence(value: string, fallback: string) {
  const text = value.trim() || fallback;
  return text.endsWith('.') ? text.slice(0, -1) : text;
}

async function copyToClipboard(text: string) {
  // Future improvement: show a toast with detailed error handling for older browsers.
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'true');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
  }
}

export default App;
