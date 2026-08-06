export interface Organization {
  name: string;
  slug: string;
  members: number;
}

export interface Deployment {
  name: string;
  url: string;
  /** All deployments run on a private VPS; this only distinguishes the domain arrangement. */
  domain: 'subdomain' | 'custom';
  note: string;
}

/**
 * External institutions with an organization on luyencode.net.
 * Excludes Hieu's own orgs (Luyện Code Club, Luyện Code School).
 * Source: https://luyencode.net/organizations/ — verified 2026-08-06.
 */
export const ORGANIZATIONS: Organization[] = [
  { name: 'Trường Đại học Sư phạm Hà Nội', slug: 'hnue', members: 121 },
  { name: 'Trường ĐH Kinh Tế - Kỹ thuật Công nghiệp', slug: 'ktktcn', members: 213 },
  { name: 'UTL707', slug: 'dhkt-hccand', members: 517 },
  { name: 'THPT Chuyên Nguyễn Chí Thanh - Đăk Nông', slug: 'nctdno', members: 265 },
  { name: 'Trường THPT Chuyên Lê Quý Đôn - Quảng Trị', slug: 'lqdqt', members: 13 },
  { name: 'Trường THPT Chuyên Lý Tự Trọng - Cần Thơ', slug: 'thptltt', members: 139 },
  { name: 'Trường THPT Quang Hà - Vĩnh Phúc', slug: 'thptqh', members: 203 },
  { name: 'Trường THPT Tam Đảo II', slug: 'thpttd2', members: 107 },
  { name: 'Trường THPT Bình Sơn', slug: 'bshs', members: 85 },
  { name: 'Trường THPT Lục Nam', slug: 'tlnhs', members: 31 },
  { name: 'Trường THPT Bất Bạt', slug: 'batbat-highschool', members: 5 },
  { name: 'THPT Huỳnh Thúc Kháng', slug: 'thpt-hunh-thuc-khang', members: 36 },
  { name: 'Trường THCS Lập Thạch', slug: 'lths', members: 446 },
  { name: 'Trường THCS Ninh Phong - TP Ninh Bình', slug: 'thcsnp', members: 163 },
  { name: 'Trường THCS Lương Thế Vinh (Đắk Lắk)', slug: 'ltvdk', members: 21 },
  { name: "Trường PTDT Nội Trú THCS M'Drắk", slug: 'trng-ptdt-ni-tru-thcs-mdrk', members: 2 },
  { name: 'Trường TH Nguyễn Trãi - Đắk Lắk', slug: 'trng-th-nguyn-trai-djk-lk', members: 4 },
  { name: 'Đội Tỉnh Đồng Tháp', slug: 'thptdt', members: 45 },
  { name: 'Kidcode Vũng Tàu', slug: 'kidvt', members: 53 },
  { name: 'Thầy Minh chuyên tin', slug: 'tmct', members: 51 },
];

/** Systems deployed and operated outside the shared luyencode.net platform. */
export const DEPLOYMENTS: Deployment[] = [
  {
    name: 'LNQOJ — Trường THCS Lý Nhật Quang',
    url: 'https://lynhatquang.luyencode.net',
    domain: 'subdomain',
    note: 'Đô Lương, Nghệ An — VPS riêng, subdomain miễn phí',
  },
  {
    name: 'cothilaptrinh.vn',
    url: 'https://code.cothilaptrinh.vn',
    domain: 'custom',
    note: 'trung tâm luyện thi HSG tin học',
  },
  {
    name: 'laptrinh.online',
    url: 'https://laptrinh.online',
    domain: 'custom',
    note: 'lớp học lập trình trực tuyến',
  },
  {
    name: 'codebuddy.vn',
    url: 'https://codebuddy.vn',
    domain: 'custom',
    note: 'nền tảng luyện code cho sinh viên',
  },
];

export const ORG_LIST_URL = 'https://luyencode.net/organizations/';

/** Computed so the figure can never drift from the list above. Currently 2520. */
export const TOTAL_ORG_MEMBERS = ORGANIZATIONS.reduce((sum, org) => sum + org.members, 0);

/**
 * Approximate total users across the whole luyencode.net platform, including Hieu's own two
 * organizations — a stated figure, not derivable from ORGANIZATIONS, which excludes those two
 * and only totals registered members of the 20 external orgs (see TOTAL_ORG_MEMBERS, 2520).
 */
export const TOTAL_PLATFORM_USERS = '20.000+';

/** Stated figure for the size of the shared problem bank on luyencode.net. */
export const TOTAL_PROBLEMS = '1500+';

/** Stated figure for total judged submissions across the whole platform's history. */
export const TOTAL_SUBMISSIONS = '2M+';
