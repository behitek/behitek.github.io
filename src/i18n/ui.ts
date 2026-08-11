export type Lang = 'vi' | 'en';

export const defaultLang: Lang = 'vi';

export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
};

export const ui = {
  vi: {
    // Nav & General
    'nav.home': '~/home',
    'nav.services': './services',
    'nav.projects': './projects',
    'nav.blog': './blog',
    'nav.about': './about',
    'nav.contact': 'Nhận báo giá',
    'nav.mobile_menu': 'Mở menu',

    // Hero Section
    'hero.kicker': 'hieu@behitek:~ $ whoami',
    'hero.title': 'Hiếu Nguyễn',
    'hero.subtitle': 'Agentic AI · Natural Language Processing · AI in SDLC',
    'hero.bio':
      '8 năm đưa AI vào sản phẩm thực tế: thiết kế hệ thống Agentic AI & RAG doanh nghiệp, xử lý ngôn ngữ tự nhiên (NLP) chuyên sâu, và ứng dụng AI vào quy trình phát triển phần mềm full-stack (AI in SDLC). Tôi làm cả phần mô hình lẫn phần giữ cho hệ thống vận hành ổn định.',
    'hero.cta_contact': 'Trao đổi về dự án AI',
    'hero.cta_projects': 'Xem dự án thực tế',
    'hero.key_credentials': 'THÀNH TÍCH TIÊU BIỂU',

    // Home Sections
    'home.spotlight_kicker': '01 / SPOTLIGHT',
    'home.spotlight_title': 'Dự án AI Tiêu biểu',
    'home.projects_kicker': '02 / DỰ ÁN',
    'home.projects_title': 'Sản phẩm tiêu biểu',
    'home.projects_all': 'ls ./dự-án →',
    'home.projects_all_mobile': 'Xem tất cả dự án (ls ./projects) →',
    'home.services_kicker': '03 / DỊCH VỤ',
    'home.services_title': 'Dịch vụ chuyên môn',
    'home.blog_kicker': '04 / BLOG',
    'home.blog_title': 'Bài viết & Chia sẻ',
    'home.blog_all': 'ls ./blog →',

    // Spotlight Case Study Buttons
    'spotlight.read_inverted_hyde': 'Đọc bài viết Inverted HyDE',
    'spotlight.read_rag_practices': 'RAG in Production Best Practices',
    'spotlight.consult_enterprise_rag': 'Tư vấn giải pháp Enterprise RAG',

    // StatBar
    'stat.exp_val': '8 năm',
    'stat.exp_lbl': 'kinh nghiệm đưa AI vào production',
    'stat.awards_val': '4 giải',
    'stat.awards_lbl': 'quốc gia về AI & thuật toán',
    'stat.users_lbl': 'người dùng hệ thống vận hành',

    // CTABand
    'cta.kicker': '$ ./contact --ai-project',
    'cta.title': 'Có bài toán AI cần đưa vào production? Cùng bàn từ kiến trúc tới vận hành.',
    'cta.button': 'Trao đổi về dự án',

    // Projects Page
    'projects.title': 'Dự án & Sản phẩm',
    'projects.meta_title': 'Dự án & Sản phẩm',
    'projects.meta_desc':
      'Các sản phẩm AI, nền tảng SaaS và dự án mã nguồn mở do Hiếu Nguyễn xây dựng và vận hành.',
    'projects.kicker': '01 / REPOSITORY',
    'projects.filter_all': 'Tất cả',

    // Blog Page
    'blog.title': 'Blog & Technical Articles',
    'blog.meta_title': 'Blog & Bài viết',
    'blog.meta_desc':
      'Chia sẻ chuyên sâu về Agentic AI, RAG, NLP, Python và kỹ thuật phần mềm thực chiến.',
    'blog.kicker': '01 / TECHNICAL WRITING',
    'blog.reading_time': 'min read',

    // About Page
    'about.title': 'Giới thiệu',
    'about.meta_title': 'Giới thiệu',
    'about.meta_desc':
      'Hiếu Nguyễn - Senior AI Engineer tại Hà Nội. Agentic AI, NLP & AI in SDLC với 8 năm kinh nghiệm.',
    'about.role': 'Senior AI Engineer · Hà Nội',
    'about.core_skills': 'THẾ MẠNH CỐT LÕI',
    'about.work_history': 'LỊCH SỬ LÀM VIỆC',
    'about.awards': 'GIẢI THƯỞNG & THÀNH TÍCH',
    'about.orgs_title': 'Đơn vị sử dụng Luyện Code (LCOJ)',
    'about.orgs_subtitle':
      'Một số trường học & trung tâm lập trình đang vận hành tổ chức trên luyencode.net',
    'about.deployments_title': 'Hệ thống triển khai độc lập',
    'about.deployments_subtitle': 'Các instance DMOJ được đóng gói và vận hành riêng trên VPS riêng',

    // Services Pages
    'services.index_title': 'Dịch vụ Tư vấn & Triển khai AI',
    'services.index_meta_desc':
      'Dịch vụ thiết kế hệ thống Agentic AI, RAG doanh nghiệp, ứng dụng AI vào SDLC và triển khai Online Judge.',
    'services.ai_title': 'Agentic AI & NLP Solutions',
    'services.ai_meta_desc':
      'Tư vấn & thiết kế kiến trúc Agentic AI, Enterprise RAG, NLP chuyên sâu cho doanh nghiệp.',
    'services.software_title': 'AI in SDLC & Full-stack Delivery',
    'services.software_meta_desc':
      'Tăng tốc phát triển phần mềm full-stack bằng AI, xây dựng microservices và hạ tầng Cloud/DevOps.',

    // Contact Page
    'contact.title': 'Liên hệ & Hợp tác',
    'contact.meta_title': 'Liên hệ',
    'contact.meta_desc':
      'Bắt đầu trao đổi về dự án AI, dịch vụ tư vấn kiến trúc hoặc hợp tác phát triển.',
    'contact.subtitle': 'Cùng thảo luận bài toán kỹ thuật của bạn.',
    'contact.form_name': 'Họ và tên',
    'contact.form_email': 'Email liên hệ',
    'contact.form_service': 'Dịch vụ quan tâm',
    'contact.form_message': 'Mô tả bài toán / Yêu cầu',
    'contact.form_submit': 'Gửi tin nhắn',
    'contact.success': 'Cảm ơn bạn! Tin nhắn đã được gửi thành công.',

    // Assistant Page
    'assistant.title': 'Trợ lý AI (Assistant)',
    'assistant.meta_title': 'Trợ lý AI',
    'assistant.meta_desc': 'Trợ lý AI tương tác trực tiếp về các dịch vụ và dự án của behitek.',

    // 404 Page
    'notfound.title': '404 - Không tìm thấy trang',
    'notfound.heading': '404 / PAGE NOT FOUND',
    'notfound.desc': 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.',
    'notfound.home': 'Trở về trang chủ',

    // Footer
    'footer.rights': 'Bảo lưu mọi quyền.',
  },
  en: {
    // Nav & General
    'nav.home': '~/home',
    'nav.services': './services',
    'nav.projects': './projects',
    'nav.blog': './blog',
    'nav.about': './about',
    'nav.contact': 'Get a Quote',
    'nav.mobile_menu': 'Open menu',

    // Hero Section
    'hero.kicker': 'hieu@behitek:~ $ whoami',
    'hero.title': 'Hieu Nguyen',
    'hero.subtitle': 'Agentic AI · Natural Language Processing · AI in SDLC',
    'hero.bio':
      '8 years of bringing AI into production: building Enterprise Agentic AI & RAG systems, deep Natural Language Processing (NLP), and AI-driven full-stack software delivery (AI in SDLC). Engineering both the models and robust infrastructure.',
    'hero.cta_contact': 'Discuss an AI Project',
    'hero.cta_projects': 'View Projects',
    'hero.key_credentials': 'KEY CREDENTIALS',

    // Home Sections
    'home.spotlight_kicker': '01 / SPOTLIGHT',
    'home.spotlight_title': 'Featured AI Project',
    'home.projects_kicker': '02 / PROJECTS',
    'home.projects_title': 'Featured Products',
    'home.projects_all': 'ls ./projects →',
    'home.projects_all_mobile': 'View all projects (ls ./projects) →',
    'home.services_kicker': '03 / SERVICES',
    'home.services_title': 'Core Expertise',
    'home.blog_kicker': '04 / BLOG',
    'home.blog_title': 'Articles & Insights',
    'home.blog_all': 'ls ./blog →',

    // Spotlight Case Study Buttons
    'spotlight.read_inverted_hyde': 'Read Inverted HyDE Article',
    'spotlight.read_rag_practices': 'RAG in Production Best Practices',
    'spotlight.consult_enterprise_rag': 'Consult Enterprise RAG Solutions',

    // StatBar
    'stat.exp_val': '8 Yrs',
    'stat.exp_lbl': 'production AI experience',
    'stat.awards_val': '4 Awards',
    'stat.awards_lbl': 'national AI & algorithm honors',
    'stat.users_lbl': 'active platform users',

    // CTABand
    'cta.kicker': '$ ./contact --ai-project',
    'cta.title': 'Have an AI challenge to take to production? Let\'s discuss architecture to deployment.',
    'cta.button': 'Discuss Project',

    // Projects Page
    'projects.title': 'Projects & Products',
    'projects.meta_title': 'Projects & Products',
    'projects.meta_desc':
      'AI products, SaaS platforms, and open-source projects built and operated by Hieu Nguyen.',
    'projects.kicker': '01 / REPOSITORY',
    'projects.filter_all': 'All',

    // Blog Page
    'blog.title': 'Blog & Technical Articles',
    'blog.meta_title': 'Blog & Articles',
    'blog.meta_desc':
      'In-depth technical writing on Agentic AI, RAG, NLP, Python, and full-stack software engineering.',
    'blog.kicker': '01 / TECHNICAL WRITING',
    'blog.reading_time': 'min read',

    // About Page
    'about.title': 'About Me',
    'about.meta_title': 'About Me',
    'about.meta_desc':
      'Hieu Nguyen - Senior AI Engineer in Hanoi. Agentic AI, NLP & AI in SDLC with 8 years of experience.',
    'about.role': 'Senior AI Engineer · Hanoi',
    'about.core_skills': 'CORE STRENGTHS',
    'about.work_history': 'WORK EXPERIENCE',
    'about.awards': 'AWARDS & HONORS',
    'about.orgs_title': 'Institutions using Luyen Code (LCOJ)',
    'about.orgs_subtitle':
      'Schools and programming centers operating organizations on luyencode.net',
    'about.deployments_title': 'Standalone Systems Deployed',
    'about.deployments_subtitle': 'Custom DMOJ instances packaged and operated on dedicated VPS infrastructure',

    // Services Pages
    'services.index_title': 'AI Consulting & Implementation Services',
    'services.index_meta_desc':
      'Agentic AI system design, enterprise RAG solutions, AI in SDLC, and Online Judge deployments.',
    'services.ai_title': 'Agentic AI & NLP Solutions',
    'services.ai_meta_desc':
      'Architecture design and consulting for Enterprise Agentic AI, Multimodal RAG, and deep NLP.',
    'services.software_title': 'AI in SDLC & Full-stack Delivery',
    'services.software_meta_desc':
      'Accelerate full-stack software development with AI, building backend microservices and DevOps cloud infrastructure.',

    // Contact Page
    'contact.title': 'Contact & Collaboration',
    'contact.meta_title': 'Contact',
    'contact.meta_desc':
      'Start a discussion on your AI project, architecture consulting, or engineering collaboration.',
    'contact.subtitle': 'Let\'s talk about your technical requirements.',
    'contact.form_name': 'Full Name',
    'contact.form_email': 'Email Address',
    'contact.form_service': 'Service of Interest',
    'contact.form_message': 'Project Description / Requirements',
    'contact.form_submit': 'Send Message',
    'contact.success': 'Thank you! Your message has been sent successfully.',

    // Assistant Page
    'assistant.title': 'AI Assistant',
    'assistant.meta_title': 'AI Assistant',
    'assistant.meta_desc': 'Interactive AI Assistant for behitek services and projects.',

    // 404 Page
    'notfound.title': '404 - Page Not Found',
    'notfound.heading': '404 / PAGE NOT FOUND',
    'notfound.desc': 'The page you are looking for does not exist or has been moved.',
    'notfound.home': 'Back to Homepage',

    // Footer
    'footer.rights': 'All rights reserved.',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key] || key;
  };
}

export function getLocalizedPath(pathname: string, targetLang: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  const currentIsEn = segments[0] === 'en';

  if (currentIsEn) {
    segments.shift(); // remove 'en'
  }

  if (targetLang === 'en') {
    return '/' + ['en', ...segments].join('/');
  }

  return '/' + segments.join('/');
}
