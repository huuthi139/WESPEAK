-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  native_language TEXT DEFAULT 'vietnamese',
  daily_goal_minutes INT DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Stats
CREATE TABLE user_stats (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  total_xp INT DEFAULT 0,
  current_streak INT DEFAULT 0,
  longest_streak INT DEFAULT 0,
  gems INT DEFAULT 0,
  level INT DEFAULT 1,
  lessons_completed INT DEFAULT 0,
  total_minutes INT DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Languages
CREATE TABLE user_languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  current_level TEXT DEFAULT 'A1',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  language TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  level TEXT NOT NULL,
  total_lessons INT NOT NULL,
  duration_hours INT NOT NULL,
  thumbnail_url TEXT,
  is_premium BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0
);

-- Units
CREATE TABLE units (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INT NOT NULL
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  duration_minutes INT DEFAULT 5,
  xp_reward INT DEFAULT 10,
  order_index INT NOT NULL
);

-- User Progress
CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  completed BOOLEAN DEFAULT FALSE,
  score INT,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, lesson_id)
);

-- Daily Activity
CREATE TABLE daily_activity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  minutes_learned INT DEFAULT 0,
  xp_earned INT DEFAULT 0,
  lessons_completed INT DEFAULT 0,
  goal_reached BOOLEAN DEFAULT FALSE,
  UNIQUE(user_id, date)
);

-- Achievements
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  category TEXT,
  requirement INT NOT NULL,
  xp_reward INT DEFAULT 0
);

-- User Achievements
CREATE TABLE user_achievements (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- Chat History
CREATE TABLE chat_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scenario TEXT NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_progress_user ON user_progress(user_id);
CREATE INDEX idx_daily_activity_user_date ON daily_activity(user_id, date);
CREATE INDEX idx_lessons_unit ON lessons(unit_id);
CREATE INDEX idx_user_languages_user ON user_languages(user_id);
CREATE INDEX idx_chat_history_user ON chat_history(user_id);
CREATE INDEX idx_units_course ON units(course_id);

-- Seed Achievements
INSERT INTO achievements (name, description, icon, category, requirement, xp_reward) VALUES
  ('Khởi đầu', 'Hoàn thành bài học đầu tiên', '🌟', 'learning', 1, 10),
  ('7 Ngày', 'Streak 7 ngày liên tục', '🔥', 'streak', 7, 50),
  ('30 Ngày', 'Streak 30 ngày liên tục', '🏆', 'streak', 30, 200),
  ('100 Ngày', 'Streak 100 ngày liên tục', '💎', 'streak', 100, 500),
  ('10 Bài', 'Hoàn thành 10 bài học', '📚', 'learning', 10, 30),
  ('50 Bài', 'Hoàn thành 50 bài học', '📖', 'learning', 50, 100),
  ('100 Bài', 'Hoàn thành 100 bài học', '🎓', 'learning', 100, 300),
  ('Chat Master', 'Chat 10 lần với AI', '💬', 'speaking', 10, 50),
  ('100 XP', 'Đạt 100 XP', '⭐', 'learning', 100, 0),
  ('Ghi âm đầu tiên', 'Ghi âm lần đầu tiên', '🎤', 'speaking', 1, 10),
  ('100 Ghi âm', 'Ghi âm 100 lần', '🎙️', 'speaking', 100, 100),
  ('Thêm bạn', 'Thêm bạn bè đầu tiên', '👥', 'social', 1, 10),
  ('Top 10', 'Lọt Top 10 tuần', '🥇', 'social', 1, 50),
  ('Night Owl', 'Học sau 23:00', '🦉', 'special', 1, 20),
  ('Early Bird', 'Học trước 6:00', '🌅', 'special', 1, 20),
  ('Perfectionist', 'Đạt 100% điểm', '💯', 'special', 1, 30),
  ('Chăm chỉ', 'Học 60 phút một ngày', '⏰', 'special', 60, 40),
  ('Từ vựng Pro', 'Học 200 từ vựng', '📝', 'learning', 200, 100),
  ('Nói chuyện Pro', 'Chat 50 lần với AI', '🗣️', 'speaking', 50, 150),
  ('1000 XP', 'Đạt 1000 XP', '🌟', 'learning', 1000, 0);
