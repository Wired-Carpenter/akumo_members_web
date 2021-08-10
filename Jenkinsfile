import org.jenkinsci.plugins.pipeline.modeldefinition.Utils
def git_commit = ""
def artifact_name = ""
node {
    env.NODEJS_HOME = "${tool 'node 14.17.3'}"
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    stage ("Workspace cleanup") {
        deleteDir()
        sh 'ls -al'
    }
    stage ("Git checkout") {
        checkout scm
        git_commit =  sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        echo "Git commit - $git_commit"
    }
    stage ("Build") {
        echo "App versions:"
        echo "NodeJS - " + sh(script: 'node -v', returnStdout: true)
        echo "Npm - " + sh(script: 'npm -v', returnStdout: true)
        echo "Quasar - " + sh(script: 'yarn -v', returnStdout: true)
        sh 'yarn'
        sh 'yarn build'
    }
    stage ("Create artifact") {
        date = new Date()
        tz = TimeZone. getTimeZone('CST')
        branch = env.BRANCH_NAME.replaceAll("/", "-")
        artifact_name = date.format("yyyy.MM.dd-HH.mm.ss", tz)+"-$branch-$git_commit"+".zip"
        zip zipFile: artifact_name, archive: false, dir: 'dist/spa'
    }
    stage("Upload artifact") {
        sh "aws s3api put-object --bucket akumo-members-crm-artifacts --key 'vite-frontend/$artifact_name' --body '$artifact_name'"
    }
    stage("Deploy to dev") {
        if(env.BRANCH_NAME == "main") {
            build job: 'akumo-members-crm-vite-frontend-app-deploy', 
                parameters: 
                [
                    [$class: 'StringParameterValue', name: 'Environment', value: 'dev'],
                    [$class: 'StringParameterValue', name: 'BuildVersion', value: artifact_name]
                ]
        }
        else {
            Utils.markStageSkippedForConditional("Deploy to dev")
            println "Not a main branch, pipeline to deploy to dev is not triggered"
        }
    }
}