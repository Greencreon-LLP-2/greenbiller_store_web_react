pipeline {
    agent any

    environment {
        APP_NAME = "greenbiller_store_web_react"
        CLONE_DIR = "/root/savio/${APP_NAME}"
        DEPLOY_DIR = "/var/www/static_html/${APP_NAME}"
    }

    stages {
        stage('Checkout') {
            steps {
                sh '''
                sudo rm -rf ${CLONE_DIR}
                sudo mkdir -p ${CLONE_DIR}
                cd ${CLONE_DIR}
                git clone -b react_cicd_pankaj https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git .
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                cd ${CLONE_DIR}
                npm install
                '''
            }
        }

        stage('Build React App') {
            steps {
                sh '''
                cd ${CLONE_DIR}
                npm run build
                '''
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                sudo rm -rf ${DEPLOY_DIR}/*
                sudo mkdir -p ${DEPLOY_DIR}
                sudo cp -r ${CLONE_DIR}/dist/* ${DEPLOY_DIR}/
                sudo systemctl reload nginx
                '''
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
