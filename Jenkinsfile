pipeline {
    agent any

    environment {
        DOCKER_USER = 'pvdr8978'
        DOCKER_PASSWORD = 'PVdr@8978'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Build & Test') {
            steps {
                dir('todo-management') {
                    sh 'mvn clean test'
                }
            }
        }

        stage('Backend Docker Build') {
            steps {
                dir('todo-management') {
                    sh 'docker build -t pvdr8978/todo-backend .'
                }
            }
        }

        stage('Frontend Docker Build') {
            steps {
                dir('todo-ui') {
                    sh 'docker build -t pvdr8978/todo-frontend .'
                }
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                    echo "$DOCKER_PASSWORD" | docker login \
                    -u "$DOCKER_USER" --password-stdin
                '''
            }
        }

        stage('Docker Push') {
            steps {
                sh '''
                    docker push pvdr8978/todo-backend
                    docker push pvdr8978/todo-frontend
                '''
            }
        }
    }
}
