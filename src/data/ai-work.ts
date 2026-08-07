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
  { label: 'query', detail: 'câu hỏi ngôn ngữ tự nhiên' },
  { label: 'hybrid retrieval', detail: 'BM25 + dense vector song song' },
  { label: 'LLM re-rank', detail: 'chấm lại top-k theo ngữ cảnh' },
  { label: 'grounded answer', detail: 'trả lời kèm trích dẫn nguồn' },
];

export const NEXUS_AI: SpotlightCaseStudy = {
  kicker: 'NexusAI — RAG đa phương thức',
  title: 'Tra cứu trên kho tài liệu văn bản, hình ảnh và video',
  description:
    'Khách hàng doanh nghiệp có kho tài liệu nội bộ nhiều năm nhưng tìm kiếm theo từ khoá gần như vô dụng: câu hỏi nghiệp vụ không khớp từ khoá, và nội dung nằm rải rác trong cả văn bản lẫn ảnh chụp và video. Tôi xây hệ thống RAG với embedding tùy biến cho từng loại nội dung, hybrid search kết hợp BM25 và vector, re-rank bằng LLM, và câu trả lời luôn kèm trích dẫn để người dùng kiểm chứng được nguồn. Kinh nghiệm RAG này cũng là nền cho nghiên cứu Legal QA mà tôi đồng tác giả, giành Giải Nhất ALQAC 2022.',
  stats: [
    { value: '3', label: 'loại nội dung: văn bản, ảnh, video', placeholder: false },
    { value: 'Hybrid', label: 'search: BM25 + vector + re-rank LLM', placeholder: false },
    { value: 'Có', label: 'trích dẫn nguồn trong mọi câu trả lời', placeholder: false },
  ],
};

export const LINGUIST_AI: CardCaseStudy = {
  kicker: 'LinguistAI — LLM + speech',
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
  kicker: 'KiKi (Zalo) — speech',
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
