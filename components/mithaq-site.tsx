'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowUpLeft,
  Briefcase,
  Building,
  Check,
  ChevronDown,
  Clock,
  FileSpreadsheet,
  Gavel,
  MapPin,
  Phone,
  Scale,
  ShieldCheck,
  Star,
  Users,
  X,
} from 'lucide-react'

// Practice areas data
const practiceAreas = [
  {
    id: 'labor',
    icon: Briefcase,
    title: 'القضايا العمالية ومنازعات العمل',
    tag: 'توازن وحماية الحقوق',
    description: 'تسوية النزاعات العمالية المعقدة لأصحاب الأعمال والموظفين، صياغة لوائح العمل وحماية الحقوق المالية والمكافآت.',
    features: ['دعاوى الفصل التعسفي والتعويضات', 'صياغة واعتماد لوائح العمل الداخلية', 'التمثيل أمام مكاتب ومحاكم العمل'],
  },
  {
    id: 'criminal',
    icon: Gavel,
    title: 'الجنايات والجرائم الاقتصادية',
    tag: 'حضور جنائي حازم',
    description: 'تمثيل قانوني ودفاع استراتيجي رفيع المستوى في قضايا الجنايات، الأموال العامة، الجرائم المصرفية والجرائم الإلكترونية.',
    features: ['المرافعة أمام محاكم الجنايات', 'قضايا الكسب غير المشروع والأموال العامة', 'الجرائم الاقتصادية وغسيل الأموال'],
  },
  {
    id: 'family',
    icon: Users,
    title: 'قضايا الأسرة والتركات والوصايا',
    tag: 'خصوصية واحترافية تامة',
    description: 'حلول تحفظ الحقوق والكرامة وتراعي أقصى درجات السرية والخصوصية في قضايا الأحوال الشخصية وقسمة التركات الرضائية والقضائية.',
    features: ['قسمة التركات وفرز وتجنيب الأملاك', 'قضايا الأحوال الشخصية للمسلمين وغير المسلمين', 'توثيق الوصايا وإدارة الأوقاف العائلية'],
  },
  {
    id: 'corporate',
    icon: Building,
    title: 'قضايا الشركات والتحكيم التجاري',
    tag: 'حماية الاستثمارات',
    description: 'حماية متكاملة لمصالح الشركات المحلية والدولية، إدارة النزاعات التجارية، وتمثيل الموكلين في هيئات التحكيم المحلي والدولي.',
    features: ['إدارة المنازعات بين الشركاء', 'التمثيل في قضايا التحكيم التجاري (CRCICA)', 'إعادة الهيكلة والتصفية والاندماج'],
  },
  {
    id: 'administrative',
    icon: Scale,
    title: 'مجلس الدولة والقضاء الإداري',
    tag: 'خبرة إدارية رائدة',
    description: 'الطعن على القرارات الإدارية، منازعات العقود الإدارية والمزايدات والمناقصات الحكومية ودعاوى الإلغاء والتعويض.',
    features: ['الطعن على القرارات الإدارية أمام مجلس الدولة', 'منازعات الضرائب والجمارك والقرارات السيادية', 'دعاوى التراخيص ومصادرات الأملاك'],
  },
  {
    id: 'contracts',
    icon: FileSpreadsheet,
    title: 'صياغة العقود وتأسيس الشركات',
    tag: 'تحصين قانوني استباقي',
    description: 'صياغة وتدقيق العقود بمختلف أنواعها باللغتين العربية والإنجليزية لتقليل المخاطر وسد الثغرات القانونية قبل توقيعها.',
    features: ['تأسيس الشركات بجميع أشكالها القانونية', 'عقود الاستثمار والشراكات الاستراتيجية', 'اتفاقيات عدم الإفصاح والسرية (NDA)'],
  },
]

// The 5-step process workflow (Verdict Signature Process Tabs)
const processSteps = [
  {
    step: '01',
    title: 'الاستقبال والتدقيق',
    subtitle: 'Case Intake & Legal Audit',
    summary: 'جلسة استماع تفصيلية مع الموكل لفحص كافة المستندات والأوراق القانونية، وتحديد نقاط القوة والمخاطر المحتملة بموضوعية تامة.',
    deliverables: [
      'فحص مستندي شامل لكافة أوراق ومستندات القضية',
      'تحديد الإطار الزمني المتوقع والإجراءات الفورية',
    ],
    duration: '24 - 48 ساعة',
    guarantee: 'سرية بيانات مشددة بموجب ميثاق الشرف',
  },
  {
    step: '02',
    title: 'بناء استراتيجية الدفاع',
    subtitle: 'Defense Strategy',
    summary: 'وضع خطة دفاع محكمة مبنية على دراسة دقيقة لوقائع القضية والمبادئ القضائية المستقرة، لتحقيق أفضل نتيجة ممكنة.',
    deliverables: [
      'صياغة خطة عمل مرحلية للنزاع القضائي',
      'تجهيز الدفوع الشكلية والموضوعية المسبقة',
      'تحديد استراتيجية المفاوضة في حال أمكن التسوية الودية',
    ],
    duration: '3 - 5 أيام عمل',
    guarantee: 'مراجعة ثنائية من شريكي المكتب',
  },
  {
    step: '03',
    title: 'جمع الأدلة وصياغة المذكرات',
    subtitle: 'Discovery & Pleadings',
    summary: 'إعداد عرائض الدعاوى ومذكرات الدفاع بأسلوب صلب ومفصل ومدعوم بحجج واقعية لا تقبل الشك.',
    deliverables: [
      'صياغة مذكرة الدفاع الأولى مع حوافظ المستندات',
      'استخراج الشهادات الرسمية وإجراء المعاينات المطلوبة',
      'عرض المسودة على الموكل للمراجعة والاعتماد',
    ],
    duration: 'أسبوع عمل',
    guarantee: 'توثيق رسمي وحافظة مستندات مرتبة كودياً',
  },
  {
    step: '04',
    title: 'المرافعة وإدارة الجلسات',
    subtitle: 'Court Advocacy & Trial',
    summary: 'حضور محامي المكتب في ساحات المحاكم لتقديم المرافعة الشفوية بثبات ودهاء قانوني، وتتبع كل تفصيلة في محاضر الجلسات.',
    deliverables: [
      'حضور محامٍ من المكتب في كل جلسة',
      'تقرير فوري للموكل عقب انتهاء الجلسة بمجرياتها',
      'إيداع المذكرات التكميلية والمستندات الإضافية',
    ],
    duration: 'وفق جدول المحكمة',
    guarantee: 'تحديث الموكل عبر تقارير رسمية وواتساب',
  },
  {
    step: '05',
    title: 'صدور الحكم والتنفيذ الجبري',
    subtitle: 'Verdict & Enforcement',
    summary: 'لا تنتهي مهمتنا بصدور الحكم بل تمتد للحصول على الصيغة التنفيذية وتطبيق الحكم على أرض الواقع واسترداد كامل الحقوق.',
    deliverables: [
      'استلام النسخة الرسمية للحكم والصيغة التنفيذية',
      'تنفيذ الحجوزات أو الإجراءات الجبرية عبر إدارة التنفيذ',
      'إغلاق الملف القانوني وتسليم المخالصات المعتمدة',
    ],
    duration: 'فوري عقب صدور الحكم',
    guarantee: 'إشراف كامل حتى دخول الحقوق حيز الواقع',
  },
]

