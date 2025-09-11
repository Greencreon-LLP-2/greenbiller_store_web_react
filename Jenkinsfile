pipeline {
    agent any

    environment {
        APP_NAME = "greenbiller_store_web_react"
        CLONE_DIR = "/savio/${APP_NAME}"
        APP_DIR = "/var/www/static_html/${APP_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                dir("${CLONE_DIR}") {
                    git branch: 'main', url: 'https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git'
                }
            }
        }

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
                dir("${CLONE_DIR}") {
                    sh '''
                    sudo mkdir -p ${APP_DIR}
                    sudo rm -rf ${APP_DIR}/*
                    sudo cp -r dist/* ${APP_DIR}/
                    sudo systemctl reload nginx
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed successfully via Nginx on http://<server-ip>:3011"
        }
        failure {
            echo "❌ Deployment failed. Check logs."
        }
    }
}
