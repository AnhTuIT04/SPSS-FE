# SPSS - FULL STACK

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Phân chia công việc

| STT | Họ và tên           | MSSV    | Vai trò                                                                                                                                  | Tổng tỉ lệ đóng góp |
| --- | ------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| 1   | Lê Hoàng Ngọc Hân   | 2210935 | Front-end                                                                                            | 100%               |
| 2   | Huỳnh Văn Tú        | 2213841 | Full-stack                                                                                        | 100%                 |
| 3   | Lê Hoàng Khánh Vinh | 2213963 | Full-stack                                                                                        | 100%                 |

## Report

Truy cập vào link https://www.overleaf.com/read/srchjmsvpmhp#cbe34b để xem báo cáo.

## Demo

Truy cập vào link https://www.youtube.com/watch?v=KPEa9qp02P8 để xem video demo.

## Description

SPSS is a Smart Printing Service for Students at HCMUT. It allows students to print documents using various printers available on campus.

## Getting Started

### Cloning the Repository

To clone the repository, run the following command:

```bash
git clone https://github.com/AnhTuIT04/SPSS-FE.git
cd spss-fe
```

# Installing Packages

Install the necessary packages using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

# Configuration

## Creating the `.env` File

Create a `.env` file in the root directory of the project and add the following environment variables:

```bash
AUTH_SECRET=your_secret
EDGE_STORE_ACCESS_KEY=your_edge_store_access_key
EDGE_STORE_SECRET_KEY=your_edge_store_secret_key

MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
MYSQL_DATABASE=your_mysql_db
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password

JWT_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
```

## Getting keys

You need to set up your MySQL database and get the necessary credentials to fill in the `.env` file.

# Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

# Project Structure

```bash
.env
.gitignore
.next/
.prettierrc
.vscode/
actions/
app/
[auth.ts](http://_vscodecontentref_/1)
components/
[components.json](http://_vscodecontentref_/2)
constants/
db/
hooks/
lib/
[middleware.ts](http://_vscodecontentref_/3)
middlewares/
models/
[next-auth.d.ts](http://_vscodecontentref_/4)
[next-env.d.ts](http://_vscodecontentref_/5)
[next.config.mjs](http://_vscodecontentref_/6)
[package.json](http://_vscodecontentref_/7)
[postcss.config.mjs](http://_vscodecontentref_/8)
public/
[README.md](http://_vscodecontentref_/9)
[routes.ts](http://_vscodecontentref_/10)
schemas/
[tailwind.config.ts](http://_vscodecontentref_/11)
[tsconfig.json](http://_vscodecontentref_/12)
```