// Testimonials data for infinite marquee
const testimonials = [
  {
    quote: 'مكتب ميثاق غيّر مجرى قضيتنا التجارية المعقدة. تم بناء خطة الدفاع قبل الجلسة الأولى بدقة متناهية، وبدا الفارق الشاسع في خبرة المحامين أمام منصة القضاء.',
    author: 'م. طارق العوضي',
    role: 'رئيس مجلس إدارة مجموعة استثمارية',
    tag: 'قضايا شركات وتحكيم',
    rating: 5,
  },
  {
    quote: 'تعاملت مع عدة مكاتب كبرى في مصر، لكن الاهتمام الفردي والدقة التي وجدتها لدى ميثاق كانت استثنائية. كل ورقة فُحصت بعناية المحامي المسؤول شخصياً.',
    author: 'د. حسام الشربيني',
    role: 'مؤسس شركة للصناعات الدوائية',
    tag: 'نزاع عمالي وتجاري',
    rating: 5,
  },
  {
    quote: 'الصدق هو ما يميزهم أولاً. أوضحوا لي مواطن الضعف في موقفي قبل مواطن القوة، وبفضل خبرتهم في مجلس الدولة استعدنا تراخيص مشروعنا بالكامل.',
    author: 'أ. سامح عبد الفتاح',
    role: 'مطور عقاري',
    tag: 'مجلس الدولة والقضاء الإداري',
    rating: 5,
  },
  {
    quote: 'حسموا دعوى جنائية حساسة جداً وبراءة موكلنا في وقت قياسي. هيبة الحضور في قاعة المحكمة والمرافعة المحكمة كانت مصدر ثقة واطمئنان عظيم لنا.',
    author: 'المستشار وائل سراج',
    role: 'رجل أعمال ومستثمر',
    tag: 'قضايا الجنايات الاقتصادية',
    rating: 5,
  },
  {
    quote: 'صياغة العقود التجارية والاتفاقيات الدولية التي أعدوها لشركتنا وفرت علينا نزاعات بملايين الجنيهات. ميثاق هم درعنا القانوني المعتمد دائماً.',
    author: 'م. نادية منصور',
    role: 'المدير التنفيذي لشركة تكنولوجيا معلومات',
    tag: 'صياغة عقود واستشارات',
    rating: 5,
  },
]

// FAQ Data
const faqs = [
  {
    q: 'كيف يتم تحديد أتعاب المحاماة في ميثاق؟',
    a: 'نتبع سياسة شفافة تماماً ومحددة في عقد اتفاق أتعاب مسبق. تعتمد الأتعاب على طبيعة القضية ودرجة تعقيدها والجهد المطلوب، دون أي مصاريف خفية أو مفاجآت لاحقة.',
  },
  {
    q: 'ما هي الإجراءات المطلوبة لتوكيل محامٍ في قضيتي؟',
    a: 'الخطوة الأولى هي جلسة فحص الأوراق والاستشارة المبدئية، وبعد الاتفاق يتم تحرير توكيل قضايا رسمي بأي مكتب توثيق للشهر العقاري، ثم نبدأ الإجراءات القضائية فوراً.',
  },
  {
    q: 'ما الذي يميز مكتب ميثاق عن غيره من المكاتب؟',
    a: 'نحن ندمج بين هيبة وقوة الحضور القضائي في ساحات المحاكم بمتابعة مباشرة من محامي المكتب، وبين المعايير المؤسسية الحديثة في إدارة القضايا والتواصل المستمر مع الموكل.',
  },
]

const navLinks = [
  { href: '#about', label: 'عن ميثاق' },
  { href: '#services', label: 'الخدمات' },
  { href: '#process', label: 'مسار القضية' },
  { href: '#team', label: 'المحامون' },
  { href: '#videos', label: 'فيديوهات' },
  { href: '#faq', label: 'الأسئلة الشائعة' },
]

const socialLinks = {
  facebook: 'https://www.facebook.com/share/19veGAUL9U/',
  instagram: 'https://www.instagram.com/mithaq.law1',
  youtube: 'https://www.youtube.com/@Mohamedabuzied027',
  // Public awareness group — kept separate from the private Business chat below
  whatsappGroup: 'https://chat.whatsapp.com/BpuTwlVm1Ba3UylV5nZsXO',
}

// YouTube explainers from the Mithaq Legal channel
const videos = [
  { id: 'BNrulWoIPTg', title: 'قائمة المنقولات الزوجية' },
  { id: 'IAPjEYty5vY', title: 'الإيجار القديم' },
  { id: 'aAmhmfIMYUI', title: 'تشابه الأسماء' },
  { id: 'XJcoUg00KLA', title: 'محو الأحكام' },
]

