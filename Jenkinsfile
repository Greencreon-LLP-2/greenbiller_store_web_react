pipeline {
    agent any
    tools {
        nodejs 'nodejs'   
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'Devops_Pankaj', url: 'https://github.com/Greencreon-LLP-2/greenbiller_store_web_react.git/'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build --verbose'
            }
        }

        stage('Deploy to Nginx') {
            steps {
                script {
                    sh '''
                    DEPLOY_DIR=/var/www/react-app

                    # Create deploy directory if not exists
                    sudo mkdir -p $DEPLOY_DIR

                    # Remove old build
                    sudo rm -rf $DEPLOY_DIR/*

                    # Copy new build
                    sudo cp -r dist/* $DEPLOY_DIR/

                    # Restart nginx to load new files
                    sudo systemctl restart nginx
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ React app deployed successfully on http://<jenkins-server-ip>/"
        }
        failure {
            echo "❌ Pipeline failed."
        }
    }
}
