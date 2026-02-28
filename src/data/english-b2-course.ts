// B2 Upper-Intermediate English course data for Vietnamese learners
// Follows the same structure as english-courses.ts

import type { MockCourse, MockUnit } from "./english-courses";

// ==================== B2 Course ====================

export const B2_COURSE: MockCourse = {
  id: "10000000-0000-0000-0000-000000000004",
  language: "english",
  title: "Tiếng Anh B2 - Trung cấp cao",
  description:
    "Giao tiếp tự tin trong môi trường chuyên nghiệp. Thành ngữ, ngữ pháp nâng cao và kỹ năng thuyết trình.",
  level: "B2",
  total_lessons: 40,
  duration_hours: 25,
  is_premium: true,
  order_index: 4,
  progress: 0,
  completed_lessons: 0,
};

// ==================== B2 Units & Lessons ====================

export const B2_UNITS: MockUnit[] = [
  // ==================== Unit 1: Giao tiếp Kinh doanh ====================
  {
    id: "20000000-0000-0000-0000-000000000025",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Giao tiếp Kinh doanh",
    description: "Từ vựng và kỹ năng giao tiếp trong môi trường kinh doanh",
    order_index: 1,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000121",
        unit_id: "20000000-0000-0000-0000-000000000025",
        title: "Business Communication - Giao tiếp kinh doanh",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Negotiation",
              translation: "Đàm phán",
              phonetic: "/nɪˌɡoʊʃiˈeɪʃən/",
              example: "The negotiation between the two companies lasted three days.",
            },
            {
              word: "Proposal",
              translation: "Đề xuất",
              phonetic: "/prəˈpoʊzəl/",
              example: "We submitted a business proposal to the client last week.",
            },
            {
              word: "Strategy",
              translation: "Chiến lược",
              phonetic: "/ˈstrætədʒi/",
              example: "Our marketing strategy focuses on social media engagement.",
            },
            {
              word: "Stakeholder",
              translation: "Bên liên quan",
              phonetic: "/ˈsteɪkˌhoʊldər/",
              example: "All stakeholders must approve the project before we proceed.",
            },
            {
              word: "Revenue",
              translation: "Doanh thu",
              phonetic: "/ˈrɛvənuː/",
              example: "The company's annual revenue exceeded ten million dollars.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000122",
        unit_id: "20000000-0000-0000-0000-000000000025",
        title: "A Business Meeting - Cuộc họp kinh doanh",
        type: "listening",
        content: {
          audio_text:
            "Good morning, everyone. Thank you for joining this meeting. Today we are going to discuss the launch of our new product line. The marketing team has prepared a proposal that targets young professionals. Our projected revenue for the first quarter is two hundred thousand dollars. We need to finalize the strategy by Friday so that all stakeholders can review it before the board meeting next week.",
          questions: [
            {
              question: "Cuộc họp bàn về vấn đề gì?",
              options: [
                "Tuyển nhân viên mới",
                "Ra mắt dòng sản phẩm mới",
                "Cắt giảm chi phí",
                "Mở chi nhánh mới",
              ],
              correct: 1,
            },
            {
              question: "Chiến lược cần hoàn thành trước khi nào?",
              options: ["Thứ Hai", "Thứ Tư", "Thứ Sáu", "Cuối tháng"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000123",
        unit_id: "20000000-0000-0000-0000-000000000025",
        title: "Formal Business Phrases - Cụm từ kinh doanh trang trọng",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "I would like to schedule a meeting to discuss the proposal.",
              translation: "Tôi muốn sắp xếp một cuộc họp để thảo luận về đề xuất.",
            },
            {
              text: "Could you please send me the quarterly report by end of day?",
              translation: "Bạn có thể gửi cho tôi báo cáo quý trước cuối ngày không?",
            },
            {
              text: "I am writing to follow up on our previous conversation.",
              translation: "Tôi viết thư này để theo dõi cuộc trò chuyện trước đó của chúng ta.",
            },
            {
              text: "We need to reach a consensus before moving forward.",
              translation: "Chúng ta cần đạt được sự đồng thuận trước khi tiến hành.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000124",
        unit_id: "20000000-0000-0000-0000-000000000025",
        title: "Reported Speech - Câu tường thuật",
        type: "grammar",
        content: {
          explanation:
            'Câu tường thuật (Reported Speech) dùng để thuật lại lời nói của người khác:\n\n- Thì hiện tại đơn → Thì quá khứ đơn: "I work here" → She said that she worked there.\n- Thì hiện tại tiếp diễn → Thì quá khứ tiếp diễn: "I am leaving" → He said he was leaving.\n- will → would: "I will call you" → She said she would call me.\n- can → could: "I can help" → He told me he could help.\n\nLưu ý: Đổi đại từ và trạng từ chỉ thời gian/nơi chốn (here → there, today → that day, tomorrow → the next day).',
          examples: [
            'She said that she had submitted the proposal. (Cô ấy nói rằng cô ấy đã gửi đề xuất.)',
            'He told me that the meeting would start at ten. (Anh ấy nói với tôi rằng cuộc họp sẽ bắt đầu lúc 10 giờ.)',
            'They mentioned that they were working on a new strategy. (Họ đề cập rằng họ đang làm việc trên chiến lược mới.)',
          ],
          exercises: [
            {
              question: '"I am busy." → She said she ___ busy.',
              options: ["is", "was", "were", "has been"],
              correct: 1,
            },
            {
              question: '"We will finish the report." → They said they ___ finish the report.',
              options: ["will", "would", "can", "shall"],
              correct: 1,
            },
            {
              question: '"I can attend the meeting." → He told me he ___ attend the meeting.',
              options: ["can", "could", "will", "may"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000125",
        unit_id: "20000000-0000-0000-0000-000000000025",
        title: "Kiểm tra - Giao tiếp Kinh doanh",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Negotiation" nghĩa là gì?',
              options: ["Hợp đồng", "Đàm phán", "Quảng cáo", "Tuyển dụng"],
              correct: 1,
            },
            {
              question: '"She said she ___ the proposal." (đã gửi)',
              options: ["submits", "submitted", "had submitted", "will submit"],
              correct: 2,
            },
            {
              question: '"Revenue" có nghĩa gần nhất với:',
              options: ["Chi phí", "Lợi nhuận", "Doanh thu", "Nợ"],
              correct: 2,
            },
            {
              question: 'Chuyển sang reported speech: "I will call you tomorrow."',
              options: [
                "He said he will call me tomorrow.",
                "He said he would call me the next day.",
                "He said he called me yesterday.",
                "He said he is calling me today.",
              ],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 2: Thảo luận Học thuật ====================
  {
    id: "20000000-0000-0000-0000-000000000026",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Thảo luận Học thuật",
    description: "Từ vựng và kỹ năng thảo luận trong môi trường học thuật",
    order_index: 2,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000126",
        unit_id: "20000000-0000-0000-0000-000000000026",
        title: "Academic Vocabulary - Từ vựng học thuật",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Hypothesis",
              translation: "Giả thuyết",
              phonetic: "/haɪˈpɑːθəsɪs/",
              example: "The researcher proposed a hypothesis about climate change effects.",
            },
            {
              word: "Methodology",
              translation: "Phương pháp luận",
              phonetic: "/ˌmɛθəˈdɑːlədʒi/",
              example: "The methodology of the study involved surveys and interviews.",
            },
            {
              word: "Evidence",
              translation: "Bằng chứng",
              phonetic: "/ˈɛvɪdəns/",
              example: "There is strong evidence to support this theory.",
            },
            {
              word: "Conclusion",
              translation: "Kết luận",
              phonetic: "/kənˈkluːʒən/",
              example: "The conclusion of the paper summarizes the key findings.",
            },
            {
              word: "Peer review",
              translation: "Đánh giá đồng nghiệp",
              phonetic: "/pɪr rɪˈvjuː/",
              example: "The article went through a rigorous peer review process.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000127",
        unit_id: "20000000-0000-0000-0000-000000000026",
        title: "A Research Study - Nghiên cứu khoa học",
        type: "listening",
        content: {
          audio_text:
            "Today I would like to present our research findings on the effects of social media on student concentration. Our hypothesis was that excessive screen time reduces attention spans. The methodology involved tracking five hundred university students over six months. The evidence clearly shows a correlation between social media usage and decreased academic performance. In conclusion, we recommend that students limit their daily screen time to improve focus.",
          questions: [
            {
              question: "Nghiên cứu tập trung vào vấn đề gì?",
              options: [
                "Ảnh hưởng của thể thao lên sức khỏe",
                "Ảnh hưởng của mạng xã hội lên sự tập trung",
                "Phương pháp học tiếng Anh hiệu quả",
                "Xu hướng công nghệ mới",
              ],
              correct: 1,
            },
            {
              question: "Nghiên cứu đã theo dõi bao nhiêu sinh viên?",
              options: ["200", "300", "500", "1000"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000128",
        unit_id: "20000000-0000-0000-0000-000000000026",
        title: "Academic Phrases - Cụm từ học thuật",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "According to recent research, this approach is more effective.",
              translation: "Theo nghiên cứu gần đây, phương pháp này hiệu quả hơn.",
            },
            {
              text: "Research suggests that regular exercise improves cognitive function.",
              translation: "Nghiên cứu cho thấy rằng tập thể dục thường xuyên cải thiện chức năng nhận thức.",
            },
            {
              text: "The data indicates a significant increase in online learning.",
              translation: "Dữ liệu cho thấy sự gia tăng đáng kể trong học trực tuyến.",
            },
            {
              text: "It can be argued that technology has transformed education.",
              translation: "Có thể lập luận rằng công nghệ đã thay đổi giáo dục.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000129",
        unit_id: "20000000-0000-0000-0000-000000000026",
        title: "Advanced Passive - Câu bị động nâng cao",
        type: "grammar",
        content: {
          explanation:
            "Câu bị động nâng cao thường dùng trong văn phong học thuật:\n\n- It is believed that... (Người ta tin rằng...)\n- It is widely known that... (Ai cũng biết rằng...)\n- The study was conducted by... (Nghiên cứu được thực hiện bởi...)\n- The results have been published in... (Kết quả đã được công bố trên...)\n- It has been proven that... (Đã được chứng minh rằng...)\n\nCấu trúc: It + be + past participle + that + clause\nHoặc: Subject + be + past participle + to + infinitive",
          examples: [
            "It is believed that learning a second language improves memory. (Người ta tin rằng học ngôn ngữ thứ hai cải thiện trí nhớ.)",
            "The experiment was conducted over a period of two years. (Thí nghiệm được tiến hành trong thời gian hai năm.)",
            "The findings are expected to influence future policy decisions. (Các phát hiện được kỳ vọng sẽ ảnh hưởng đến các quyết định chính sách tương lai.)",
          ],
          exercises: [
            {
              question: "It ___ that exercise improves mental health.",
              options: ["believes", "is believed", "believed", "believing"],
              correct: 1,
            },
            {
              question: "The research ___ by a team of scientists from Harvard.",
              options: ["conducted", "was conducted", "is conducting", "conducts"],
              correct: 1,
            },
            {
              question: "The results ___ in a leading scientific journal last month.",
              options: ["published", "are published", "were published", "have publishing"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000130",
        unit_id: "20000000-0000-0000-0000-000000000026",
        title: "Kiểm tra - Thảo luận Học thuật",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Hypothesis" nghĩa là gì?',
              options: ["Kết luận", "Giả thuyết", "Phương pháp", "Bằng chứng"],
              correct: 1,
            },
            {
              question: '"It ___ that bilingual people have better multitasking skills."',
              options: ["believes", "is believed", "was believing", "has believing"],
              correct: 1,
            },
            {
              question: '"Peer review" là quá trình:',
              options: [
                "Sinh viên chấm điểm cho nhau",
                "Giáo viên chấm bài",
                "Chuyên gia cùng lĩnh vực đánh giá nghiên cứu",
                "Tự đánh giá bản thân",
              ],
              correct: 2,
            },
            {
              question: 'Chọn câu bị động đúng:',
              options: [
                "The study conducting by researchers.",
                "The study was conducted by researchers.",
                "The study is conduct by researchers.",
                "The study has conducting by researchers.",
              ],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 3: Vấn đề Xã hội ====================
  {
    id: "20000000-0000-0000-0000-000000000027",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Vấn đề Xã hội",
    description: "Thảo luận về các vấn đề xã hội và bày tỏ quan điểm",
    order_index: 3,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000131",
        unit_id: "20000000-0000-0000-0000-000000000027",
        title: "Social Issues - Vấn đề xã hội",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Inequality",
              translation: "Bất bình đẳng",
              phonetic: "/ˌɪnɪˈkwɑːləti/",
              example: "Income inequality has become a major concern in many countries.",
            },
            {
              word: "Discrimination",
              translation: "Phân biệt đối xử",
              phonetic: "/dɪˌskrɪmɪˈneɪʃən/",
              example: "Discrimination based on gender or race is unacceptable.",
            },
            {
              word: "Poverty",
              translation: "Nghèo đói",
              phonetic: "/ˈpɑːvərti/",
              example: "Many organizations work to reduce poverty in developing nations.",
            },
            {
              word: "Globalization",
              translation: "Toàn cầu hóa",
              phonetic: "/ˌɡloʊbəlaɪˈzeɪʃən/",
              example: "Globalization has connected economies and cultures around the world.",
            },
            {
              word: "Sustainability",
              translation: "Bền vững",
              phonetic: "/səˌsteɪnəˈbɪləti/",
              example: "Sustainability is essential for protecting the environment for future generations.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000132",
        unit_id: "20000000-0000-0000-0000-000000000027",
        title: "Gender Equality at Work - Bình đẳng giới tại nơi làm việc",
        type: "listening",
        content: {
          audio_text:
            "Welcome to today's podcast. We are discussing gender equality in the workplace. Despite significant progress over the past decades, women still earn approximately eighty cents for every dollar men earn. Many companies have implemented diversity policies, but the gender pay gap persists. Experts argue that flexible working arrangements and transparent salary structures could help address this inequality. What do you think should be done to close the gap?",
          questions: [
            {
              question: "Phụ nữ kiếm được bao nhiêu so với mỗi đô la nam giới kiếm được?",
              options: ["60 xu", "70 xu", "80 xu", "90 xu"],
              correct: 2,
            },
            {
              question: "Chuyên gia đề xuất giải pháp nào?",
              options: [
                "Tăng lương cho tất cả mọi người",
                "Giảm giờ làm việc",
                "Sắp xếp công việc linh hoạt và cơ cấu lương minh bạch",
                "Tuyển thêm nhiều nhân viên nữ",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000133",
        unit_id: "20000000-0000-0000-0000-000000000027",
        title: "Discussing Issues Diplomatically - Thảo luận ngoại giao",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "I see your point, but I believe there is another perspective to consider.",
              translation: "Tôi hiểu quan điểm của bạn, nhưng tôi tin rằng có một góc nhìn khác cần xem xét.",
            },
            {
              text: "While I respect your opinion, the evidence suggests otherwise.",
              translation: "Trong khi tôi tôn trọng ý kiến của bạn, bằng chứng cho thấy điều ngược lại.",
            },
            {
              text: "That is a valid concern, however we should also take into account...",
              translation: "Đó là một mối lo ngại hợp lý, tuy nhiên chúng ta cũng nên xem xét...",
            },
            {
              text: "In my view, the most pressing issue is the lack of equal opportunities.",
              translation: "Theo quan điểm của tôi, vấn đề cấp bách nhất là thiếu cơ hội bình đẳng.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000134",
        unit_id: "20000000-0000-0000-0000-000000000027",
        title: "Third Conditional - Câu điều kiện loại 3",
        type: "grammar",
        content: {
          explanation:
            "Câu điều kiện loại 3 diễn tả điều không có thật trong quá khứ (giả định ngược lại với thực tế đã xảy ra):\n\nCấu trúc: If + S + had + V3/ed, S + would/could/might + have + V3/ed\n\n- If I had studied harder, I would have passed the exam. (Nếu tôi đã học chăm hơn, tôi đã đỗ rồi.)\n- If she had known about the meeting, she would have attended. (Nếu cô ấy biết về cuộc họp, cô ấy đã tham dự rồi.)\n\nLưu ý: Câu điều kiện loại 3 KHÔNG thể thay đổi quá khứ, chỉ thể hiện sự tiếc nuối hoặc giả định.",
          examples: [
            "If I had known about the inequality problem earlier, I would have spoken up. (Nếu tôi biết về vấn đề bất bình đẳng sớm hơn, tôi đã lên tiếng rồi.)",
            "If they had invested in education, poverty could have been reduced. (Nếu họ đã đầu tư vào giáo dục, nghèo đói đã có thể giảm.)",
            "If the government had acted sooner, the situation would not have gotten this bad. (Nếu chính phủ đã hành động sớm hơn, tình hình đã không tệ như thế này.)",
          ],
          exercises: [
            {
              question: "If I ___ (study) abroad, I would have improved my English faster.",
              options: ["studied", "had studied", "have studied", "would study"],
              correct: 1,
            },
            {
              question: "If she had saved money, she ___ (buy) a house.",
              options: ["would buy", "would have bought", "will buy", "has bought"],
              correct: 1,
            },
            {
              question: "If they ___ (not/ignore) the problem, the situation would have been better.",
              options: ["didn't ignore", "hadn't ignored", "don't ignore", "won't ignore"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000135",
        unit_id: "20000000-0000-0000-0000-000000000027",
        title: "Kiểm tra - Vấn đề Xã hội",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Sustainability" nghĩa là gì?',
              options: ["Toàn cầu hóa", "Bền vững", "Phân biệt đối xử", "Nghèo đói"],
              correct: 1,
            },
            {
              question: '"If I had known, I ___ have helped." Chọn đáp án đúng:',
              options: ["will", "would", "can", "shall"],
              correct: 1,
            },
            {
              question: '"Discrimination" là hành vi:',
              options: [
                "Giúp đỡ người khác",
                "Đối xử không công bằng với ai đó",
                "Bảo vệ môi trường",
                "Phát triển kinh tế",
              ],
              correct: 1,
            },
            {
              question: "Câu điều kiện loại 3 nói về:",
              options: [
                "Điều có thể xảy ra trong tương lai",
                "Điều luôn đúng",
                "Điều không có thật trong quá khứ",
                "Điều đang xảy ra",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 4: Thành ngữ & Cụm động từ ====================
  {
    id: "20000000-0000-0000-0000-000000000028",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Thành ngữ & Cụm động từ",
    description: "Học các thành ngữ phổ biến và cụm động từ trong tiếng Anh",
    order_index: 4,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000136",
        unit_id: "20000000-0000-0000-0000-000000000028",
        title: "Phrasal Verbs - Cụm động từ",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Break down",
              translation: "Hỏng / Phân tích",
              phonetic: "/breɪk daʊn/",
              example: "Let me break down the problem into smaller parts so we can solve it.",
            },
            {
              word: "Come up with",
              translation: "Nghĩ ra",
              phonetic: "/kʌm ʌp wɪð/",
              example: "She came up with a brilliant idea for the marketing campaign.",
            },
            {
              word: "Figure out",
              translation: "Tìm ra / Hiểu ra",
              phonetic: "/ˈfɪɡjər aʊt/",
              example: "I need to figure out how to fix this technical issue.",
            },
            {
              word: "Look forward to",
              translation: "Mong chờ",
              phonetic: "/lʊk ˈfɔːrwərd tuː/",
              example: "I look forward to hearing from you soon.",
            },
            {
              word: "Put up with",
              translation: "Chịu đựng",
              phonetic: "/pʊt ʌp wɪð/",
              example: "I cannot put up with this noise any longer.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000137",
        unit_id: "20000000-0000-0000-0000-000000000028",
        title: "Natural Conversation with Idioms - Hội thoại tự nhiên với thành ngữ",
        type: "listening",
        content: {
          audio_text:
            "Hey Sarah, how was your first day at the new job? Oh, it was nerve-wracking at first, but my colleagues helped me break the ice. The manager seems strict, but I think we will get along well. I have to hit the books tonight though, because there is a lot to learn. By the way, the commute is a piece of cake since I moved closer to the office. I am really looking forward to this new chapter in my life!",
          questions: [
            {
              question: '"Break the ice" trong đoạn hội thoại nghĩa là gì?',
              options: [
                "Phá vỡ đồ vật",
                "Làm quen / xóa bỏ sự ngại ngùng",
                "Bắt đầu đi làm",
                "Giải quyết vấn đề",
              ],
              correct: 1,
            },
            {
              question: 'Tại sao cô ấy nói việc đi làm là "a piece of cake"?',
              options: [
                "Vì có bánh ăn trên đường",
                "Vì đường đi rất dễ dàng do cô ấy chuyển nhà gần hơn",
                "Vì cô ấy được đi taxi",
                "Vì công ty gần nhà từ trước",
              ],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000138",
        unit_id: "20000000-0000-0000-0000-000000000028",
        title: "Using Idioms in Context - Sử dụng thành ngữ",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "This project is a piece of cake compared to the last one.",
              translation: "Dự án này dễ như ăn bánh so với dự án trước.",
            },
            {
              text: "Let me break the ice by introducing myself to the new team.",
              translation: "Để tôi phá vỡ sự ngại ngùng bằng cách giới thiệu bản thân với nhóm mới.",
            },
            {
              text: "We need to think outside the box to solve this problem.",
              translation: "Chúng ta cần suy nghĩ sáng tạo để giải quyết vấn đề này.",
            },
            {
              text: "I have been burning the midnight oil to meet the deadline.",
              translation: "Tôi đã thức khuya làm việc để kịp hạn chót.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000139",
        unit_id: "20000000-0000-0000-0000-000000000028",
        title: "Separable vs Inseparable Phrasal Verbs - Cụm động từ tách được & không tách được",
        type: "grammar",
        content: {
          explanation:
            "Cụm động từ tách được (Separable): Có thể đặt tân ngữ giữa động từ và giới từ.\n- Turn off the light. / Turn the light off. / Turn it off. (ĐÚNG)\n- Turn off it. (SAI - với đại từ PHẢI tách)\n\nCụm động từ không tách được (Inseparable): Tân ngữ LUÔN đứng sau cụm.\n- Look after the children. (ĐÚNG)\n- Look the children after. (SAI)\n\nTách được: turn off, pick up, figure out, bring up, put away\nKhông tách được: look after, look forward to, get along with, come up with, put up with",
          examples: [
            "I figured the answer out. / I figured out the answer. (Tách được)",
            "She looks after her grandmother every weekend. (Không tách được)",
            "Can you pick me up at the airport? (Tách được - dùng đại từ phải tách)",
          ],
          exercises: [
            {
              question: 'Chọn câu ĐÚNG với cụm động từ "turn off":',
              options: [
                "Turn off it.",
                "Turn it off.",
                "Turn it off it.",
                "Off turn it.",
              ],
              correct: 1,
            },
            {
              question: '"Look forward to" là cụm động từ:',
              options: ["Tách được", "Không tách được", "Cả hai đều được", "Không phải cụm động từ"],
              correct: 1,
            },
            {
              question: 'Chọn câu ĐÚNG: "I cannot ___ this situation anymore."',
              options: ["put up with", "put with up", "up put with", "with put up"],
              correct: 0,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000140",
        unit_id: "20000000-0000-0000-0000-000000000028",
        title: "Kiểm tra - Thành ngữ & Cụm động từ",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Come up with" nghĩa là gì?',
              options: ["Chịu đựng", "Nghĩ ra", "Tìm kiếm", "Bỏ cuộc"],
              correct: 1,
            },
            {
              question: '"A piece of cake" nghĩa là:',
              options: ["Một miếng bánh", "Rất khó khăn", "Rất dễ dàng", "Rất ngon"],
              correct: 2,
            },
            {
              question: 'Câu nào ĐÚNG?',
              options: [
                "She looks the baby after.",
                "She looks after the baby.",
                "She after looks the baby.",
                "She the baby looks after.",
              ],
              correct: 1,
            },
            {
              question: '"I look forward ___ meeting you." Điền giới từ:',
              options: ["at", "for", "to", "with"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 5: Ngữ pháp Nâng cao ====================
  {
    id: "20000000-0000-0000-0000-000000000029",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Ngữ pháp Nâng cao",
    description: "Liên từ nâng cao, câu điều kiện hỗn hợp và mệnh đề wish",
    order_index: 5,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000141",
        unit_id: "20000000-0000-0000-0000-000000000029",
        title: "Advanced Connectors - Liên từ nâng cao",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Whereas",
              translation: "Trong khi đó",
              phonetic: "/wɛrˈæz/",
              example: "Some people prefer working from home, whereas others enjoy the office environment.",
            },
            {
              word: "Nevertheless",
              translation: "Tuy nhiên / Tuy vậy",
              phonetic: "/ˌnɛvərðəˈlɛs/",
              example: "The task was difficult; nevertheless, we managed to complete it on time.",
            },
            {
              word: "Furthermore",
              translation: "Hơn nữa",
              phonetic: "/ˌfɜːrðərˈmɔːr/",
              example: "The project is cost-effective. Furthermore, it benefits the local community.",
            },
            {
              word: "Despite",
              translation: "Mặc dù",
              phonetic: "/dɪˈspaɪt/",
              example: "Despite the heavy rain, they continued the outdoor event.",
            },
            {
              word: "Regardless",
              translation: "Bất kể / Không kể",
              phonetic: "/rɪˈɡɑːrdləs/",
              example: "Everyone should have access to education, regardless of their background.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000142",
        unit_id: "20000000-0000-0000-0000-000000000029",
        title: "A TED Talk about AI - Bài nói về trí tuệ nhân tạo",
        type: "listening",
        content: {
          audio_text:
            "Artificial intelligence is transforming every aspect of our lives. Nevertheless, many people remain skeptical about its impact on employment. Despite the fear of job losses, research suggests that AI will create more jobs than it eliminates. Furthermore, AI can handle repetitive tasks, whereas humans excel at creative and emotional work. Regardless of your opinion, one thing is certain: AI literacy will be an essential skill in the coming decades.",
          questions: [
            {
              question: "Theo bài nói, AI sẽ ảnh hưởng đến việc làm như thế nào?",
              options: [
                "AI sẽ loại bỏ tất cả công việc",
                "AI sẽ tạo ra nhiều việc làm hơn là loại bỏ",
                "AI không ảnh hưởng đến việc làm",
                "AI chỉ ảnh hưởng đến ngành công nghệ",
              ],
              correct: 1,
            },
            {
              question: "Bài nói cho rằng kỹ năng nào sẽ cần thiết trong tương lai?",
              options: [
                "Kỹ năng lập trình",
                "Kỹ năng hiểu biết về AI",
                "Kỹ năng giao tiếp",
                "Kỹ năng toán học",
              ],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000143",
        unit_id: "20000000-0000-0000-0000-000000000029",
        title: "Complex Sentences - Câu phức",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "Although technology has many benefits, we must consider its potential drawbacks.",
              translation: "Mặc dù công nghệ có nhiều lợi ích, chúng ta phải xem xét những mặt hạn chế tiềm ẩn.",
            },
            {
              text: "Not only does AI improve efficiency, but it also reduces human error.",
              translation: "AI không chỉ cải thiện hiệu suất mà còn giảm sai sót của con người.",
            },
            {
              text: "Regardless of the challenges, I believe we can find a sustainable solution.",
              translation: "Bất kể những thách thức, tôi tin rằng chúng ta có thể tìm ra giải pháp bền vững.",
            },
            {
              text: "Despite having limited resources, the team delivered outstanding results.",
              translation: "Mặc dù nguồn lực hạn chế, nhóm đã đạt được kết quả xuất sắc.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000144",
        unit_id: "20000000-0000-0000-0000-000000000029",
        title: "Mixed Conditionals & Wish - Điều kiện hỗn hợp & Mệnh đề Wish",
        type: "grammar",
        content: {
          explanation:
            "1. Câu điều kiện hỗn hợp (Mixed Conditionals):\n\n- Quá khứ → Hiện tại: If + had + V3, S + would + V\n  If I had studied medicine, I would be a doctor now.\n  (Nếu tôi đã học y, bây giờ tôi đã là bác sĩ.)\n\n- Hiện tại → Quá khứ: If + V2/were, S + would have + V3\n  If I were braver, I would have spoken up at the meeting.\n  (Nếu tôi dũng cảm hơn, tôi đã lên tiếng tại cuộc họp.)\n\n2. Mệnh đề Wish:\n- Wish + past simple: Ước điều hiện tại khác đi\n  I wish I spoke French fluently.\n- Wish + past perfect: Ước điều quá khứ khác đi\n  I wish I had studied harder in college.\n- Wish + would: Ước ai đó thay đổi hành vi\n  I wish he would stop smoking.",
          examples: [
            "If I had accepted that job offer, I would be living in London now. (Nếu tôi đã nhận lời mời việc đó, bây giờ tôi đang sống ở London.)",
            "I wish I had learned English earlier. (Tôi ước mình đã học tiếng Anh sớm hơn.)",
            "I wish I could travel more often. (Tôi ước mình có thể đi du lịch thường xuyên hơn.)",
          ],
          exercises: [
            {
              question: "If I ___ (take) that course, I would be fluent in English now.",
              options: ["took", "had taken", "have taken", "take"],
              correct: 1,
            },
            {
              question: "I wish I ___ (know) about the event yesterday.",
              options: ["know", "knew", "had known", "would know"],
              correct: 2,
            },
            {
              question: "I wish she ___ (stop) making so much noise.",
              options: ["stops", "stopped", "would stop", "had stopped"],
              correct: 2,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000145",
        unit_id: "20000000-0000-0000-0000-000000000029",
        title: "Kiểm tra - Ngữ pháp Nâng cao",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Nevertheless" nghĩa gần nhất với:',
              options: ["Vì vậy", "Tuy nhiên", "Hơn nữa", "Ví dụ"],
              correct: 1,
            },
            {
              question: '"If I had saved money, I ___ a car now."',
              options: ["would have", "would have had", "will have", "had"],
              correct: 0,
            },
            {
              question: '"I wish I ___ speak Japanese." (ước ở hiện tại)',
              options: ["can", "could", "had", "would"],
              correct: 1,
            },
            {
              question: '"Despite ___ tired, she finished the project."',
              options: ["she was", "being", "was", "she is"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 6: Thuyết trình & Nói trước công chúng ====================
  {
    id: "20000000-0000-0000-0000-000000000030",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Thuyết trình & Nói trước công chúng",
    description: "Kỹ năng thuyết trình và nói trước đám đông bằng tiếng Anh",
    order_index: 6,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000146",
        unit_id: "20000000-0000-0000-0000-000000000030",
        title: "Presentation Vocabulary - Từ vựng thuyết trình",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Audience",
              translation: "Khán giả / Người nghe",
              phonetic: "/ˈɔːdiəns/",
              example: "The audience applauded after the presentation.",
            },
            {
              word: "Slide",
              translation: "Trang trình chiếu",
              phonetic: "/slaɪd/",
              example: "Please look at the next slide for the sales figures.",
            },
            {
              word: "Outline",
              translation: "Dàn ý / Phác thảo",
              phonetic: "/ˈaʊtlaɪn/",
              example: "Let me give you a brief outline of today's presentation.",
            },
            {
              word: "Persuade",
              translation: "Thuyết phục",
              phonetic: "/pərˈsweɪd/",
              example: "A good speaker can persuade the audience to take action.",
            },
            {
              word: "Emphasize",
              translation: "Nhấn mạnh",
              phonetic: "/ˈɛmfəsaɪz/",
              example: "I want to emphasize the importance of teamwork in this project.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000147",
        unit_id: "20000000-0000-0000-0000-000000000030",
        title: "A CEO's Speech - Bài phát biểu của CEO",
        type: "listening",
        content: {
          audio_text:
            "Good morning, everyone. I am honored to stand before you today. This past year has been one of remarkable growth for our company. Not only did we exceed our revenue targets, but we also expanded into three new markets. I would like to emphasize that none of this would have been possible without your dedication and hard work. Looking ahead, our vision is to become the industry leader by investing in innovation and sustainability. Together, we can achieve extraordinary things. Thank you.",
          questions: [
            {
              question: "Công ty đã đạt được thành tựu gì trong năm qua?",
              options: [
                "Giảm chi phí",
                "Vượt mục tiêu doanh thu và mở rộng sang 3 thị trường mới",
                "Tuyển thêm 1000 nhân viên",
                "Ra mắt sản phẩm mới",
              ],
              correct: 1,
            },
            {
              question: "Tầm nhìn tương lai của công ty là gì?",
              options: [
                "Mở thêm chi nhánh",
                "Trở thành công ty lớn nhất thế giới",
                "Trở thành nhà dẫn đầu ngành qua đầu tư đổi mới và bền vững",
                "Giảm giá sản phẩm",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000148",
        unit_id: "20000000-0000-0000-0000-000000000030",
        title: "Presentation Skills - Kỹ năng thuyết trình",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "Good morning, everyone. Today I would like to talk about three key trends in our industry.",
              translation: "Chào buổi sáng mọi người. Hôm nay tôi muốn nói về ba xu hướng chính trong ngành của chúng ta.",
            },
            {
              text: "Let me begin by giving you a brief overview of the current situation.",
              translation: "Hãy để tôi bắt đầu bằng cách đưa ra tổng quan ngắn gọn về tình hình hiện tại.",
            },
            {
              text: "Moving on to the next point, I would like to draw your attention to the chart on the screen.",
              translation: "Chuyển sang điểm tiếp theo, tôi muốn các bạn chú ý đến biểu đồ trên màn hình.",
            },
            {
              text: "To sum up, I strongly believe that this strategy will drive our growth in the coming year.",
              translation: "Tóm lại, tôi tin chắc rằng chiến lược này sẽ thúc đẩy sự phát triển của chúng ta trong năm tới.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000149",
        unit_id: "20000000-0000-0000-0000-000000000030",
        title: "Inversion for Emphasis - Đảo ngữ để nhấn mạnh",
        type: "grammar",
        content: {
          explanation:
            'Đảo ngữ (Inversion) dùng để nhấn mạnh trong văn phong trang trọng hoặc thuyết trình:\n\n- Not only... but also: Not only did we meet our targets, but we also exceeded them.\n  (Chúng tôi không chỉ đạt mục tiêu mà còn vượt qua chúng.)\n\n- Rarely: Rarely do we see such dedication in the workplace.\n  (Hiếm khi chúng ta thấy sự cống hiến như vậy nơi làm việc.)\n\n- Never: Never have I experienced such a wonderful event.\n  (Tôi chưa bao giờ trải qua một sự kiện tuyệt vời như vậy.)\n\n- Only after/when: Only after reviewing the data did we realize the problem.\n  (Chỉ sau khi xem xét dữ liệu, chúng tôi mới nhận ra vấn đề.)\n\nCấu trúc: Trạng từ phủ định + trợ động từ + chủ ngữ + động từ chính',
          examples: [
            "Not only does this product save time, but it also reduces costs. (Sản phẩm này không chỉ tiết kiệm thời gian mà còn giảm chi phí.)",
            "Rarely have we encountered such a challenging project. (Hiếm khi chúng tôi gặp phải một dự án đầy thách thức như vậy.)",
            "Never before has technology advanced so rapidly. (Chưa bao giờ công nghệ phát triển nhanh đến vậy.)",
          ],
          exercises: [
            {
              question: "Not only ___ the deadline, but we also delivered high quality work.",
              options: ["we met", "did we meet", "we did meet", "met we"],
              correct: 1,
            },
            {
              question: "Rarely ___ such an inspiring speech.",
              options: ["I have heard", "have I heard", "I heard", "heard I"],
              correct: 1,
            },
            {
              question: "Never before ___ so many opportunities for growth.",
              options: ["there have been", "have there been", "there were", "were there"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000150",
        unit_id: "20000000-0000-0000-0000-000000000030",
        title: "Kiểm tra - Thuyết trình",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Emphasize" nghĩa là gì?',
              options: ["Đồng ý", "Nhấn mạnh", "Giải thích", "So sánh"],
              correct: 1,
            },
            {
              question: '"Not only ___ succeed, but we also exceeded expectations."',
              options: ["we did", "did we", "we", "do we"],
              correct: 1,
            },
            {
              question: 'Cụm từ nào dùng để MỞ ĐẦU bài thuyết trình?',
              options: [
                "To sum up...",
                "In conclusion...",
                "Today I would like to talk about...",
                "Finally...",
              ],
              correct: 2,
            },
            {
              question: '"Persuade" có nghĩa gần nhất với:',
              options: ["Ép buộc", "Thuyết phục", "Yêu cầu", "Hỏi"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 7: Tranh luận & Thuyết phục ====================
  {
    id: "20000000-0000-0000-0000-000000000031",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Tranh luận & Thuyết phục",
    description: "Kỹ năng tranh luận, phản biện và thuyết phục trong tiếng Anh",
    order_index: 7,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000151",
        unit_id: "20000000-0000-0000-0000-000000000031",
        title: "Debate Vocabulary - Từ vựng tranh luận",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Counterargument",
              translation: "Phản biện / Luận điểm phản bác",
              phonetic: "/ˈkaʊntərˌɑːrɡjumənt/",
              example: "She presented a strong counterargument that changed everyone's mind.",
            },
            {
              word: "Fallacy",
              translation: "Ngụy biện / Sai lầm logic",
              phonetic: "/ˈfæləsi/",
              example: "His argument was based on a logical fallacy and lacked evidence.",
            },
            {
              word: "Rhetoric",
              translation: "Thuật hùng biện",
              phonetic: "/ˈrɛtərɪk/",
              example: "The politician used powerful rhetoric to gain public support.",
            },
            {
              word: "Compelling",
              translation: "Thuyết phục / Hấp dẫn",
              phonetic: "/kəmˈpɛlɪŋ/",
              example: "The documentary presented a compelling case for environmental protection.",
            },
            {
              word: "Refute",
              translation: "Bác bỏ",
              phonetic: "/rɪˈfjuːt/",
              example: "The scientist was able to refute the false claims with solid data.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000152",
        unit_id: "20000000-0000-0000-0000-000000000031",
        title: "A Formal Debate - Cuộc tranh luận chính thức",
        type: "listening",
        content: {
          audio_text:
            "Today's debate topic is whether technology should replace textbooks in schools. The first speaker argues that digital devices make learning more interactive and engaging. Students can access up-to-date information instantly. However, the opposing side presents a compelling counterargument. They claim that screen time is already excessive and that printed books improve focus and retention. Furthermore, not all students have equal access to technology. Both sides agree that a balanced approach combining digital and traditional resources may be the best solution.",
          questions: [
            {
              question: "Chủ đề tranh luận là gì?",
              options: [
                "Có nên cấm điện thoại ở trường không",
                "Công nghệ có nên thay thế sách giáo khoa không",
                "Có nên tăng giờ học không",
                "Phương pháp giảng dạy nào tốt nhất",
              ],
              correct: 1,
            },
            {
              question: "Hai bên đồng ý điều gì?",
              options: [
                "Nên loại bỏ hoàn toàn sách giáo khoa",
                "Nên cấm công nghệ trong lớp học",
                "Nên kết hợp cân bằng giữa kỹ thuật số và truyền thống",
                "Nên để học sinh tự quyết định",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000153",
        unit_id: "20000000-0000-0000-0000-000000000031",
        title: "Agreeing, Disagreeing & Persuading - Đồng ý, phản đối & thuyết phục",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "I completely agree with you. The evidence strongly supports that position.",
              translation: "Tôi hoàn toàn đồng ý với bạn. Bằng chứng ủng hộ mạnh mẽ quan điểm đó.",
            },
            {
              text: "I am afraid I have to disagree. The data does not support that claim.",
              translation: "Tôi e rằng tôi phải không đồng ý. Dữ liệu không ủng hộ nhận định đó.",
            },
            {
              text: "Let me play devil's advocate here and suggest an alternative viewpoint.",
              translation: "Hãy để tôi đóng vai phản biện và đề xuất một quan điểm khác.",
            },
            {
              text: "If you consider the long-term benefits, I think you will find this approach more practical.",
              translation: "Nếu bạn xem xét lợi ích dài hạn, tôi nghĩ bạn sẽ thấy cách tiếp cận này thực tế hơn.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000154",
        unit_id: "20000000-0000-0000-0000-000000000031",
        title: "Cleft Sentences - Câu chẻ",
        type: "grammar",
        content: {
          explanation:
            "Câu chẻ (Cleft Sentences) dùng để nhấn mạnh một phần của câu:\n\n1. It-cleft: It + be + phần nhấn mạnh + that/who + phần còn lại\n- It was John who suggested the idea. (Chính John là người đề xuất ý tưởng.)\n- It is the quality that matters, not the quantity. (Chính chất lượng mới quan trọng, không phải số lượng.)\n\n2. What-cleft: What + clause + be + phần nhấn mạnh\n- What I mean is that we need more time. (Điều tôi muốn nói là chúng ta cần thêm thời gian.)\n- What concerns me is the lack of evidence. (Điều khiến tôi lo ngại là thiếu bằng chứng.)\n\n3. All-cleft: All + clause + be + phần nhấn mạnh\n- All I want is a fair chance. (Tất cả những gì tôi muốn là một cơ hội công bằng.)",
          examples: [
            "It was the marketing team that developed this strategy. (Chính đội marketing đã phát triển chiến lược này.)",
            "What I am trying to say is that we should reconsider our approach. (Điều tôi đang cố nói là chúng ta nên xem xét lại cách tiếp cận.)",
            "All we need is a little more time to finalize the report. (Tất cả những gì chúng ta cần là thêm một chút thời gian để hoàn thành báo cáo.)",
          ],
          exercises: [
            {
              question: "It ___ the teacher who inspired me to study abroad.",
              options: ["is", "was", "were", "being"],
              correct: 1,
            },
            {
              question: "What I ___ is that the plan needs more research.",
              options: ["mean", "meant", "meaning", "means"],
              correct: 0,
            },
            {
              question: "___ we need is better communication between departments.",
              options: ["It", "What", "That", "Which"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000155",
        unit_id: "20000000-0000-0000-0000-000000000031",
        title: "Kiểm tra - Tranh luận & Thuyết phục",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Refute" nghĩa là gì?',
              options: ["Đồng ý", "Bác bỏ", "Đề xuất", "Thuyết phục"],
              correct: 1,
            },
            {
              question: '"It ___ the lack of funding that caused the project to fail."',
              options: ["is", "was", "were", "has"],
              correct: 1,
            },
            {
              question: '"Fallacy" là:',
              options: [
                "Lập luận đúng đắn",
                "Sai lầm trong logic / Ngụy biện",
                "Ý kiến cá nhân",
                "Kết luận cuối cùng",
              ],
              correct: 1,
            },
            {
              question: '"What I mean ___ that we should start over."',
              options: ["are", "is", "am", "were"],
              correct: 1,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },

  // ==================== Unit 8: Biểu đạt Sáng tạo ====================
  {
    id: "20000000-0000-0000-0000-000000000032",
    course_id: "10000000-0000-0000-0000-000000000004",
    title: "Biểu đạt Sáng tạo",
    description: "Kỹ năng kể chuyện, miêu tả sáng tạo và ôn tập thì nâng cao",
    order_index: 8,
    lessons: [
      {
        id: "30000000-0000-0000-0000-000000000156",
        unit_id: "20000000-0000-0000-0000-000000000032",
        title: "Creative Expression - Biểu đạt sáng tạo",
        type: "vocabulary",
        content: {
          words: [
            {
              word: "Metaphor",
              translation: "Ẩn dụ",
              phonetic: "/ˈmɛtəfɔːr/",
              example: "Life is a journey is a common metaphor used in literature.",
            },
            {
              word: "Narrative",
              translation: "Câu chuyện / Tường thuật",
              phonetic: "/ˈnærətɪv/",
              example: "The narrative of the film explores the themes of love and loss.",
            },
            {
              word: "Inspiration",
              translation: "Cảm hứng",
              phonetic: "/ˌɪnspəˈreɪʃən/",
              example: "Traveling to new places gives me a lot of inspiration for my writing.",
            },
            {
              word: "Perspective",
              translation: "Góc nhìn / Quan điểm",
              phonetic: "/pərˈspɛktɪv/",
              example: "Reading books from different cultures gives you a broader perspective.",
            },
            {
              word: "Eloquent",
              translation: "Hùng biện / Lưu loát",
              phonetic: "/ˈɛləkwənt/",
              example: "She gave an eloquent speech that moved the entire audience to tears.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 1,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000157",
        unit_id: "20000000-0000-0000-0000-000000000032",
        title: "A Personal Story - Câu chuyện cá nhân",
        type: "listening",
        content: {
          audio_text:
            "Let me share a story that changed my perspective on life. Five years ago, I was working twelve-hour days and had been burning out for months. One evening, I was walking home when an elderly woman stopped me and asked for directions. We ended up talking for an hour. She told me she had been traveling the world since retiring. Her words inspired me to rethink my priorities. By the end of that year, I had quit my stressful job and started my own small business. I have never looked back since.",
          questions: [
            {
              question: "Người kể đã gặp ai trên đường về nhà?",
              options: [
                "Một người bạn cũ",
                "Một bà cụ",
                "Một đồng nghiệp",
                "Một du khách trẻ",
              ],
              correct: 1,
            },
            {
              question: "Sau cuộc trò chuyện đó, người kể đã làm gì?",
              options: [
                "Nghỉ hưu sớm",
                "Đi du lịch vòng quanh thế giới",
                "Nghỉ công việc căng thẳng và bắt đầu kinh doanh riêng",
                "Chuyển đến thành phố khác",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 15,
        order_index: 2,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000158",
        unit_id: "20000000-0000-0000-0000-000000000032",
        title: "Storytelling Techniques - Kỹ thuật kể chuyện",
        type: "speaking",
        content: {
          phrases: [
            {
              text: "Let me tell you about an experience that completely changed how I see the world.",
              translation: "Hãy để tôi kể cho bạn nghe về một trải nghiệm đã hoàn toàn thay đổi cách tôi nhìn thế giới.",
            },
            {
              text: "Picture this: it was a cold winter evening, and the streets were completely empty.",
              translation: "Hãy hình dung thế này: đó là một buổi tối mùa đông lạnh giá, và đường phố hoàn toàn vắng vẻ.",
            },
            {
              text: "What struck me the most was the kindness of a complete stranger.",
              translation: "Điều khiến tôi ấn tượng nhất là sự tử tế của một người hoàn toàn xa lạ.",
            },
            {
              text: "Looking back, I realize that moment was a turning point in my life.",
              translation: "Nhìn lại, tôi nhận ra khoảnh khắc đó là bước ngoặt trong cuộc đời tôi.",
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 20,
        order_index: 3,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000159",
        unit_id: "20000000-0000-0000-0000-000000000032",
        title: "Advanced Tenses Review - Ôn tập thì nâng cao",
        type: "grammar",
        content: {
          explanation:
            "Ôn tập các thì nâng cao thường dùng trong kể chuyện:\n\n1. Future Perfect: will + have + V3 (hành động sẽ hoàn thành trước một thời điểm trong tương lai)\n- By next year, I will have graduated from university.\n  (Trước năm sau, tôi sẽ tốt nghiệp đại học.)\n\n2. Past Perfect Continuous: had + been + V-ing (hành động đã diễn ra liên tục trước một sự kiện trong quá khứ)\n- She had been working for ten hours before she finally took a break.\n  (Cô ấy đã làm việc suốt mười tiếng trước khi cuối cùng nghỉ giải lao.)\n\n3. Future Perfect Continuous: will + have + been + V-ing (hành động sẽ đang diễn ra liên tục cho đến một thời điểm trong tương lai)\n- By December, I will have been learning English for five years.\n  (Đến tháng 12, tôi sẽ đã học tiếng Anh được năm năm.)",
          examples: [
            "By the time you arrive, I will have finished cooking dinner. (Khi bạn đến, tôi sẽ nấu xong bữa tối rồi.)",
            "They had been traveling for three months before they ran out of money. (Họ đã đi du lịch suốt ba tháng trước khi hết tiền.)",
            "By next month, she will have been working at this company for twenty years. (Đến tháng sau, cô ấy sẽ làm việc tại công ty này được hai mươi năm.)",
          ],
          exercises: [
            {
              question: "By 2027, I ___ (live) in this city for ten years.",
              options: [
                "will live",
                "will have lived",
                "will be living",
                "am living",
              ],
              correct: 1,
            },
            {
              question: "She ___ (wait) for two hours before the bus finally arrived.",
              options: [
                "waited",
                "was waiting",
                "had been waiting",
                "has been waiting",
              ],
              correct: 2,
            },
            {
              question: "By the end of this course, you ___ (complete) forty lessons.",
              options: [
                "complete",
                "will complete",
                "will have completed",
                "are completing",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 10,
        xp_reward: 20,
        order_index: 4,
        progress: null,
      },
      {
        id: "30000000-0000-0000-0000-000000000160",
        unit_id: "20000000-0000-0000-0000-000000000032",
        title: "Kiểm tra - Biểu đạt Sáng tạo",
        type: "quiz",
        content: {
          questions: [
            {
              question: '"Metaphor" nghĩa là gì?',
              options: ["So sánh", "Ẩn dụ", "Nhân hóa", "Hoán dụ"],
              correct: 1,
            },
            {
              question: '"By next year, she ___ her PhD." (hoàn thành)',
              options: [
                "finishes",
                "will finish",
                "will have finished",
                "has finished",
              ],
              correct: 2,
            },
            {
              question: '"Eloquent" mô tả người:',
              options: [
                "Nói rất nhỏ",
                "Nói lưu loát và thuyết phục",
                "Nói rất nhanh",
                "Nói nhiều nhưng không rõ ý",
              ],
              correct: 1,
            },
            {
              question: '"He ___ for three hours before the meeting started."',
              options: [
                "prepared",
                "was preparing",
                "had been preparing",
                "has prepared",
              ],
              correct: 2,
            },
          ],
        },
        duration_minutes: 8,
        xp_reward: 25,
        order_index: 5,
        progress: null,
      },
    ],
  },
];