// Clients reach the office by WhatsApp or phone only
const contact = {
  whatsapp: 'https://wa.me/message/TSVUEMJP5KHBI1',
  phone: '+201143157377',
  phoneDisplay: '+20 114 315 7377',
}

// How long each partner's portrait stays in the hero before cross-fading
const HERO_SLIDE_MS = 3000

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI']

const lawyers = [
  {
    photo: '/images/lawyer-1.png',
    alt: 'أ. محمد أبو زيد، شريك مؤسس في مكتب ميثاق',
    name: 'أ. محمد أبو زيد',
    role: 'شريك مؤسس',
    bio: 'شارك في تأسيس ميثاق ليقدّم للموكل محامياً يعرف قضيته بالتفصيل. خمس سنوات من العمل في القضايا العمالية والجنائية، يتابع فيها الملف بنفسه من أول جلسة استماع حتى صدور الحكم.',
  },
  {
    photo: '/images/lawyer-2.png',
    alt: 'أ. محمد شريف، شريك مؤسس في مكتب ميثاق',
    name: 'أ. محمد شريف',
    role: 'شريك مؤسس',
    bio: 'شارك في تأسيس ميثاق على مبدأ الوضوح مع الموكل في كل خطوة. يعمل في قضايا الأسرة والتركات وقضايا الشركات، ويتولى إعداد المذكرات ومتابعة الجلسات وإطلاع الموكل أولاً بأول.',
  },
]

const toArabicDigits = (n: number) => n.toLocaleString('ar-EG')

/* Brand glyphs (lucide no longer ships brand icons) */
function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3Z" />
    </svg>
  )
}
function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}
function YouTubeGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  )
}

