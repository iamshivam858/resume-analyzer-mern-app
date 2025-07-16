pipeline {
  agent any

  environment {
    FRONTEND_DIR = 'client'
    BACKEND_DIR = 'backend'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/iamshivam858/resume-analyzer-mern-app.git'
      }
    }

    stage('Install Backend Dependencies') {
      steps {
        dir("${BACKEND_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Install Frontend Dependencies') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'npm install'
        }
      }
    }

    stage('Build Frontend') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'npm run build'
        }
      }
    }

    stage('Start Backend with PM2') {
      steps {
        dir("${BACKEND_DIR}") {
          sh 'pm2 delete resume-backend || true'
          sh 'pm2 start server.js --name resume-backend'
        }
      }
    }

    stage('Serve Frontend Build with PM2') {
      steps {
        dir("${FRONTEND_DIR}") {
          sh 'pm2 delete resume-frontend || true'
          sh 'pm2 serve build 3000 --name resume-frontend'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployment complete!'
    }
    failure {
      echo '❌ Deployment failed!'
    }
  }
}
