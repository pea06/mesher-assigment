# 메셔(Mesher) 백엔드 개발자 조완규 과제

> Nest.js, TypeORM

## 프로젝트 실행 방법
> Git, Node.js, Docker 및 Docker Compose가 설치되어있어야 합니다.

### 1. 프로젝트 클론

먼저, Git을 사용하여 프로젝트를 클론합니다:

```bash
git clone https://github.com/pea06/mesher-assigment
cd mesher-assigment
```

### 2. 환경 변수 설정 (.env 파일 추가)

프로젝트의 루트 디렉토리에 `.env` 파일을 추가해야 합니다. `.env.example` 파일을 참고하여 작성하면 됩니다.
docker-compose로 실행하기 위한 Database환경 변수가 들어가 있어
ETHERS_NETWORK, INFURA_API_KEY, SLACK_WEBHOOK_URL의 환경변수 값만 추가하면 됩니다.

### 3. Docker 컨테이너 실행

```bash
docker compose up -d --build
```

### 4. API 문서 확인

서버가 실행된 후, Swagger를 통해 API 문서를 확인할 수 있습니다.

Swagger URL: [https://localhost:3000/api-docs](http://localhost:3000/api-docs)
