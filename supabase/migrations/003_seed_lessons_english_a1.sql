-- English A1 Lessons (20 lessons across 4 units)

-- Unit 1: Chào hỏi & Giới thiệu (5 lessons)
INSERT INTO lessons (id, unit_id, title, type, content, duration_minutes, xp_reward, order_index) VALUES
(
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'Greetings - Lời chào',
  'vocabulary',
  '{"words": [{"word": "Hello", "translation": "Xin chào", "phonetic": "/həˈloʊ/", "example": "Hello, how are you?"}, {"word": "Goodbye", "translation": "Tạm biệt", "phonetic": "/ɡʊdˈbaɪ/", "example": "Goodbye, see you tomorrow!"}, {"word": "Good morning", "translation": "Chào buổi sáng", "phonetic": "/ɡʊd ˈmɔːrnɪŋ/", "example": "Good morning, teacher!"}, {"word": "Good night", "translation": "Chúc ngủ ngon", "phonetic": "/ɡʊd naɪt/", "example": "Good night, sweet dreams."}, {"word": "Thank you", "translation": "Cảm ơn", "phonetic": "/θæŋk juː/", "example": "Thank you very much!"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  'How are you? - Bạn khỏe không?',
  'listening',
  '{"audio_text": "Hi! My name is Anna. How are you today? I am fine, thank you. Nice to meet you!", "questions": [{"question": "Người nói tên gì?", "options": ["Anna", "Amy", "Alice", "Alex"], "correct": 0}, {"question": "Người nói cảm thấy thế nào?", "options": ["Buồn", "Khỏe", "Mệt", "Đói"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  'Introduce yourself - Giới thiệu bản thân',
  'speaking',
  '{"phrases": [{"text": "My name is...", "translation": "Tên tôi là..."}, {"text": "I am from Vietnam.", "translation": "Tôi đến từ Việt Nam."}, {"text": "Nice to meet you!", "translation": "Rất vui được gặp bạn!"}, {"text": "How are you?", "translation": "Bạn khỏe không?"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  'To be - Động từ To be',
  'grammar',
  '{"explanation": "Động từ TO BE (am/is/are) dùng để giới thiệu bản thân:\\n- I am (I''m) → Tôi là\\n- You are (You''re) → Bạn là\\n- He is (He''s) / She is (She''s) → Anh ấy / Cô ấy là", "examples": ["I am a student.", "She is a teacher.", "They are friends."], "exercises": [{"question": "I ___ a student.", "options": ["am", "is", "are", "be"], "correct": 0}, {"question": "She ___ from Korea.", "options": ["am", "is", "are", "be"], "correct": 1}, {"question": "They ___ happy.", "options": ["am", "is", "are", "be"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  'Kiểm tra - Chào hỏi',
  'quiz',
  '{"questions": [{"question": "\"Xin chào\" trong tiếng Anh là gì?", "options": ["Goodbye", "Hello", "Sorry", "Thanks"], "correct": 1}, {"question": "\"Nice to meet you\" nghĩa là gì?", "options": ["Tạm biệt", "Cảm ơn", "Rất vui được gặp bạn", "Xin lỗi"], "correct": 2}, {"question": "Chọn câu đúng:", "options": ["I is student", "I am a student", "I are student", "I be student"], "correct": 1}, {"question": "\"Good morning\" dùng khi nào?", "options": ["Buổi tối", "Buổi sáng", "Buổi trưa", "Khi ngủ"], "correct": 1}]}',
  5, 20, 5
),

