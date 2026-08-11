import type { Lang } from '@/i18n/ui';

export interface Metric {
  value: string;
  label: string;
  placeholder: boolean;
}

export interface PipelineStage {
  label: string;
  detail: string;
}

export interface SpotlightCaseStudy {
  kicker: string;
  title: string;
  description: string;
  stats: Metric[];
}

export interface CardCaseStudy {
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  metric: Metric;
}

export function getCompaniesShippedAt(lang: Lang): Metric {
  return {
    value: '3',
    label: lang === 'en' ? 'companies shipped AI products to production' : 'công ty đưa AI vào sản phẩm thực tế',
    placeholder: false,
  };
}

export const COMPANIES_SHIPPED_AT = getCompaniesShippedAt('vi');

export function getNexusPipeline(lang: Lang): PipelineStage[] {
  if (lang === 'en') {
    return [
      { label: 'Document Parsing & Hierarchy', detail: 'Preserve hierarchical structures (pdf, images, videos, office files)' },
      { label: 'Inverted HyDE Indexing', detail: 'Generate hypothetical queries offline (Query-to-Query matching)' },
      { label: 'Sub-second Retrieval', detail: 'Dense Vector + BM25 + Cross-Encoder Re-rank' },
      { label: 'Grounded Answer Generation', detail: 'Grounded responses with accurate citations, zero hallucination' },
    ];
  }
  return [
    { label: 'Document Parsing & Hierarchy', detail: 'Bảo toàn cấu trúc phân cấp (pdf, images, videos, office files)' },
    { label: 'Inverted HyDE Indexing', detail: 'Sinh câu hỏi giả định offline (Query-to-Query matching)' },
    { label: 'Sub-second Retrieval', detail: 'Dense Vector + BM25 + Cross-Encoder Re-rank' },
    { label: 'Grounded Answer Generation', detail: 'Câu trả lời kèm trích dẫn nguồn chuẩn xác, không bị hallucinate' },
  ];
}

export const NEXUS_PIPELINE = getNexusPipeline('vi');

export function getNexusAI(lang: Lang): SpotlightCaseStudy {
  if (lang === 'en') {
    return {
      kicker: 'NexusAI: Enterprise Multimodal RAG & Inverted HyDE',
      title: 'Intelligent Knowledge Retrieval Across Enterprise Documents',
      description:
        'Enterprise document repositories (PDFs, Office files, images, videos) often suffer from vocabulary mismatch between user queries and raw documents. NexusAI introduces Inverted HyDE (pre-generating hypothetical queries during offline indexing to map retrieval into Query-to-Query matching, eliminating runtime LLM latency) combined with hierarchical document chunking and grounded generation with precise source citations.',
      stats: [
        { value: 'Inverted HyDE', label: 'Query-to-Query matching eliminates runtime latency', placeholder: false },
        { value: 'Multimodal', label: 'Processes PDF, Office, Image & Video files', placeholder: false },
        { value: '100% Grounded', label: 'Direct source citations in generated responses', placeholder: false },
      ],
    };
  }
  return {
    kicker: 'NexusAI: Enterprise Multimodal RAG & Inverted HyDE',
    title: 'Tra cứu thông minh trên kho tài liệu nội bộ đa định dạng',
    description:
      'Doanh nghiệp sở hữu kho tài liệu khổng lồ (PDF, Office, hình ảnh, video) nhưng tra cứu gặp khó khăn do lệch không gian câu chữ giữa câu hỏi và tài liệu. NexusAI áp dụng sáng kiến Inverted HyDE (sinh trước tập câu hỏi giả định ở bước indexing offline để đưa bài toán về Query-to-Query matching, triệt tiêu độ trễ LLM ở runtime) kết hợp bảo toàn cấu trúc phân cấp tài liệu (hierarchical chunking) và grounded generation luôn kèm trích dẫn nguồn chính xác.',
    stats: [
      { value: 'Inverted HyDE', label: 'Query-to-Query matching triệt tiêu trễ runtime', placeholder: false },
      { value: 'Multimodal', label: 'Xử lý PDF, Office, Ảnh & Video', placeholder: false },
      { value: '100% Grounded', label: 'Trích dẫn nguồn trực tiếp trong phản hồi', placeholder: false },
    ],
  };
}

export const NEXUS_AI = getNexusAI('vi');

export function getLinguistAI(lang: Lang): CardCaseStudy {
  if (lang === 'en') {
    return {
      kicker: 'LinguistAI: LLM + speech',
      title: 'Automated 4-Skill English Mock Exams & Grading',
      problem:
        '4-skill exam preparation is bottlenecked by evaluation: speaking and writing require human teachers, causing students to wait days for feedback.',
      approach:
        'Generate reading tasks using LLMs aligned with exam formats, evaluate speaking using Whisper plus fluency & pronunciation scoring, and grade writing using LLMs with standardized rubrics.',
      result:
        'Students receive instant, detailed criteria feedback right after submission, reducing teacher workload to auditing flagged edge cases.',
      tech: ['GPT-4', 'Claude', 'Whisper', 'React'],
      metric: { value: '4 Skills', label: 'auto-graded with instant feedback', placeholder: false },
    };
  }
  return {
    kicker: 'LinguistAI: LLM + speech',
    title: 'Thi thử 4 kỹ năng tiếng Anh, chấm tự động',
    problem:
      'Luyện thi 4 kỹ năng bị nghẽn ở khâu chấm: nói và viết cần giáo viên, nên học viên phải chờ nhiều ngày mới có phản hồi.',
    approach:
      'Sinh đề đọc bằng LLM theo đúng định dạng đề thi, chấm phần nói bằng Whisper cộng một lớp đánh giá phát âm và trôi chảy, chấm viết bằng LLM với rubric cố định và phản hồi theo từng tiêu chí.',
    result:
      'Học viên nhận phản hồi chi tiết ngay sau khi nộp bài, giáo viên chỉ còn phải soát lại các bài mà hệ thống đánh dấu là không chắc chắn.',
    tech: ['GPT-4', 'Claude', 'Whisper', 'React'],
    metric: { value: '4 kỹ năng', label: 'chấm tự động, phản hồi tức thì', placeholder: false },
  };
}

