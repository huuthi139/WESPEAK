-- Korean A1 Lessons (15 lessons across 3 units)

-- Unit 12: Hangul & Chào hỏi (5 lessons)
INSERT INTO lessons (id, unit_id, title, type, content, duration_minutes, xp_reward, order_index) VALUES
(
  '30000000-0000-0000-0000-000000000056',
  '20000000-0000-0000-0000-000000000012',
  '안녕하세요 - Xin chào',
  'vocabulary',
  '{"words": [{"word": "안녕하세요 (annyeonghaseyo)", "translation": "Xin chào", "phonetic": "an-nyeong-ha-se-yo", "example": "안녕하세요! 만나서 반갑습니다."}, {"word": "감사합니다 (gamsahamnida)", "translation": "Cảm ơn", "phonetic": "gam-sa-ham-ni-da", "example": "감사합니다!"}, {"word": "안녕히 가세요 (annyeonghi gaseyo)", "translation": "Tạm biệt", "phonetic": "an-nyeong-hi ga-se-yo", "example": "안녕히 가세요!"}, {"word": "죄송합니다 (joesonghamnida)", "translation": "Xin lỗi", "phonetic": "joe-song-ham-ni-da", "example": "죄송합니다, 늦었습니다."}, {"word": "네 (ne)", "translation": "Vâng/Dạ", "phonetic": "ne", "example": "네, 알겠습니다."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000057',
  '20000000-0000-0000-0000-000000000012',
  'Nghe chào hỏi tiếng Hàn',
  'listening',
  '{"audio_text": "안녕하세요! 저는 김민수입니다. 만나서 반갑습니다. 저는 한국 사람입니다. 잘 부탁드립니다.", "questions": [{"question": "Người nói tên gì?", "options": ["박지민", "김민수", "이준호", "최영희"], "correct": 1}, {"question": "Người nói là người nước nào?", "options": ["Việt Nam", "Nhật Bản", "Trung Quốc", "Hàn Quốc"], "correct": 3}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000058',
  '20000000-0000-0000-0000-000000000012',
  'Luyện phát âm tiếng Hàn',
  'speaking',
  '{"phrases": [{"text": "안녕하세요!", "translation": "Xin chào!"}, {"text": "만나서 반갑습니다.", "translation": "Rất vui được gặp bạn."}, {"text": "감사합니다!", "translation": "Cảm ơn!"}, {"text": "안녕히 가세요!", "translation": "Tạm biệt! (người đi)"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000059',
  '20000000-0000-0000-0000-000000000012',
  'Bảng chữ cái Hangul',
  'grammar',
  '{"explanation": "Bảng chữ cái Hangul gồm:\\n\\nNguyên âm cơ bản (10):\\nㅏ(a) ㅑ(ya) ㅓ(eo) ㅕ(yeo) ㅗ(o)\\nㅛ(yo) ㅜ(u) ㅠ(yu) ㅡ(eu) ㅣ(i)\\n\\nPhụ âm cơ bản (14):\\nㄱ(g) ㄴ(n) ㄷ(d) ㄹ(r/l) ㅁ(m)\\nㅂ(b) ㅅ(s) ㅇ(ng) ㅈ(j) ㅊ(ch)\\nㅋ(k) ㅌ(t) ㅍ(p) ㅎ(h)\\n\\nGhép: phụ âm + nguyên âm = 1 ký tự\\n가(ga) 나(na) 다(da) 라(ra)", "examples": ["가 = ㄱ + ㅏ = ga", "나 = ㄴ + ㅏ = na", "한 = ㅎ + ㅏ + ㄴ = han"], "exercises": [{"question": "ㅏ đọc là:", "options": ["a", "o", "u", "i"], "correct": 0}, {"question": "가 ghép từ:", "options": ["ㄱ+ㅏ", "ㄴ+ㅏ", "ㄷ+ㅏ", "ㅁ+ㅏ"], "correct": 0}, {"question": "ㄴ đọc là:", "options": ["g", "n", "d", "m"], "correct": 1}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000060',
  '20000000-0000-0000-0000-000000000012',
  'Kiểm tra - Hangul & Chào hỏi',
  'quiz',
  '{"questions": [{"question": "\"안녕하세요\" nghĩa là:", "options": ["Tạm biệt", "Cảm ơn", "Xin chào", "Xin lỗi"], "correct": 2}, {"question": "\"감사합니다\" dùng khi:", "options": ["Xin lỗi", "Cảm ơn", "Chào hỏi", "Từ chối"], "correct": 1}, {"question": "Hangul có bao nhiêu nguyên âm cơ bản?", "options": ["8", "10", "12", "14"], "correct": 1}, {"question": "가 đọc là:", "options": ["na", "da", "ga", "ma"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 13: Tự giới thiệu (5 lessons)
(
  '30000000-0000-0000-0000-000000000061',
  '20000000-0000-0000-0000-000000000013',
  '자기소개 - Tự giới thiệu',
  'vocabulary',
  '{"words": [{"word": "저 (jeo)", "translation": "Tôi (lịch sự)", "phonetic": "jeo", "example": "저는 학생입니다."}, {"word": "이름 (ireum)", "translation": "Tên", "phonetic": "i-reum", "example": "이름이 뭐예요?"}, {"word": "나라 (nara)", "translation": "Đất nước", "phonetic": "na-ra", "example": "어느 나라 사람이에요?"}, {"word": "베트남 (beteunam)", "translation": "Việt Nam", "phonetic": "be-teu-nam", "example": "저는 베트남 사람입니다."}, {"word": "학생 (haksaeng)", "translation": "Học sinh", "phonetic": "hak-saeng", "example": "저는 학생입니다."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000062',
  '20000000-0000-0000-0000-000000000013',
  'Nghe tự giới thiệu',
  'listening',
  '{"audio_text": "안녕하세요! 저는 응우옌 민입니다. 저는 베트남 사람입니다. 저는 스물다섯 살입니다. 저는 회사원입니다. 한국어를 공부합니다.", "questions": [{"question": "Người nói là người nước nào?", "options": ["Hàn Quốc", "Nhật Bản", "Việt Nam", "Trung Quốc"], "correct": 2}, {"question": "Người nói làm nghề gì?", "options": ["Học sinh", "Nhân viên công ty", "Giáo viên", "Bác sĩ"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000063',
  '20000000-0000-0000-0000-000000000013',
  'Nói về bản thân bằng tiếng Hàn',
  'speaking',
  '{"phrases": [{"text": "저는 ...입니다.", "translation": "Tôi là..."}, {"text": "저는 베트남 사람입니다.", "translation": "Tôi là người Việt Nam."}, {"text": "이름이 뭐예요?", "translation": "Tên bạn là gì?"}, {"text": "만나서 반갑습니다.", "translation": "Rất vui được gặp bạn."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000064',
  '20000000-0000-0000-0000-000000000013',
  'Cấu trúc -입니다 / -이에요',
  'grammar',
  '{"explanation": "Cấu trúc \"A là B\" trong tiếng Hàn:\\n\\nTrang trọng: N + 입니다 (imnida)\\n- 저는 학생입니다. (Tôi là học sinh)\\n\\nThân mật: N + 이에요/예요 (ieyo/yeyo)\\n- Kết thúc phụ âm: 이에요 → 학생이에요\\n- Kết thúc nguyên âm: 예요 → 의사예요\\n\\nPhủ định: N + 이/가 아닙니다\\n- 저는 학생이 아닙니다. (Tôi không phải HS)", "examples": ["저는 학생입니다. - Tôi là học sinh.", "이것은 책이에요. - Đây là sách.", "저는 선생님이 아닙니다. - Tôi không phải GV."], "exercises": [{"question": "저는 학생___. (trang trọng)", "options": ["입니다", "이에요", "예요", "아닙니다"], "correct": 0}, {"question": "이것은 책___. (thân mật, có phụ âm cuối)", "options": ["입니다", "이에요", "예요", "아닙니다"], "correct": 1}, {"question": "저는 의사가 ___. (phủ định)", "options": ["입니다", "이에요", "예요", "아닙니다"], "correct": 3}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000065',
  '20000000-0000-0000-0000-000000000013',
  'Kiểm tra - Tự giới thiệu',
  'quiz',
  '{"questions": [{"question": "\"저\" nghĩa là:", "options": ["Bạn", "Anh ấy", "Tôi", "Chúng tôi"], "correct": 2}, {"question": "\"이름\" nghĩa là:", "options": ["Tuổi", "Tên", "Nghề", "Nước"], "correct": 1}, {"question": "\"입니다\" dùng trong ngữ cảnh:", "options": ["Bạn bè", "Trang trọng", "Trẻ em", "Gia đình"], "correct": 1}, {"question": "Phủ định của 입니다:", "options": ["없습니다", "모릅니다", "아닙니다", "싫습니다"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 14: Cuộc sống hàng ngày (5 lessons)
(
  '30000000-0000-0000-0000-000000000066',
  '20000000-0000-0000-0000-000000000014',
  '일상생활 - Sinh hoạt hàng ngày',
  'vocabulary',
  '{"words": [{"word": "먹다 (meokda)", "translation": "Ăn", "phonetic": "meok-da", "example": "밥을 먹다."}, {"word": "마시다 (masida)", "translation": "Uống", "phonetic": "ma-si-da", "example": "커피를 마시다."}, {"word": "가다 (gada)", "translation": "Đi", "phonetic": "ga-da", "example": "학교에 가다."}, {"word": "오다 (oda)", "translation": "Đến", "phonetic": "o-da", "example": "집에 오다."}, {"word": "하다 (hada)", "translation": "Làm", "phonetic": "ha-da", "example": "공부하다."}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000067',
  '20000000-0000-0000-0000-000000000014',
  'Nghe một ngày bình thường',
  'listening',
  '{"audio_text": "저는 아침 7시에 일어납니다. 아침을 먹고 학교에 갑니다. 오후 5시에 집에 옵니다. 저녁에 한국어를 공부합니다. 11시에 잡니다.", "questions": [{"question": "Mấy giờ thức dậy?", "options": ["6 giờ", "7 giờ", "8 giờ", "9 giờ"], "correct": 1}, {"question": "Buổi tối làm gì?", "options": ["Xem TV", "Học tiếng Hàn", "Đi chơi", "Nấu ăn"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000068',
  '20000000-0000-0000-0000-000000000014',
  'Nói về ngày của bạn',
  'speaking',
  '{"phrases": [{"text": "아침에 일어납니다.", "translation": "Sáng tôi thức dậy."}, {"text": "학교에 갑니다.", "translation": "Tôi đi học."}, {"text": "점심을 먹습니다.", "translation": "Tôi ăn trưa."}, {"text": "한국어를 공부합니다.", "translation": "Tôi học tiếng Hàn."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000069',
  '20000000-0000-0000-0000-000000000014',
  'Chia động từ -ㅂ니다 / -습니다',
  'grammar',
  '{"explanation": "Chia động từ thể trang trọng (formal):\\n\\nBỏ 다 ở gốc:\\n- Kết thúc nguyên âm: + ㅂ니다\\n  가다 → 갑니다 (đi)\\n  오다 → 옵니다 (đến)\\n\\n- Kết thúc phụ âm: + 습니다\\n  먹다 → 먹습니다 (ăn)\\n  읽다 → 읽습니다 (đọc)\\n\\nCâu hỏi: thay 다 → 까?\\n  갑니까? (đi không?)", "examples": ["저는 밥을 먹습니다. - Tôi ăn cơm.", "학교에 갑니다. - Đi học.", "뭐 먹습니까? - Ăn gì?"], "exercises": [{"question": "가다 → ___ (formal)", "options": ["갑니다", "가습니다", "가니다", "갈니다"], "correct": 0}, {"question": "먹다 → ___", "options": ["먹니다", "먹습니다", "먹ㅂ니다", "먹읍니다"], "correct": 1}, {"question": "마시다 → ___", "options": ["마십니다", "마시습니다", "마싶니다", "마심니다"], "correct": 0}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000070',
  '20000000-0000-0000-0000-000000000014',
  'Kiểm tra - Cuộc sống hàng ngày',
  'quiz',
  '{"questions": [{"question": "\"먹다\" nghĩa là:", "options": ["Uống", "Ăn", "Đi", "Ngủ"], "correct": 1}, {"question": "\"학교에 갑니다\" nghĩa là:", "options": ["Đi làm", "Đi học", "Đi chơi", "Đi chợ"], "correct": 1}, {"question": "가다 chia formal là:", "options": ["가습니다", "갑니다", "가니다", "갈니다"], "correct": 1}, {"question": "\"마시다\" nghĩa là:", "options": ["Ăn", "Ngủ", "Uống", "Đi"], "correct": 2}]}',
  5, 20, 5
);
