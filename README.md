# Final Exam – Cloud/Docker Web App with References Management

This project is part of a cloud computing and DevOps assignment. It demonstrates a complete deployment of a web-based system for managing research references using **Docker**, **Docker Compose**, **Node.js**, and **MySQL**, deployed on **AWS EC2** and exposed securely via **Cloudflare DNS**.

---

## 🧱 Project Structure

```bash
finalexam-project/
├── docker-compose.yml
├── web/                # Static HTML frontend
│   ├── Dockerfile
│   ├── index.html      # Landing page
│   ├── about.html      # Personal profile page
│   ├── myresearch.html # Research summary + reference list
│   └── reference.html  # Admin-only reference management
├── api/                # Node.js + Express backend
│   ├── Dockerfile
│   ├── package.json
│   ├── index.js        # REST API server
│   └── db.js           # DB connection pool
```

## 🌐 Features
### Frontend (Static HTML + Tailwind CSS)
**index.html**: Landing page with student name, ID, and GitHub repo

**about.html**: Shows personal info and profile picture

**myresearch.html**: Static research summary + dynamic reference list (read-only)

**reference.html**: Full Add/Edit/Delete access to reference items (admin-style view)

### Backend (Node.js + Express)
REST API to manage references via /references

#### Each reference includes:

title: IEEE-style citation

pdf_url: URL to the PDF file

API secured via internal network (Docker)

Database (MySQL)
Stores reference entries with:

```bash
id (auto-increment)
title
pdf_url
```

## ⚙️ Technology Stack
Docker & Docker Compose

NGINX (static file server for HTML)

Node.js + Express (REST API)

MySQL 8.0 (Database)

Tailwind CSS (UI)

AWS EC2 (hosting)

Cloudflare (DNS & SSL proxy)

## 📌 Notes
- API auto-creates references table if it doesn't exist

- If database is not ready yet, API retries connection every few seconds

- You can adapt to file upload (PDF) later using multer + volume or S3

- Tailwind CDN used for fast prototyping (no build process)
