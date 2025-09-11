pipeline {
    agent any

    environment {
        APP_NAME = "greenbiller_store_web_react"
        CLONE_DIR = "/savio/greenbiller_store_web_react"
        DEPLOY_DIR = "/var/www/static_html/greenbiller_store_web_react"
    }

    stages {
        stage('Install Dependencies') {
            steps {
                dir("${CLONE_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir("${CLONE_DIR}") {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                sudo mkdir -p ${DEPLOY_DIR}
                sudo rm -rf ${DEPLOY_DIR}/*
                sudo cp -r ${CLONE_DIR}/dist/* ${DEPLOY_DIR}/
                sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed successfully: http://<server-ip>:3011"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
