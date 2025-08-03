# web/Dockerfile
FROM nginx:alpine

# ลบ default.conf ของ NGINX
RUN rm /etc/nginx/conf.d/default.conf

# คัด config ใหม่เข้าไป
COPY nginx.conf /etc/nginx/conf.d

# คัดไฟล์ HTML ไปยัง root
COPY . /usr/share/nginx/html