export const LINGUIST_AI = getLinguistAI('vi');

export function getKikiASR(lang: Lang): CardCaseStudy {
  if (lang === 'en') {
    return {
      kicker: 'KiKi (Zalo): speech',
      title: 'Text Normalization for Vietnamese Automatic Speech Recognition',
      problem:
        'In-car virtual assistants misrecognized non-verbatim spoken expressions: numbers, dates, units, street names, and proper nouns.',
      approach:
        'Built text normalization pipelines for training data and ASR outputs, expanded pronunciation dictionaries for proper nouns, and constructed category-specific evaluation benchmarks.',
      result:
        'Increased ASR accuracy by 12% with significant reduction in numerical and location errors. Simultaneously optimized Kubernetes inference services, reducing service errors by 15%.',
      tech: ['PyTorch', 'Kaldi', 'Python', 'Kubernetes'],
      metric: { value: '+12%', label: 'ASR accuracy boost', placeholder: false },
    };
  }
  return {
    kicker: 'KiKi (Zalo): speech',
    title: 'Chuẩn hoá văn bản cho nhận dạng giọng nói tiếng Việt',
    problem:
      'Trợ lý ảo trên ô tô nghe sai những chuỗi mà người Việt đọc không theo mặt chữ: số, ngày tháng, đơn vị, tên đường và tên riêng.',
    approach:
      'Xây pipeline chuẩn hoá văn bản cho cả dữ liệu huấn luyện và đầu ra nhận dạng, mở rộng từ điển phát âm cho tên riêng, và dựng bộ đánh giá riêng cho từng nhóm lỗi thay vì chỉ nhìn WER tổng.',
    result:
      'Độ chính xác nhận dạng tăng 12%, và các nhóm lỗi liên quan tới số và địa danh giảm rõ rệt trên bộ đánh giá nội bộ. Cùng giai đoạn đó, tôi cũng tối ưu dịch vụ suy luận trên Kubernetes, giảm 15% lỗi dịch vụ.',
    tech: ['PyTorch', 'Kaldi', 'Python', 'Kubernetes'],
    metric: { value: '+12%', label: 'độ chính xác ASR', placeholder: false },
  };
}

export const KIKI_ASR = getKikiASR('vi');

export function getServicesList(lang: Lang) {
  const prefix = lang === 'en' ? '/en' : '';
  if (lang === 'en') {
    return [
      {
        href: `${prefix}/services/ai`,
        path: `${prefix}/services/ai`,
        title: 'Agentic AI & NLP',
        description: 'Building AI Agents, RAG, NLP from PoC to production, agentic architecture, and system optimization.',
        bullets: ['Agentic Workflows & Tool Calling', 'NLP, Embeddings & Hybrid Search', 'Model Evaluation & Benchmarking'],
        flagship: true,
      },
      {
        href: `${prefix}/services/software`,
        path: `${prefix}/services/software`,
        title: 'AI in SDLC & Full-stack',
        description: 'Applying AI across the entire software development lifecycle (AI in SDLC), accelerating products from idea to production.',
        bullets: ['AI-Driven Full-stack Development', 'Backend APIs & Microservices', 'DevOps, Docker & K8s Infrastructure'],
      },
      {
        href: `${prefix}/services`,
        path: `${prefix}/services/online-judge`,
        title: 'Online Judge (DMOJ)',
        description: 'Deploying and operating automated Online Judges for schools and coding academies.',
        bullets: ['DMOJ Installation & Customization', 'Sandboxed Judge Operations', 'Automated Grading & Problem Sets'],
        borderRight: false,
      },
    ];
  }
  return [
    {
      href: '/services/ai',
      path: '/services/ai',
      title: 'Agentic AI & NLP',
      description: 'Xây dựng AI Agents, RAG, NLP từ PoC đến production, kiến trúc agentic và tối ưu hệ thống.',
      bullets: ['Agentic Workflows & Tool Calling', 'NLP, Embedding & Hybrid Search', 'Model Evaluation & Benchmarking'],
      flagship: true,
    },
    {
      href: '/services/software',
      path: '/services/software',
      title: 'AI in SDLC & Full-stack',
      description:
        'Ứng dụng AI vào toàn bộ quy trình phát triển phần mềm (AI in SDLC), tăng tốc xây dựng sản phẩm từ ý tưởng đến triển khai.',
      bullets: ['AI-Driven Full-stack Development', 'Backend API & Microservices', 'DevOps, Docker & K8s Infrastructure'],
    },
    {
      href: '/services',
      path: '/services/online-judge',
      title: 'Online Judge (DMOJ)',
      description: 'Triển khai & vận hành online judge cho trường học và trung tâm dạy lập trình.',
      bullets: ['Cài đặt & Tùy biến DMOJ', 'Vận hành Sandboxed Judge', 'Hệ thống Bài tập & Chấm tự động'],
      borderRight: false,
    },
  ];
}
