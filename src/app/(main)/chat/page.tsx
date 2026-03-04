"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  X,
  ChevronDown,
  Send,
  Mic,
  Volume2,
  Clock,
  Gauge,
} from "lucide-react";
import { useRouter } from "next/navigation";

import Button from "@/components/ui/Button";
import MascotAvatar from "@/components/shared/MascotAvatar";
import { useChatStore } from "@/stores/chatStore";
import { useSettingsStore, SPEED_OPTIONS } from "@/stores/settingsStore";
import { useSpeech } from "@/hooks/useSpeech";
import { FREE_MODELS } from "@/lib/ai-models";
import { cn } from "@/lib/utils";
import type { ChatScenario, ScenarioInfo } from "@/types";

// ==================== Constants ====================

const SCENARIOS: ScenarioInfo[] = [
  {
    key: "free_chat",
    label: "Trò chuyện tự do",
    description: "Trò chuyện tự do với AI",
    icon: "\u{1F4AC}",
  },
  {
    key: "job_interview",
    label: "Phỏng vấn xin việc",
    description: "Luyện tập phỏng vấn",
    icon: "\u{1F4BC}",
  },
  {
    key: "restaurant",
    label: "Nhà hàng",
    description: "Gọi món tại nhà hàng",
    icon: "\u{1F37D}\u{FE0F}",
  },
  {
    key: "shopping",
    label: "Mua sắm",
    description: "Mua sắm tại cửa hàng",
    icon: "\u{1F6CD}\u{FE0F}",
  },
  {
    key: "travel",
    label: "Du lịch",
    description: "Hỏi đường và du lịch",
    icon: "\u2708\u{FE0F}",
  },
  {
    key: "hotel",
    label: "Khách sạn",
    description: "Nhận phòng khách sạn",
    icon: "\u{1F3E8}",
  },
];

const SCENARIO_GREETINGS: Record<ChatScenario, { content: string; translation: string }> = {
  free_chat: {
    content: "Hi there! I'm your AI tutor. What would you like to talk about today? Feel free to speak about anything!",
    translation: "Xin chào! Tôi là gia sư AI của bạn. Hôm nay bạn muốn nói về điều gì? Hãy thoải mái nói về bất cứ điều gì!",
  },
  job_interview: {
    content: "Welcome! I'm the HR manager. Please have a seat. Let's start with a simple question: Can you tell me a little about yourself?",
    translation: "Chào mừng! Tôi là quản lý nhân sự. Mời bạn ngồi. Hãy bắt đầu với một câu hỏi đơn giản: Bạn có thể giới thiệu đôi chút về bản thân không?",
  },
  restaurant: {
    content: "Good evening! Welcome to our restaurant. Here is the menu. Are you ready to order, or would you like a few more minutes?",
    translation: "Chào buổi tối! Chào mừng đến nhà hàng của chúng tôi. Đây là thực đơn. Bạn đã sẵn sàng gọi món chưa, hay cần thêm vài phút?",
  },
  shopping: {
    content: "Hello! Welcome to our store. Is there anything specific you're looking for today? I'd be happy to help!",
    translation: "Xin chào! Chào mừng đến cửa hàng của chúng tôi. Hôm nay bạn đang tìm gì cụ thể không? Tôi rất vui được giúp!",
  },
  travel: {
    content: "Hey! Welcome to the city! I'm your local guide. Where would you like to go? I can help you with directions and recommendations.",
    translation: "Xin chào! Chào mừng đến thành phố! Tôi là hướng dẫn viên địa phương. Bạn muốn đi đâu? Tôi có thể giúp bạn chỉ đường và gợi ý.",
  },
  hotel: {
    content: "Good afternoon! Welcome to Grand Hotel. Do you have a reservation? I'd be happy to help you check in.",
    translation: "Chào buổi chiều! Chào mừng đến Grand Hotel. Bạn đã đặt phòng chưa? Tôi rất vui được giúp bạn nhận phòng.",
  },
};

// ==================== Demo Conversation Flows ====================
// Used as fallback when AI API is unavailable

type DemoMessage = { content: string; translation: string; feedback?: { hasCorrection: boolean; corrections: string[] } };

