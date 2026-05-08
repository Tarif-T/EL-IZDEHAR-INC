import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { LANGUAGES } from '@/lib/constants';

export type Language = 'en' | 'ar';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  availableLanguages: typeof LANGUAGES;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.team': 'Team',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Excellence in Every Endeavor',
    'hero.subtitle': 'Building Tomorrow, Today',
    'hero.description': 'Leading manufacturer & global exporter since 1990. Specializing in premium footwear, sustainable agriculture, and international trade.',
    'hero.cta': 'Explore Our Services',
    'hero.achievements.years': 'Years of Excellence',
    'hero.achievements.clients': 'Satisfied Clients',
    'hero.achievements.projects': 'Successful Projects',
    
    // About Section
    'about.title': 'Our Story',
    'about.subtitle': 'We bring people together',
    'about.founder.bio1': 'Mr. Tag Elsir Abd Elrahman Abdullah is a significant philanthropic figure in the Sudanese economy, having contributed to its growth from 1975 to 2000. He established and managed institutions such as the Saudi Sudanese Bank, Al-Nile Bank, and Al Baraka Bank, as well as the EL IZDEHAR Economic Foundation which aims for self-sustaining economic systems.',
    'about.founder.bio2': 'With almost thirty years of banking experience, he founded the El-izdihar Plastic Shoe Factory in 1992 with his son Eng. Amin Tagelsir, which has grown and developed by his son Mr. Tahir Tag Elsir and his brothers into the EL IZDEHAR Group of Companies.',
    'about.founder.quote': 'We believe that by empowering ourselves, we can empower the world around us.',
    'about.founder.attribution': 'Mr. Tag Elsir Abd Elrahman – Founder',
    'about.values.time.title': 'Save Time and Energy',
    'about.values.time.description': 'Efficient processes and streamlined operations',
    'about.values.support.title': 'Great Support & Services',
    'about.values.support.description': 'Dedicated customer support and service excellence',
    'about.values.risk.title': 'Risk Reduction',
    'about.values.risk.description': 'Proven strategies to minimize business risks',
    'about.values.peace.title': 'Peace of Mind',
    'about.values.peace.description': 'Trusted partnerships and reliable solutions',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Three decades of excellence across multiple industries',
    'services.shoes.title': 'EL IZDEHAR Shoes Factory',
    'services.shoes.description': 'Discover a wide range of high-quality shoes crafted with precision and care at our factory. Our commitment to excellence shines through in every pair we make, and we\'re dedicated to providing our customers with the best possible experience.',
    'services.shoes.features.materials': 'Quality Materials',
    'services.shoes.features.craftsmanship': 'Expert Craftsmanship',
    'services.shoes.features.production': 'Sustainable Production',
    'services.shoes.features.solutions': 'Custom Solutions',
    'services.import.title': 'EL IZDEHAR Import & Export',
    'services.import.description': 'We offer top-notch import and export services for agriculture products, animal products, and seeds. Our experienced team ensures that every product is of the highest quality, and we take pride in our ability to deliver them to our customers efficiently and reliably.',
    'services.import.features.network': 'Global Network',
    'services.import.features.quality': 'Quality Assurance',
    'services.import.features.logistics': 'Efficient Logistics',
    'services.import.features.delivery': 'Reliable Delivery',
    'services.agriculture.title': 'EL IZDEHAR Agriculture',
    'services.agriculture.description': 'Our diverse agricultural industries produce a range of fresh and healthy products, including fruits, vegetables, animal products, and seeds. We prioritize sustainability and ethical practices in our farming methods to ensure high-quality products for our customers.',
    'services.agriculture.features.organic': 'Organic Farming',
    'services.agriculture.features.fresh': 'Fresh Products',
    'services.agriculture.features.sustainable': 'Sustainable Methods',
    'services.agriculture.features.ethical': 'Ethical Practices',
    'services.learnMore': 'Learn More',
    
    // Team
    'team.title': 'Meet Our Team',
    'team.subtitle': 'The driving force behind our success',
    'team.founder.name': 'Tag Elsir Abd Elrahman Abdullah',
    'team.founder.role': 'Founder & CEO',
    'team.founder.bio': 'With over 30 years of visionary leadership, Tag Elsir has built ELIZDEHAR Inc. into a multi-industry powerhouse, always focusing on innovation, quality, and sustainable growth.',
    'team.tahir.name': 'Tahir Abd Elrahman',
    'team.tahir.role': 'SEO',
    'team.tahir.bio': 'Tahir drives our digital presence and search engine optimization strategies, ensuring ELIZDEHAR reaches customers worldwide through innovative digital marketing approaches.',
    'team.ahmed.name': 'Ahmed Hassan',
    'team.ahmed.role': 'Operations Manager',
    'team.ahmed.bio': 'Ahmed oversees our day-to-day operations across all divisions, ensuring seamless coordination between our shoes factory, agriculture, and import/export businesses.',
    'team.fatima.name': 'Fatima Al-Zahra',
    'team.fatima.role': 'Quality Assurance Director',
    'team.fatima.bio': 'Fatima leads our quality control initiatives, maintaining the highest standards across all our products and services, from footwear manufacturing to agricultural produce.',
    
    // Footer
    'footer.description': 'Empowering communities through innovative solutions in footwear manufacturing, agriculture, and international trade for over 30 years.',
    'footer.services': 'Services',
    'footer.services.shoes': 'Shoes Factory',
    'footer.services.import': 'Import & Export',
    'footer.services.agriculture': 'Agriculture',
    'footer.services.consulting': 'Consulting',
    'footer.company': 'Company',
    'footer.company.about': 'About Us',
    'footer.company.team': 'Our Team',
    'footer.company.careers': 'Careers',
    'footer.company.contact': 'Contact',
    'footer.contact': 'Contact Info',
    'footer.contact.address': '123 Business District, Khartoum, Sudan',
    'footer.contact.phone': '+249 123 456 789',
    'footer.contact.email': 'info@elizdehar.com',
    'footer.rights': 'All rights reserved.',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to start your next project? Contact us today and discover how ELIZDEHAR can help you achieve your business goals.',
    'contact.form.firstName': 'First Name',
    'contact.form.lastName': 'Last Name',
    'contact.form.email': 'Email Address',
    'contact.form.service': 'Service Interest',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    'contact.success.title': 'Message sent successfully!',
    'contact.success.description': 'Thank you for your message. We will get back to you soon.',
    'contact.error.title': 'Error sending message',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.tryAgain': 'Try Again',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.services': 'خدماتنا',
    'nav.team': 'فريقنا',
    'nav.contact': 'اتصل بنا',
    
    // Hero Section
    'hero.title': 'التميز في كل مسعى',
    'hero.subtitle': 'نبني الغد، اليوم',
    'hero.description': 'شركة رائدة في التصنيع والتصدير منذ 1990. متخصصون في الأحذية الفاخرة، الزراعة المستدامة، والتجارة الدولية.',
    'hero.cta': 'استكشف خدماتنا',
    'hero.achievements.years': 'سنة من التميز',
    'hero.achievements.clients': 'عميل راضٍ',
    'hero.achievements.projects': 'مشروع ناجح',
    
    // About Section
    'about.title': 'قصتنا',
    'about.subtitle': 'نحن نجمع الناس معاً',
    'about.founder.bio1': 'السيد تاج السر عبد الرحمن عبد الله شخصية خيرية مهمة في الاقتصاد السوداني، حيث ساهم في نموه من 1975 إلى 2000. أسس وأدار مؤسسات مثل البنك السوداني السعودي وبنك النيل وبنك البركة، وكذلك مؤسسة الازدهار الاقتصادية التي تهدف إلى أنظمة اقتصادية ذاتية الاستدامة.',
    'about.founder.bio2': 'بخبرة مصرفية تقارب الثلاثين عاماً، أسس مصنع الازدهار للأحذية البلاستيكية في 1992 مع ابنه المهندس أمين تاج السر، والذي نما وتطور على يد ابنه السيد طاهر تاج السر وإخوانه إلى مجموعة شركات الازدهار.',
    'about.founder.quote': 'نؤمن بأنه من خلال تمكين أنفسنا، يمكننا تمكين العالم من حولنا.',
    'about.founder.attribution': 'السيد تاج السر عبد الرحمن – المؤسس',
    'about.values.time.title': 'توفير الوقت والطاقة',
    'about.values.time.description': 'عمليات فعالة ومبسطة',
    'about.values.support.title': 'دعم وخدمات عظيمة',
    'about.values.support.description': 'دعم عملاء مخصص وتميز في الخدمة',
    'about.values.risk.title': 'تقليل المخاطر',
    'about.values.risk.description': 'استراتيجيات مؤكدة لتقليل مخاطر الأعمال',
    'about.values.peace.title': 'راحة البال',
    'about.values.peace.description': 'شراكات موثوقة وحلول قابلة للاعتماد',
    
    // Services
    'services.title': 'خدماتنا',
    'services.subtitle': 'ثلاثة عقود من التميز عبر صناعات متعددة',
    'services.shoes.title': 'مصنع إلزدهار للأحذية',
    'services.shoes.description': 'اكتشف مجموعة واسعة من الأحذية عالية الجودة المصنوعة بدقة وعناية في مصنعنا. يتجلى التزامنا بالتميز في كل زوج نصنعه، ونحن مكرسون لتقديم أفضل تجربة ممكنة لعملائنا.',
    'services.shoes.features.materials': 'مواد عالية الجودة',
    'services.shoes.features.craftsmanship': 'حرفية خبيرة',
    'services.shoes.features.production': 'إنتاج مستدام',
    'services.shoes.features.solutions': 'حلول مخصصة',
    'services.import.title': 'إلزدهار للاستيراد والتصدير',
    'services.import.description': 'نقدم خدمات الاستيراد والتصدير عالية الجودة للمنتجات الزراعية والحيوانية والبذور. فريقنا ذو الخبرة يضمن أن كل منتج يلبي أعلى معايير الجودة، ونفتخر بقدرتنا على تسليمها لعملائنا بكفاءة وموثوقية.',
    'services.import.features.network': 'شبكة عالمية',
    'services.import.features.quality': 'ضمان الجودة',
    'services.import.features.logistics': 'لوجستيات فعالة',
    'services.import.features.delivery': 'تسليم موثوق',
    'services.agriculture.title': 'إلزدهار للزراعة',
    'services.agriculture.description': 'تنتج صناعاتنا الزراعية المتنوعة مجموعة من المنتجات الطازجة والصحية، بما في ذلك الفواكه والخضروات والمنتجات الحيوانية والبذور. نعطي الأولوية للاستدامة والممارسات الأخلاقية في أساليب الزراعة لضمان منتجات عالية الجودة لعملائنا.',
    'services.agriculture.features.organic': 'زراعة عضوية',
    'services.agriculture.features.fresh': 'منتجات طازجة',
    'services.agriculture.features.sustainable': 'طرق مستدامة',
    'services.agriculture.features.ethical': 'ممارسات أخلاقية',
    'services.learnMore': 'اعرف المزيد',
    
    // Team
    'team.title': 'تعرف على فريقنا',
    'team.subtitle': 'القوة الدافعة وراء نجاحنا',
    'team.founder.name': 'تاج السر عبد الرحمن عبد الله',
    'team.founder.role': 'المؤسس والرئيس التنفيذي',
    'team.founder.bio': 'بأكثر من 30 عاماً من القيادة الرؤيوية، بنى تاج السر شركة إلزدهار لتصبح قوة متعددة الصناعات، مع التركيز دائماً على الابتكار والجودة والنمو المستدام.',
    'team.tahir.name': 'طاهر عبد الرحمن',
    'team.tahir.role': 'تحسين محركات البحث',
    'team.tahir.bio': 'طاهر يقود حضورنا الرقمي واستراتيجيات تحسين محركات البحث، مما يضمن وصول إلزدهار للعملاء في جميع أنحاء العالم من خلال أساليب التسويق الرقمي المبتكرة.',
    'team.ahmed.name': 'أحمد حسن',
    'team.ahmed.role': 'مدير العمليات',
    'team.ahmed.bio': 'أحمد يشرف على عملياتنا اليومية عبر جميع الأقسام، مما يضمن التنسيق السلس بين مصنع الأحذية والزراعة وأعمال الاستيراد والتصدير.',
    'team.fatima.name': 'فاطمة الزهراء',
    'team.fatima.role': 'مديرة ضمان الجودة',
    'team.fatima.bio': 'فاطمة تقود مبادرات مراقبة الجودة لدينا، وتحافظ على أعلى المعايير عبر جميع منتجاتنا وخدماتنا، من تصنيع الأحذية إلى المنتجات الزراعية.',
    
    // Footer
    'footer.description': 'تمكين المجتمعات من خلال الحلول المبتكرة في تصنيع الأحذية والزراعة والتجارة الدولية لأكثر من 30 عاماً.',
    'footer.services': 'الخدمات',
    'footer.services.shoes': 'مصنع الأحذية',
    'footer.services.import': 'الاستيراد والتصدير',
    'footer.services.agriculture': 'الزراعة',
    'footer.services.consulting': 'الاستشارات',
    'footer.company': 'الشركة',
    'footer.company.about': 'من نحن',
    'footer.company.team': 'فريقنا',
    'footer.company.careers': 'الوظائف',
    'footer.company.contact': 'اتصل بنا',
    'footer.contact': 'معلومات الاتصال',
    'footer.contact.address': '123 المنطقة التجارية، الخرطوم، السودان',
    'footer.contact.phone': '+249 123 456 789',
    'footer.contact.email': 'info@elizdehar.com',
    'footer.rights': 'جميع الحقوق محفوظة.',
    
    // Contact
    'contact.title': 'تواصل معنا',
    'contact.subtitle': 'مستعد لبدء مشروعك القادم؟ تواصل معنا اليوم واكتشف كيف يمكن لإلزدهار مساعدتك في تحقيق أهدافك التجارية.',
    'contact.form.firstName': 'الاسم الأول',
    'contact.form.lastName': 'اسم العائلة',
    'contact.form.email': 'عنوان البريد الإلكتروني',
    'contact.form.service': 'الخدمة المطلوبة',
    'contact.form.message': 'الرسالة',
    'contact.form.submit': 'إرسال الرسالة',
    'contact.success.title': 'تم إرسال الرسالة بنجاح!',
    'contact.success.description': 'شكراً لك على رسالتك. سنتواصل معك قريباً.',
    'contact.error.title': 'خطأ في إرسال الرسالة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.tryAgain': 'حاول مرة أخرى',
  },
};

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elizdehar-language');
      if (saved && (saved === 'en' || saved === 'ar')) {
        return saved as Language;
      }
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ar')) {
        return 'ar';
      }
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('elizdehar-language', lang);
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const isRTL = language === 'ar';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
      
      // Apply RTL body styling and typography
      if (isRTL) {
        document.body.classList.add('font-arabic');
        document.body.classList.remove('font-sans');
        document.body.style.direction = 'rtl';
        document.body.style.textAlign = 'right';
      } else {
        document.body.classList.add('font-sans');
        document.body.classList.remove('font-arabic');
        document.body.style.direction = 'ltr';
        document.body.style.textAlign = 'left';
      }
    }
  }, [language, isRTL]);

  return (
    <I18nContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isRTL, 
      availableLanguages: LANGUAGES 
    }}>
      {children}
    </I18nContext.Provider>
  );
};