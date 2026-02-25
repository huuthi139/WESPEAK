-- English A2 Lessons (20 lessons across 4 units)

-- Unit 5: Du lịch & Phương hướng (5 lessons)
INSERT INTO lessons (id, unit_id, title, type, content, duration_minutes, xp_reward, order_index) VALUES
(
  '30000000-0000-0000-0000-000000000021',
  '20000000-0000-0000-0000-000000000005',
  'Travel Vocabulary - Từ vựng du lịch',
  'vocabulary',
  '{"words": [{"word": "Airport", "translation": "Sân bay", "phonetic": "/ˈɛrpɔːrt/", "example": "We arrived at the airport early."}, {"word": "Hotel", "translation": "Khách sạn", "phonetic": "/hoʊˈtɛl/", "example": "The hotel is near the beach."}, {"word": "Passport", "translation": "Hộ chiếu", "phonetic": "/ˈpæspɔːrt/", "example": "Don''t forget your passport!"}, {"word": "Ticket", "translation": "Vé", "phonetic": "/ˈtɪkɪt/", "example": "I bought a train ticket."}, {"word": "Luggage", "translation": "Hành lý", "phonetic": "/ˈlʌɡɪdʒ/", "example": "My luggage is heavy."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000022',
  '20000000-0000-0000-0000-000000000005',
  'Asking for directions - Hỏi đường',
  'listening',
  '{"audio_text": "Excuse me, how do I get to the train station? Go straight for two blocks, then turn left. The station is on your right, next to the park. It takes about ten minutes on foot.", "questions": [{"question": "Người hỏi muốn đi đâu?", "options": ["Bệnh viện", "Ga tàu", "Công viên", "Sân bay"], "correct": 1}, {"question": "Đi bộ mất bao lâu?", "options": ["5 phút", "10 phút", "15 phút", "20 phút"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000023',
  '20000000-0000-0000-0000-000000000005',
  'At the hotel - Tại khách sạn',
  'speaking',
  '{"phrases": [{"text": "I have a reservation.", "translation": "Tôi đã đặt phòng."}, {"text": "Can I check in?", "translation": "Tôi có thể nhận phòng không?"}, {"text": "Where is the elevator?", "translation": "Thang máy ở đâu?"}, {"text": "What time is checkout?", "translation": "Mấy giờ trả phòng?"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000024',
  '20000000-0000-0000-0000-000000000005',
  'Prepositions of place - Giới từ chỉ nơi chốn',
  'grammar',
  '{"explanation": "Giới từ chỉ vị trí:\\n- IN: trong (in the room, in Vietnam)\\n- ON: trên (on the table, on the left)\\n- AT: tại (at the station, at home)\\n- NEXT TO: bên cạnh\\n- BETWEEN: ở giữa\\n- OPPOSITE: đối diện", "examples": ["The bank is next to the hotel.", "Turn left at the traffic light.", "The shop is between the park and the school."], "exercises": [{"question": "The cat is ___ the box.", "options": ["in", "on", "at", "to"], "correct": 0}, {"question": "I''ll meet you ___ the station.", "options": ["in", "on", "at", "between"], "correct": 2}, {"question": "The park is ___ the museum.", "options": ["in", "between", "at", "next to"], "correct": 3}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000025',
  '20000000-0000-0000-0000-000000000005',
  'Kiểm tra - Du lịch',
  'quiz',
  '{"questions": [{"question": "\"Passport\" nghĩa là gì?", "options": ["Vé máy bay", "Hộ chiếu", "Hành lý", "Bản đồ"], "correct": 1}, {"question": "\"Turn left\" nghĩa là:", "options": ["Rẽ phải", "Đi thẳng", "Rẽ trái", "Quay lại"], "correct": 2}, {"question": "\"The hotel is ___ the beach.\"", "options": ["in", "at", "on", "near"], "correct": 3}, {"question": "\"I have a reservation\" dùng khi:", "options": ["Mua vé", "Nhận phòng", "Hỏi đường", "Đổi tiền"], "correct": 1}]}',
  5, 20, 5
),