const DEMO_FLOWS: Record<ChatScenario, DemoMessage[]> = {
  free_chat: [
    { content: "That's interesting! Could you tell me more about that? I'd love to hear your thoughts.", translation: "Thú vị quá! Bạn có thể kể thêm về điều đó không? Tôi muốn nghe suy nghĩ của bạn." },
    { content: "Great point! By the way, what do you enjoy doing in your free time? Do you have any hobbies?", translation: "Ý hay đó! Nhân tiện, bạn thích làm gì vào thời gian rảnh? Bạn có sở thích gì không?", feedback: { hasCorrection: true, corrections: ["Tip: Use 'I enjoy + V-ing' to talk about hobbies. Example: 'I enjoy reading books.'"] } },
    { content: "That sounds fun! Have you been doing that for a long time? How did you get started?", translation: "Nghe vui quá! Bạn đã làm điều đó lâu chưa? Bạn bắt đầu như thế nào?" },
    { content: "I see! Let's talk about something else. What kind of music do you like? Do you have a favorite singer?", translation: "Ra vậy! Hãy nói về chủ đề khác. Bạn thích loại nhạc nào? Bạn có ca sĩ yêu thích không?" },
    { content: "Nice taste! Do you prefer listening to music at home or going to live concerts?", translation: "Gu tốt đấy! Bạn thích nghe nhạc ở nhà hay đi xem concert trực tiếp?", feedback: { hasCorrection: true, corrections: ["Tip: 'Prefer + V-ing' or 'Prefer to + V'. Example: 'I prefer listening to music at home.'"] } },
    { content: "What about movies? Have you watched anything good recently?", translation: "Còn phim ảnh thì sao? Gần đây bạn có xem phim nào hay không?" },
    { content: "That's a great choice! Do you usually watch movies alone or with friends?", translation: "Lựa chọn hay đó! Bạn thường xem phim một mình hay với bạn bè?" },
    { content: "Let me ask you something different — if you could travel anywhere in the world, where would you go and why?", translation: "Để tôi hỏi bạn điều khác — nếu được đi bất cứ đâu trên thế giới, bạn sẽ đi đâu và tại sao?", feedback: { hasCorrection: true, corrections: ["Tip: Use 'If I could... I would...' for imaginary situations. Example: 'If I could travel anywhere, I would go to Japan.'"] } },
    { content: "That would be an amazing trip! What would be the first thing you'd do when you get there?", translation: "Đó sẽ là chuyến đi tuyệt vời! Điều đầu tiên bạn sẽ làm khi đến đó là gì?" },
    { content: "You're doing really well with your English! Your sentences are getting more natural. Keep up the great work! Let's continue — what's your favorite food?", translation: "Tiếng Anh của bạn tiến bộ lắm! Câu văn nghe ngày càng tự nhiên hơn. Hãy tiếp tục phát huy nhé! Tiếp nào — món ăn yêu thích của bạn là gì?" },
  ],
  job_interview: [
    { content: "Thank you for that introduction! Now, can you tell me about your previous work experience? What was your last role?", translation: "Cảm ơn phần giới thiệu! Bây giờ, bạn có thể kể về kinh nghiệm làm việc trước đây không? Vị trí gần nhất của bạn là gì?" },
    { content: "Interesting! What are your greatest strengths that you would bring to this position?", translation: "Thú vị! Điểm mạnh lớn nhất bạn mang đến cho vị trí này là gì?", feedback: { hasCorrection: true, corrections: ["Tip: Use 'My greatest strength is...' or 'I'm particularly good at...' to answer strengths questions."] } },
    { content: "Good. And what about your weaknesses? Everyone has areas they can improve.", translation: "Tốt lắm. Còn điểm yếu thì sao? Ai cũng có những mặt cần cải thiện." },
    { content: "I appreciate your honesty. Why are you interested in this position? What attracted you to our company?", translation: "Tôi đánh giá cao sự thành thật của bạn. Tại sao bạn quan tâm đến vị trí này? Điều gì thu hút bạn đến công ty chúng tôi?" },
    { content: "That's great to hear! Where do you see yourself in five years? What are your career goals?", translation: "Rất vui khi nghe điều đó! Bạn thấy mình ở đâu trong 5 năm nữa? Mục tiêu nghề nghiệp của bạn là gì?" },
    { content: "Excellent vision! Can you tell me about a time when you worked in a team? How did you contribute?", translation: "Tầm nhìn tuyệt vời! Bạn có thể kể về lần bạn làm việc nhóm không? Bạn đã đóng góp như thế nào?", feedback: { hasCorrection: true, corrections: ["Tip: Use STAR method — Situation, Task, Action, Result — to structure your answer."] } },
    { content: "Very impressive! How do you handle pressure and tight deadlines?", translation: "Rất ấn tượng! Bạn xử lý áp lực và deadline gấp như thế nào?" },
    { content: "Good approach! What salary range are you expecting for this position?", translation: "Cách tiếp cận tốt! Bạn mong muốn mức lương bao nhiêu cho vị trí này?" },
    { content: "That's reasonable. Do you have any questions for me about the company or the role?", translation: "Hợp lý. Bạn có câu hỏi nào cho tôi về công ty hoặc vị trí không?" },
    { content: "Thank you for your time today! You did a great job. We'll get back to you within a week. Good luck!", translation: "Cảm ơn bạn đã dành thời gian hôm nay! Bạn đã làm rất tốt. Chúng tôi sẽ phản hồi trong vòng một tuần. Chúc may mắn!" },
  ],
  restaurant: [
    { content: "Excellent choice! Would you like anything to drink first? We have fresh juice, soda, or our house wine.", translation: "Lựa chọn tuyệt vời! Bạn có muốn gọi đồ uống trước không? Chúng tôi có nước ép tươi, nước ngọt, hoặc rượu vang đặc biệt." },
    { content: "Great! For your main course, would you prefer the grilled chicken or the pan-seared salmon? Both come with seasonal vegetables.", translation: "Tuyệt! Món chính, bạn thích gà nướng hay cá hồi áp chảo? Cả hai đều kèm rau củ theo mùa.", feedback: { hasCorrection: true, corrections: ["Tip: 'I'd like...' or 'Could I have...' are polite ways to order food."] } },
    { content: "How would you like it cooked? We can do it rare, medium, or well-done.", translation: "Bạn muốn nấu như thế nào? Chúng tôi có thể làm tái, vừa, hoặc chín kỹ." },
    { content: "Perfect! Do you have any allergies or dietary restrictions I should know about?", translation: "Hoàn hảo! Bạn có bị dị ứng hay kiêng gì mà tôi cần biết không?" },
    { content: "No problem! Would you like to add a side dish? We have mashed potatoes, garden salad, or garlic bread.", translation: "Không sao! Bạn có muốn thêm món phụ không? Chúng tôi có khoai tây nghiền, salad vườn, hoặc bánh mì bơ tỏi." },
    { content: "I'll put that order in right away. While you wait, would you like some bread and butter for the table?", translation: "Tôi sẽ ghi order ngay. Trong khi chờ, bạn có muốn bánh mì và bơ trên bàn không?" },
    { content: "Here's your meal! Enjoy! Is there anything else you need? More water, perhaps?", translation: "Đây là món của bạn! Chúc ngon miệng! Bạn cần gì thêm không? Thêm nước chẳng hạn?", feedback: { hasCorrection: true, corrections: ["Vocabulary: 'The bill' = hóa đơn, 'Tip' = tiền boa, 'Split the bill' = chia bill"] } },
    { content: "I'm glad you're enjoying it! Would you like to see our dessert menu? We have a wonderful chocolate cake today.", translation: "Tôi vui vì bạn thích! Bạn có muốn xem menu tráng miệng không? Hôm nay chúng tôi có bánh sô-cô-la tuyệt vời." },
    { content: "Here's your bill. The total is $45.50. You can pay by card or cash. Would you like to split the bill?", translation: "Đây là hóa đơn. Tổng cộng là $45.50. Bạn có thể thanh toán bằng thẻ hoặc tiền mặt. Bạn có muốn chia bill không?" },
    { content: "Thank you so much! I hope you enjoyed your meal. Have a wonderful evening and please come again!", translation: "Cảm ơn bạn rất nhiều! Hy vọng bạn thích bữa ăn. Chúc buổi tối tốt lành và hẹn gặp lại!" },
  ],
  shopping: [
    { content: "We have that in several colors and sizes. Would you like to try it on? The fitting room is right over there.", translation: "Chúng tôi có sản phẩm đó với nhiều màu và kích cỡ. Bạn có muốn thử không? Phòng thử đồ ở ngay kia." },
    { content: "How does it fit? Do you need a different size? We have small, medium, large, and extra-large.", translation: "Mặc có vừa không? Bạn cần size khác không? Chúng tôi có S, M, L và XL.", feedback: { hasCorrection: true, corrections: ["Tip: 'It fits perfectly' = vừa hoàn hảo, 'It's too tight/loose' = quá chật/rộng"] } },
    { content: "That looks great on you! We also have it in blue and black. Would you like to see those colors?", translation: "Trông bạn mặc đẹp lắm! Chúng tôi còn có màu xanh và đen. Bạn có muốn xem những màu đó không?" },
    { content: "Good choice! This item is currently on sale — 20% off! The original price was $80, so now it's $64.", translation: "Lựa chọn hay! Sản phẩm này đang giảm giá — giảm 20%! Giá gốc là $80, giờ chỉ còn $64." },
    { content: "Would you like to look at anything else? We just got some new arrivals that might interest you.", translation: "Bạn có muốn xem gì khác không? Chúng tôi vừa có hàng mới có thể bạn sẽ thích." },
    { content: "These shoes would go perfectly with what you picked! Would you like to try them on?", translation: "Đôi giày này rất hợp với món bạn chọn! Bạn có muốn thử không?", feedback: { hasCorrection: true, corrections: ["Vocabulary: 'On sale' = đang giảm giá, 'New arrival' = hàng mới về, 'Best seller' = bán chạy nhất"] } },
    { content: "Would you like a bag for your purchases? We also have a loyalty card program — you'll get 10% off your next visit!", translation: "Bạn có muốn túi đựng hàng không? Chúng tôi cũng có chương trình thẻ thành viên — bạn sẽ được giảm 10% lần tới!" },
    { content: "Your total comes to $120. We accept cash, credit cards, and mobile payment. How would you like to pay?", translation: "Tổng cộng là $120. Chúng tôi nhận tiền mặt, thẻ tín dụng và thanh toán di động. Bạn muốn thanh toán bằng gì?" },
    { content: "Here's your receipt. You have 30 days to return or exchange if needed. Just keep the receipt and tags.", translation: "Đây là hóa đơn. Bạn có 30 ngày để đổi trả nếu cần. Chỉ cần giữ hóa đơn và nhãn mác." },
    { content: "Thank you for shopping with us! You made some great choices today. See you next time!", translation: "Cảm ơn bạn đã mua sắm! Bạn đã chọn được những món rất đẹp hôm nay. Hẹn gặp lại!" },
  ],
  travel: [
    { content: "That's a wonderful place to visit! You can take bus number 5 from here, or I can show you the walking route.", translation: "Đó là nơi tuyệt vời để tham quan! Bạn có thể bắt xe bus số 5 từ đây, hoặc tôi có thể chỉ đường đi bộ." },
    { content: "The bus takes about 15 minutes. A taxi would be faster but more expensive — about $10. Which do you prefer?", translation: "Xe bus mất khoảng 15 phút. Taxi nhanh hơn nhưng đắt hơn — khoảng $10. Bạn thích đi gì?", feedback: { hasCorrection: true, corrections: ["Tip: 'How do I get to...?' is the most common way to ask for directions in English."] } },
    { content: "Have you visited the old town yet? It's one of the most popular spots for tourists. The architecture is beautiful!", translation: "Bạn đã đến phố cổ chưa? Đó là một trong những điểm thu hút nhất cho khách du lịch. Kiến trúc rất đẹp!" },
    { content: "I'd also recommend the local night market. It opens at 6 PM and has amazing street food. You must try the local specialties!", translation: "Tôi cũng gợi ý chợ đêm. Mở cửa lúc 6 giờ tối và có đồ ăn đường phố tuyệt vời. Bạn nên thử đặc sản địa phương!" },
    { content: "For tomorrow, I suggest visiting the museum in the morning — it's free on Tuesdays! Then the beach in the afternoon.", translation: "Ngày mai, tôi gợi ý tham quan bảo tàng buổi sáng — miễn phí vào thứ Ba! Rồi biển buổi chiều." },
    { content: "Do you need help booking any tours? There's a popular boat tour around the islands — $25 per person including lunch.", translation: "Bạn có cần giúp đặt tour nào không? Có tour thuyền phổ biến đi quanh các đảo — $25/người bao gồm bữa trưa.", feedback: { hasCorrection: true, corrections: ["Vocabulary: 'Round trip' = khứ hồi, 'One way' = một chiều, 'Layover' = quá cảnh"] } },
    { content: "Here are some useful phrases: 'Thank you' is 'Cảm ơn', 'How much?' is 'Bao nhiêu?'. Locals appreciate when tourists try!", translation: "Đây là vài cụm từ hữu ích: 'Thank you' là 'Cảm ơn', 'How much?' là 'Bao nhiêu?'. Người dân thích khi du khách cố nói!" },
    { content: "Make sure to bring sunscreen and a hat — it gets very hot in the afternoon. Stay hydrated!", translation: "Nhớ mang kem chống nắng và nón — buổi chiều rất nóng. Giữ đủ nước nhé!" },
    { content: "For getting back to your hotel, you can use the metro — it's cheap and fast. The station is just two blocks away.", translation: "Để về khách sạn, bạn có thể đi metro — rẻ và nhanh. Trạm chỉ cách đây hai dãy nhà." },
    { content: "I hope you enjoy the rest of your trip! If you need any more help, don't hesitate to ask. Have fun!", translation: "Hy vọng bạn tận hưởng phần còn lại của chuyến đi! Nếu cần giúp đỡ thêm, đừng ngại hỏi. Chúc vui!" },
  ],
  hotel: [
    { content: "I've found your reservation. You're in room 405 on the 4th floor. Here's your key card. Breakfast is from 7 to 10 AM.", translation: "Tôi đã tìm thấy đặt phòng. Bạn ở phòng 405 tầng 4. Đây là thẻ phòng. Bữa sáng từ 7 đến 10 giờ sáng." },
    { content: "The elevator is to your right. Your room has a city view, free Wi-Fi, and a minibar. The Wi-Fi password is on the desk.", translation: "Thang máy ở bên phải. Phòng bạn có view thành phố, Wi-Fi miễn phí và minibar. Mật khẩu Wi-Fi ở trên bàn.", feedback: { hasCorrection: true, corrections: ["Vocabulary: 'Check in' = nhận phòng, 'Check out' = trả phòng, 'Room service' = dịch vụ phòng"] } },
    { content: "We have a gym on the 2nd floor and a swimming pool on the rooftop. Both are open from 6 AM to 10 PM.", translation: "Chúng tôi có phòng gym ở tầng 2 và hồ bơi trên sân thượng. Cả hai mở cửa từ 6 giờ sáng đến 10 giờ tối." },
    { content: "Would you like a wake-up call tomorrow morning? And would you like us to arrange airport transportation?", translation: "Bạn có muốn gọi báo thức sáng mai không? Và bạn có muốn chúng tôi sắp xếp xe đưa ra sân bay không?" },
    { content: "Of course! We also offer laundry service. Just put your clothes in the bag in the closet before 9 AM.", translation: "Tất nhiên! Chúng tôi cũng có dịch vụ giặt ủi. Chỉ cần bỏ quần áo vào túi trong tủ trước 9 giờ sáng." },
    { content: "Room service is available 24 hours. You can find the menu on the tablet in your room. Any dietary preferences?", translation: "Dịch vụ phòng hoạt động 24 giờ. Bạn có thể xem menu trên máy tính bảng trong phòng. Bạn có kiêng gì không?", feedback: { hasCorrection: true, corrections: ["Tip: 'Could you please...' is the most polite way to make requests at a hotel."] } },
    { content: "There's a great restaurant two blocks away with local cuisine. Our hotel restaurant also has an excellent chef's special tonight!", translation: "Có nhà hàng tuyệt vời cách đây hai dãy nhà với ẩm thực địa phương. Nhà hàng khách sạn cũng có món đặc biệt tối nay!" },
    { content: "Your checkout is on Friday. Would you like to extend your stay? We can offer you a 15% discount for additional nights.", translation: "Bạn trả phòng thứ Sáu. Bạn có muốn gia hạn không? Chúng tôi có thể giảm 15% cho đêm thêm." },
    { content: "Is there anything about your room you'd like us to improve? Extra pillows, towels, or perhaps a different room temperature?", translation: "Có gì về phòng bạn muốn chúng tôi cải thiện không? Thêm gối, khăn, hoặc điều chỉnh nhiệt độ phòng?" },
    { content: "We hope you're enjoying your stay! Don't hesitate to call the front desk anytime — we're here 24/7. Have a wonderful evening!", translation: "Hy vọng bạn đang tận hưởng kỳ nghỉ! Đừng ngại gọi lễ tân bất cứ lúc nào — chúng tôi luôn sẵn sàng 24/7. Chúc buổi tối tốt lành!" },
  ],
};

