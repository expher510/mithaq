'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  Gavel,
  Menu,
  MessageCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react'

const logoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO%20%281%29-ENAOkT4UOma8CnYaeJPPKgXiSJvFN9.png'
const iconUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ICON-6mU4nGQdMg9sJRvmyOSYYl5zdC0ixl.png'

const services = [
  { icon: Scale, title: 'الاستشارات القانونية', text: 'رؤية قانونية واضحة تساعدك على اتخاذ القرار الصحيح بثقة.' },
  { icon: BriefcaseBusiness, title: 'القضايا العمالية', text: 'حماية حقوق العامل وصاحب العمل في كل مراحل النزاع.' },
  { icon: ShieldCheck, title: 'القضايا الجنائية والجنح', text: 'دفاع قانوني قوي وحضور حازم في القضايا الجنائية.' },
  { icon: Building2, title: 'قضايا الأسرة', text: 'حلول تحفظ الحقوق وتراعي خصوصية كل أسرة.' },
  { icon: Gavel, title: 'مجلس الدولة', text: 'تمثيل احترافي في المنازعات والطعون الإدارية.' },
  { icon: Sparkles, title: 'صياغة العقود', text: 'عقود دقيقة تحمي مصالحك وتقلل المخاطر المستقبلية.' },
]

export function MithaqSite() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main dir="rtl" className="luxury-shell min-h-screen overflow-hidden bg-[#0a1424] text-[#f5efe5]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b1a2e]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#home" className="flex items-center gap-3" aria-label="ميثاق - الصفحة الرئيسية">
            <img src={logoUrl} alt="شعار ميثاق للمحاماة والاستشارات القانونية" className="h-11 w-auto object-contain" />
          </a>
          <nav className="hidden items-center gap-8 text-sm text-[#d8d1c5] md:flex" aria-label="التنقل الرئيسي">
            <a className="transition hover:text-[#d3aa5c]" href="#about">عن ميثاق</a>
            <a className="transition hover:text-[#d3aa5c]" href="#services">خدماتنا</a>
            <a className="transition hover:text-[#d3aa5c]" href="#team">فريق المحامين</a>
            <a className="transition hover:text-[#d3aa5c]" href="#contact">تواصل معنا</a>
          </nav>
          <div className="hidden items-center gap-3 lg:flex" aria-label="روابط التواصل الاجتماعي"><a href="https://www.facebook.com/share/1EkiSGTRq7/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="صفحة ميثاق على فيسبوك" className="rounded-full border border-[#d3aa5c]/40 p-2 text-[#d3aa5c] transition hover:bg-[#d3aa5c] hover:text-[#0b1a2e]"><span className="text-base font-black">f</span></a><a href="https://www.instagram.com/mithaq.law1" target="_blank" rel="noreferrer" aria-label="صفحة ميثاق على إنستغرام" className="rounded-full border border-[#d3aa5c]/40 p-2 text-[#d3aa5c] transition hover:bg-[#d3aa5c] hover:text-[#0b1a2e]"><span className="text-xs font-black">ig</span></a></div><a href="#contact" className="hidden rounded-full border border-[#cda454] px-5 py-2 text-sm font-semibold text-[#e0b766] transition hover:bg-[#cda454] hover:text-[#0b1a2e] sm:inline-flex">احجز استشارتك</a>
          <button className="inline-flex rounded-lg p-2 text-[#d3aa5c] md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-4 border-t border-white/10 bg-[#0b1a2e] px-5 py-5 text-right md:hidden" aria-label="قائمة الهاتف">
          {['about', 'services', 'team', 'contact'].map((id, i) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="text-[#e9e1d6]">{['عن ميثاق', 'خدماتنا', 'فريق المحامين', 'تواصل معنا'][i]}</a>)}
        </nav>}
      </header>

      <section id="home" className="relative flex min-h-[720px] items-center pt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(211,170,92,0.2),transparent_24%),radial-gradient(circle_at_85%_8%,rgba(45,77,111,0.38),transparent_28%),linear-gradient(115deg,transparent_0%,rgba(211,170,92,0.06)_48%,transparent_49%,transparent_100%)]" /><div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-l from-transparent via-[#d3aa5c]/30 to-transparent" />
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-sm font-semibold tracking-[0.25em] text-[#d3aa5c]"><span className="h-px w-10 bg-[#d3aa5c]" /> MITHAQ LAW FIRM</p>
            <p className="mb-4 text-sm font-semibold text-[#d3aa5c]">ثقة نادرة.. وأثر يدوم</p>
            <h1 className="font-bold text-5xl leading-[1.18] text-[#f7f1e7] sm:text-6xl lg:text-7xl">ثقة نادرة..<br /><span className="text-[#d3aa5c]">وأثر يدوم</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-9 text-[#b8c1cb]">في ميثاق، نمنح كل قضية عناية استثنائية، وكل عميل حضوراً قانونياً يليق بثقته وخصوصية موقفه.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[#d3aa5c] px-7 py-3.5 font-bold text-[#0b1a2e] transition hover:bg-[#e2bf7b]">تحدث مع محامينا <ArrowLeft /></a>
              <a href="#services" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold text-[#e7e0d5] transition hover:border-[#d3aa5c] hover:text-[#d3aa5c]">اكتشف خدماتنا <ArrowUpLeft /></a>
            </div>
          </div>
          <div className="relative flex min-h-[380px] items-center justify-center lg:min-h-[520px]">
            <div className="absolute size-[320px] rounded-full border border-[#d3aa5c]/35 shadow-[0_0_80px_rgba(211,170,92,0.12)] sm:size-[450px]" /><div className="absolute size-[275px] rounded-full border border-dashed border-[#d3aa5c]/25 sm:size-[395px]" />
            <div className="absolute size-[255px] rounded-full bg-[#d3aa5c]/10 blur-3xl sm:size-[370px]" />
            <img src={iconUrl} alt="رمز محامٍ أمام منصة القضاء" className="relative z-10 max-h-[510px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)]" />
          </div>
        </div>
      </section>

      <section id="about" className="border-y border-white/10 bg-[#101f34] py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div><p className="text-sm font-bold tracking-[0.25em] text-[#d3aa5c]">لماذا ميثاق؟</p><h2 className="mt-4 font-bold text-4xl leading-tight text-white">ثقة تُبنى على<br /><span className="text-[#d3aa5c]">المعرفة والالتزام</span></h2></div>
          <div className="grid gap-6 sm:grid-cols-2"><div className="border-r-2 border-[#d3aa5c] pr-6"><p className="text-4xl font-bold text-[#d3aa5c]">+15</p><p className="mt-2 text-[#b8c1cb]">عاماً من الخبرة القانونية</p></div><div className="border-r-2 border-[#d3aa5c] pr-6"><p className="text-4xl font-bold text-[#d3aa5c]">+500</p><p className="mt-2 text-[#b8c1cb]">قضية وملف قانوني</p></div><p className="text-base leading-8 text-[#b8c1cb] sm:col-span-2">نحن مكتب ميثاق للمحاماة والاستشارات القانونية، نعمل بمنهج يجمع بين قوة الحضور في ساحات القضاء ووضوح المشورة قبل اتخاذ القرار.</p></div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="mb-12 flex flex-wrap items-end justify-between gap-5"><div><p className="text-sm font-bold tracking-[0.25em] text-[#d3aa5c]">مجالات العمل</p><h2 className="mt-3 font-bold text-4xl text-white">حلول قانونية <span className="text-[#d3aa5c]">متكاملة</span></h2></div><p className="max-w-sm text-sm leading-7 text-[#9eabb8]">نضع خبرتنا في خدمتك، من الاستشارة الأولى وحتى الوصول لأفضل نتيجة ممكنة.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map(({ icon: Icon, title, text }) => <article key={title} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-7 transition hover:-translate-y-1 hover:border-[#d3aa5c]/50 hover:bg-[#d3aa5c]/[0.08]"><div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-[#d3aa5c]/10 text-[#d3aa5c]"><Icon /></div><h3 className="text-xl font-bold text-white">{title}</h3><p className="mt-3 leading-7 text-[#9eabb8]">{text}</p><a href="#contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#d3aa5c]">اعرف المزيد <ArrowLeft /></a></article>)}</div></section>

      <section id="team" className="bg-[#d3aa5c] px-5 py-20 text-[#0b1a2e]"><div className="mx-auto max-w-7xl text-center"><p className="text-sm font-bold tracking-[0.25em] text-[#31445a]">فريق من المحامين</p><h2 className="mt-4 font-bold text-4xl">خبرة تتحدث عن نفسها</h2><p className="mx-auto mt-5 max-w-2xl leading-8 text-[#31445a]">سيتعرف عملاؤنا على فريق ميثاق، تخصصاتهم، وأبرز القضايا التي تميزوا بها.</p><div className="mt-10 flex flex-wrap justify-center gap-4"><span className="rounded-full border border-[#0b1a2e]/20 px-5 py-2">محامون متخصصون</span><span className="rounded-full border border-[#0b1a2e]/20 px-5 py-2">تمثيل أمام المحاكم</span><span className="rounded-full border border-[#0b1a2e]/20 px-5 py-2">سرية تامة</span></div></div></section>

      <section id="contact" className="mx-auto max-w-7xl px-5 py-24 lg:px-8"><div className="grid gap-10 rounded-3xl border border-white/10 bg-[#101f34] p-8 md:grid-cols-[1fr_auto] md:p-12"><div><p className="text-sm font-bold tracking-[0.25em] text-[#d3aa5c]">خطوتك الأولى</p><h2 className="mt-4 font-bold text-4xl leading-tight text-white">لديك استفسار قانوني؟<br /><span className="text-[#d3aa5c]">نحن هنا للاستماع.</span></h2><p className="mt-5 max-w-xl leading-8 text-[#aeb8c3]">اترك لنا رسالتك وسيتواصل معك أحد أعضاء فريقنا في أقرب وقت.</p></div><div className="flex flex-col items-start justify-center gap-4"><a href="https://wa.me/201000000000" className="inline-flex items-center gap-3 rounded-full bg-[#d3aa5c] px-7 py-4 font-bold text-[#0b1a2e] transition hover:bg-[#e2bf7b]"><MessageCircle /> تواصل عبر واتساب</a><a href="mailto:info@mithaq-law.com" className="text-sm text-[#d3aa5c] underline underline-offset-4">info@mithaq-law.com</a></div></div></section>

      <footer className="border-t border-white/10 px-5 py-8"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center text-sm text-[#8f9aa6] sm:flex-row sm:text-right"><p>© 2026 ميثاق للمحاماة والاستشارات القانونية. جميع الحقوق محفوظة.</p><div className="flex items-center gap-3"><a href="https://www.facebook.com/share/1EkiSGTRq7/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="فيسبوك" className="flex items-center gap-2 rounded-full border border-[#d3aa5c]/40 px-3 py-2 text-xs font-bold text-[#d3aa5c] transition hover:bg-[#d3aa5c] hover:text-[#0b1a2e]"><span className="text-base font-black">f</span> فيسبوك</a><a href="https://www.instagram.com/mithaq.law1" target="_blank" rel="noreferrer" aria-label="إنستغرام" className="flex items-center gap-2 rounded-full border border-[#d3aa5c]/40 px-3 py-2 text-xs font-bold text-[#d3aa5c] transition hover:bg-[#d3aa5c] hover:text-[#0b1a2e]"><span className="text-xs font-black">ig</span> إنستغرام</a><a href="#home" className="text-[#d3aa5c]">العودة للأعلى <ChevronDown className="inline rotate-180" /></a></div></div></footer>
    </main>
  )
}
