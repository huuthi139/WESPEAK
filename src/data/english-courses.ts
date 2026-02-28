// Mock data matching seed SQL for English courses
// Used as fallback when Supabase is not configured

import type { LessonType, LessonContent } from "@/types";

export interface MockCourse {
  id: string;
  language: string;
  title: string;
  description: string;
  level: string;
  total_lessons: number;
  duration_hours: number;
  is_premium: boolean;
  order_index: number;
  progress: number;
  completed_lessons: number;
}

export interface MockLesson {
  id: string;
  unit_id: string;
  title: string;
  type: LessonType;
  content: LessonContent;
  duration_minutes: number;
  xp_reward: number;
  order_index: number;
  progress: { completed: boolean; score: number | null } | null;
}

export interface MockUnit {
  id: string;
  course_id: string;
  title: string;
  description: string;
  order_index: number;
  lessons: MockLesson[];
}

export const ENGLISH_COURSES: MockCourse[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    language: "english",
    title: "Tiếng Anh A1 - Khởi đầu",
    description:
      "Khóa học tiếng Anh cơ bản dành cho người mới bắt đầu. Học chào hỏi, giới thiệu bản thân và giao tiếp đơn giản.",
    level: "A1",
    total_lessons: 40,
    duration_hours: 20,
    is_premium: false,
    order_index: 1,
    progress: 0,
    completed_lessons: 0,
  },
  {
    id: "10000000-0000-0000-0000-000000000002",
    language: "english",
    title: "Tiếng Anh A2 - Giao tiếp",
    description:
      "Nâng cao kỹ năng giao tiếp tiếng Anh. Học cách mua sắm, đi du lịch và nói chuyện hàng ngày.",
    level: "A2",
    total_lessons: 40,
    duration_hours: 20,
    is_premium: false,
    order_index: 2,
    progress: 0,
    completed_lessons: 0,
  },
];

// ==================== A1 Units & Lessons ====================

