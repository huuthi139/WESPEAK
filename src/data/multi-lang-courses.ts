// Multi-language course data for Chinese, Korean, and Japanese
// Follows the same structure as english-courses.ts

import type { MockCourse, MockUnit, MockLesson } from "./english-courses";
import {
  ENGLISH_COURSES,
  ALL_UNITS as ENGLISH_UNITS,
} from "./english-courses";

// ==================== CHINESE (Mandarin) ====================

export const CHINESE_COURSES: MockCourse[] = [
  {
    id: "11000000-0000-0000-0000-000000000001",
    language: "chinese",
    title: "Tiếng Trung A1 - Khởi đầu",
    description:
      "Khóa học tiếng Trung cơ bản dành cho người mới bắt đầu. Học chào hỏi, số đếm và giao tiếp đơn giản.",
    level: "A1",
    total_lessons: 5,
    duration_hours: 3,
    is_premium: false,
    order_index: 1,
    progress: 0,
    completed_lessons: 0,
  },
];

const CHINESE_UNITS: MockUnit[] = [
  {
    id: "21000000-0000-0000-0000-000000000001",
    course_id: "11000000-0000-0000-0000-000000000001",
    title: "Chào hỏi tiếng Trung",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Trung",
    order_index: 1,
    lessons: [
      {
        id: "31000000-0000-0000-0000-000000000001",
        unit_id: "21000000-0000-0000-0000-000000000001",
        title: "问候 - Lời chào",
        type: "vocabulary",
        content: {
          words: [
            { word: "你好", translation: "Xin chào", phonetic: "nǐ hǎo", example: "你好，你叫什么名字？" },
            { word: "谢谢", translation: "Cảm ơn", phonetic: "xiè xie", example: "谢谢你的帮助！" },
            { word: "再见", translation: "Tạm biệt", phonetic: "zài jiàn", example: "再见，明天见！" },
            { word: "早上好", translation: "Chào buổi sáng", phonetic: "zǎo shang hǎo", example: "早上好，老师！" },
            { word: "对不起", translation: "Xin lỗi", phonetic: "duì bu qǐ", example: "对不起，我迟到了。" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "31000000-0000-0000-0000-000000000002",
        unit_id: "21000000-0000-0000-0000-000000000001",
        title: "你叫什么名字？ - Bạn tên gì?",
        type: "listening",
        content: {
          audio_text:
            "你好！我叫小明。你叫什么名字？我叫小红。你好，小红！认识你很高兴！",
          questions: [
            {
              question: "Người nói đầu tiên tên gì?",
              options: ["Tiểu Hồng", "Tiểu Minh", "Tiểu Lâm", "Tiểu Vương"],
              correct: 1,
            },
            {
              question: "Người nói thứ hai tên gì?",
              options: ["Tiểu Minh", "Tiểu Lâm", "Tiểu Hồng", "Tiểu Lệ"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "31000000-0000-0000-0000-000000000003",
        unit_id: "21000000-0000-0000-0000-000000000001",
        title: "自我介绍 - Giới thiệu bản thân",
        type: "speaking",
        content: {
          phrases: [
            { text: "你好，我叫...", translation: "Xin chào, tôi tên là..." },
            { text: "我是越南人。", translation: "Tôi là người Việt Nam." },
            { text: "认识你很高兴！", translation: "Rất vui được gặp bạn!" },
            { text: "你好吗？", translation: "Bạn khỏe không?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
  {
    id: "21000000-0000-0000-0000-000000000002",
    course_id: "11000000-0000-0000-0000-000000000001",
    title: "Số đếm tiếng Trung",
    description: "Học số đếm từ 1 đến 100 trong tiếng Trung",
    order_index: 2,
    lessons: [
      {
        id: "31000000-0000-0000-0000-000000000004",
        unit_id: "21000000-0000-0000-0000-000000000002",
        title: "数字 1-10 - Số đếm 1-10",
        type: "vocabulary",
        content: {
          words: [
            { word: "一", translation: "Một", phonetic: "yī", example: "我有一个苹果。" },
            { word: "二", translation: "Hai", phonetic: "èr", example: "我有二个哥哥。" },
            { word: "五", translation: "Năm", phonetic: "wǔ", example: "他五岁了。" },
            { word: "七", translation: "Bảy", phonetic: "qī", example: "一个星期有七天。" },
            { word: "十", translation: "Mười", phonetic: "shí", example: "我有十块钱。" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "31000000-0000-0000-0000-000000000005",
        unit_id: "21000000-0000-0000-0000-000000000002",
        title: "多少钱？ - Bao nhiêu tiền?",
        type: "listening",
        content: {
          audio_text:
            "请问，这个多少钱？这个十五块。那个呢？那个二十块。好的，我买这个。谢谢！",
          questions: [
            {
              question: "Món đồ đầu tiên giá bao nhiêu?",
              options: ["10 tệ", "15 tệ", "20 tệ", "25 tệ"],
              correct: 1,
            },
            {
              question: "Khách mua món nào?",
              options: ["Món 20 tệ", "Món 15 tệ", "Cả hai", "Không mua"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "31000000-0000-0000-0000-000000000006",
        unit_id: "21000000-0000-0000-0000-000000000002",
        title: "说数字 - Nói số",
        type: "speaking",
        content: {
          phrases: [
            { text: "这个多少钱？", translation: "Cái này bao nhiêu tiền?" },
            { text: "我要三个。", translation: "Tôi muốn ba cái." },
            { text: "一共五十块。", translation: "Tổng cộng năm mươi tệ." },
            { text: "我的电话号码是...", translation: "Số điện thoại của tôi là..." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
];

// ==================== KOREAN ====================

export const KOREAN_COURSES: MockCourse[] = [
  {
    id: "12000000-0000-0000-0000-000000000001",
    language: "korean",
    title: "Tiếng Hàn A1 - Khởi đầu",
    description:
      "Khóa học tiếng Hàn cơ bản dành cho người mới bắt đầu. Học chào hỏi, đồ ăn và giao tiếp đơn giản.",
    level: "A1",
    total_lessons: 5,
    duration_hours: 3,
    is_premium: false,
    order_index: 1,
    progress: 0,
    completed_lessons: 0,
  },
];

const KOREAN_UNITS: MockUnit[] = [
  {
    id: "22000000-0000-0000-0000-000000000001",
    course_id: "12000000-0000-0000-0000-000000000001",
    title: "Chào hỏi tiếng Hàn",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Hàn",
    order_index: 1,
    lessons: [
      {
        id: "32000000-0000-0000-0000-000000000001",
        unit_id: "22000000-0000-0000-0000-000000000001",
        title: "인사 - Lời chào",
        type: "vocabulary",
        content: {
          words: [
            { word: "안녕하세요", translation: "Xin chào", phonetic: "annyeonghaseyo", example: "안녕하세요, 저는 민수입니다." },
            { word: "감사합니다", translation: "Cảm ơn", phonetic: "gamsahamnida", example: "도와주셔서 감사합니다!" },
            { word: "안녕히 가세요", translation: "Tạm biệt (người đi)", phonetic: "annyeonghi gaseyo", example: "안녕히 가세요, 내일 만나요!" },
            { word: "죄송합니다", translation: "Xin lỗi", phonetic: "joesonghamnida", example: "죄송합니다, 늦었습니다." },
            { word: "네", translation: "Vâng / Dạ", phonetic: "ne", example: "네, 알겠습니다." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "32000000-0000-0000-0000-000000000002",
        unit_id: "22000000-0000-0000-0000-000000000001",
        title: "이름이 뭐예요? - Bạn tên gì?",
        type: "listening",
        content: {
          audio_text:
            "안녕하세요! 저는 김민수입니다. 이름이 뭐예요? 저는 박지영입니다. 만나서 반갑습니다!",
          questions: [
            {
              question: "Người nói đầu tiên tên gì?",
              options: ["Park Ji Young", "Kim Min Su", "Lee Jun Ho", "Choi Soo Jin"],
              correct: 1,
            },
            {
              question: "Người nói thứ hai họ gì?",
              options: ["Kim", "Lee", "Park", "Choi"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "32000000-0000-0000-0000-000000000003",
        unit_id: "22000000-0000-0000-0000-000000000001",
        title: "자기소개 - Giới thiệu bản thân",
        type: "speaking",
        content: {
          phrases: [
            { text: "저는 ...입니다.", translation: "Tôi là ..." },
            { text: "저는 베트남 사람입니다.", translation: "Tôi là người Việt Nam." },
            { text: "만나서 반갑습니다!", translation: "Rất vui được gặp bạn!" },
            { text: "잘 지내세요?", translation: "Bạn khỏe không?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
  {
    id: "22000000-0000-0000-0000-000000000002",
    course_id: "12000000-0000-0000-0000-000000000001",
    title: "Đồ ăn Hàn Quốc",
    description: "Học từ vựng về đồ ăn và cách gọi món bằng tiếng Hàn",
    order_index: 2,
    lessons: [
      {
        id: "32000000-0000-0000-0000-000000000004",
        unit_id: "22000000-0000-0000-0000-000000000002",
        title: "음식 - Đồ ăn",
        type: "vocabulary",
        content: {
          words: [
            { word: "밥", translation: "Cơm", phonetic: "bap", example: "밥 먹었어요?" },
            { word: "김치", translation: "Kim chi", phonetic: "gimchi", example: "김치는 맛있어요." },
            { word: "불고기", translation: "Thịt nướng Hàn Quốc", phonetic: "bulgogi", example: "불고기를 주세요." },
            { word: "물", translation: "Nước", phonetic: "mul", example: "물 한 잔 주세요." },
            { word: "커피", translation: "Cà phê", phonetic: "keopi", example: "커피 한 잔 마시고 싶어요." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "32000000-0000-0000-0000-000000000005",
        unit_id: "22000000-0000-0000-0000-000000000002",
        title: "식당에서 - Tại nhà hàng",
        type: "listening",
        content: {
          audio_text:
            "어서 오세요! 뭐 드시겠어요? 비빔밥 하나하고 김치찌개 하나 주세요. 음료는요? 콜라 두 잔 주세요. 네, 잠시만 기다려 주세요.",
          questions: [
            {
              question: "Khách gọi món gì?",
              options: ["Cơm trộn và canh kim chi", "Thịt nướng và cơm", "Mì lạnh và sushi", "Cháo và gà rán"],
              correct: 0,
            },
            {
              question: "Khách gọi mấy ly nước?",
              options: ["1 ly", "2 ly", "3 ly", "Không gọi"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "32000000-0000-0000-0000-000000000006",
        unit_id: "22000000-0000-0000-0000-000000000002",
        title: "주문하기 - Gọi món",
        type: "speaking",
        content: {
          phrases: [
            { text: "이거 주세요.", translation: "Cho tôi cái này." },
            { text: "메뉴 좀 주세요.", translation: "Cho tôi xem thực đơn." },
            { text: "이거 얼마예요?", translation: "Cái này bao nhiêu tiền?" },
            { text: "계산해 주세요.", translation: "Tính tiền giúp tôi." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
];

// ==================== JAPANESE ====================

export const JAPANESE_COURSES: MockCourse[] = [
  {
    id: "13000000-0000-0000-0000-000000000001",
    language: "japanese",
    title: "Tiếng Nhật A1 - Khởi đầu",
    description:
      "Khóa học tiếng Nhật cơ bản dành cho người mới bắt đầu. Học chào hỏi, gia đình và giao tiếp đơn giản.",
    level: "A1",
    total_lessons: 5,
    duration_hours: 3,
    is_premium: false,
    order_index: 1,
    progress: 0,
    completed_lessons: 0,
  },
];

const JAPANESE_UNITS: MockUnit[] = [
  {
    id: "23000000-0000-0000-0000-000000000001",
    course_id: "13000000-0000-0000-0000-000000000001",
    title: "Chào hỏi tiếng Nhật",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Nhật",
    order_index: 1,
    lessons: [
      {
        id: "33000000-0000-0000-0000-000000000001",
        unit_id: "23000000-0000-0000-0000-000000000001",
        title: "あいさつ - Lời chào",
        type: "vocabulary",
        content: {
          words: [
            { word: "こんにちは", translation: "Xin chào", phonetic: "konnichiwa", example: "こんにちは、お元気ですか？" },
            { word: "ありがとう", translation: "Cảm ơn", phonetic: "arigatou", example: "ありがとうございます！" },
            { word: "さようなら", translation: "Tạm biệt", phonetic: "sayounara", example: "さようなら、また明日！" },
            { word: "おはようございます", translation: "Chào buổi sáng", phonetic: "ohayou gozaimasu", example: "おはようございます、先生！" },
            { word: "すみません", translation: "Xin lỗi / Xin phép", phonetic: "sumimasen", example: "すみません、トイレはどこですか？" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "33000000-0000-0000-0000-000000000002",
        unit_id: "23000000-0000-0000-0000-000000000001",
        title: "お名前は？ - Tên bạn là gì?",
        type: "listening",
        content: {
          audio_text:
            "はじめまして、田中です。お名前は？山田です。山田さん、はじめまして。よろしくお願いします！",
          questions: [
            {
              question: "Người nói đầu tiên tên gì?",
              options: ["Yamada", "Tanaka", "Suzuki", "Sato"],
              correct: 1,
            },
            {
              question: "Người nói thứ hai tên gì?",
              options: ["Tanaka", "Suzuki", "Yamada", "Sato"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "33000000-0000-0000-0000-000000000003",
        unit_id: "23000000-0000-0000-0000-000000000001",
        title: "自己紹介 - Giới thiệu bản thân",
        type: "speaking",
        content: {
          phrases: [
            { text: "はじめまして、...です。", translation: "Xin chào, tôi là ..." },
            { text: "ベトナム人です。", translation: "Tôi là người Việt Nam." },
            { text: "よろしくお願いします。", translation: "Rất mong được giúp đỡ. (Rất vui được gặp)" },
            { text: "お元気ですか？", translation: "Bạn khỏe không?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
  {
    id: "23000000-0000-0000-0000-000000000002",
    course_id: "13000000-0000-0000-0000-000000000001",
    title: "Gia đình tiếng Nhật",
    description: "Học từ vựng về gia đình và cách giới thiệu gia đình bằng tiếng Nhật",
    order_index: 2,
    lessons: [
      {
        id: "33000000-0000-0000-0000-000000000004",
        unit_id: "23000000-0000-0000-0000-000000000002",
        title: "家族 - Gia đình",
        type: "vocabulary",
        content: {
          words: [
            { word: "お母さん", translation: "Mẹ", phonetic: "okaasan", example: "お母さんは料理が上手です。" },
            { word: "お父さん", translation: "Bố", phonetic: "otousan", example: "お父さんは会社員です。" },
            { word: "お姉さん", translation: "Chị gái", phonetic: "oneesan", example: "お姉さんは大学生です。" },
            { word: "弟", translation: "Em trai", phonetic: "otouto", example: "弟は十歳です。" },
            { word: "家族", translation: "Gia đình", phonetic: "kazoku", example: "私の家族は五人です。" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "33000000-0000-0000-0000-000000000005",
        unit_id: "23000000-0000-0000-0000-000000000002",
        title: "私の家族 - Gia đình tôi",
        type: "listening",
        content: {
          audio_text:
            "私の家族は四人です。父は先生です。母は看護師です。姉が一人います。私たちはハノイに住んでいます。",
          questions: [
            {
              question: "Gia đình người nói có mấy người?",
              options: ["3 người", "4 người", "5 người", "6 người"],
              correct: 1,
            },
            {
              question: "Bố của người nói làm nghề gì?",
              options: ["Bác sĩ", "Giáo viên", "Kỹ sư", "Y tá"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "33000000-0000-0000-0000-000000000006",
        unit_id: "23000000-0000-0000-0000-000000000002",
        title: "家族を紹介する - Giới thiệu gia đình",
        type: "speaking",
        content: {
          phrases: [
            { text: "私の家族は...人です。", translation: "Gia đình tôi có ... người." },
            { text: "母は優しいです。", translation: "Mẹ tôi rất hiền." },
            { text: "兄が二人います。", translation: "Tôi có hai anh trai." },
            { text: "家族が大好きです。", translation: "Tôi rất yêu gia đình." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
    ],
  },
];

// ==================== Combined exports ====================

/** All courses across all languages */
export const ALL_COURSES: MockCourse[] = [
  ...ENGLISH_COURSES,
  ...CHINESE_COURSES,
  ...KOREAN_COURSES,
  ...JAPANESE_COURSES,
];

/** All units across all languages */
export const ALL_MULTI_LANG_UNITS: MockUnit[] = [
  ...ENGLISH_UNITS,
  ...CHINESE_UNITS,
  ...KOREAN_UNITS,
  ...JAPANESE_UNITS,
];

/** Get units for any course across all languages */
export function getUnitsForCourse(courseId: string): MockUnit[] {
  return ALL_MULTI_LANG_UNITS.filter((u) => u.course_id === courseId);
}

/** Find a lesson by ID across all languages */
export function findLesson(lessonId: string): MockLesson | undefined {
  for (const unit of ALL_MULTI_LANG_UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

/** Find a course by ID across all languages */
export function findCourse(courseId: string): MockCourse | undefined {
  return ALL_COURSES.find((c) => c.id === courseId);
}

/** Get courses filtered by language */
export function getCoursesByLanguage(language: string): MockCourse[] {
  return ALL_COURSES.filter((c) => c.language === language);
}

// Re-export for backward compatibility
export { ENGLISH_COURSES } from "./english-courses";
export type { MockCourse, MockUnit, MockLesson } from "./english-courses";
