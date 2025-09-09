pipeline {
    agent any

    environment {
        APP_NAME = "greenbiller_store_web_react"
        APP_DIR = "/var/www/react-app-3011"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                sh '''
                # Remove old build
                rm -rf ${APP_DIR}/*

                # Copy new build
                cp -r dist/* ${APP_DIR}/

                # Reload Nginx
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