const A1_UNITS: MockUnit[] = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Chào hỏi & Giới thiệu",
    description: "Học cách chào hỏi và giới thiệu bản thân bằng tiếng Anh",
    order_index: 1,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000001",
        unit_id: "20000000-0000-0000-0000-000000000001",
        title: "Greetings - Lời chào",
        type: "vocabulary",
        content: {
          words: [
            { word: "Hello", translation: "Xin chào", phonetic: "/həˈloʊ/", example: "Hello, how are you?" },
            { word: "Goodbye", translation: "Tạm biệt", phonetic: "/ɡʊdˈbaɪ/", example: "Goodbye, see you tomorrow!" },
            { word: "Good morning", translation: "Chào buổi sáng", phonetic: "/ɡʊd ˈmɔːrnɪŋ/", example: "Good morning, teacher!" },
            { word: "Good night", translation: "Chúc ngủ ngon", phonetic: "/ɡʊd naɪt/", example: "Good night, sweet dreams." },
            { word: "Thank you", translation: "Cảm ơn", phonetic: "/θæŋk juː/", example: "Thank you very much!" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000002",
        unit_id: "20000000-0000-0000-0000-000000000001",
        title: "How are you? - Bạn khỏe không?",
        type: "listening",
        content: {
          audio_text: "Hi! My name is Anna. How are you today? I am fine, thank you. Nice to meet you!",
          questions: [
            { question: "Người nói tên gì?", options: ["Anna", "Amy", "Alice", "Alex"], correct: 0 },
            { question: "Người nói cảm thấy thế nào?", options: ["Buồn", "Khỏe", "Mệt", "Đói"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000003",
        unit_id: "20000000-0000-0000-0000-000000000001",
        title: "Introduce yourself - Giới thiệu bản thân",
        type: "speaking",
        content: {
          phrases: [
            { text: "My name is...", translation: "Tên tôi là..." },
            { text: "I am from Vietnam.", translation: "Tôi đến từ Việt Nam." },
            { text: "Nice to meet you!", translation: "Rất vui được gặp bạn!" },
            { text: "How are you?", translation: "Bạn khỏe không?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000004",
        unit_id: "20000000-0000-0000-0000-000000000001",
        title: "To be - Động từ To be",
        type: "grammar",
        content: {
          explanation: "Động từ TO BE (am/is/are) dùng để giới thiệu bản thân:\n- I am (I'm) → Tôi là\n- You are (You're) → Bạn là\n- He is (He's) / She is (She's) → Anh ấy / Cô ấy là",
          examples: ["I am a student.", "She is a teacher.", "They are friends."],
          exercises: [
            { question: "I ___ a student.", options: ["am", "is", "are", "be"], correct: 0 },
            { question: "She ___ from Korea.", options: ["am", "is", "are", "be"], correct: 1 },
            { question: "They ___ happy.", options: ["am", "is", "are", "be"], correct: 2 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000005",
        unit_id: "20000000-0000-0000-0000-000000000001",
        title: "Kiểm tra - Chào hỏi",
        type: "quiz",
        content: {
          questions: [
            { question: '"Xin chào" trong tiếng Anh là gì?', options: ["Goodbye", "Hello", "Sorry", "Thanks"], correct: 1 },
            { question: '"Nice to meet you" nghĩa là gì?', options: ["Tạm biệt", "Cảm ơn", "Rất vui được gặp bạn", "Xin lỗi"], correct: 2 },
            { question: "Chọn câu đúng:", options: ["I is student", "I am a student", "I are student", "I be student"], correct: 1 },
            { question: '"Good morning" dùng khi nào?', options: ["Buổi tối", "Buổi sáng", "Buổi trưa", "Khi ngủ"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Gia đình & Bạn bè",
    description: "Nói về gia đình và bạn bè",
    order_index: 2,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000006",
        unit_id: "20000000-0000-0000-0000-000000000002",
        title: "Family Members - Thành viên gia đình",
        type: "vocabulary",
        content: {
          words: [
            { word: "Mother", translation: "Mẹ", phonetic: "/ˈmʌðər/", example: "My mother is a doctor." },
            { word: "Father", translation: "Bố", phonetic: "/ˈfɑːðər/", example: "My father works in an office." },
            { word: "Sister", translation: "Chị/em gái", phonetic: "/ˈsɪstər/", example: "I have one sister." },
            { word: "Brother", translation: "Anh/em trai", phonetic: "/ˈbrʌðər/", example: "My brother is tall." },
            { word: "Family", translation: "Gia đình", phonetic: "/ˈfæməli/", example: "I love my family." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000007",
        unit_id: "20000000-0000-0000-0000-000000000002",
        title: "My Family - Gia đình tôi",
        type: "listening",
        content: {
          audio_text: "I have a big family. My father is a teacher. My mother is a nurse. I have two brothers and one sister. We live in Hanoi.",
          questions: [
            { question: "Bố của người nói làm nghề gì?", options: ["Bác sĩ", "Giáo viên", "Kỹ sư", "Y tá"], correct: 1 },
            { question: "Người nói có bao nhiêu anh/em trai?", options: ["1", "2", "3", "4"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000008",
        unit_id: "20000000-0000-0000-0000-000000000002",
        title: "Talk about family - Nói về gia đình",
        type: "speaking",
        content: {
          phrases: [
            { text: "I have two brothers.", translation: "Tôi có hai anh/em trai." },
            { text: "My mother is kind.", translation: "Mẹ tôi rất tốt bụng." },
            { text: "We are a happy family.", translation: "Chúng tôi là một gia đình hạnh phúc." },
            { text: "My sister is older than me.", translation: "Chị gái tôi lớn hơn tôi." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000009",
        unit_id: "20000000-0000-0000-0000-000000000002",
        title: "Possessive - Sở hữu cách",
        type: "grammar",
        content: {
          explanation: "Tính từ sở hữu trong tiếng Anh:\n- My (của tôi)\n- Your (của bạn)\n- His (của anh ấy)\n- Her (của cô ấy)\n- Our (của chúng tôi)\n- Their (của họ)",
          examples: ["This is my book.", "Her name is Lan.", "Their house is big."],
          exercises: [
            { question: "___ name is Minh. (tôi)", options: ["My", "Your", "His", "Her"], correct: 0 },
            { question: "This is ___ sister. (anh ấy)", options: ["my", "your", "his", "her"], correct: 2 },
            { question: "___ family is big. (chúng tôi)", options: ["My", "Your", "Our", "Their"], correct: 2 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000010",
        unit_id: "20000000-0000-0000-0000-000000000002",
        title: "Kiểm tra - Gia đình",
        type: "quiz",
        content: {
          questions: [
            { question: '"Mother" nghĩa là gì?', options: ["Bố", "Mẹ", "Chị gái", "Anh trai"], correct: 1 },
            { question: '"I have two ___" (em gái)', options: ["brothers", "sisters", "mothers", "fathers"], correct: 1 },
            { question: "Chọn đúng: ___ father is a doctor.", options: ["I", "Me", "My", "Mine"], correct: 2 },
            { question: '"Family" có nghĩa là:', options: ["Bạn bè", "Trường học", "Gia đình", "Công việc"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Số đếm & Thời gian",
    description: "Học số đếm, ngày tháng và giờ giấc",
    order_index: 3,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000011",
        unit_id: "20000000-0000-0000-0000-000000000003",
        title: "Numbers 1-20 - Số đếm",
        type: "vocabulary",
        content: {
          words: [
            { word: "One", translation: "Một", phonetic: "/wʌn/", example: "I have one cat." },
            { word: "Five", translation: "Năm", phonetic: "/faɪv/", example: "There are five apples." },
            { word: "Ten", translation: "Mười", phonetic: "/tɛn/", example: "I count to ten." },
            { word: "Fifteen", translation: "Mười lăm", phonetic: "/fɪfˈtiːn/", example: "She is fifteen years old." },
            { word: "Twenty", translation: "Hai mươi", phonetic: "/ˈtwɛnti/", example: "I have twenty books." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000012",
        unit_id: "20000000-0000-0000-0000-000000000003",
        title: "What time is it? - Mấy giờ rồi?",
        type: "listening",
        content: {
          audio_text: "Excuse me, what time is it? It is three o'clock. The meeting starts at five thirty. Please come before ten fifteen.",
          questions: [
            { question: "Bây giờ mấy giờ?", options: ["2 giờ", "3 giờ", "4 giờ", "5 giờ"], correct: 1 },
            { question: "Cuộc họp bắt đầu lúc mấy giờ?", options: ["3:00", "4:30", "5:30", "10:15"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000013",
        unit_id: "20000000-0000-0000-0000-000000000003",
        title: "Telling time - Nói giờ",
        type: "speaking",
        content: {
          phrases: [
            { text: "What time is it?", translation: "Mấy giờ rồi?" },
            { text: "It is seven o'clock.", translation: "Bây giờ là 7 giờ." },
            { text: "The class starts at nine.", translation: "Lớp học bắt đầu lúc 9 giờ." },
            { text: "I wake up at six thirty.", translation: "Tôi thức dậy lúc 6 giờ 30." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000014",
        unit_id: "20000000-0000-0000-0000-000000000003",
        title: "Days & Months - Ngày tháng",
        type: "grammar",
        content: {
          explanation: "Các ngày trong tuần:\n- Monday (Thứ Hai), Tuesday (Thứ Ba), Wednesday (Thứ Tư)\n- Thursday (Thứ Năm), Friday (Thứ Sáu)\n- Saturday (Thứ Bảy), Sunday (Chủ Nhật)\n\nDùng ON + ngày: on Monday, on Friday",
          examples: ["I go to school on Monday.", "The party is on Saturday.", "We rest on Sunday."],
          exercises: [
            { question: "Ngày nào sau Saturday?", options: ["Monday", "Friday", "Sunday", "Tuesday"], correct: 2 },
            { question: "I have English class ___ Wednesday.", options: ["in", "on", "at", "to"], correct: 1 },
            { question: '"Thứ Sáu" tiếng Anh là:', options: ["Thursday", "Friday", "Saturday", "Sunday"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000015",
        unit_id: "20000000-0000-0000-0000-000000000003",
        title: "Kiểm tra - Số & Thời gian",
        type: "quiz",
        content: {
          questions: [
            { question: '"Fifteen" là số mấy?', options: ["5", "10", "15", "50"], correct: 2 },
            { question: "3:30 đọc là:", options: ["Three thirty", "Three thirteen", "Thirteen three", "Thirty three"], correct: 0 },
            { question: "Ngày đầu tuần là:", options: ["Sunday", "Monday", "Saturday", "Friday"], correct: 1 },
            { question: '"I wake up ___ 6 AM"', options: ["in", "on", "at", "to"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000004",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Thức ăn & Đồ uống",
    description: "Từ vựng về thức ăn và cách gọi món",
    order_index: 4,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000016",
        unit_id: "20000000-0000-0000-0000-000000000004",
        title: "Food & Drinks - Đồ ăn thức uống",
        type: "vocabulary",
        content: {
          words: [
            { word: "Rice", translation: "Cơm", phonetic: "/raɪs/", example: "I eat rice every day." },
            { word: "Water", translation: "Nước", phonetic: "/ˈwɔːtər/", example: "Can I have some water?" },
            { word: "Coffee", translation: "Cà phê", phonetic: "/ˈkɔːfi/", example: "I drink coffee in the morning." },
            { word: "Chicken", translation: "Thịt gà", phonetic: "/ˈtʃɪkɪn/", example: "I like fried chicken." },
            { word: "Bread", translation: "Bánh mì", phonetic: "/brɛd/", example: "I have bread for breakfast." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000017",
        unit_id: "20000000-0000-0000-0000-000000000004",
        title: "At the restaurant - Tại nhà hàng",
        type: "listening",
        content: {
          audio_text: "Waiter: Good evening! What would you like to order? Customer: I would like chicken and rice, please. Waiter: Would you like something to drink? Customer: Yes, a glass of water, please. Waiter: Sure, coming right up!",
          questions: [
            { question: "Khách hàng gọi món gì?", options: ["Cá và cơm", "Gà và cơm", "Phở", "Bánh mì"], correct: 1 },
            { question: "Khách uống gì?", options: ["Cà phê", "Trà", "Nước", "Nước cam"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000018",
        unit_id: "20000000-0000-0000-0000-000000000004",
        title: "Ordering food - Gọi món",
        type: "speaking",
        content: {
          phrases: [
            { text: "I would like...", translation: "Tôi muốn..." },
            { text: "Can I have the menu?", translation: "Cho tôi xem thực đơn được không?" },
            { text: "How much is this?", translation: "Cái này bao nhiêu tiền?" },
            { text: "The bill, please.", translation: "Tính tiền giúp tôi." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000019",
        unit_id: "20000000-0000-0000-0000-000000000004",
        title: "Countable & Uncountable - Đếm được & Không đếm được",
        type: "grammar",
        content: {
          explanation: "Danh từ đếm được: dùng a/an, số đếm\n- a banana, two apples, three eggs\n\nDanh từ không đếm được: KHÔNG dùng a/an\n- water, rice, coffee, bread\n- Dùng: some water, a glass of water, a cup of coffee",
          examples: ["I want an apple.", "Can I have some water?", "Two cups of coffee, please."],
          exercises: [
            { question: "I want ___ apple.", options: ["a", "an", "some", "any"], correct: 1 },
            { question: "Can I have ___ water?", options: ["a", "an", "some", "two"], correct: 2 },
            { question: "She eats three ___.", options: ["rice", "bread", "egg", "eggs"], correct: 3 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000020",
        unit_id: "20000000-0000-0000-0000-000000000004",
        title: "Kiểm tra - Thức ăn",
        type: "quiz",
        content: {
          questions: [
            { question: '"Rice" nghĩa là gì?', options: ["Bánh mì", "Cơm", "Phở", "Mì"], correct: 1 },
            { question: '"Can I have some ___?" (nước)', options: ["water", "waters", "a water", "the water"], correct: 0 },
            { question: '"I would like" dùng khi:', options: ["Chào hỏi", "Gọi món lịch sự", "Tạm biệt", "Xin lỗi"], correct: 1 },
            { question: "Chọn đúng:", options: ["a coffee", "two coffee", "a cup of coffee", "an coffee"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 5: Màu sắc & Quần áo ----
  {
    id: "20000000-0000-0000-0000-000000000009",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Màu sắc & Quần áo",
    description: "Học tên màu sắc và quần áo hàng ngày",
    order_index: 5,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000041",
        unit_id: "20000000-0000-0000-0000-000000000009",
        title: "Colors - Màu sắc",
        type: "vocabulary",
        content: {
          words: [
            { word: "Red", translation: "Đỏ", phonetic: "/rɛd/", example: "I like the red dress." },
            { word: "Blue", translation: "Xanh dương", phonetic: "/bluː/", example: "The sky is blue." },
            { word: "Green", translation: "Xanh lá", phonetic: "/ɡriːn/", example: "The grass is green." },
            { word: "Yellow", translation: "Vàng", phonetic: "/ˈjɛloʊ/", example: "Bananas are yellow." },
            { word: "Black", translation: "Đen", phonetic: "/blæk/", example: "She wears a black hat." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000042",
        unit_id: "20000000-0000-0000-0000-000000000009",
        title: "What are you wearing? - Bạn mặc gì?",
        type: "listening",
        content: {
          audio_text: "Today I am wearing a white shirt and blue jeans. My shoes are black. I also have a red bag. My friend is wearing a green dress and brown shoes.",
          questions: [
            { question: "Người nói mặc áo màu gì?", options: ["Xanh", "Trắng", "Đỏ", "Đen"], correct: 1 },
            { question: "Bạn của người nói mặc gì?", options: ["Áo trắng", "Váy xanh lá", "Quần jean", "Áo đỏ"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000043",
        unit_id: "20000000-0000-0000-0000-000000000009",
        title: "Describing clothes - Mô tả quần áo",
        type: "speaking",
        content: {
          phrases: [
            { text: "I am wearing a blue shirt.", translation: "Tôi đang mặc áo xanh." },
            { text: "She has a beautiful red dress.", translation: "Cô ấy có chiếc váy đỏ đẹp." },
            { text: "What color is your bag?", translation: "Túi của bạn màu gì?" },
            { text: "I like your new shoes!", translation: "Tôi thích đôi giày mới của bạn!" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000044",
        unit_id: "20000000-0000-0000-0000-000000000009",
        title: "This / That / These / Those",
        type: "grammar",
        content: {
          explanation: "Đại từ chỉ định:\n- THIS: cái này (số ít, gần) → This is my bag.\n- THAT: cái kia (số ít, xa) → That is her car.\n- THESE: những cái này (số nhiều, gần) → These are my shoes.\n- THOSE: những cái kia (số nhiều, xa) → Those are nice.",
          examples: ["This shirt is beautiful.", "Those shoes are expensive.", "These colors are bright."],
          exercises: [
            { question: "___ is my new shirt. (gần, số ít)", options: ["This", "That", "These", "Those"], correct: 0 },
            { question: "___ shoes are too small. (gần, số nhiều)", options: ["This", "That", "These", "Those"], correct: 2 },
            { question: "Look at ___ bird over there! (xa, số ít)", options: ["this", "that", "these", "those"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000045",
        unit_id: "20000000-0000-0000-0000-000000000009",
        title: "Kiểm tra - Màu sắc & Quần áo",
        type: "quiz",
        content: {
          questions: [
            { question: '"Blue" nghĩa là:', options: ["Đỏ", "Xanh dương", "Vàng", "Xanh lá"], correct: 1 },
            { question: '"I am wearing" nghĩa là:', options: ["Tôi đang mặc", "Tôi muốn mua", "Tôi thích", "Tôi có"], correct: 0 },
            { question: "Chọn đúng: ___ are my books.", options: ["This", "That", "These", "It"], correct: 2 },
            { question: '"Shirt" nghĩa là:', options: ["Quần", "Áo sơ mi", "Giày", "Mũ"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 6: Nhà cửa & Phòng ốc ----
  {
    id: "20000000-0000-0000-0000-000000000010",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Nhà cửa & Phòng ốc",
    description: "Từ vựng về nhà cửa, phòng ốc và đồ vật trong nhà",
    order_index: 6,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000046",
        unit_id: "20000000-0000-0000-0000-000000000010",
        title: "Rooms in the house - Các phòng",
        type: "vocabulary",
        content: {
          words: [
            { word: "Kitchen", translation: "Nhà bếp", phonetic: "/ˈkɪtʃɪn/", example: "I cook in the kitchen." },
            { word: "Bedroom", translation: "Phòng ngủ", phonetic: "/ˈbɛdruːm/", example: "My bedroom is small." },
            { word: "Bathroom", translation: "Phòng tắm", phonetic: "/ˈbæθruːm/", example: "The bathroom is clean." },
            { word: "Living room", translation: "Phòng khách", phonetic: "/ˈlɪvɪŋ ruːm/", example: "We watch TV in the living room." },
            { word: "Garden", translation: "Vườn", phonetic: "/ˈɡɑːrdən/", example: "There are flowers in the garden." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000047",
        unit_id: "20000000-0000-0000-0000-000000000010",
        title: "My house - Nhà của tôi",
        type: "listening",
        content: {
          audio_text: "My house has three bedrooms and two bathrooms. The kitchen is big. I love the living room because it has a large sofa and a TV. There is also a small garden with many trees.",
          questions: [
            { question: "Nhà có bao nhiêu phòng ngủ?", options: ["2", "3", "4", "5"], correct: 1 },
            { question: "Người nói thích phòng nào nhất?", options: ["Bếp", "Phòng ngủ", "Phòng khách", "Phòng tắm"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000048",
        unit_id: "20000000-0000-0000-0000-000000000010",
        title: "Describing your home - Mô tả nhà",
        type: "speaking",
        content: {
          phrases: [
            { text: "I live in an apartment.", translation: "Tôi sống trong căn hộ." },
            { text: "My room has a bed and a desk.", translation: "Phòng tôi có giường và bàn học." },
            { text: "The kitchen is next to the living room.", translation: "Bếp ở cạnh phòng khách." },
            { text: "There is a big window in my room.", translation: "Phòng tôi có một cửa sổ lớn." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000049",
        unit_id: "20000000-0000-0000-0000-000000000010",
        title: "There is / There are",
        type: "grammar",
        content: {
          explanation: "There is / There are dùng để mô tả sự tồn tại:\n- There is + danh từ số ít: There is a cat.\n- There are + danh từ số nhiều: There are two cats.\n- Phủ định: There isn't / There aren't\n- Câu hỏi: Is there...? / Are there...?",
          examples: ["There is a lamp on the desk.", "There are three chairs in the room.", "Is there a garden?"],
          exercises: [
            { question: "There ___ a book on the table.", options: ["is", "are", "has", "have"], correct: 0 },
            { question: "There ___ many people in the park.", options: ["is", "are", "has", "have"], correct: 1 },
            { question: "___ there a supermarket near here?", options: ["Is", "Are", "Do", "Does"], correct: 0 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000050",
        unit_id: "20000000-0000-0000-0000-000000000010",
        title: "Kiểm tra - Nhà cửa",
        type: "quiz",
        content: {
          questions: [
            { question: '"Kitchen" nghĩa là:', options: ["Phòng ngủ", "Phòng khách", "Nhà bếp", "Phòng tắm"], correct: 2 },
            { question: '"There are" dùng với:', options: ["Số ít", "Số nhiều", "Không đếm được", "Động từ"], correct: 1 },
            { question: "Chọn đúng: ___ two cats in the garden.", options: ["There is", "There are", "There has", "It is"], correct: 1 },
            { question: '"I live in an apartment" nghĩa là:', options: ["Tôi thích căn hộ", "Tôi sống trong căn hộ", "Tôi mua căn hộ", "Tôi xây căn hộ"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 7: Thời tiết & Mùa ----
  {
    id: "20000000-0000-0000-0000-000000000011",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Thời tiết & Mùa",
    description: "Nói về thời tiết và các mùa trong năm",
    order_index: 7,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000051",
        unit_id: "20000000-0000-0000-0000-000000000011",
        title: "Weather - Thời tiết",
        type: "vocabulary",
        content: {
          words: [
            { word: "Sunny", translation: "Nắng", phonetic: "/ˈsʌni/", example: "It is sunny today." },
            { word: "Rainy", translation: "Mưa", phonetic: "/ˈreɪni/", example: "It is rainy outside." },
            { word: "Cold", translation: "Lạnh", phonetic: "/koʊld/", example: "Winter is very cold." },
            { word: "Hot", translation: "Nóng", phonetic: "/hɑːt/", example: "Summer is hot in Vietnam." },
            { word: "Wind", translation: "Gió", phonetic: "/wɪnd/", example: "The wind is strong today." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000052",
        unit_id: "20000000-0000-0000-0000-000000000011",
        title: "Weather forecast - Dự báo thời tiết",
        type: "listening",
        content: {
          audio_text: "Good morning! Here is the weather forecast. Today will be sunny with a high of 32 degrees. Tomorrow will be cloudy and rainy. Please bring an umbrella. The weekend will be cool and windy.",
          questions: [
            { question: "Hôm nay thời tiết thế nào?", options: ["Mưa", "Nắng", "Lạnh", "Có gió"], correct: 1 },
            { question: "Ngày mai cần mang theo gì?", options: ["Kính râm", "Áo khoác", "Ô/dù", "Mũ"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000053",
        unit_id: "20000000-0000-0000-0000-000000000011",
        title: "Talking about weather - Nói về thời tiết",
        type: "speaking",
        content: {
          phrases: [
            { text: "What's the weather like today?", translation: "Hôm nay thời tiết thế nào?" },
            { text: "It's hot and humid.", translation: "Trời nóng và ẩm." },
            { text: "I like autumn because it's cool.", translation: "Tôi thích mùa thu vì trời mát." },
            { text: "It's going to rain this afternoon.", translation: "Chiều nay trời sẽ mưa." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000054",
        unit_id: "20000000-0000-0000-0000-000000000011",
        title: "Like / Love / Hate + V-ing",
        type: "grammar",
        content: {
          explanation: "Sau LIKE, LOVE, HATE, ENJOY dùng V-ing:\n- I like swimming. (Tôi thích bơi)\n- She loves reading. (Cô ấy thích đọc sách)\n- He hates waiting. (Anh ấy ghét chờ đợi)\n- We enjoy cooking. (Chúng tôi thích nấu ăn)",
          examples: ["I love playing football.", "She hates getting up early.", "They enjoy traveling."],
          exercises: [
            { question: "I like ___ in the rain.", options: ["walk", "walking", "to walking", "walked"], correct: 1 },
            { question: "She enjoys ___ music.", options: ["listen", "listening", "to listen", "listens"], correct: 1 },
            { question: "He hates ___ homework.", options: ["do", "doing", "to doing", "does"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000055",
        unit_id: "20000000-0000-0000-0000-000000000011",
        title: "Kiểm tra - Thời tiết",
        type: "quiz",
        content: {
          questions: [
            { question: '"Rainy" nghĩa là:', options: ["Nắng", "Mưa", "Gió", "Lạnh"], correct: 1 },
            { question: '"What\'s the weather like?" hỏi về:', options: ["Giờ giấc", "Thời tiết", "Địa điểm", "Sức khỏe"], correct: 1 },
            { question: "I enjoy ___.", options: ["swim", "swimming", "to swim", "swam"], correct: 1 },
            { question: "Mùa nào nóng nhất ở Việt Nam?", options: ["Spring", "Summer", "Autumn", "Winter"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 8: Thói quen hàng ngày ----
  {
    id: "20000000-0000-0000-0000-000000000012",
    course_id: "10000000-0000-0000-0000-000000000001",
    title: "Thói quen hàng ngày",
    description: "Mô tả hoạt động hàng ngày và thời gian biểu",
    order_index: 8,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000056",
        unit_id: "20000000-0000-0000-0000-000000000012",
        title: "Daily activities - Hoạt động hàng ngày",
        type: "vocabulary",
        content: {
          words: [
            { word: "Wake up", translation: "Thức dậy", phonetic: "/weɪk ʌp/", example: "I wake up at 6 AM." },
            { word: "Breakfast", translation: "Bữa sáng", phonetic: "/ˈbrɛkfəst/", example: "I eat breakfast at 7." },
            { word: "Study", translation: "Học", phonetic: "/ˈstʌdi/", example: "I study English every day." },
            { word: "Exercise", translation: "Tập thể dục", phonetic: "/ˈɛksərsaɪz/", example: "I exercise in the morning." },
            { word: "Sleep", translation: "Ngủ", phonetic: "/sliːp/", example: "I sleep at 10 PM." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000057",
        unit_id: "20000000-0000-0000-0000-000000000012",
        title: "My daily routine - Thói quen của tôi",
        type: "listening",
        content: {
          audio_text: "I wake up at six thirty every morning. First, I brush my teeth and take a shower. Then I have breakfast at seven. I go to school at seven thirty. After school, I do my homework. In the evening, I watch TV and go to bed at ten.",
          questions: [
            { question: "Người nói thức dậy lúc mấy giờ?", options: ["6:00", "6:30", "7:00", "7:30"], correct: 1 },
            { question: "Buổi tối người nói làm gì?", options: ["Tập thể dục", "Đọc sách", "Xem TV", "Đi chơi"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000058",
        unit_id: "20000000-0000-0000-0000-000000000012",
        title: "Talking about routines - Nói về thói quen",
        type: "speaking",
        content: {
          phrases: [
            { text: "I usually wake up at 7 AM.", translation: "Tôi thường thức dậy lúc 7 giờ sáng." },
            { text: "I always have coffee in the morning.", translation: "Tôi luôn uống cà phê buổi sáng." },
            { text: "I sometimes go jogging after work.", translation: "Tôi thỉnh thoảng chạy bộ sau giờ làm." },
            { text: "I never skip breakfast.", translation: "Tôi không bao giờ bỏ bữa sáng." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000059",
        unit_id: "20000000-0000-0000-0000-000000000012",
        title: "Adverbs of frequency - Trạng từ chỉ tần suất",
        type: "grammar",
        content: {
          explanation: "Trạng từ chỉ tần suất (đặt trước động từ chính):\n- Always (luôn luôn) 100%\n- Usually (thường) 80%\n- Often (hay) 60%\n- Sometimes (thỉnh thoảng) 40%\n- Rarely (hiếm khi) 20%\n- Never (không bao giờ) 0%",
          examples: ["I always eat breakfast.", "She usually walks to school.", "They never watch horror movies."],
          exercises: [
            { question: "I ___ drink coffee. (luôn luôn)", options: ["always", "never", "sometimes", "rarely"], correct: 0 },
            { question: "She ___ late for class. (không bao giờ)", options: ["always", "often", "sometimes", "never"], correct: 3 },
            { question: "Đặt trạng từ đúng vị trí: He is ___ tired.", options: ["always", "alway", "all ways", "all way"], correct: 0 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000060",
        unit_id: "20000000-0000-0000-0000-000000000012",
        title: "Kiểm tra - Thói quen",
        type: "quiz",
        content: {
          questions: [
            { question: '"Wake up" nghĩa là:', options: ["Đi ngủ", "Thức dậy", "Tập thể dục", "Ăn sáng"], correct: 1 },
            { question: '"I usually study at night" - "usually" nghĩa là:', options: ["Luôn luôn", "Không bao giờ", "Thường", "Hiếm khi"], correct: 2 },
            { question: "Chọn đúng: She ___ goes to bed late.", options: ["never", "ever", "neverly", "none"], correct: 0 },
            { question: '"Daily routine" nghĩa là:', options: ["Bài tập hàng ngày", "Thói quen hàng ngày", "Lịch trình", "Kế hoạch"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
];

// ==================== A2 Units & Lessons ====================

const A2_UNITS: MockUnit[] = [
  {
    id: "20000000-0000-0000-0000-000000000005",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Du lịch & Phương hướng",
    description: "Hỏi đường và nói về du lịch",
    order_index: 1,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000021",
        unit_id: "20000000-0000-0000-0000-000000000005",
        title: "Travel Vocabulary - Từ vựng du lịch",
        type: "vocabulary",
        content: {
          words: [
            { word: "Airport", translation: "Sân bay", phonetic: "/ˈɛrpɔːrt/", example: "We arrived at the airport early." },
            { word: "Hotel", translation: "Khách sạn", phonetic: "/hoʊˈtɛl/", example: "The hotel is near the beach." },
            { word: "Passport", translation: "Hộ chiếu", phonetic: "/ˈpæspɔːrt/", example: "Don't forget your passport!" },
            { word: "Ticket", translation: "Vé", phonetic: "/ˈtɪkɪt/", example: "I bought a train ticket." },
            { word: "Luggage", translation: "Hành lý", phonetic: "/ˈlʌɡɪdʒ/", example: "My luggage is heavy." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000022",
        unit_id: "20000000-0000-0000-0000-000000000005",
        title: "Asking for directions - Hỏi đường",
        type: "listening",
        content: {
          audio_text: "Excuse me, how do I get to the train station? Go straight for two blocks, then turn left. The station is on your right, next to the park. It takes about ten minutes on foot.",
          questions: [
            { question: "Người hỏi muốn đi đâu?", options: ["Bệnh viện", "Ga tàu", "Công viên", "Sân bay"], correct: 1 },
            { question: "Đi bộ mất bao lâu?", options: ["5 phút", "10 phút", "15 phút", "20 phút"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000023",
        unit_id: "20000000-0000-0000-0000-000000000005",
        title: "At the hotel - Tại khách sạn",
        type: "speaking",
        content: {
          phrases: [
            { text: "I have a reservation.", translation: "Tôi đã đặt phòng." },
            { text: "Can I check in?", translation: "Tôi có thể nhận phòng không?" },
            { text: "Where is the elevator?", translation: "Thang máy ở đâu?" },
            { text: "What time is checkout?", translation: "Mấy giờ trả phòng?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000024",
        unit_id: "20000000-0000-0000-0000-000000000005",
        title: "Prepositions of place - Giới từ chỉ nơi chốn",
        type: "grammar",
        content: {
          explanation: "Giới từ chỉ vị trí:\n- IN: trong (in the room, in Vietnam)\n- ON: trên (on the table, on the left)\n- AT: tại (at the station, at home)\n- NEXT TO: bên cạnh\n- BETWEEN: ở giữa\n- OPPOSITE: đối diện",
          examples: ["The bank is next to the hotel.", "Turn left at the traffic light.", "The shop is between the park and the school."],
          exercises: [
            { question: "The cat is ___ the box.", options: ["in", "on", "at", "to"], correct: 0 },
            { question: "I'll meet you ___ the station.", options: ["in", "on", "at", "between"], correct: 2 },
            { question: "The park is ___ the museum.", options: ["in", "between", "at", "next to"], correct: 3 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000025",
        unit_id: "20000000-0000-0000-0000-000000000005",
        title: "Kiểm tra - Du lịch",
        type: "quiz",
        content: {
          questions: [
            { question: '"Passport" nghĩa là gì?', options: ["Vé máy bay", "Hộ chiếu", "Hành lý", "Bản đồ"], correct: 1 },
            { question: '"Turn left" nghĩa là:', options: ["Rẽ phải", "Đi thẳng", "Rẽ trái", "Quay lại"], correct: 2 },
            { question: '"The hotel is ___ the beach."', options: ["in", "at", "on", "near"], correct: 3 },
            { question: '"I have a reservation" dùng khi:', options: ["Mua vé", "Nhận phòng", "Hỏi đường", "Đổi tiền"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000006",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Mua sắm",
    description: "Mua sắm và trả giá bằng tiếng Anh",
    order_index: 2,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000026",
        unit_id: "20000000-0000-0000-0000-000000000006",
        title: "Shopping Words - Từ vựng mua sắm",
        type: "vocabulary",
        content: {
          words: [
            { word: "Price", translation: "Giá", phonetic: "/praɪs/", example: "What is the price of this shirt?" },
            { word: "Cheap", translation: "Rẻ", phonetic: "/tʃiːp/", example: "This bag is cheap." },
            { word: "Expensive", translation: "Đắt", phonetic: "/ɪkˈspɛnsɪv/", example: "That watch is too expensive." },
            { word: "Size", translation: "Kích cỡ", phonetic: "/saɪz/", example: "What size do you wear?" },
            { word: "Discount", translation: "Giảm giá", phonetic: "/ˈdɪskaʊnt/", example: "Is there a discount?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000027",
        unit_id: "20000000-0000-0000-0000-000000000006",
        title: "At the shop - Tại cửa hàng",
        type: "listening",
        content: {
          audio_text: "Customer: Excuse me, how much is this dress? Seller: It's fifty dollars. Customer: That's a bit expensive. Do you have a smaller size? Seller: Yes, let me check. Here you go, size S. Customer: Great, I'll take it!",
          questions: [
            { question: "Chiếc váy giá bao nhiêu?", options: ["30 đô", "40 đô", "50 đô", "60 đô"], correct: 2 },
            { question: "Khách muốn size gì?", options: ["Size L", "Size M", "Size S", "Size XL"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000028",
        unit_id: "20000000-0000-0000-0000-000000000006",
        title: "Bargaining - Trả giá",
        type: "speaking",
        content: {
          phrases: [
            { text: "How much is this?", translation: "Cái này bao nhiêu?" },
            { text: "That's too expensive!", translation: "Đắt quá!" },
            { text: "Can you give me a discount?", translation: "Bạn có thể giảm giá không?" },
            { text: "I'll take it.", translation: "Tôi lấy cái này." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000029",
        unit_id: "20000000-0000-0000-0000-000000000006",
        title: "Comparatives - So sánh hơn",
        type: "grammar",
        content: {
          explanation: "So sánh hơn trong tiếng Anh:\n- Tính từ ngắn: thêm -er → cheaper, bigger, taller\n- Tính từ dài: more + adj → more expensive, more beautiful\n- Bất quy tắc: good → better, bad → worse",
          examples: ["This shirt is cheaper than that one.", "The red bag is more expensive.", "This quality is better."],
          exercises: [
            { question: "This is ___ than that. (cheap)", options: ["cheap", "cheaper", "cheapest", "more cheap"], correct: 1 },
            { question: "She is ___ than me. (tall)", options: ["tall", "taller", "tallest", "more tall"], correct: 1 },
            { question: "This phone is ___ than that one. (expensive)", options: ["expensiver", "more expensive", "most expensive", "expensive"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000030",
        unit_id: "20000000-0000-0000-0000-000000000006",
        title: "Kiểm tra - Mua sắm",
        type: "quiz",
        content: {
          questions: [
            { question: '"Discount" nghĩa là:', options: ["Tăng giá", "Giảm giá", "Đổi trả", "Thanh toán"], correct: 1 },
            { question: '"How much is this?" hỏi về:', options: ["Kích cỡ", "Màu sắc", "Giá tiền", "Chất liệu"], correct: 2 },
            { question: '"Cheaper" là so sánh hơn của:', options: ["cheap", "dear", "expense", "cost"], correct: 0 },
            { question: '"I\'ll take it" nghĩa là:', options: ["Tôi không lấy", "Tôi sẽ lấy cái này", "Tôi đổi cái khác", "Tôi trả lại"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000007",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Công việc & Nghề nghiệp",
    description: "Nói về công việc và phỏng vấn",
    order_index: 3,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000031",
        unit_id: "20000000-0000-0000-0000-000000000007",
        title: "Jobs - Nghề nghiệp",
        type: "vocabulary",
        content: {
          words: [
            { word: "Doctor", translation: "Bác sĩ", phonetic: "/ˈdɑːktər/", example: "She is a doctor at the hospital." },
            { word: "Engineer", translation: "Kỹ sư", phonetic: "/ˌɛndʒɪˈnɪr/", example: "He works as an engineer." },
            { word: "Teacher", translation: "Giáo viên", phonetic: "/ˈtiːtʃər/", example: "My teacher is very kind." },
            { word: "Office", translation: "Văn phòng", phonetic: "/ˈɔːfɪs/", example: "I work in an office." },
            { word: "Salary", translation: "Lương", phonetic: "/ˈsæləri/", example: "The salary is good." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000032",
        unit_id: "20000000-0000-0000-0000-000000000007",
        title: "Job Interview - Phỏng vấn",
        type: "listening",
        content: {
          audio_text: "Interviewer: Tell me about yourself. Candidate: I graduated from university last year. I studied computer science. I have worked as an intern for six months. Interviewer: Why do you want this job? Candidate: I am passionate about technology and want to grow my career.",
          questions: [
            { question: "Ứng viên học ngành gì?", options: ["Kinh tế", "Y khoa", "Khoa học máy tính", "Luật"], correct: 2 },
            { question: "Ứng viên đã thực tập bao lâu?", options: ["3 tháng", "6 tháng", "1 năm", "2 năm"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000033",
        unit_id: "20000000-0000-0000-0000-000000000007",
        title: "At work - Tại nơi làm việc",
        type: "speaking",
        content: {
          phrases: [
            { text: "What do you do for a living?", translation: "Bạn làm nghề gì?" },
            { text: "I work as a software developer.", translation: "Tôi làm lập trình viên." },
            { text: "I have a meeting at 2 PM.", translation: "Tôi có cuộc họp lúc 2 giờ chiều." },
            { text: "Can you send me the report?", translation: "Bạn gửi báo cáo cho tôi được không?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000034",
        unit_id: "20000000-0000-0000-0000-000000000007",
        title: "Present Simple vs Continuous",
        type: "grammar",
        content: {
          explanation: "Present Simple: thói quen, sự thật\n- I work every day. She teaches English.\n\nPresent Continuous: đang xảy ra\n- I am working now. She is teaching a class.\n\nDấu hiệu:\n- Simple: always, usually, every day\n- Continuous: now, right now, at the moment",
          examples: ["I usually start work at 8 AM.", "I am working on a project right now.", "She teaches math. She is teaching now."],
          exercises: [
            { question: "She ___ English every day. (teach)", options: ["teach", "teaches", "is teaching", "teaching"], correct: 1 },
            { question: "I ___ a report right now. (write)", options: ["write", "writes", "am writing", "writing"], correct: 2 },
            { question: "They usually ___ at 6 PM.", options: ["finish", "finishes", "are finishing", "finishing"], correct: 0 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000035",
        unit_id: "20000000-0000-0000-0000-000000000007",
        title: "Kiểm tra - Công việc",
        type: "quiz",
        content: {
          questions: [
            { question: '"Engineer" nghĩa là:', options: ["Giáo viên", "Bác sĩ", "Kỹ sư", "Luật sư"], correct: 2 },
            { question: '"What do you do?" hỏi về:', options: ["Sở thích", "Nghề nghiệp", "Tuổi tác", "Quê quán"], correct: 1 },
            { question: '"I ___ at 8 AM every day." (bắt đầu)', options: ["start", "starts", "am starting", "starting"], correct: 0 },
            { question: "Chọn Present Continuous:", options: ["I work here.", "I am working now.", "I worked yesterday.", "I will work."], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  {
    id: "20000000-0000-0000-0000-000000000008",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Sức khỏe & Bệnh viện",
    description: "Mô tả triệu chứng và đi khám bệnh",
    order_index: 4,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000036",
        unit_id: "20000000-0000-0000-0000-000000000008",
        title: "Health Words - Từ vựng sức khỏe",
        type: "vocabulary",
        content: {
          words: [
            { word: "Headache", translation: "Đau đầu", phonetic: "/ˈhɛdeɪk/", example: "I have a terrible headache." },
            { word: "Fever", translation: "Sốt", phonetic: "/ˈfiːvər/", example: "She has a high fever." },
            { word: "Medicine", translation: "Thuốc", phonetic: "/ˈmɛdɪsɪn/", example: "Take this medicine twice a day." },
            { word: "Hospital", translation: "Bệnh viện", phonetic: "/ˈhɑːspɪtl/", example: "He went to the hospital." },
            { word: "Cough", translation: "Ho", phonetic: "/kɔːf/", example: "I have a bad cough." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000037",
        unit_id: "20000000-0000-0000-0000-000000000008",
        title: "At the doctor - Khám bệnh",
        type: "listening",
        content: {
          audio_text: "Doctor: What seems to be the problem? Patient: I have a headache and a sore throat. Doctor: How long have you had these symptoms? Patient: For about three days. Doctor: Let me check. You have a cold. Take this medicine and rest for two days.",
          questions: [
            { question: "Bệnh nhân bị gì?", options: ["Đau bụng", "Đau đầu và đau họng", "Gãy tay", "Đau lưng"], correct: 1 },
            { question: "Bác sĩ chẩn đoán bệnh gì?", options: ["Cúm", "Cảm lạnh", "Dị ứng", "Viêm phổi"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000038",
        unit_id: "20000000-0000-0000-0000-000000000008",
        title: "Describing symptoms - Mô tả triệu chứng",
        type: "speaking",
        content: {
          phrases: [
            { text: "I don't feel well.", translation: "Tôi không khỏe." },
            { text: "I have a stomachache.", translation: "Tôi bị đau bụng." },
            { text: "I need to see a doctor.", translation: "Tôi cần gặp bác sĩ." },
            { text: "How often should I take this medicine?", translation: "Tôi nên uống thuốc này bao lâu một lần?" },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000039",
        unit_id: "20000000-0000-0000-0000-000000000008",
        title: "Should & Must - Lời khuyên",
        type: "grammar",
        content: {
          explanation: "SHOULD: nên (lời khuyên)\n- You should rest. (Bạn nên nghỉ ngơi)\n- You shouldn't eat too much. (Bạn không nên ăn nhiều)\n\nMUST: phải (bắt buộc)\n- You must take medicine. (Bạn phải uống thuốc)\n- You must not skip meals. (Bạn không được bỏ bữa)",
          examples: ["You should drink more water.", "You must see a doctor.", "You shouldn't stay up late."],
          exercises: [
            { question: "You ___ rest more. (lời khuyên)", options: ["should", "must", "can", "will"], correct: 0 },
            { question: "You ___ take this medicine. (bắt buộc)", options: ["should", "must", "can", "might"], correct: 1 },
            { question: "You ___ smoke here. (cấm)", options: ["should", "shouldn't", "must not", "don't"], correct: 2 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000040",
        unit_id: "20000000-0000-0000-0000-000000000008",
        title: "Kiểm tra - Sức khỏe",
        type: "quiz",
        content: {
          questions: [
            { question: '"Fever" nghĩa là:', options: ["Ho", "Sốt", "Đau đầu", "Dị ứng"], correct: 1 },
            { question: '"I don\'t feel well" nghĩa là:', options: ["Tôi khỏe", "Tôi không khỏe", "Tôi đói", "Tôi vui"], correct: 1 },
            { question: '"You should rest" nghĩa là:', options: ["Bạn phải chạy", "Bạn nên nghỉ", "Bạn phải đi", "Bạn nên ăn"], correct: 1 },
            { question: "Khi bị ốm nói:", options: ["I am hungry", "I am happy", "I need a doctor", "I want to play"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 5: Giải trí ----
  {
    id: "20000000-0000-0000-0000-000000000013",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Giải trí & Sở thích",
    description: "Nói về sở thích, phim ảnh và giải trí",
    order_index: 5,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000061",
        unit_id: "20000000-0000-0000-0000-000000000013",
        title: "Entertainment - Giải trí",
        type: "vocabulary",
        content: {
          words: [
            { word: "Movie", translation: "Phim", phonetic: "/ˈmuːvi/", example: "Let's watch a movie tonight." },
            { word: "Concert", translation: "Buổi hòa nhạc", phonetic: "/ˈkɑːnsərt/", example: "I went to a concert last week." },
            { word: "Hobby", translation: "Sở thích", phonetic: "/ˈhɑːbi/", example: "My hobby is painting." },
            { word: "Game", translation: "Trò chơi", phonetic: "/ɡeɪm/", example: "He plays video games." },
            { word: "Festival", translation: "Lễ hội", phonetic: "/ˈfɛstɪvəl/", example: "The music festival was amazing." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000062",
        unit_id: "20000000-0000-0000-0000-000000000013",
        title: "Weekend plans - Kế hoạch cuối tuần",
        type: "listening",
        content: {
          audio_text: "A: What are you doing this weekend? B: I'm going to see a movie on Saturday afternoon. Then on Sunday, I'll play tennis with my friends. What about you? A: I'm going to a cooking class. I really enjoy learning new recipes.",
          questions: [
            { question: "B làm gì vào thứ Bảy?", options: ["Chơi tennis", "Xem phim", "Nấu ăn", "Đi mua sắm"], correct: 1 },
            { question: "A thích học gì?", options: ["Tennis", "Phim", "Công thức nấu ăn", "Nhạc"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000063",
        unit_id: "20000000-0000-0000-0000-000000000013",
        title: "Talking about hobbies - Nói về sở thích",
        type: "speaking",
        content: {
          phrases: [
            { text: "What do you like to do in your free time?", translation: "Bạn thích làm gì vào thời gian rảnh?" },
            { text: "I'm really into photography.", translation: "Tôi rất đam mê nhiếp ảnh." },
            { text: "Have you seen the new Marvel movie?", translation: "Bạn đã xem phim Marvel mới chưa?" },
            { text: "I prefer reading books to watching TV.", translation: "Tôi thích đọc sách hơn xem TV." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000064",
        unit_id: "20000000-0000-0000-0000-000000000013",
        title: "Going to (future plans) - Kế hoạch",
        type: "grammar",
        content: {
          explanation: "BE GOING TO dùng cho kế hoạch đã quyết định:\n- I am going to watch a movie. (Tôi sẽ xem phim)\n- She is going to travel to Japan. (Cô ấy sẽ đi Nhật)\n- We are going to have a party. (Chúng tôi sẽ tổ chức tiệc)\n\nCâu hỏi: Are you going to...?",
          examples: ["I'm going to learn guitar.", "They're going to visit the museum.", "Are you going to join us?"],
          exercises: [
            { question: "I ___ going to play football tomorrow.", options: ["am", "is", "are", "be"], correct: 0 },
            { question: "She ___ going to buy a new phone.", options: ["am", "is", "are", "be"], correct: 1 },
            { question: "___ you going to come to the party?", options: ["Am", "Is", "Are", "Do"], correct: 2 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000065",
        unit_id: "20000000-0000-0000-0000-000000000013",
        title: "Kiểm tra - Giải trí",
        type: "quiz",
        content: {
          questions: [
            { question: '"Hobby" nghĩa là:', options: ["Công việc", "Sở thích", "Bài tập", "Phim"], correct: 1 },
            { question: '"I\'m going to" dùng khi:', options: ["Nói về quá khứ", "Nói về kế hoạch", "Nói về thói quen", "Ra lệnh"], correct: 1 },
            { question: '"I prefer A to B" nghĩa là:', options: ["Tôi ghét A", "Tôi thích A hơn B", "Tôi thích B hơn A", "Tôi không thích cả hai"], correct: 1 },
            { question: "Chọn đúng: We ___ going to have dinner at 7.", options: ["am", "is", "are", "be"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 6: Công nghệ ----
  {
    id: "20000000-0000-0000-0000-000000000014",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Công nghệ & Internet",
    description: "Từ vựng công nghệ và internet trong đời sống",
    order_index: 6,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000066",
        unit_id: "20000000-0000-0000-0000-000000000014",
        title: "Technology words - Từ vựng công nghệ",
        type: "vocabulary",
        content: {
          words: [
            { word: "Smartphone", translation: "Điện thoại thông minh", phonetic: "/ˈsmɑːrtfoʊn/", example: "Everyone has a smartphone now." },
            { word: "Password", translation: "Mật khẩu", phonetic: "/ˈpæswɜːrd/", example: "Don't share your password." },
            { word: "Download", translation: "Tải xuống", phonetic: "/ˈdaʊnloʊd/", example: "I downloaded a new app." },
            { word: "Website", translation: "Trang web", phonetic: "/ˈwɛbsaɪt/", example: "Visit our website for more info." },
            { word: "Social media", translation: "Mạng xã hội", phonetic: "/ˈsoʊʃəl ˈmiːdiə/", example: "She posts on social media daily." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000067",
        unit_id: "20000000-0000-0000-0000-000000000014",
        title: "Tech problems - Vấn đề công nghệ",
        type: "listening",
        content: {
          audio_text: "A: My phone is so slow! I can't open any apps. B: When did you last update it? A: I don't remember. Maybe six months ago. B: You should update the software. Also, try deleting apps you don't use. That will free up space.",
          questions: [
            { question: "Điện thoại bị vấn đề gì?", options: ["Hết pin", "Chạy chậm", "Bị rơi", "Mất sóng"], correct: 1 },
            { question: "B khuyên A nên làm gì?", options: ["Mua điện thoại mới", "Cập nhật phần mềm", "Sạc pin", "Khởi động lại"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000068",
        unit_id: "20000000-0000-0000-0000-000000000014",
        title: "Using technology - Sử dụng công nghệ",
        type: "speaking",
        content: {
          phrases: [
            { text: "Can you send me the link?", translation: "Bạn gửi link cho tôi được không?" },
            { text: "I spend too much time on social media.", translation: "Tôi dành quá nhiều thời gian trên mạng xã hội." },
            { text: "How do I connect to Wi-Fi?", translation: "Làm sao kết nối Wi-Fi?" },
            { text: "I need to charge my phone.", translation: "Tôi cần sạc điện thoại." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000069",
        unit_id: "20000000-0000-0000-0000-000000000014",
        title: "Past Simple - Quá khứ đơn",
        type: "grammar",
        content: {
          explanation: "Thì quá khứ đơn diễn tả hành động đã xảy ra:\n- Động từ có quy tắc: thêm -ed → played, watched, downloaded\n- Động từ bất quy tắc: go→went, buy→bought, see→saw\n- Phủ định: didn't + V nguyên mẫu\n- Câu hỏi: Did + S + V nguyên mẫu?",
          examples: ["I bought a new laptop yesterday.", "She didn't watch the movie.", "Did you download the app?"],
          exercises: [
            { question: "I ___ a new phone last week. (buy)", options: ["buy", "buyed", "bought", "buying"], correct: 2 },
            { question: "She ___ to the concert. (not go)", options: ["didn't go", "didn't went", "not go", "don't go"], correct: 0 },
            { question: "___ you see the email?", options: ["Do", "Does", "Did", "Are"], correct: 2 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000070",
        unit_id: "20000000-0000-0000-0000-000000000014",
        title: "Kiểm tra - Công nghệ",
        type: "quiz",
        content: {
          questions: [
            { question: '"Download" nghĩa là:', options: ["Tải lên", "Tải xuống", "Xóa", "Cài đặt"], correct: 1 },
            { question: '"I bought" là quá khứ của:', options: ["bring", "buy", "build", "break"], correct: 1 },
            { question: "She ___ the report yesterday.", options: ["send", "sends", "sent", "sended"], correct: 2 },
            { question: '"Social media" nghĩa là:', options: ["Tin nhắn", "Email", "Mạng xã hội", "Trò chơi"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 7: Trải nghiệm quá khứ ----
  {
    id: "20000000-0000-0000-0000-000000000015",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Trải nghiệm & Kỷ niệm",
    description: "Kể về trải nghiệm và kỷ niệm trong quá khứ",
    order_index: 7,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000071",
        unit_id: "20000000-0000-0000-0000-000000000015",
        title: "Life events - Sự kiện cuộc sống",
        type: "vocabulary",
        content: {
          words: [
            { word: "Birthday", translation: "Sinh nhật", phonetic: "/ˈbɜːrθdeɪ/", example: "My birthday is in March." },
            { word: "Wedding", translation: "Đám cưới", phonetic: "/ˈwɛdɪŋ/", example: "The wedding was beautiful." },
            { word: "Childhood", translation: "Thời thơ ấu", phonetic: "/ˈtʃaɪldhʊd/", example: "I had a happy childhood." },
            { word: "Graduation", translation: "Tốt nghiệp", phonetic: "/ˌɡrædʒuˈeɪʃən/", example: "Graduation day was exciting." },
            { word: "Memory", translation: "Kỷ niệm", phonetic: "/ˈmɛməri/", example: "I have many happy memories." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000072",
        unit_id: "20000000-0000-0000-0000-000000000015",
        title: "A memorable trip - Chuyến đi đáng nhớ",
        type: "listening",
        content: {
          audio_text: "Last summer, I went to Da Nang with my family. We stayed at a hotel near the beach for five days. We visited the Golden Bridge and ate lots of seafood. It was the best vacation I ever had. I want to go back next year.",
          questions: [
            { question: "Người nói đi đâu?", options: ["Hà Nội", "Đà Nẵng", "Sài Gòn", "Huế"], correct: 1 },
            { question: "Họ ở bao nhiêu ngày?", options: ["3 ngày", "4 ngày", "5 ngày", "7 ngày"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000073",
        unit_id: "20000000-0000-0000-0000-000000000015",
        title: "Telling stories - Kể chuyện",
        type: "speaking",
        content: {
          phrases: [
            { text: "Last year, I traveled to Thailand.", translation: "Năm ngoái, tôi đi du lịch Thái Lan." },
            { text: "When I was a child, I lived in the countryside.", translation: "Khi tôi còn nhỏ, tôi sống ở nông thôn." },
            { text: "It was an unforgettable experience.", translation: "Đó là trải nghiệm không thể quên." },
            { text: "I will never forget that day.", translation: "Tôi sẽ không bao giờ quên ngày hôm đó." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000074",
        unit_id: "20000000-0000-0000-0000-000000000015",
        title: "Past Continuous - Quá khứ tiếp diễn",
        type: "grammar",
        content: {
          explanation: "Past Continuous diễn tả hành động đang xảy ra tại một thời điểm trong quá khứ:\n- was/were + V-ing\n- I was studying when she called.\n- They were playing football at 5 PM.\n\nDùng với WHEN + Past Simple:\n- I was cooking when the phone rang.",
          examples: ["She was reading a book at 9 PM.", "We were watching TV when the lights went out.", "What were you doing yesterday evening?"],
          exercises: [
            { question: "I ___ TV when she arrived. (watch)", options: ["watch", "watched", "was watching", "watching"], correct: 2 },
            { question: "They ___ football at 3 PM. (play)", options: ["play", "played", "were playing", "playing"], correct: 2 },
            { question: "What ___ you doing at 8 PM?", options: ["was", "were", "did", "are"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000075",
        unit_id: "20000000-0000-0000-0000-000000000015",
        title: "Kiểm tra - Trải nghiệm",
        type: "quiz",
        content: {
          questions: [
            { question: '"Wedding" nghĩa là:', options: ["Sinh nhật", "Đám cưới", "Tốt nghiệp", "Lễ hội"], correct: 1 },
            { question: '"I was studying" là thì:', options: ["Hiện tại đơn", "Quá khứ đơn", "Quá khứ tiếp diễn", "Tương lai"], correct: 2 },
            { question: "She ___ when I called.", options: ["sleep", "slept", "was sleeping", "is sleeping"], correct: 2 },
            { question: '"Unforgettable" nghĩa là:', options: ["Bình thường", "Không thể quên", "Buồn chán", "Vui vẻ"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
  // ---- Unit 8: Kế hoạch tương lai ----
  {
    id: "20000000-0000-0000-0000-000000000016",
    course_id: "10000000-0000-0000-0000-000000000002",
    title: "Kế hoạch & Tương lai",
    description: "Nói về dự định, ước mơ và tương lai",
    order_index: 8,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000076",
        unit_id: "20000000-0000-0000-0000-000000000016",
        title: "Future plans - Kế hoạch tương lai",
        type: "vocabulary",
        content: {
          words: [
            { word: "Dream", translation: "Ước mơ", phonetic: "/driːm/", example: "My dream is to travel the world." },
            { word: "Goal", translation: "Mục tiêu", phonetic: "/ɡoʊl/", example: "What is your goal this year?" },
            { word: "Career", translation: "Sự nghiệp", phonetic: "/kəˈrɪr/", example: "She has a successful career." },
            { word: "Plan", translation: "Kế hoạch", phonetic: "/plæn/", example: "Do you have a plan for the weekend?" },
            { word: "Hope", translation: "Hy vọng", phonetic: "/hoʊp/", example: "I hope to get a good job." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000077",
        unit_id: "20000000-0000-0000-0000-000000000016",
        title: "Future goals - Mục tiêu tương lai",
        type: "listening",
        content: {
          audio_text: "A: What do you want to do after graduation? B: I want to work for an international company. I will study English harder this year. I also plan to learn Japanese. A: That's great! I'm going to start my own business. I hope it will be successful.",
          questions: [
            { question: "B muốn làm gì sau khi tốt nghiệp?", options: ["Mở công ty", "Làm cho công ty quốc tế", "Đi du học", "Làm giáo viên"], correct: 1 },
            { question: "A dự định làm gì?", options: ["Học tiếng Nhật", "Đi du lịch", "Mở doanh nghiệp", "Tiếp tục học"], correct: 2 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 10,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000078",
        unit_id: "20000000-0000-0000-0000-000000000016",
        title: "Talking about the future - Nói về tương lai",
        type: "speaking",
        content: {
          phrases: [
            { text: "I want to become a doctor.", translation: "Tôi muốn trở thành bác sĩ." },
            { text: "I plan to study abroad next year.", translation: "Tôi dự định du học năm sau." },
            { text: "I hope I will pass the exam.", translation: "Tôi hy vọng sẽ đỗ kỳ thi." },
            { text: "In five years, I see myself working in IT.", translation: "Trong 5 năm nữa, tôi thấy mình làm trong ngành CNTT." },
          ],
        },
        duration_minutes: 5,
        xp_reward: 15,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000079",
        unit_id: "20000000-0000-0000-0000-000000000016",
        title: "Will vs Going to",
        type: "grammar",
        content: {
          explanation: "WILL: quyết định tại thời điểm nói, dự đoán\n- I'll help you. (Tôi sẽ giúp bạn - quyết định ngay)\n- It will rain tomorrow. (Trời sẽ mưa - dự đoán)\n\nGOING TO: kế hoạch đã quyết định từ trước\n- I'm going to study English. (Tôi sẽ học tiếng Anh - đã lên kế hoạch)\n\nPhủ định: won't / not going to",
          examples: ["I'll call you later.", "She's going to visit Paris next month.", "It won't be easy, but I'll try."],
          exercises: [
            { question: "The phone is ringing. I ___ answer it.", options: ["will", "am going to", "going to", "am will"], correct: 0 },
            { question: "I ___ study medicine. I already applied. (đã lên kế hoạch)", options: ["will", "am going to", "'ll", "would"], correct: 1 },
            { question: "I think it ___ snow tonight. (dự đoán)", options: ["going to", "will", "is going to", "is will"], correct: 1 },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000080",
        unit_id: "20000000-0000-0000-0000-000000000016",
        title: "Kiểm tra - Tương lai",
        type: "quiz",
        content: {
          questions: [
            { question: '"Dream" nghĩa là:', options: ["Mục tiêu", "Kế hoạch", "Ước mơ", "Hy vọng"], correct: 2 },
            { question: '"I will" dùng khi:', options: ["Nói về quá khứ", "Kế hoạch từ trước", "Quyết định tại chỗ", "Thói quen"], correct: 2 },
            { question: "Chọn đúng: She ___ travel to Japan. She already bought tickets.", options: ["will", "is going to", "would", "shall"], correct: 1 },
            { question: '"I hope to succeed" nghĩa là:', options: ["Tôi đã thành công", "Tôi hy vọng thành công", "Tôi sẽ thất bại", "Tôi không hy vọng"], correct: 1 },
          ],
        },
        duration_minutes: 5,
        xp_reward: 20,
        order_index: 5,
        progress: null,
      },
    ],
  },
];

// ==================== Lookup helpers ====================

export const ALL_UNITS: MockUnit[] = [...A1_UNITS, ...A2_UNITS];

export function getUnitsForCourse(courseId: string): MockUnit[] {
  return ALL_UNITS.filter((u) => u.course_id === courseId);
}

export function findLesson(lessonId: string): MockLesson | undefined {
  for (const unit of ALL_UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}

export function findCourse(courseId: string): MockCourse | undefined {
  return ENGLISH_COURSES.find((c) => c.id === courseId);
}