-- Unit 6: Mua sắm (5 lessons)
(
  '30000000-0000-0000-0000-000000000026',
  '20000000-0000-0000-0000-000000000006',
  'Shopping Words - Từ vựng mua sắm',
  'vocabulary',
  '{"words": [{"word": "Price", "translation": "Giá", "phonetic": "/praɪs/", "example": "What is the price of this shirt?"}, {"word": "Cheap", "translation": "Rẻ", "phonetic": "/tʃiːp/", "example": "This bag is cheap."}, {"word": "Expensive", "translation": "Đắt", "phonetic": "/ɪkˈspɛnsɪv/", "example": "That watch is too expensive."}, {"word": "Size", "translation": "Kích cỡ", "phonetic": "/saɪz/", "example": "What size do you wear?"}, {"word": "Discount", "translation": "Giảm giá", "phonetic": "/ˈdɪskaʊnt/", "example": "Is there a discount?"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000027',
  '20000000-0000-0000-0000-000000000006',
  'At the shop - Tại cửa hàng',
  'listening',
  '{"audio_text": "Customer: Excuse me, how much is this dress? Seller: It''s fifty dollars. Customer: That''s a bit expensive. Do you have a smaller size? Seller: Yes, let me check. Here you go, size S. Customer: Great, I''ll take it!", "questions": [{"question": "Chiếc váy giá bao nhiêu?", "options": ["30 đô", "40 đô", "50 đô", "60 đô"], "correct": 2}, {"question": "Khách muốn size gì?", "options": ["Size L", "Size M", "Size S", "Size XL"], "correct": 2}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000028',
  '20000000-0000-0000-0000-000000000006',
  'Bargaining - Trả giá',
  'speaking',
  '{"phrases": [{"text": "How much is this?", "translation": "Cái này bao nhiêu?"}, {"text": "That''s too expensive!", "translation": "Đắt quá!"}, {"text": "Can you give me a discount?", "translation": "Bạn có thể giảm giá không?"}, {"text": "I''ll take it.", "translation": "Tôi lấy cái này."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000029',
  '20000000-0000-0000-0000-000000000006',
  'Comparatives - So sánh hơn',
  'grammar',
  '{"explanation": "So sánh hơn trong tiếng Anh:\\n- Tính từ ngắn: thêm -er → cheaper, bigger, taller\\n- Tính từ dài: more + adj → more expensive, more beautiful\\n- Bất quy tắc: good → better, bad → worse", "examples": ["This shirt is cheaper than that one.", "The red bag is more expensive.", "This quality is better."], "exercises": [{"question": "This is ___ than that. (cheap)", "options": ["cheap", "cheaper", "cheapest", "more cheap"], "correct": 1}, {"question": "She is ___ than me. (tall)", "options": ["tall", "taller", "tallest", "more tall"], "correct": 1}, {"question": "This phone is ___ than that one. (expensive)", "options": ["expensiver", "more expensive", "most expensive", "expensive"], "correct": 1}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000030',
  '20000000-0000-0000-0000-000000000006',
  'Kiểm tra - Mua sắm',
  'quiz',
  '{"questions": [{"question": "\"Discount\" nghĩa là:", "options": ["Tăng giá", "Giảm giá", "Đổi trả", "Thanh toán"], "correct": 1}, {"question": "\"How much is this?\" hỏi về:", "options": ["Kích cỡ", "Màu sắc", "Giá tiền", "Chất liệu"], "correct": 2}, {"question": "\"Cheaper\" là so sánh hơn của:", "options": ["cheap", "dear", "expense", "cost"], "correct": 0}, {"question": "\"I''ll take it\" nghĩa là:", "options": ["Tôi không lấy", "Tôi sẽ lấy cái này", "Tôi đổi cái khác", "Tôi trả lại"], "correct": 1}]}',
  5, 20, 5
),

