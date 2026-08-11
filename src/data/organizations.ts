import type { Lang } from '@/i18n/ui';

export interface Organization {
  name: string;
  slug: string;
  members: number;
}

export interface Deployment {
  name: string;
  url: string;
  domain: 'subdomain' | 'custom';
  note: string;
  note_en?: string;
}

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

export const DEPLOYMENTS: Deployment[] = [
  {
    name: 'LNQOJ: Trường THCS Lý Nhật Quang',
    url: 'https://lynhatquang.luyencode.net',
    domain: 'subdomain',
    note: 'Đô Lương, Nghệ An (VPS riêng, subdomain miễn phí)',
    note_en: 'Do Luong, Nghe An (Dedicated VPS, free subdomain)',
  },
  {
    name: 'cothilaptrinh.vn',
    url: 'https://code.cothilaptrinh.vn',
    domain: 'custom',
    note: 'trung tâm luyện thi HSG tin học',
    note_en: 'Competitive programming contest center',
  },
  {
    name: 'laptrinh.online',
    url: 'https://laptrinh.online',
    domain: 'custom',
    note: 'lớp học lập trình trực tuyến',
    note_en: 'Online programming academy platform',
  },
  {
    name: 'codebuddy.vn',
    url: 'https://codebuddy.vn',
    domain: 'custom',
    note: 'nền tảng luyện code cho sinh viên',
    note_en: 'Student coding practice platform',
  },
];

export function getDeployments(lang: Lang): Deployment[] {
  if (lang === 'en') {
    return DEPLOYMENTS.map((d) => ({
      ...d,
      note: d.note_en || d.note,
    }));
  }
  return DEPLOYMENTS;
}

export const ORG_LIST_URL = 'https://luyencode.net/organizations/';

export const TOTAL_ORG_MEMBERS = ORGANIZATIONS.reduce((sum, org) => sum + org.members, 0);

export const TOTAL_PLATFORM_USERS = '20.000+';

export const TOTAL_PROBLEMS = '1500+';

export const TOTAL_SUBMISSIONS = '2M+';
