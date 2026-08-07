/**
 * All figures below are real, sourced from the site owner's resume. The
 * NEXUS_PIPELINE stages restate the architecture already described in
 * src/content/projects/nexusai.json ("vector embedding tùy biến, hybrid
 * search, re-rank bằng LLM").
 */

/** A single headline number with its caption. */
export interface Metric {
  value: string;
  label: string;
  placeholder: boolean;
}

/** One stage in a rendered architecture diagram. */
export interface PipelineStage {
  label: string;
  detail: string;
}

/** Content for the large CaseStudySpotlight treatment. */
export interface SpotlightCaseStudy {
  kicker: string;
  title: string;
  description: string;
  stats: Metric[];
}

/** Content for the compact CaseStudyCard treatment. */
export interface CardCaseStudy {
  kicker: string;
  title: string;
  problem: string;
  approach: string;
  result: string;
  tech: string[];
  metric: Metric;
}

export const COMPANIES_SHIPPED_AT: Metric = {
  value: '3',
  label: 'công ty đưa AI vào sản phẩm thực tế',
  placeholder: false,
};

export const NEXUS_PIPELINE: PipelineStage[] = [
  { label: 'Document Parsing & Hierarchy', detail: 'Bảo toàn cấu trúc phân cấp (pdf, images, videos, office files)' },
  { label: 'Inverted HyDE Indexing', detail: 'Sinh câu hỏi giả định offline (Query-to-Query matching)' },
  { label: 'Sub-second Retrieval', detail: 'Dense Vector + BM25 + Cross-Encoder Re-rank' },
  { label: 'Grounded Answer Generation', detail: 'Câu trả lời kèm trích dẫn nguồn chuẩn xác, không bị hallucinate' },
];

export const NEXUS_AI: SpotlightCaseStudy = {
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

export const LINGUIST_AI: CardCaseStudy = {
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

export const KIKI_ASR: CardCaseStudy = {
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