// ==================== Timer Hook ====================

function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = useCallback(() => setIsRunning(true), []);
  const stop = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const formatted = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  return { seconds, formatted, start, stop, reset, isRunning };
}

// ==================== Model Label ====================

function ModelLabel() {
  const { aiModel } = useSettingsStore();
  const name = FREE_MODELS.find((m) => m.id === aiModel)?.name || "Gemini";
  return <p className="text-[10px] text-slate-500">{name}</p>;
}

// ==================== Bouncing Dots ====================

function BouncingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ==================== Speed Pill ====================

function SpeedPill() {
  const [open, setOpen] = useState(false);
  const { speechSpeed, setSpeechSpeed } = useSettingsStore();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 rounded-full bg-white/[0.06] px-2.5 py-1 text-small font-mono text-slate-400 transition-colors hover:text-white hover:bg-white/[0.06]/80"
      >
        <Gauge className="h-3 w-3" />
        {speechSpeed}x
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            className="absolute right-0 top-full mt-1 z-30 rounded-lg border border-white/[0.08] bg-dark-card shadow-lg shadow-black/40 overflow-hidden"
          >
            {SPEED_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setSpeechSpeed(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "block w-full px-4 py-2 text-left text-small font-mono transition-colors hover:bg-white/[0.06]",
                  opt.value === speechSpeed
                    ? "text-primary bg-primary/10"
                    : "text-slate-300"
                )}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==================== Message Bubble ====================

function MessageBubble({
  message,
  onSpeak,
  isSpeaking,
}: {
  message: {
    id: string;
    role: "user" | "assistant";
    content: string;
    translation?: string;
    feedback?: { hasCorrection: boolean; corrections: string[] };
    timestamp: string;
  };
  onSpeak: (text: string) => void;
  isSpeaking: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn("flex w-full gap-2", isUser ? "justify-end" : "justify-start")}
    >
      {/* AI avatar */}
      {!isUser && (
        <MascotAvatar
          size="sm"
          mood={isSpeaking ? "speaking" : "happy"}
          animate={false}
        />
      )}

      <div
        className={cn(
          "max-w-[75%] rounded-xl px-4 py-3",
          isUser
            ? "rounded-br-sm bg-primary-gradient text-white shadow-glow btn-3d glass-shine"
            : "rounded-bl-sm glass-3d glass-shine text-white"
        )}
      >
        {/* Message content */}
        <p className="text-body leading-relaxed">{message.content}</p>

        {/* Translation for AI messages */}
        {!isUser && message.translation && (
          <p className="mt-2 text-small text-slate-400 italic">
            ({message.translation})
          </p>
        )}

        {/* Listen button for AI messages */}
        {!isUser && (
          <button
            onClick={() => onSpeak(message.content)}
            className="mt-2 flex items-center gap-1 rounded-lg bg-white/[0.08] px-2.5 py-1 text-small text-secondary transition-all hover:bg-white/[0.12] hover:-translate-y-0.5 active:translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_6px_rgba(0,0,0,0.2)] press-glow-green"
          >
            <Volume2 className="h-3 w-3" />
            Nghe
          </button>
        )}

        {/* Grammar corrections */}
        {message.feedback?.hasCorrection && message.feedback.corrections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 rounded-md border border-status-warning/30 bg-status-warning/10 px-3 py-2"
          >
            <p className="text-small font-semibold text-status-warning">
              Gợi ý sửa lỗi:
            </p>
            {message.feedback.corrections.map((correction, idx) => (
              <p key={idx} className="mt-1 text-small text-slate-300">
                {correction}
              </p>
            ))}
          </motion.div>
        )}

        {/* Timestamp */}
        <p
          className={cn(
            "mt-1 text-[10px]",
            isUser ? "text-white/50 text-right" : "text-slate-500"
          )}
        >
          {new Date(message.timestamp).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </motion.div>
  );
}

