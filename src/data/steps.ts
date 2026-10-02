export interface TutorialStep {
  id: number;
  title: string;
  titleVi: string;
  description: string;
  hint: string;
  code: string;
}

export const steps: TutorialStep[] = [
  {
    id: 1,
    title: "HTML Structure",
    titleVi: "Bước 1: Tạo cấu trúc HTML",
    description:
      "Bắt đầu với một trang HTML cơ bản. Thẻ <h1> tạo đề mục và thẻ <p> tạo đoạn văn bản. Chưa có style nào được áp dụng.",
    hint: "Thử thay đổi nội dung văn bản bên trong các thẻ để xem kết quả.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>Đây là đề mục</h1>
<p>Đây là đoạn văn bản.</p>
</body>
</html>`,
  },
  {
    id: 2,
    title: "Font Family & Color",
    titleVi: "Bước 2: Thay đổi font chữ và màu sắc",
    description:
      "Sử dụng thuộc tính font-family để thay đổi font chữ, color để đổi màu, và font-size để thay đổi kích thước chữ. Thẻ h1 dùng font Tahoma màu xanh, thẻ p dùng font Arial màu đỏ.",
    hint: "Thử đổi tên font hoặc giá trị % để xem sự khác biệt.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            color: blue;
            font-family: Tahoma;
            font-size: 200%;
        }
        p {
            color: red;
            font-family: Arial;
            font-size: 120%;
        }
    </style>
</head>
<body>
<h1>Đây là đề mục</h1>
<p>Đây là đoạn văn bản.</p>
</body>
</html>`,
  },
  {
    id: 3,
    title: "Border",
    titleVi: "Bước 3: Vẽ viền với border",
    description:
      "Sử dụng thuộc tính border để vẽ viền cho thẻ p. Cú pháp: border: [độ dày] [kiểu] [màu]. Ví dụ: border: 1px solid grey.",
    hint: "Thử đổi màu viền hoặc độ dày (2px, 3px...) để xem thay đổi.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            color: blue;
            font-family: Tahoma;
            font-size: 200%;
        }
        p {
            color: red;
            font-family: Arial;
            font-size: 120%;
            border: 1px solid grey;
        }
    </style>
</head>
<body>
<h1>Đây là đề mục</h1>
<p>Đây là đoạn văn bản.</p>
</body>
</html>`,
  },
  {
    id: 4,
    title: "Padding",
    titleVi: "Bước 4: Khoảng cách với padding",
    description:
      "Sử dụng thuộc tính padding để quy định khoảng cách từ đường viền đến các thành phần bên trong. Thêm nhiều thẻ p để thấy rõ hiệu ứng.",
    hint: "Thử tăng padding lên 20px hoặc 30px để thấy khoảng cách lớn hơn.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            color: blue;
            font-family: Tahoma;
            font-size: 200%;
        }
        p {
            color: red;
            font-family: Arial;
            font-size: 120%;
            border: 1px solid grey;
            padding: 10px;
        }
    </style>
</head>
<body>
<h1>Đây là đề mục</h1>
<p>Đây là đoạn văn bản.</p>
<p>Đây là đoạn văn bản.</p>
<p>Đây là đoạn văn bản.</p>
</body>
</html>`,
  },
  {
    id: 5,
    title: "ID Selectors",
    titleVi: "Bước 5: Gán id cho từng phần tử",
    description:
      "Gán id cho các element để thay đổi CSS cho từng phần tử riêng biệt. Dùng #element1 trong CSS để nhắm vào thẻ có id='element1', đổi màu chữ thành xanh.",
    hint: "Thử thêm id mới và tạo CSS cho id đó.",
    code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            color: blue;
            font-family: Tahoma;
            font-size: 200%;
        }
        p {
            color: red;
            font-family: Arial;
            font-size: 120%;
            border: 1px solid grey;
            padding: 10px;
        }
        #element1 {
            color: blue;
        }
    </style>
</head>
<body>
<h1>Đây là đề mục</h1>
<p>Đây là đoạn văn bản.</p>
<p>Đây là đoạn văn bản.</p>
<p>Đây là đoạn văn bản.</p>
<p id="element1">Đoạn văn bản có thuộc tính id</p>
</body>
</html>`,
  },
];
