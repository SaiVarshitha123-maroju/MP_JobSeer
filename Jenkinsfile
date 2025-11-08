pipeline {
    agent none
    stages {
        stage('Checkout Repository') {
            agent { label 'built-in' }
            steps {
                git branch: 'main', url: 'https://github.com/SaiVarshitha123-maroju/MP_JobSeer.git'
            }
        }

        stage('Process Files in Parallel') {
            parallel {
                stage('Backend Processing') {
                    agent { label 'win_agent' }
                    steps {
                        echo 'Processing Backend files on win_agent...'
                        bat 'mkdir dist_backend'
                        bat 'copy server.js dist_backend\\'
                        bat 'copy cosineSimilarityModel.js dist_backend\\'
                        bat 'copy package.json dist_backend\\'
                        bat 'xcopy /E /I models dist_backend\\models'
                        bat 'xcopy /E /I routes dist_backend\\routes'
                        stash includes: 'dist_backend/**', name: 'backend_files'
                    }
                }

                stage('Frontend Processing') {
                    agent { label 'win' }
                    steps {
                        echo 'Processing Frontend files on win...'
                        bat 'mkdir dist_frontend'
                        bat 'xcopy /E /I client dist_frontend\\client'
                        stash includes: 'dist_frontend/**', name: 'frontend_files'
                    }
                }

                stage('Docker Processing') {
                    agent { label 'win_agent' }
                    steps {
                        echo 'Processing Docker configuration files...'
                        bat 'mkdir dist_docker'
                        bat 'copy Dockerfile dist_docker\\'
                        bat 'copy .dockerignore dist_docker\\'
                        stash includes: 'dist_docker/**', name: 'docker_files'
                    }
                }
            }
        }

        stage('Controller Status Check') {
            agent { label 'built-in' }
            steps {
                echo 'Controller lane is active. Agents are online and working.'
            }
        }

        stage('Combine & Build') {
            agent { label 'built-in' }
            steps {
                echo 'Combining all files...'
                dir('final_dist') {
                    unstash 'backend_files'
                    unstash 'frontend_files'
                    unstash 'docker_files'
                }
                echo 'Build artifacts combined successfully.'
                archiveArtifacts artifacts: 'final_dist/**', fingerprint: true
            }
        }

        stage('Docker Build') {
            agent { label 'win_agent' }
            steps {
                echo 'Building Docker image...'
                dir('final_dist') {
                    unstash 'backend_files'
                    unstash 'frontend_files'
                    unstash 'docker_files'
                    bat 'copy dist_docker\\Dockerfile .'
                    bat 'copy dist_docker\\.dockerignore .'
                    bat 'xcopy /E /I dist_backend\\* .'
                    bat 'xcopy /E /I dist_frontend\\* .'
                    bat 'docker build -t jobseer:latest .'
                }
            }
        }

        stage('Deploy Container') {
            agent { label 'win_agent' }
            steps {
                echo 'Deploying Docker container...'
                bat 'docker stop jobseer || exit 0'
                bat 'docker rm jobseer || exit 0'
                bat 'docker run -d --name jobseer -p 5000:5000 jobseer:latest'
                echo 'Application deployed successfully on port 5000'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check the logs.'
        }
    }
}
