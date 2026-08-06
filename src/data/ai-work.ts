/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER DATA — NOT REAL. DO NOT MERGE TO `main`.
 * ─────────────────────────────────────────────────────────────────────────────
 * Every value marked `placeholder: true` below is fabricated. It exists only so
 * the homepage can be built and reviewed before the real figures arrive.
 * `.github/workflows/deploy.yml` publishes `main` to GitHub Pages on push, so
 * merging this file as-is would put invented metrics on a live personal site
 * under a real name.
 *
 * To enumerate everything still fake:
 *   grep -rn "placeholder: true" src/
 *
 * Values marked `placeholder: false` are REAL and must not be changed:
 *   - "+12%" ASR accuracy on the KiKi virtual assistant (Zalo)
 *   - "−15%" service errors on Kubernetes (Zalo)
 *
 * The NEXUS_PIPELINE stages are not metrics; they restate the architecture
 * already described in src/content/projects/nexusai.json ("vector embedding
 * tùy biến, hybrid search, re-rank bằng LLM") and need no placeholder flag.
 */

/** A single headline number with its caption. */
export interface Metric {
  value: string;
  label: string;
  placeholder: boolean;
}

/** The accent-coloured evidence line at the bottom of a skills column. */
export interface ProofLine {
  text: string;
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

export const AI_SYSTEMS_SHIPPED: Metric = {
  value: '6',
  label: 'hệ thống AI đã lên production',
  placeholder: true,
};

export const RAG_PROOF: ProofLine = {
  text: '+31% recall@10 so với baseline BM25 trên corpus khách hàng',
  placeholder: true,
};

export const SPEECH_PROOF: ProofLine = {
  text: '+12% độ chính xác ASR cho trợ lý ảo KiKi (Zalo)',
  placeholder: false,
};

export const PRODUCTION_PROOF: ProofLine = {
  text: '−15% lỗi dịch vụ trên Kubernetes (Zalo)',
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
    'Khách hàng doanh nghiệp có kho tài liệu nội bộ nhiều năm nhưng tìm kiếm theo từ khoá gần như vô dụng: câu hỏi nghiệp vụ không khớp từ khoá, và nội dung nằm rải rác trong cả văn bản lẫn ảnh chụp và video. Tôi xây hệ thống RAG với embedding tùy biến cho từng loại nội dung, hybrid search kết hợp BM25 và vector, re-rank bằng LLM, và câu trả lời luôn kèm trích dẫn để người dùng kiểm chứng được nguồn.',
  stats: [
    { value: '1,2M', label: 'tài liệu đã index', placeholder: true },
    { value: '480ms', label: 'p95 latency', placeholder: true },
    { value: '+31%', label: 'recall@10 vs baseline', placeholder: true },
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
  metric: { value: '0,82', label: 'tương quan với giám khảo người', placeholder: true },
};

export const KIKI_ASR: CardCaseStudy = {
  kicker: 'KiKi (Zalo) — speech',
  title: 'Chuẩn hoá văn bản cho nhận dạng giọng nói tiếng Việt',
  problem:
    'Trợ lý ảo trên ô tô nghe sai những chuỗi mà người Việt đọc không theo mặt chữ: số, ngày tháng, đơn vị, tên đường và tên riêng.',
  approach:
    'Xây pipeline chuẩn hoá văn bản cho cả dữ liệu huấn luyện và đầu ra nhận dạng, mở rộng từ điển phát âm cho tên riêng, và dựng bộ đánh giá riêng cho từng nhóm lỗi thay vì chỉ nhìn WER tổng.',
  result:
    'Độ chính xác nhận dạng tăng 12%, và các nhóm lỗi liên quan tới số và địa danh giảm rõ rệt trên bộ đánh giá nội bộ.',
  tech: ['PyTorch', 'Kaldi', 'Python', 'Kubernetes'],
  metric: { value: '+12%', label: 'độ chính xác ASR', placeholder: false },
};
