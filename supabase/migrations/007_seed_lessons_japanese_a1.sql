-- Japanese A1 Lessons (15 lessons across 3 units)

-- Unit 15: Hiragana & Chào hỏi (5 lessons)
INSERT INTO lessons (id, unit_id, title, type, content, duration_minutes, xp_reward, order_index) VALUES
(
  '30000000-0000-0000-0000-000000000071',
  '20000000-0000-0000-0000-000000000015',
  'こんにちは - Xin chào',
  'vocabulary',
  '{"words": [{"word": "こんにちは (konnichiwa)", "translation": "Xin chào", "phonetic": "kon-ni-chi-wa", "example": "こんにちは！お元気ですか？"}, {"word": "ありがとう (arigatou)", "translation": "Cảm ơn", "phonetic": "a-ri-ga-tou", "example": "ありがとうございます！"}, {"word": "さようなら (sayounara)", "translation": "Tạm biệt", "phonetic": "sa-you-na-ra", "example": "さようなら！また明日！"}, {"word": "すみません (sumimasen)", "translation": "Xin lỗi / Cho hỏi", "phonetic": "su-mi-ma-sen", "example": "すみません、駅はどこですか？"}, {"word": "はい (hai)", "translation": "Vâng", "phonetic": "ha-i", "example": "はい、そうです。"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000072',
  '20000000-0000-0000-0000-000000000015',
  'Nghe chào hỏi tiếng Nhật',
  'listening',
  '{"audio_text": "こんにちは！私は田中です。はじめまして。日本人です。よろしくお願いします。", "questions": [{"question": "Người nói họ gì?", "options": ["佐藤", "田中", "鈴木", "山田"], "correct": 1}, {"question": "Người nói là người nước nào?", "options": ["Trung Quốc", "Hàn Quốc", "Nhật Bản", "Việt Nam"], "correct": 2}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000073',
  '20000000-0000-0000-0000-000000000015',
  'Luyện phát âm tiếng Nhật',
  'speaking',
  '{"phrases": [{"text": "こんにちは！", "translation": "Xin chào!"}, {"text": "はじめまして。", "translation": "Lần đầu gặp gỡ."}, {"text": "よろしくお願いします。", "translation": "Xin hãy giúp đỡ. (Rất vui được biết)"}, {"text": "ありがとうございます。", "translation": "Xin cảm ơn rất nhiều."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000074',
  '20000000-0000-0000-0000-000000000015',
  'Bảng chữ Hiragana cơ bản',
  'grammar',
  '{"explanation": "Hiragana là 1 trong 3 bảng chữ cái tiếng Nhật.\\n\\n5 nguyên âm cơ bản:\\nあ(a) い(i) う(u) え(e) お(o)\\n\\nHàng K:\\nか(ka) き(ki) く(ku) け(ke) こ(ko)\\n\\nHàng S:\\nさ(sa) し(shi) す(su) せ(se) そ(so)\\n\\nHàng T:\\nた(ta) ち(chi) つ(tsu) て(te) と(to)\\n\\nHàng N:\\nな(na) に(ni) ぬ(nu) ね(ne) の(no)", "examples": ["あいうえお = a i u e o", "かきくけこ = ka ki ku ke ko", "さくら = sa ku ra = hoa anh đào"], "exercises": [{"question": "あ đọc là:", "options": ["a", "i", "u", "e"], "correct": 0}, {"question": "か đọc là:", "options": ["sa", "ta", "ka", "na"], "correct": 2}, {"question": "し đọc là:", "options": ["si", "shi", "chi", "ki"], "correct": 1}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000075',
  '20000000-0000-0000-0000-000000000015',
  'Kiểm tra - Hiragana & Chào hỏi',
  'quiz',
  '{"questions": [{"question": "\"こんにちは\" nghĩa là:", "options": ["Tạm biệt", "Xin chào", "Cảm ơn", "Xin lỗi"], "correct": 1}, {"question": "\"ありがとう\" dùng khi:", "options": ["Chào hỏi", "Xin lỗi", "Cảm ơn", "Từ chối"], "correct": 2}, {"question": "あ đọc là:", "options": ["ka", "sa", "a", "ta"], "correct": 2}, {"question": "Hiragana có bao nhiêu nguyên âm?", "options": ["3", "4", "5", "6"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 16: Giới thiệu & Gia đình (5 lessons)
(
  '30000000-0000-0000-0000-000000000076',
  '20000000-0000-0000-0000-000000000016',
  '自己紹介 - Tự giới thiệu',
  'vocabulary',
  '{"words": [{"word": "私 (watashi)", "translation": "Tôi", "phonetic": "wa-ta-shi", "example": "私は学生です。"}, {"word": "名前 (namae)", "translation": "Tên", "phonetic": "na-ma-e", "example": "名前は何ですか？"}, {"word": "学生 (gakusei)", "translation": "Học sinh", "phonetic": "ga-ku-sei", "example": "私は学生です。"}, {"word": "先生 (sensei)", "translation": "Giáo viên", "phonetic": "sen-sei", "example": "田中先生は優しいです。"}, {"word": "家族 (kazoku)", "translation": "Gia đình", "phonetic": "ka-zo-ku", "example": "私の家族は5人です。"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000077',
  '20000000-0000-0000-0000-000000000016',
  'Nghe giới thiệu bản thân',
  'listening',
  '{"audio_text": "はじめまして。私はグエンです。ベトナム人です。二十三歳です。大学生です。日本語を勉強しています。どうぞよろしくお願いします。", "questions": [{"question": "Người nói bao nhiêu tuổi?", "options": ["21", "22", "23", "24"], "correct": 2}, {"question": "Người nói đang làm gì?", "options": ["Đi làm", "Học tiếng Nhật", "Du lịch", "Dạy học"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000078',
  '20000000-0000-0000-0000-000000000016',
  'Nói về bản thân bằng tiếng Nhật',
  'speaking',
  '{"phrases": [{"text": "私は...です。", "translation": "Tôi là..."}, {"text": "ベトナム人です。", "translation": "Tôi là người Việt Nam."}, {"text": "名前は何ですか？", "translation": "Tên bạn là gì?"}, {"text": "どうぞよろしく。", "translation": "Mong được giúp đỡ."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000079',
  '20000000-0000-0000-0000-000000000016',
  'Cấu trúc ～です / ～ではありません',
  'grammar',
  '{"explanation": "Cấu trúc cơ bản tiếng Nhật:\\n\\nKhẳng định: N + です (desu)\\n- 私は学生です。(Tôi là học sinh)\\n\\nPhủ định: N + ではありません (dewa arimasen)\\n- 私は先生ではありません。(Tôi không phải GV)\\n\\nCâu hỏi: ... ですか？(desu ka?)\\n- あなたは学生ですか？(Bạn là HS không?)\\n\\nLưu ý: Tiếng Nhật đặt động từ ở cuối câu!", "examples": ["私は学生です。- Tôi là học sinh.", "田中さんは先生です。- Anh Tanaka là GV.", "私は医者ではありません。- Tôi không phải BS."], "exercises": [{"question": "私は学生___。(khẳng định)", "options": ["です", "ではありません", "ですか", "でした"], "correct": 0}, {"question": "先生___ありません。(phủ định)", "options": ["で", "では", "は", "が"], "correct": 1}, {"question": "学生です___？(hỏi)", "options": ["よ", "ね", "か", "な"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000080',
  '20000000-0000-0000-0000-000000000016',
  'Kiểm tra - Giới thiệu & Gia đình',
  'quiz',
  '{"questions": [{"question": "\"私\" đọc là:", "options": ["anata", "watashi", "kare", "kanojo"], "correct": 1}, {"question": "\"学生\" nghĩa là:", "options": ["Giáo viên", "Bác sĩ", "Học sinh", "Nhân viên"], "correct": 2}, {"question": "Phủ định của です:", "options": ["ではありません", "でした", "ですか", "ですよ"], "correct": 0}, {"question": "\"家族\" nghĩa là:", "options": ["Bạn bè", "Gia đình", "Đồng nghiệp", "Hàng xóm"], "correct": 1}]}',
  5, 20, 5
),

-- Unit 17: Nhà hàng & Đồ ăn (5 lessons)
(
  '30000000-0000-0000-0000-000000000081',
  '20000000-0000-0000-0000-000000000017',
  '食べ物 - Đồ ăn Nhật',
  'vocabulary',
  '{"words": [{"word": "ラーメン (raamen)", "translation": "Mì ramen", "phonetic": "raa-men", "example": "ラーメンが好きです。"}, {"word": "すし (sushi)", "translation": "Sushi", "phonetic": "su-shi", "example": "すしを食べます。"}, {"word": "お茶 (ocha)", "translation": "Trà", "phonetic": "o-cha", "example": "お茶をどうぞ。"}, {"word": "水 (mizu)", "translation": "Nước", "phonetic": "mi-zu", "example": "水をください。"}, {"word": "おいしい (oishii)", "translation": "Ngon", "phonetic": "o-i-shii", "example": "このラーメンはおいしいです。"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000082',
  '20000000-0000-0000-0000-000000000017',
  'Nghe gọi món tại nhà hàng',
  'listening',
  '{"audio_text": "いらっしゃいませ！何名様ですか？二人です。こちらへどうぞ。ご注文は？ラーメンを二つと、お茶を二つください。かしこまりました。", "questions": [{"question": "Có mấy người?", "options": ["1", "2", "3", "4"], "correct": 1}, {"question": "Họ gọi món gì?", "options": ["Sushi và trà", "Ramen và trà", "Ramen và nước", "Sushi và nước"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000083',
  '20000000-0000-0000-0000-000000000017',
  'Gọi món bằng tiếng Nhật',
  'speaking',
  '{"phrases": [{"text": "すみません。", "translation": "Xin lỗi (gọi nhân viên)."}, {"text": "メニューをください。", "translation": "Cho tôi xem menu."}, {"text": "これをください。", "translation": "Cho tôi cái này."}, {"text": "お会計お願いします。", "translation": "Tính tiền giùm."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000084',
  '20000000-0000-0000-0000-000000000017',
  'Trợ từ を (wo) と (to) が (ga)',
  'grammar',
  '{"explanation": "Trợ từ quan trọng:\\n\\nを (wo): đánh dấu tân ngữ (direct object)\\n- ラーメンを食べます。(Ăn ramen)\\n\\nが (ga): đánh dấu chủ ngữ / sở thích\\n- すしが好きです。(Thích sushi)\\n\\nと (to): và (nối danh từ)\\n- ラーメンとすし (Ramen và sushi)\\n\\nも (mo): cũng\\n- お茶も好きです。(Cũng thích trà)", "examples": ["水を飲みます。- Uống nước.", "日本語が好きです。- Thích tiếng Nhật.", "コーヒーとお茶 - Cà phê và trà"], "exercises": [{"question": "ラーメン___食べます。(ăn ramen)", "options": ["を", "が", "と", "も"], "correct": 0}, {"question": "すし___好きです。(thích sushi)", "options": ["を", "が", "と", "も"], "correct": 1}, {"question": "ラーメン___すし (ramen và sushi)", "options": ["を", "が", "と", "も"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000085',
  '20000000-0000-0000-0000-000000000017',
  'Kiểm tra - Nhà hàng & Đồ ăn',
  'quiz',
  '{"questions": [{"question": "\"おいしい\" nghĩa là:", "options": ["Đắt", "Rẻ", "Ngon", "Xấu"], "correct": 2}, {"question": "\"水\" đọc là:", "options": ["cha", "mizu", "ocha", "sake"], "correct": 1}, {"question": "\"ください\" dùng khi:", "options": ["Xin lỗi", "Cảm ơn", "Yêu cầu lịch sự", "Từ chối"], "correct": 2}, {"question": "すし___好きです (thích sushi)", "options": ["を", "が", "と", "は"], "correct": 1}]}',
  5, 20, 5
);