// ==================== Page Component ====================

export default function ChatPage() {
  const router = useRouter();
  const {
    messages,
    scenario,
    isLoading,
    setScenario,
    addMessage,
    setLoading,
    clearMessages,
  } = useChatStore();

  const {
    speak,
    stopSpeaking,
    isSpeaking,
    startListening,
    stopListening,
    isListening,
    transcript,
    setTranscript,
  } = useSpeech({ lang: "en-US" });

  const timer = useTimer();

  const [inputText, setInputText] = useState("");
  const [showScenarioDropdown, setShowScenarioDropdown] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasInitialized = useRef(false);

  // Get current scenario info
  const currentScenario = SCENARIOS.find((s) => s.key === scenario) || SCENARIOS[0];

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Send initial greeting when scenario changes or on first mount
  useEffect(() => {
    if (hasInitialized.current && messages.length > 0) return;
    hasInitialized.current = true;

    const greeting = SCENARIO_GREETINGS[scenario];
    clearMessages();
    setTimeout(() => {
      addMessage("assistant", greeting.content, greeting.translation);
      timer.start();
    }, 300);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle scenario change
  const handleScenarioChange = useCallback(
    (newScenario: ChatScenario) => {
      setShowScenarioDropdown(false);
      if (newScenario === scenario) return;

      stopSpeaking();
      setScenario(newScenario);
      timer.reset();

      const greeting = SCENARIO_GREETINGS[newScenario];
      setTimeout(() => {
        addMessage("assistant", greeting.content, greeting.translation);
        timer.start();
      }, 300);
    },
    [scenario, setScenario, addMessage, timer, stopSpeaking]
  );

  // Handle transcript from speech recognition
  useEffect(() => {
    if (transcript && !isListening) {
      setInputText(transcript);
      setTranscript("");
      // Auto-send after speech recognition ends
      handleSendMessage(transcript);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  // Send message handler
  const handleSendMessage = useCallback(
    async (overrideText?: string) => {
      const text = (overrideText || inputText).trim();
      if (!text || isLoading) return;

      setInputText("");

      // Capture history BEFORE adding user message (so current msg isn't duplicated)
      const historySnapshot = useChatStore.getState().messages;
      const selectedModel = useSettingsStore.getState().aiModel;

      addMessage("user", text);
      setLoading(true);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: text,
            scenario,
            history: historySnapshot,
            model: selectedModel,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          if (response.status === 503) {
            throw new Error("AI_NOT_CONFIGURED");
          }
          throw new Error(errorData?.error || "API request failed");
        }

        const data = await response.json();
        addMessage(
          "assistant",
          data.message,
          data.translation,
          data.feedback
        );
      } catch {
        // Fallback to demo conversation flow when API is unavailable
        const currentMsgs = useChatStore.getState().messages;
        const userMsgCount = currentMsgs.filter((m) => m.role === "user").length;
        const flow = DEMO_FLOWS[scenario];
        const idx = Math.min(Math.max(userMsgCount - 1, 0), flow.length - 1);
        const demo = flow[idx];
        addMessage("assistant", demo.content, `[Demo] ${demo.translation}`, demo.feedback);
      } finally {
        setLoading(false);
      }
    },
    [inputText, isLoading, scenario, addMessage, setLoading]
  );

  // Toggle microphone
  const handleMicToggle = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      setInputText("");
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Handle key press in input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Handle close/exit chat
  const handleClose = () => {
    stopSpeaking();
    timer.stop();
    clearMessages();
    router.back();
  };

  return (
    <div className="flex h-screen flex-col bg-dark">
      {/* ==================== Header ==================== */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-20 flex items-center justify-between glass-3d-heavy px-4 py-3"
      >
        <button
          onClick={() => router.back()}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>

        <div className="flex items-center gap-2">
          <MascotAvatar size="sm" mood={isSpeaking ? "speaking" : "happy"} animate={false} />
          <div>
            <h1 className="text-h3 text-white">AI Tutor</h1>
            <ModelLabel />
          </div>
          <div className="flex items-center gap-1 rounded-md bg-white/[0.06] px-2 py-0.5">
            <Clock className="h-3 w-3 text-slate-400" />
            <span className="text-small font-mono text-slate-400">
              {timer.formatted}
            </span>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
        >
          <X className="h-5 w-5 text-slate-400" />
        </button>
      </motion.header>

      {/* ==================== Scenario + Speed Bar ==================== */}
      <div className="relative z-10 glass-3d px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScenarioDropdown(!showScenarioDropdown)}
            className="flex flex-1 items-center justify-between rounded-lg bg-dark-card px-3 py-2 transition-colors hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-2">
              <span className="text-body">{currentScenario.icon}</span>
              <span className="text-body font-semibold text-white">
                {currentScenario.label}
              </span>
            </div>
            <motion.div
              animate={{ rotate: showScenarioDropdown ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </motion.div>
          </button>

          {/* Speed pill */}
          <SpeedPill />
        </div>

        {/* Dropdown */}
        <AnimatePresence>
          {showScenarioDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -8, scaleY: 0.9 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute left-4 right-4 top-full mt-1 overflow-hidden rounded-lg border border-white/[0.08] bg-dark-card shadow-lg shadow-black/40"
            >
              {SCENARIOS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleScenarioChange(s.key)}
                  className={cn(
                    "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.06]",
                    scenario === s.key && "bg-primary/10"
                  )}
                >
                  <span className="text-body">{s.icon}</span>
                  <div>
                    <p
                      className={cn(
                        "text-body font-semibold",
                        scenario === s.key ? "text-primary" : "text-white"
                      )}
                    >
                      {s.label}
                    </p>
                    <p className="text-small text-slate-500">{s.description}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ==================== Message List ==================== */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        onClick={() => setShowScenarioDropdown(false)}
      >
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                onSpeak={speak}
                isSpeaking={isSpeaking}
              />
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 justify-start"
            >
              <MascotAvatar size="sm" mood="thinking" animate={false} />
              <div className="rounded-lg rounded-bl-sm border border-white/[0.08] bg-dark-card">
                <BouncingDots />
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ==================== Listening Indicator ==================== */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex items-center justify-center gap-2 border-t border-white/[0.08] bg-dark-card px-4 py-2"
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-status-error"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-small text-slate-400">
              Đang nghe... Hãy nói gì đó
            </span>
            {transcript && (
              <span className="ml-2 text-small text-white italic">
                &ldquo;{transcript}&rdquo;
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== Input Area ==================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="glass-3d-heavy px-4 py-3"
      >
        <div className="flex items-center gap-2">
          {/* Microphone button */}
          <motion.button
            whileTap={{ scale: 0.9, y: 1 }}
            onClick={handleMicToggle}
            className={cn(
              "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all btn-3d",
              isListening
                ? "bg-status-error text-white shadow-[0_0_16px_rgba(239,68,68,0.4)]"
                : "bg-white/[0.08] text-slate-400 hover:text-white hover:-translate-y-0.5"
            )}
          >
            {/* Pulsing ring when recording */}
            {isListening && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-status-error"
                animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <Mic className="h-5 w-5" />
          </motion.button>

          {/* Text input */}
          <div className="flex-1">
            <input
              ref={inputRef}
              type="text"
              value={isListening ? transcript : inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập tin nhắn..."
              disabled={isListening}
              className="w-full rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-body text-white placeholder-gray-500 outline-none transition-all focus:border-primary/50 focus:shadow-[0_0_12px_rgba(108,99,255,0.15)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
            />
          </div>

          {/* Send button */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSendMessage()}
            disabled={(!inputText.trim() && !isListening) || isLoading}
            className="h-10 w-10 shrink-0 !rounded-full !p-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Safe area spacer for mobile */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </motion.div>
    </div>
  );
}