/* Round icon links to the firm's social accounts (dark surfaces) */
function SocialIcons({ className = '', withWhatsApp = false }: { className?: string; withWhatsApp?: boolean }) {
  const accounts = [
    { href: socialLinks.facebook, label: 'فيسبوك', Icon: FacebookGlyph },
    { href: socialLinks.instagram, label: 'إنستغرام', Icon: InstagramGlyph },
    { href: socialLinks.youtube, label: 'يوتيوب', Icon: YouTubeGlyph },
    ...(withWhatsApp ? [{ href: contact.whatsapp, label: 'واتساب', Icon: WhatsAppGlyph }] : []),
  ]
  return (
    <ul className={`flex items-center gap-2 ${className}`} aria-label="حسابات ميثاق">
      {accounts.map(({ href, label, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${label} (تفتح في نافذة جديدة)`}
            className="grid size-10 place-items-center rounded-full bg-white/[0.06] text-white/80 transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            <Icon className="size-[18px]" />
          </a>
        </li>
      ))}
    </ul>
  )
}

/* Lightweight YouTube player: shows the thumbnail and only loads the iframe once played */
function VideoCard({ id, title, index }: { id: string; title: string; index: number }) {
  const [playing, setPlaying] = useState(false)
  return (
    <article data-reveal style={{ '--d': `${index * 100}ms` } as React.CSSProperties} className="group">
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`تشغيل فيديو: ${title}`}
            className="absolute inset-0 size-full cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/sddefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/10" />
            <span
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur transition-transform duration-300 group-hover:scale-110 sm:size-20"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="ms-1 size-6 sm:size-7">
                <path d="M7 4.5v15l13-7.5-13-7.5Z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold sm:text-xl">{title}</h3>
        <span className="text-xs text-stone tabular-nums" dir="ltr">0{index + 1}</span>
      </div>
    </article>
  )
}

function WhatsAppGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 16.4c-1.4 0-2.8-.4-4-1.1l-.3-.2-2.7.7.7-2.6-.2-.3A7.4 7.4 0 1 1 12 19.4Zm4.1-5.5c-.2-.1-1.3-.7-1.5-.7-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6 6 0 0 1-3-2.6c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.7 4.2 3.7 1.6.6 2.2.7 3 .6.5-.1 1.3-.6 1.5-1.1.2-.6.2-1 .1-1.1l-.6-.3Z" />
    </svg>
  )
}

/* Wordmark: the Arabic name with the firm's M|Q monogram set beside it. */
function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        dir="ltr"
        className={`flex items-center gap-1 font-light tracking-[0.12em] ${tone === 'light' ? 'text-copper-glow' : 'text-copper-ink'}`}
        aria-hidden="true"
      >
        M<span className="h-4 w-px bg-current opacity-70" />Q
      </span>
      <span className="text-xl font-bold">ميثاق</span>
    </span>
  )
}

/* Small pill label used to name a section. */
function SectionLabel({ children, tone = 'dark' }: { children: React.ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-medium ${
        tone === 'light' ? 'border-white/15 text-white/80' : 'border-sand text-ink-3'
      }`}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-copper" />
      {children}
      <span aria-hidden="true" className="size-1 rounded-full bg-copper" />
    </span>
  )
}

/* Counts up to a figure like "+1,850", "94%" or "+250K" when scrolled into view. */
function CountUp({ value, className = '' }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/)
  const prefix = match?.[1] ?? ''
  const target = match ? Number(match[2].replace(/,/g, '')) : 0
  const suffix = match?.[3] ?? ''
  const [current, setCurrent] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el || !match) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setCurrent(0)
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const duration = 1600
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4)
          setCurrent(Math.round(target * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target])

  return (
    <span ref={ref} dir="ltr" className={`tabular-nums ${className}`} aria-label={value}>
      <span aria-hidden="true">
        {prefix}
        {current.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  )
}

const pillLight =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-[#ececec] px-6 py-3 text-[0.95rem] font-medium text-ink transition-[background-color,transform] duration-300 hover:bg-white active:scale-[0.98]'
const pillDark =
  'group inline-flex items-center justify-center gap-2 rounded-full bg-ink-2 px-6 py-3 text-[0.95rem] font-medium text-white transition-[background-color,transform] duration-300 hover:bg-ink-3 active:scale-[0.98]'

export function MithaqSite() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [showTopBanner, setShowTopBanner] = useState(true)
  const [heroSlide, setHeroSlide] = useState(0)

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Header morphs into a floating pill once scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll reveal for [data-reveal] blocks and highlighted phrases
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal], .highlight')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // An attribute, not a class: React rewrites className on re-render and would hide it again
            entry.target.setAttribute('data-visible', '')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Hero portrait alternates between the partners; stays still for reduced motion
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setInterval(() => setHeroSlide((n) => (n + 1) % lawyers.length), HERO_SLIDE_MS)
    return () => window.clearInterval(id)
  }, [])

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!mobileMenuOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMobileMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileMenuOpen])

  const onTabKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const last = processSteps.length - 1
    let next: number | null = null
    // RTL: left arrow moves forward
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = idx === last ? 0 : idx + 1
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = idx === 0 ? last : idx - 1
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = last
    if (next === null) return
    e.preventDefault()
    setActiveStep(next)
    tabRefs.current[next]?.focus()
  }

  const step = processSteps[activeStep]
  const onHero = !scrolled && !mobileMenuOpen

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:right-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        تخطَّ إلى المحتوى
      </a>

      {/* Announcement */}
      {showTopBanner && (
        <div className="relative z-50 bg-white text-[0.8rem] text-ink sm:text-sm">
          <div className="mx-auto flex max-w-[88rem] items-center gap-3 px-5 py-2.5 lg:px-8">
            <p className="flex flex-1 items-center justify-center gap-3">
              <span>
                حجز الاستشارات مفتوح الآن<span className="hidden sm:inline"> في مقر ميثاق بالإسماعيلية</span>
              </span>
              <a href="#contact" className="rounded-full bg-ink px-3.5 py-1 text-xs font-semibold text-white transition-colors hover:bg-ink-3">
                احجز موعداً
              </a>
            </p>
            <button
              type="button"
              onClick={() => setShowTopBanner(false)}
              className="-me-2 grid size-8 shrink-0 place-items-center rounded-full text-stone transition-colors hover:bg-smoke hover:text-ink"
              aria-label="إغلاق التنبيه"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header — floats over the hero, morphs into a pill on scroll */}
      <header
        className={`sticky top-0 z-40 -mb-[4.75rem] transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          scrolled || mobileMenuOpen ? 'px-3 pt-3' : ''
        }`}
      >
        <div
          className={`mx-auto transition-[max-width,border-radius,background-color,color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
            onHero
              ? 'max-w-[88rem] rounded-none bg-transparent text-white'
              : 'max-w-[62rem] rounded-full bg-white/85 text-ink shadow-[0_10px_40px_-12px_rgba(10,10,10,0.25),0_0_0_1px_rgba(10,10,10,0.06)] backdrop-blur-xl'
          }`}
        >
        <div
          className={`mx-auto flex max-w-[88rem] items-center justify-between gap-6 transition-[height,padding] duration-500 motion-reduce:transition-none ${
            onHero ? 'h-[4.75rem] px-5 lg:px-8' : 'h-16 ps-6 pe-2.5'
          }`}
        >
          <a href="#home" aria-label="ميثاق للمحاماة — الصفحة الرئيسية">
            <Wordmark tone={onHero ? 'light' : 'dark'} />
          </a>

          <nav className="hidden items-center gap-8 text-[0.9rem] lg:flex" aria-label="التنقل الرئيسي">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`transition-colors ${onHero ? 'text-white/75 hover:text-white' : 'text-stone hover:text-ink'}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className={cn(onHero ? pillLight : pillDark, 'hidden px-5 py-2.5 text-sm sm:inline-flex')}>
              احجز استشارة مجانية
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className={`grid size-11 place-items-center rounded-full transition-colors lg:hidden ${onHero ? 'hover:bg-white/10' : 'hover:bg-smoke'}`}
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <span className="burger" data-open={mobileMenuOpen} aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        </div>

        {/* Mobile menu — floats under the pill; only transform/opacity animate so the page never reflows */}
        <div
          id="mobile-nav"
          data-open={mobileMenuOpen}
          inert={!mobileMenuOpen}
          className="mobile-menu absolute inset-x-3 top-full mx-auto mt-2 max-w-[62rem] origin-top rounded-[1.75rem] bg-white p-2 text-ink shadow-[0_24px_60px_-16px_rgba(10,10,10,0.35),0_0_0_1px_rgba(10,10,10,0.06)] lg:hidden"
        >
          <nav className="flex flex-col px-4 pb-3" aria-label="قائمة الهاتف">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{ '--i': i } as React.CSSProperties}
                className="mobile-menu-item flex items-center justify-between border-b border-sand py-4 text-lg text-ink"
              >
                {l.label}
                <ArrowUpLeft className="size-4 text-stone" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{ '--i': navLinks.length } as React.CSSProperties}
              className={cn(pillDark, 'mobile-menu-item mt-5 py-3.5')}
            >
              احجز استشارة مجانية
            </a>
          </nav>
        </div>
      </header>

      {/* Dims the page behind the open mobile menu */}
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className={`fixed inset-0 z-30 bg-ink/40 transition-opacity duration-300 lg:hidden ${
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <main id="main">
        {/* HERO */}
        <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="settle absolute inset-0">
              {lawyers.map((l, i) => (
                <Image
                  key={l.photo}
                  src={l.photo}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className={`object-cover object-[25%_22%] brightness-[0.8] saturate-[0.6] transition-opacity duration-1000 ease-in-out lg:object-[15%_18%] ${
                    heroSlide === i ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-l from-ink via-ink/80 to-ink/10" />
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent" />
          </div>

          <div className="mx-auto flex w-full max-w-[88rem] flex-1 flex-col justify-center px-5 pt-32 pb-12 lg:px-8">
            <div className="max-w-3xl">
              <p className="rise-in flex items-center gap-3 text-sm text-white/85" style={{ '--d': '100ms' } as React.CSSProperties}>
                <ArrowLeft className="size-4" aria-hidden="true" />
                حين تكون النتيجة هي الفيصل.
              </p>
              <h1
                id="hero-title"
                className="rise-in mt-6 text-[clamp(2.6rem,7vw,5.5rem)] leading-[1.12] font-semibold tracking-tight"
                style={{ '--d': '220ms' } as React.CSSProperties}
              >
                ثقة نادرة.. وأثر قانوني يدوم.
              </h1>
              <ul className="rise-in mt-8 space-y-2.5 text-base text-white/90 sm:text-lg" style={{ '--d': '360ms' } as React.CSSProperties}>
                {['متابعة شخصية من محامي المكتب في كل قضية', 'سجل مثبت أمام المحاكم في القضايا المعقدة', 'أتعاب واضحة في عقد مسبق، بلا مفاجآت'].map((b) => (
                  <li key={b} className="flex items-center gap-3">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-white" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="rise-in mt-10 flex flex-wrap gap-3" style={{ '--d': '480ms' } as React.CSSProperties}>
                <a href="#contact" className={pillLight}>
                  احجز استشارة
                </a>
                <a href="#services" className={cn(pillDark, 'bg-white/10 backdrop-blur hover:bg-white/20')}>
                  تعرّف على خدماتنا
                </a>
              </div>
            </div>
          </div>

          <div className="rise-in mx-auto flex w-full max-w-[88rem] items-center justify-between px-5 pb-8 text-sm text-white/80 lg:px-8" style={{ '--d': '700ms' } as React.CSSProperties}>
            <p className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-copper-glow" />
              من هنا تبدأ النتائج الجيدة.
            </p>
            <a href="#about" className="hidden flex-col items-center gap-1 transition-colors hover:text-white sm:flex">
              مرّر للاستكشاف
              <ChevronDown className="nudge size-4" aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* STATS STRIP */}
        <section aria-label="ميثاق بالأرقام" className="bg-ink text-white">
          <div className="mx-auto grid max-w-[88rem] grid-cols-1 items-center gap-10 border-t border-white/10 px-5 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:px-8">
            <div className="flex items-center gap-5">
              <p className="text-sm font-semibold">
                يثق بنا <span className="font-normal text-white/60">موكلونا</span>
              </p>
              <div className="flex -space-x-2.5 space-x-reverse" aria-hidden="true">
                {['ع', 'ط', 'س', 'م'].map((c, i) => (
                  <span
                    key={c}
                    className="grid size-9 place-items-center rounded-full border-2 border-ink text-xs font-semibold text-ink"
                    style={{ background: ['#e8c9a0', '#d9b48a', '#c8a07a', '#b48c6a'][i] }}
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div>
                <CountUp value="+100" className="block text-xl font-semibold" />
                <span className="text-xs text-white/60">موكل في مصر والعالم العربي</span>
              </div>
            </div>
            <dl className="grid grid-cols-3">
              {[
                { v: '+250', l: 'قضية محسومة' },
                { v: '5', l: 'سنوات من الخبرة' },
                { v: '+250K', l: 'جنيه حقوق مستردة' },
              ].map((s, i) => (
                <div key={s.l} className={`text-left ${i > 0 ? 'border-r border-white/15' : ''} px-3 sm:px-6`}>
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="text-[clamp(1.75rem,5vw,3.75rem)] leading-none font-medium tracking-tight">
                    <CountUp value={s.v} />
                  </dd>
                  <dd className="mt-3 text-xs text-white/60 sm:text-sm">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" aria-labelledby="about-title" className="py-24 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel>عن ميثاق</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="about-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  محامون أصحاب خبرة ومصداقية، للحظات الأكثر حسماً في حياتك وعملك.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.95] text-stone sm:text-lg">
                  نجمع بين عمق التقاليد القضائية العريقة وأحدث أساليب التحليل القانوني. نضع مصلحة الموكل فوق كل اعتبار، ونبني كل ملف قضائي كأنه قضيتنا الوحيدة — لرجال الأعمال والشركات والعائلات في أصعب قراراتهم.
                </p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium underline decoration-sand underline-offset-[6px] transition-colors hover:decoration-ink">
                  ناقش قضيتك معنا
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" aria-labelledby="services-title" className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel>خدماتنا</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="services-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  <span className="highlight">خدمات قانونية موثوقة</span> في ستة مجالات أساسية.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.95] text-stone sm:text-lg">
                  كل مجال يتابعه محامٍ من فريقنا — من أول استشارة حتى صدور الحكم النهائي وتنفيذه.
                </p>
              </div>
            </div>

            {/* Desktop: expanding panels */}
            <div data-reveal className="mt-16 hidden h-[34rem] gap-px overflow-hidden rounded-2xl bg-ink-3 lg:flex">
              {practiceAreas.map((area, i) => {
                const Icon = area.icon
                const active = activeService === i
                return (
                  <div
                    key={area.id}
                    className={`relative min-w-0 overflow-hidden bg-ink text-white transition-[flex-grow] duration-700 ease-out-soft ${active ? 'grow-[5]' : 'grow'} basis-0`}
                    onMouseEnter={() => setActiveService(i)}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveService(i)}
                      onFocus={() => setActiveService(i)}
                      aria-expanded={active}
                      aria-controls={`service-${area.id}`}
                      className={`absolute inset-0 flex flex-col items-center gap-8 pt-10 text-center transition-opacity duration-300 ${active ? 'pointer-events-none opacity-0' : 'opacity-100 hover:bg-white/[0.03]'}`}
                    >
                      <span className="text-2xl font-light text-white/80" dir="ltr">{romanNumerals[i]}</span>
                      <span className="vertical-label text-sm tracking-wide text-white/75">{area.title}</span>
                    </button>

                    <div
                      id={`service-${area.id}`}
                      className={`flex h-full w-[min(44rem,60vw)] flex-col justify-between p-10 transition-opacity duration-500 ${active ? 'opacity-100 delay-200' : 'pointer-events-none opacity-0'}`}
                      inert={!active}
                    >
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-white/50">المجال {toArabicDigits(i + 1)}</span>
                        <span className="grid size-11 place-items-center rounded-full bg-white/10">
                          <Icon className="size-5 text-copper-glow" aria-hidden="true" />
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-copper-glow">{area.tag}</p>
                        <h3 className="mt-3 text-4xl leading-tight font-medium">{area.title}</h3>
                        <p className="mt-5 max-w-lg text-base leading-[1.9] text-white/70">{area.description}</p>
                        <ul className="mt-6 grid gap-2.5 text-sm text-white/85">
                          {area.features.map((f) => (
                            <li key={f} className="flex items-center gap-2.5">
                              <Check className="size-4 shrink-0 text-copper-glow" aria-hidden="true" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <a href="#contact" className={cn(pillLight, 'mt-8 px-5 py-2.5 text-sm')}>
                          اطلب استشارة في هذا المجال
                          <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="mt-4 hidden text-xs text-stone lg:block" aria-hidden="true">
              مرّر المؤشر للمعاينة، أو اضغط للاختيار.
            </p>

            {/* Mobile & tablet: stacked accordion */}
            <div className="mt-12 overflow-hidden rounded-2xl bg-ink text-white lg:hidden">
              {practiceAreas.map((area, i) => {
                const active = activeService === i
                return (
                  <div key={area.id} className="border-b border-white/10 last:border-b-0">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setActiveService(active ? -1 : i)}
                        aria-expanded={active}
                        aria-controls={`service-m-${area.id}`}
                        className="flex w-full items-center gap-4 px-5 py-5 text-right"
                      >
                        <span className="w-8 shrink-0 text-sm font-light text-white/50" dir="ltr">{romanNumerals[i]}</span>
                        <span className="flex-1 text-base font-medium">{area.title}</span>
                        <ChevronDown className={`size-5 shrink-0 text-white/60 transition-transform duration-300 ${active ? 'rotate-180' : ''}`} aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={`service-m-${area.id}`} className="collapse-grid" data-open={active}>
                      <div inert={!active}>
                        <div className="px-5 pb-6 ps-17">
                          <p className="text-sm text-copper-glow">{area.tag}</p>
                          <p className="mt-2 text-[0.95rem] leading-[1.9] text-white/70">{area.description}</p>
                          <ul className="mt-4 space-y-2 text-sm text-white/85">
                            {area.features.map((f) => (
                              <li key={f} className="flex items-center gap-2.5">
                                <Check className="size-4 shrink-0 text-copper-glow" aria-hidden="true" />
                                {f}
                              </li>
                            ))}
                          </ul>
                          <a href="#contact" className={cn(pillLight, 'mt-5 px-5 py-2.5 text-sm')}>
                            اطلب استشارة
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" aria-labelledby="process-title" className="bg-smoke py-24 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel>مسار القضية</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="process-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  خمس خطوات واضحة، من أول مكالمة حتى الحكم النهائي.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.95] text-stone sm:text-lg">
                  نفس الفريق معك من البداية للنهاية، وتعرف دائماً أين تقف قضيتك وما الذي سيحدث بعدها.
                </p>
              </div>
            </div>

            <div data-reveal className="mt-16 overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
              <div
                role="tablist"
                aria-label="مراحل القضية"
                className="relative grid min-w-0 grid-flow-col auto-cols-[minmax(11rem,1fr)] overflow-x-auto border-b border-sand"
              >
                {processSteps.map((s, idx) => {
                  const selected = activeStep === idx
                  return (
                    <button
                      key={s.step}
                      ref={(el) => {
                        tabRefs.current[idx] = el
                      }}
                      type="button"
                      role="tab"
                      id={`step-tab-${idx}`}
                      aria-selected={selected}
                      aria-controls="step-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveStep(idx)}
                      onKeyDown={(e) => onTabKeyDown(e, idx)}
                      className={`relative px-5 py-5 text-right transition-colors duration-300 ${selected ? 'text-ink' : 'text-ash hover:text-ink-3'}`}
                    >
                      <span className="block text-sm" dir="ltr" style={{ textAlign: 'right' }}>
                        {s.step}
                      </span>
                      <span className="mt-1 block text-[0.95rem] font-medium">{s.title}</span>
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0 h-0.5 origin-right bg-copper transition-transform duration-500 ease-out-soft ${selected ? 'scale-x-100' : 'scale-x-0'}`}
                      />
                    </button>
                  )
                })}
              </div>

              <div
                id="step-panel"
                role="tabpanel"
                aria-labelledby={`step-tab-${activeStep}`}
                tabIndex={0}
                className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
              >
                <div key={activeStep} className="fade-swap p-7 sm:p-12">
                  <p className="text-sm text-copper-ink" dir="ltr" lang="en" style={{ textAlign: 'right' }}>
                    {step.subtitle}
                  </p>
                  <h3 className="mt-3 text-3xl leading-tight font-medium sm:text-4xl">{step.title}</h3>
                  <p className="mt-5 max-w-xl text-base leading-[1.95] text-stone sm:text-lg">{step.summary}</p>
                  <ul className="mt-8 space-y-3">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-[0.95rem] leading-7">
                        <Check className="mt-1.5 size-4 shrink-0 text-copper-ink" aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <dl className="mt-10 grid gap-6 border-t border-sand pt-6 text-sm sm:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Clock className="mt-0.5 size-4 shrink-0 text-stone" aria-hidden="true" />
                      <div>
                        <dt className="text-stone">المدة التقريبية</dt>
                        <dd className="mt-1 font-medium">{step.duration}</dd>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-stone" aria-hidden="true" />
                      <div>
                        <dt className="text-stone">التزامنا</dt>
                        <dd className="mt-1 font-medium">{step.guarantee}</dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="relative hidden min-h-[24rem] bg-ink lg:block">
                  <Image
                    key={activeStep}
                    src={activeStep % 2 === 0 ? '/images/case-doc.png' : '/images/folder.png'}
                    alt=""
                    fill
                    sizes="35vw"
                    className="fade-swap object-cover object-top"
                  />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-xl bg-ink/80 px-4 py-3 text-sm text-white backdrop-blur">
                    <span>ملف معتمد — ميثاق</span>
                    <span className="text-white/70">
                      الخطوة {toArabicDigits(activeStep + 1)} من {toArabicDigits(processSteps.length)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section id="team" aria-labelledby="team-title" className="py-24 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel>فريق المحامين</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="team-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  الأسماء التي تقف خلف كل نجاح قضائي.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.95] text-stone sm:text-lg">
                  كل قضية يتابعها محامٍ من فريقنا — من أول مكالمة حتى صدور الحكم.
                </p>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mr-[calc((100%-2rem)*1/3.3+2rem)]">
              {lawyers.map((l, i) => (
                <article
                  key={l.name}
                  data-reveal
                  style={{ '--d': `${i * 120}ms` } as React.CSSProperties}
                  className="group relative isolate aspect-[4/5] overflow-hidden rounded-2xl bg-ink text-white"
                >
                  <Image
                    src={l.photo}
                    alt={l.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="-z-10 object-cover object-[30%_20%] transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]"
                  />
                  <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-2xl font-semibold">{l.name}</h3>
                    <p className="mt-1 text-xs tracking-wide text-white/70">{l.role}</p>
                    <div className="collapse-grid group-hover:[grid-template-rows:1fr] group-focus-within:[grid-template-rows:1fr]">
                      <div>
                        <p className="pt-3 text-sm leading-7 text-white/80">{l.bio}</p>
                        <a href="#contact" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-copper-glow hover:text-white">
                          اطلب استشارة خاصة
                          <ArrowUpLeft className="size-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" aria-labelledby="testimonials-title" className="overflow-hidden bg-ink py-24 text-white sm:py-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel tone="light">آراء الموكلين</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="testimonials-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  ماذا يقول موكلونا.
                </h2>
                <p className="mt-7 max-w-2xl text-base leading-[1.95] text-white/60 sm:text-lg">
                  معظم عملنا يبقى طي الكتمان. بإذن أصحابها، هذه بعض كلمات من وثقوا بنا.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-5">
            {[false, true].map((reverse) => (
              <div key={String(reverse)} className="ticker-wrap ticker-mask overflow-x-auto [scrollbar-width:none] motion-safe:overflow-hidden" dir="ltr">
                <ul className="ticker gap-5 px-2.5" data-reverse={reverse} style={{ '--ticker-duration': reverse ? '75s' : '65s' } as React.CSSProperties}>
                  {[...(reverse ? [...testimonials].reverse() : testimonials), ...(reverse ? [...testimonials].reverse() : testimonials)].map((t, i) => (
                    <li
                      key={i}
                      dir="rtl"
                      aria-hidden={i >= testimonials.length || reverse}
                      className="flex w-[22rem] shrink-0 flex-col justify-between rounded-2xl bg-ink-2 p-6 ring-1 ring-white/[0.06] transition-colors duration-300 hover:bg-ink-3 sm:w-[26rem]"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="flex text-copper-glow" aria-hidden="true">
                            {[...Array(t.rating)].map((_, s) => (
                              <Star key={s} className="size-3.5 fill-current" />
                            ))}
                          </span>
                          <span className="text-xs text-white/50">{t.tag}</span>
                        </div>
                        <blockquote className="mt-5 text-[0.95rem] leading-[1.9] text-white/85">“{t.quote}”</blockquote>
                      </div>
                      <p className="mt-6 border-t border-white/10 pt-4 text-sm">
                        <span className="font-semibold">{t.author}</span>
                        <span className="mt-0.5 block text-xs text-white/50">{t.role}</span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" aria-labelledby="videos-title" className="bg-smoke py-24 sm:py-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.3fr)]">
              <div data-reveal>
                <SectionLabel>فيديوهات توعوية</SectionLabel>
              </div>
              <div data-reveal style={{ '--d': '100ms' } as React.CSSProperties}>
                <h2 id="videos-title" className="text-[clamp(2rem,4.6vw,4rem)] leading-[1.2] font-medium tracking-tight">
                  القانون ببساطة، في دقائق.
                </h2>
                <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <p className="max-w-2xl text-base leading-[1.95] text-stone sm:text-lg">
                    شروحات قصيرة لأكثر المسائل القانونية التي تشغل الناس، من قناة ميثاق على يوتيوب.
                  </p>
                  <div className="flex shrink-0 flex-wrap gap-3">
                    <a href={socialLinks.youtube} target="_blank" rel="noreferrer" className={pillDark}>
                      <YouTubeGlyph className="size-5" />
                      زُر القناة
                    </a>
                    <a
                      href={socialLinks.whatsappGroup}
                      target="_blank"
                      rel="noreferrer"
                      className={cn(pillLight, 'bg-white ring-1 ring-sand hover:bg-paper')}
                    >
                      <WhatsAppGlyph className="size-5" />
                      انضم لجروب التوعية
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
              {videos.map((v, i) => (
                <VideoCard key={v.id} id={v.id} title={v.title} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title" className="py-24 sm:py-32">
          <div className="mx-auto grid max-w-[88rem] grid-cols-1 gap-12 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20 lg:px-8">
            <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
              <SectionLabel>الأسئلة الشائعة</SectionLabel>
              <h2 id="faq-title" className="mt-6 text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.2] font-medium tracking-tight">
                إجابات واضحة لأسئلتك القانونية.
              </h2>
              <p className="mt-6 max-w-md text-base leading-[1.95] text-stone">
                نعرف أن الأسئلة القانونية قد تكون مربكة، خاصة حين لا تعرف من أين تبدأ. هذه أكثر ما يسألنا عنه الموكلون.
              </p>
              <div className="mt-10 border-t border-sand pt-6 text-sm">
                <p className="text-stone">لم تجد سؤالك؟</p>
                <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1.5 font-medium transition-colors hover:text-copper-ink">
                  تحدث مع محامٍ مباشرة
                  <ArrowUpLeft className="size-4 text-copper" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, fIdx) => {
                const isOpen = openFaq === fIdx
                return (
                  <div
                    key={faq.q}
                    data-reveal
                    style={{ '--d': `${fIdx * 70}ms` } as React.CSSProperties}
                    className={`rounded-2xl transition-colors duration-300 ${isOpen ? 'bg-smoke' : 'bg-smoke/60 hover:bg-smoke'}`}
                  >
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${fIdx}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${fIdx}`}
                        onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-right text-base font-medium sm:text-[1.05rem]"
                      >
                        {faq.q}
                        <ChevronDown
                          aria-hidden="true"
                          className={`size-5 shrink-0 text-stone transition-transform duration-300 ease-out-soft ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </h3>
                    <div id={`faq-a-${fIdx}`} role="region" aria-labelledby={`faq-q-${fIdx}`} className="collapse-grid" data-open={isOpen}>
                      <div inert={!isOpen}>
                        <p className="px-6 pb-6 text-[0.95rem] leading-[1.95] text-stone">{faq.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CONTACT — WhatsApp and phone only */}
        <section id="contact" aria-labelledby="contact-title" className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-[88rem] px-5 lg:px-8">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <div data-reveal className="flex flex-col rounded-2xl border border-sand p-6 sm:p-10">
                <SectionLabel>تواصل معنا</SectionLabel>
                <h2 id="contact-title" className="mt-5 text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
                  خطوتك الأولى نحو حماية حقوقك.
                </h2>
                <p className="mt-3 max-w-xl text-[0.95rem] leading-[1.9] text-stone">
                  الاستشارة الأولى مجانية. راسلنا على واتساب أو اتصل بنا مباشرة، وسيتواصل معك المستشار المختص بموضوعك.
                </p>

                <div className="mt-10 grid flex-1 gap-4 sm:grid-cols-2">
                  <a
                    href={contact.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex min-h-[15rem] flex-col justify-between rounded-2xl bg-ink p-6 text-white transition-colors duration-300 hover:bg-ink-2 sm:p-7"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-white/[0.08] text-copper-glow transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                      <WhatsAppGlyph className="size-7" />
                    </span>
                    <span>
                      <span className="block text-2xl font-semibold">راسلنا على واتساب</span>
                      <span className="mt-2 block text-sm leading-7 text-white/60">اكتب لنا تفاصيل موضوعك وسنرد عليك في أقرب وقت.</span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-copper-glow">
                        ابدأ المحادثة
                        <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </span>
                    </span>
                    <span className="sr-only"> (تفتح في نافذة جديدة)</span>
                  </a>

                  <a
                    href={`tel:${contact.phone}`}
                    className="group flex min-h-[15rem] flex-col justify-between rounded-2xl bg-smoke p-6 transition-colors duration-300 hover:bg-sand sm:p-7"
                  >
                    <span className="grid size-14 place-items-center rounded-full bg-white text-copper-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-white">
                      <Phone className="size-6" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-2xl font-semibold">اتصل بنا</span>
                      <span className="mt-2 block text-lg font-medium tabular-nums" dir="ltr">{contact.phoneDisplay}</span>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-copper-ink">
                        اتصال مباشر
                        <ArrowUpLeft className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              <div data-reveal style={{ '--d': '120ms' } as React.CSSProperties} className="relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-8">
                <Image src="/images/folder.png" alt="" fill sizes="(min-width: 1024px) 35vw, 90vw" className="-z-10 object-cover object-[10%_30%] opacity-30" />
                <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 to-ink" />
                <div>
                  <span className="grid size-12 place-items-center rounded-full bg-white/[0.08] text-copper-glow">
                    <ShieldCheck className="size-6" aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-2xl leading-snug font-medium">سرية مهنية مطلقة.</p>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/65">
                    كل ما تشاركه معنا — في رسالة أو مكالمة — يبقى بينك وبين محاميك، ولا يُستخدم إلا لخدمة قضيتك.
                  </p>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5 text-sm">
                  <span className="text-white/60">تابعنا</span>
                  <SocialIcons />
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-5 text-sm">
                  <span className="text-white/60">المقر الرئيسي</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="size-4 text-copper-glow" aria-hidden="true" /> الإسماعيلية، مصر
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-[88rem] px-5 pt-20 pb-10 lg:px-8">
          <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))]">
            <div>
              <Wordmark tone="light" />
              <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
                ثقة نادرة.. وأثر يدوم. مكتب مصري للمحاماة والاستشارات القانونية والتحكيم التجاري.
              </p>
            </div>
            <nav aria-label="روابط المكتب">
              <h2 className="text-xs tracking-wide text-white/40">المكتب</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-white/80 transition-colors hover:text-white">{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h2 className="text-xs tracking-wide text-white/40">المقر</h2>
              <p className="mt-5 text-sm font-medium">الإسماعيلية</p>
              <p className="mt-1 text-sm leading-7 text-white/60">جمهورية مصر العربية</p>
            </div>
            <div>
              <h2 className="text-xs tracking-wide text-white/40">تواصل</h2>
              <ul className="mt-5 space-y-3 text-sm text-white/80">
                <li>
                  <a href={`tel:${contact.phone}`} className="transition-colors hover:text-white" dir="ltr">{contact.phoneDisplay}</a>
                </li>
                <li>
                  <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">واتساب</a>
                </li>
                <li>
                  <a href={socialLinks.whatsappGroup} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">جروب ميثاق على واتساب</a>
                </li>
              </ul>
              <SocialIcons className="mt-6" withWhatsApp />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-8 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ميثاق للمحاماة والاستشارات القانونية.</p>
            <p className="flex items-center gap-2">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-copper" />
              مقيدون بنقابة المحامين المصرية
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
