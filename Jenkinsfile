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
                // Clone repo in /root/savio/project_name
                sh '''
                sudo rm -rf ${CLONE_DIR}
                sudo mkdir -p ${CLONE_DIR}
                cd ${CLONE_DIR}
                git clone -b main https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git .
                '''
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
                sh '''
                sudo mkdir -p ${DEPLOY_DIR}
                sudo rm -rf ${DEPLOY_DIR}/*

                # Copy build output (dist ya build folder check karo)
                if [ -d "${CLONE_DIR}/dist" ]; then
                  sudo cp -r ${CLONE_DIR}/dist/* ${DEPLOY_DIR}/
                elif [ -d "${CLONE_DIR}/build" ]; then
                  sudo cp -r ${CLONE_DIR}/build/* ${DEPLOY_DIR}/
                fi

                sudo systemctl reload nginx
                '''
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed successfully at http://<server-ip>:3011"
        }
        failure {
            echo "❌ Deployment failed. Please check logs."
        }
    }
}