-- Unit 7: Công việc & Nghề nghiệp (5 lessons)
(
  '30000000-0000-0000-0000-000000000031',
  '20000000-0000-0000-0000-000000000007',
  'Jobs - Nghề nghiệp',
  'vocabulary',
  '{"words": [{"word": "Doctor", "translation": "Bác sĩ", "phonetic": "/ˈdɑːktər/", "example": "She is a doctor at the hospital."}, {"word": "Engineer", "translation": "Kỹ sư", "phonetic": "/ˌɛndʒɪˈnɪr/", "example": "He works as an engineer."}, {"word": "Teacher", "translation": "Giáo viên", "phonetic": "/ˈtiːtʃər/", "example": "My teacher is very kind."}, {"word": "Office", "translation": "Văn phòng", "phonetic": "/ˈɔːfɪs/", "example": "I work in an office."}, {"word": "Salary", "translation": "Lương", "phonetic": "/ˈsæləri/", "example": "The salary is good."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000032',
  '20000000-0000-0000-0000-000000000007',
  'Job Interview - Phỏng vấn',
  'listening',
  '{"audio_text": "Interviewer: Tell me about yourself. Candidate: I graduated from university last year. I studied computer science. I have worked as an intern for six months. Interviewer: Why do you want this job? Candidate: I am passionate about technology and want to grow my career.", "questions": [{"question": "Ứng viên học ngành gì?", "options": ["Kinh tế", "Y khoa", "Khoa học máy tính", "Luật"], "correct": 2}, {"question": "Ứng viên đã thực tập bao lâu?", "options": ["3 tháng", "6 tháng", "1 năm", "2 năm"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000033',
  '20000000-0000-0000-0000-000000000007',
  'At work - Tại nơi làm việc',
  'speaking',
  '{"phrases": [{"text": "What do you do for a living?", "translation": "Bạn làm nghề gì?"}, {"text": "I work as a software developer.", "translation": "Tôi làm lập trình viên."}, {"text": "I have a meeting at 2 PM.", "translation": "Tôi có cuộc họp lúc 2 giờ chiều."}, {"text": "Can you send me the report?", "translation": "Bạn gửi báo cáo cho tôi được không?"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000034',
  '20000000-0000-0000-0000-000000000007',
  'Present Simple vs Continuous',
  'grammar',
  '{"explanation": "Present Simple: thói quen, sự thật\\n- I work every day. She teaches English.\\n\\nPresent Continuous: đang xảy ra\\n- I am working now. She is teaching a class.\\n\\nDấu hiệu:\\n- Simple: always, usually, every day\\n- Continuous: now, right now, at the moment", "examples": ["I usually start work at 8 AM.", "I am working on a project right now.", "She teaches math. She is teaching now."], "exercises": [{"question": "She ___ English every day. (teach)", "options": ["teach", "teaches", "is teaching", "teaching"], "correct": 1}, {"question": "I ___ a report right now. (write)", "options": ["write", "writes", "am writing", "writing"], "correct": 2}, {"question": "They usually ___ at 6 PM.", "options": ["finish", "finishes", "are finishing", "finishing"], "correct": 0}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000035',
  '20000000-0000-0000-0000-000000000007',
  'Kiểm tra - Công việc',
  'quiz',
  '{"questions": [{"question": "\"Engineer\" nghĩa là:", "options": ["Giáo viên", "Bác sĩ", "Kỹ sư", "Luật sư"], "correct": 2}, {"question": "\"What do you do?\" hỏi về:", "options": ["Sở thích", "Nghề nghiệp", "Tuổi tác", "Quê quán"], "correct": 1}, {"question": "\"I ___ at 8 AM every day.\" (bắt đầu)", "options": ["start", "starts", "am starting", "starting"], "correct": 0}, {"question": "Chọn Present Continuous:", "options": ["I work here.", "I am working now.", "I worked yesterday.", "I will work."], "correct": 1}]}',
  5, 20, 5
),

