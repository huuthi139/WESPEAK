-- Chinese A1 Lessons (15 lessons across 3 units)

-- Unit 9: Pinyin & Chào hỏi (5 lessons)
INSERT INTO lessons (id, unit_id, title, type, content, duration_minutes, xp_reward, order_index) VALUES
(
  '30000000-0000-0000-0000-000000000041',
  '20000000-0000-0000-0000-000000000009',
  '你好 Nǐ hǎo - Xin chào',
  'vocabulary',
  '{"words": [{"word": "你好 (nǐ hǎo)", "translation": "Xin chào", "phonetic": "nǐ hǎo", "example": "你好！你好吗？"}, {"word": "谢谢 (xiè xie)", "translation": "Cảm ơn", "phonetic": "xiè xie", "example": "谢谢你！"}, {"word": "再见 (zài jiàn)", "translation": "Tạm biệt", "phonetic": "zài jiàn", "example": "再见，明天见！"}, {"word": "对不起 (duì bu qǐ)", "translation": "Xin lỗi", "phonetic": "duì bu qǐ", "example": "对不起，我迟到了。"}, {"word": "没关系 (méi guān xi)", "translation": "Không sao", "phonetic": "méi guān xi", "example": "没关系！"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000042',
  '20000000-0000-0000-0000-000000000009',
  'Nghe chào hỏi tiếng Trung',
  'listening',
  '{"audio_text": "你好！我叫小明。你好吗？我很好，谢谢！你呢？我也很好。再见！", "questions": [{"question": "Người nói tên gì?", "options": ["小华", "小明", "小红", "小李"], "correct": 1}, {"question": "Người nói cảm thấy thế nào?", "options": ["Mệt", "Buồn", "Rất khỏe", "Đói"], "correct": 2}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000043',
  '20000000-0000-0000-0000-000000000009',
  'Luyện phát âm Pinyin',
  'speaking',
  '{"phrases": [{"text": "你好！", "translation": "Xin chào!"}, {"text": "你好吗？", "translation": "Bạn khỏe không?"}, {"text": "我很好，谢谢。", "translation": "Tôi rất khỏe, cảm ơn."}, {"text": "再见！明天见！", "translation": "Tạm biệt! Mai gặp lại!"}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000044',
  '20000000-0000-0000-0000-000000000009',
  'Thanh điệu tiếng Trung',
  'grammar',
  '{"explanation": "Tiếng Trung có 4 thanh điệu + thanh nhẹ:\\n- Thanh 1 (ˉ): cao, bằng → mā (mẹ)\\n- Thanh 2 (ˊ): đi lên → má (gai)\\n- Thanh 3 (ˇ): xuống rồi lên → mǎ (ngựa)\\n- Thanh 4 (ˋ): đi xuống → mà (mắng)\\n- Thanh nhẹ: nhẹ, ngắn → ma (hỏi)", "examples": ["māmā - mẹ (thanh 1+1)", "nǐ hǎo - xin chào (thanh 3+3)", "xiè xie - cảm ơn (thanh 4+nhẹ)"], "exercises": [{"question": "\"nǐ hǎo\" có thanh điệu gì?", "options": ["Thanh 1+1", "Thanh 2+2", "Thanh 3+3", "Thanh 4+4"], "correct": 2}, {"question": "Thanh 4 đọc như thế nào?", "options": ["Bằng phẳng", "Đi lên", "Xuống rồi lên", "Đi xuống"], "correct": 3}, {"question": "\"xiè xie\" (cảm ơn) có thanh gì?", "options": ["Thanh 1+nhẹ", "Thanh 2+nhẹ", "Thanh 3+nhẹ", "Thanh 4+nhẹ"], "correct": 3}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000045',
  '20000000-0000-0000-0000-000000000009',
  'Kiểm tra - Chào hỏi tiếng Trung',
  'quiz',
  '{"questions": [{"question": "\"你好\" nghĩa là gì?", "options": ["Tạm biệt", "Xin chào", "Cảm ơn", "Xin lỗi"], "correct": 1}, {"question": "\"谢谢\" phiên âm là:", "options": ["nǐ hǎo", "zài jiàn", "xiè xie", "duì bu qǐ"], "correct": 2}, {"question": "\"再见\" nghĩa là:", "options": ["Xin chào", "Cảm ơn", "Xin lỗi", "Tạm biệt"], "correct": 3}, {"question": "Tiếng Trung có bao nhiêu thanh điệu chính?", "options": ["2", "3", "4", "5"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 10: Giới thiệu bản thân (5 lessons)
(
  '30000000-0000-0000-0000-000000000046',
  '20000000-0000-0000-0000-000000000010',
  '自我介绍 - Tự giới thiệu',
  'vocabulary',
  '{"words": [{"word": "我 (wǒ)", "translation": "Tôi", "phonetic": "wǒ", "example": "我是越南人。"}, {"word": "叫 (jiào)", "translation": "Tên là", "phonetic": "jiào", "example": "我叫明。"}, {"word": "是 (shì)", "translation": "Là", "phonetic": "shì", "example": "我是学生。"}, {"word": "学生 (xué shēng)", "translation": "Học sinh", "phonetic": "xué shēng", "example": "他是学生。"}, {"word": "老师 (lǎo shī)", "translation": "Giáo viên", "phonetic": "lǎo shī", "example": "她是老师。"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000047',
  '20000000-0000-0000-0000-000000000010',
  'Nghe giới thiệu bản thân',
  'listening',
  '{"audio_text": "大家好！我叫王小明。我是中国人。我今年二十岁。我是大学生。我学习英语。", "questions": [{"question": "Người nói bao nhiêu tuổi?", "options": ["18", "19", "20", "21"], "correct": 2}, {"question": "Người nói học gì?", "options": ["Tiếng Việt", "Tiếng Anh", "Tiếng Nhật", "Tiếng Hàn"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000048',
  '20000000-0000-0000-0000-000000000010',
  'Nói về bản thân bằng tiếng Trung',
  'speaking',
  '{"phrases": [{"text": "我叫...。", "translation": "Tôi tên là..."}, {"text": "我是越南人。", "translation": "Tôi là người Việt Nam."}, {"text": "我今年...岁。", "translation": "Năm nay tôi...tuổi."}, {"text": "很高兴认识你。", "translation": "Rất vui được biết bạn."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000049',
  '20000000-0000-0000-0000-000000000010',
  'Cấu trúc 是 (shì) - Là',
  'grammar',
  '{"explanation": "Cấu trúc câu với 是 (shì):\\n- Khẳng định: 我是学生。(Tôi là học sinh)\\n- Phủ định: 我不是老师。(Tôi không phải giáo viên) → thêm 不 (bù) trước 是\\n- Câu hỏi: 你是学生吗？(Bạn là học sinh không?) → thêm 吗 (ma) cuối câu", "examples": ["我是越南人。 - Tôi là người Việt Nam.", "他不是医生。 - Anh ấy không phải bác sĩ.", "你是老师吗？ - Bạn là giáo viên không?"], "exercises": [{"question": "我___学生。(Tôi là học sinh)", "options": ["是", "不是", "有", "在"], "correct": 0}, {"question": "他___老师。(Anh ấy không phải GV)", "options": ["是", "不是", "很", "也"], "correct": 1}, {"question": "你是中国人___？(Bạn là người TQ không?)", "options": ["吗", "呢", "了", "的"], "correct": 0}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000050',
  '20000000-0000-0000-0000-000000000010',
  'Kiểm tra - Giới thiệu bản thân',
  'quiz',
  '{"questions": [{"question": "\"我\" có nghĩa là:", "options": ["Bạn", "Tôi", "Anh ấy", "Cô ấy"], "correct": 1}, {"question": "\"我叫...\" dùng để:", "options": ["Hỏi tuổi", "Nói tên", "Hỏi nghề", "Chào hỏi"], "correct": 1}, {"question": "Phủ định của 是 là:", "options": ["没是", "无是", "不是", "非是"], "correct": 2}, {"question": "\"学生\" nghĩa là:", "options": ["Giáo viên", "Bác sĩ", "Học sinh", "Kỹ sư"], "correct": 2}]}',
  5, 20, 5
),

-- Unit 11: Số đếm & Mua sắm (5 lessons)
(
  '30000000-0000-0000-0000-000000000051',
  '20000000-0000-0000-0000-000000000011',
  '数字 Shùzì - Số đếm',
  'vocabulary',
  '{"words": [{"word": "一 (yī)", "translation": "Một", "phonetic": "yī", "example": "一个苹果。"}, {"word": "二 (èr)", "translation": "Hai", "phonetic": "èr", "example": "两个人。"}, {"word": "五 (wǔ)", "translation": "Năm", "phonetic": "wǔ", "example": "五块钱。"}, {"word": "十 (shí)", "translation": "Mười", "phonetic": "shí", "example": "十个学生。"}, {"word": "钱 (qián)", "translation": "Tiền", "phonetic": "qián", "example": "多少钱？"}]}',
  5, 10, 1
),
(
  '30000000-0000-0000-0000-000000000052',
  '20000000-0000-0000-0000-000000000011',
  'Nghe mua sắm tiếng Trung',
  'listening',
  '{"audio_text": "你好！这个多少钱？这个二十块。太贵了！便宜一点吧。好吧，十五块。好的，我要这个。", "questions": [{"question": "Giá ban đầu là bao nhiêu?", "options": ["10 tệ", "15 tệ", "20 tệ", "25 tệ"], "correct": 2}, {"question": "Giá sau khi trả là:", "options": ["10 tệ", "15 tệ", "18 tệ", "20 tệ"], "correct": 1}]}',
  5, 10, 2
),
(
  '30000000-0000-0000-0000-000000000053',
  '20000000-0000-0000-0000-000000000011',
  'Mua sắm bằng tiếng Trung',
  'speaking',
  '{"phrases": [{"text": "这个多少钱？", "translation": "Cái này bao nhiêu tiền?"}, {"text": "太贵了！", "translation": "Đắt quá!"}, {"text": "便宜一点。", "translation": "Rẻ hơn đi."}, {"text": "我要这个。", "translation": "Tôi lấy cái này."}]}',
  5, 15, 3
),
(
  '30000000-0000-0000-0000-000000000054',
  '20000000-0000-0000-0000-000000000011',
  'Lượng từ trong tiếng Trung',
  'grammar',
  '{"explanation": "Tiếng Trung dùng lượng từ (measure words) giữa số và danh từ:\\n- 个 (gè): chung, phổ biến nhất → 一个人 (1 người)\\n- 本 (běn): sách → 两本书 (2 cuốn sách)\\n- 块 (kuài): tiền → 五块钱 (5 tệ)\\n- 杯 (bēi): cốc/ly → 一杯水 (1 ly nước)", "examples": ["三个苹果 - 3 quả táo", "一本书 - 1 cuốn sách", "两杯咖啡 - 2 ly cà phê"], "exercises": [{"question": "一___人 (1 người)", "options": ["个", "本", "块", "杯"], "correct": 0}, {"question": "两___书 (2 cuốn sách)", "options": ["个", "本", "块", "杯"], "correct": 1}, {"question": "五___钱 (5 tệ)", "options": ["个", "本", "块", "杯"], "correct": 2}]}',
  8, 15, 4
),
(
  '30000000-0000-0000-0000-000000000055',
  '20000000-0000-0000-0000-000000000011',
  'Kiểm tra - Số đếm & Mua sắm',
  'quiz',
  '{"questions": [{"question": "\"五\" là số mấy?", "options": ["3", "4", "5", "6"], "correct": 2}, {"question": "\"多少钱\" hỏi về:", "options": ["Tên", "Tuổi", "Giá tiền", "Địa chỉ"], "correct": 2}, {"question": "\"太贵了\" nghĩa là:", "options": ["Rất rẻ", "Đắt quá", "Vừa giá", "Miễn phí"], "correct": 1}, {"question": "Lượng từ cho sách là:", "options": ["个", "本", "块", "杯"], "correct": 1}]}',
  5, 20, 5
);
