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
    total_lessons: 20,
    duration_hours: 10,
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
    total_lessons: 20,
    duration_hours: 12,
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