-- Unit 8: Sức khỏe & Bệnh viện (5 lessons)
(
  '30000000-0000-0000-0000-000000000036',
  '20000000-0000-0000-0000-000000000008',
  'Health Words - Từ vựng sức khỏe',
  'vocabulary',
  '{"words": [{"word": "Headache", "translation": "Đau đầu", "phonetic": "/ˈhɛdeɪk/", "example": "I have a terrible headache."}, {"word": "Fever", "translation": "Sốt", "phonetic": "/ˈfiːvər/", "example": "She has a high fever."}, {"word": "Medicine", "translation": "Thuốc", "phonetic": "/ˈmɛdɪsɪn/", "example": "Take this medicine twice a day."}, {"word": "Hospital", "translation": "Bệnh viện", "phonetic": "/ˈhɑːspɪtl/", "example": "He went to the hospital."}, {"word": "Cough", "translation": "Ho", "phonetic": "/kɔːf/", "example": "I have a bad cough."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000037',
  '20000000-0000-0000-0000-000000000008',
  'At the doctor - Khám bệnh',
  'listening',
  '{"audio_text": "Doctor: What seems to be the problem? Patient: I have a headache and a sore throat. Doctor: How long have you had these symptoms? Patient: For about three days. Doctor: Let me check. You have a cold. Take this medicine and rest for two days.", "questions": [{"question": "Bệnh nhân bị gì?", "options": ["Đau bụng", "Đau đầu và đau họng", "Gãy tay", "Đau lưng"], "correct": 1}, {"question": "Bác sĩ chẩn đoán bệnh gì?", "options": ["Cúm", "Cảm lạnh", "Dị ứng", "Viêm phổi"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000038',
  '20000000-0000-0000-0000-000000000008',
  'Describing symptoms - Mô tả triệu chứng',
  'speaking',
  '{"phrases": [{"text": "I don''t feel well.", "translation": "Tôi không khỏe."}, {"text": "I have a stomachache.", "translation": "Tôi bị đau bụng."}, {"text": "I need to see a doctor.", "translation": "Tôi cần gặp bác sĩ."}, {"text": "How often should I take this medicine?", "translation": "Tôi nên uống thuốc này bao lâu một lần?"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000039',
  '20000000-0000-0000-0000-000000000008',
  'Should & Must - Lời khuyên',
  'grammar',
  '{"explanation": "SHOULD: nên (lời khuyên)\\n- You should rest. (Bạn nên nghỉ ngơi)\\n- You shouldn''t eat too much. (Bạn không nên ăn nhiều)\\n\\nMUST: phải (bắt buộc)\\n- You must take medicine. (Bạn phải uống thuốc)\\n- You must not skip meals. (Bạn không được bỏ bữa)", "examples": ["You should drink more water.", "You must see a doctor.", "You shouldn''t stay up late."], "exercises": [{"question": "You ___ rest more. (lời khuyên)", "options": ["should", "must", "can", "will"], "correct": 0}, {"question": "You ___ take this medicine. (bắt buộc)", "options": ["should", "must", "can", "might"], "correct": 1}, {"question": "You ___ smoke here. (cấm)", "options": ["should", "shouldn''t", "must not", "don''t"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000040',
  '20000000-0000-0000-0000-000000000008',
  'Kiểm tra - Sức khỏe',
  'quiz',
  '{"questions": [{"question": "\"Fever\" nghĩa là:", "options": ["Ho", "Sốt", "Đau đầu", "Dị ứng"], "correct": 1}, {"question": "\"I don''t feel well\" nghĩa là:", "options": ["Tôi khỏe", "Tôi không khỏe", "Tôi đói", "Tôi vui"], "correct": 1}, {"question": "\"You should rest\" nghĩa là:", "options": ["Bạn phải chạy", "Bạn nên nghỉ", "Bạn phải đi", "Bạn nên ăn"], "correct": 1}, {"question": "Khi bị ốm nói:", "options": ["I am hungry", "I am happy", "I need a doctor", "I want to play"], "correct": 2}]}',
  5, 20, 5
);
