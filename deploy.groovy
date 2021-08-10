import org.jenkinsci.plugins.pipeline.modeldefinition.Utils
def deployEnv = params["Environment"]
def buildVersion = params["BuildVersion"]
def account = (deployEnv == "prod") ? "896730423324" : "140316374689"
def jsonCreds
node {
    stage ("Workspace cleanup") {
        deleteDir()
        sh 'ls -al'
    }
    stage ("pull artifact"){
        currentBuild.description = buildVersion[0..9] + " -- " + buildVersion.split("-")[-1].replaceAll(".zip", "")[0..6] + "\n${deployEnv}"
        artifact = buildVersion.split('-')[-1]
        sh "aws s3api get-object --bucket akumo-members-crm-artifacts --key 'vite-frontend/$buildVersion' $artifact"
        sh "unzip $artifact"
        sh "rm -rf $artifact"
        sh "ls -al"
    }
    stage ("upload files to s3") {
        // domain = sh(returnStdout: true, script: "aws s3 cp s3://sharedservices-terraform-backend-akumotechnology/akumo-members-crm/${deployEnv}/backend.tfstate - | jq .outputs.domain.value").replaceAll('"', '').trim()
        // sh "find . -type f | xargs sed -i 's/domain_placeholder/${domain}/g'"
        creds = sh(returnStdout: true, script: "aws sts assume-role --role-arn arn:aws:iam::${account}:role/TerraformExecutionRole --role-session-name front-deploy")
        jsonCreds = readJSON text: creds
        withEnv([
            "AWS_ACCESS_KEY_ID=${jsonCreds['Credentials']['AccessKeyId']}",
            "AWS_SECRET_ACCESS_KEY=${jsonCreds['Credentials']['SecretAccessKey']}",
            "AWS_SESSION_TOKEN=${jsonCreds['Credentials']['SessionToken']}"
        ]) {
            sh "aws s3 sync . s3://${deployEnv}-akumo-members-crm-frontend --delete"
        }
    }
    stage ("invalidate cloudfront cache") {
        if(deployEnv == "prod") {
            Utils.markStageSkippedForConditional("invalidate cloudfront cache")
            println "For the prod account cloudfront cache invalidation is to be done manually"
        }
        else {
            cloudfront_distribution_id = sh(returnStdout: true, script: "aws s3 cp s3://sharedservices-terraform-backend-akumotechnology/akumo-members-crm/${deployEnv}/main.tfstate - | jq .outputs.cludfront_distribution_id.value")
            withEnv([
                "AWS_ACCESS_KEY_ID=${jsonCreds['Credentials']['AccessKeyId']}",
                "AWS_SECRET_ACCESS_KEY=${jsonCreds['Credentials']['SecretAccessKey']}",
                "AWS_SESSION_TOKEN=${jsonCreds['Credentials']['SessionToken']}"
            ]) {
                sh "aws cloudfront create-invalidation --paths '/' --distribution-id ${cloudfront_distribution_id}"
            }
        }
        
    }
}