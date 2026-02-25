-- Seed Data: 5 Courses
INSERT INTO courses (id, language, title, description, level, total_lessons, duration_hours, thumbnail_url, is_premium, order_index) VALUES
  ('10000000-0000-0000-0000-000000000001', 'english', 'Tiếng Anh A1 - Khởi đầu', 'Khóa học tiếng Anh cơ bản dành cho người mới bắt đầu. Học chào hỏi, giới thiệu bản thân và giao tiếp đơn giản.', 'A1', 20, 10, NULL, FALSE, 1),
  ('10000000-0000-0000-0000-000000000002', 'english', 'Tiếng Anh A2 - Giao tiếp', 'Nâng cao kỹ năng giao tiếp tiếng Anh. Học cách mua sắm, đi du lịch và nói chuyện hàng ngày.', 'A2', 20, 12, NULL, FALSE, 2),
  ('10000000-0000-0000-0000-000000000003', 'chinese', 'Tiếng Trung A1 - Nhập môn', 'Khóa học tiếng Trung cơ bản. Học pinyin, chào hỏi và các câu giao tiếp đơn giản.', 'A1', 15, 8, NULL, FALSE, 3),
  ('10000000-0000-0000-0000-000000000004', 'korean', 'Tiếng Hàn A1 - Bắt đầu', 'Khóa học tiếng Hàn cho người mới. Học bảng chữ cái Hangul và giao tiếp cơ bản.', 'A1', 15, 8, NULL, FALSE, 4),
  ('10000000-0000-0000-0000-000000000005', 'japanese', 'Tiếng Nhật A1 - Cơ bản', 'Khóa học tiếng Nhật nhập môn. Học Hiragana, chào hỏi và văn hóa Nhật Bản.', 'A1', 15, 8, NULL, FALSE, 5);

-- Seed Data: 17 Units
-- English A1: 4 units
INSERT INTO units (id, course_id, title, description, order_index) VALUES
  ('20000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Chào hỏi & Giới thiệu', 'Học cách chào hỏi và giới thiệu bản thân bằng tiếng Anh', 1),
  ('20000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Gia đình & Bạn bè', 'Nói về gia đình và bạn bè', 2),
  ('20000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'Số đếm & Thời gian', 'Học số đếm, ngày tháng và giờ giấc', 3),
  ('20000000-0000-0000-0000-000000000004', '10000000-0000-0000-0000-000000000001', 'Thức ăn & Đồ uống', 'Từ vựng về thức ăn và cách gọi món', 4);

-- English A2: 4 units
INSERT INTO units (id, course_id, title, description, order_index) VALUES
  ('20000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'Du lịch & Phương hướng', 'Hỏi đường và nói về du lịch', 1),
  ('20000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'Mua sắm', 'Mua sắm và trả giá bằng tiếng Anh', 2),
  ('20000000-0000-0000-0000-000000000007', '10000000-0000-0000-0000-000000000002', 'Công việc & Nghề nghiệp', 'Nói về công việc và phỏng vấn', 3),
  ('20000000-0000-0000-0000-000000000008', '10000000-0000-0000-0000-000000000002', 'Sức khỏe & Bệnh viện', 'Mô tả triệu chứng và đi khám bệnh', 4);

-- Chinese A1: 3 units
INSERT INTO units (id, course_id, title, description, order_index) VALUES
  ('20000000-0000-0000-0000-000000000009', '10000000-0000-0000-0000-000000000003', 'Pinyin & Chào hỏi', 'Học phiên âm pinyin và chào hỏi cơ bản', 1),
  ('20000000-0000-0000-0000-000000000010', '10000000-0000-0000-0000-000000000003', 'Giới thiệu bản thân', 'Nói về bản thân bằng tiếng Trung', 2),
  ('20000000-0000-0000-0000-000000000011', '10000000-0000-0000-0000-000000000003', 'Số đếm & Mua sắm', 'Học số đếm và mua sắm đơn giản', 3);

-- Korean A1: 3 units
INSERT INTO units (id, course_id, title, description, order_index) VALUES
  ('20000000-0000-0000-0000-000000000012', '10000000-0000-0000-0000-000000000004', 'Hangul & Chào hỏi', 'Học bảng chữ cái Hangul và chào hỏi', 1),
  ('20000000-0000-0000-0000-000000000013', '10000000-0000-0000-0000-000000000004', 'Tự giới thiệu', 'Giới thiệu bản thân bằng tiếng Hàn', 2),
  ('20000000-0000-0000-0000-000000000014', '10000000-0000-0000-0000-000000000004', 'Cuộc sống hàng ngày', 'Nói về hoạt động hàng ngày', 3);

-- Japanese A1: 3 units
INSERT INTO units (id, course_id, title, description, order_index) VALUES
  ('20000000-0000-0000-0000-000000000015', '10000000-0000-0000-0000-000000000005', 'Hiragana & Chào hỏi', 'Học bảng chữ Hiragana và chào hỏi', 1),
  ('20000000-0000-0000-0000-000000000016', '10000000-0000-0000-0000-000000000005', 'Giới thiệu & Gia đình', 'Giới thiệu bản thân và nói về gia đình', 2),
  ('20000000-0000-0000-0000-000000000017', '10000000-0000-0000-0000-000000000005', 'Nhà hàng & Đồ ăn', 'Gọi món và nói về đồ ăn Nhật', 3);