-- Unit 2: Gia đình & Bạn bè (5 lessons)
(
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000002',
  'Family Members - Thành viên gia đình',
  'vocabulary',
  '{"words": [{"word": "Mother", "translation": "Mẹ", "phonetic": "/ˈmʌðər/", "example": "My mother is a doctor."}, {"word": "Father", "translation": "Bố", "phonetic": "/ˈfɑːðər/", "example": "My father works in an office."}, {"word": "Sister", "translation": "Chị/em gái", "phonetic": "/ˈsɪstər/", "example": "I have one sister."}, {"word": "Brother", "translation": "Anh/em trai", "phonetic": "/ˈbrʌðər/", "example": "My brother is tall."}, {"word": "Family", "translation": "Gia đình", "phonetic": "/ˈfæməli/", "example": "I love my family."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000002',
  'My Family - Gia đình tôi',
  'listening',
  '{"audio_text": "I have a big family. My father is a teacher. My mother is a nurse. I have two brothers and one sister. We live in Hanoi.", "questions": [{"question": "Bố của người nói làm nghề gì?", "options": ["Bác sĩ", "Giáo viên", "Kỹ sư", "Y tá"], "correct": 1}, {"question": "Người nói có bao nhiêu anh/em trai?", "options": ["1", "2", "3", "4"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000002',
  'Talk about family - Nói về gia đình',
  'speaking',
  '{"phrases": [{"text": "I have two brothers.", "translation": "Tôi có hai anh/em trai."}, {"text": "My mother is kind.", "translation": "Mẹ tôi rất tốt bụng."}, {"text": "We are a happy family.", "translation": "Chúng tôi là một gia đình hạnh phúc."}, {"text": "My sister is older than me.", "translation": "Chị gái tôi lớn hơn tôi."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000002',
  'Possessive - Sở hữu cách',
  'grammar',
  '{"explanation": "Tính từ sở hữu trong tiếng Anh:\\n- My (của tôi)\\n- Your (của bạn)\\n- His (của anh ấy)\\n- Her (của cô ấy)\\n- Our (của chúng tôi)\\n- Their (của họ)", "examples": ["This is my book.", "Her name is Lan.", "Their house is big."], "exercises": [{"question": "___ name is Minh. (tôi)", "options": ["My", "Your", "His", "Her"], "correct": 0}, {"question": "This is ___ sister. (anh ấy)", "options": ["my", "your", "his", "her"], "correct": 2}, {"question": "___ family is big. (chúng tôi)", "options": ["My", "Your", "Our", "Their"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000002',
  'Kiểm tra - Gia đình',
  'quiz',
  '{"questions": [{"question": "\"Mother\" nghĩa là gì?", "options": ["Bố", "Mẹ", "Chị gái", "Anh trai"], "correct": 1}, {"question": "\"I have two ___\" (em gái)", "options": ["brothers", "sisters", "mothers", "fathers"], "correct": 1}, {"question": "Chọn đúng: ___ father is a doctor.", "options": ["I", "Me", "My", "Mine"], "correct": 2}, {"question": "\"Family\" có nghĩa là:", "options": ["Bạn bè", "Trường học", "Gia đình", "Công việc"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 3: Số đếm & Thời gian (5 lessons)
(
  '30000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000003',
  'Numbers 1-20 - Số đếm',
  'vocabulary',
  '{"words": [{"word": "One", "translation": "Một", "phonetic": "/wʌn/", "example": "I have one cat."}, {"word": "Five", "translation": "Năm", "phonetic": "/faɪv/", "example": "There are five apples."}, {"word": "Ten", "translation": "Mười", "phonetic": "/tɛn/", "example": "I count to ten."}, {"word": "Fifteen", "translation": "Mười lăm", "phonetic": "/fɪfˈtiːn/", "example": "She is fifteen years old."}, {"word": "Twenty", "translation": "Hai mươi", "phonetic": "/ˈtwɛnti/", "example": "I have twenty books."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000003',
  'What time is it? - Mấy giờ rồi?',
  'listening',
  '{"audio_text": "Excuse me, what time is it? It is three o''clock. The meeting starts at five thirty. Please come before ten fifteen.", "questions": [{"question": "Bây giờ mấy giờ?", "options": ["2 giờ", "3 giờ", "4 giờ", "5 giờ"], "correct": 1}, {"question": "Cuộc họp bắt đầu lúc mấy giờ?", "options": ["3:00", "4:30", "5:30", "10:15"], "correct": 2}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000013',
  '20000000-0000-0000-0000-000000000003',
  'Telling time - Nói giờ',
  'speaking',
  '{"phrases": [{"text": "What time is it?", "translation": "Mấy giờ rồi?"}, {"text": "It is seven o''clock.", "translation": "Bây giờ là 7 giờ."}, {"text": "The class starts at nine.", "translation": "Lớp học bắt đầu lúc 9 giờ."}, {"text": "I wake up at six thirty.", "translation": "Tôi thức dậy lúc 6 giờ 30."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000014',
  '20000000-0000-0000-0000-000000000003',
  'Days & Months - Ngày tháng',
  'grammar',
  '{"explanation": "Các ngày trong tuần:\\n- Monday (Thứ Hai), Tuesday (Thứ Ba), Wednesday (Thứ Tư)\\n- Thursday (Thứ Năm), Friday (Thứ Sáu)\\n- Saturday (Thứ Bảy), Sunday (Chủ Nhật)\\n\\nDùng ON + ngày: on Monday, on Friday", "examples": ["I go to school on Monday.", "The party is on Saturday.", "We rest on Sunday."], "exercises": [{"question": "Ngày nào sau Saturday?", "options": ["Monday", "Friday", "Sunday", "Tuesday"], "correct": 2}, {"question": "I have English class ___ Wednesday.", "options": ["in", "on", "at", "to"], "correct": 1}, {"question": "\"Thứ Sáu\" tiếng Anh là:", "options": ["Thursday", "Friday", "Saturday", "Sunday"], "correct": 1}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000015',
  '20000000-0000-0000-0000-000000000003',
  'Kiểm tra - Số & Thời gian',
  'quiz',
  '{"questions": [{"question": "\"Fifteen\" là số mấy?", "options": ["5", "10", "15", "50"], "correct": 2}, {"question": "3:30 đọc là:", "options": ["Three thirty", "Three thirteen", "Thirteen three", "Thirty three"], "correct": 0}, {"question": "Ngày đầu tuần là:", "options": ["Sunday", "Monday", "Saturday", "Friday"], "correct": 1}, {"question": "\"I wake up ___ 6 AM\"", "options": ["in", "on", "at", "to"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 4: Thức ăn & Đồ uống (5 lessons)
(
  '30000000-0000-0000-0000-000000000016',
  '20000000-0000-0000-0000-000000000004',
  'Food & Drinks - Đồ ăn thức uống',
  'vocabulary',
  '{"words": [{"word": "Rice", "translation": "Cơm", "phonetic": "/raɪs/", "example": "I eat rice every day."}, {"word": "Water", "translation": "Nước", "phonetic": "/ˈwɔːtər/", "example": "Can I have some water?"}, {"word": "Coffee", "translation": "Cà phê", "phonetic": "/ˈkɔːfi/", "example": "I drink coffee in the morning."}, {"word": "Chicken", "translation": "Thịt gà", "phonetic": "/ˈtʃɪkɪn/", "example": "I like fried chicken."}, {"word": "Bread", "translation": "Bánh mì", "phonetic": "/brɛd/", "example": "I have bread for breakfast."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000017',
  '20000000-0000-0000-0000-000000000004',
  'At the restaurant - Tại nhà hàng',
  'listening',
  '{"audio_text": "Waiter: Good evening! What would you like to order? Customer: I would like chicken and rice, please. Waiter: Would you like something to drink? Customer: Yes, a glass of water, please. Waiter: Sure, coming right up!", "questions": [{"question": "Khách hàng gọi món gì?", "options": ["Cá và cơm", "Gà và cơm", "Phở", "Bánh mì"], "correct": 1}, {"question": "Khách uống gì?", "options": ["Cà phê", "Trà", "Nước", "Nước cam"], "correct": 2}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000018',
  '20000000-0000-0000-0000-000000000004',
  'Ordering food - Gọi món',
  'speaking',
  '{"phrases": [{"text": "I would like...", "translation": "Tôi muốn..."}, {"text": "Can I have the menu?", "translation": "Cho tôi xem thực đơn được không?"}, {"text": "How much is this?", "translation": "Cái này bao nhiêu tiền?"}, {"text": "The bill, please.", "translation": "Tính tiền giúp tôi."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000019',
  '20000000-0000-0000-0000-000000000004',
  'Countable & Uncountable - Đếm được & Không đếm được',
  'grammar',
  '{"explanation": "Danh từ đếm được: dùng a/an, số đếm\\n- a banana, two apples, three eggs\\n\\nDanh từ không đếm được: KHÔNG dùng a/an\\n- water, rice, coffee, bread\\n- Dùng: some water, a glass of water, a cup of coffee", "examples": ["I want an apple.", "Can I have some water?", "Two cups of coffee, please."], "exercises": [{"question": "I want ___ apple.", "options": ["a", "an", "some", "any"], "correct": 1}, {"question": "Can I have ___ water?", "options": ["a", "an", "some", "two"], "correct": 2}, {"question": "She eats three ___.", "options": ["rice", "bread", "egg", "eggs"], "correct": 3}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000020',
  '20000000-0000-0000-0000-000000000004',
  'Kiểm tra - Thức ăn',
  'quiz',
  '{"questions": [{"question": "\"Rice\" nghĩa là gì?", "options": ["Bánh mì", "Cơm", "Phở", "Mì"], "correct": 1}, {"question": "\"Can I have some ___?\" (nước)", "options": ["water", "waters", "a water", "the water"], "correct": 0}, {"question": "\"I would like\" dùng khi:", "options": ["Chào hỏi", "Gọi món lịch sự", "Tạm biệt", "Xin lỗi"], "correct": 1}, {"question": "Chọn đúng:", "options": ["a coffee", "two coffee", "a cup of coffee", "an coffee"], "correct": 2}]}',
  5, 20, 5
);
