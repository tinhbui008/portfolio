# Băng Khanh — Portfolio (Sticker Club)

Landing page portfolio cho Graphic Designer 2D, dựng từ thiết kế **B — Sticker Club** trên Claude Design.

**Stack:** Next.js 16 (App Router, Node.js runtime) · Tailwind CSS v4 · GSAP (ScrollTrigger, Flip) · Lenis · zod · nodemailer

## Chạy local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Sửa nội dung — không cần đụng code

Toàn bộ nội dung nằm trong `src/content/`:

| File | Nội dung |
| --- | --- |
| `site.json` | Tên, câu định vị, sticker, marquee, About (bio, tool, số liệu), logo khách hàng, email, mạng xã hội, ngân sách, footer |
| `projects.json` | `categories` (bộ lọc), `works` (lưới bento), `featured` (cuộn ngang), `caseStudy` |
| `services.json` | 4 dịch vụ |
| `testimonials.json` | Đánh giá khách hàng |

**Thêm một tác phẩm:** thêm object vào `works` trong `projects.json`.

```json
{ "id": "p10", "title": "Tên dự án", "category": "poster", "size": "tall",
  "art": "letter", "bg": "#FF5BA7", "fg": "#0E0E13", "image": "/works/p10.webp" }
```

- `size`: `big` (2×2) · `wide` (2×1) · `tall` (1×2) · `sq` (1×1)
- `image`: ảnh thật đặt trong `public/works/` (nên dùng WebP/AVIF, ~1600px cạnh dài). Bỏ trống thì hiện hình placeholder theo `art` (`sun`, `grid`, `arch`, `stripes`, `blob`, `dots`, `flower`, `sketch`, `letter` + `glyph`).
- `category` phải trùng một `id` trong `categories`.

Màu dùng tên swatch (`lime`, `pink`, `orange`, `blue`, `yellow`, `cream`) hoặc mã hex. Token màu/font nằm ở `@theme` trong `src/app/globals.css`.

## Cấu trúc

```
src/
  app/
    layout.tsx            fonts preload, metadata, script chống nháy trước khi paint
    page.tsx              ghép các section
    globals.css           token Tailwind + class dùng chung (art, sticker, mask, cursor…)
    fonts.css             @font-face tự host (public/fonts)
    api/contact/route.ts  API form liên hệ (Node.js): validate zod, honeypot, rate-limit, gửi mail
  components/
    sections/             Loader, Nav, Hero, Marquee, Works, Featured, CaseStudy,
                          Services, About, Testimonials, Contact, ContactForm
    motion/               Motion.tsx (island) + initMotion.ts (GSAP/Lenis, tải lười khi idle)
    ui/                   Art, Arrow/Star
  content/                JSON nội dung
  lib/content.ts          kiểu dữ liệu + loader
```

## Animation

Các section là Server Component; hiệu ứng gắn qua data-attribute và được khởi tạo một lần trong `initMotion.ts`:

| Hiệu ứng | Cách làm |
| --- | --- |
| Loader vẽ tên, chữ hero trượt lên, collage bay vào, sticker dán | CSS keyframes (không cần JS → paint sớm) |
| Smooth scroll | Lenis, chạy trên ticker của GSAP |
| Section hiện dần `.rv` | `ScrollTrigger.batch` (stagger) |
| Wipe-reveal ảnh `.mask` | ScrollTrigger; trong dải cuộn ngang dùng `containerAnimation` |
| Featured cuộn ngang `[data-hscroll]` | Pin + scrub (desktop); mobile vuốt ngang có snap |
| Parallax `[data-speed]` / `[data-depth]` | Theo cuộn / theo chuột (`quickTo`) |
| Đếm số `[data-count]` | GSAP tween khi vào khung |
| Bộ lọc Works | GSAP **Flip** (tải khi bấm lọc lần đầu) |
| Marquee | CSS, tăng tốc theo vận tốc cuộn |
| Con trỏ tùy biến, nút magnetic, nghiêng 3D | Chỉ desktop có chuột |

**Reduced motion:** nếu người dùng bật `prefers-reduced-motion`, nội dung hiện ngay, không loader, không smooth scroll, marquee đứng yên.
**Mobile:** bỏ loader, collage, con trỏ, parallax chuột; Featured chuyển thành vuốt ngang.

## Form liên hệ

`POST /api/contact` — kiểm tra dữ liệu bằng zod, chặn bot bằng honeypot, giới hạn 5 lần/10 phút mỗi IP.
Copy `.env.example` → `.env` và điền SMTP để nhận email. Không cấu hình SMTP thì yêu cầu chỉ được ghi vào log server.

## Deploy (Coolify / Docker)

`next.config.ts` bật `output: "standalone"`; `Dockerfile` build multi-stage ra image Node 22 alpine.

- Coolify: tạo resource từ repo, Build Pack **Dockerfile**, port **3000**, thêm biến môi trường SMTP.
- Docker thủ công: `docker build -t bk-portfolio . && docker run -p 3000:3000 --env-file .env bk-portfolio`

## Hiệu năng (Lighthouse, bản build production)

| | Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- | --- |
| Mobile | 94 | 100 | 100 | 100 |
| Desktop | 98 | 100 | 100 | 100 |

Những gì giữ điểm cao: font tự host + preload (CLS 0), grain là tile nhỏ thay vì filter toàn màn hình, GSAP/Lenis tải lười khi trình duyệt rảnh, intro dùng CSS.
Khi thay ảnh thật, nhớ nén ảnh — đây là yếu tố ảnh hưởng điểm lớn nhất.
